import { redirectLocation } from "./myFunctions.js";

const inputShopProductName = document.getElementById('input_shop_product_name_id');
const productNameButtonAddToList = document.getElementById('shop_list_add_button_id');
const productNameButtonRemoveFromList = document.getElementById('shop_list_remove_button_id');
const dataFromSystem = document.getElementById('shop_date_system_id');
const myShopList = document.getElementById('my_shop_list_id');
const ShoppingListButtonBack = document.getElementById('shoppingLis_button_back_id');

let data = new Date().toLocaleDateString('pl', {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric"
});

dataFromSystem.innerHTML = data;

let arrayCart = [];
let count = {};

window.addEventListener('DOMContentLoaded', loadFromLocalStorage);

ShoppingListButtonBack.addEventListener('click', () => {
    redirectLocation("more.html");
});

productNameButtonAddToList.addEventListener('click', () => {
    if (inputShopProductName.value.trim() === '') {
        return;
    } else {
        addToCart(inputShopProductName.value);
        displayProducts();
        inputShopProductName.value = '';
    }
});

productNameButtonRemoveFromList.addEventListener('click', () => {
    myShopList.innerHTML = '';
    arrayCart = [];
    count = {};
    saveToLocalStorage();
});

function addToCart(product) {
    arrayCart.push(product);
    if (count[product]) {
        count[product].count++;
    } else {
        count[product] = { count: 1 };
    }
    saveToLocalStorage();
}

function displayProducts() {
    myShopList.innerHTML = '';
    Object.keys(count).forEach(name => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product-list-div');

        const createProduct = document.createElement('span');
        createProduct.classList.add('product-name-span');
        const productCount = count[name].count;
        createProduct.textContent = `${name} x ${productCount}`;

        const addBtn = document.createElement('button');
        addBtn.classList.add('button-list-remove');
        addBtn.innerHTML = "Usuń";
        addBtn.addEventListener('click', () => {
            removeSingleProduct(name);
        });

        productDiv.appendChild(createProduct);
        productDiv.appendChild(addBtn);
        myShopList.appendChild(productDiv);
    });
}

function removeSingleProduct(product) {
    if (count[product]) {
        count[product].count--;
        if (count[product].count <= 0) {
            delete count[product];
        }
        arrayCart = arrayCart.filter(item => item !== product);
        displayProducts();
        saveToLocalStorage();
    }
}

function saveToLocalStorage() {
    localStorage.setItem('shoppingCart', JSON.stringify(arrayCart));
    localStorage.setItem('shoppingCount', JSON.stringify(count));
}

function loadFromLocalStorage() {
    const savedCart = localStorage.getItem('shoppingCart');
    const savedCount = localStorage.getItem('shoppingCount');

    if (savedCart && savedCount) {
        arrayCart = JSON.parse(savedCart);
        count = JSON.parse(savedCount);
        displayProducts();
    }
}
