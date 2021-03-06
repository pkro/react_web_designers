const { default: Axios } = require("axios");

const CONFIG = {
  apiUrl: "http://localhost/status_api",
  loadDelay: 1,
};

(function () {
  "use strict";

  function PostForm({ messageTypes, addStatusMessage }) {
    const typeOptions = Reflect.ownKeys(messageTypes).map(function (key) {
      return (
        <option key={key} value={key}>
          {messageTypes[key]}
        </option>
      );
    });

    const defaultFormValues = {
      msg: "",
      type: typeOptions[0].key,
    };

    const [formVals, setFormVals] = React.useState(defaultFormValues);
    const [postDisabled, setPostDisabled] = React.useState(true);

    const handleChange = function (e) {
      setFormVals({ ...formVals, [e.target.name]: e.target.value });
      setPostDisabled(formVals.msg.trim().length === 0);
    };

    const onSubmit = function (e) {
      e.preventDefault();
      // could be done asyng as the get, but for promise practice as a promise
      Axios.post(`${CONFIG.apiUrl}/post.php`, JSON.stringify(formVals)).then(
        (response) => {
          if (response.data.success) {
            addStatusMessage({
              ...formVals,
              id: response.data.id,
              time: response.data.time,
            });
            setFormVals(defaultFormValues);
          }
        }
      );
    };

    return (
      <form>
        <h3>Post an Update</h3>

        <div className="field-group">
          <label htmlFor="txt-message">Message</label>
          <textarea
            id="txt-message"
            rows="2"
            name="msg"
            value={formVals.msg}
            onChange={handleChange}
          />
        </div>

        <div className="field-group">
          <label htmlFor="txt-type">Type</label>
          <select
            id="txt-type"
            name="type"
            defaultValue={formVals.type}
            onChange={handleChange}>
            {typeOptions}
          </select>
        </div>

        <div className="field-group action">
          <input
            type="submit"
            value="Post Update"
            onClick={onSubmit}
            disabled={postDisabled}
          />
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

  function StatusMessageList({ messageTypes, statuses, loaded }) {
    function displayStatusMessages() {
      return statuses.map(function (status) {
        return (
          <li key={status.id}>
            <StatusMessage
              msg={status.msg}
              type={messageTypes[status.type]}
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

    function addStatusMessage(status) {
      setStatuses([...statuses, status]);
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
