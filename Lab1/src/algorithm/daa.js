function drawLineDDA (that,x0,y0,x1,y1,color) { // that là biến tham chiếu tới class painter 
    let dx = x1 - x0;
    let dy = y1 - y0;
    if (dx==0 && dy ==0) return ;
    if (Math.abs(dy) <= Math.abs(dx)) { // TH1: Nếu line tăng nhanh 
        if ( x0 > x1 ) {// Điểm đầu nằm bên phải => Đổi điểm
            let tx = x0 ; x0 = x1; x1 =tx ; 
            let ty = y0 ; y0 = y1 ; y1 = ty ; 
        }
        let k = dy / dx ;
        let y = y0 ;
        for ( let x =x0 ; x <= x1 ; x++) {
            that.setPixel(x , Math.floor(y + 0.5),color) ;
            y += k ;
        }
    }
    else { // Line tăng chậm 
        if ( y0 > y1) { // TH2: Điểm đầu nằm bên trên => Đổi điểm
            let tx = x0 ; x0 = x1 ; x1 = tx ;
            let ty = y0 ; y0 = y1 ; y1 = ty ;
        }
        let k = dx / dy ;
        let x = x0 ;
        for (let y = y0 ; y <= y1 ; y ++) {
            that.setPixel(Math.floor(x + 0.5 ) ,y , color) ;
            x += k ; 
        }

    }
}
export default drawLineDDA;
