import { openMask } from '@/components/Mask';

// 监听
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.code === 0) {
        openMask();
    }

    // 响应
    sendResponse(
        `contentScript.js 我已收到你的消息：${JSON.stringify(request)}`,
    );
});
