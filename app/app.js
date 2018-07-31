import 'angular'
import mineSweeperController from './controller.js';
import './styles.css';

let moduleName = 'minesweeper';

angular.module(moduleName, [])
    .controller('MineSweeperController', mineSweeperController);

export default moduleName;
