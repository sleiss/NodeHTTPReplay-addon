browser.runtime.onMessage.addListener(notify);

function notify(request) {
  var req = new XMLHttpRequest();
  req.open(request.type, request.host + request.requestedUrl);

  for (let headerName in request.headers) {
      let headerValue = request.headers[headerName];
      req.setRequestHeader(headerName, headerValue);
  }

  req.send(request.body);

  browser.notifications.create({
    "type": "basic",
    "title": "Request sent!",
    "message": "The request was sent to the server!"
  });
}
