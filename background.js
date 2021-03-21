let color = "#3aa757";
const CURRENT = "background";

function getCurrDate() {
  return new Date().getTime();
}

function getCurrTabId() {
  return new Promise((resolve, reject) => {
    try {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const activeTab = tabs.find((tab) => tab.active);

        if (!activeTab) {
          reject(new Error("未找到激活的tab"));
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
      console.log("sendToContentScript():", response);
    });
  } catch (err) {
    console.log("sendToContentScript():", err);
  }
}

function started(second) {
  const currDate = getCurrDate();
  //   将分钟转换为毫秒
  const endDate = currDate + second * 1000;

  isCountdown = true;

  const timer = setInterval(() => {
    console.log("getCurrDate() === endDate", getCurrDate(), endDate);
    if (getCurrDate() >= endDate) {
      clearInterval(timer);
      isCountdown = false;

      sendToContentScript({
        code: 0,
        msg: "倒计时结束",
      });
    }
  }, 1000);
}
