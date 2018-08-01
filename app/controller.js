export default function mineSweeperController() {
    let vm = this;
    vm.grid = [];
    vm.gridWidth = 8;
    vm.numMines = 10;

    let createGrid = () => {
        for (let i = 0; i < vm.gridWidth; i++) {
            vm.grid[i] = [];
            for (let j = 0; j < vm.gridWidth; j++) {
                vm.grid[i].push({
                    'hasClicked': false,
                    'hasMine': false,
                    'row': i,
                    'column': j,
                });
            }
        }

    }
    let addMines = () => {
        let numMinesAdded = 0;
        while (numMinesAdded < vm.numMines) {
            let randomRow = Math.floor(Math.random() * vm.gridWidth)
            let randomCol = Math.floor(Math.random() * vm.gridWidth)
            if (!vm.grid[randomRow][randomCol].hasMine) {
                vm.grid[randomRow][randomCol].hasMine = true;
                numMinesAdded++;
            }
        }
    }

    let setNumAdjacentMines = () => {
        for (let i = 0; i < vm.gridWidth; i++) {
            for (let j = 0; j < vm.gridWidth; j++) {
                let numSurroundingMines = 0;
                for (let k = i - 1; k <= i + 1; k++) {
                    for (let l = j - 1; l <= j + 1; l++) {
                        if (k >= 0 && k < vm.gridWidth && l >= 0 && l < vm.gridWidth && !(k === i && l === j)) {
                            if (vm.grid[k][l].hasMine) {
                                numSurroundingMines++;
                            }
                        }
                    }
                }
                vm.grid[i][j].numSurroundingMines = numSurroundingMines;
            }
        }
    }

    let markSurroundingMines = (cell) => {
        cell.clicked = true;
        for (let k = cell.row - 1; k <= cell.row + 1; k++) {
            for (let l = cell.column - 1; l <= cell.column + 1; l++) {
                if (k >= 0 && k < vm.gridWidth && l >= 0 && l < vm.gridWidth && !(k === cell.row && l === cell.column)) {
                    if (vm.grid[k][l].numSurroundingMines === 0 && !vm.grid[k][l].clicked) {
                        markSurroundingMines(vm.grid[k][l]);
                    }
                }
            }
        }
    }

    vm.clickedCell = (cell) => {
        if (cell.numSurroundingMines == 0) {
            markSurroundingMines(cell);
        }
        cell.clicked = true;
    }

    createGrid();
    addMines();
    setNumAdjacentMines();

    vm.gameName = 'Minesweeper';
}
