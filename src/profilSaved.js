import { redirectLocation } from "./myFunctions.js";

const profilSavedGender = document.getElementById('profil_saved_gender_id');
const profilSavedAge = document.getElementById('profil_saved_age_id')
const profilSavedHeight = document.getElementById('profil_saved_height_id')
const profilSavedButton = document.getElementById('profil_saved_button_edit_id')

profilSavedButton.addEventListener('click', editProfil)
function profilSavedSetParametersFromLocalStorage() {
    profilSavedGender.innerHTML = ` ${localStorage.getItem('genderStatus') || '[]'}`
    profilSavedAge.innerHTML = ` ${localStorage.getItem('age') || '[]'} lat`
    profilSavedHeight.innerHTML = `${localStorage.getItem('height') || '[]'} cm`
}

function editProfil() {
    redirectLocation("profil.html")
}
profilSavedSetParametersFromLocalStorage()

