// drawCircleMidpoint.js
function euclideanDistance(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.round(Math.sqrt(dx * dx + dy * dy)) ;
}
function drawCircleMidpoint(that, x0, y0, x1, y1, color) {
    let r = euclideanDistance(x0, y0, x1, y1);
    let x = 0;
    let y = r;
    let f = 1 - r;

    while (x <= y) {
        that.setPixel(x0 + x, y0 + y, color);
        that.setPixel(x0 - x, y0 + y, color);
        that.setPixel(x0 + x, y0 - y, color);
        that.setPixel(x0 - x, y0 - y, color);
        that.setPixel(x0 + y, y0 + x, color);
        that.setPixel(x0 - y, y0 + x, color);
        that.setPixel(x0 + y, y0 - x, color);
        that.setPixel(x0 - y, y0 - x, color);

        x++;
        if (f < 0) {
            f += 2 * x + 1;
        } else {
            y--;
            f += 2 * (x - y) + 1;
        }
    }
}


export default drawCircleMidpoint;
