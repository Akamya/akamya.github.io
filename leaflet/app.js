window.onload = () => {
    var map = L.map('map').fitWorld();
    var niceCentre = [43.7102, 7.2620];
    var bermudeTriangle = [
        [32.99, -64.79],
        [25.761681, -80.191788],
        [18.46633, -66.10572]
    ];


    L.tileLayer('http://stamen-tiles-a.a.ssl.fastly.net/terrain/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '© OpenStreetMap'
    }).addTo(map);

    map.locate({setView: true, maxZoom: 16});

    L.marker(niceCentre).addTo(map);
    L.polygon(bermudeTriangle).addTo(map);


    function onLocationFound(e) {
        var radius = e.accuracy;


        L.marker(e.latlng).addTo(map);
    }

    function onLocationError(e) {
        alert(e.message);
    }

    map.on('locationerror', onLocationError);
    map.on('locationfound', onLocationFound);
}