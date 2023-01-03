window.onload = () => {
    let myPos;
    if('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((pos) => {
            myPos = pos;
        })
        document.querySelector(".long").innerHTML = myPos;
    } else {
        console.log("Geolocation not available on this browser")
    }
}