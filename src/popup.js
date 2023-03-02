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
    chrome.storage.sync.set({defaultState: defaultState})
    saveComplete()
    getConfig()
        .then(config => {console.log(config)})
}


function getConfig() {
    return chrome.storage.sync.get()
}