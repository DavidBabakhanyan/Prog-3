var matrix = [];

var side = 10;
var grassArr = [];
var grassEaterArr = [];
var predatorArr = [];
var cloudArr = [];
var fireArr = [];


function setup() {
    frameRate(5);

    background('#acacac');

    for (var y = 0; y <= 45; y++) {
        matrix[y] = []
        for (var x = 0; x <= 45; x++) {
            var a = random(0, 100);
            if (a < 35) {
                matrix[y][x] = 0;
            }
            else if (a > 35 && a < 65) {
                matrix[y][x] = 1;
            }
            else if (a > 65 && a < 90) {
                matrix[y][x] = 2;
            }
            else if (a > 90 && a < 91) {
                matrix[y][x] = 3;
            }
            else if (a > 91 && a < 94) {
                matrix[y][x] = 4;
            }
            else if (a > 94 && a <= 100) {
                matrix[y][x] = 5;
            }
        }
        createCanvas(matrix[0].length * side, matrix.length * side);
    }


    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                grassArr.push(new Grass(x, y, 1));
            }
        }
    }
    for (var c = 0; c < matrix.length; c++) {
        for (var d = 0; d < matrix[c].length; d++) {
            if (matrix[c][d] == 2) {
                grassEaterArr.push(new GrassEater(d, c));
            }
        }
    }
    for (var e = 0; e < matrix.length; e++) {
        for (var f = 0; f < matrix[e].length; f++) {
            if (matrix[e][f] == 3) {
                predatorArr.push(new Predator(f, e));
            }
        }
    }
    for (var n = 0; n < matrix.length; n++) {
        for (var m = 0; m < matrix[n].length; m++) {
            if (matrix[n][m] == 4) {
                cloudArr.push(new Cloud(m, n));
            }
        }
    }
    for (var v = 0; v < matrix.length; v++) {
        for (var s = 0; s < matrix[v].length; s++) {
            if (matrix[v][s] == 5) {
                fireArr.push(new Fire(s, v));
            }
        }
    }
}

function draw() {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("green");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 3) {
                fill("red");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 4) {
                fill("blue");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 5) {
                fill("orange");
                rect(x * side, y * side, side, side);
            }

        }
    }
    for (var i in grassArr) {
        grassArr[i].mul();
    }
    for (var j in grassEaterArr) {
        grassEaterArr[j].eat();
    }
    for (var k in predatorArr) {
        predatorArr[k].eat();
    }
    for (var l in cloudArr) {
        cloudArr[l].move();
    }
    for (var w in fireArr) {
        fireArr[w].destroy();
    }
}