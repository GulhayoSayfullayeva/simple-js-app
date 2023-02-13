let keys = ["name", "height", "types"];

let pokemonRepository = (function(){
    pokemonList = [];
    function add(pokemon){
        pokemonList.push(pokemon);
    }
    function getAll(){
        return pokemonList;
    }
    function addv(pokemon){
        if( pokemon instanceof Object &&
            pokemon.name instanceof String &&
            pokemon.height instanceof Number &&
            Array.isArray(pokemon.types)
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
    function showDetails(pokemon){
        console.log(pokemon);
    }
    return{
         add: add,
         getAll: getAll,
         addv: addv,
         addListItem: addListItem,
         showDetails: showDetails
        };
})();
pokemonRepository.add({name: "Bulbasaur", height: 1, types: ["grass", "poison"]});
pokemonRepository.add({name: "Metapod", height: 1, types: ["grass", "poison"]});
pokemonRepository.add({name: "Weedle", height: 1, types: ["grass", "poison"]});
pokemonRepository.add({name: "Squirtle", height: 1, types: ["grass", "poison"]});
pokemonRepository.add({name: "Butterfree", height: 1, types: ["grass", "poison"]});
pokemonRepository.add({name: "Venusaur", height: 2, types: ["monster", "grass"]});
pokemonRepository.add({name: "Charmander", height: 0.6, types: ["monster", "dragon"]});
pokemonRepository.addv({name: 3, height: 0.6, types: ["monster", "dragon"]});
pokemonRepository.getAll().forEach( function(pokemon){
     pokemonRepository.addListItem(pokemon);
});




