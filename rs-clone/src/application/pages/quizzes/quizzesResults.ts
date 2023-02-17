import Component from '../../patterns/component';
import { createOurElement } from '../../patterns/createElement';

export class QuizResult extends Component {
    private btnText: string;

    constructor(tagName: string, className: string, private resultText: string) {
        super(tagName, className);
        this.btnText = 'Дальше';
    }

    render() {
        this.container.append(this.createResults());
        this.container.className = 'modal';
        this.container.addEventListener('click', (e) => {
            if (e.target === e.currentTarget) {
                this.closeModal();
            }
        });
        return this.container;
    }

    private closeModal() {
        this.container.remove();
    }

    private createResults() {
        const form = createOurElement('div', 'form-wrap');
        const btn = createOurElement(
            'button',
            'btn btn__colored',
            `
        <a href="quizzes">${this.btnText}</a>`
        );
        const title = createOurElement('h1', '', 'Результат');
        const result = createOurElement('h1', '', this.resultText);

        btn.addEventListener('click', () => {
            this.container.remove();
        });

        form.append(title, result, btn);
        return form;
    }
}
