import Component from '../../patterns/component';
import { createOurElement } from '../../patterns/createElement';
import { Api } from '../../server/server-api';

export class ModalWindow extends Component {
    constructor(tagName: string, className: string, private btnText: string) {
        super(tagName, className);
        this.btnText = btnText;
    }

    private api = new Api();

    private createInput(text: string) {
        const div = createOurElement('div', 'input-wrap');
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
        div.append(label, input);
        return div;
    }

    private createForm() {
        const form = createOurElement('form', 'form-wrap');
        const btn = createOurElement('input', 'btn btn__colored', this.btnText);
        btn.setAttribute('type', 'submit');
        const greetings = createOurElement('h3', 'form-wrap__greetings');
        const text = createOurElement('p', 'form-wrap__text');

        let submitRes: string;
        if (this.btnText === 'Регистрация') {
            greetings.innerText = 'Рады приветсвовать нового знатока стран!';
            text.innerText = 'Придумай логин и пароль, длина которого должна быть 6 или больше символов';
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                const password = form.querySelector<HTMLInputElement>('.password')?.value;
                const login = form.querySelector<HTMLInputElement>('.login')?.value;
                if (password && login) {
                    submitRes = await this.api.signUp({ username: login, password: password });
                }
            });
        } else {
            greetings.innerText = 'Рады видеть тебя снова!';
            text.innerText = 'Пожалуйста, введи логин и пароль от своей учетной записи';
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                const password = form.querySelector<HTMLInputElement>('.password')?.value;
                const login = form.querySelector<HTMLInputElement>('.login')?.value;
                if (password && login) {
                    submitRes = await this.api.signIn({ username: login, password: password });
                }
            });
        }
        form.append(greetings, text, this.createInput('Логин'), this.createInput('Пароль'), btn);
        return form;
    }

    openModal() {
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
