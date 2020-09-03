(function() {
  "use strict";

  var CONFIG = {
    apiUrl: "http://localhost/reactjs/status_api"
  };

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

    var [messageText, setMessageText] = React.useState("");
    var [messageType, setMessageType] = React.useState(defaultType);

    function onTextChange(evt) {
      setMessageText(evt.target.value);
    }

    function onTypeChange(evt) {
      setMessageType(evt.target.value);
    }

    function postStatusUpdate(evt) {
      evt.preventDefault();

      var newStatus = {
        msg: messageText,
        type: messageType,
        time: date.format(new Date(), "YYYY-MM-DD, HH:mm")
      };

      axios.post(CONFIG.apiUrl + "/post.php", newStatus).then(function(response) {
        if (response.data.success) {
          // Update list of messages
          newStatus.id = response.data.id;
          props.addStatusMessage(newStatus);

          // reset the form values
          setMessageText("");
          setMessageType(defaultType);
        }
      });
    }

    return (
      <form onSubmit={postStatusUpdate}>
        <h3>Post an Update</h3>

        <div className="field-group">
          <label htmlFor="txt-message">Message</label>
          <textarea
            id="txt-message"
            rows="2"
            onChange={onTextChange}
            value={messageText}
          />
        </div>

        <div className="field-group">
          <label htmlFor="txt-type">Type</label>
          <select id="txt-type" onChange={onTypeChange} value={messageType}>
            {typeOptions}
          </select>
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
    function displayStatusMessages() {
      return props.statuses.map(function(status) {
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

    if (props.loaded) {
      return <ul id="status-list">{displayStatusMessages()}</ul>;
    } else {
      return (
        <div id="status-list" className="loading">
          Loading...
          <div className="spinner">
            <div className="bounce1" />
            <div className="bounce2" />
            <div className="bounce3" />
          </div>
        </div>
      );
    }
  }

  function StatusMessageManager(props) {
    var messageTypes = {
      management: "Management",
      dining: "Dining Services",
      ops: "Operations",
      plumbing: "Plumbing",
      pool: "Pool"
    };

    var [statuses, setStatuses] = React.useState([]);
    var [loaded, setLoaded] = React.useState(false);

    React.useEffect(function() {
      retrieveStatusMessages();
    }, []);

    function retrieveStatusMessages() {
      axios.get(CONFIG.apiUrl + "/get.php?delay=5").then(function(response) {
        setStatuses(response.data);
        setLoaded(true);
      });
    }

    function addStatusMessage(status) {
      var updatedStatuses = statuses.slice(0);

      updatedStatuses.push(status);

      setStatuses(updatedStatuses);
    }

    return (
      <React.Fragment>
        <div id="post-status">
          <PostForm messageTypes={messageTypes} addStatusMessage={addStatusMessage} />
        </div>
        <StatusMessageList
          messageTypes={messageTypes}
          statuses={statuses}
          loaded={loaded}
        />
      </React.Fragment>
    );
  }

  ReactDOM.render(
    <StatusMessageManager />,
    document.getElementById("react-statusmanager")
  );
})();
