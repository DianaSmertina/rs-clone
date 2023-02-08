import Component from '../../patterns/component';
import { createOurElement } from '../../patterns/createElement';
import { initMap } from '../../patterns/geo';
import { drawChart } from '../../patterns/geoChart';

class MainPage extends Component {
    constructor(tagName: string, className: string) {
        super(tagName, className);
    }

    render() {
        window.initMap = initMap;
        const mainWrapper = createOurElement('div', 'main__wrapper wrapper flex-columns');
        const mapWrapper = createOurElement('div', 'main__map');

        const map = document.createElement('div');
        map.id = 'map';

        const scriptGoogleApi = document.createElement('script');
        scriptGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyB6SRulzmagMGauUAszpYABPwn3kZ57itg&map_id=f3695c8185093af4&callback=initMap`;
        scriptGoogleApi.defer = true;
        scriptGoogleApi.type = 'text/javascript';

        // const scriptGeoChart = document.createElement('script');
        // scriptGeoChart.src = 'https://www.gstatic.com/charts/loader.js';
        // scriptGeoChart.defer = true;
        // scriptGeoChart.type = 'text/javascript';

        mapWrapper.append(map, scriptGoogleApi);

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

        const menu = createOurElement(
            'div',
            'menu flex-rows',
            `<div class="menu__item">
                <h3>Игра-1</h3>
            </div>
            <div class="menu__item">
                <h3>Игра-2</h3>
            </div>`
        );

        const geoChartWrap = document.createElement('div');
        geoChartWrap.id = 'regions_div';
        mainWrapper.append(mapWrapper, promo, menu, geoChartWrap);
        drawChart(geoChartWrap);
        this.container.append(mainWrapper);
        return this.container;
    }
}

export default MainPage;
