import Component from '../../patterns/component';
import { createOurElement } from '../../patterns/createElement';

export class QuizRegion extends Component {
    private btnText: string;

    constructor(tagName: string, className: string) {
        super(tagName, className);
        this.btnText = 'Дальше';
    }

    render() {
        this.container.append(this.createRegions());
        this.container.className = 'modal';
        this.closeModal();

        return this.container;
    }

    private closeModal() {
        this.container.addEventListener('click', (e) => {
            if (e.target === e.currentTarget) {
                this.container.remove();
            }
        });
    }

    private createRegions() {
        const form = createOurElement('div', 'form-wrap');
        const btn = createOurElement('button', 'btn btn__colored', this.btnText);
        const title = createOurElement('h1', '', 'Выберите регион');

        btn.addEventListener('click', () => {
            this.container.remove();
        });

        form.append(title, btn);
        return form;
    }
}
