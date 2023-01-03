window.onload = () => {
    if('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((pos) => {
            document.getElementById("long").innerHTML = pos.coords.longitude;
        });
    } else {
        console.log("Geolocation not available on this browser")
    }
}
