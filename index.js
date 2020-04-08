document.addEventListener("DOMContentLoaded", () =>{
    const startGame = document.createElement("button");
    const mainBody = document.querySelector("#main-body")
    startGame.id = "start-game-button"
    startGame.innerText = ""
    mainBody.append(startGame)
    startGame.addEventListener("click", () => {
        fetchPokemonList()
    })

})

const theme = document.createElement("audio")
theme.src = `theme.mp3`
const fight = document.createElement("audio")
fight.src = `battle.mp3`

//get all pokemon and put into poke data array
function fetchPokemonList(){
    fetch(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151`)
    .then((response) => {
        return response.json();
    })
    .then((pokeData) => {
        // displayPokemonFrontPage(pokeData.results, 1)
        runner(pokeData.results)
    });
}
//run everything
function runner(pokeData){
    //RUN ALL SETUP
    //************************************************************************************ */
    fight.pause();
    theme.play();
    const mainBody = document.querySelector("#main-body")
    mainBody.innerHTML = `
    <div id="grid-container">
    <div id="logo-container">
        <img src=pokemon-symbol-logo-png-31.png>
        </div>
    <div id="user-container">
        
    </div>
    <div id="selected-pokemon">

    </div>
    <div id="pokemon-list-container">
        <ul id="pokemon-list">

        </ul>
    </div>
    </div>`
    let currentUser = null
    renderLogIn()
    const allPokeData = pokeData
    displayPokemonFrontPage(1)
    
    //USER ACTIONS
    //************************************************************************************* */
    //render form for user log in
    function renderLogIn(){
        const userContainer = document.querySelector("#user-container")
        userContainer.innerHTML = `
        <form id="submit-name">
            Enter name:<br>
            <input id="name-input" type="text" name="name"><br>
            <input type="submit">
        </form>
        `

        const userLogInButton = document.querySelector("#submit-name")
        userLogInButton.addEventListener("submit", (event) =>{
            event.preventDefault()
            const nameInput = document.querySelector("#name-input").value
            getUser(nameInput)
        })
    }
    //grab user data from backend
    function getUser(username){
        fetch('https://pokemonbattle-api.herokuapp.com//users')
        .then((response) => {
            return response.json();
        })
        .then((allUsers) => {
            
            if (allUsers.filter(user => { return user.name === username }).length > 0)
            {
                currentUser = allUsers.find(user => {return username === user.name})
                renderUserInfo()
            }
            else{
                createUser(username)
            }
        });
    }
    //post to new user
    function createUser(nameInput){
        fetch('https://pokemonbattle-api.herokuapp.com//users', {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({name: nameInput}),
        })
        .then((response) => response.json())
        .then((userData) => {
            currentUser = userData
            renderUserInfo()
        })
    }
    //render user info
    function renderUserInfo(){
        const userContainer = document.querySelector("#user-container")
        console.log(currentUser)
        userContainer.innerHTML=`
            <h1>Logged in as: ${currentUser.name}</h1>
            <button id="logout">Logout</button>
            <div id="team-container">
            </div>
            <button id="battle-start">Start Battle</button>
        `
        if(currentUser.pokemons.length > 0){
            currentUser.pokemons.forEach(pokemon =>{
                const pokeSpan = document.createElement('div')
                pokeSpan.innerHTML = `
                    <img class="user-poke-sprite" src = ${pokemon.front_default}>
                    <h6>${pokemon.name}</h6>
                    <button id='delete-${pokemon.id}'>Remove ${pokemon.name}</button><br>
                `
                const teamContainer = document.querySelector("#team-container")
                teamContainer.append(pokeSpan)
                const deleteButton = document.querySelector(`#delete-${pokemon.id}`)
                deleteButton.addEventListener("click", () => {
                    fetch(`https://pokemonbattle-api.herokuapp.com//pokemons/${pokemon.id}`, {
                        method: 'delete'
                    }).then(response => response.json())
                    .then(data => {currentUser = getUser(currentUser.name)
                    renderUserInfo()})
                    }
                )
            })
        }else{
            const teamContainer = document.querySelector("#team-container")
            const empNote = document.createElement('p')
            empNote.innerText = "Pick some Pokemon and get started!"
            teamContainer.append(empNote)
        }
        //logout
        const logoutButton = document.querySelector("#logout")
        logoutButton.addEventListener("click", () =>{
            currentUser = null
            renderLogIn()
        })
        //start battle
        const battleButton = document.querySelector("#battle-start")
        battleButton.addEventListener("click", () =>{
            //goes to disOpp.js
            fetchOpponents(currentUser)
        })
    }


    //DISPLAYING POKEMON FUNCTIONS
    //*********************************************************************************** */
    //display pokemon main and in list form
    function displayPokemonFrontPage(selectedPokemonId){
        displaySelected(allPokeData[selectedPokemonId - 1])
        displayList(allPokeData.filter((pokemon, index) => index != selectedPokemonId - 1))
    }
    //fetch data to see selected pokemon
    function displaySelected(pokemon){
        fetch(`${pokemon.url}`)
        .then((response) => {
            return response.json();
        })
        .then((pokeInfo) => {
            renderSelected(pokeInfo)
        });
    }
    //display selected pokemon
    function renderSelected(pokeInfo){
        const pokeContainer = document.querySelector("#selected-pokemon")
        pokeContainer.innerHTML = `
            <h3 id="#select-title">${pokeInfo.name.charAt(0).toUpperCase() + pokeInfo.name.slice(1)}</h3>
            <img src= ${pokeInfo.sprites.front_default} id="selected-sprite"><br/>
            <button id="add-to-team">Add to team!</button>
        `
        const addTeamButton = document.querySelector("#add-to-team")
        addTeamButton.addEventListener("click", () =>{
            if (currentUser.pokemons.length >= 3){
                alert("Max team length is 3.")
            }
            else{
                addPokemon(pokeInfo)
            }
        })
    }
    //create new pokemon and add to trainer's team
    function addPokemon(pokeInfo){
        
        fetch('https://pokemonbattle-api.herokuapp.com//pokemons', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: pokeInfo.name.charAt(0).toUpperCase() + pokeInfo.name.slice(1),
                types: pokeInfo.types,
                user_id: currentUser.id,
                front_default: pokeInfo.sprites.front_default,
                back_default: pokeInfo.sprites.back_default
            })
            })
        .then((response) => response.json())
        .then((pokeData) => {
            currentUser = getUser(currentUser.name)
            renderUserInfo()
        })
    }

    //fetch data to render pokemon list item
    function displayList(pokeListData){
        const pokeList = document.querySelector("#pokemon-list")
        pokeList.innerHTML = ""
        for (i = 0 ; i < 150 ; i++){
            fetch(`${pokeListData[i].url}`)
        .then((response) => {
            return response.json();
        })
        .then((pokeInfo) => {
            renderListItem(pokeInfo)
        });
        }
    }

    //render one pokemon list element
    function renderListItem(pokeInfo){
        const pokeList = document.querySelector("#pokemon-list")
        pokemonLi = document.createElement('li')
        pokemonLi.className ="pokemon-list-element"
        pokemonLi.innerHTML = `
            <img src= ${pokeInfo.sprites.front_default} class="list-sprite">
            <div>${pokeInfo.name.charAt(0).toUpperCase() + pokeInfo.name.slice(1)}</div>
        `
        pokeList.append(pokemonLi)
        pokemonLi.addEventListener("click", () => 
            displayPokemonFrontPage(pokeInfo.id)
        )
    }
}