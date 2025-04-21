import { displayAddProductInConsuption, displayInputProduct, redirectLocation, buttonAddQuantity, buttonReduceQuantity } from "../myFunctions.js";

const secondBrekfastButtonBack = document.getElementById('second_sniadanie_button_back_id');
const secondBrekfastProduct = document.getElementById('second_brekfast_product');
const addButtonPrductToList = document.getElementById('second_brekfast_button_add_product_to_list_id');
const bodyDisplayProduct = document.getElementById('second_brekfast_body_design_settings_id');
const buttonQuantityAdd = document.getElementById('second_brekfast_button_add_quantity');
const buttonQuantityReduce = document.getElementById('second_brekfast_button_reduce_quantity');
let inputProdutName = document.getElementById('second_brekfast_name_product_id');
let inputProductQuantity = document.getElementById('second_brekfast_quantity_product_id')
inputProductQuantity.value = 100;
let arrayIIbrekfast = [];

secondBrekfastButtonBack.addEventListener('click', () => {
    redirectLocation('consuption.html')
});
buttonQuantityAdd.addEventListener('click', () => {
    buttonAddQuantity(inputProductQuantity, buttonQuantityReduce)
})
buttonQuantityReduce.addEventListener('click', () => {
    buttonReduceQuantity(inputProductQuantity, buttonQuantityReduce)
})
addButtonPrductToList.addEventListener('click', () => {
    displayAddProductInConsuption(arrayIIbrekfast, inputProdutName, inputProductQuantity, bodyDisplayProduct, 'mySecondBrekfastArray', 'myKcalArray', 'myProteinArray', 'myFatArray', 'myCarbohydratesArray');
    redirectLocation('consuption.html');
});

async function fetchProduct(url) {
    const fetchData = await fetch(url)
    const responseResult = await fetchData.json();
    arrayIIbrekfast = responseResult.products
    displayInputProduct(arrayIIbrekfast, secondBrekfastProduct);
}


fetchProduct('products.json')