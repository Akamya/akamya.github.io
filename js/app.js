window.onload = () => {
    if('geolocation' in navigator) {
        let userGeoID = navigator.geolocation.watchPosition((pos) => {
            updateCoords(pos.coords.longitude, pos.coords.latitude, pos.coords.altitude);
            updateInfos(pos.coords.accuracy, pos.coords.speed, pos.timestamp);
        });
        // navigator.geolocation.getCurrentPosition((pos) => {
        //     // Callback to update the coords
        //     updateCoords(pos.coords.longitude, pos.coords.latitude, pos.coords.altitude);
        //     updateInfos();
        // });
    } else {
        // If browser refused Geolocation, print error
        console.log("Geolocation not available on this browser");
    }
}

// Basic function to update the DOM HTML elements
function updateCoords(long, lat, alt) {
    document.getElementById("long").innerHTML = long.toString();
    document.getElementById("lat").innerHTML = lat.toString();
    document.getElementById("alti").innerHTML = alt.toString();
}

function updateInfos(acc, speed, date) {
    document.getElementById("accuracy").innerHTML = acc.toString();
    document.getElementById("speed").innerHTML = speed.toString();
    document.getElementById("current-date").innerHTML = date.toString();
}
