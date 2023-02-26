import Component from '../../patterns/component';
import { createOurElement } from '../../patterns/createElement';
import { ModalWindow } from './modal-window';
import route from '../../routing/router';
import { playAudio, soundOn } from '../../components/sound/sound';
import { Api } from '../../server/server-api';
import { translate } from '../../patterns/translation';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultUserImg = require('../../../assets/images/user-default.png');

const NavLinks = [
    {
        link: 'main-page',
        text: 'Главная',
    },
    {
        link: 'quizzes',
        text: 'Викторины',
    },
    {
        link: 'results',
        text: 'Достижения',
    },
];

class Header extends Component {
    static nowLanguage: string;

    static firstLabel: HTMLElement;

    static secondLabel: HTMLElement;

    constructor(tagname: string, className: string) {
        super(tagname, className);
    }

    private createRegBtns(type: string) {
        const btn = createOurElement('button', 'btn btn__colored btn__autho', type, type);
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
        const logOutBtn = createOurElement('button', 'btn btn__colored', 'Выйти', 'Log out');

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
            const link = createOurElement('a', 'nav__item_link', '', item.text);
            (link as HTMLLinkElement).href = `/${item.link}`;
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
        logo.href = '/main-page';
        logo.innerHTML = `<div class ="header__logo_ico ico"></div>`;
        logo.addEventListener('click', (e) => {
            route(e);
        });

        const navigation = createOurElement('nav', 'header__nav', '');
        navigation.append(this.renderNavLinksList());

        const switcherBlock = createOurElement('div', 'header__switcher-block flex-rows');
        const headerLang = createOurElement('div', 'header__lang');
        headerLang.append(...this.createLocalithation());

        const soundWrap = createOurElement('div', 'sound-block');
        const soundBtn = createOurElement('div', 'ico sound sound-on');
        soundBtn.addEventListener('click', (e) => {
            const target = e.target as HTMLElement;
            target.classList.toggle('sound-off');
            playAudio(soundOn);
        });
        soundWrap.append(soundBtn);

        switcherBlock.append(headerLang, soundWrap);

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

        headerWrapper.append(burger, logo, navigation, switcherBlock, await this.createAuthBlock(username), overlay);
        this.container.append(headerWrapper);
        setTimeout(this.getLang, 0);
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
        Header.firstLabel = createOurElement(
            'label',
            'header__radio-btn',
            `<input id= "inputEn" name="language" type="radio" value="en" />
        <span>EN</span>`
        );
        const span = createOurElement('span', '', '&nbsp;/&nbsp;');
        Header.secondLabel = createOurElement(
            'label',
            'header__radio-btn',
            `<input id= "inputRu" name="language" type="radio" value="ru" />
            <span>RU</span>`
        );

        Header.firstLabel.addEventListener('click', () => {
            localStorage.setItem('nowLanguage', 'en');
            translate();
            document.getElementById('inputRu')?.removeAttribute('checked');
            document.getElementById('inputEn')?.setAttribute('checked', 'checked');
        });
        Header.secondLabel.addEventListener('click', () => {
            localStorage.setItem('nowLanguage', 'ru');
            translate();
            document.getElementById('inputEn')?.removeAttribute('checked');
            document.getElementById('inputRu')?.setAttribute('checked', 'checked');
        });

        return [Header.firstLabel, span, Header.secondLabel];
    }

    getLang() {
        const lang = localStorage.getItem('nowLanguage');
        if (lang === 'en') {
            document.getElementById('inputRu')?.removeAttribute('checked');
            document.getElementById('inputEn')?.setAttribute('checked', 'checked');
        } else {
            document.getElementById('inputEn')?.removeAttribute('checked');
            document.getElementById('inputRu')?.setAttribute('checked', 'checked');
        }
    }
}

export default Header;
