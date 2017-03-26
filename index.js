const Dungeon = {
    a: "a",
    b: "b",
    c: "c",
    init(a) {
      this.a = a;
    },
    abd() {
        return this.a + this.b + this.c;
    },
};

function NewDungeon(a = "a") {
  const dungeon = Object.assign(Dungeon);
  dungeon.init(a);
  return dungeon;
}

module.exports = NewDungeon;