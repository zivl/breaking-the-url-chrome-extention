

function getUrlTextArea() {
  return document.getElementsByTagName('textarea')[0];
}

function getCurrentTabUrl(callback) {
  const queryInfo = { active: true, currentWindow: true };
  chrome.tabs.query(queryInfo, tabs => {
    let url = tabs[0].url;
    console.assert(typeof url === 'string', 'tab.url should be a string');
    callback(url);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  getCurrentTabUrl(url => {
    const textAreaInputEl = getUrlTextArea();
    const urlSuffix = url.split('?');

    textAreaInputEl.value += urlSuffix[0];
    textAreaInputEl.value += '\n?\n';

    const queryParams = urlSuffix[1].split('&');
    queryParams.forEach(queryParam => {
      textAreaInputEl.value += `${queryParam}\n&\n`;
    });
    textAreaInputEl.value = textAreaInputEl.value.substring(0, textAreaInputEl.value.lastIndexOf('&\n'));
  });
});

document.getElementById('yow-button').addEventListener('click', () => {
  chrome.tabs.update({ url: getUrlTextArea().value });
});