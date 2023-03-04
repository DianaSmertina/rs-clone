import Component from '../../patterns/component';
import { createOurElement } from '../../patterns/createElement';
import { Api } from '../../server/server-api';
import Header from './header';

export class ModalWindow extends Component {
    constructor(tagName: string, className: string, private btnText: string) {
        super(tagName, className);
        this.btnText = btnText;
    }

    private createGreeting() {
        const greetWrap = createOurElement('div', 'greet-wrap');
        let greeting = createOurElement('h3', 'form-wrap__greetings');
        let text = createOurElement('p', 'form-wrap__text');
        if (this.btnText === 'Регистрация') {
            greeting = createOurElement('h3', 'form-wrap__greetings', '', 'registerGreetings');
            text = createOurElement('p', 'form-wrap__text', '', 'registerText');
        } else if (this.btnText === 'Войти') {
            greeting = createOurElement('h3', 'form-wrap__greetings', '', 'signInGreetings');
            text = createOurElement('p', 'form-wrap__text', '', 'signInText');
        }
        greetWrap.append(greeting, text);
        return greetWrap;
    }

    private createInput(text: string) {
        const inpurWrap = createOurElement('div', 'input-wrap');
        const label = createOurElement('label', 'form-wrap__label', '', text);
        const input = createOurElement('input', 'form-wrap__input');
        input.setAttribute('required', 'true');
        if (text === 'Пароль') {
            input.setAttribute('type', 'password');
            input.setAttribute('pattern', '^\\S{5}\\S+$');
            input.classList.add('password');
        } else {
            input.classList.add('login');
            input.setAttribute('pattern', '^\\S\\S+$');
        }
        inpurWrap.append(label, input);
        return inpurWrap;
    }

    private createCloseBtn() {
        const closeBlock = createOurElement('div', 'closeBtn', '');
        const firstLine = createOurElement('span', 'closeBtn__line closeBtn__line_first', '');
        const secondLine = createOurElement('span', 'closeBtn__line closeBtn__line_second', '');
        closeBlock.append(firstLine, secondLine);
        closeBlock.addEventListener('click', () => {
            this.container.remove();
        });
        return closeBlock;
    }

    private async createSubmitHandler(e: Event) {
        e.preventDefault();

        const previousBadAttempt = document.querySelector('.submit-res');
        if (previousBadAttempt) {
            previousBadAttempt.remove();
        }

        const form = document.querySelector('.form-wrap');
        const password = form?.querySelector<HTMLInputElement>('.password')?.value;
        const login = form?.querySelector<HTMLInputElement>('.login')?.value;
        let submitRes: string | undefined | { message: string };

        if (password && login && this.btnText === 'Регистрация') {
            submitRes = await Api.signUp({ username: login, password: password });
        } else if (password && login && this.btnText === 'Войти') {
            submitRes = await Api.signIn({ username: login, password: password });
        }

        if (typeof submitRes === 'object') {
            const submitResEl = createOurElement('p', 'submit-res', submitRes.message);
            form?.append(submitResEl);
        } else if (login) {
            localStorage.setItem('username', JSON.stringify(login));
            this.container.remove();
            const regBtnsWrap = document.querySelector<HTMLElement>('.account-btns');
            const header = new Header('header', 'header');
            if (regBtnsWrap) {
                header.createProfileImg(regBtnsWrap, login);
            }
        }
    }

    private createForm() {
        const form = createOurElement('form', 'form-wrap');
        const btn = createOurElement('input', 'btn btn__colored', '', 'submit-text');
        btn.setAttribute('type', 'submit');
        form.addEventListener('submit', async (e) => {
            return await this.createSubmitHandler(e);
        });
        form.append(
            this.createGreeting(),
            this.createInput('Логин'),
            this.createInput('Пароль'),
            btn,
            this.createCloseBtn()
        );
        return form;
    }

    public openModal() {
        this.container.className = 'modal';
        this.closeModal();
    }

    private closeModal() {
        this.container.addEventListener('click', (e) => {
            if (e.target === e.currentTarget) {
                this.container.remove();
            }
        });
    }

    public render() {
        this.container.append(this.createForm());
        return this.container;
    }
}
