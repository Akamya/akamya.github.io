window.onload = () => {
    if('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((pos) => {
            uptadeHtml(pos.coords.longitude, pos.coords.latitude, pos.coords.altitude);
        });
    } else {
        console.log("Geolocation not available on this browser")
    }
}

function uptadeHtml(long, lat, alt) {
    let elemList = [".long", ".lat", ".alti"];
    elemList.forEach(e => {
        document.querySelector(e).innerHTML = long;
    })
}