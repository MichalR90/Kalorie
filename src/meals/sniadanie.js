import { displayAddProductInConsuption, displayInputProduct, redirectLocation, buttonAddQuantity, buttonReduceQuantity } from "../myFunctions.js";

const brekfastButtonBack = document.getElementById('sniadanie_button_back_id');
const brekfastProduct = document.getElementById('brekfast_product_id');
const addButtonPrductToList = document.getElementById('brekfast_button_add_product_to_list_id');
const bodyDisplayProduct = document.getElementById('brekfast_body_design_settings_id');
const buttonQuantityAdd = document.getElementById('brekfast_button_add_quantity');
const buttonQuantityReduce = document.getElementById('brekfast_button_reduce_quantity');
let inputProdutName = document.getElementById('brekfast_name_product_id');
let inputProductQuantity = document.getElementById('brekfast_quantity_product_id')
inputProductQuantity.value = 100;
let arrayBrekfast = [];

brekfastButtonBack.addEventListener('click', () => {
    redirectLocation('consuption.html')
});
buttonQuantityAdd.addEventListener('click', () => {
    buttonAddQuantity(inputProductQuantity, buttonQuantityReduce)
})
buttonQuantityReduce.addEventListener('click', () => {
    buttonReduceQuantity(inputProductQuantity, buttonQuantityReduce)
})
addButtonPrductToList.addEventListener('click', () => {
    displayAddProductInConsuption(arrayBrekfast, inputProdutName, inputProductQuantity, bodyDisplayProduct, 'myBrekfastArray', 'myKcalArray', 'myProteinArray', 'myFatArray', 'myCarbohydratesArray');
    redirectLocation('consuption.html');
});

async function fetchProduct(url) {
    const fetchData = await fetch(url)
    const responseResult = await fetchData.json();
    arrayBrekfast = responseResult.products
    displayInputProduct(arrayBrekfast, brekfastProduct);
}


fetchProduct('products.json')