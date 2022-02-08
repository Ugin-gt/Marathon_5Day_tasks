const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const gameTime = document.querySelector('#time')
const board = document.querySelector('#board')
const colors = ['#7ad2f5', '#d748bf', '#e5db7c', '#5e12ce',
    '#b30000', "#21a323"]

let time = 0
let score = 0

startBtn.addEventListener('click', event => {
    event.preventDefault()
    screens[0].classList.add('up')
})

timeList.addEventListener('click', event => {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'))
        screens[1].classList.add('up')
        startGame()
    }
})

board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
        score++
        event.target.remove()
        createRandomCircle()
    }
})

function startGame() {
    setInterval(decreaseTime, 1000)
    createRandomCircle()
    setTime(time)
}

function decreaseTime() {
    if (time === 0) {
        finishGame()
        window.setInterval('window .location.reload()', 5000)
    } else {
        let current = --time
        if (current < 10) {
            current = `0${current}`
        }
        setTime(current)
    }
}

function setTime(value) {
    gameTime.innerHTML = `00:${value}`
}

function finishGame() {
    gameTime.parentNode.classList.add('hide')
    board.innerHTML = `<h2>Ваш Счет: <span class="primary">${score}</span></h2>`
}

function createRandomCircle() {
    const circle = document.createElement('div')
    const size = getRandomNumber(10, 60)
    const color = getRandomColor()
    const {width, height} = board.getBoundingClientRect()
    const x = getRandomNumber(0, width - size)
    const y = getRandomNumber(0, height - size)
    circle.classList.add('circle')
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.left = `${x}px`
    circle.style.top = `${y}px`
    circle.style.backgroundColor = color
    circle.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color} `

    board.append(circle)
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

function getRandomColor() {
    const index = Math.floor(Math.random() * colors.length)
    return colors[index]
}

function winTheGame() {
    function killCircle() {
        const getCircle = document.querySelector('.circle')
        if (getCircle) {
            getCircle.click()
        }
    }
    setInterval(killCircle, 40)
}