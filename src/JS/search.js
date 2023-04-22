function initiate() {

    const searchIcon = `<svg xmlns="http://www.w3.org/2000/svg" stroke="currentColor" height="1em" width="1em" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>`

    const cmd = {
        toJSON: (element) => {

            if(!element){
                console.error('No element provided')
                return false
            }
            let token = element.id
            
            const tokenExpr = /^C\S{5}$/
            if(!token.match(tokenExpr)){
                console.error('Provided input is not a command', 'Element: ' + element, 'Token: ' + token)
                return false
            }

            const cmdBar = element.querySelector('h5 > button > a:first-child')
            const cmdProperties = element.querySelectorAll('strong:nth-child(-n + 3), code')
            const JSON = {}
            // Goes over all cmdProperties and saves them using the propNames to JSON
            const propNames = ['name', 'type', 'trigger', 'token']
            cmdProperties.forEach((value, index) => {
                JSON[propNames[index]] = value.innerText
            })
            JSON.cardToken = 'C' + JSON.token
            JSON.parentElement = element
            JSON.state = true
            return(JSON)
        },

        setShow: (element, state) => {

            element.setAttribute('show', state)
            element.setAttribute('class', `card-header ${state}`)
            element.parentElement.setAttribute('show', state)
            
            if(element.id == 'CeCclt') {
                console.log(element.getAttribute('show') + ' - ' + state)
            }

        },

        syncShow: (element) => {
            cmd.setShow(element.parentElement, element.state)
            
        }
        
        
    }

    function updateShows(JSON) {
        JSON.forEach((command, index) => {
            cmd.syncShow(command)
        })
    }

    // Scrape all commands
    const commands = document.querySelectorAll('div[id^=C]')
    const commandsJSON = []
    commands.forEach((command, index) => {
        commandsJSON.push(cmd.toJSON(command))
    })
    updateShows(commandsJSON)

    // Deploy searchbox
    const searchbox = document.createElement('div')
    searchbox.setAttribute('class', 'searchbox-wrapper')
    searchbox.setAttribute('for', 'searchbox')
    searchbox.innerHTML = `
        <input type="search" id="searchbox">
        <button class="searchIcon" id="searchSubmit">
            ${searchIcon}
        </button>
    `
    const cardTools = document.getElementById('backupall').parentElement
    cardTools.prepend(searchbox)

    // Await changes
    function search() {
        const input = this.value
        
        let searchExp = new RegExp(input, "i")
        if(input==""){  searchExp = /.+/ }

        commandsJSON.forEach((command, index) => {
            let result = false
            const props = [command.name, command.token, command.type]
            props.forEach((value, index) => {
                const matched = value.match(searchExp)
                if(matched){  result = true  }
            })
            commandsJSON[index].state = result
            // console.log(command.name + ' - ' + result)
        })
        updateShows(commandsJSON)
    }


    const searchForm = searchbox.querySelector('input')
    searchForm.addEventListener('input', search)

    console.log(commandsJSON)
}
// This motherfukcer did not work without a timeout
setTimeout(initiate, '1')