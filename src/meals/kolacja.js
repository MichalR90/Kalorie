import { displayAddProductInConsuption, displayInputProduct, redirectLocation, buttonAddQuantity, buttonReduceQuantity } from "../myFunctions.js";

const dinnerButtonBack = document.getElementById('dinner_button_back_id');
const dinnerProduct = document.getElementById('dinner_product');
const addButtonPrductToList = document.getElementById('dinner_button_add_product_to_list_id');
const bodyDisplayProduct = document.getElementById('dinner_body_design_settings_id');
const buttonQuantityAdd = document.getElementById('dinner_button_add_quantity');
const buttonQuantityReduce = document.getElementById('dinner_button_reduce_quantity');
let inputProdutName = document.getElementById('dinner_name_product_id');
let inputProductQuantity = document.getElementById('dinner_quantity_product_id');
inputProductQuantity.value = 100;
let arrayDinner = [];

dinnerButtonBack.addEventListener('click', () => {
    redirectLocation('consuption.html')
});
buttonQuantityAdd.addEventListener('click', () => {
    buttonAddQuantity(inputProductQuantity, buttonQuantityReduce)
})
buttonQuantityReduce.addEventListener('click', () => {
    buttonReduceQuantity(inputProductQuantity, buttonQuantityReduce)
})
addButtonPrductToList.addEventListener('click', () => {
    displayAddProductInConsuption(arrayDinner, inputProdutName, inputProductQuantity, bodyDisplayProduct, 'myDinnerArray', 'myKcalArray', 'myProteinArray', 'myFatArray', 'myCarbohydratesArray');
    redirectLocation('consuption.html');

});

async function fetchProduct(url) {
    const fetchData = await fetch(url)
    const responseResult = await fetchData.json();
    arrayDinner = responseResult.products
    displayInputProduct(arrayDinner, dinnerProduct);
}

fetchProduct('products.json')