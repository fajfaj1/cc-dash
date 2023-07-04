const foldedIcon = `<svg class="folderIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M64 480H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H288c-10.1 0-19.6-4.7-25.6-12.8L243.2 57.6C231.1 41.5 212.1 32 192 32H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64z"/></svg>`
const unfoldedIcon = '<svg class="folderIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M88.7 223.8L0 375.8V96C0 60.7 28.7 32 64 32H181.5c17 0 33.3 6.7 45.3 18.7l26.5 26.5c12 12 28.3 18.7 45.3 18.7H416c35.3 0 64 28.7 64 64v32H144c-22.8 0-43.8 12.1-55.3 31.8zm27.6 16.1C122.1 230 132.6 224 144 224H544c11.5 0 22 6.1 27.7 16.1s5.7 22.2-.1 32.1l-112 192C453.9 474 443.4 480 432 480H32c-11.5 0-22-6.1-27.7-16.1s-5.7-22.2 .1-32.1l112-192z"/></svg>'
const deleteBtn = `<button which="" class="btn info-danger info-hover float-right" id="deleteFolder"><i class="fa fa-trash"></i></button>`
const icon = { Folded: foldedIcon, Unfolded: unfoldedIcon }
const path = window.location.pathname.split('/')
const guildID = path[2]
const defaultName = "folder"
const defaultDefaultState = "Folded"
let folderCount = 0


registerBtn()

// Add a "new folder" button
function registerBtn() {
    const templateBtn = document.getElementById('templateBtn')
    const container = templateBtn.parentElement.parentElement

    const createBtn = container.children[0]
    createBtn.parentElement.id = "createA";
    // templateBtn.removeAttribute('style'); createBtn.removeAttribute('style');


    container.classList.add('buttonsContainer')



    function makeBtn() {
        const btn = document.createElement('button')
        btn.classList = 'btn btn-secondary btn-block'
        btn.id = 'addFolder'
        btn.setAttribute('type', 'button')
        btn.innerHTML = `${foldedIcon.replace('folderIcon', 'folderIcon invert mini')} New folder`
        return btn
    }
    function wrapInCol(element) {
        const col = document.createElement('div')
        col.classList = 'col'
        col.appendChild(element)
        return col
    }

    container.appendChild( wrapInCol( makeBtn() ) )
}

// Listener of "new folder" button
const addFolderBtn = document.getElementById('addFolder')
addFolderBtn.addEventListener('click', newFolder)
function newFolder() {
    const folders = foldersList('content')
    if (folders[0] == "undefined") { folders.shift() }
    folders.push([])
    localStorage[guildID] = folders.join('|')
    const names = foldersList('name')
    if (names[0] == "undefined") { names.shift() }
    names.push(defaultName)
    localStorage[`${guildID}-names`] = names.join('|')
    window.location.reload()
}


let state = "unfolded"
getConfig().then(config => {
    state = config.defaultState
    if (!state) { state = defaultDefaultState }
    loadFolders()
})


function loadFolders() {
    const folderList = foldersList('content')
    const namesList = foldersList('name')
    if (folderList.join('|') == "undefined") { return }
    let commands;
    folderList.forEach((folder, index) => {
        const tokens = folder.split(' ')
        commands = tokens.map(token => findCmd(token))
        appendFolder(commands, namesList[index])
    })
}

// add single folder and move functions in

function appendFolder(commands, name) {
    const commandsBox = document.getElementById('accordion')

    // const commands = commandsBox.querySelectorAll('.card') // change to add different commands
    const commandsCode = [];
    commands.forEach(element => {
        if (element != "") {
            element.remove()
            commandsCode.push(element.outerHTML)
        }
    })
    const folder = document.createElement('div')
    // console.log(state, icon[state])
    folder.classList = `folder card ${state.toLowerCase()}`
    folder.innerHTML = `<div class="card-header"><div class="folderHeader">
    <div>
    <div class="foldEvent">${icon[state]}</div>
    <div class="folderName"><input type="text" value="${name}" id="folderName" which="${folderCount}" class="invisible-input"></div>
    </div>
    <div>
    ${deleteBtn.replace(`which=""`, `which="${folderCount}"`)}
    </div>
    </div>
    </div>
    <div class="folderContainer card-body" id="folderContainer">
    
    </div>`
    folder.querySelector('.folderContainer').innerHTML = commandsCode.join('')
    commandsBox.appendChild(folder)
    folder.querySelector('.foldEvent').addEventListener('click', () => { closeFolder.call(folder) })
    folderCount++
    registerFolderBtns()
}

// Removes a folder from registry, needs reload to take effect
function removeFolder(num) {
    let data = new String(localStorage[guildID])
    let names = foldersList('name')
    let folders = data.split('|')
    folders[num] = undefined
    names[num] = undefined
    folders = folders.filter(val => val != undefined)
    names = names.filter(val => val != undefined)
    // console.log(folders, names)
    if (folders.length == 0) {
        localStorage[guildID] = "undefined";
        localStorage[`${guildID}-names`] = "undefined"
    } else {
        localStorage[guildID] = folders.join('|')
        localStorage[`${guildID}-names`] = names.join('|')
    }



    // console.log(data, folders)
}

// Registers events for all folder delete btns
function registerFolderBtns() {
    const delBtns = document.querySelectorAll('#deleteFolder')
    delBtns.forEach(btn => {
        btn.addEventListener('click', deleteBtnHand)
    })

    const inputs = document.querySelectorAll('#folderName')
    inputs.forEach(input => {
        input.addEventListener('input', saveName)
    })
}

function saveName() {
    const names = foldersList('name')
    const index = this.getAttribute('which')
    const name = this.value
    names[index] = name
    localStorage[`${guildID}-names`] = names.join('|')
}

// Handler of folder delete button
function deleteBtnHand() {
    // console.log('delete')
    removeFolder(this.getAttribute('which'))
    window.location.reload()
}

function closeFolder() {
    const icons = { "folded": foldedIcon, "unfolded": unfoldedIcon }
    const icon = this.querySelector('.folderIcon')
    let state = this.getAttribute('class').split(' ')
    let path;
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

// console.log(scrapTokens())
function scrapTokens() {
    const cmds = document.querySelectorAll('#accordion > .card > .card-header > h5 > a')
    const tokens = [];
    cmds.forEach(cmd => {
        tokens.push(cmd.getAttribute('href').replace(/\/file\/\d{18,}\//, ''))
    })
    return tokens
}
function findCmd(token) {
    const head = document.getElementById(`C${token}`)
    let res
    switch (head) {
        case null:
            res = ""
            break;

        default:
            res = head.parentElement
            break;
    }
    return res
}
function foldersList(property) {
    let value = []
    switch (property) {
        case 'content':
            value = new String(localStorage[guildID]).split('|')
            break
        case 'name':
            value = new String(localStorage[`${guildID}-names`]).split('|')
            break;

    }

    if (value.join('') == 'undefined') {
        return []
    }
    return value
}

function getConfig() {
    return chrome.storage.sync.get()
}

// Initiating the databas [DEPRECATED]
// function initFolders() {
//     const s = localStorage
//     const folders = s[guildID]

//     if(folders==undefined){
//         s[guildID]
//     }
// }
