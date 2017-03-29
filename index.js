const VERTICAL = 'vertical';
const HORIZONTAL = 'horizontal';

const Dungeon = {
    init(width, height, minRoomSize, maxRoomSize) {
      // Create an empty 2D array width x height
      this.level = Array.apply(null, {length: height}).map(() => Array.apply(null, {length: width}));
      this.minRoomSize = 5;
      this.maxRoomSize = 20;
      this.counter = 2;
      this.tree = {
        level: this.level,
      }
      this.listOfTreeNodes = [];
      this.split(this.tree);
      this.connectRooms(this.tree);
    },
    setMinRoomSize(num) {
      if (num > this.maxRoomSize) {
        throw "Minimum room size cannot be larger than the maximum room size of " + this.maxRoomSize;
        return;
      }
      this.minRoomSize = num;
    },
    setMaxRoomSize(num) {
      if (num < this.minRoomSize) {
        throw "Maximum room size cannot be smaller than the minumum room size of " + this.minRoomSize;
        return;
      }
      this.minRoomSize = num;
    },
    split(node) {

      if (node.level.length > this.maxRoomSize || node.level[0].length > this.maxRoomSize) {
        // If this condition is true, then we need to split again.
        let directionOptions = [];
        if (node.level.length > this.maxRoomSize) {
          directionOptions.push(HORIZONTAL);
        }
        if (node.level[0].length > this.maxRoomSize) {
          directionOptions.push(VERTICAL);
        }
        const min = this.minRoomSize;
        const direction = randomDirection(directionOptions)
        const max = direction === VERTICAL ? node.level[0].length - min : node.level.length - min;
        const indexToSplit = randomIndexBetweenValues(min, max);

        let lNode = node.leftNode = {};
        let rNode = node.rightNode = {};
        node.splitDirection = direction;
        node.splitIndex = indexToSplit;

        /**
         * Split the rooms either vertically or horizontally
         */
        if (direction === 'vertical') {
          lNode.level = node.level.map(row => row.slice(0, indexToSplit));
          rNode.level = node.level.map(row => row.slice(indexToSplit, row.length));
        } else {
          lNode.level = node.level.slice(0, indexToSplit);
          rNode.level = node.level.slice(indexToSplit, node.level.length);
        }

        this.split(lNode);
        this.split(rNode);

        /**
         * WHEN I SPLIT THE ARRAYS, I USE MAP WHICH MAKES A **COPY**, THEREFORE I DO NEED TO SOW THE ARRAYS BACK TOGETHER
         */
                          /**
                           * Join the rooms back together
                           */
                          // node.level = [];
                          // if (direction === 'vertical') {

                          //   node.level = lNode.level.reduce((obj, val, index) => {
                          //     let temp = [];
                          //     temp.push(...lNode.level[index]);
                          //     temp.push(...rNode.level[index]);
                          //     obj.push(temp);
                          //       return obj;
                          //   }, []);
                            
                          // } else {

                          //   // If we get to this point, then the slice was horizontal
                          //   node.level.push(...lNode.level);
                          //   node.level.push(...rNode.level);
                          
                          // }

        // this.connectRooms(node);

      } else {
        /**
         * If we reach this point, then we can guarantee that the room does not have any children.
         * I.e. it's the smallest leaf node
         */
        this.counter += 1;
        node.level = node.level.map(row => row.map(() => this.counter));
        node.level = AddRoomBoundaries(node.level);
      }

      
    },
    connectRooms(node) {
      // We have a list of nodes where their two child nodes need to be joined
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

      const lNode = node.leftNode.level;
      const rNode = node.rightNode.level;



      /**
       * Both rooms now have boundary walls. Add a pathway at a random index.
       */
      node.corridorIndex = undefined;
      if (node.splitDirection === VERTICAL) {
        // For vertical cut, the corridor will be horizontal. So somewhere along the 0 -> firstRoom.length axis
        const vIndex = Math.floor(Math.random() * (lNode.length - 1)) + 1;
        node.corridorIndex = vIndex;
        lNode[vIndex][lNode[0].length - 1] = 0;
        lNode[vIndex][lNode[0].length - 2] = 0;
        rNode[vIndex][0] = 0;
        rNode[vIndex][1] = 0;
      } else {
      // For horizontal cut, the corridor will be vertical. So somewhere along the firstRoom[row[0]] -> firstRoom[row.length] axis
        const hIndex = Math.floor(Math.random() * (lNode[0].length - 1)) + 1;
        node.corridorIndex = hIndex;
        lNode[lNode.length - 1][hIndex] = 0;
        lNode[lNode.length - 2][hIndex] = 0;
        rNode[0][hIndex] = 0;
        rNode[1][hIndex] = 0;
      }

      /**
       * Join the rooms back together
       */
      node.level = [];
      if (node.splitDirection === VERTICAL) {

        node.level = lNode.reduce((obj, val, index) => {
          let temp = [];
          temp.push(...lNode[index]);
          temp.push(...rNode[index]);
          obj.push(temp);
            return obj;
        }, []);
        
      } else {

        // If we get to this point, then the slice was horizontal
        node.level.push(...lNode);
        node.level.push(...rNode);
      
      }
    }
};

const dungeon = Object.create(Dungeon);

/**
 * 50% chance of returning a 0
 * 50% chance of returning a 1
 * 
 * @returns {number} 0 or 1
 */
function fiftyfifty() {
  return randomIndexBetweenValues(0, 1);
}

/**
 * Return a random direction of vertical or horizontal
 * 
 * @returns {string} 'vertical' or 'horizontal'
 */
function randomDirection(directionOptions = [VERTICAL, HORIZONTAL]) {
  if (directionOptions.length === 0) {
    return '';
  }

  const numOptions = directionOptions.length - 1;
  return directionOptions[randomIndexBetweenValues(0, numOptions)];
}

/**
 * Returns a random number between min and max
 * 
 * @param {number} min minimum random number to return
 * @param {number} max maximum random number to return
 * @returns {number}
 */
function randomIndexBetweenValues(min, max) {
  return Math.floor((Math.random() * (max - min + 1)) + min);
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
function NewDungeon({width = 50, height = 50, minRoomSize = 5, maxRoomSize = 20}) {
  dungeon.init(width, height, minRoomSize, maxRoomSize);
  return dungeon.tree;
}

function DrawDungeonTree(div, arr) {
  arr.forEach(row => {
    const outerDiv = document.createElement('div');
    row.forEach(tile => {
      const innerDiv = document.createElement('div');
      innerDiv.innerText = tile;
      innerDiv.style.display = "inline-block";
      innerDiv.style.width = "25px";
      innerDiv.style.height = "20px";
      outerDiv.appendChild(innerDiv);
    });
    div.appendChild(outerDiv);
  });
}

    
    
/**
 * Add blocking tiles around the parameter of the 2d array
 * 
 * @param {array} array 2d array representing a room
 */
function AddRoomBoundaries(array) {
  const height = array.length - 1;
  const width = array[0].length - 1;
  array = array.map((row, rIndex) => {
    return row.map((col, cIndex) => {
      if (rIndex === 0 || rIndex === height) {
        return 1;
      }
      if (cIndex === 0 || cIndex === width) {
        return 1;
      }
      return col;
    });
  });
  return array;
}

//var a = NewDungeon(50,50);
if (!module) { var module = {}; };
module.exports = NewDungeon;