window.onload = () => {
    var map = L.map('map').fitWorld();
    var niceCentre = [43.7102, 7.2620];

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    }).addTo(map);

    map.locate({setView: true, maxZoom: 16});

    L.marker(niceCentre).addTo(map);

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