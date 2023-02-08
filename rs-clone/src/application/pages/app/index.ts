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
    run() {
        App.container.append(App.header.render());
        App.renderNewPage('main-page');
        App.container.append(App.footer.render());
        this.enableRouteChange();
    }
}

export default App;
