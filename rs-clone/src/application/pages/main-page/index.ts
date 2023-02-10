import Page from '../../patterns/pagePattern';
import { createOurElement } from '../../patterns/createElement';
import { initMap } from '../../components/maps/geo';

class MainPage extends Page {
    constructor(id: string) {
        super(id);
    }

    private addGoogleMap() {
        const mapWrapper = createOurElement('div', 'main__map');

        const map = document.createElement('div');
        map.id = 'map';

        const scriptGoogleApi = document.createElement('script');
        scriptGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyB6SRulzmagMGauUAszpYABPwn3kZ57itg&map_id=f3695c8185093af4&callback=initMap`;
        scriptGoogleApi.defer = true;
        scriptGoogleApi.type = 'text/javascript';

        mapWrapper.append(map, scriptGoogleApi);
        return mapWrapper;
    }

    render() {
        window.initMap = initMap;
        const mainWrapper = createOurElement('div', 'main__wrapper wrapper flex-columns');
        const promo = createOurElement('div', 'promo');
        const mainTitle = createOurElement('h1', 'main__title', 'World Map - приложение для изучения стран мира');
        const text = createOurElement(
            'p',
            'main__text',
            `С помощью нашего приложения вы сможете легко 
        запомнить расположение всех стран, а так же узнать их столицы, 
        флаги, валюту и численность населения...`
        );

        promo.append(mainTitle, text);
        mainWrapper.append(promo, this.addGoogleMap());

        this.container.append(mainWrapper);
        return this.container;
    }
}

export default MainPage;
