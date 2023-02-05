import Header from '../components/header';
import Footer from '../components/footer';
import MainPage from '../main-page/index';

class App {
    private static header: Header = new Header('header', 'header');
    private static footer: Footer = new Footer('footer', 'footer');
    private static mainPage: MainPage = new MainPage('main', 'main');
    private static container: HTMLElement = document.body;

    run() {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyB6SRulzmagMGauUAszpYABPwn3kZ57itg&map_id=f3695c8185093af4&callback=initMap`;
        script.defer = true;
        App.container.append(script);

        App.container.append(App.header.render());
        const map = document.createElement('div');
        map.id = 'map';
        App.container.append(map);
        App.container.append(App.mainPage.render());
        App.container.append(App.footer.render());
    }
}

export default App;
