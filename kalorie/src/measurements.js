const dataFromSystem = document.getElementById('measuring_date_system_id');
const measuringWeight = document.getElementById('input_measuring_product_name_id');
const addButtonWeight = document.getElementById('measuring_add_button_id');
const cleanListButton = document.getElementById('measuring_remove_button_id');
const measuringList = document.getElementById('measuring_list_id');

let ArrayData = [];

let date = new Date().toLocaleDateString('pl', {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric"
});
dataFromSystem.innerHTML = date;

addButtonWeight.addEventListener('click', () => {
    if (measuringWeight.value.trim() === '') return;

    const newEntry = { weight: measuringWeight.value, date: date };
    ArrayData.push(newEntry);
    renderList();
    saveToLocalStorage();
    measuringWeight.value = '';
});
cleanListButton.addEventListener('click', () => {
    localStorage.removeItem('myMeasuring');
    ArrayData = [];
    measuringList.innerHTML = '';

});

function renderList() {
    measuringList.innerHTML = '';

    ArrayData.forEach(entry => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product-list-div');

        const createElement = document.createElement('span');
        createElement.classList.add('product-name-span');
        createElement.innerHTML = `${entry.date} --- ${entry.weight} kg`;

        productDiv.appendChild(createElement);
        measuringList.appendChild(productDiv);
    });
}

function saveToLocalStorage() {
    localStorage.setItem('myMeasuring', JSON.stringify(ArrayData));
}

function loadFromLocalstorage() {
    const savedData = localStorage.getItem('myMeasuring');
    if (savedData) {
        ArrayData = JSON.parse(savedData);
        renderList();
    }
}

window.addEventListener('DOMContentLoaded', loadFromLocalstorage);

