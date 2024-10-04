// ฟังก์ชันเปิด/ปิดโหมด Fullscreen
function toggleFullscreen() {
    const zoomElement = document.getElementById('zoom');
    const fullscreenBtn = document.getElementById('fullscreenToggle');
    
    if (!document.fullscreenElement) {
        if (zoomElement.requestFullscreen) {
            zoomElement.requestFullscreen();
        } else if (zoomElement.mozRequestFullScreen) { // Firefox
            zoomElement.mozRequestFullScreen();
        } else if (zoomElement.webkitRequestFullscreen) { // Chrome, Safari and Opera
            zoomElement.webkitRequestFullscreen();
        } else if (zoomElement.msRequestFullscreen) { // IE/Edge
            zoomElement.msRequestFullscreen();
        }
        fullscreenBtn.classList.add('on');
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { // Firefox
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { // Chrome, Safari and Opera
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { // IE/Edge
            document.msExitFullscreen();
        }
        fullscreenBtn.classList.remove('on');
    }
}
