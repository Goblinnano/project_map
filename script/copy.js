document.addEventListener('DOMContentLoaded', function () {
  const copyButton = document.querySelector('.copy-btn');
  const linkInput = document.querySelector('.link');

  copyButton.addEventListener('click', function () {
    linkInput.select();
    document.execCommand('copy');

    // สร้าง Popup ขึ้นมา
    const popup = document.createElement('div');
    popup.textContent = 'คัดลอกแล้ว';
    popup.style.position = 'fixed';
    popup.style.top = '5%';
    popup.style.right = '50%'; 
    popup.style.transform = 'translateX(50%)'; 
    popup.style.background = '#5cdb95';
    popup.style.color = '#000';
    popup.style.padding = '10px';
    popup.style.borderRadius = '5px';
    popup.style.zIndex = '1000';
    popup.style.opacity = '1'; 
    popup.style.transition = 'opacity 1s'; 

    document.body.appendChild(popup);

    setTimeout(() => {
      popup.style.opacity = '0'; // ทำให้ทึบลง
      setTimeout(() => {
        document.body.removeChild(popup);
      }, 1000); // หมดเวลา 1 วิ แล้วค่อย ๆ หายไป
    }, 1000);
  });
});
