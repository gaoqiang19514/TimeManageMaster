import { COUNTDOWN_EXEC, COUNTDOWN_DONE, COUNTDOWN_PROCESS } from '@/js/config';

let isCountdown = false;

function getCurrDate() {
    return new Date().getTime();
}

function getCurrTabId() {
    return new Promise((resolve, reject) => {
        try {
            chrome.tabs.query({ active: true }, (tabs) => {
                const activeTab = tabs.find((tab) => tab.active);

                if (!activeTab) {
                    reject(new Error('未找到激活的tab'));
                }

                resolve(activeTab.id);
            });
        } catch (err) {
            reject(err);
        }
    });
}

async function sendToContentScript(payload) {
    try {
        const tabId = await getCurrTabId();

        // 如果当前没有被激活的tab呢？

        chrome.tabs.sendMessage(tabId, payload, (response) => {
            console.log('sendToContentScript():', response);
        });
    } catch (err) {
        console.log('sendToContentScript():', err);
    }
}

async function sendToPopup(params) {
    console.log(`sendToPopup(): ${params}`);
    chrome.runtime.sendMessage(params);
}

// eslint-disable-next-line no-unused-vars
function started(second) {
    const currDate = getCurrDate();
    //   将分钟转换为毫秒
    const endDate = currDate + second * 1000;

    isCountdown = true;

    sendToPopup({
        msg: '倒计时启动',
        type: COUNTDOWN_EXEC,
    });

    const timer = setInterval(() => {
        console.log('getCurrDate() === endDate', getCurrDate(), endDate);

        sendToPopup({
            msg: '倒计时进行中',
            type: COUNTDOWN_PROCESS,
            payload: {
                second: Math.round((endDate - getCurrDate()) / 1000),
            },
        });

        if (getCurrDate() >= endDate) {
            clearInterval(timer);
            // eslint-disable-next-line no-unused-vars
            isCountdown = false;

            sendToContentScript({
                code: 0,
                msg: '倒计时结束',
            });

            sendToPopup({
                msg: '倒计时完成',
                type: COUNTDOWN_DONE,
            });
        }
    }, 1000);
}

window.isCountdown = isCountdown;
window.started = started;
