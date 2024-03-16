// drawLineDDA.js
function drawLineDDA(that, x1, y1, x2, y2, color) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const steps = Math.max(Math.abs(dx), Math.abs(dy));
    const xIncrement = dx / steps;
    const yIncrement = dy / steps;

    let x = x1;
    let y = y1;

    for (let i = 0; i <= steps; i++) {
        that.setPixel(Math.round(x), Math.round(y), color);
        x += xIncrement;
        y += yIncrement;
    }
}

// Export the function
export default drawLineDDA;
