import './global.css';
let map: google.maps.Map;

function initMap(): void {
    map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
        center: { lat: 0, lng: 0 },
        zoom: 2,
        mapId: 'f3695c8185093af4',
    });
}

declare global {
    interface Window {
        initMap: () => void;
    }
}

window.initMap = initMap;
