import { createOurElement } from '../../patterns/createElement';
import { Api } from '../../server/server-api';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultUserImg = require('../../../assets/images/user-default.png');

export class ProfilePage {
    protected container: HTMLElement;

    constructor(id: string) {
        this.container = document.createElement('main');
        this.container.classList.add('main');
        this.container.id = id;
    }

    private async createMainInfoBlock() {
        const mainInfo = createOurElement('div', 'main-user-info flex-columns');
        const imgWrap = createOurElement('div', 'main-user-info__img-wrap');
        const img = createOurElement('img', 'main-user-info__img');
        img.setAttribute('src', defaultUserImg);
        imgWrap.append(img);
        const dataWrap = createOurElement('div', 'main-user-info__data-wrap');
        const name = localStorage.getItem('username');
        if (name) {
            const username = createOurElement('h2', 'username', JSON.parse(name));
            dataWrap.append(username);
            const regDate = await Api.getUser(JSON.parse(name));
            const date = new Date(regDate.reg_date);
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = date.getFullYear();
            const formattedDate = `${day}.${month}.${year}`;
            const registrationDate = createOurElement('p', 'username', `Дата регистрации: ${formattedDate}`);
            dataWrap.append(username, registrationDate);
        }
        mainInfo.append(imgWrap, dataWrap);
        return mainInfo;
    }

    async render() {
        const mainWrapper = createOurElement('div', 'main__wrapper wrapper flex-columns');
        mainWrapper.append(await this.createMainInfoBlock());
        this.container.append(mainWrapper);
        return this.container;
    }
}
