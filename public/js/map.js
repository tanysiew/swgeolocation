mapboxgl.accessToken = 'pk.eyJ1IjoidGFueXNpZXciLCJhIjoiY2szanFydmN5MGx6ODNlbzMydTlnaXlpZSJ9.OYVeZaHYbL3CcNJayaHXOw';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    zoom: 15,
    center: [110.3736716, 1.5517209]

});

//Fetch stores from API
async function getStores() {
    const res = await fetch('/api/v1/stores');
    const data = await res.json();

    const stores = data.data.map(stores => {
        return addmarker(stores.location.coordinates[0], stores.location.coordinates[1]);
        // return {
        //     'type': 'Feature',
        //     'geometry': {
        //         'type': 'Point',
        //         'coordinates': [stores.location.coordinates[0], stores.location.coordinates[1]]
        //     },
        //     properties: {
        //         storeID: stores.storeId,
        //         icon: 'shop'
        //     }
        // }
    });

    // loadMap(stores);
}

function addmarker(lng, ltd) {
    var marker = new mapboxgl.Marker()
        .setLngLat([lng, ltd])
        .addTo(map);
};


// Load map with stores
function loadMap(stores) {
    map.on('load', function() {
        map.addSource('point', {
            'type': 'geojson',
            'data': {
                'type': 'FeatureCollection',
                features: stores,

            }
        });

        // map.addLayer({
        //     'id': 'points',
        //     'type': 'symbol',
        //     'source': 'points',
        //     'layout': {
        //     'icon-image': 'pulsing-dot'
        //     }
        // });



        map.addLayer({
            'id': 'points',
            'type': 'symbol',
            'source': 'point',
            'layout': {
                'icon-image': 'pulsing-dot',
                'icon-size': 1.5,
                'text-field': '{storeID}',
                'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
                'text-offset': [0, 0.9],
                'text-anchor': 'top'
            }
        });

    });
}

getStores();