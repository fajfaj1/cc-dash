const folderIcon = `<svg class="folderIcon grey" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M64 480H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H288c-10.1 0-19.6-4.7-25.6-12.8L243.2 57.6C231.1 41.5 212.1 32 192 32H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64z"/></svg>`
const path = window.location.pathname.split('/') 
const guildID = path[2]
const token = path[3]

addFoldSelect()
function addFoldSelect() {
    const folders = foldersList('content')
    let currentFolder = 'none'
    folders.forEach((folder, index) => {
        if(folder.split(' ').includes(token)){currentFolder = index}
    })
    console.log(currentFolder)
    const names = foldersList('name')
    const options = names.map((folder, index) => `<option value="${index}"${isSelected(currentFolder, index)}>${folder}</option>`)
    const bar = document.querySelector('.card-tools.form-inline')
    const select = document.createElement('div')
    select.id = "folderSelector"
    select.innerHTML = `<label class="select-light" for="folderMenu">${folderIcon} Folder</label><select id="folderMenu" placeholder="folder">
        <option value="none">none</option>
        ${options}
    </select>
    `

    
    bar.innerHTML = `${select.outerHTML} | ${bar.innerHTML} `
    menuListen()
}

function isSelected(currentFolder, index) {
    if(currentFolder==index){return 'selected'}
}

function menuListen() {
    const menu = document.getElementById('folderMenu')
    menu.addEventListener('input', saveFolder)
}

function saveFolder() {
    const folder = this.value
    
    localStorage[guildID] = localStorage[guildID].replace(token, '')
    if(folder=="none"){return}
    const folders = foldersList('content')
    const tokens = folders[folder].split(' ')
    if(tokens.join('')==""){ tokens[0] = token} else {tokens.push(token)}
    
    folders[folder] = tokens.join(' ')
    localStorage[guildID] = folders.join('|')
}

function themeSync() {
    
}

function foldersList(property) {
    let value = []
    switch(property){
        case 'content':
            value = new String(localStorage[guildID]).split('|')
            break
        case 'name':
            value = new String(localStorage[`${guildID}-names`]).split('|')
            break;
            
    }

    if(value.join('')=='undefined') {
        return []
    }
    return value
}
