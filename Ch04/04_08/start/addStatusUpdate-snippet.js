function addStatusMessage(status) {
  var updatedStatuses = statuses.slice(0);

  updatedStatuses.push(status);

  setStatuses(updatedStatuses);
}
