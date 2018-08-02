export default function mineSweeperController($timeout) {
    let vm = this;
    vm.grid = [];
    vm.gridWidth = 8;
    vm.numMines = 10;
    vm.gridWidthOptions = Array(10).fill().map((_, i) => i + 5);
    vm.numMinesOptions = Array(25).fill().map((_, i) => i + 5);

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
        if (cell.hasMine && !cell.clickedMine) {
            vm.clickedMine = true;
            cell.clicked = true;
            vm.cheatActive = true;
            $timeout(() => {
                vm.playingGame = false;
                vm.endGameState = `hitMine`;
                vm.gameOver = true;
                vm.cheatActive = false;
            }, 2000)
        }
        if (!vm.clickedMine) {
            if (cell.numSurroundingMines == 0) {
                markSurroundingMines(cell);
            }
            cell.clicked = true;
        }
    }

    vm.showMines = () => {
        vm.cheatActive = true;
        $timeout(() => {
            vm.cheatActive = false;
        }, 3000)
    }

    vm.checkForVictory = () => {
        vm.playingGame = false;
        vm.gameOver = true;
        for (let i = 0; i < vm.gridWidth; i++) {
            for (let j = 0; j < vm.gridWidth; j++) {
                if (!vm.grid[i][j].clicked && vm.grid[i][j].hasMine) {
                    vm.endGameState = `attemptFail`;
                    return;
                }
            }
        }
        vm.endGameState = `victory`;
    }

    vm.newGame = () => {
        vm.grid = [];
        createGrid();
        addMines();
        setNumAdjacentMines();
        vm.playingGame = true;
        vm.gameOver = false;
        vm.clickedMine = false;
        vm.endGameState = null;
    }
}
