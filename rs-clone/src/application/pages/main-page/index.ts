import Component from '../../patterns/component';
import { createOurElement } from '../../patterns/createElement';

class MainPage extends Component {
    constructor(tagName: string, className: string) {
        super(tagName, className);
    }

    render() {
        const mainWrapper = createOurElement('div', 'main__wrapper wrapper flex-columns');
        const mapWrapper = createOurElement('div', 'main__map');

        const map = document.createElement('div');
        map.id = 'map';

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

        mainWrapper.append(mapWrapper, promo, menu);
        this.container.append(mainWrapper);
        return this.container;
    }
}

export default MainPage;
