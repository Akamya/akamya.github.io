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
    var nice = L.marker(niceCentre).addTo(map);
    var marseille = L.marker(marseilleCentre).addTo(map);
    var bermudes = L.polygon(bermudeTriangle).addTo(map);
    var niceMarseilleLine = L.polygon([niceCentre, marseilleCentre]).addTo(map);

    showDistance([43.7102, 7.2620], [43.2965, 5.3698]);
    getGeoData();

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

// Using Haversine's formula
function showDistance(firstPos, secondPos, mark = null) {
    D = 2 * 6371 * Math.asin(
        Math.sqrt(
            Math.sin((secondPos[0] - firstPos[0]) / 2) * Math.sin((secondPos[0] - firstPos[0]) / 2) + Math.cos(firstPos[0]) * Math.cos(secondPos[0])
            * (Math.sin((secondPos[0] - firstPos[0]) / 2) * Math.sin((secondPos[0] - firstPos[0]) / 2))
        )
    )
    console.log(D);
}

async function getGeoData() {
    let url = 'https://geo.api.gouv.fr/departements/83/communes?fields=nom,code,centre,codeRegion,population&format=geojson&geometry=centre'
    let result = await fetch(url).then(res => res.json());
    L.geoJSON(result);
}