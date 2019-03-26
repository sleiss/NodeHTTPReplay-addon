let requests = {};

let requestButtons = document.getElementsByClassName('requestButton');
// Remove all existing click actions
for (let i = 0; i < requestButtons.length; i++) {
  let requestButton = requestButtons[i];
  requestButton.setAttribute('onClick', '');
}

let config = {attributes: true};
let observer = new MutationObserver(loadRequests);

observer.observe(document.getElementById('requests'), config);

window.addEventListener('click', notifyClick); // Click listener to identify button clicks

loadRequests();

function loadRequests() {
  let requestData = document.getElementById('requests');
  requests = JSON.parse(requestData.getAttribute('data-requests'));
}

function notifyClick(e) {
  if (e.target.tagName != 'BUTTON' || e.target.className != 'requestButton') {
    return;
  }

  let requestId = e.target.attributes.requestid.nodeValue;
  let request = requests[requestId];
  let host = document.getElementById('host').value;
  request.host = host;
  browser.runtime.sendMessage(request);
}
