function show_canvas() {
    var canvas = document.getElementById("spline");
    canvas.width = document.body.offsetWidth;
    canvas.height = canvas.width;
    var spline_context = canvas.getContext("2d");
    // background
    spline_context.fillStyle = "#eeeeee";
    spline_context.fillRect(0, 0, spline.width, spline.height);
}
show_canvas();
window.onresize = show_canvas;