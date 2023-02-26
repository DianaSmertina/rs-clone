import MainPage from '../pages/main-page/index';
import Quizzes from '../pages/quizzes/allQuizzes';
import ErrorPage, { ErrorTypes } from '../pages/error-page/index';
import ResultsPage from '../pages/results/index';
import { ProfilePage } from '../pages/profile/profile-page';
import { PopulationQuizPage } from '../pages/quizzes/population-quiz/page';
import QuizTemplate from '../patterns/quizTemplate';
import { QuizFlag } from '../pages/quizzes/flags-quiz/flags';
import CountryQuiz from '../pages/quizzes/country-quiz/page';

const route = (event?: Event) => {
    event = event || window.event;
    let href = '/';
    if (event) {
        event.preventDefault();
        href = (event.currentTarget as HTMLLinkElement).href;
    }
    window.history.pushState({}, '', href);
    handleLocation();
};

const routes: PathType = {
    404: new ErrorPage('error-page', ErrorTypes.Error_404).render(),
    '/': new MainPage('main-page').render(),
    '/quizzes': new Quizzes('quizzes').render(),
    '/main-page': new MainPage('main-page').render(),
    '/results': new ResultsPage('results').render(),
    '/user': new ProfilePage('profile').render(),
    '/temp': new QuizTemplate('temp').render(),
    '/quizz-flag': new QuizFlag('flag').render(),
    '/population-quiz': new PopulationQuizPage('population-quiz').render(),
    '/country-quiz': new CountryQuiz('country-quiz').render(),
};

export const handleLocation = async () => {
    const path = window.location.pathname;
    const route = routes[path as keyof PathType] || routes[404];
    const mainBlock = document.querySelector('.main');
    if (mainBlock) mainBlock.remove();
    const header = document.querySelector('.header');
    header?.after(await route);
};

export default route;

interface PathType {
    404: HTMLElement;
    '/': HTMLElement;
    '/quizzes': HTMLElement;
    '/main-page': HTMLElement;
    '/results': Promise<HTMLElement>;
    '/user': Promise<HTMLElement>;
    '/temp': HTMLElement;
    '/quizz-flag': HTMLElement;
    '/population-quiz': HTMLElement;
    '/country-quiz': HTMLElement;
}

declare global {
    interface Window {
        route: (event: Event) => void;
    }
}
