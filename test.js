const addBoxBtn = document.querySelector('.add_box'),
    body = document.querySelector("body");

let mouse_down = false;
let line;
let start_btn_class, start_x, start_y;
let box_index = 1;
let degree;

function mouseDownHandler(event) {
    const {
        clientX,
        clientY,
        target,
    } = event;

    mouse_down = true;

    start_btn_class = target.className;
    start_x = clientX;
    start_y = clientY;

    line = document.createElement("div");
    line.className = "line not_fixed";
    line.style.top = `${start_y}px`;
    line.style.left = `${start_x}px`;

    body.appendChild(line);
}

function mouseMoveHandler(event) {
    const {
        clientX,
        clientY,
    } = event;

    if (mouse_down) {
        const width = Math.sqrt(Math.pow((start_x - clientX), 2) + Math.pow((start_y - clientY), 2));
        degree = Math.atan2(clientY - start_y, clientX - start_x) * (180.0 / Math.PI);
        line.style.width = `${width}px`;
        line.style.transform = `rotate(${degree}deg)`;
    }

}

function mouseUpHandler(event) {
    const {
        target,
        clientX,
        clientY,
    } = event;

    mouse_down = false;

    if (target.className.includes("btn") && target.className !== start_btn_class) {
        line.className = "line fixed";
        if (degree < -90 || degree > 90) {
            line.style.top = `${clientY}px`;
            line.style.left = `${clientX}px`;
            degree = Math.atan2(start_y - clientY, start_x - clientX) * (180.0 / Math.PI);
            line.style.transform = `rotate(${degree}deg)`;
        }

    } else {
        const not_fixed_line = document.querySelector('.not_fixed');
        if (not_fixed_line) {
            body.removeChild(not_fixed_line);
        }
    }
}

function addNewBox() {
    const new_box = document.createElement('div');

    new_box.className = `box box_${box_index}`;
    new_box.style.top = "40%";
    new_box.style.left = "40%";

    body.appendChild(new_box);

    $(`.box_${box_index}`).draggable({ cancel: ".btn" });

    for (let i = 0; i < 2; i++) {
        const new_btn = document.createElement('div');
        new_btn.className = `btn btn_${box_index}`;
        new_btn.addEventListener("mousedown", mouseDownHandler);
        new_box.appendChild(new_btn);
    };

    box_index++;
}

function defaultSetting() {
    for (let i = 0; i < 2; i++) {
        addNewBox();
    };

    const box_1 = document.querySelector('.box_1');
    box_1.style.top = "20px";
    box_1.style.left = "20px";

    const box_2 = document.querySelector('.box_2');
    box_2.style.top = "20px";
    box_2.style.left = "200px";
}

function init() {
    defaultSetting();

    body.addEventListener("mousemove", mouseMoveHandler);
    body.addEventListener("mouseup", mouseUpHandler);

    addBoxBtn.addEventListener("click", addNewBox);
}

init();