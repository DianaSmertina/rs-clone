import './global.css';
let map: google.maps.Map;

function initMap(): void {
    map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
        center: { lat: 0, lng: 0 },
        zoom: 2,
        mapId: 'f3695c8185093af4',
    });
    const contentString =
        '<div id="content">' +
        '<div id="siteNotice">' +
        '</div>' +
        '<h1 id="firstHeading" class="firstHeading">Австралия</h1>' +
        '<div id="bodyContent">' +
        '<p>Это Австралия, круто?</p>' +
        '</div>' +
        '</div>';
    const infowindow = new google.maps.InfoWindow({
        content: contentString,
        ariaLabel: 'Uluru',
    });
    const marker = new google.maps.Marker({
        position: { lat: -25.363, lng: 131.044 },
        map,
        title: 'Uluru (Ayers Rock)',
    });

    marker.addListener('click', () => {
        infowindow.open({
            anchor: marker,
            map,
        });
    });
}

declare global {
    interface Window {
        initMap: () => void;
    }
}

window.initMap = initMap;
