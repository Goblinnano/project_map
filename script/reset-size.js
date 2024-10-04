document.getElementById('reset-size').addEventListener('click', (event) => {
    event.preventDefault(); // ป้องกันการ reload หน้า
    scale = 1;
    pointX = 0;
    pointY = 0;
    setTransform();
});
