import Header from '../components/header';
import Footer from '../components/footer';
import MainPage from '../main-page/index';

class App {
    private static header: Header = new Header('header', 'header');
    private static footer: Footer = new Footer('footer', 'footer');
    private static mainPage: MainPage = new MainPage('main', 'main');
    private static container: HTMLElement = document.body;

    run() {
        App.container.append(App.header.render());
        App.container.append(App.mainPage.render());
        App.container.append(App.footer.render());
    }
}

export default App;
