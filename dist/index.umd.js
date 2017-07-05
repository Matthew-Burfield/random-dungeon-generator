(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["random-dungeon-generator"] = factory();
	else
		root["random-dungeon-generator"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var VERTICAL = 'VERTICAL';
var HORIZONTAL = 'HORIZONTAL';

/**
 * Returns a random number between min and max
 *
 * @param {number} min minimum random number to return
 * @param {number} max maximum random number to return
 * @returns {number}
 */
function randomIndexBetweenValues(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * Return a random direction of vertical or horizontal
 *
 * @returns {string} 'vertical' or 'horizontal'
 */
function randomDirection() {
  var directionOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [VERTICAL, HORIZONTAL];

  if (directionOptions.length === 0) {
    return '';
  }

  var numOptions = directionOptions.length - 1;
  return directionOptions[randomIndexBetweenValues(0, numOptions)];
}

/**
 * Add blocking tiles around the parameter of the 2d array
 *
 * @param {array} array 2d array representing a room
 */
function AddRoomBoundaries(array) {
  var currHeight = array.length - 1;
  var currWidth = array[0].length - 1;
  return array.map(function (row, rIndex) {
    return row.map(function (col, cIndex) {
      if (rIndex === 0 || rIndex === currHeight || cIndex === 0 || cIndex === currWidth) {
        return 1;
      }
      return col;
    });
  });
}

/**
 * Function used to create a new dungeon object
 *
 * @param {number} [width=50]
 * @param {number} [height=50]
 * @param {number} [minRoomSize=5]
 * @param {number} [maxRoomSize=20]
 * @returns dungeon object
 */
var NewDungeon = function NewDungeon(_ref) {
  var _ref$width = _ref.width,
      width = _ref$width === undefined ? 50 : _ref$width,
      _ref$height = _ref.height,
      height = _ref$height === undefined ? 50 : _ref$height,
      _ref$minRoomSize = _ref.minRoomSize,
      minRoomSize = _ref$minRoomSize === undefined ? 5 : _ref$minRoomSize,
      _ref$maxRoomSize = _ref.maxRoomSize,
      maxRoomSize = _ref$maxRoomSize === undefined ? 20 : _ref$maxRoomSize;

  var Dungeon = {
    init: function init(width, height, minRoomSize, maxRoomSize) {
      // Create an empty 2D array width x height
      this.minRoomSize = 5;
      this.maxRoomSize = 20;
      this.counter = 1;

      // What am I trying to do here?
      this.tree = {
        level: Array.apply(null, { length: height }).map(function () {
          return Array.apply(null, { length: width });
        })
      };
      this.split(this.tree);
      this.connectRooms(this.tree);
    },
    setMinRoomSize: function setMinRoomSize(num) {
      if (num > this.maxRoomSize) {
        throw new Error('Minimum room size cannot be larger than the maximum room size of ' + this.maxRoomSize);
      }
      this.minRoomSize = num;
    },
    setMaxRoomSize: function setMaxRoomSize(num) {
      if (num < this.minRoomSize) {
        throw new Error('Maximum room size cannot be smaller than the minimum room size of ' + this.minRoomSize);
      }
      this.minRoomSize = num;
    },


    /**
     * Given a 2d array (node.level), this function will split the room into two separate arrays
     * and store then in node.lNode.level and node.rNode.level.
     * The split is random (vertical or horizontal)
     * and can be anywhere along the axis as long as it doesn't result in making the room smaller
     * than this.min.
     *
     * @param {object} node
     */
    split: function split(node) {
      var _this = this;

      if (node.level.length > this.maxRoomSize || node.level[0].length > this.maxRoomSize) {
        // If this condition is true, then we need to split again

        var splitDirection = randomDirection(this.getSplitOptions(node.level.length, node.level[0].length));
        var indexToSplit = this.getIndexToSplit(splitDirection, node.level[0].length, node.level.length);

        var lNode = node.leftNode = {};
        var rNode = node.rightNode = {};
        node.splitDirection = splitDirection;
        node.splitIndex = indexToSplit;

        /**
         * Split the rooms either vertically or horizontally and store the
         * new array in the left node and right nodes
         */
        if (splitDirection === VERTICAL) {
          lNode.level = node.level.map(function (row) {
            return row.slice(0, indexToSplit);
          });
          rNode.level = node.level.map(function (row) {
            return row.slice(indexToSplit, row.length);
          });
        } else {
          lNode.level = node.level.slice(0, indexToSplit);
          rNode.level = node.level.slice(indexToSplit, node.level.length);
        }

        /**
         * Recursive call to split the rooms again if needed
         */
        this.split(lNode);
        this.split(rNode);
      } else {
        /**
         * If we reach this point, then we can guarantee that the room does not
         * have any children nodes. I.e. it's the smallest leaf node
         * counter is used so we can visually see the different rooms when the room is rendered
         */
        this.counter += 1;
        node.level = node.level.map(function (row) {
          return row.map(function () {
            return _this.counter;
          });
        });
        node.level = AddRoomBoundaries(node.level);
      }
    },


    /**
     * returns an array with the values VERTICAL if a vertical split is an option, and
     * HORIZONTAL is a horizontal split is an option, or an empy array neither are options.
     * Whether or not it is an option is based on if the size of the room is greater than
     * the maximum allowed room size.
     *
     * @param {number} verticalLength
     * @param {number} horizontalLength
     * @returns {array}
     */
    getSplitOptions: function getSplitOptions(verticalLength, horizontalLength) {
      var directionOptions = [];
      if (verticalLength > this.maxRoomSize) {
        directionOptions.push(HORIZONTAL);
      }
      if (horizontalLength > this.maxRoomSize) {
        directionOptions.push(VERTICAL);
      }
      return directionOptions;
    },


    /**
     * Returns a random number along the vertical or horizontal axis
     *
     * @param {any} verticalLength
     * @param {any} horizontalLength
     * @returns {number}
     */
    getIndexToSplit: function getIndexToSplit(splitDirection, horizontalLength, verticalLength) {
      var min = this.minRoomSize;
      var max = splitDirection === VERTICAL ? horizontalLength - min : verticalLength - min;
      return randomIndexBetweenValues(min, max);
    },


    /**
     * @param {any} node
     * @returns
     */
    connectRooms: function connectRooms(node) {
      /**
       * First, recursively loop through all the rooms so we're starting at the
       * lowest nodes in the tree that have child nodes, and we work our way back up.
       */
      if (node.leftNode) {
        this.connectRooms(node.leftNode);
      } else {
        return;
      }

      if (node.rightNode) {
        this.connectRooms(node.rightNode);
      } else {
        return;
      }

      var lNode = node.leftNode.level;
      var rNode = node.rightNode.level;

      /**
       * Since this function is called after all the rooms have been created, we know that all
       * the rooms already have boundaries. We just need to remove the wall at a random
       * intersecting point.
       */
      if (node.splitDirection === VERTICAL) {
        /**
         * For vertical cut, the corridor will be horizontal.
         * So somewhere along the 0 -> firstRoom.length axis
         * Don't put the corridor on the outer most index values (0 and length - 1) because
         * that can allow the corridor to be on the map boundary
         */
        var vIndex = randomIndexBetweenValues(1, lNode.length - 2);
        node.corridorIndex = vIndex;
        lNode[vIndex][lNode[0].length - 1] = 0;
        lNode[vIndex][lNode[0].length - 2] = 0;
        rNode[vIndex][0] = 0;
        rNode[vIndex][1] = 0;
      } else {
        // For horizontal cut, the corridor will be vertical.
        // So somewhere along the firstRoom[row[0]] -> firstRoom[row.length] axis
        var hIndex = randomIndexBetweenValues(1, lNode[0].length - 2);
        node.corridorIndex = hIndex;
        lNode[lNode.length - 1][hIndex] = 0;
        lNode[lNode.length - 2][hIndex] = 0;
        rNode[0][hIndex] = 0;
        rNode[1][hIndex] = 0;
      }

      /**
       * Combine the child left node and right node rooms back together, and
       * save the result in the current level node.
       */
      node.level = [];
      if (node.splitDirection === VERTICAL) {
        node.level = lNode.reduce(function (obj, val, index) {
          var temp = [];
          temp.push.apply(temp, _toConsumableArray(lNode[index]));
          temp.push.apply(temp, _toConsumableArray(rNode[index]));
          obj.push(temp);
          return obj;
        }, []);
      } else {
        var _node$level, _node$level2;

        // If we get to this point, then the slice was horizontal
        (_node$level = node.level).push.apply(_node$level, _toConsumableArray(lNode));
        (_node$level2 = node.level).push.apply(_node$level2, _toConsumableArray(rNode));
      }
    }
  };

  // /**
  //  * 50% chance of returning a 0
  //  * 50% chance of returning a 1
  //  *
  //  * @returns {number} 0 or 1
  //  */
  // function fiftyfifty() {
  //   return randomIndexBetweenValues(0, 1)
  // }

  var dungeon = Object.create(Dungeon);
  dungeon.init(width, height, minRoomSize, maxRoomSize);
  return dungeon.tree.level;
}; // end NewDungeon

if (window) window.NewDungeon = NewDungeon;
exports.default = NewDungeon;

/***/ })
/******/ ]);
});
//# sourceMappingURL=index.umd.js.map