export function IsChrome() {
    return !!window.chrome;
}

export function getCurrTabId() {
    return new Promise((resolve, reject) => {
        if (!IsChrome()) {
            reject(new Error('getCurrTabId(): chorme对象不存在'));
        }

        try {
            chrome.tabs.query({ active: true }, (tabs) => {
                const activeTab = tabs.find((tab) => tab.active);

                if (!activeTab) {
                    reject(new Error('getCurrTabId(): 未找到激活的tab'));
                }

                resolve(activeTab.id);
            });
        } catch (err) {
            reject(err);
        }
    });
}

export function sendToContentScript(payload) {
    if (!IsChrome()) {
        throw new Error('sendToContentScript(): chorme对象不存在');
    }

    getCurrTabId()
        .then((tabId) => {
            // 如果当前没有被激活的tab呢？
            chrome.tabs.sendMessage(tabId, payload, (response) => {
                console.log('sendToContentScript():', response);
            });
        })
        .catch((err) => {
            console.log('sendToContentScript():', err);
        });
}

export function sendToPopup(params) {
    if (!IsChrome()) {
        throw new Error('sendToPopup(): chorme对象不存在');
    }

    console.log(`sendToPopup(): ${params}`);
    chrome.runtime.sendMessage(params);
}

export function onMessage(cb) {
    if (!IsChrome()) {
        throw new Error('sendToPopup(): chorme对象不存在');
    }

    if (typeof cb !== 'function') {
        throw new Error('sendToPopup(): cb需要为函数');
    }

    chrome.runtime.onMessage.addListener(cb);
}
