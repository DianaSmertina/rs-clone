import Component from '../../patterns/component';
import { createOurElement } from '../../patterns/createElement';

export class QuizRegion extends Component {
    private btnText: string;

    private value: string;

    constructor(tagName: string, className: string, private ourClass: { renderMain: (region: string) => HTMLElement }) {
        super(tagName, className);
        this.btnText = 'Дальше';
        this.value = 'world';
    }

    render() {
        this.container.append(this.createRegions());
        this.container.className = 'modal';
        this.container.addEventListener('click', (e) => {
            if ((e.target as HTMLElement).classList.contains('modal')) {
                window.history.back();
            }
        });

        return this.container;
    }

    private closeModal() {
        this.container.remove();
        this.ourClass.renderMain(this.value);
    }

    private createCloseBtn() {
        const closeBlock = createOurElement('div', 'closeBtn', '');
        const firstLine = createOurElement('span', 'closeBtn__line closeBtn__line_first', '');
        const secondLine = createOurElement('span', 'closeBtn__line closeBtn__line_second', '');
        closeBlock.append(firstLine, secondLine);
        closeBlock.addEventListener('click', () => {
            window.history.back();
        });
        return closeBlock;
    }

    private createRegions() {
        const form = createOurElement('div', 'form-wrap');
        const btn = createOurElement('button', 'btn btn__colored', '', this.btnText);
        const title = createOurElement('h1', '', '', 'Выберите регион');

        btn.addEventListener('click', () => {
            this.closeModal();
        });

        form.append(title, this.createVariants(), btn, this.createCloseBtn());
        return form;
    }

    private createVariants() {
        const wrapp = createOurElement('form', 'form__wrapp', '', 'regionInputs');
        this.addListenersToForm(wrapp);

        return wrapp;
    }

    private addListenersToForm(elem: HTMLElement) {
        elem.addEventListener('change', (e) => {
            const target = e.target as HTMLInputElement;
            if (target != null) {
                const value = target.value;

                this.value = value;
            }
        });
    }
}
