const playerPlaying = document.querySelector('.gameInfo')
const newGame = document.querySelector('.btn')
const boxes = document.querySelectorAll('.box')

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],

    [0,4,8],
    [2,4,6],
    [0,3,6],
    
    [1,4,7],
    [2,5,8],
]
let currentPlayer = 'X'
let fillCount = 0;
let winIndex = []
// RE=WRITTEN CODE to learn how to map out flow
boxes.forEach(box => {
    box.addEventListener('click',()=>{
        clickHandler(box)

        if(CheckWin()){
            showWinner(winIndex) //Update on UI
            playerPlaying.innerText = `Won - ${currentPlayer}`
            newGame.classList.add('active')
        }
        else if(fillCount == 9){
            playerPlaying.innerText = 'Game Tied'
            newGame.classList.add('active')
        }
        else{
            swapTurn()
        }
    })
})
function swapTurn(){
    if(currentPlayer == 'X')
        currentPlayer = 'O'
    else
        currentPlayer = 'X'

    playerPlaying.innerText = `Current Player - ${currentPlayer}`
}

function clickHandler(box){
    box.innerText = currentPlayer
    fillCount++
    box.style.pointerEvents = 'none'
}

function CheckWin(){
    for (let i = 0; i < winningPositions.length; i++) {
        let arr = winningPositions[i]
        let count = 0;
        for (let i = 0; i < arr.length; i++) {
            const index = arr[i]
            if(boxes[index].innerText === currentPlayer) count++
        }
        if(count == 3){
            winIndex = arr 
            return true;
        }
    }
    return false
}

function showWinner(arr){
    boxes[arr[0]].classList.add('win')
    boxes[arr[1]].classList.add('win')
    boxes[arr[2]].classList.add('win')
    newGame.classList.add('active')
}


function initGame(){
    fillCount = 0;
    boxes.forEach(box=> {
        box.innerText = ''
        box.classList.remove('win')
        box.style.pointerEvents = 'all'
    })
    playerPlaying.innerText = `Current Player - X`
    newGame.classList.remove('active')

}
newGame.addEventListener('click',initGame)