const foldedIcon = `<svg class="folderIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M64 480H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H288c-10.1 0-19.6-4.7-25.6-12.8L243.2 57.6C231.1 41.5 212.1 32 192 32H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64z"/></svg>`
const unfoldedIcon = '<svg class="folderIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M88.7 223.8L0 375.8V96C0 60.7 28.7 32 64 32H181.5c17 0 33.3 6.7 45.3 18.7l26.5 26.5c12 12 28.3 18.7 45.3 18.7H416c35.3 0 64 28.7 64 64v32H144c-22.8 0-43.8 12.1-55.3 31.8zm27.6 16.1C122.1 230 132.6 224 144 224H544c11.5 0 22 6.1 27.7 16.1s5.7 22.2-.1 32.1l-112 192C453.9 474 443.4 480 432 480H32c-11.5 0-22-6.1-27.7-16.1s-5.7-22.2 .1-32.1l112-192z"/></svg>'
const deleteBtn = `<button which="" class="btn info-danger info-hover float-right" id="deleteFolder"><i class="fa fa-trash"></i></button>`
const path = window.location.pathname.split('/') 
const guildID = path[2]
let folderCount = 0

registerBtn()

// Add a "new folder" button
function registerBtn() {
    const templateBtn = document.getElementById('templateBtn')
    const createBtn = document.getElementById('create')
    createBtn.parentElement.id = "createA";
    templateBtn.removeAttribute('style'); createBtn.removeAttribute('style');
    
    const container = templateBtn.parentElement
    container.classList = "addBtns"
    const a = document.createElement('a')
    const btn = document.createElement('button')
    btn.classList = 'btn info-info'
    btn.id = 'addFolder'
    btn.setAttribute('type', 'button')
    btn.innerHTML = `${foldedIcon.replace('folderIcon', 'folderIcon invert mini')} Folder`
    container.appendChild(btn)
}

// Listener of "new folder" button
const addFolderBtn = document.getElementById('addFolder')
addFolderBtn.addEventListener('click', newFolder)
function newFolder() {
    const folders = new String(localStorage[guildID]).split('|')
    if(folders[0]=="undefined"){ folders.shift() }
    folders.push([])
    localStorage[guildID] = folders.join('|')
    console.log(localStorage[guildID])
    window.location.reload()
}



// removeFolder(0)
loadFolders()
function loadFolders() {
    const folderList = new String(localStorage[guildID]).split('|')
    if(folderList.join('|')=="undefined"){return}
    let commands;
    folderList.forEach(folder => {
        const tokens = folder.split(' ')
        commands = tokens.map(token => findCmd(token))
        appendFolder(commands)
    })
}

// add single folder and move functions in

function appendFolder(commands) {
    const commandsBox = document.getElementById('accordion')
    // const commands = commandsBox.querySelectorAll('.card') // change to add different commands
    const commandsCode = [];
    commands.forEach(element => {
        if(element!=""){
            element.remove()
            commandsCode.push(element.outerHTML)
        }
    })
    const folder = document.createElement('div')
    folder.classList = "folder card"
    folder.innerHTML = `<div class="card-header"><div class="folderHeader">
    <div>
    ${unfoldedIcon}
    <div class="folderName"><b>Test</b></div>
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
    folder.querySelector('.folderHeader').addEventListener('click', () => {closeFolder.call(folder)})
    folderCount++
    registerDeleteBtns()
}

function removeFolder(num) {
    let data = new String(localStorage[guildID])
    let folders = data.split('|')
    folders[num] = undefined
    folders = folders.filter(val => val != undefined)
    if(folders.length==0){ localStorage[guildID] = "undefined" } else {
        localStorage[guildID] = folders.join('|')
    }
    
    // console.log(data, folders)
}
function registerDeleteBtns() {
    const btns = document.querySelectorAll('#deleteFolder')
    btns.forEach(btn => {
        btn.addEventListener('click', deleteBtnHand)
    })
}

function deleteBtnHand() {
    console.log('delete')
    removeFolder(this.getAttribute('which'))
    window.location.reload()
}

function closeFolder() {
    const icons = {"folded": foldedIcon, "unfolded": unfoldedIcon}
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



// Initiating the databas [DEPRECATED]
// function initFolders() {
//     const s = localStorage
//     const folders = s[guildID]

//     if(folders==undefined){
//         s[guildID]
//     }
// }