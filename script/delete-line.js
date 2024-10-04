// ลบจุดมาร์คและเส้นทั้งหมด
document.getElementById('clear-button').addEventListener('click', () => {
    const markers = document.querySelectorAll('.marker');
    const lines = document.querySelectorAll('.line');

    markers.forEach(marker => marker.remove());
    lines.forEach(line => line.remove());

    markerCount = 0;
    resetDrawingState();
});

// ฟังก์ชันล้างสถานะการวาด
function resetDrawingState() {
    startPoint = null;
    isDrawing = false;
    mode = null; // กำหนดค่าให้ 'mode' ใหม่หากมีการใช้
}

// ลบจุดมาร์คหรือยกเลิกการวาดเส้นเมื่อคลิกขวา
document.getElementById('image-container').addEventListener('contextmenu', (event) => {
    event.preventDefault(); // ป้องกัน context menu ปกติไม่ให้แสดง

    // ลบจุดมาร์คถ้าเป็น marker
    if (event.target.classList.contains('marker')) {
        event.target.remove();
    }

    // ยกเลิกการวาดเส้นถ้ากำลังวาดอยู่
    if (isDrawing && mode === 'draw') {
        const existingLine = document.querySelector('.line.drawing');
        if (existingLine) {
            existingLine.remove(); // ลบเส้นที่กำลังวาดอยู่
        }
        startPoint = null; 
        isDrawing = false; 
    }
});
