import Component from '../../patterns/component';
import { createOurElement } from '../../patterns/createElement';
import { ModalWindow } from './modal-window';

class Header extends Component {
    constructor(tagname: string, className: string) {
        super(tagname, className);
    }

    private modalRegistration = new ModalWindow('div', 'none');
    private modalAuthorization = new ModalWindow('div', 'none');

    private createRegBtn() {
        const btn = createOurElement('button', 'btn btn__colored btn__reg', 'Регистрация');
        return btn;
    }

    private createAuthBtn() {
        const btn = createOurElement('button', 'btn btn__colored btn__signIn', 'Войти');
        return btn;
    }

    private createAuthBlock() {
        const authorization = createOurElement('div', 'autho');
        const btnsWrap = createOurElement('div', 'account-btns flex-rows');
        btnsWrap.append(this.createRegBtn(), this.createAuthBtn());
        authorization.append(btnsWrap);
        return authorization;
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

        rightBlock.append(headerLang, switcherTheme, this.createAuthBlock());
        headerWrapper.append(logo, navigation, rightBlock, this.modalRegistration.render());
        this.container.append(headerWrapper);
        return this.container;
    }
}

export default Header;
