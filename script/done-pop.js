let selectedImages = []; // Array เก็บรูปที่เลือก

function showDownloadModal() {
    document.getElementById('modal').style.display = 'flex';
    document.getElementById('overlay').style.display = 'block';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}

function toggleCheckbox(checkbox) {
    const image = checkbox.closest('.image-item').querySelector('img').src;
    if (checkbox.checked) {
        selectedImages.push(image); // เพิ่มรูปที่เลือก
    } else {
        selectedImages = selectedImages.filter(img => img !== image); // ลบรูปที่ยกเลิกเลือก
    }
}

function showDonePopup() {
    if (selectedImages.length === 0) {
        alert('กรุณาเลือกรูปภาพอย่างน้อย 1 รูป');
        return;
    }

    let existingPopup = document.getElementById('donePopup');
    if (!existingPopup) {
        existingPopup = document.createElement('div');
        existingPopup.id = 'donePopup';
        existingPopup.className = 'modal';
        existingPopup.style.display = 'flex';
        existingPopup.style.flexDirection = 'column';
        existingPopup.style.justifyContent = 'center';
        existingPopup.style.alignItems = 'center';
        existingPopup.style.backgroundColor = '#282727';
        existingPopup.style.border = '2px dashed #464543';  
        existingPopup.style.borderRadius = '3px';  
        existingPopup.style.padding = '10px';
        existingPopup.style.position = 'fixed';
        existingPopup.style.top = '50%';
        existingPopup.style.left = '50%';
        existingPopup.style.transform = 'translate(-50%, -50%)';
        existingPopup.style.zIndex = '1000';
        

        existingPopup.innerHTML = `
            <div style="position: relative;">
               <i onclick="closeDonePopup()" class="fa-solid fa-xmark" style="color: #ff0000; cursor: pointer; position: absolute; top: -7px; right: -25px;"></i>  
               <p style="margin-top: 10px; color: #fff;">เลือกประเภทไฟล์</p>
            </div>
            <div class="icon-wrapper">
                <div class="icon-item" onclick="downloadImages('pdf')">
                    <i class="fa-solid fa-file-pdf"></i>
                    <p style="color: #fff;">PDF</p>
                </div>
                <div class="icon-item" onclick="downloadImages('img')">
                    <i class="fa-solid fa-file-image"></i>
                    <p style="color: #fff;">IMG</p>
                </div>
            </div>
        `;
        document.body.appendChild(existingPopup);
    }
    existingPopup.style.display = 'flex';
}

function downloadImages(fileType) {
    if (fileType === 'pdf') {
        const { jsPDF } = window.jspdf;
        
        const doc = new jsPDF({  // สร้าง PDF ขนาด A4 แนวนอน (210 x 297 มม. ในโหมด landscape)
            orientation: 'landscape', // เปลี่ยนเป็นแนวนอน
            unit: 'mm',  // ใช้หน่วยเป็นมิลลิเมตร
            format: 'a4'
        });

        const pageWidth = 297; // ความกว้างของหน้ากระดาษ A4 ในโหมด landscape
        const pageHeight = 210; // ความสูงของหน้ากระดาษ A4 ในโหมด landscape

        selectedImages.forEach((image, index) => {
            const img = new Image();
            img.src = image;

            img.onload = function () {   // ปรับขนาดภาพให้อยู่ในกรอบ A4 แนวนอน
                const imgWidth = img.width;
                const imgHeight = img.height;
                
                let width, height;  // คำนวณอัตราส่วนของภาพ เพื่อให้พอดีกับขนาด A4 แนวนอน
                const ratio = Math.min(pageWidth / imgWidth, pageHeight / imgHeight);
                width = imgWidth * ratio;
                height = imgHeight * ratio;

                const x = (pageWidth - width) / 2;  // วางภาพตรงกลางหน้า
                const y = (pageHeight - height) / 2;

                doc.addImage(img, 'PNG', x, y, width, height);  // เพิ่มภาพลงใน PDF

                if (index < selectedImages.length - 1) {  // เพิ่มหน้าถัดไปถ้ามีหลายรูป
                    doc.addPage();
                }

                const imageName = image.substring(image.lastIndexOf('/') + 1, image.lastIndexOf('.'));  // ดึงชื่อไฟล์ต้นฉบับจาก URL ของภาพ

                if (index === selectedImages.length - 1) {  // ถ้าถึงภาพสุดท้ายแล้ว ดาวน์โหลดไฟล์ PDF โดยใช้ชื่อไฟล์ต้นฉบับ
                    doc.save(`${imageName}.pdf`);
                }
            };
        });
    } else if (fileType === 'img') {
        selectedImages.forEach((image) => {
            const a = document.createElement('a');
            a.href = image;

            const imageName = image.substring(image.lastIndexOf('/') + 1);  // ดึงชื่อไฟล์ต้นฉบับจาก URL ของภาพ

            a.download = imageName; // ใช้ชื่อไฟล์ต้นฉบับ
            a.click();
        });
    }
    closeDonePopup();
}

function closeDonePopup() {
    const popup = document.getElementById('donePopup');
    if (popup) {
        popup.style.display = 'none';
    }
} 