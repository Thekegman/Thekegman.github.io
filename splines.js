var dotx;
var doty;
var CSCALE = 3;
var spline_canvas;
var spline_context;

function draw_grid() {
    size = spline_canvas.offsetWidth;
    segCount = 10;
    segSize = size / segCount;
    spline_context.beginPath();

    for (var pos = 0; pos < size; pos += segSize) {
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
    spline_context.fillRect(0, 0, spline_canvas.width, spline_canvas.height);
    draw_grid(spline_context);
}

function build_canvas() {
    size_on_screen = Math.round(document.getElementsByTagName('header')[0].offsetWidth * 0.8)
    spline_canvas.style.width = size_on_screen + "px";
    spline_canvas.style.height = size_on_screen + "px";
    spline_canvas.width = size_on_screen * CSCALE;
    spline_canvas.height = size_on_screen * CSCALE;
    spline_context = spline_canvas.getContext("2d");
    spline_context.scale(CSCALE, CSCALE)
    draw();
}

function splines_init() {
    spline_canvas = document.getElementById("spline");
    requestAnimationFrame(build_canvas);
    window.onresize = splines_init;
}