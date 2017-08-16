var count = 0;
var currentElement = 0;
var newElmId = 0;

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.currentTarget.id);
    if (ev.currentTarget.classList.contains('quarter')) {
        currentElement = 25;
    } else if (ev.currentTarget.classList.contains('dime')) {
        currentElement = 10;
    } else if (ev.currentTarget.classList.contains('nickel')) {
        currentElement = 5;
    } else if (ev.currentTarget.classList.contains('penny')) {
        currentElement = 1;
    }
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    if (data.indexOf('new') < 0) {
        var newElm = document.getElementById(data).cloneNode(true);
        newElm.id = 'new' + newElmId++;
        console.log(newElm);
        ev.target.appendChild(newElm);
    }
    else{
        document.getElementById(data).remove();
    }
    count = ev.target.id == "div2" ? count + currentElement : count - currentElement;
    document.getElementById('count').innerText = count;
}