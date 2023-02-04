import Component from '../../patterns/component';

class MainPage extends Component {
    constructor(tagName: string, className: string) {
        super(tagName, className);
    }

    render() {
        const mainWrapper = document.createElement('div');
        mainWrapper.className = 'main__wrapper wrapper flex-columns';

        const map = document.createElement('div');
        map.className = 'main__map';

        const promo = document.createElement('div');
        promo.className = 'promo';

        const mainTitle = document.createElement('h1');
        mainTitle.className = 'main__title';
        mainTitle.innerHTML = 'World Map - приложение для изучения стран мира';

        const text = document.createElement('p');
        text.className = 'main__text';
        text.innerHTML = `С помощью нашего приложения вы сможете легко 
        запомнить расположение всех стран, а так же узнать их столицы, 
        флаги, валюту и численность населения...`;

        promo.append(mainTitle, text);

        const menu = document.createElement('div');
        menu.className = 'menu flex-rows';
        menu.innerHTML = `<div class="menu__item">
                            <h3>Игра-1</h3>
                          </div>
                          <div class="menu__item">
                            <h3>Игра-2</h3>
                          </div>`;

        mainWrapper.append(map, promo, menu);
        this.container.append(mainWrapper);
        return this.container;
    }
}

export default MainPage;
