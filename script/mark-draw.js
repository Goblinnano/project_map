let isDrawing = false;
let startCoords = null;
let lastEndCoords = null;
let lines = [];
let activeFloor = document.getElementById('floor1');

function toggleDrawing() {
    isDrawing = !isDrawing;
    if (isDrawing) {
        console.log('Drawing mode activated. Click to set start and end points.');
    } else {
        console.log('Drawing mode deactivated.');
        if (startCoords) {
            startCoords = null;
        }
        lastEndCoords = null;
        
        printLinesData();
    }
}

function transformCoords(x, y) {
    return {
        x: (x - pointX) / scale,
        y: (y - pointY) / scale
    };
}

// TODO: draw-line
function drawLine(start, end) {
    if (!start || !end || typeof start.x === 'undefined' || typeof start.y === 'undefined' || typeof end.x === 'undefined' || typeof end.y === 'undefined') {
        console.error("Invalid start or end point");
        return;
    }

    const line = document.createElement('div');
    line.className = 'line';
    line.style.position = 'absolute';

    const length = Math.sqrt((end.x - start.x) ** 2 + (end.y - start.y) ** 2);
    const angle = Math.atan2(end.y - start.y, end.x - start.x) * (180 / Math.PI);

    line.style.left = `${start.x}px`;
    line.style.top = `${start.y}px`;
    line.style.width = `${length}px`;
    line.style.height = '2px';  // ความหนาของเส้น
    line.style.backgroundColor = ' Blue';  // สีของเส้น
    line.style.transformOrigin = '0 0';
    line.style.transform = `rotate(${angle}deg)`;
    line.style.zIndex = '9999'; // ให้เส้นอยู่ด้านบนสุด

    activeFloor.parentNode.appendChild(line);
}

document.getElementById('image-container').addEventListener('click', (event) => {
    if (isDrawing) {
        const rect = document.getElementById('image-container').getBoundingClientRect();
        const clickCoords = transformCoords(event.clientX - rect.left, event.clientY - rect.top);

        if (!startCoords) {
            startCoords = clickCoords;
            lastEndCoords = startCoords;
            console.log('Start point:', startCoords);
        } else {
            const endCoords = clickCoords;
            console.log('End point:', endCoords);

            drawLine(lastEndCoords, endCoords);

            lastEndCoords = endCoords;
        }
    }
});

document.getElementById('image-container').addEventListener('contextmenu', (event) => {
    if (isDrawing) {
        event.preventDefault();
        console.log('Drawing mode deactivated.');
        startCoords = null;
        lastEndCoords = null;
        isDrawing = false;
    }
});

document.getElementById('draw-button').addEventListener('click', (event) => {
    event.preventDefault();
    toggleDrawing();
});

function switchFloor(floorId) {
    const floors = document.querySelectorAll('#zoom img');
    floors.forEach(floor => floor.style.display = 'none');
    const selectedFloor = document.getElementById(floorId);
    selectedFloor.style.display = 'block';
    activeFloor = selectedFloor;

    document.querySelectorAll('.line').forEach(line => line.remove());
}

// จุดมาร์ค
function updateMarkerPositions() {
    markers.forEach(marker => {
        // ปรับพิกัดมาร์กเกอร์ให้สัมพันธ์กับการซูมและแพน
        const transformedX = marker.x * scale + pointX;
        const transformedY = marker.y * scale + pointY;

        // อัปเดตตำแหน่งมาร์กเกอร์บนหน้าจอ
        const markerElement = document.querySelector(`.marker[data-id='${marker.id}']`);
        if (markerElement) {
            markerElement.style.left = `${transformedX}px`;
            markerElement.style.top = `${transformedY}px`;
        }
    });
}

// TODO: DrawData
function printLinesData() {
    const linesInput = document.getElementById('line-coordinates');
    const linesData = lines.map(line => `Start: {x: ${line.start.x}, y: ${line.start.y}} End: {x: ${line.end.x}, y: ${line.end.y}}`).join('\n');
    linesInput.value = linesData;
}

// Marker
const markerContainer = document.getElementById('image-container');
let markers = [];
let markerCounter = 1;
let isMarking = false; // สถานะเริ่มต้นไม่อยู่ในโหมดมาร์คจุด

// เริ่ม/หยุดโหมดมาร์คจุดเมื่อกดปุ่ม "MarkPoint"
document.getElementById('mark-button').addEventListener('click', () => {
    isMarking = !isMarking;
    if (isMarking) {
        console.log('Marking mode enabled.');
    } else {
        console.log('Marking mode disabled.');
    }
});

// เมื่อคลิกซ้าย เพิ่มมาร์กเกอร์หากอยู่ในโหมดมาร์คจุด
markerContainer.addEventListener('click', (event) => {
    if (!isMarking) return; // หากไม่อยู่ในโหมดมาร์คจุด จะไม่ทำการมาร์คจุด
    
    const rect = markerContainer.getBoundingClientRect();
    const markerPosition = transformCoords(event.clientX - rect.left, event.clientY - rect.top);

    const marker = document.createElement('div');
    marker.className = 'marker';
    marker.style.left = `${markerPosition.x * scale + pointX}px`;
    marker.style.top = `${markerPosition.y * scale + pointY}px`;
    
    // เพิ่ม data-id เพื่อระบุแต่ละมาร์กเกอร์
    marker.setAttribute('data-id', markerCounter);
    
    // เพิ่มหมายเลขลำดับให้กับ marker
    const markerLabel = document.createElement('span');
    markerLabel.className = 'marker-label';
    markerLabel.textContent = markerCounter;
    marker.appendChild(markerLabel);
    
    markerContainer.appendChild(marker);
    
    markers.push({
        id: markerCounter,
        x: markerPosition.x,
        y: markerPosition.y
    });
    
    markerCounter++;  // เพิ่มลำดับการมาร์คจุด
});

// ยกเลิกโหมดมาร์คจุดเมื่อคลิกขวา
markerContainer.addEventListener('contextmenu', (event) => {
    event.preventDefault(); // ปิดการแสดง context menu ปกติ
    if (isMarking) {
        disableMarking(); // ปิดโหมดมาร์คจุด
    }
});

// ฟังก์ชันปิดโหมดมาร์คจุด
function disableMarking() {
    isMarking = false;
    console.log('Marking mode disabled via right click.');
}

// ฟังก์ชันแปลงพิกัด
function transformCoords(x, y) {
    return {
        x: (x - pointX) / scale,
        y: (y - pointY) / scale
    };
}

// TODO: Zoom and plan
const MIN_SCALE = 1;
const MAX_SCALE = 5;  
let scale = 1;
let pointX = 0;
let pointY = 0;
let panning = false;
let startPan = { x: 0, y: 0 };

const zoom = document.getElementById('zoom');
const container = document.getElementById('image-container');

function setTransform() {
    zoom.style.transform = `translate(${pointX}px, ${pointY}px) scale(${scale})`;
}

function constrainPanning() {
    const containerRect = container.getBoundingClientRect();
    const zoomRect = zoom.getBoundingClientRect();
    const floorRect = activeFloor.getBoundingClientRect();

    const maxX = Math.min(containerRect.width - floorRect.width * scale, 0);
    const maxY = Math.min(containerRect.height - floorRect.height * scale, 0);

    pointX = Math.max(Math.min(pointX, 0), maxX);
    pointY = Math.max(Math.min(pointY, 0), maxY);
}

zoom.onmousedown = function (e) {
    e.preventDefault();
    startPan = { x: e.clientX - pointX, y: e.clientY - pointY };
    panning = true;
}

zoom.onmouseup = function () {
    panning = false;
}

zoom.onmousemove = function (e) {
    e.preventDefault();
    if (!panning) return;
    pointX = (e.clientX - startPan.x);
    pointY = (e.clientY - startPan.y);
    constrainPanning();
    setTransform();
    updateMarkerPositions();
}

zoom.onwheel = function (e) {
    e.preventDefault();
    const xs = (e.clientX - pointX) / scale;
    const ys = (e.clientY - pointY) / scale;
    const delta = (e.wheelDelta ? e.wheelDelta : -e.deltaY);
    scale *= (delta > 0) ? 1.2 : 1.2 ** -1;
    scale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, scale));
    pointX = e.clientX - xs * scale;
    pointY = e.clientY - ys * scale;
    constrainPanning();
    setTransform();
    updateMarkerPositions();
}

function switchFloor(floorId) {
    const floors = document.querySelectorAll('#zoom img');
    floors.forEach(floor => floor.style.display = 'none');
    activeFloor = document.getElementById(floorId);
    activeFloor.style.display = 'block';

    scale = 1;
    pointX = 0;
    pointY = 0;
    setTransform();
}

