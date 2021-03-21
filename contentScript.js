function openMask() {
  let div = document.createElement("div");

  div.className = "mask";
  div.innerHTML = '<button id="close-btn" class="btn">ok</div>';

  document.body.appendChild(div);

  div.querySelector("#close-btn").addEventListener("click", () => {
    document.body.removeChild(div);
    div = null;
  });
}

// 监听消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.code === 0) {
    // 调出弹层
    openMask();
  }

  sendResponse("contentScript.js 我已收到你的消息：" + JSON.stringify(request)); //做出回应
});
