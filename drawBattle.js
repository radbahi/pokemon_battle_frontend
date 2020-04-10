//render battle container
function renderBattle(attackingPlayer, defendingPlayer){
    theme.pause();
    fight.play();
    const mainBody = document.querySelector('#main-body')
    mainBody.innerHTML = `
        <div id="battle-container">
        </div>
    `
    renderAttackingPlayer(attackingPlayer)
    renderDefendingPokemon(defendingPlayer)
    renderAttackingPokemon(attackingPlayer)
    renderOptions(attackingPlayer, defendingPlayer)
}

//redner name of player who's turn to attack
function renderAttackingPlayer(player) {
    const battleBody = document.querySelector('#battle-container')
    const playerName = document.createElement('h2')
    playerName.id = "player-name"
    playerName.innerText = player.name
    battleBody.append(playerName)
}

//render defending pokemon
function renderDefendingPokemon(player) {
    const battleBody = document.querySelector('#battle-container')
    const defendContainer = document.createElement('div')
    defendContainer.id = "defend-pokemon-container"
    battleBody.append(defendContainer)
    renderPokeInfo(player.activePokemon(), defendContainer), 
    renderSprite(player.activePokemon(), defendContainer, player.activePokemon().front_sprite)
}

//render attacking pokemon
function renderAttackingPokemon(player) {
    const battleBody = document.querySelector('#battle-container')
    const attackContainer = document.createElement('div')
    attackContainer.id = "attack-pokemon-container"
    battleBody.append(attackContainer)
    renderSprite(player.activePokemon(), attackContainer, player.activePokemon().back_sprite),
    renderPokeInfo(player.activePokemon(), attackContainer)
}

//render pokemon info box
function renderPokeInfo(pokemon, container){
    const infoBox = document.createElement('ul')
    infoBox.className = "infoBox"
    container.append(infoBox)
    const name = document.createElement('li')
    console.log(pokemon)
    name.innerText = pokemon.name
    name.className = "name"
    infoBox.append(name)
    const health = document.createElement('li')
    health.innerText = `Health: ${pokemon.health}`
    health.className = "health"
    infoBox.append(health)
}
//render pokemon sprite
function renderSprite(pokemon, container, url){
    const spriteContainer = document.createElement('div')
    spriteContainer.className = "sprite"
    spriteContainer.innerHTML = `<img src='${url}'>`
    container.append(spriteContainer)
}
//render options for attacking player
function renderOptions(attackingPlayer, defendingPlayer){
    const battleBody = document.querySelector('#battle-container')
    const optionsList = document.createElement('div')
    optionsList.id = "option-list"
    battleBody.append(optionsList)
    const fightButton = document.createElement('button')
    fightButton.className = "option-button"
    fightButton.id = "fight"
    fightButton.innerText = "Fight"
    optionsList.append(fightButton)
    
    const healButton = document.createElement('button')
    healButton.className = "option-button"
    healButton.id = "heal"
    healButton.innerText = "Heal"
    optionsList.append(healButton)
    
    const changeButton = document.createElement('button')
    changeButton.className = "option-button"
    changeButton.id = "change"
    changeButton.innerText = "Change Pokemon"
    optionsList.append(changeButton)
}
