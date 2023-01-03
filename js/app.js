window.onload = () => {
    if('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((pos) => {
            updateHtml(pos.coords.longitude, pos.coords.latitude, pos.coords.altitude);
        });
    } else {
        console.log("Geolocation not available on this browser")
    }
}

function updateHtml(long, lat, alt) {
    document.getElementById("long").innerHTML =long.toString();
    document.getElementById("lat").innerHTML = lat.toString();
    document.getElementById("alti").innerHTML = alt.toString();
}