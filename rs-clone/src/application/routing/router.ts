// import * as path from 'path';

const route = (event: Event) => {
    console.log(window.location);
    event = event || window.event;
    event.preventDefault();
    const target = event.target as HTMLLinkElement;
    window.history.pushState({}, '', target.href);
    handleLocation();
};

const routes: PathType = {
    404: '/index.html',
    '/': '/index.html',
    '/games': '/index.html',
    '/wins': '/index.html',
};

const handleLocation = async () => {
    const path = window.location.pathname;
    const route = routes[path as keyof PathType] || routes[404];
    const html = await fetch(route).then((data) => data.text());
    const mainBlock = document.querySelector('.main');
    if (mainBlock) mainBlock.innerHTML = html;
};

window.onpopstate = handleLocation;
window.route = route;

export default route;

interface PathType {
    404: string;
    '/': string;
    '/games': string;
    '/wins': string;
}

declare global {
    interface Window {
        route: (event: Event) => void;
    }
}
