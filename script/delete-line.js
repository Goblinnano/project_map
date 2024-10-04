 // ลบจุดมาร์คและเส้นทั้งหมด
 document.getElementById('clear-button').addEventListener('click', () => {
    const markers = document.querySelectorAll('.marker');
    const lines = document.querySelectorAll('.line');

    markers.forEach(marker => marker.remove());
    lines.forEach(line => line.remove());

    markerCount = 0;
    resetDrawingState();
});

// ลบจุดมาร์คบนภาพ
document.getElementById('image-container').addEventListener('contextmenu', (event) => {
    event.preventDefault();
    if (event.target.className === 'marker') {
        event.target.remove();
    }
});

// คลิกขวาเพื่อยกเลิกการวาดเส้นปัจจุบัน
document.getElementById('image-container').addEventListener('contextmenu', (event) => {
    event.preventDefault(); // ป้องกัน context menu ปกติไม่ให้แสดง
    if (isDrawing && mode === 'draw') {
        const existingLine = document.querySelector('.line.drawing');
        if (existingLine) {
            existingLine.remove(); // ลบเส้นที่กำลังวาดอยู่
        }
        startPoint = null; 
        isDrawing = false; 
    }
});