import Page from '../../patterns/pagePattern';
import { createOurElement } from '../../patterns/createElement';
// import { Api, IResult, Iuser } from '../../server/server-api';

// const allUsers =
class ResultsPage extends Page {
    constructor(id: string) {
        super(id);
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

    numbers = ['№', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    userResults: IObjResult[] = [
        { userName: 'Users', userRes: 'Results' },
        { userName: 'Ann', userRes: '50' },
        { userName: 'Lily', userRes: '30' },
        { userName: 'Mark', userRes: '70' },
        { userName: 'Ken', userRes: '90' },
        { userName: 'Adam', userRes: '10' },
        { userName: 'Ann1', userRes: '40' },
        { userName: 'Lily1', userRes: '100' },
        { userName: 'Mark1', userRes: '10' },
        { userName: 'Ken1', userRes: '20' },
        { userName: 'Adam1', userRes: '60' },
    ];

    showResults(e: Event) {
        const target = e.target as HTMLElement;
        let obj: IObjResult[] = [];
        switch (target.id) {
            case 'countryRes':
                obj = this.userResults;
                break;
            case 'populationRes':
                break;
            case 'flagRes':
                break;
        }
        const mainWrapper = document.querySelector('.main__wrapper');
        const lastTable = document.querySelector('.table');
        if (lastTable) lastTable.remove();
        mainWrapper?.append(this.renderTable(obj));
    }

    render() {
        const mainWrapper = createOurElement('div', 'main__wrapper wrapper flex-columns');
        const mainTitle = createOurElement('h1', 'main__title', 'Достижения');
        const quizBtns = createOurElement('div', 'quizBtns flex-rows', '');
        this.quizzes.forEach((quiz) => {
            const btn = createOurElement('button', 'btn  btn-quiz', `${quiz.name}`);
            btn.id = quiz.id;
            btn.addEventListener('click', (e) => this.showResults(e));
            quizBtns.append(btn);
        });

        mainWrapper.append(mainTitle, quizBtns);
        this.container.append(mainWrapper);
        return this.container;
    }

    renderTable(objResult: IObjResult[]) {
        const table = createOurElement('div', 'table flex-rows', '');
        const tableNumbers = createOurElement('div', 'tableNumbers', '');
        this.numbers.forEach((numb) => {
            const number = createOurElement('div', 'number', `${numb}`);
            tableNumbers.append(number);
        });
        const usersNames = createOurElement('div', 'usersNames', '');
        objResult.forEach((name) => {
            const userName = createOurElement('div', 'userName', `${name.userName}`);
            usersNames.append(userName);
        });
        const results = createOurElement('div', 'userResults', '');
        objResult.forEach((res) => {
            const result = createOurElement('div', 'userRes', `${res.userRes}`);
            results.append(result);
        });
        table.append(tableNumbers, usersNames, results);
        return table;
    }
}
interface IObjResult {
    userName: string;
    userRes: string;
}

export default ResultsPage;
