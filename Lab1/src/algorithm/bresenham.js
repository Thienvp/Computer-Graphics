// drawLineBresenham.js
function drawLineBresenham(that, x0, y0, x1, y1, color) {
    let dx = x1 - x0;
    let dy = y1 - y0;
    dx = Math.abs(dx) ;
    dy = Math.abs(dy) ;


    if (dx==0 && dy ==0) return ;
    if (Math.abs(dy) <= Math.abs(dx)) { // TH1: Nếu line tăng chậm 
        if ( x0 > x1 ) {// Điểm đầu nằm bên phải => Đổi điểm
            let tx = x0 ; x0 = x1; x1 =tx ; 
            let ty = y0 ; y0 = y1 ; y1 = ty ; 
        }
        let x_step = (x1 - x0) >= 0 ? 1 : -1 ;
        let y_step = (y1 - y0) >=0 ? 1: -1 ;
        let p = 2* dy - dx ;
        let y = y0 ;
        for ( let x =x0 ; x <= x1 ; x+= x_step) {
            that.setPixel(x , Math.floor(y + 0.5),color) ;
            if (p < 0) {
                p += 2*dy ;
                // yi = yi ;
            }
            else {
                p += 2*(dy - dx);
                y += y_step;
            }
        }
    }
    else { // Line tăng nhanh 
        if ( y0 > y1) { // TH2: Điểm đầu nằm bên trên => Đổi điểm
            let tx = x0 ; x0 = x1 ; x1 = tx ;
            let ty = y0 ; y0 = y1 ; y1 = ty ;
        }
        let x_step = (x1-x0) >= 0 ? 1 : -1 ;
        let y_step = (y1-y0) >=0 ? 1: -1 ;

        let p = 2*dx - dy ;
        let x = x0 ;
        for (let y = y0 ; y < y1 ; y += y_step) {
            that.setPixel(Math.floor(x + 0.5 ) ,y , color) ;
            if (p < 0 ) {
                p += 2* dx ;
                //x = x
            }
            else {
                p += 2* (dx -  dy) ;
                x += x_step ;
            }
        }

    }
}

export default drawLineBresenham ;