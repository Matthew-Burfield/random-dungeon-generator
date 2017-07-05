###Random Dungeon Generator

[![total downloads](https://img.shields.io/npm/dt/random-dungeon-generator.svg)](https://www.npmjs.com/package/random-dungeon-generator) [![Travis](https://img.shields.io/travis/Matthew-Burfield/random-dungeon-generator.svg)](https://travis-ci.org/Matthew-Burfield/random-dungeon-generator) [![version](https://img.shields.io/npm/v/random-dungeon-generator.svg)](https://www.npmjs.com/package/random-dungeon-generator) [![license](https://img.shields.io/npm/l/random-dungeon-generator.svg)](https://www.npmjs.com/package/random-dungeon-generator) [![Code coverage](https://img.shields.io/codecov/c/github/Matthew-Burfield/random-dungeon-generator.svg)](https://www.npmjs.com/package/random-dungeon-generator)

Create a Random Dungeon using a procedural dungeon generator.
Based on a BSP Tree algorithm [http://www.roguebasin.com/index.php?title=Basic_BSP_Dungeon_generation](http://www.roguebasin.com/index.php?title=Basic_BSP_Dungeon_generation)

##Simplest Example

```javascript
// create new dungeon with default width, height, max and min room size
const dungeon = NewDungeon({});
```

```javascript
// with options
const options = {
    width: 50,
    height 50,
    minRoomSize: 5,
    maxRoomSize: 20
};
const dungeon = NewDungeon(options);
```

Returns a 2d array with the values:
    "1" is a blocking/wall tile
    Every other number denotes a different room. For example:

```javascript
const dungeon = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,]
    [1,2,2,2,2,2,2,2,2,2,2,1,1,6,6,6,6,6,6,6,6,6,6,6,1,]
    [1,2,2,2,2,2,2,2,2,2,2,1,1,6,6,6,6,6,6,6,6,6,6,6,1,]
    [1,2,2,2,2,2,2,2,2,2,2,1,1,6,6,6,6,6,6,6,6,6,6,6,1,]
    [1,2,2,2,2,2,2,2,2,2,2,1,1,6,6,6,6,6,6,6,6,6,6,6,1,]
    [1,2,2,2,2,2,2,2,2,2,2,1,1,6,6,6,6,6,6,6,6,6,6,6,1,]
    [1,2,2,2,2,2,2,2,2,2,2,1,1,6,6,6,6,6,6,6,6,6,6,6,1,]
    [1,2,2,2,2,2,2,2,2,2,0,0,0,0,6,6,6,6,6,6,0,6,6,6,1,]
    [1,2,2,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,0,1,1,0,0,]
    [1,2,2,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,0,1,1,1,1,]
    [1,2,2,2,2,2,2,2,2,2,2,1,1,7,7,7,7,7,7,7,0,7,7,7,1,]
    [1,2,2,2,2,2,2,2,2,2,2,1,1,7,7,7,7,7,7,7,7,7,7,7,1,]
    [1,2,2,2,2,2,2,2,2,2,2,1,1,7,7,7,7,7,7,7,7,7,7,7,1,]
    [1,2,2,2,2,2,2,2,2,2,2,1,1,7,7,7,7,7,7,7,7,7,7,7,1,]
    [1,2,2,2,2,2,2,2,2,2,2,1,1,7,7,7,7,7,7,7,7,7,7,7,1,]
    [1,2,2,2,2,2,2,2,2,2,2,1,1,7,7,7,7,7,7,7,7,7,7,7,1,]
    [1,2,2,2,2,2,2,2,2,2,2,1,1,7,7,7,7,7,7,7,7,7,7,7,1,]
    [1,2,2,2,2,2,2,2,0,2,2,1,1,7,7,7,7,7,7,7,7,7,7,7,1,]
    [1,1,1,1,1,1,1,1,0,1,1,1,1,7,7,7,7,7,7,7,7,7,7,7,1,]
    [1,1,1,1,1,1,1,1,0,1,1,1,1,7,7,7,7,7,7,7,7,7,7,7,1,]
    [1,3,3,3,3,3,3,3,0,3,3,1,1,7,7,7,7,7,7,7,7,7,7,7,1,]
    [1,3,3,3,3,3,3,3,3,3,3,1,1,7,7,7,7,7,7,7,7,7,7,7,1,]
    [1,3,3,3,3,3,3,3,3,3,3,1,1,7,7,7,7,7,7,7,7,7,7,7,1,]
    [1,3,3,3,3,3,3,3,3,3,3,1,1,7,7,7,7,7,7,7,7,7,7,7,1,]
    [1,3,3,3,3,3,3,3,3,3,3,1,1,7,7,7,7,7,7,7,7,7,7,7,1,]
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,]
];
```

Here, 
1. The 1's are walls (the borders of the rooms)
2. The 0's are the corridors (the pathways that join the rooms)
3. The other numbers (2, 3, 6, 7) represent different rooms. The numbers are arbitary, and just count upwards.

