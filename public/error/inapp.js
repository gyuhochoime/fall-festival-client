// 상남자식 바닐라 JS 인앱예외처리 하드코딩
function showInAppBrowserError() {
  const errorModal = document.createElement('div');
  errorModal.id = 'inapp-error-modal';
  errorModal.innerHTML = `
  <div style="
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: 10000;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      box-sizing: border-box;
      background-image: url('/error/background.jpg');
      background-size: cover;
      background-position: center;
  ">
      <div style="
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      max-width: 300px;
      ">
      <img src="/error/icon.svg" style="width: 4rem; filter: drop-shadow(0 0 6px rgb(0 0 0 / 40%));"/>
      <h2 style="
          font-size: 1.2rem;
          font-weight: 700;
          color: #eee;
          margin-top: 1rem;
          line-height: 1.4;
          font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
          text-shadow: 0 0 5px rgb(0 0 0 / 50%);
      ">
          앗, 여기선 열리지 않아요<br>
          하단 또는 상단의 공유버튼을 누르고<br>
          '외부 브라우저 열기'를 눌러주세요!
      </h2>
      </div>
  </div>
  `;

  document.body.appendChild(errorModal);
}
