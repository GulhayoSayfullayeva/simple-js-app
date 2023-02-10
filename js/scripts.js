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
    return{
         add: add,
         getAll: getAll,
         addv: addv
        };
})();
pokemonRepository.add({name: "Bulbasaur", height: 1, types: ["grass", "poison"]});
pokemonRepository.add({name: "Venusaur", height: 2, types: ["monster", "grass"]});
pokemonRepository.add({name: "Charmander", height: 0.6, types: ["monster", "dragon"]});
pokemonRepository.addv({name: 3, height: 0.6, types: ["monster", "dragon"]});
pokemonRepository.getAll().forEach( function(pokemon){
     document.write('<div class="grid-item">');
     document.write(pokemon.name + "(height: " + pokemon.height + ")");
     if( pokemon.height >=2 ){
        document.write("- Wow, that’s big!");
     }
     document.write('</div>');
});

pokemonRepository.getAll().forEach(function(pokemon){
    if(JSON.stringify(Object.keys(pokemon)) === JSON.stringify(keys)){
        console.log("Keys are as expected");
    }
});


