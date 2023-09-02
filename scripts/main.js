function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const createGuess = (word, colors) => {
    greens = [];
    yellows = [];
    for (let i = 0; i < word.length; i++) {
        if (colors[i] === 'G') greens.push(i);
        if (colors[i] === 'Y') yellows.push(i);
    }
    return {
        word: word,
        result: {
            green: greens,
            yellow: yellows
        }
    }
}

const currentRow = (rows, wordSent) => {
    rowNum = 0
    for (let row of rows) {
        if (wordSent(row)) {
            rowNum++
        }
        else {
            break
        }
    }
    return rowNum
}

// create a box div with h3-s insidr of it with dark grey background rounded corners and shadow behind it
let box = document.createElement('div')
box.style.cssText = `background-color: #4B4B4B; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, .5); color: white; z-index: 1000; padding: 10px; position: absolute; width: 200px; height: fit-content; top: 70%; left: calc(50% - 100px);`
document.body.insertAdjacentElement('afterbegin', box)

let dragging = false;
let dragX = 0;
let dragY = 0;

const startMove = (e) => {
    if (e.target === box) {
        e.preventDefault()
        dragging = true
        dragX = e.clientX - box.offsetLeft
        dragY = e.clientY - box.offsetTop
    }
}

document.addEventListener('mousedown', startMove)
document.addEventListener('pointerdown', startMove)

const endMove = (e) => {
    if (e.target === box) {
        e.preventDefault()
    }
    dragging = false
}

document.addEventListener('mouseup', endMove)
document.addEventListener('pointerup', endMove)

const makeMove = (e) => {
    if (dragging && e.target === box) {
        e.preventDefault()
    }
    if (dragging) {
        box.style.top = (e.clientY - dragY) / window.innerHeight * 100 + '%'
        box.style.left = (e.clientX - dragX) / window.innerWidth * 100 + '%'
    }
}

document.addEventListener('mousemove', makeMove)
document.addEventListener('pointermove', makeMove)

let rows = getRows();
let row = currentRow(rows, wordSent);

let guesses = []

let end = isEnd();

window.setInterval(() => {
    console.log(row);
    if (row < rows.length && wordSent(rows[row]) && !end) {
        guesses.push(createGuess(...getWord(rows[row])));
        let bestWords = countWordsScores(guesses, words)

        box.innerHTML = ''

        bestWords = bestWords.slice(0, Math.min(bestWords.length, 10))
        for (let i = 0; i < bestWords.length; i++) {
            let span = document.createElement('span')
            span.innerHTML = (i + 1).toString() + '. ' + bestWords[i]
            box.appendChild(span)
            if (i + 1 != bestWords.length) {
                box.appendChild(document.createElement('br'))
            }
        }
        row = currentRow(rows, wordSent);
    }
    if (isEnd()) {
        end = true
        guesses = []
    }
    else {
        rows = getRows();
        row = currentRow(rows, wordSent);
        end = false
    }
}, 200)