import Component from '../../patterns/component';
import { createOurElement } from '../../patterns/createElement';
import { ModalWindow } from './modal-window';
import { PageIds } from '../app/index';

const NavLinks = [
    {
        id: PageIds.MainPage,
        text: 'Главная',
    },
    {
        id: PageIds.Quizzes,
        text: 'Викторины',
    },
];

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

    private renderNavLinksList() {
        const navLinksList = createOurElement('ul', 'nav__list', '');
        NavLinks.forEach((item) => {
            const li = createOurElement('li', 'nav__item');
            const link = createOurElement('a', 'nav__item_link', '');
            (link as HTMLLinkElement).href = `#${item.id}`;
            link.innerHTML = item.text;
            li.append(link);
            navLinksList.append(li);
        });
        return navLinksList;
    }

    render() {
        const headerWrapper = createOurElement('div', 'header__wrapper wrapper flex-rows');

        const logo = document.createElement('a');
        logo.className = 'header__logo_link';
        logo.href = '#';
        logo.innerHTML = `<div class ="header__logo_ico ico"></div>`;
        const navigation = createOurElement('nav', 'header__nav', '');
        navigation.append(this.renderNavLinksList());
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
        headerWrapper.append(logo, navigation, rightBlock);
        this.container.append(headerWrapper);
        console.log(this.container);
        return this.container;
    }
}

export default Header;
