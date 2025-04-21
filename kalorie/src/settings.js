const settingProfil = document.getElementById('setting_profil_id');
const settingDestination = document.getElementById('setting_destination_id');
const settingEatingTime = document.getElementById('setting_eating_time_id');
const settingButtonBack = document.getElementById('button_setting_back_id');

settingProfil.addEventListener('click', () => {
    window.location.href = "profil.html";
})
settingDestination.addEventListener('click', () => {
    window.location.href = "destination.html";
})
settingEatingTime.addEventListener('click', () => {
    window.location.href = "eating-time.html";
})
settingButtonBack.addEventListener('click', () => {
    window.location.href = "more.html";
})

function displaySettingParameters() {
    const profilParameters = document.createElement('span');
    profilParameters.innerHTML =
        `<span class="displayParametersSettings">
    ${localStorage.getItem('genderStatus') || ""},
    ${localStorage.getItem('age') || ""} lat, 
    ${localStorage.getItem('height') || ""} cm
    </span>`
    const destinationParameters = document.createElement('span');
    destinationParameters.innerHTML = `<span class="displayParametersSettings">
    ${localStorage.getItem('currentWeight') || ""} kg =>
    ${localStorage.getItem('destinationWeight') || ""} 
     kg</span>`

    const eatingTimeParameters = document.createElement('span');
    eatingTimeParameters.innerHTML = `<span class="displayParametersSettings">
     ${localStorage.getItem('brekfastName') || ""} - 
     ${localStorage.getItem('brekfastTime') || ""},
     ${localStorage.getItem('secondBrekfastName') || ""} - 
     ${localStorage.getItem('secondBrekfastTime') || ""},
     ${localStorage.getItem('lunchName') || ""} - 
     ${localStorage.getItem('lunchTime') || ""},
     ${localStorage.getItem('secondLunchName') || ""} - 
     ${localStorage.getItem('secondLunchTime') || ""},
     ${localStorage.getItem('snackName') || ""} - 
     ${localStorage.getItem('snackTime') || ""},
     ${localStorage.getItem('dinnerName') || ""} - 
     ${localStorage.getItem('dinnerTime') || ""},
     
     </span>`
    settingProfil.appendChild(profilParameters)
    settingDestination.appendChild(destinationParameters)
    settingEatingTime.appendChild(eatingTimeParameters)

}
displaySettingParameters();
