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
let filledCount = 0;
let currentPlayer = 'X';

boxes.forEach((box)=>{
    box.addEventListener('click',()=>{
        handleClick(box)
    })
})


function handleClick(box){
    if(box.innerText === ''){
        box.innerText = currentPlayer //UI Update
        filledCount++;
        let ans = didWin(currentPlayer); //logic
        if(ans != ''){
             playerPlaying.innerText = `Won - ${ans}`
             return
        }
    }
    box.style.pointerEvents = 'none'
    swapTurn() //logic
        if(filledCount == 9){
        console.log("Game Tie")
        playerPlaying.innerText = 'Game Tied'
        newGame.classList.add('active')
    }
}

function swapTurn(){
    if(currentPlayer == 'X')
        currentPlayer = 'O'
    else
        currentPlayer = 'X'
    playerPlaying.innerText = `Current Player - ${currentPlayer}`
}

function didWin(currentPlayer){
    let answer = ''
    for (let i = 0; i < winningPositions.length; i++) {
        let arr = winningPositions[i]
        let count = 0;
        for (let i = 0; i < arr.length; i++) {
            const index = arr[i]
            if(boxes[index].innerText === currentPlayer) count++
        }
        if(count == 3){ 
            declareWinner(arr)
            answer = currentPlayer
            return answer;
        }
    }

    return answer
}

function declareWinner(arr){
    boxes[arr[0]].classList.add('win')
    boxes[arr[1]].classList.add('win')
    boxes[arr[2]].classList.add('win')

    boxes.forEach(box=> {
        box.style.pointerEvents = 'none'
    })
    newGame.classList.add('active')
}
function initGame(){
    filledCount = 0;
    boxes.forEach(box=> {
        box.innerText = ''
        box.classList.remove('win')
        box.style.pointerEvents = 'all'
    })
    playerPlaying.innerText = `Current Player - X`
    newGame.classList.remove('active')

}
newGame.addEventListener('click',initGame)