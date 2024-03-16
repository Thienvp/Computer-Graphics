// drawCircleMidpoint.js
function euclideanDistance(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.round(Math.sqrt(dx * dx + dy * dy)) ;
}
function drawCircleMidpoint( that, centerX, centerY, pX,pY, color) {
    let x = euclideanDistance(centerX,centerY,pX,pY);
    let y = 0;
    let err = 0;

    while (x >= y) {
        that.setPixel(  centerX + x, centerY + y, color);
        that.setPixel(  centerX + y, centerY + x, color);
        that.setPixel(  centerX - y, centerY + x, color);
        that.setPixel(  centerX - x, centerY + y, color);
        that.setPixel(  centerX - x, centerY - y, color);
        that.setPixel(  centerX - y, centerY - x, color);
        that.setPixel(  centerX + y, centerY - x, color);
        that.setPixel(  centerX + x, centerY - y, color);

        if (err <= 0) {
            y += 1;
            err += 2 * y + 1;
        }

        if (err > 0) {
            x -= 1;
            err -= 2 * x + 1;
        }
    }
}
// Export the function
export default drawCircleMidpoint;
