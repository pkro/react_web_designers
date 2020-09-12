const { default: Axios } = require("axios");

const CONFIG = {
  apiUrl: "http://localhost/status_api",
  loadDelay: 3,
};

(function () {
  "use strict";

  function PostForm(props) {
    const typeOptions = Reflect.ownKeys(messageTypes).map(function (key) {
      return (
        <option key={key} value={key}>
          {props.messageTypes[key]}
        </option>
      );
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
    var [statuses, setStatuses] = React.useState([]);
    var [loaded, setLoaded] = React.useState(false);

    React.useEffect(() => {
      async function getStatuses() {
        const res = await Axios.get(`${CONFIG.apiUrl}/get.php?delay=${CONFIG.loadDelay}`);
        return res.data;
      }
      async function setStats() {
        setStatuses(await getStatuses());
        setLoaded(true);
      }
      setStats();
    }, [setLoaded]);

    function displayStatusMessages() {
      return statuses.map(function (status) {
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
    if (!loaded)
      return (
        <div id="status-list" className="loading">
          loading...
          <div className="spinner">
            <div className="bounce1"></div>
            <div className="bounce2"></div>
            <div className="bounce3"></div>
          </div>
        </div>
      );
    return <ul id="status-list">{displayStatusMessages()}</ul>;
  }

  function StatusMessageManager(props) {
    var messageTypes = {
      management: "Management",
      dining: "Dining Services",
      ops: "Operations",
      plumbing: "Plumbing",
      pool: "Pool",
    };

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
