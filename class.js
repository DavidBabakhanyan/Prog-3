class Grass {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.multiply = 0;


        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];

    }
    chooseCell(character) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }

            }

        }
        return found;
    }
    mul() {
        this.multiply++;
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);


        if (newCell && this.multiply >= 8) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = this.index;

            var newGrass = new Grass(newX, newY, this.index);
            grassArr.push(newGrass);
            this.multiply = 0;
        }
    }

}


class GrassEater {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.energy = 6;
        this.directions = [];
        this.multiply = 8;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ]
    }
    chooseCell(character) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }

            }

        }
        return found;
    }
    mul() {

        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);


        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 2;

            var newGrassEater = new GrassEater(newX, newY, this.index);
            grassEaterArr.push(newGrassEater);
            this.energy = 6;
        }
    }
    eat() {
        this.energy++;
        if (this.energy >= 8) {
            this.mul();
        }
        var GrassCells = this.chooseCell(1);
        var newcell = random(GrassCells);
        if (newcell) {

            var newX = newcell[0];
            var newY = newcell[1];
            matrix[newY][newX] = 2;
            matrix[this.y][this.x] = 0;
            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }


            this.x = newX;
            this.y = newY;

        }
        else {
            this.move();
        }
    }

    move() {
        this.energy--;
        if (this.energy == 0) {
            this.die();
        }
        else {
            var EmptyCells = this.chooseCell(0);
            var Newcell = random(EmptyCells);
            if (Newcell) {

                var newX = Newcell[0];
                var newY = Newcell[1];
                matrix[this.y][this.x] = 0;
                matrix[newY][newX] = 2;
                this.x = newX;
                this.y = newY;
            }
        }
        this.energy--;



    }
    die() {
        matrix[this.y][this.x] = 0;
        for (var i in grassEaterArr) {
            if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                grassEaterArr.splice(i, 1);
            }
        }
    }
}

class Predator {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 3;
        this.directions = [];
        this.multiply = 8;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ]
    }
    chooseCell(character) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }

            }

        }
        return found;
    }
    mul() {

        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);


        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 3;

            var newPredator = new Predator(newX, newY, 3);
            predatorArr.push(newPredator);
            this.energy = 1;
        }
    }
    eat() {
        this.energy++;
        if (this.energy >= 15) {
            this.mul();
        }
        var GrassEaterCells = this.chooseCell(2);
        var newcell = random(GrassEaterCells);
        if (newcell) {

            var newX = newcell[0];
            var newY = newcell[1];
            matrix[newY][newX] = 3;
            matrix[this.y][this.x] = 0;
            for (var i in grassEaterArr) {
                if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }


            this.x = newX;
            this.y = newY;

        }
        else {
            this.move();
        }
    }
    move() {
        this.energy--;
        if (this.energy <= 2) {
            this.die();
        }
        else {

            var EmptyCells = this.chooseCell(0);
            var Newcell = random(EmptyCells);
            if (Newcell) {
                this.energy--;
                var newX = Newcell[0];
                var newY = Newcell[1];
                matrix[this.y][this.x] = 0;
                matrix[newY][newX] = 3;
                this.x = newX;
                this.y = newY;
            }
        }




    }
    die() {
        matrix[this.y][this.x] = 0;
        for (var i in predatorArr) {
            if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
                predatorArr.splice(i, 1);
            }
        }
    }
}

class Cloud {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.directions = [];
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
            [this.x - 2, this.y - 2],
            [this.x - 1, this.y - 2],
            [this.x, this.y - 2],
            [this.x + 1, this.y - 2],
            [this.x + 2, this.y - 2],
            [this.x + 2, this.y - 1],
            [this.x + 2, this.y],
            [this.x + 2, this.y + 1],
            [this.x + 2, this.y + 2],
            [this.x + 1, this.y + 2],
            [this.x, this.y + 2],
            [this.x - 1, this.y + 2],
            [this.x - 2, this.y + 2],
            [this.x - 2, this.y + 1],
            [this.x - 2, this.y],
            [this.x - 2, this.y - 1]
        ]
    }
    chooseCell(character) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }

            }

        }
        return found;
    }
    move() {
        var EmptyCells = this.chooseCell(0);
        var Newcell = random(EmptyCells);
        if (Newcell) {

            var newX = Newcell[0];
            var newY = Newcell[1];

            for (var i in cloudArr) {
                if (this.x == cloudArr[i].x && this.y == cloudArr[i].y) {
                    cloudArr.splice(i, 1);
                }
            }

            matrix[this.y][this.x] = 1;
            var newGrass = new Grass(newX, newY, 1);
            grassArr.push(newGrass);
            matrix[newY][newX] = 4;
            var newCloud = new Cloud(newX, newY, 4);
            cloudArr.push(newCloud);

            this.x = newX;
            this.y = newY;
        }
    }

}


class Fire {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.directions = [];
        this.energy = 185;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ]
    }
    chooseCell(character) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }

            }

        }
        return found;
    }
    destroy() {
        this.getNewCoordinates();
        var Cells = this.directions;
        if(Cells){
        for (var i in Cells) {
            var newX = Cells[i][0];
            var newY = Cells[i][1];
            
            if (newX >= 0 && newX <= 45 && newY >= 0 && newY <= 45 && matrix[newY][newX] == 1) {
                matrix[newY][newX] = 0;
                for (var j in grassArr) {
                    if (newX == grassArr[j].x && newY == grassArr[j].y) {
                        grassArr.splice(j, 1);
                    }
                }
            }
            else if (newX >= 0 && newX <= 12 && newY >= 0 && newY <= 12 && matrix[newY][newX] == 2) {
                matrix[newY][newX] = 0;
                for (var g in grassEaterArr) {
                    if (newX == grassEaterArr[g].x && newY == grassEaterArr[g].y) {
                        grassEaterArr.splice(g, 1);
                    }
                }
            }
            else if (newX >= 0 && newX <= 12 && newY >= 0 && newY <= 12 && matrix[newY][newX] == 3) {
                matrix[newY][newX] = 0;
                for (var p in predatorArr) {
                    if (newX == predatorArr[p].x && newY == predatorArr[p].y) {
                        predatorArr.splice(p, 1);
                    }
                }
            }
            else{
                this.move();
            }
            
        }
    }
    }
    move() {

        if (this.energy == 0) {
            this.die();
        }
        else {

            var EmptyCells = this.chooseCell(0);
            var Newcell = random(EmptyCells);
            if (Newcell) {
                this.energy--;
                var newX = Newcell[0];
                var newY = Newcell[1];
                matrix[this.y][this.x] = 0;
                matrix[newY][newX] = 5;
                this.x = newX;
                this.y = newY;
            }
        }
    }
    die() {
        matrix[this.y][this.x] = 0;
        for (var i in fireArr) {
            if (this.x == fireArr[i].x && this.y == fireArr[i].y) {
                fireArr.splice(i, 1);
            }
        }
    }
}