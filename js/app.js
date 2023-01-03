window.onload = () => {
    if('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((pos) => {
            console.log(pos);
        });
    } else {
        console.log("Geolocation not available on this browser")
    }
}