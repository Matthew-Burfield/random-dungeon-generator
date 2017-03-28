const Dungeon = {
    init(width, height) {
      // Create an empty 2D array width x height
      this.level = Array.apply(null, {length: height}).map(() => Array.apply(null, {length: width}));
      this.minRoomSize = 3;
      this.maxRoomSize = 5;
      this.counter = 0;
      this.tree = {
        level: this.level,
      }
      return this.split(this.tree);
    },
    split(node) {
      const parentRoom = node.level;
      const direction = fiftyfifty() === 1 ? 'vertical' : 'horizontal';
      const min = this.minRoomSize;
      const max = direction === 'vertical' ? parentRoom[0].length - min : parentRoom.length - min;
      const indexToSplit = randomIndexBetweenValues(min, max);
      let firstRoom = undefined,
          secondRoom = undefined;
      if (direction === 'vertical') {
        firstRoom = parentRoom.map(row => row.slice(0, indexToSplit));
        secondRoom = parentRoom.map(row => row.slice(indexToSplit, row.length));
      } else {
        firstRoom = parentRoom.slice(0, indexToSplit);
        secondRoom = parentRoom.slice(indexToSplit, parentRoom.length);
      }

      this.counter += 1;
      firstRoom = firstRoom.map(row => row.map(() => this.counter));
      this.counter += 1
      secondRoom = secondRoom.map(row => row.map(() => this.counter));

      node.splitDirection = direction;
      node.splitIndex = indexToSplit;
      node.leftNode = {
        level: firstRoom,
      };
      node.rightNode = {
        level: secondRoom,
      };

      if (firstRoom.length > this.maxRoomSize && firstRoom[0].length > this.maxRoomSize) {
        firstRoom = this.split(node.leftNode);
      }
      if (secondRoom.length > this.maxRoomSize && secondRoom[0].length > this.maxRoomSize) {
        secondRoom = this.split(node.rightNode);
      }
      
      if (direction === 'vertical') {
        firstRoom = firstRoom.reduce((obj, val, index) => {
          let temp = [];
          temp.push(...firstRoom[index]);
          temp.push(...secondRoom[index]);
          obj.push(temp);
            return obj;
        }, []);
        
      } else {

        // secondRoom and firstRoom aren't always the same length. secondRoom[index] fails.
        firstRoom.push(...secondRoom);
      }
      return firstRoom;

      // console.log(parentRoom.length, parentRoom[0].length, indexToSplit, firstRoom, secondRoom);
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
  return dungeon.init(width, height);
}

//var a = NewDungeon(50,50);

module.exports = NewDungeon;