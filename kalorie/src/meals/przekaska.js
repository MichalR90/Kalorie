import { displayAddProductInConsuption, displayInputProduct, redirectLocation, buttonAddQuantity, buttonReduceQuantity } from "../myFunctions.js";

const snackButtonBack = document.getElementById('snack_button_back_id');
const snackProduct = document.getElementById('snack_product');
const addButtonPrductToList = document.getElementById('snack_button_add_product_to_list_id');
const bodyDisplayProduct = document.getElementById('snack_body_design_settings_id');
const buttonQuantityAdd = document.getElementById('snack_button_add_quantity');
const buttonQuantityReduce = document.getElementById('snack_button_reduce_quantity');
let inputProdutName = document.getElementById('snack_name_product_id');
let inputProductQuantity = document.getElementById('snack_quantity_product_id');
inputProductQuantity.value = 100;
let arraySnack = [];

snackButtonBack.addEventListener('click', () => {
    redirectLocation('consuption.html')
});
buttonQuantityAdd.addEventListener('click', () => {
    buttonAddQuantity(inputProductQuantity, buttonQuantityReduce)
})
buttonQuantityReduce.addEventListener('click', () => {
    buttonReduceQuantity(inputProductQuantity, buttonQuantityReduce)
})
addButtonPrductToList.addEventListener('click', () => {
    displayAddProductInConsuption(arraySnack, inputProdutName, inputProductQuantity, bodyDisplayProduct, 'mySnackArray', 'myKcalArray', 'myProteinArray', 'myFatArray', 'myCarbohydratesArray');
    redirectLocation('consuption.html');
});

async function fetchProduct(url) {
    const fetchData = await fetch(url)
    const responseResult = await fetchData.json();
    arraySnack = responseResult.products
    displayInputProduct(arraySnack, snackProduct);
}

fetchProduct('products.json')