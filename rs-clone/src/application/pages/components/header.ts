import Component from '../../patterns/component';
import { createOurElement } from '../../patterns/createElement';
import { ModalWindow } from './modal-window';
import route from '../../routing/router';
import { playAudio, soundOn } from '../../components/sound/sound';
import { Api } from '../../server/server-api';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultUserImg = require('../../../assets/images/user-default.png');

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
    static nowLanguage: string;

    constructor(tagname: string, className: string) {
        super(tagname, className);
        Header.nowLanguage = 'ru';
    }

    private createRegBtns(type: string) {
        const btn = createOurElement('button', 'btn btn__colored btn__autho', type);
        btn.addEventListener('click', () => {
            const modal = new ModalWindow('div', 'none', type);
            btn.after(modal.render());
            modal.openModal();
        });
        return btn;
    }

    public async createProfileImg(btnsWrap: HTMLElement, username: string) {
        btnsWrap.innerHTML = '';
        const imgWrap = createOurElement('a', 'profile-page-btn');
        imgWrap.setAttribute('href', 'user');
        const img = createOurElement('img', 'profile-icon');
        const userImg = await Api.getAvatar(username);
        if (userImg) {
            img.setAttribute('src', userImg);
        } else {
            img.setAttribute('src', defaultUserImg);
        }
        imgWrap.append(img);
        const logOutBtn = createOurElement('button', 'btn btn__colored', 'Выйти');

        logOutBtn.addEventListener('click', () => {
            btnsWrap.innerHTML = '';
            btnsWrap.append(this.createRegBtns('Регистрация'), this.createRegBtns('Войти'));
            localStorage.removeItem('username');
            if (window.location.pathname === '/user') {
                window.location.pathname = '/main-page';
            }
        });

        btnsWrap.append(imgWrap, logOutBtn);
        return btnsWrap;
    }

    private async createAuthBlock(username: string) {
        const authorization = createOurElement('div', 'autho');
        const btnsWrap = createOurElement('div', 'account-btns flex-rows');
        if (username) {
            authorization.append(await this.createProfileImg(btnsWrap, JSON.parse(username)));
        } else {
            btnsWrap.append(this.createRegBtns('Регистрация'), this.createRegBtns('Войти'));
            authorization.append(btnsWrap);
        }
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
        navLinksList.addEventListener('click', this.closeMenu);
        return navLinksList;
    }

    async renderHeader() {
        const headerWrapper = createOurElement('div', 'header__wrapper wrapper flex-rows');

        const logo = document.createElement('a');
        logo.className = 'header__logo_link';
        logo.href = 'main-page';
        logo.innerHTML = `<div class ="header__logo_ico ico"></div>`;

        const navigation = createOurElement('nav', 'header__nav', '');
        navigation.append(this.renderNavLinksList());

        const switcherBlock = createOurElement('div', 'header__switcher-block flex-rows');
        const headerLang = createOurElement('div', 'header__lang');
        headerLang.append(...this.createLocalithation());

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

        switcherBlock.append(headerLang, switcherTheme, soundWrap);

        const burger = createOurElement(
            'div',
            'header__burger',
            `
        <span class="burger__line burger__line_first"></span>
        <span class="burger__line burger__line_second"></span>
        <span class="burger__line burger__line_third"></span>`
        );

        burger.addEventListener('click', () => {
            const html = document.querySelector('html');
            const overlay = document.querySelector('.overlay');
            const autho = document.querySelector('.account-btns');
            burger.classList.toggle('is-active');
            navigation.classList.toggle('menu-open');
            switcherBlock.classList.toggle('menu-open');
            autho?.classList.toggle('menu-open');
            html?.classList.toggle('antiscroll');
            overlay?.classList.toggle('overlay__active');
        });
        const overlay = createOurElement('div', 'overlay');
        overlay.addEventListener('click', this.closeMenu);

        const username = localStorage.getItem('username') || '';

        headerWrapper.append(burger, logo, navigation, switcherBlock, await this.createAuthBlock(username));
        this.container.append(headerWrapper);
        return this.container;
    }

    private closeMenu(e: Event) {
        const burger = document.querySelector('.header__burger');
        const navigation = document.querySelector('.header__nav');
        const switcherBlock = document.querySelector('.header__switcher-block');
        const autho = document.querySelector('.account-btns');
        const html = document.querySelector('html');
        const overlay = document.querySelector('.overlay');
        const target = e.target as HTMLElement;
        if (
            target.classList.contains('nav__item_link') ||
            target.classList.contains('overlay') ||
            target.classList.contains('btn__autho')
        ) {
            burger?.classList.remove('is-active');
            navigation?.classList.remove('menu-open');
            switcherBlock?.classList.remove('menu-open');
            autho?.classList.remove('menu-open');
            html?.classList.remove('antiscroll');
            overlay?.classList.remove('overlay__active');
        }
    }

    private createLocalithation() {
        const firstLabel = createOurElement(
            'label',
            'header__radio-btn',
            `<input name="language" type="radio" value="en" />
        <span>EN</span>`
        );
        const span = createOurElement('span', '', '&nbsp;/&nbsp;');
        const secondLabel = createOurElement(
            'label',
            'header__radio-btn',
            `<input name="language" type="radio" value="ru" checked />
            <span>RU</span>`
        );

        firstLabel.addEventListener('click', () => {
            Header.nowLanguage = 'en';
        });
        secondLabel.addEventListener('click', () => {
            Header.nowLanguage = 'ru';
        });

        return [firstLabel, span, secondLabel];
    }
}

export default Header;
