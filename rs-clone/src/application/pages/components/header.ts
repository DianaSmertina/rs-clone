import Component from '../../patterns/component';

class Header extends Component {
    constructor(tagname: string, className: string) {
        super(tagname, className);
    }

    render() {
        const headerWrapper = document.createElement('div');
        headerWrapper.className = 'header__wrapper wrapper flex-rows';

        const logo = document.createElement('a');
        logo.className = 'header__logo_link';
        logo.href = '#';
        logo.innerHTML = '<div class="header__logo_ico ico"></div>';

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

        const authorization = document.createElement('div');
        authorization.className = 'autho';
        authorization.innerHTML = `<div class="account-btns flex-rows">
                                     <a href="#"> <button class="btn btn__colored btn__reg">Регистрация</button> </a>
                                     <a href="#"><button class="btn btn__bordered btn__signIn">Войти</button></a>
                                   </div>`;

        rightBlock.append(headerLang, switcherTheme, authorization);
        headerWrapper.append(logo, navigation, rightBlock);
        this.container.append(headerWrapper);
        return this.container;
    }
}

export default Header;
