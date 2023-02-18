import Component from '../../patterns/component';
import { createOurElement } from '../../patterns/createElement';
import { ModalWindow } from './modal-window';
import route from '../../routing/router';
import { playAudio, soundOn } from '../../components/sound/sound';

const NavLinks = [
    {
        id: 'main-page',
        text: 'Главная',
    },
    {
        id: 'quizzes',
        text: 'Викторины',
    },
    {
        id: 'results',
        text: 'Достижения',
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
            (link as HTMLLinkElement).href = `/${item.id}`;
            link.innerHTML = item.text;
            link.addEventListener('click', (e) => {
                route(e);
            });
            li.append(link);
            navLinksList.append(li);
        });
        return navLinksList;
    }

    render() {
        const headerWrapper = createOurElement('div', 'header__wrapper wrapper flex-rows');

        const logo = document.createElement('a');
        logo.className = 'header__logo_link';
        logo.href = 'main-page';
        logo.innerHTML = `<div class ="header__logo_ico ico"></div>`;

        const navigation = createOurElement('nav', 'header__nav', '');
        navigation.append(this.renderNavLinksList());

        const rightBlock = createOurElement('div', 'header__right-block flex-rows');
        const headerLang = createOurElement(
            'div',
            'header__lang',
            `<label class="header__radio-btn">
              <input name="language" type="radio" value="en" />
              <span>EN</span>
            </label>
            <span>&nbsp;/&nbsp;</span>
            <label class="header__radio-btn">
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
        const soundWrap = createOurElement('div', 'sound-block');
        const soundBtn = createOurElement('div', 'ico sound sound-on');
        soundBtn.addEventListener('click', (e) => {
            const target = e.target as HTMLElement;
            target.classList.toggle('sound-off');
            playAudio(soundOn);
        });
        soundWrap.append(soundBtn);
        rightBlock.append(headerLang, switcherTheme, soundWrap, this.createAuthBlock());

        headerWrapper.append(logo, navigation, rightBlock);
        this.container.append(headerWrapper);
        return this.container;
    }
}

export default Header;
