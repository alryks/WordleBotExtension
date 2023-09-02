const getRows = () => {
    return Array.from(document.querySelector("div.board-item").querySelectorAll("div.Row"))
}

const getWord = (row) => {
    const letterDivs = Array.from(row.querySelectorAll('div.Row-letter'))
    let word = "";
    let colors = "";
    for (let div of letterDivs) {
        word += div.innerHTML
        let letterType = div.classList[2]
        let letterColor = ''
        if (letterType === "letter-absent") letterColor = 'A'
        if (letterType === "letter-elsewhere") letterColor = 'Y'
        if (letterType === "letter-correct") letterColor = 'G'
        colors += letterColor
    }
    return [word, colors]
}

const wordSent = (row) => {
    return Array.from(row.querySelectorAll('div.Row-letter')).map((div) => div.classList.length === 3 && div.classList[2].slice(0, 6) === 'letter').reduce((a, b) => a + b, 0) === row.querySelectorAll('div.Row-letter').length
}

const isEnd = () => {
    return document.querySelector("div.modal_start-and-finish.modal_finish").classList.contains("active")
}