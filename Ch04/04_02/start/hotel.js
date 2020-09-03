(function() {
  "use strict";

  function PostForm(props) {
    var typeOptions = Object.keys(props.messageTypes).map(function(key) {
      if (props.messageTypes.hasOwnProperty(key)) {
        return (
          <option key={key} value={key}>
            {props.messageTypes[key]}
          </option>
        );
      }
    });

    // so we don't have to type this over and over
    var defaultType = typeOptions[0].key;

    return (
      <form>
        <h3>Post an Update</h3>

        <div className="field-group">
          <label htmlFor="txt-message">Message</label>
          <textarea id="txt-message" rows="2" />
        </div>

        <div className="field-group">
          <label htmlFor="txt-type">Type</label>
          <select id="txt-type">{typeOptions}</select>
        </div>

        <div className="field-group action">
          <input type="submit" value="Post Update" />
        </div>
      </form>
    );
  }

  function StatusMessage(props) {
    var statusDate = date.parse(props.time, "YYYY-MM-DD, HH:mm"),
      dateFormat = "M/D/Y, h:mm A";

    return (
      <div className="status-message">
        {props.msg}
        <span className="name">— {props.type}</span>
        <span className="time">{date.format(statusDate, dateFormat)}</span>
      </div>
    );
  }

  function StatusMessageList(props) {
    var stubStatuses = [
      {
        id: 1,
        msg:
          "The hot tub is currently closed for maintenance.  We expect it to be back up and running within 48 hours.",
        type: "management",
        time: "2019-04-11, 09:15"
      },
      {
        id: 2,
        msg: "The hot tub maintenance is complete.  Please enjoy a dip!",
        type: "management",
        time: "2019-04-14, 17:12"
      },
      {
        id: 3,
        msg:
          "The rice cooker is on the fritz, any fried rice dishes will require some extra time to cook.",
        type: "dining",
        time: "2019-04-18, 15:00"
      }
    ];

    var [statuses, setStatuses] = React.useState(stubStatuses);

    function displayStatusMessages() {
      return statuses.map(function(status) {
        return (
          <li key={status.id}>
            <StatusMessage
              msg={status.msg}
              type={props.messageTypes[status.type]}
              time={status.time}
            />
          </li>
        );
      });
    }

    return <ul id="status-list">{displayStatusMessages()}</ul>;
  }

  function StatusMessageManager(props) {
    var messageTypes = {
      management: "Management",
      dining: "Dining Services",
      ops: "Operations",
      plumbing: "Plumbing",
      pool: "Pool"
    };

    var apiUrl = "http://localhost/reactjs/status_api";

    return (
      <React.Fragment>
        <div id="post-status">
          <PostForm messageTypes={messageTypes} />
        </div>
        <StatusMessageList messageTypes={messageTypes} />
      </React.Fragment>
    );
  }

  ReactDOM.render(
    <StatusMessageManager />,
    document.getElementById("react-statusmanager")
  );
})();
