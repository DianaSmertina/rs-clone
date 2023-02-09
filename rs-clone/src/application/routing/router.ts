import MainPage from '../pages/main-page/index';
import Quizzes from '../pages/quizzes/allQuizzes';
import ErrorPage, { ErrorTypes } from '../pages/error-page/index';

const route = (event?: Event) => {
    event = event || window.event;
    let href = '/';
    if (event) {
        event.preventDefault();
        href = (event.target as HTMLLinkElement).href;
    }
    window.history.pushState({}, '', href);
    handleLocation();
};

const routes: PathType = {
    404: new ErrorPage('error-page', ErrorTypes.Error_404).render(),
    '/': new MainPage('main-page').render(),
    '/quizzes': new Quizzes('quizzes').render(),
    '/main-page': new MainPage('main-page').render(),
};

export const handleLocation = () => {
    const path = window.location.pathname;
    const route = routes[path as keyof PathType] || routes[404];
    const mainBlock = document.querySelector('.main');
    if (mainBlock) mainBlock.remove();
    const header = document.querySelector('.header');
    header?.after(route);
};

export default route;

interface PathType {
    404: HTMLElement;
    '/': HTMLElement;
    '/quizzes': HTMLElement;
    '/main-page': HTMLElement;
}

declare global {
    interface Window {
        route: (event: Event) => void;
    }
}