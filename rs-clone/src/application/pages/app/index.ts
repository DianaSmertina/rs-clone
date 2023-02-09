import Header from '../components/header';
import Footer from '../components/footer';
import MainPage from '../main-page/index';
import Quizzes from '../quizzes/allQuizzes';
import WholeWorldQuiz from '../quizzes/wholeWorld';
import NeighboCountries from '../quizzes/neighboCountries';
import Page from '../../patterns/pagePattern';
import ErrorPage, { ErrorTypes } from '../error-page/index';

export const enum PageIds {
    MainPage = 'main-page',
    Quizzes = 'quizzes',
    WholeWorld = 'whole-world',
    NeighboringCountries = 'neighboring-countries',
}

class App {
    private static container: HTMLElement = document.body;
    private static defaultPageId = 'current-page';
    private static header: Header = new Header('header', 'header');
    private static footer: Footer = new Footer('footer', 'footer');
    private initialPage: MainPage;

    static renderNewPage(idPage: string) {
        const currentPageHTML = document.getElementById(this.defaultPageId);
        if (currentPageHTML) {
            currentPageHTML.remove();
        }
        let page: Page | null = null;

        switch (idPage) {
            case PageIds.MainPage:
                {
                    page = new MainPage(idPage);
                }
                break;
            case PageIds.Quizzes:
                {
                    page = new Quizzes(idPage);
                }
                break;
            case PageIds.WholeWorld:
                {
                    page = new WholeWorldQuiz(idPage);
                }
                break;
            case PageIds.NeighboringCountries:
                {
                    page = new NeighboCountries(idPage);
                }
                break;
            default: {
                page = new ErrorPage(idPage, ErrorTypes.Error_404);
            }
        }

        if (page) {
            const pageHTML = page.render();
            pageHTML.id = this.defaultPageId;
            App.container.append(pageHTML);
        }
    }

    constructor() {
        this.initialPage = new MainPage('main-page');
    }

    private enableRouteChange() {
        window.addEventListener('hashchange', () => {
            const hash = window.location.hash.slice(1);
            App.renderNewPage(hash);
        });
    }

    // private urlRouter() {
    //     const links = document.querySelectorAll('.nav__item_link');
    //     links.forEach((link) => link.addEventListener('click', this.router));
    // }

    // private router = (event: Event) => {
    //     event = event || window.event;
    //     event.preventDefault();
    //     const target = event.target as HTMLLinkElement;
    //     window.history.pushState({}, '', target.href);
    //     this.handleLocation();
    // };

    // private handleLocation = async () => {
    //     const path = window.location.pathname;
    //     const route = routes[path as keyof PathType] || routes[404];
    //     const html = await fetch(route).then((data) => data.text());
    //     App.renderNewPage(path.slice(1));
    //     window.onpopstate = this.handleLocation;
    //     window.route = this.router;
    // };

    run() {
        App.container.append(App.header.render());
        App.renderNewPage('main-page');
        App.container.append(App.footer.render());
        this.enableRouteChange();
        // this.urlRouter();
    }
}

export default App;

// declare global {
//     interface Window {
//         route: (event: Event) => void;
//     }
// }
