const getRows = () => {
    gameApp = document.querySelector("game-app")
    shadowRoot = gameApp.shadowRoot;
    return Array.from(shadowRoot.querySelectorAll("game-row"))
}

const getWord = (row) => {
    shadowRoot = row.shadowRoot
    const letterDivs = Array.from(shadowRoot.querySelectorAll('game-tile'))
    let word = "";
    let colors = "";
    for (let div of letterDivs) {
        word += div.getAttribute("letter")
        let letterType = div.getAttribute("evaluation")
        let letterColor = ''
        if (letterType === "absent") letterColor = 'A'
        if (letterType === "present") letterColor = 'Y'
        if (letterType === "correct") letterColor = 'G'
        colors += letterColor
    }
    return [word, colors]
}

const wordSent = (row) => {
    shadowRoot = row.shadowRoot
    return Array.from(shadowRoot.querySelectorAll('game-tile')).map((div) => div.hasAttribute("evaluation")).reduce((a, b) => a + b, 0) === shadowRoot.querySelectorAll('game-tile').length
}

const isEnd = () => {
    gameApp = document.querySelector("game-app")
    shadowRoot = gameApp.shadowRoot;
    return shadowRoot.querySelector("game-modal").hasAttribute("open")
}