import Component from '../../patterns/component';
import { createOurElement } from '../../patterns/createElement';
import { Api } from '../../server/server-api';

export class ModalWindow extends Component {
    constructor(tagName: string, className: string, private btnText: string) {
        super(tagName, className);
        this.btnText = btnText;
    }

    private api = new Api();

    private createGreeting() {
        const greetWrap = createOurElement('div', 'greet-wrap');
        const greeting = createOurElement('h3', 'form-wrap__greetings');
        const text = createOurElement('p', 'form-wrap__text');
        if (this.btnText === 'Регистрация') {
            greeting.innerText = 'Рады приветсвовать нового знатока стран!';
            text.innerText = 'Придумай логин и пароль, длина которого должна быть 6 или больше символов';
        } else {
            greeting.innerText = 'Рады видеть тебя снова!';
            text.innerText = 'Пожалуйста, введи логин и пароль от своей учетной записи';
        }
        greetWrap.append(greeting, text);
        return greetWrap;
    }

    private createInput(text: string) {
        const inpurWrap = createOurElement('div', 'input-wrap');
        const label = createOurElement('label', 'form-wrap__label', text);
        const input = createOurElement('input', 'form-wrap__input');
        input.setAttribute('required', 'true');
        if (text === 'Пароль') {
            input.setAttribute('type', 'password');
            input.setAttribute('pattern', '^\\S{5}\\S+$');
            input.classList.add('password');
        } else {
            input.classList.add('login');
        }
        inpurWrap.append(label, input);
        return inpurWrap;
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
            submitRes = await this.api.signUp({ username: login, password: password });
        } else if (password && login && this.btnText === 'Войти') {
            submitRes = await this.api.signIn({ username: login, password: password });
        }

        if (typeof submitRes === 'object') {
            const submitResEl = createOurElement('p', 'submit-res', submitRes.message);
            form?.append(submitResEl);
        } else {
            this.container.remove();
        }
    }

    private createForm() {
        const form = createOurElement('form', 'form-wrap');
        const btn = createOurElement('input', 'btn btn__colored', this.btnText);
        btn.setAttribute('type', 'submit');
        form.addEventListener('submit', async (e) => {
            return await this.createSubmitHandler(e);
        });
        form.append(this.createGreeting(), this.createInput('Логин'), this.createInput('Пароль'), btn);
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

    render() {
        this.container.append(this.createForm());
        return this.container;
    }
}
