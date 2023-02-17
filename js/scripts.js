

let pokemonRepository = (function(){
    pokemonList = [];
    const loader = document.querySelector("#loading");
    let closeButton = document.querySelector(".close-button");
    let modal = document.querySelector(".modal-container");
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
    /* Show the details of every selected pokemon loaded from API, 
       showing the details in modal by calling showModal() function
     */
    function showDetails(pokemon){
        loadDetails(pokemon).then(function(){
            showModal(pokemon);
        });
    }

   /*  showModal() function in order to show pokemon details */
    function showModal(pokemon){
        
        let modalTitle = document.querySelector(".modal-header-title");
        let pokemonImage = document.querySelector(".pokemon-image");
        let pokemonDetails = document.querySelector(".pokemon-details");
        let types = "";

        pokemon.types.forEach( function(item){
            types += item.type.name + " ";
        });

        modalTitle.innerText = pokemon.name;
        pokemonImage.src = pokemon.imageUrl;
        pokemonDetails.innerHTML = "Height: " + pokemon.height 
                                    + "<br>" + "Types:  " + types ;
        modal.classList.add("active");
    }
    /* In order to close the details Modal there are options:
       - when the x sign in modal is pressed;
       - when ESC key is pressed;
       - when outside of the Modal the pointer is clicked
       Here are all 3 options are written in order to hide the Modal*/
         /* 1-Option */
    closeButton.addEventListener('click', function(){
       hideModal();
    });
       /*  2-option */
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
          hideModal();  
        }
    });
       /*  3-Option */
    modal.addEventListener('click', (e) => {
        let target = e.target;
        if (target === modal) {
          hideModal();
        }
    });
    
    /* In order to close or hide the details modal */
    function hideModal(){
        modal.classList.remove("active");
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





