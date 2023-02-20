import Component from '../../patterns/component';
import { createOurElement } from '../../patterns/createElement';
import { Api } from '../../server/server-api';

export class QuizResult extends Component {
    private btnText: string;

    constructor(
        tagName: string,
        className: string,
        private result: number,
        private quizName: string,
        private region: string
    ) {
        super(tagName, className);
        this.btnText = 'Дальше';
    }

    async renderResult() {
        this.container.append(await this.createResults());
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

    private async createResults() {
        const form = createOurElement('div', 'form-wrap flex-columns');
        const btn = createOurElement(
            'button',
            'btn btn__colored',
            `
        <a href="quizzes">${this.btnText}</a>`
        );
        const title = createOurElement('h1', '', 'Результат');
        const result = createOurElement('h1', '', `${this.result}%`);
        const sendRes = await this.sendResult();

        btn.addEventListener('click', () => {
            this.container.remove();
        });

        const isRecord = createOurElement('p', 'form-wrap__is-record', '');
        if (sendRes === 'new record') {
            isRecord.innerText = 'Новый рекорд!';
        } else if (sendRes === 'please register or login to save the record') {
            isRecord.innerText = 'Пожалуйста, зарегистрируйся, чтобы сохранять результаты';
        }

        form.append(title, result, isRecord, btn, ...this.createShare());
        return form;
    }

    private async sendResult() {
        const res = await Api.addResult(this.quizName, this.result, this.region);
        return res;
    }

    private createShare() {
        const name = this.findName();

        const icon = document.createElement('div');
        icon.innerHTML = `<div data-copy="hidden" data-curtain class="ya-share2" data-title='Я прошёл викторину ${name} на ${this.result}%!' data-shape="round" data-more-button-type="short" data-services="vkontakte,telegram"></div>`;

        const script = document.createElement('script');
        script.src = `https://yastatic.net/share2/share.js`;
        script.defer = true;
        script.type = 'text/javascript';

        return [icon, script];
    }

    private findName() {
        switch (this.quizName) {
            case 'flags':
                return '"Узнай страну по флагу"';
            case 'country':
                return '"Угадай страну"';
            case 'population':
                return '"Угадай страну по населению"';
        }
    }
}
