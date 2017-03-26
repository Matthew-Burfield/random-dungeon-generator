const Dungeon = {
    a: "a",
    b: "b",
    c: "c",
    abd() {
        return a + b + c;
    },
};

function NewDungeon() {
  return Object.assign(Dungeon);
}

module.exports = NewDungeon;