function postStatusUpdate(evt) {
  evt.preventDefault();

  var newStatus = {
    msg: messageText,
    type: messageType,
    time: date.format(new Date(), "YYYY-MM-DD, HH:mm")
  };

  axios.post(CONFIG.apiUrl + "/post.php", newStatus).then(function(response) {
    console.log(response);

    if (response.data.success) {
      // Update state (list of messages)
    }
  });
}
