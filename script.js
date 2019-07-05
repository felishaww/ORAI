const gameCanvas = document.getElementById('gameCanvas')
const ctx = gameCanvas.getContext('2d')

const BCKGRNDCLR = '#ffe6ee'
const SNAKECLR = '#48D1CC'
const SNACKCLR = '#F08080'

gameCanvas.width = 400
gameCanvas.height = 400

let FRAMERATE = 100
const SCREEN = 20
const TILE = (gameCanvas.width/SCREEN)

//initial state
let velocity
let position
let snake
let snack
let score = 0

function drawSnack(){
    snack = {
        x: Math.floor(Math.random() * TILE),
        y : Math.floor(Math.random() * TILE)
        }


    for (let body of snake){
      if (body.x == snack.x && body.y == snack.y){
           return drawSnack()
         }
    }
   } 


function init(){
    velocity = { x: 0, y: 0 }
    position = { x: 10, y:10 }

    snake = [
        {x: 8, y:10}, //ekor
        {x: 9, y:10},//badan
        {x: 10, y:10}, //kepala
    ]

    score = 0

    drawSnack()
}

init()

//key event attachments
document.addEventListener('keydown', event => {
    switch(event.key) {
        case 'w': case 'h': case 'ArrowUp':    {return velocity = {x: 0, y: -1}}
        case 'a': case 'j': case 'ArrowLeft':  {return velocity = {x: -1, y: 0}}
        case 's': case 'k': case 'ArrowDown':  {return velocity = {x: 0, y: 1}}
        case 'd': case 'l': case 'ArrowRight': {return velocity = {x: 1, y: 0}}
    }
})

//to add score
function drawScore(i){
  ctx.fillStyle = '#006C6C'
  ctx.fillText('SCORE: ' + i, 5, TILE-5)
}

function gameLoop(){
    //layout
    ctx.fillStyle = BCKGRNDCLR
    ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height)
    
    ctx.fillStyle = SNAKECLR
    for (let body of snake){
        ctx.fillRect(body.x*SCREEN, body.y*SCREEN, SCREEN, SCREEN)
    }

    ctx.fillStyle = SNACKCLR
    ctx.fillRect(snack.x*SCREEN, snack.y*SCREEN, SCREEN, SCREEN)

    position.x += velocity.x
    position.y += velocity.y

    //if snake eats the snack
    if (snack.x == position.x && snack.y == position.y) {
        snake.push({...position})
        position.x += velocity.x
        position.y += velocity.y
        drawSnack()
        score ++
    }

    //if head bump with body
    if (velocity.x || velocity.y) {
        for (let body of snake) {
            if( body.x == position.x && body.y == position.y){
                return init()
            }
        }
        snake.push({...position})
        snake.shift()
        
      }

      drawScore(score)

  // if head hits the wall, still in game.

  if (position.x < 0 ){
      position.x = TILE
  }
  else if (position.y < 0){
      position.y = TILE
  }
  else if (position.x > TILE)  {
      position.x = -1
  }
  else if (position.y > TILE){
      position.y = -1
  }


}
setInterval (function (){
    requestAnimationFrame (gameLoop)
}, FRAMERATE)


//CONTROLLER

const controller = document.getElementById('controller')
const context = controller.getContext('2d')

const CNTRLRBCKGRND = "#ffcccc"

controller.width = 400
controller.height = 200

context.fillStyle = CNTRLRBCKGRND
context.fillRect(0, 0, controller.width, controller.height)

