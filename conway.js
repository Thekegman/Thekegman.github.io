const CSCALE = 1;
var canvas;
var ctx;
var board;
var w;
var h;
var timeout;

function blank_board(x, y) {
    return new Array(y).fill(0).map(() => new Array(x).fill(0));
}

function add_glider(x, y) {
    board[y][x - 1] = 1;
    board[y][x] = 1;
    board[y][x + 1] = 1;
    board[y - 1][x + 1] = 1
    board[y - 2][x] = 1
}

function get_neighbour_count(x, y) {
    let sum = 0;
    if (x > 0)
        sum += board[y][x - 1];
    if (x < w - 1)
        sum += board[y][x + 1];
    if (y > 0) {
        sum += board[y - 1][x];
        if (x > 0)
            sum += board[y - 1][x - 1];
        if (x < w - 1)
            sum += board[y - 1][x + 1];
    }
    if (y < h - 1) {
        sum += board[y + 1][x];
        if (x > 0)
            sum += board[y + 1][x - 1];
        if (x < w - 1)
            sum += board[y + 1][x + 1];
    }
    return sum;

}

function next_state() {
    let next_board = blank_board(w, h);
    for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
            next_board[y][x] = board[y][x];
            let n = get_neighbour_count(x, y);
            if (n < 2 || n > 3)
                next_board[y][x] = 0;
            if (n === 3)
                next_board[y][x] = 1;
        }
    }
    return next_board;
}

function draw() {
    ctx.fillStyle = "#eeeeee";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    let imgData = ctx.getImageData(0, 0, w, h);
    for (let y in board) {
        for (let x in board[y]) {
            if (board[y][x]) {
                imgData.data[y * w * 4 + x * 4] = 0;
                imgData.data[y * w * 4 + x * 4 + 1] = 0;
                imgData.data[y * w * 4 + x * 4 + 2] = 0;
                imgData.data[y * w * 4 + x * 4 + 3] = 255;
            }
        }
    }
    ctx.putImageData(imgData, 0, 0);
    board = next_state();
    if (timeout)
        clearTimeout(timeout);
    timeout = setTimeout(() => requestAnimationFrame(draw), 25);
}

function build_canvas() {
    size_on_screen = Math.round(document.getElementsByTagName('header')[0].offsetWidth * 0.8)
    canvas.style.width = size_on_screen + "px";
    canvas.style.height = size_on_screen + "px";
    canvas.width = size_on_screen * 0.5;
    canvas.height = size_on_screen * 0.5;
    w = canvas.width;
    h = canvas.height;
    board = blank_board(w, h);
    for (let i = 0; i < w; i++) {
        let x = Math.floor(Math.random() * (w - 3) + 3);
        let y = Math.floor(Math.random() * (h - 3) + 3);
        add_glider(x, y);
    }
    draw();
}


function conway_init() {
    window.onresize = () => requestAnimationFrame(build_canvas);
    canvas = document.getElementById("conway");
    ctx = canvas.getContext("2d");
    requestAnimationFrame(build_canvas);
}