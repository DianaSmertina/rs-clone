import Component from '../../patterns/component';
import { ModalWindow } from './modal-window';
import { createOurElement } from '../../patterns/createElement';

class Header extends Component {
    constructor(tagname: string, className: string) {
        super(tagname, className);
    }

    private createBtn(type: string) {
        const btn = createOurElement('button', 'btn btn__colored', type);
        btn.addEventListener('click', () => {
            const modal = new ModalWindow('div', 'none', type);
            btn.after(modal.render());
            modal.openModal();
        });
        return btn;
    }

    private createAuthBlock() {
        const authorization = createOurElement('div', 'autho');
        const btnsWrap = createOurElement('div', 'account-btns flex-rows');
        btnsWrap.append(this.createBtn('Регистрация'), this.createBtn('Войти'));
        authorization.append(btnsWrap);
        return authorization;
    }

    render() {
        const headerWrapper = document.createElement('div');
        headerWrapper.className = 'header__wrapper wrapper flex-rows';

        const logo = document.createElement('a');
        logo.className = 'header__logo_link';
        logo.href = '#';
        logo.innerHTML = `<div class ="header__logo_ico ico"></div>`;

        const navigation = document.createElement('nav');
        navigation.className = 'header__nav';
        navigation.innerHTML = `<ul class="nav__list">
                                  <li class="nav__item"><a href="#" class="nav__item_link">Главная</a></li>
                                  <li class="nav__item"><a href="#" class="nav__item_link">Игры</a></li>
                                  <li class="nav__item"><a href="#" class="nav__item_link">Достижения</a></li>
                                </ul>`;
        const rightBlock = document.createElement('div');
        rightBlock.className = 'header__right-block flex-rows';

        const headerLang = document.createElement('div');
        headerLang.className = 'header__lang';
        headerLang.innerHTML = `<label class="radio-btn">
                                  <input name="language" type="radio" value="en" />
                                  <span>EN</span>
                                </label>
                                <span>&nbsp;/&nbsp;</span>
                                <label class="radio-btn">
                                  <input name="language" type="radio" value="ru" checked />
                                  <span>RU</span>
                                </label>`;

        const switcherTheme = document.createElement('div');
        switcherTheme.className = 'switcher-theme';
        switcherTheme.innerHTML = `<div class="theme__light ico"></div>
                                   <div class="theme__dark ico"></div>`;

        rightBlock.append(headerLang, switcherTheme, this.createAuthBlock());
        headerWrapper.append(logo, navigation, rightBlock);
        this.container.append(headerWrapper);
        return this.container;
    }
}

export default Header;
