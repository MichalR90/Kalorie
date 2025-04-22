import { redirectLocation } from "./myFunctions.js";

const womenChecked = document.getElementById('profil_checkbox_women_id');
const menChecked = document.getElementById('profil_checkbox_men_id');
const saveButton = document.getElementById('profil_save_id');
const rejectButton = document.getElementById('profil_reject_id');
let ageInput = document.getElementById('profil_input_age_id');
let heightInput = document.getElementById('profil_input_height_id');
const profilDisplayMessage = document.getElementById('profil-display_message_id');

ageInput.value = localStorage.getItem('age') || 0;
heightInput.value = localStorage.getItem('height') || 0;

womenChecked.addEventListener('click', () => {
    menChecked.checked = false;
});
menChecked.addEventListener('click', () => {
    womenChecked.checked = false;
});


saveButton.addEventListener('click', checkCorrectInputs);
rejectButton.addEventListener('click', () => {
    redirectLocation("profilSaved.html")
});

function checkCorrectInputs() {

    profilDisplayMessage.innerHTML = "";
    profilDisplayMessage.classList.remove('error');

    const age = parseInt(ageInput.value, 10);
    const height = parseInt(heightInput.value, 10);

    if (age < 1 || age > 130) {
        showError("Podaj poprawny wiek!");
    } else if (height < 50 || height > 260) {
        showError("Podaj poprawny wzrost!");
    } else if (!womenChecked.checked && !menChecked.checked) {
        showError("Zaznacz płeć!");
    } else {
        saveProfileToLocalStorage(age, height);
        window.location.href = "destination.html";
    }
}

function showError(message) {
    profilDisplayMessage.innerHTML = message;
    profilDisplayMessage.classList.add('error');
}

function saveProfileToLocalStorage(age, height) {
    const gender = womenChecked.checked ? 'Kobieta' : 'Mężczyzna';

    localStorage.setItem('genderStatus', gender);
    localStorage.setItem('age', age);
    localStorage.setItem('height', height);
}

function setInputsValues() {
    const statusGender = localStorage.getItem('genderStatus');

    if (statusGender === 'Kobieta') {
        womenChecked.checked = true;
    } else if (statusGender === 'Mężczyzna') {
        menChecked.checked = true;
    }
}

window.onload = setInputsValues;

