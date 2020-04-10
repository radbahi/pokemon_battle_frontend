/**GET DATA********************************************************************************** */
//fetch list of all users and then render opoonents screen
function fetchOpponents(currentUser){
    fetch(`${BASE_URL}/users`)
    .then((response) => {
        return response.json();
    })
    .then((allUsers) => {
        selectOpponent(currentUser, allUsers)
    })
}
//get users and render list of possible opponents
function selectOpponent(currentUser, allUsers){
    const opponents = allUsers
    const currentSelection = opponents[0]
    const body = document.querySelector("#main-body")
    body.innerHTML = `
    <div id="opponent-select-screen-container">
        <div id="user-select-container">
        </div>
        <button id="start-battle">Start Battle</button>
        <div id="opp-list-display-container">
            <div id="opponent-select-container">
            </div>
            <div id="opponent-list">
            </div>
        </div>
        </div>
    `
    
    displayTeam(currentUser, "user")
    // displayTeam(currentSelection, "opponent")
    displayOpps(opponents, currentUser)
}
//**DISPLAY FUNCS***************************************************************************** */
//display user team
function displayTeam(user, div){
    //display name
    const userBatCon = document.querySelector(`#${div}-select-container`)
    userBatCon.innerHTML = ""
    const userHeader = document.createElement('h3')
    userHeader.innerText = user.name
    userBatCon.append(userHeader)
    //display pokemon
    user.pokemons.forEach(pokemon =>{
        const pokeSpan = document.createElement('span')
        pokeSpan.className = "pokemon"
        pokeSpan.innerHTML = `
        <img src = ${pokemon.front_default}>
        <h6>${pokemon.name}</h6>
        `
        const typeList = document.createElement('ul')
        const breakHere = document.createElement("br")
        pokeSpan.append(typeList)
        pokemon.types.forEach(type => {
            const thisIsType = document.createElement('li')
            const thisIsMove = document.createElement('li')
            thisIsType.innerText = `Type: ${type.name}`
            thisIsMove.innerText = `Move: ${type.moves}`
            typeList.append(thisIsType)
            typeList.append(breakHere)
            typeList.append(thisIsMove)
            typeList.append(breakHere)
        })
        userBatCon.append(pokeSpan)
    })
}
//display opponent options, allow you to choose selected opponent
function displayOpps(opponents, currentUser){
    opponents.forEach(opponent =>{
        const oppButton = document.createElement('button')
        const oppList = document.querySelector("#opponent-list")
        oppButton.className = "oppButton"
        oppButton.innerText = `${opponent.name}`
        oppList.append(oppButton)
        oppButton.addEventListener("click", () =>{
            currentSelection = opponent
            displayTeam(currentSelection, "opponent")
            const battleButton = document.querySelector("#start-battle")
            battleButton.addEventListener("click", ()=>{
                startBattle(currentUser, currentSelection)
            })
        })
    })
}