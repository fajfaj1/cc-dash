function saveComplete() {
    const statusBar = document.getElementById('statusBar')
    statusBar.addEventListener('click', () => {
        statusBar.style.opacity = 0
        setTimeout(() => {statusBar.style.display = 'none' }, '500')
    })
    statusBar.style.display = 'flex'
    setTimeout(() => {statusBar.style.opacity = 1})
}

const saveBtn = document.getElementById('save')
saveBtn.addEventListener('click', save)

function save() {
    const defaultState = document.getElementById('state').value
    const searchDisable = document.getElementById('search-box').checked
    
    chrome.storage.sync.set({defaultState: defaultState, disableSearch: searchDisable})
    saveComplete()
    getConfig()
        .then(config => {console.log(config)})
}


function getConfig() {
    return chrome.storage.sync.get()
}

getConfig().then((config) => {
    document.getElementById('state').value = config.defaultState
    const searchbox = document.getElementById('search-box')
    switch(config.disableSearch) {
        case true:
            searchbox.setAttribute('checked', 'indeed')
            console.log('yep')
            break;
        case false:
            searchbox.removeAttribute('checked')
            console.log('nope')
            break;
    }
    
})