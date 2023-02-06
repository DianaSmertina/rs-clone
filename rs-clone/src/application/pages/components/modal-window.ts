import Component from '../../patterns/component';
import { createOurElement } from '../../patterns/createElement';

export class ModalWindow extends Component {
    constructor(tagName: string, className: string, private btnText: string) {
        super(tagName, className);
        this.btnText = btnText;
    }

    private createInput(text: string) {
        const div = createOurElement('div', 'input-wrap');
        const label = createOurElement('label', 'form-wrap__label', text);
        const input = createOurElement('input', 'form-wrap__input');
        div.append(label, input);
        return div;
    }

    private createForm() {
        const wrap = createOurElement('div', 'form-wrap');
        const btn = createOurElement('button', 'btn btn__colored', this.btnText);
        wrap.append(this.createInput('Логин'), this.createInput('Пароль'), btn);
        return wrap;
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
