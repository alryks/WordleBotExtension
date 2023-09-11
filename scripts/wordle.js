const getRows = () => {
    return Array.from(document.querySelectorAll("div[role=group]:not([aria-label=Keyboard])"))
}

const getWord = (row) => {
    const letterDivs = Array.from(row.querySelectorAll('div[aria-roledescription=tile]'))
    let word = "";
    let colors = "";
    for (let div of letterDivs) {
        word += div.innerHTML
        let letterType = div.getAttribute("data-state")
        let letterColor = ''
        if (letterType === "absent") letterColor = 'A'
        if (letterType === "present") letterColor = 'Y'
        if (letterType === "correct") letterColor = 'G'
        colors += letterColor
    }
    return [word, colors]
}

const wordSent = (row) => {
    return Array.from(row.querySelectorAll('div[aria-roledescription=tile]')).map((div) => div.getAttribute("data-state") != "empty" && div.getAttribute("data-state") != "tbh").reduce((a, b) => a + b, 0) === row.querySelectorAll('div[aria-roledescription=tile]').length
}

const isEnd = () => {
    return document.querySelector("dialog") != null
}