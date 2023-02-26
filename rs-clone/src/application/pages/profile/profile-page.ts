import { codesTranslate, ICodes } from '../../components/countries/regionsCodes';
import { createOurElement } from '../../patterns/createElement';
import { Api, IResult, Iuser } from '../../server/server-api';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultUserImg = require('../../../assets/images/user-default.png');

export class ProfilePage {
    protected container: HTMLElement;

    constructor(
        id: string,
        private user: Iuser | string = '',
        private results: IResult | string = '',
        private allResults: Array<IResult> | { message: string } | string = ''
    ) {
        this.container = document.createElement('main');
        this.container.classList.add('main');
        this.container.id = id;
    }

    private createMainInfoBlock(user: Iuser) {
        const mainInfo = createOurElement('div', 'main-user-info flex-columns');
        const imgWrap = createOurElement('div', 'main-user-info__img-wrap');
        const img = createOurElement('img', 'main-user-info__img');
        const label = createOurElement('label', 'main-user-info__label');
        const input = createOurElement('input', 'main-user-info__input');
        const btnText = createOurElement('span', 'main-user-info__input-text btn btn__colored', '', 'update-photo');
        input.setAttribute('type', 'file');
        input.setAttribute('name', 'avatar');
        input.addEventListener('change', async (e) => {
            const files = (e.target as HTMLInputElement).files;
            if (files) {
                const file = files[0];
                await Api.addAvatar(user.username, file);
                const userInfo = await Api.getUser(user.username);
                const headerAvatar = document.querySelector('.profile-icon');
                if (userInfo.avatar && headerAvatar) {
                    img.setAttribute('src', userInfo.avatar);
                    headerAvatar.setAttribute('src', userInfo.avatar);
                }
            }
        });
        if (user.avatar) {
            img.setAttribute('src', user.avatar);
        } else {
            img.setAttribute('src', defaultUserImg);
        }
        label.append(input, btnText);
        imgWrap.append(img);
        const dataWrap = createOurElement('div', 'main-user-info__data-wrap');
        const username = createOurElement('h2', 'username', user.username);
        dataWrap.append(username);
        const date = new Date(user.reg_date);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        const formattedDate = `${day}.${month}.${year}`;
        const registrationDate = createOurElement('span', 'username', '', 'registration-date');
        const registrationDateSpan = createOurElement('span', '', `${formattedDate}`);
        const containerRegistrationDate = createOurElement('p', '');
        containerRegistrationDate.append(registrationDate, registrationDateSpan);
        dataWrap.append(username, containerRegistrationDate, label);
        mainInfo.append(imgWrap, dataWrap);
        return mainInfo;
    }

    private createRecordsBlock(result: IResult) {
        const recordsWrap = createOurElement('div', 'records flex-columns');
        const title = createOurElement('h2', 'records__title', '', 'my-records');
        recordsWrap.append(title);
        const quizesWrap = createOurElement('div', 'records__container');
        quizesWrap.append(
            this.createQuizRecordBlock('record-country', result.country, result.region_country || 'world'),
            this.createQuizRecordBlock('record-population', result.population, result.region_population || 'world'),
            this.createQuizRecordBlock('record-flag', result.flags, result.region_flags || 'world')
        );
        recordsWrap.append(quizesWrap);
        return recordsWrap;
    }

    private createQuizRecordBlock(quiz: string, result: number, region: string) {
        const quizWrap = createOurElement('div', 'records__quiz flex-columns');
        const quizName = createOurElement('p', 'records__quiz-name', '', quiz);
        const quizRes = createOurElement('div', 'records__quiz-results');
        google.charts.load('current', { packages: ['corechart'] });
        google.charts.setOnLoadCallback(drawChart);
        function drawChart() {
            const dataTable = new google.visualization.DataTable();
            let textRec: string;
            let textLeft: string;
            if (localStorage.getItem('nowLanguage') === 'ru') {
                const regionName = codesTranslate[region as keyof ICodes].ru;
                textRec = `${result}%, рекорд набран в регионе ${regionName}`;
                textLeft = `Осталось набрать ${100 - result}%`;
            } else {
                const regionName = codesTranslate[region as keyof ICodes].en;
                textRec = `${result}%, the record was set in the region ${regionName}`;
                textLeft = `Left to score ${100 - result}%`;
            }
            dataTable.addColumn('string', 'Квиз');
            dataTable.addColumn('number', 'Результат');
            dataTable.addColumn({ type: 'string', role: 'tooltip' });
            dataTable.addRows([
                [quiz, result, textRec],
                ['', 100 - result, textLeft],
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

    private createOneAchiv(min: number, max: number, value: number, imgClass: string) {
        const achievement = createOurElement('div', 'achievement flex-rows');
        const achievInfo = createOurElement('div', 'achievement__info');
        const img = createOurElement('div', `achievement__img ${imgClass} flex-columns`);
        if (value < max) {
            img.style.filter = 'grayscale(100%)';
        }
        let name;
        if (imgClass === 'img-fire') {
            name = createOurElement('p', 'achievement__name', '', 'achiev-all-quiz');
        } else {
            name = createOurElement('p', 'achievement__name', '', 'achiev-all-quiz-100');
        }
        const input = createOurElement('input', 'achievement__range');
        input.setAttribute('type', 'range');
        input.setAttribute('min', `${min}`);
        input.setAttribute('max', `${max}`);
        input.setAttribute('value', `${value}`);
        input.style.backgroundSize = ((value - min) * 100) / max + '% 100%';
        achievInfo.append(name, input);
        achievement.append(img, achievInfo);
        return achievement;
    }

    private createRecordAciv(imgClass: string) {
        const recordAchiev = createOurElement('div', 'record-achievment flex-columns');
        let name;
        if (imgClass === 'record-country') {
            name = createOurElement('p', 'record-achievment__name', '', 'achiev-record-country');
        } else if (imgClass === 'record-population') {
            name = createOurElement('p', 'record-achievment__name', '', 'achiev-record-population');
        } else {
            name = createOurElement('p', 'record-achievment__name', '', 'achiev-record-flags');
        }
        const img = createOurElement('div', `achievement__img ${imgClass} flex-columns`);
        recordAchiev.append(img, name);
        const userName = localStorage.getItem('username');
        if (Array.isArray(this.allResults) && userName) {
            const criterion = imgClass.split('-')[1] as keyof IResult;
            const res = this.allResults
                .sort((a, b) => (b[criterion] as number) - (a[criterion] as number))
                .slice(0, 10)
                .find((el) => el.user_name === JSON.parse(userName));
            if (!res) {
                img.style.filter = 'grayscale(100%)';
            }
        }
        return recordAchiev;
    }

    private createAchievementsBlock() {
        const achievementsWrap = createOurElement('div', 'achievements flex-columns');
        const title = createOurElement('h2', 'achivments__title', '', 'achievements-title');
        achievementsWrap.append(title);
        let allQuiz: HTMLElement;
        let allQuizFull: HTMLElement;
        if (typeof this.results !== 'string') {
            const valueAllQuiz = Object.entries(this.results).filter((el) => {
                return typeof el[1] === 'number' && el[1] > 0;
            });
            const winnerQuizCount = valueAllQuiz.filter((el) => el[1] === 100).length;
            allQuiz = this.createOneAchiv(0, 3, valueAllQuiz.length, 'img-fire');
            allQuizFull = this.createOneAchiv(0, 3, winnerQuizCount, 'img-winner');
            achievementsWrap.append(allQuiz, allQuizFull);
        }
        const recordAcievments = createOurElement('div', 'achievement flex-rows');
        recordAcievments.append(
            this.createRecordAciv('record-country'),
            this.createRecordAciv('record-population'),
            this.createRecordAciv('record-flags')
        );
        achievementsWrap.append(recordAcievments);
        return achievementsWrap;
    }

    async render() {
        const mainWrapper = createOurElement('div', 'main__wrapper wrapper flex-columns');
        const name = localStorage.getItem('username');
        if (name) {
            this.user = await Api.getUser(JSON.parse(name));
            this.results = await Api.getAllUserResults(JSON.parse(name));
            this.allResults = await Api.getAllResults();
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
