window.onload = () => {
    let myPos;
    if('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((pos) => {
            myPos = pos;
        })
        console.log(myPos)
    } else {
        console.log("Geolocation not available on this browser")
    }
}