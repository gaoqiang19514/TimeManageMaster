const BG = chrome.extension.getBackgroundPage();
const startBtnElem = document.getElementById('start-btn');
const timeSelectElem = document.getElementById('time-select');

function onClick() {
    const second = timeSelectElem.value;

    if (!second) {
        return;
    }

    if (BG.isCountdown) {
        return;
    }

    BG.started(second);
}

startBtnElem.addEventListener('click', onClick);
