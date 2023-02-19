import { codesTranslate, ICodes } from '../../components/countries/regionsCodes';
import { createOurElement } from '../../patterns/createElement';
import { Api, IResult, Iuser } from '../../server/server-api';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultUserImg = require('../../../assets/images/user-default.png');

export class ProfilePage {
    protected container: HTMLElement;

    constructor(id: string, private user: Iuser | string = '', private results: IResult | string = '') {
        this.container = document.createElement('main');
        this.container.classList.add('main');
        this.container.id = id;
    }

    private createMainInfoBlock(user: Iuser) {
        const mainInfo = createOurElement('div', 'main-user-info flex-columns');
        const imgWrap = createOurElement('div', 'main-user-info__img-wrap');
        const img = createOurElement('img', 'main-user-info__img');
        const input = createOurElement('input', 'main-user-info__input');
        input.setAttribute('type', 'file');
        input.setAttribute('name', 'avatar');
        input.addEventListener('change', async (e) => {
            const files = (e.target as HTMLInputElement).files;
            if (files) {
                const file = files[0];
                const res = await Api.addAvatar(user.username, file);
                console.log(res);
            }
        });
        if (user.avatar) {
            img.setAttribute('src', user.avatar);
        } else {
            img.setAttribute('src', defaultUserImg);
        }
        imgWrap.append(img, input);
        const dataWrap = createOurElement('div', 'main-user-info__data-wrap');
        const username = createOurElement('h2', 'username', user.username);
        dataWrap.append(username);
        const date = new Date(user.reg_date);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        const formattedDate = `${day}.${month}.${year}`;
        const registrationDate = createOurElement('p', 'username', `Дата регистрации: ${formattedDate}`);
        dataWrap.append(username, registrationDate);
        mainInfo.append(imgWrap, dataWrap);
        return mainInfo;
    }

    private createRecordsBlock(result: IResult) {
        const recordsWrap = createOurElement('div', 'records flex-columns');
        const title = createOurElement('h2', 'records__title', 'Мои рекорды');
        recordsWrap.append(title);
        const quizesWrap = createOurElement('div', 'flex-rows');
        quizesWrap.append(
            this.createQuizRecordBlock('Угадай страну', result.country, result.region_country || 'world'),
            this.createQuizRecordBlock(
                'Угадай численность населения',
                result.population,
                result.region_population || 'world'
            ),
            this.createQuizRecordBlock('Угадай флаг', result.flags, result.region_flags || 'world')
        );
        recordsWrap.append(quizesWrap);
        return recordsWrap;
    }

    private createQuizRecordBlock(quiz: string, result: number, region: string) {
        const quizWrap = createOurElement('div', 'records__quiz flex-columns');
        const quizName = createOurElement('p', 'records__quiz-name', quiz);
        const quizRes = createOurElement('div', 'records__quiz-results');
        const regionName = codesTranslate[region as keyof ICodes].ru;
        google.charts.load('current', { packages: ['corechart'] });
        google.charts.setOnLoadCallback(drawChart);
        function drawChart() {
            const dataTable = new google.visualization.DataTable();
            dataTable.addColumn('string', 'Квиз');
            dataTable.addColumn('number', 'Результат');
            dataTable.addColumn({ type: 'string', role: 'tooltip' });
            dataTable.addRows([
                [quiz, result, `${result}%, рекорд набран в регионе ${regionName}`],
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

    private createAchievementsBlock() {
        const achievementsWrap = createOurElement('div', 'achievements flex-columns');
        const achievement = createOurElement('div', 'achievement flex-rows');
        const img = createOurElement('div', 'achievement__img-fire flex-columns');
        const achievInfo = createOurElement('div', 'achievement__info flex-columns');
        const name = createOurElement('h5', 'achievement__name', 'Пройдите все квизы');
        const input = createOurElement('input', 'achievement__range');
        input.setAttribute('type', 'range');
        achievInfo.append(name, input);
        achievement.append(img, achievInfo);
        achievementsWrap.append(achievement);
        return achievementsWrap;
    }

    async render() {
        const mainWrapper = createOurElement('div', 'main__wrapper wrapper flex-columns');
        const name = localStorage.getItem('username');
        if (name) {
            this.user = await Api.getUser(JSON.parse(name));
            this.results = await Api.getAllUserResults(JSON.parse(name));
            mainWrapper.append(
                this.createMainInfoBlock(this.user),
                this.createRecordsBlock(this.results),
                this.createAchievementsBlock()
            );
        }
        this.container.append(mainWrapper);
        return this.container;
    }
}
