import { createOurElement } from '../../patterns/createElement';
import { Api } from '../../server/server-api';
// import type { PieChartLegend } from 'google.visualization';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultUserImg = require('../../../assets/images/user-default.png');

export class ProfilePage {
    protected container: HTMLElement;

    constructor(id: string) {
        this.container = document.createElement('main');
        this.container.classList.add('main');
        this.container.id = id;
    }

    private async createMainInfoBlock(name: string) {
        const mainInfo = createOurElement('div', 'main-user-info flex-columns');
        const imgWrap = createOurElement('div', 'main-user-info__img-wrap');
        const img = createOurElement('img', 'main-user-info__img');
        img.setAttribute('src', defaultUserImg);
        imgWrap.append(img);
        const dataWrap = createOurElement('div', 'main-user-info__data-wrap');
        const username = createOurElement('h2', 'username', name);
        dataWrap.append(username);
        const regDate = await Api.getUser(name);
        const date = new Date(regDate.reg_date);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        const formattedDate = `${day}.${month}.${year}`;
        const registrationDate = createOurElement('p', 'username', `Дата регистрации: ${formattedDate}`);
        dataWrap.append(username, registrationDate);
        mainInfo.append(imgWrap, dataWrap);
        return mainInfo;
    }

    private async createRecordsBlock(name: string) {
        const recordsWrap = createOurElement('div', 'records flex-columns');
        const title = createOurElement('h2', 'records__title', 'Мои рекорды');
        recordsWrap.append(title);
        const userResults = await Api.getAllUserResults(name);
        const quizesWrap = createOurElement('div', 'flex-rows');
        quizesWrap.append(
            this.createQuizRecordBlock('Угадай страну', userResults.country, userResults.region_country),
            this.createQuizRecordBlock(
                'Угадай численность населения',
                userResults.population,
                userResults.region_population
            ),
            this.createQuizRecordBlock('Угадай флаг', userResults.flags, userResults.region_flags)
        );
        recordsWrap.append(quizesWrap);
        return recordsWrap;
    }

    private createQuizRecordBlock(quiz: string, result: number, region: string | null) {
        const quizWrap = createOurElement('div', 'records__quiz flex-columns');
        const quizName = createOurElement('p', 'records__quiz-name', quiz);
        const quizRes = createOurElement('div', 'records__quiz-results');
        google.charts.load('current', { packages: ['corechart'] });
        google.charts.setOnLoadCallback(drawChart);
        function drawChart() {
            const dataTable = new google.visualization.DataTable();
            dataTable.addColumn('string', 'Квиз');
            dataTable.addColumn('number', 'Результат');
            dataTable.addColumn({ type: 'string', role: 'tooltip' });
            dataTable.addRows([
                [quiz, result, `${result}%, рекорд набран в регионе ${region}`],
                ['', 100 - result, `Осталось набрать ${100 - result}%`],
            ]);

            const options: google.visualization.PieChartOptions = {
                legend: 'none',
                pieHole: 0.8,
                backgroundColor: 'none',
                slices: {
                    0: { color: '#0d98ba' },
                    1: { color: 'transparent' },
                },
                pieSliceText: 'none',
                tooltip: {
                    isHtml: true,
                    textStyle: {
                        fontSize: 16,
                        bold: true,
                    },
                },
                pieSliceBorderColor: '#0d98ba',
                width: 200,
            };

            const chart = new google.visualization.PieChart(quizRes);
            chart.draw(dataTable, options);
        }
        quizWrap.append(quizName, quizRes);
        return quizWrap;
    }

    async render() {
        const mainWrapper = createOurElement('div', 'main__wrapper wrapper flex-columns');
        const name = localStorage.getItem('username');
        if (name) {
            mainWrapper.append(
                await this.createMainInfoBlock(JSON.parse(name)),
                await this.createRecordsBlock(JSON.parse(name))
            );
        }
        this.container.append(mainWrapper);
        return this.container;
    }
}
