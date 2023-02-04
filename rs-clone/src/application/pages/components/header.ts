import Component from '../../patterns/component';
import { createOurElement } from '../../patterns/createElement';

class Header extends Component {
    constructor(tagname: string, className: string) {
        super(tagname, className);
    }

    render() {
        const headerWrapper = createOurElement('div', 'header__wrapper wrapper flex-rows');

        const logo = document.createElement('a');
        logo.className = 'header__logo_link';
        logo.href = '#';
        logo.innerHTML = `<div class ="header__logo_ico ico"></div>`;

        const navigation = createOurElement(
            'nav',
            'header__nav',
            `<ul class="nav__list">
        <li class="nav__item"><a href="#" class="nav__item_link">Главная</a></li>
        <li class="nav__item"><a href="#" class="nav__item_link">Игры</a></li>
        <li class="nav__item"><a href="#" class="nav__item_link">Достижения</a></li>
      </ul>`
        );
        const rightBlock = createOurElement('div', 'header__right-block flex-rows');
        const headerLang = createOurElement(
            'div',
            'header__lang',
            `<label class="radio-btn">
        <input name="language" type="radio" value="en" />
        <span>EN</span>
      </label>
      <span>&nbsp;/&nbsp;</span>
      <label class="radio-btn">
        <input name="language" type="radio" value="ru" checked />
        <span>RU</span>
      </label>`
        );
        const switcherTheme = createOurElement(
            'div',
            'switcher-theme',
            `<div class="theme__light ico"></div>
        <div class="theme__dark ico"></div>`
        );
        const authorization = createOurElement(
            'div',
            'autho',
            `<div class="account-btns flex-rows">
        <a href="#"> <button class="btn btn__colored btn__reg">Регистрация</button> </a>
        <a href="#"><button class="btn btn__bordered btn__signIn">Войти</button></a>
      </div>`
        );

        rightBlock.append(headerLang, switcherTheme, authorization);
        headerWrapper.append(logo, navigation, rightBlock);
        this.container.append(headerWrapper);
        return this.container;
    }
}

export default Header;
