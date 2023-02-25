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
        const promo = createOurElement('div', 'promo flex-columns');
        const mainTitle = createOurElement('h1', 'main__title', 'World Map Quizzes');
        const mainTitleText = createOurElement('h2', 'main__title_text', '', 'mainTitleText');
        const text = createOurElement('div', 'main__text', ``, 'main__text');

        promo.append(mainTitle, mainTitleText, text);
        mainWrapper.append(promo, this.addGoogleMap());

        this.container.append(mainWrapper);
        return this.container;
    }
}

export default MainPage;
