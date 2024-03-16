import drawLineDAA from "./algorithm/daa.js"
import drawLineBresenham from "./algorithm/bresenham.js";
import drawCircleMidpoint from "./algorithm/midpoint.js"
class Painter {
    constructor() {
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext('2d');
        this.canvas.setAttribute("width", 800);
        this.canvas.setAttribute("height", 600);
        this.imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        this.state = 0;

        this.startPoint = {x: -1, y:-1};
        this.endPoint = {x:-1 , y :-1};
        this.algorithm = "daa" ; //breseham,midpoint

        this.points = []; // array : ["daa", {x:-1,y: -1}, {x: -1 , y : -1}]
        this.bgRgba = [240, 240, 200, 255];
        this.pointRgba = [0, 0, 255, 255];
        this.lineRgba = [0, 0, 0, 255];
        this.vlineRgba = [255, 0, 0, 255];

        this.canvas.addEventListener('mousedown', this.handleMouseDown.bind(this));
        this.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
        this.canvas.addEventListener('mouseup', this.handleMouseUp.bind(this));
        this.canvas.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
        document.addEventListener("keydown", this.handleESCKey.bind(this));
        this.resetButton = document.getElementById("reset");
        this.resetButton.addEventListener('click', this.handleReset.bind(this));

        this.selectElement =  document.getElementById('algorithmSelect');
        this.selectElement.addEventListener('change', this.handleSelect.bind(this));
    }

    setPixel(x, y, color) {
        const index = (x + y * this.imageData.width) * 4;
        this.imageData.data[index] = color[0];
        this.imageData.data[index + 1] = color[1];
        this.imageData.data[index + 2] = color[2];
        this.imageData.data[index + 3] = 255; // Alpha channel
    }

    drawLine(x1, y1, x2, y2, color) {
        const dx = x2 - x1;
        const dy = y2 - y1;
        const steps = Math.max(Math.abs(dx), Math.abs(dy));
        const xIncrement = dx / steps;
        const yIncrement = dy / steps;

        let x = x1;
        let y = y1;

        for (let i = 0; i <= steps; i++) {
            this.setPixel(Math.round(x), Math.round(y), color);
            x += xIncrement;
            y += yIncrement;
        }
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.imageData = this.ctx.createImageData(this.canvas.width, this.canvas.height);
    }

    draw() {
        this.clearCanvas();
        if (this.state) {
            switch (this.algorithm) {
                case "breseham":
                    drawLineBresenham(this, this.startPoint.x, this.startPoint.y, this.endPoint.x,this.endPoint.y, this.vlineRgba);
                    break;
                case "midpoint":
                    drawCircleMidpoint(this, this.startPoint.x, this.startPoint.y, this.endPoint.x,this.endPoint.y, this.vlineRgba);
                    break;
                default:
                    drawLineDAA(this, this.startPoint.x, this.startPoint.y, this.endPoint.x,this.endPoint.y, this.vlineRgba);
                    break;
            }
        }
        for (let i = 0; i < this.points.length; i++) {
            const [algorithm,start, end] = this.points[i];
            switch (algorithm) {
                case "breseham":
                    drawLineBresenham(this, start.x, start.y, end.x, end.y, this.lineRgba);
                    break;
                case "midpoint":
                    drawCircleMidpoint(this, start.x, start.y, end.x,end.y, this.lineRgba) ;
                    break;
                default:
                    drawLineDAA(this,start.x,start.y,end.x,end.y,this.lineRgba);
                    break;

            }
            
        }

        this.ctx.putImageData(this.imageData, 0, 0);
    }
    getPosOnCanvas (x, y){
        var bbox = canvas.getBoundingClientRect();
        return {x: Math.floor(x - bbox.left * (canvas.width / bbox.width) + 0.5),y:
        Math.floor(y - bbox.top * (canvas.height / bbox.height) + 0.5)};
    }
    handleMouseDown(e) {
        this.state = 1;
        this.startPoint = this.getPosOnCanvas(e.clientX, e.clientY);
    }

    handleMouseMove(e) {
        if (this.state == 1) {
            this.endPoint =  this.getPosOnCanvas(e.clientX, e.clientY);
            this.draw();
        }
    }

    handleMouseUp() {
        this.state = 0;
        this.points.push([this.algorithm,this.startPoint, this.endPoint]);
        console.log(this.points)
        this.draw()
    }

    handleMouseLeave() {
        this.state = 0;
    }
    handleESCKey(event) {
        if (event.key === 'Escape'){
            this.state = 0 ;
            this.points.push([this.algorithm,this.startPoint, this.endPoint]);
            this.draw() 
            console.log("user bảo out")
        }
    }
    handleReset() {
        this.points = [];
        this.clearCanvas();
    }
    handleSelect (event) {
        const selectedValue = event.target.value;
        console.log(selectedValue); 
        this.algorithm = selectedValue ;
        
    }
}

// document.addEventListener('DOMContentLoaded', () => {
//     const drawingApp = new DrawingApp('canvas', 'reset');
// });
export default Painter;