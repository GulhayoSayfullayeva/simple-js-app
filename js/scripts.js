let pokemonRepository = (function () {
    pokemonList = [];
    /* const loader = document.querySelector("#loading"); */

    let modal = document.querySelector(".modal");
    /*  Searching specific pokemon with the given name */
    let search_input = document.querySelector("#search-input");
    search_input.addEventListener('input', function (e) {
        search_pokemon(e.target.value.toLowerCase());
    });

    function search_pokemon(value) {


        let pokemonLists = document.querySelector("#pokemonList").children;

        for (i = 0; i < pokemonLists.length; i++) {
            let isMatched = pokemonLists[i].firstChild.textContent.includes(value);
            pokemonLists[i].classList.toggle("hide", !isMatched);
        }
    }



    function add(pokemon) {
        pokemonList.push(pokemon);
    }

    function getAll() {
        return pokemonList;
    }

    function addv(pokemon) {
        if (pokemon instanceof Object &&
            pokemon.name instanceof String
        ) {
            pokemonList.push(pokemon);
        } else {
            console.log("Not valid data");
        }
    }

    function addListItem(pokemon) {
        let pokemonLists = document.querySelector("#pokemonList");
        let pokemonItem = document.createElement("li");
        pokemonItem.classList.add("list-group-item");
        let pokemonButton = document.createElement("button");
        pokemonButton.innerText = pokemon.name;
        pokemonButton.classList.add("btn");
        pokemonButton.classList.add("btn-secondary");
        pokemonButton.setAttribute("data-bs-toggle", "modal");
        pokemonButton.setAttribute("data-bs-target", "#modalContainer");
        pokemonButton.setAttribute("type", "button");

        pokemonItem.appendChild(pokemonButton);
        pokemonLists.appendChild(pokemonItem);
        pokemonButton.addEventListener('click', function (event) {
            showDetails(pokemon);
        });
    }

    function loadList() {
        /* loader.classList.add("display"); */
        return fetch("https://pokeapi.co/api/v2/pokemon/?limit=150").then(function (response) {

            return response.json();
        }).then(function (json) {
            json.results.forEach(function (json_item) {
                /* loader.classList.remove("display"); */
                let pokemon = {
                    name: json_item.name,
                    detailsUrl: json_item.url
                };
                add(pokemon);
            });
        }).catch(function (error) {
            console.log(error);
        })
    }

    function loadDetails(pokemon) {
        /* loader.classList.add("display"); */
        let url = pokemon.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (json) {
            /* loader.classList.remove("display"); */
            pokemon.imageUrl = json.sprites.front_default;
            pokemon.height = json.height;
            pokemon.types = json.types;
        }).catch(function (error) {
            console.log(error);
        });
    }
    /* Show the details of every selected pokemon loaded from API, 
       showing the details in modal by calling showModal() function
     */
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            showModal(pokemon);
        });
    }

    /*  showModal() function in order to show pokemon details */
    function showModal(pokemon) {

        let modalTitle = document.querySelector("#modal-title");
        let pokemonImage = document.querySelector(".pokemon-image");
        let pokemonDetails = document.querySelector(".pokemon-details");
        let types = "";

        pokemon.types.forEach(function (item) {
            types += item.type.name + " ";
        });

        modalTitle.innerText = pokemon.name;
        pokemonImage.src = pokemon.imageUrl;
        pokemonDetails.innerHTML = "Height: " + pokemon.height +
            "<br>" + "Types:  " + types;

    }

    
    return {
        add: add,
        getAll: getAll,
        addv: addv,
        addListItem: addListItem,
        showDetails: showDetails,
        loadList: loadList,
        loadDetails: loadDetails
    };
})();
pokemonRepository.loadList().then(function (response) {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});