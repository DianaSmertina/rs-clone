import Component from '../../patterns/component';
import { createOurElement } from '../../patterns/createElement';

export class QuizRegion extends Component {
    private btnText: string;

    constructor(tagName: string, className: string, private ourClass: { renderMain: () => HTMLElement }) {
        super(tagName, className);
        this.btnText = 'Дальше';
    }

    render() {
        this.container.append(this.createRegions());
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
        this.ourClass.renderMain();
    }

    private createRegions() {
        const form = createOurElement('div', 'form-wrap');
        const btn = createOurElement('button', 'btn btn__colored', this.btnText);
        const title = createOurElement('h1', '', 'Выберите регион');

        btn.addEventListener('click', () => {
            this.closeModal();
        });

        form.append(title, this.createVariants(), btn);
        return form;
    }

    private createVariants() {
        const wrapp = createOurElement(
            'form',
            'form__wrapp',
            `<div><input type="radio" name="place" id="choice1" checked="checked"> 
            <label for="choice1">Весь мир</label></div>
            <div><input type="radio" name="place" id="choice2">
            <label for="choice2">Африка</label></div>
            <div><input type="radio" name="place" id="choice3">
            <label for="choice3">Азия</label></div>
            <div><input type="radio" name="place" id="choice4">
            <label for="choice4">Америка</label></div>
            <div><input type="radio" name="place" id="choice5">
            <label for="choice5">Европа</label></div>`
        );

        return wrapp;
    }
}
