window.onload = () => {
    if('geolocation' in navigator) {
        navigator.geolocation.watchPosition((pos) => {
            updateCoords(pos.coords.longitude, pos.coords.latitude, pos.coords.altitude);
            updateInfos(pos.coords.accuracy, pos.coords.speed, pos.timestamp);
        });
    } else {
        // If browser refused Geolocation, print error
        console.log("Geolocation not available on this browser");
    }

    window.addEventListener("deviceorientation", updateDeviceRotationFields, true);

}

// Basic function to update the DOM HTML elements
function updateCoords(long, lat, alt) {
    document.getElementById("long").innerHTML = long == null ? "No data" : long.toString();
    document.getElementById("lat").innerHTML = lat == null ? "No data" : lat.toString();
    document.getElementById("alti").innerHTML = alt == null ? "No data" : alt.toString();
}

// Update the accuracy, the moving speed, and the timestamp
function updateInfos(acc, speed, date) {
    document.querySelector(".accuracy").innerHTML = acc == null ? "No data" : acc.toString();
    document.querySelector(".speed").innerHTML = speed == null ? "No data" : speed.toString();
    document.querySelector(".current-date").innerHTML = date == null ? "No data" : new Date(date);
}

// show Alpha, beta and gamma rotation of the phone
function updateDeviceRotationFields(e) {
    let alpha = e.alpha;
    let beta = e.beta;
    let gamma = e.gamma;

    document.querySelector(".alpha").innerHTML = alpha;
    document.querySelector(".beta").innerHTML = beta;
    document.querySelector(".gamma").innerHTML = gamma;
}