const board_pad = 5;
var canvas;
var ctx;
var board;
var board_w;
var board_h;
var view_w;
var view_h;
var timeout;
var frame_delay = 30;
var run_animation = false;
var first_open = true;

function blank_board(x, y) {
    return new Array(y).fill(0).map(() => new Array(x).fill(0));
}

function random_board() {
    let width = Math.floor(Math.random() * (view_w / 2));
    let height = Math.floor(Math.random() * (view_h / 2));
    let x = Math.floor(Math.random() * (view_w - width)) + board_pad;
    let y = Math.floor(Math.random() * (view_h - height)) + board_pad;

    for (let x1 = 0; x1 < width; x1++) {
        for (let y1 = 0; y1 < height; y1++) {
            board[y + y1][x + x1] = Math.round(Math.random());
        }
    }
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
    if (x !== 0)
        sum += board[y][x - 1];
    if (x < board_w - 1)
        sum += board[y][x + 1];
    if (y !== 0) {
        sum += board[y - 1][x];
        if (x !== 0)
            sum += board[y - 1][x - 1];
        if (x < board_w - 1)
            sum += board[y - 1][x + 1];
    }
    if (y < board_h - 1) {
        sum += board[y + 1][x];
        if (x !== 0)
            sum += board[y + 1][x - 1];
        if (x < board_w - 1)
            sum += board[y + 1][x + 1];
    }
    return sum;

}

function next_state() {
    let next_board = blank_board(board_w, board_h);
    for (let y = 0; y < board_h; y++) {
        for (let x = 0; x < board_w; x++) {
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
    ctx.fillStyle = '#1a252b';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    let imgData = ctx.getImageData(0, 0, view_w, view_h);
    for (let x = 0; x < view_w; x++) {
        for (let y = 0; y < view_h; y++) {
            if (board[y + board_pad][x + board_pad]) {
                imgData.data[y * view_w * 4 + x * 4] = 214;
                imgData.data[y * view_w * 4 + x * 4 + 1] = 176;
                imgData.data[y * view_w * 4 + x * 4 + 2] = 177;
                imgData.data[y * view_w * 4 + x * 4 + 3] = 255;
            }

        }
    }
    ctx.putImageData(imgData, 0, 0);
    board = next_state();
    if (timeout)
        clearTimeout(timeout);
    if (run_animation)
        timeout = setTimeout(() => requestAnimationFrame(draw), frame_delay);
}

function build_canvas() {
    size_on_screen = Math.round(document.getElementsByTagName('header')[0].offsetWidth * 0.8)
    canvas.style.width = size_on_screen + "px";
    canvas.style.height = size_on_screen + "px";
    canvas.width = size_on_screen * 0.5;
    canvas.height = size_on_screen * 0.5;
    view_w = canvas.width;
    view_h = canvas.height;
    board_w = view_w + board_pad * 2;
    board_h = view_h + board_pad * 2;
    if (first_open) {
        init_board();
        first_open = false;
    }
    draw();
}

function init_board() {
    board = blank_board(board_w, board_h);
    for (let i = 0; i < board_w; i++) {
        let x = Math.floor(Math.random() * (board_w - 3) + 3);
        let y = Math.floor(Math.random() * (board_h - 3) + 3);
        add_glider(x, y);
    }
}

function onresize() {
    requestAnimationFrame(build_canvas);
}

function conway_init() {
    document.getElementById('conway-clear').addEventListener('click', () => board = blank_board(board_w, board_h));
    document.getElementById('conway-random').addEventListener('click', random_board);
    document.getElementById('conway-addglider').addEventListener('click', () => {
        let x = Math.floor(Math.random() * (board_w - 3) + 3);
        let y = Math.floor(Math.random() * (board_h - 3) + 3);
        add_glider(x, y);
    });
    document.getElementById('conway-slider').addEventListener('input', function() {
        frame_delay = 340 / this.value;
    });
    run_animation = true;
    window.addEventListener('resize', onresize);
    canvas = document.getElementById("conway");
    ctx = canvas.getContext("2d");
    requestAnimationFrame(build_canvas);
}

function conway_end() {
    window.removeEventListener('resize', onresize);
    run_animation = false;
}