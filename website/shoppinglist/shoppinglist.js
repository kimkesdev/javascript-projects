const addItemsAction = document.querySelector('.addItems-action');
const input = document.querySelector('.addItems-input');
const submit = document.querySelector('.addItems-submit');

const list = document.querySelector('.shoppinglist');
const displayItemsAction = document.querySelector('.displayItems-action');
const clear = document.querySelector('.displayItems-clear');

submit.addEventListener('click', addItem);
document.addEventListener('DOMContentLoaded', displayStorage);
clear.addEventListener('click', removeItems);
list.addEventListener('click', removeSingleItem);


function addItem(event){
    event.preventDefault();
    let value = input.value;
    if (value === ''){
        showAction(addItemsAction, 'Please add shopping item', false);
    } else {
        showAction(addItemsAction, `${value} added to the list`, true);
        createItem(value);
        updateStorage(value);
    }
}

function showAction(element, text, value){
    if (value === true){
        element.classList.add('success');
        element.innerText = text;
        input.value = '';
        setTimeout(function(){
            element.classList.remove('success');
        }, 3000)
    } else {
        element.classList.add('alert');
        element.innerText = text;
        input.value = '';
        setTimeout(function(){
            element.classList.remove('alert');
        }, 3000)
    }
}

function createItem(value){
    let parent = document.createElement('div');
        parent.classList.add('shoppingitem');

    parent.innerHTML = `<h4 class="shoppingitem__title">${value}</h4>
    <a href="#" class="shoppingitem__link">
        <i class="far fa-trash-alt"></i>
    </a>`

    list.appendChild(parent);
}

function updateStorage(value){
    let shopList;
    
    shopList = localStorage.getItem('shopList') ? JSON.parse(localStorage.getItem('shopList')) : [];

    shopList.push(value);
    localStorage.setItem('shopList', JSON.stringify(shopList));
}

function displayStorage(){
    let exists = localStorage.getItem('shopList');
    
    if(exists){
        let storageItems = JSON.parse(localStorage.getItem('shopList'));
        storageItems.forEach(function(element){
            createItem(element);
        })
    }
}

function removeItems(){
    localStorage.removeItem('shopList');
    let items = document.querySelectorAll('.shoppingitem');
    
    if(items.length > 0){
        showAction(displayItemsAction, 'All items deleted', false);
        items.forEach(function(element){
            list.removeChild(element);
        })
    } else {
        showAction(displayItemsAction, 'No more items to delete', false);
    }
}

function removeSingleItem(event){
    event.preventDefault();
    
    let link = event.target.parentElement;
    if(link.classList.contains('shoppingitem__link')){
        let text = link.previousElementSibling.innerHTML;
        let shopItems = event.target.parentElement.parentElement;

        list.removeChild(shopItems);
        showAction(displayItemsAction,`${text} removed from the list`, true);

        editStorage(text);

    }
}

function editStorage(item){
    let shopItems = JSON.parse(localStorage.getItem('shopList'));
    let index = shopItems.indexOf(item);
    
    shopItems.splice(index, 1);
    localStorage.removeItem('shopList');
    localStorage.setItem('shopList', JSON.stringify(shopItems));

}