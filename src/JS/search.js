const cmd = {
    toJSON: (element) => {

        let token
        try {
            token = element.id
        } catch (error) {
            console.error('Invalid input in cmd.toJSON():', 'Element: ' + element,'Element: ' + error)
            return false
        }
        
        const tokenExpr = /^C\S{5}$/
        if(!token.match(tokenExpr)){
            console.error('Provided input is not a command', 'Element: ' + element, 'Token: ' + token)
            return false
        }

        const cmdBar = element.querySelector('h5 > button > a:first-child')
        const cmdProperties = element.querySelectorAll('strong:nth-child(-n + 3), code')
        console.log(cmdProperties)
        const JSON = {}
        // Goes over all cmdProperties and saves them using the propNames to JSON
        const propNames = ['name', 'type', 'trigger', 'token']
        cmdProperties.forEach((value, index) => {
            JSON[propNames[index]] = value.innerText
        })
        return(JSON)
    },
}

const commands = document.querySelectorAll('#accordion > .card > div[id^=C]')
const commandsJSON = []
commands.forEach((command, index) => {
    commandsJSON.push(cmd.toJSON(command))
})
// const commandsCompiled = commands.map()
console.log(commandsJSON)

// const command = document.getElementById('CRu27C')

// cmd.toJSON(command)

