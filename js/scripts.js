let keys = ["name", "height", "types"];

let pokemonRepository = (function(){
    pokemonList = [];
    const loader = document.querySelector("#loading");

   
    function add(pokemon){
        pokemonList.push(pokemon);
    }
    function getAll(){
        return pokemonList;
    }
    function addv(pokemon){
        if( pokemon instanceof Object &&
            pokemon.name instanceof String
          ){
            pokemonList.push(pokemon);
          }
        else{
            console.log("Not valid data");
        }  
    }
    function addListItem(pokemon){
        let pokemonLists = document.querySelector("ul");
        let pokemonItem = document.createElement("li");
        let pokemonButton = document.createElement("button");
        pokemonButton.innerText = pokemon.name;
        pokemonButton.classList.add("pokemonButton");
        pokemonItem.appendChild(pokemonButton);
        pokemonLists.appendChild(pokemonItem);
        pokemonButton.addEventListener('click', function(event){
            showDetails(pokemon);
        });
    }
    function loadList(){
        loader.classList.add("display");
        return fetch("https://pokeapi.co/api/v2/pokemon/?limit=150").then(function(response){

            return response.json();
        }).then(function(json){
            json.results.forEach(function(json_item){
                loader.classList.remove("display");
                 let pokemon = {
                    name: json_item.name,
                    detailsUrl: json_item.url
                 };
                 add(pokemon);
            });
        }).catch(function(error){
            console.log(error);
        })
    }
    function loadDetails(pokemon){
        loader.classList.add("display");
        let url = pokemon.detailsUrl;
        return fetch(url).then(function(response){
            return response.json();
        }).then(function(json){
            loader.classList.remove("display");
            pokemon.imageUrl = json.sprites.front_default;
            pokemon.height = json.height;
            pokemon.types = json.types;
        }).catch(function(error){
            console.log(error);
        });
    }
    function showDetails(pokemon){
        loadDetails(pokemon).then(function(){
            console.log(pokemon);
        });
    }
    return{
         add: add,
         getAll: getAll,
         addv: addv,
         addListItem: addListItem,
         showDetails: showDetails,
         loadList: loadList,
         loadDetails: loadDetails
        };
})();
pokemonRepository.loadList().then(function( response){
    pokemonRepository.getAll().forEach( function(pokemon){
        pokemonRepository.addListItem(pokemon);
    });
});





