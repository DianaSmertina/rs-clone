import Header from '../components/header';
import Footer from '../components/footer';
import route, { handleLocation } from '../../routing/router';

class App {
    private static container: HTMLElement = document.body;
    private static header: Header = new Header('header', 'header');
    private static footer: Footer = new Footer('footer', 'footer');

    run() {
        App.container.append(App.header.render(), App.footer.render());
        window.onpopstate = handleLocation;
        window.route = route;
        handleLocation();
    }
}

export default App;
