function startBattle(user, opponent) {
    let player1 = new Player(user.name, user.pokemons)
    let player2 = new Player(opponent.name, opponent.pokemons)
    console.log(player1, player2)
    battle(player1, player2)

    
}
//run battle
function battle(attackingPlayer, defendingPlayer){
    renderBattle(attackingPlayer, defendingPlayer)
    addListeners(attackingPlayer, defendingPlayer)
}
//add event listeners
function addListeners(attackingPlayer, defendingPlayer){
    const optionsList = document.querySelector('#option-list')
    const fightButton = document.querySelector("#fight")
    //attack button
    fightButton.addEventListener('click', () => {
        const defendingPokemonHealth = defendingPlayer.activePokemon().health
        console.log(defendingPlayer.activePokemon())
        defendingPlayer.takeDamage(Math.floor(Math.random() * 20) + 1)
        if (defendingPlayer.activePokemon().fainted) {
            handleFaintEvent(attackingPlayer, defendingPlayer)
        }else {
            optionsList.innerHTML = `<p id="fight-message">${attackingPlayer.activePokemon().name} uses ${attackingPlayer.activePokemon().moves[Math.floor(Math.random() * attackingPlayer.activePokemon().moves.length)]}! ${defendingPlayer.activePokemon().name} takes ${defendingPokemonHealth - defendingPlayer.activePokemon().health} damage!</p>`
            sleep(2000).then(()=> {
                battle(defendingPlayer, attackingPlayer)
            })}
    })
    //heal button
    const healButton = document.querySelector("#heal")
    healButton.addEventListener("click", () => {
        const attackingPokemonHealth = attackingPlayer.activePokemon().health
        attackingPlayer.heal(Math.floor(Math.random() * 20) + 1)
        optionsList.innerHTML = `<p id="fight-message">${attackingPlayer.activePokemon().name} heals for ${attackingPlayer.activePokemon().health - attackingPokemonHealth}!</p>`
        sleep(2000).then(()=> {
            battle(defendingPlayer, attackingPlayer)
        })    })
    //switch pokemon
    const changeButton = document.querySelector("#change")
    changeButton.addEventListener("click", () => {
        handleSwitchOptions(attackingPlayer, defendingPlayer)
    })
}
//handle options to make pokemon switch
function handleSwitchOptions(attackingPlayer, defendingPlayer){
    if (attackingPlayer.notFainted().length <= 1){

    }
    else{
        const availablePokemon = attackingPlayer.notFainted().filter((pokemon, index) => {
            return index != attackingPlayer.activePokemonIndex
        })
        const optionsList = document.querySelector('#option-list')
        const pokemonList = document.createElement("ul")
        availablePokemon.forEach(pokemon => {
            const pokemonButton = document.createElement("button")
            pokemonButton.innerText = `${pokemon.name}`
            pokemonButton.className = "switch-button"
            pokemonButton.addEventListener("click", () => {
                attackingPlayer.activePokemonIndex = attackingPlayer.pokemons.indexOf(pokemon)
                battle(defendingPlayer, attackingPlayer)
            })
            pokemonList.append(pokemonButton)
        })
        const backButton = document.createElement("button")
        backButton.innerText = `Back`
        backButton.clasName = "switch-button"
        pokemonList.append(backButton)
        backButton.addEventListener("click", () => {
            const optionsList = document.querySelector("#option-list")
            optionsList.remove()
            renderOptions(attackingPlayer, defendingPlayer)
            addListeners(attackingPlayer, defendingPlayer)
        })
        optionsList.innerHTML = `<h2 id = "your-message">Your Pokemon</h2>`
        optionsList.append(pokemonList)
    }
}
//when a pokemon faints
function handleFaintEvent (attackingPlayer, defendingPlayer) {
    if (defendingPlayer.notFainted().length > 0) {
        const nextPokemon = defendingPlayer.notFainted()[0]
        defendingPlayer.activePokemonIndex = defendingPlayer.pokemons.indexOf(nextPokemon)
        battle(defendingPlayer, attackingPlayer)
    } else {
        endOfGame(attackingPlayer, defendingPlayer)
    }
} 
//when one player runs out of pokemon
function endOfGame(winningPlayer, losingPlayer) {
    const mainBody = document.querySelector('#main-body')
    mainBody.innerHTML = `<h1>${winningPlayer.name} has defeated ${losingPlayer.name}!</h1>
    <button id="redirect">Return to main page</button>`
    redirectButton = document.querySelector('#redirect')
    redirectButton.addEventListener('click', () => {
        fetchPokemonList()
    })
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}