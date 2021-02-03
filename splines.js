var dotx;
var doty;
var spline = document.getElementById("spline");
var spline_context;

function docReady(fn) {
    // see if DOM is already available
    if (document.readyState === "complete" || document.readyState === "interactive") {
        // call on next available tick
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}

function draw_grid() {
    size = spline.offsetWidth;
    segCount = 10;
    segSize = size / segCount;
    console.log(size, segSize);
    spline_context.beginPath();
    for (var pos = 0; pos < size; pos += segSize) {
        console.log(pos);
        spline_context.moveTo(pos, 0);
        spline_context.lineTo(pos, size);
        spline_context.moveTo(0, pos);
        spline_context.lineTo(size, pos);
    }

    spline_context.strokeStyle = "#999999";
    spline_context.stroke();
    spline_context.closePath();
}

function draw() {
    spline_context.fillStyle = "#eeeeee";
    spline_context.fillRect(0, 0, spline.width, spline.height);
    draw_grid(spline_context);
}

function build_canvas() {
    spline_context = spline.getContext("2d");
    spline.width = document.getElementsByTagName('header')[0].offsetWidth;
    spline.height = spline.width;
    draw();
}

requestAnimationFrame(build_canvas);