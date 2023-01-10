// Because we need the HTML DOM elements to load first before we can execute script on it
window.onload = () => {
    // Initialize map and show the "world"
    let map = L.map('map').fitWorld();

    // Some variables, tuple is [lat, long] for coordinates
    let niceCentre = [43.7102, 7.2620];
    let bermudeTriangle = [
        [32.99, -64.79],
        [25.761681, -80.191788],
        [18.46633, -66.10572]
    ];
    let marseilleCentre = [43.2965, 5.3698];

    // API for the tiles, Z is zoom level, X is lattitude and Y longitude
    L.tileLayer('http://stamen-tiles-a.a.ssl.fastly.net/terrain/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '© OpenStreetMap'
    }).addTo(map);

    // Try to geolocate the user
    map.locate({setView: true, maxZoom: 16});

    // Add marker to the town named "Nice", and draw the Bermudes triangle
    L.marker(niceCentre).addTo(map);
    L.marker(marseilleCentre).addTo(map);
    L.polygon(bermudeTriangle).addTo(map);
    L.polygon([niceCentre, marseilleCentre]).addTo(map);

    // If the locate function found the position then show the position with a marker and draw a radius representing the precision
    function onLocationFound(e) {
        var radius = e.accuracy;

        L.marker(e.latlng).addTo(map);
        L.circle(e.latlng, radius).addTo(map);
    }

    // If the locate fail, show error
    function onLocationError(e) {
        alert(e.message);
    }

    // Bind events
    map.on('locationerror', onLocationError);
    map.on('locationfound', onLocationFound);
}