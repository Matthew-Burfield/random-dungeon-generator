const Dungeon = {
    init(width, height) {
      // Create an empty 2D array width x height
      this.level = Array.apply(null, {length: height}).map(() => Array.apply(null, {length: width}));
      this.minRoomSize = 5;
      this.maxRoomSize = 20;
      this.counter = 2;
      this.tree = {
        level: this.level,
      }
      this.level = this.split(this.tree, randomDirection());
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
    split(node, direction) {
      const parentRoom = node.level;
      const min = this.minRoomSize;
      const max = direction === 'vertical' ? parentRoom[0].length - min : parentRoom.length - min;
      const indexToSplit = randomIndexBetweenValues(min, max);
      let firstRoom = undefined,
          secondRoom = undefined;

      /**
       * Split the rooms either vertically or horizontally
       */
      if (direction === 'vertical') {
        firstRoom = parentRoom.map(row => row.slice(0, indexToSplit));
        secondRoom = parentRoom.map(row => row.slice(indexToSplit, row.length));
      } else {
        firstRoom = parentRoom.slice(0, indexToSplit);
        secondRoom = parentRoom.slice(indexToSplit, parentRoom.length);
      }

      /**
       * Add unique values to each of the rooms. I want to do this so that I can
       * visually see the different rooms.
       */
      this.counter += 1;
      firstRoom = firstRoom.map(row => row.map(() => this.counter));
      this.counter += 1
      secondRoom = secondRoom.map(row => row.map(() => this.counter));

      /**
       * Create a object that records each of the nodes so I can trace it.
       */
      node.splitDirection = direction;
      node.splitIndex = indexToSplit;
      node.leftNode = {
        level: firstRoom,
      };
      node.rightNode = {
        level: secondRoom,
      };

      /**
       * If the rooms are still bigger than the max size, split them again.
       */
      if (firstRoom.length > this.maxRoomSize && firstRoom[0].length > this.maxRoomSize) {
        firstRoom = this.split(node.leftNode, randomDirection());
      }
      /**
       * Check only the vertical and horizontal lengths
       */
      if (firstRoom.length > this.maxRoomSize) {
        // vertically, the room is still too long.
        firstRoom = this.split(node.leftNode, 'horizontal');
      }
      if (firstRoom[0].length > this.maxRoomSize) {
        // horizontally, the room is still too big.
        firstRoom = this.split(node.leftNode, 'vertical');
      }

      if (secondRoom.length > this.maxRoomSize && secondRoom[0].length > this.maxRoomSize) {
        secondRoom = this.split(node.rightNode, randomDirection());
      }
      /**
       * Check only the vertical and horizontal lengths
       */
      if (secondRoom.length > this.maxRoomSize) {
        // vertically, the room is still too long.
        secondRoom = this.split(node.rightNode, 'horizontal');
      }
      if (secondRoom[0].length > this.maxRoomSize) {
        // horizontally, the room is still too big.
        secondRoom = this.split(node.rightNode, 'vertical');
      }

      ////// THE ROOMS ARE NOW AT THE SMALLEST NODES

      /**
       * The room is at it's smallest, we can now add boundaries.
       */
      firstRoom = AddRoomBoundaries(firstRoom);
      secondRoom = AddRoomBoundaries(secondRoom);

      /**
       * Join the rooms back together
       */
      if (direction === 'vertical') {

        firstRoom = firstRoom.reduce((obj, val, index) => {
          let temp = [];
          temp.push(...firstRoom[index]);
          temp.push(...secondRoom[index]);
          obj.push(temp);
            return obj;
        }, []);
        
      } else {

        firstRoom.push(...secondRoom);

      }

      return firstRoom;
    },
};

/**
 * 50% chance of returning a 0
 * 50% chance of returning a 1
 * 
 * @returns {number} 0 or 1
 */
function fiftyfifty() {
  return Math.floor((Math.random() * 2) + 1) % 2;
}

/**
 * Return a random direction of vertical or horizontal
 * 
 * @returns {string} 'vertical' or 'horizontal'
 */
function randomDirection() {
  return fiftyfifty() === 1 ? 'vertical' : 'horizontal';
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
 * @returns dungeon object
 */
function NewDungeon(width = 50, height = 50) {
  const dungeon = Object.create(Dungeon);
  dungeon.init(width, height);
  return dungeon;
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