let currentImage = 1;
let marksAndLines = [];

// ตรวจสอบฟังก์ชัน markPoint ถูกประกาศในไฟล์ mark-draw.js
function markPoint() {
    console.log("MarkPoint function called");
}

// โหลดข้อมูลจุดมาร์คและเส้น
function loadMarksAndLines(page) {
    const savedData = localStorage.getItem('image_' + page);
    if (savedData) {
        marksAndLines = JSON.parse(savedData);
        drawOnImage(marksAndLines);
    } else {
        marksAndLines = [];
    }
}

// บันทึกข้อมูลจุดมาร์คและเส้น
function saveMarksAndLines(page) {
    localStorage.setItem('image_' + page, JSON.stringify(marksAndLines));
}

// ฟังก์ชันตรวจสอบว่าอยู่ในโหมด MarkPoint หรือ DrawLine หรือไม่
document.getElementById('floor1').addEventListener('click', function(event) {
    if (isMarking || isDrawing) {
        const imageContainer = document.getElementById('image-container');
        const rect = imageContainer.getBoundingClientRect();

        // คำนวณพิกัด x, y
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        if (isMarking) {
            // โหมด MarkPoint: แสดงข้อมูลพิกัดเฉพาะการมาร์คจุด
            const point = { x: x, y: y };
            marksAndLines.push(point);

            // อัปเดตพิกัดใน textarea
            const coordinatesTextArea = document.getElementById('line-coordinates');
            coordinatesTextArea.value += `MarkPoint X: ${point.x}, Y: ${point.y}\n`;

            // แสดงข้อมูลพิกัดที่เพิ่มในตาราง (ถ้ามี)
            addToTable(point);
        } else if (isDrawing) {
            // โหมด DrawLine: เพิ่มข้อมูลเส้นใหม่เข้าใน array
            const line = { startX: x, startY: y, endX: x + 10, endY: y + 10 };
            marksAndLines.push(line);

            // อัปเดตพิกัดใน textarea
            const coordinatesTextArea = document.getElementById('line-coordinates');
            coordinatesTextArea.value += `Start X: ${line.startX}, Start Y: ${line.startY}, End X: ${line.endX}, End Y: ${line.endY}\n`;

            // แสดงข้อมูลเส้นที่เพิ่มในตาราง (ถ้ามี)
            addToTable(line);
        }
    }
});

// ฟังก์ชันเพิ่มข้อมูลพิกัดในตาราง (สำหรับทั้ง MarkPoint และ DrawLine)
function addToTable(data) {
    const tableBody = document.querySelector('#line-list table tbody');
    const row = document.createElement('tr');

    if (data.startX !== undefined) {
        // ข้อมูลเป็นเส้น (DrawLine)
        row.innerHTML = `
            <td>Line</td>
            <td>${data.startX}</td>
            <td>${data.startY}</td>
            <td>${data.endX}</td>
            <td>${data.endY}</td>
        `;
    } else {
        // ข้อมูลเป็นจุด (MarkPoint)
        row.innerHTML = `
            <td>Point</td>
            <td>${data.x}</td>
            <td>${data.y}</td>
            <td>-</td>
            <td>-</td>
        `;
    }

    tableBody.appendChild(row);
}

// ล้างข้อมูลเส้นทั้งหมด
document.getElementById('delete-button').addEventListener('click', function() {
    marksAndLines = [];
    document.getElementById('line-coordinates').value = '';
    document.querySelector('#line-list table tbody').innerHTML = '';
});

// เมื่อหน้าโหลดขึ้นมา โหลดข้อมูลของภาพปัจจุบัน
window.onload = function() {
    loadMarksAndLines(currentImage);
};

// ยกเลิกการมาร์คจุดหรือวาดเส้นเมื่อกดคลิกขวา
document.addEventListener('contextmenu', function(event) {
    event.preventDefault();
    isMarkingOrDrawing = false;

    // ใช้ console.log เพื่อแสดงผลในคอนโซล
    console.log('Context menu event triggered');

    // สร้าง div สำหรับแสดงข้อความ
    const messageDiv = document.createElement('div');
    messageDiv.textContent = 'โหมด MarkPoint หรือ DrawLine ถูกยกเลิกแล้ว';
    messageDiv.style.position = 'fixed';
    messageDiv.style.top = '10%';
    messageDiv.style.left = '50%';
    messageDiv.style.transform = 'translate(-50%, -50%)';
    messageDiv.style.backgroundColor = '#5cdb95';
    messageDiv.style.borderRadius = '5px';
    messageDiv.style.padding = '20px';
    messageDiv.style.zIndex = '1000';
    messageDiv.style.textAlign = 'center';

    document.body.appendChild(messageDiv);

    // ลบข้อความหลังจาก 1 วิ
    setTimeout(() => {
        messageDiv.classList.add('fade-out');
        setTimeout(() => {
            document.body.removeChild(messageDiv);
        }, 1000); // หมดเวลา 1 วิ แล้วค่อย ๆ หายไป
    }, 1000);
});




