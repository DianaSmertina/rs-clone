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

        return this.container;
    }

    private closeModal() {
        this.container.remove();
        this.ourClass.renderMain(this.value);
    }

    private createRegions() {
        const form = createOurElement('div', 'form-wrap');
        const btn = createOurElement('button', 'btn btn__colored', this.btnText);
        const title = createOurElement('h1', '', 'Выберите регион');
        const closeBlock = createOurElement(
            'div',
            'closeBtn',
            `
        <span class="closeBtn__line closeBtn__line_first"></span>
        <span class="closeBtn__line closeBtn__line_second"></span>
       `
        );

        btn.addEventListener('click', () => {
            this.closeModal();
        });

        closeBlock.addEventListener('click', () => {
            window.location.pathname = './quizzes';
        });

        form.append(title, this.createVariants(), btn, closeBlock);
        return form;
    }

    private createVariants() {
        const wrapp = createOurElement(
            'form',
            'form__wrapp',
            `<div><input type="radio" name="place" id="choice1" checked="checked" value="world"> 
            <label for="choice1">Весь мир</label></div>
            <div><input type="radio" name="place" id="choice2" value="africa">
            <label for="choice2">Африка</label></div>
            <div><input type="radio" name="place" id="choice3" value="asia">
            <label for="choice3">Азия</label></div>
            <div><input type="radio" name="place" id="choice4" value="america">
            <label for="choice4">Америка</label></div>
            <div><input type="radio" name="place" id="choice5" value="europe">
            <label for="choice5">Европа</label></div>`
        );
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
