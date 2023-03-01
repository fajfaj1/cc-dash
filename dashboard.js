
addFolder()
function addFolder() {
    
    const folder = document.createElement('div')
    folder.classList = "folder card"
    folder.innerHTML = `<img src="folder.svg">`
    const commandsBox = document.getElementById('accordion')
    commandsBox.appendChild(folder)
}