const level = NewDungeon({})
console.log(level)
function DrawDungeonTree(div, arr) {
  arr.forEach((row) => {
    const outerDiv = document.createElement('div')
    row.forEach((tile) => {
      const innerDiv = document.createElement('div')
      innerDiv.innerText = `${tile},`
      innerDiv.style.display = 'inline-block'
      innerDiv.style.width = '25px'
      innerDiv.style.height = '20px'
      outerDiv.appendChild(innerDiv)
    })
    div.appendChild(outerDiv)
  })
}
DrawDungeonTree(document.getElementById('root'), level)
