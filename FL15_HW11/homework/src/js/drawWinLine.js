const lineDrawer = document.getElementById('lineDrawer');
export default (path) => {
    var ctx = lineDrawer.getContext("2d");
    ctx.beginPath();
    if(path[0] < 3) {
        ctx.moveTo((path[0] % 3 + 1) * 200 - 100, 100);
    } else if(path[0] < 6) {
        ctx.moveTo((path[0] % 3 + 1) * 200 - 100, 300);
    } else {
        ctx.moveTo((path[0] % 3 + 1) * 200 - 100, 500);
    }
    if(path[2] < 3) {
        ctx.lineTo((path[2] % 3 + 1) * 200 - 100, 100);
    } else if(path[2] < 6) {
        ctx.lineTo((path[2] % 3 + 1) * 200 - 100, 300);
    } else {
        ctx.lineTo((path[2] % 3 + 1) * 200 - 100, 500);
    }

    
    ctx.strokeStyle = '#ff0000';
    ctx.save();
    ctx.scale(5,5)
    ctx.stroke();
    lineDrawer.style.zIndex = 0;
    ctx.restore();
}