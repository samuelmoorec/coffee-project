"use strict"

const renderCoffee = (coffee) => {
    return `<div class="coffee_card"><h2>${coffee.name}</h2><p>${coffee.roast}</p></div>`;
}

const renderCoffees = (coffees) => {
    var html = '';
    coffees.forEach(coffee => html += renderCoffee(coffee))
    return html;
}

const coffeeSorting = (a,b) => {
    if(a.roast === "light"){
        if(b.roast === "medium" || b.roast === "dark"){
            return -1;
        }else{
            if(a.name.toLowerCase() < b.name.toLowerCase()){
                return -1}
            else if(a.name.toLowerCase() > b.name.toLowerCase()){
                return 1
            }else{
                return 0;
            }
        }
    }else if(a.roast === "medium"){
        if(b.roast === "dark"){
            return -1;
        }else if(b.roast === "light"){
            return 1;
        }else{
            if(a.name.toLowerCase() < b.name.toLowerCase()){
                return -1}
            else if(a.name.toLowerCase() > b.name.toLowerCase()){
                return 1
            }else{
                return 0;
            }
        }
    }else if(a.roast === "dark"){
        if(b.roast === "medium" || b.roast === "light"){
            return 1;
        }else{
            if(a.name.toLowerCase() < b.name.toLowerCase()){
                return -1}
            else if(a.name.toLowerCase() > b.name.toLowerCase()){
                return 1
            }else{
                return 0;
            }
        }
    }
}

const updateCoffees = () => {

    var selectedRoast = roastSelection.value;
    var searchTerm = searchBar.value;
    var filteredCoffees = [];
    coffees.forEach(function(coffee) {
        
        if ((coffee.roast === selectedRoast || selectedRoast === "all") && coffee.name.toLowerCase().includes(searchTerm.toLowerCase())) {
            filteredCoffees.push(coffee);
        }
        
    });

    filteredCoffees.sort((coffeeOne,coffeeTwo) =>{
    
        return coffeeSorting(coffeeOne,coffeeTwo);

    });
    

    main.innerHTML = renderCoffees(filteredCoffees);
}


const addCoffee = (e) => {

    e.preventDefault();

    const selectedRoast = roastToAdd.value;
    const coffeeName = coffeeNameInput.value;
    const coffeeID = coffees.length + 1;

    const coffeeToAdd = {id: coffeeID, name: coffeeName, roast: selectedRoast};

    coffees.push(coffeeToAdd);

    localStorage.removeItem('coffees');
    localStorage.setItem('coffees', JSON.stringify(coffees));

    coffeeNameInput.value = "";
    roastToAdd.value = "light";

    updateCoffees();
}

// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
var coffees = [
    {id: 1, name: 'Light City', roast: 'light'},
    {id: 2, name: 'Half City', roast: 'light'},
    {id: 3, name: 'Cinnamon', roast: 'light'},
    {id: 4, name: 'City', roast: 'medium'},
    {id: 5, name: 'American', roast: 'medium'},
    {id: 6, name: 'Breakfast', roast: 'medium'},
    {id: 7, name: 'High', roast: 'dark'},
    {id: 8, name: 'Continental', roast: 'dark'},
    {id: 9, name: 'New Orleans', roast: 'dark'},
    {id: 10, name: 'European', roast: 'dark'},
    {id: 11, name: 'Espresso', roast: 'dark'},
    {id: 12, name: 'Viennese', roast: 'dark'},
    {id: 13, name: 'Italian', roast: 'dark'},
    {id: 14, name: 'French', roast: 'dark'},
];

const main = document.querySelector('#main');
const searchBar = document.querySelector('#search_bar');
const roastSelection = document.querySelector('#roast-selection');
const roastToAdd = document.querySelector('#roast_selection_to_add');
const coffeeNameInput = document.querySelector('#add_coffee');
const submitCoffee = document.querySelector('#submit_coffee');
const searchForm = document.querySelector('#search_form');
const addCoffeeForm = document.querySelector('#add_coffee_form');


roastSelection.addEventListener('input', (event) =>{
    event.preventDefault();
    updateCoffees();
});

roastSelection.addEventListener('input', updateCoffees);
searchBar.addEventListener('input', updateCoffees);
submitCoffee.addEventListener('click', addCoffee);

searchForm.addEventListener('submit',(event) =>{
    event.preventDefault();
})

addCoffeeForm.addEventListener('submit',(event) =>{
    event.preventDefault();
})

window.onload = () =>{
    if(!(localStorage.getItem('coffees') === null)){
    
        coffees = JSON.parse(localStorage.getItem('coffees'));
        updateCoffees();
        console.log("successfully loaded coffees")

    }else{

        localStorage.setItem('coffees', JSON.stringify(coffees));
        updateCoffees();
        console.log("successfully created coffees")

    }
};



