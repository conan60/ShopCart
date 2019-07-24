/* --------------------------------------------------------
Script for manipulating DOM of Shop cart

version: 1.0
last modified: 24.07.2019
author: Malek Gorchene
email: malek.gorchene@gmail.com
----------------------------------------------------------*/

let heartIcon = Array.from(document.querySelectorAll('.item>svg'));
// Toggle Heart icon (svg)
let toggleHeart = item=>{
    item.addEventListener('click',function(){
        this.classList.toggle('like');
    })
}
heartIcon.map(toggleHeart);

// Changing item to buy
let changeItem = document.querySelectorAll('.item>div>button');
let facture = document.getElementById('facture');

// Changing total price
let changeTotal = (prix,operation)=>{
    
    let old = document.querySelector('#total>p>strong').textContent ? parseInt(document.querySelector('#total>p>strong').textContent): 0;
    switch(operation){
        case '-':document.querySelector('#total>p>strong').textContent = old-prix;break;
        case '+':document.querySelector('#total>p>strong').textContent = old+prix;break;
    }
    
};

// Manipulating items to buy
let addItemPrice = function(){
    let operation = this.innerHTML;
    let name = this.parentNode.parentNode.dataset.name;
    let prix = parseInt(this.parentNode.parentNode.querySelector('.prix').textContent);
    let quantity = facture.querySelector("#"+name+" .nomberItem") ? parseInt(facture.querySelector("#"+name+" .nomberItem").textContent) : 0;
    // Do staff according of operation
    switch(operation){
        case "+":{
            if (quantity) {
                quantity++;
                facture.querySelector(`#${name} .nomberItem`).textContent = quantity;
                changeTotal(prix,'+');
            } else {
                quantity++;
                facture.innerHTML += `<div id="${name}" class="toast show" data-autohide="false">
                                        <div class="toast-header">
                                            <strong class="mr-auto text-primary">${name}</strong>
                                            <small class="text-muted">${prix}dt * <span class="nomberItem">${quantity}</span> </small>
                                        </div>
                                    </div>`;
                changeTotal(prix,'+');                  
            }
        }break;
        case "-":{
            if (quantity) {
                quantity--;
                facture.querySelector(`#${name} .nomberItem`).textContent = quantity;
                changeTotal(prix,'-');
                if (quantity===0) {
                    facture.querySelector(`#${name}`).parentNode.removeChild(facture.querySelector(`#${name}`));
                }
                
            }
        }break;

    }
   
    
}

changeItem.forEach(function(item){item.addEventListener('click',addItemPrice)});

