import { displayAddProductInConsuption, displayInputProduct, redirectLocation, buttonAddQuantity, buttonReduceQuantity } from "../myFunctions.js";

const lunchButtonBack = document.getElementById('lunch_button_back_id');
const lunchProduct = document.getElementById('lunch_product');
const addButtonPrductToList = document.getElementById('lunch_button_add_product_to_list_id');
const bodyDisplayProduct = document.getElementById('lunch_body_design_settings_id');
const buttonQuantityAdd = document.getElementById('lunch_button_add_quantity');
const buttonQuantityReduce = document.getElementById('lunch_button_reduce_quantity');
let inputProdutName = document.getElementById('lunch_name_product_id');
let inputProductQuantity = document.getElementById('lunch_quantity_product_id');
inputProductQuantity.value = 100;
let arraylunch = [];

lunchButtonBack.addEventListener('click', () => {
    redirectLocation('consuption.html')
});
buttonQuantityAdd.addEventListener('click', () => {
    buttonAddQuantity(inputProductQuantity, buttonQuantityReduce)
})
buttonQuantityReduce.addEventListener('click', () => {
    buttonReduceQuantity(inputProductQuantity, buttonQuantityReduce)
})
addButtonPrductToList.addEventListener('click', () => {
    displayAddProductInConsuption(arraylunch, inputProdutName, inputProductQuantity, bodyDisplayProduct, 'myLunchArrayArray', 'myKcalArray', 'myProteinArray', 'myFatArray', 'myCarbohydratesArray');
    redirectLocation('consuption.html');
});


async function fetchProduct(url) {
    const fetchData = await fetch(url)
    const responseResult = await fetchData.json();
    arraylunch = responseResult.products
    displayInputProduct(arraylunch, lunchProduct);
}

fetchProduct('products.json')