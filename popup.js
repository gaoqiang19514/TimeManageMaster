let isCountdown = false;
const startBtnElem = document.getElementById("start-btn");
const timeSelectElem = document.getElementById("time-select");
const BG = chrome.extension.getBackgroundPage();

function onClick() {
  const second = timeSelectElem.value;

  if (!second) {
    return;
  }

  if (isCountdown) {
    return;
  }

  BG.started(second);
}

startBtnElem.addEventListener("click", onClick);
