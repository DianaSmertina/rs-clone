import { createOurElement } from '../../patterns/createElement';
import { Api } from '../../server/server-api';

class ResultsPage {
    protected container: HTMLElement;

    constructor(id: string, private allRes: IResObj[] | object = {}) {
        this.container = document.createElement('main');
        this.container.classList.add('main');
        this.container.id = id;
    }

    quizzes = [
        {
            name: 'Угадай страну',
            id: 'countryRes',
        },
        {
            name: 'Угадай численность населения',
            id: 'populationRes',
        },
        {
            name: 'Угадай страну по флагу',
            id: 'flagRes',
        },
    ];

    async render() {
        this.allRes = await Api.getAllResults();
        const mainWrapper = createOurElement('div', 'main__wrapper wrapper flex-columns');
        const mainTitle = createOurElement('h1', 'main__title', 'Достижения');
        const quizBtns = createOurElement('div', 'quizBtns flex-rows', '');
        this.quizzes.forEach((quiz) => {
            const btn = createOurElement('button', 'btn  btn-quiz', `${quiz.name}`);
            btn.id = quiz.id;
            btn.addEventListener('click', (e) => this.getResults(e));
            quizBtns.append(btn);
        });

        mainWrapper.append(mainTitle, quizBtns);
        this.container.append(mainWrapper);
        return this.container;
    }

    private getResults(e: Event) {
        const target = e.target as HTMLElement;
        const btnsAct = document.querySelectorAll('.btn-active');
        btnsAct.forEach((btn) => btn.classList.remove('btn-active'));
        target.classList.add('btn-active');
        let arr: IResObj[] = [];
        if (Array.isArray(this.allRes)) {
            switch (target.id) {
                case 'countryRes':
                    arr = this.allRes.sort((a, b) => b.country - a.country).slice(0, 10);
                    arr.push({ id: 'country' });
                    break;
                case 'populationRes':
                    arr = this.allRes.sort((a, b) => b.population - a.population).slice(0, 10);
                    arr.push({ id: 'population' });
                    break;
                case 'flagRes':
                    arr = this.allRes.sort((a, b) => b.flags - a.flags).slice(0, 10);
                    arr.push({ id: 'flags' });
                    break;
            }
        }

        const mainWrapper = document.querySelector('.main__wrapper');
        const lastTable = document.querySelector('.table');
        if (lastTable) lastTable.remove();
        mainWrapper?.append(this.renderTable(arr));
    }
    private renderTable(arr: IResObj[]) {
        const table = createOurElement('div', 'table flex-columns', '');
        const firstRow = createOurElement('div', 'row flex-rows', '');
        const numberF = createOurElement('div', 'number', '№');
        const nameF = createOurElement('div', 'userName', 'Имя');
        const resultF = createOurElement('div', 'userResult', 'Результат');
        const regionF = createOurElement('div', 'region', 'Регион');
        firstRow.append(numberF, nameF, resultF, regionF);
        table.append(firstRow);

        arr.forEach((item, ind) => {
            if (ind === 10) return;
            const row = createOurElement('div', 'row flex-rows', '');
            const number = createOurElement('div', 'number', `${ind + 1}`);
            const name = createOurElement('div', 'userName', `${item.user_name}`);

            let quizRes: number | undefined = 0;
            let quizReg: string | undefined | null = '';
            switch (arr[arr.length - 1].id) {
                case 'country': {
                    quizRes = item.country;
                    quizReg = item.region_country;
                    break;
                }
                case 'population': {
                    quizRes = item.population;
                    quizReg = item.region_population;
                    break;
                }
                case 'flags': {
                    quizRes = item.flags;
                    quizReg = item.region_flags;
                    break;
                }
            }
            const result = createOurElement('div', 'userResult', `${quizRes}`);
            const region = createOurElement('div', 'region', `${quizReg}`);

            row.append(number, name, result, region);
            table.append(row);
        });

        return table;
    }
}

interface IResObj {
    country?: number;
    population?: number;
    flags?: number;
    user_name?: string;
    region_country?: string | null;
    region_population?: string | null;
    region_flags?: string | null;
    id?: string;
}

export default ResultsPage;
