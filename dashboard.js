const foldedIcon = `<svg class="folderIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M64 480H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H288c-10.1 0-19.6-4.7-25.6-12.8L243.2 57.6C231.1 41.5 212.1 32 192 32H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64z"/></svg>`
const unfoldedIcon = '<svg class="folderIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M88.7 223.8L0 375.8V96C0 60.7 28.7 32 64 32H181.5c17 0 33.3 6.7 45.3 18.7l26.5 26.5c12 12 28.3 18.7 45.3 18.7H416c35.3 0 64 28.7 64 64v32H144c-22.8 0-43.8 12.1-55.3 31.8zm27.6 16.1C122.1 230 132.6 224 144 224H544c11.5 0 22 6.1 27.7 16.1s5.7 22.2-.1 32.1l-112 192C453.9 474 443.4 480 432 480H32c-11.5 0-22-6.1-27.7-16.1s-5.7-22.2 .1-32.1l112-192z"/></svg>'
const deleteBtn = `<button class="btn info-danger info-hover float-right"><i id="deleteFolder" class="fa fa-trash"></i></button>`
addFolder()
function addFolder() {
    const commandsBox = document.getElementById('accordion')
    const commands = commandsBox.querySelectorAll('.card') // change to add different commands
    const commandsCode = [];
    commands.forEach(element => {
        element.remove()
        commandsCode.push(element.outerHTML)
    })
    const folder = document.createElement('div')
    folder.classList = "folder card"
    folder.innerHTML = `<div class="card-header"><div class="folderHeader">
    <div>
    ${unfoldedIcon}
    <div class="folderName"><b>Test</b></div>
    </div>
    <div>
    ${deleteBtn}
    </div>
    </div>
    </div>
    <div class="folderContainer card-body" id="folderContainer">
    
    </div>`
    folder.querySelector('.folderContainer').innerHTML = commandsCode.join('')
    commandsBox.appendChild(folder)
    folder.querySelector('.folderHeader').addEventListener('click', () => {closeFolder.call(folder)})
}

function closeFolder() {
    const icons = {"folded": foldedIcon, "unfolded": unfoldedIcon}
    console.log('close', this)
    const icon = this.querySelector('.folderIcon')
    let state = this.getAttribute('class').split(' ')
    let path;
    console.log(state)
    switch (state[2]) {
        case undefined:
            state[2] = 'folded'
            break;
        case 'unfolded':
            state[2] = 'folded'
            break;
        case 'folded':
            state[2] = 'unfolded'
            path        
            break;
    }
    icon.outerHTML = icons[state[2]]
    this.setAttribute('class', state.join(' '))
}

