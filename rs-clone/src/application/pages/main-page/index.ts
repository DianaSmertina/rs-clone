import Page from '../../patterns/pagePattern';
import { createOurElement } from '../../patterns/createElement';
import { initMap } from '../../patterns/geo';

class MainPage extends Page {
    constructor(id: string) {
        super(id);
    }

    render() {
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

        window.initMap = initMap;
        const mainWrapper = createOurElement('div', 'main__wrapper wrapper flex-columns');
        const mapWrapper = createOurElement('div', 'main__map');

        const map = document.createElement('div');
        map.id = 'map';

        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyB6SRulzmagMGauUAszpYABPwn3kZ57itg&map_id=f3695c8185093af4&callback=initMap`;
        script.defer = true;
        script.type = 'text/javascript';

        mapWrapper.append(map, script);

        mainWrapper.append(promo, mapWrapper);
        this.container.append(mainWrapper);
        return this.container;
    }
}

export default MainPage;
