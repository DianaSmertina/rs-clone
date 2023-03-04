import { Icountry } from '../../../components/countries/data';
import { drawChart } from '../../../components/maps/geoChart';
import { createOurElement } from '../../../patterns/createElement';
import { playAudio, rightAnswAudio, wrongAnswAudio } from '../../../../application/components/sound/sound';

export class PopulationQuestion {
    static ourChart: google.visualization.GeoChart;
    static rightAnswer: number;
    static roundNum: number;

    constructor(private mapData: Array<Icountry>, private code: string) {}

    private createGeoChart() {
        const geoChartWrap = document.createElement('div');
        geoChartWrap.id = 'regions_div';
        const countries = this.mapData.map((el: Icountry) => [
            el.countryCodeLetters,
            localStorage.getItem('nowLanguage') === 'ru' ? el.countryRu : el.countryEn,
            el.area,
        ]);
        let title: Array<string>;
        if (localStorage.getItem('nowLanguage') === 'ru') {
            title = ['Country', 'Назание', 'Площадь'];
        } else {
            title = ['Country', 'Name', 'Area'];
        }
        countries.unshift(title);
        drawChart(geoChartWrap, countries, 'population', {
            region: this.code,
            colorAxis: { colors: ['blue', 'orange', 'green'] },
            legend: 'none',
            backgroundColor: '#6bcbd1',
        });

        setTimeout(() => {
            google.visualization.events.addListener(PopulationQuestion.ourChart, 'select', () => {
                const selectedItem = PopulationQuestion.ourChart.getSelection()[0];
                const answersBlock = Array.from(document.querySelectorAll('.btn__population'));
                if (selectedItem && answersBlock) {
                    for (const btn of answersBlock) {
                        const choosenCountry = countries[Number(selectedItem.row) + 1][1];
                        if (btn.innerHTML === '' && !answersBlock.find((el) => el.innerHTML === choosenCountry)) {
                            btn.innerHTML = `${choosenCountry}`;
                            if (answersBlock.every((el) => el.innerHTML !== '')) {
                                document.querySelector('.btn__check-population')?.removeAttribute('disabled');
                            }
                            break;
                        }
                    }
                }
            });
        }, 1000);
        return geoChartWrap;
    }

    private createCheckBtn(answerBtns: HTMLElement[], answers: Icountry[]) {
        const checkBtn = createOurElement('button', 'btn btn__bordered btn__check-population', '', 'Проверить');
        checkBtn.setAttribute('disabled', 'disabled');

        checkBtn.addEventListener('click', async () => {
            const rightAnsw = answerBtns.map((btn, i) => {
                let isRight = 0;
                if (btn.innerText === answers[i].countryRu || btn.innerText === answers[i].countryEn) {
                    btn.classList.add('btn__right');
                    PopulationQuestion.rightAnswer += 1;
                    isRight = 1;
                } else {
                    btn.classList.add('btn__wrong');
                }
                const rightPopulation = (
                    Number(
                        answers.find((el) => el.countryRu === btn.innerText || el.countryEn === btn.innerText)
                            ?.population
                    ) / 1000000
                ).toFixed(2);

                btn.innerText += ` ${rightPopulation} млн`;
                return isRight;
            });
            if (rightAnsw.every((el) => el === 0)) {
                playAudio(wrongAnswAudio);
            } else {
                playAudio(rightAnswAudio);
            }
            checkBtn.setAttribute('disabled', 'disabled');

            PopulationQuestion.roundNum += 1;
            const nextBtn = document.querySelector('.btn__next');

            if (PopulationQuestion.roundNum <= 11) {
                nextBtn?.removeAttribute('disabled');
                if (PopulationQuestion.roundNum === 11) {
                    if (nextBtn) {
                        nextBtn.textContent =
                            localStorage.getItem('nowLanguage') === 'ru' ? 'Посмотреть результат' : 'Check the result';
                    }
                }
            }
        });
        return checkBtn;
    }

    private createAnswerBlock() {
        const answersBlock = createOurElement('div', 'answers flex-rows', '');
        const answers = this.mapData.slice(0);

        const answerBtns = answers?.map(() => {
            const answer = createOurElement('button', 'btn btn__population');
            answer.addEventListener('click', () => {
                answer.innerText = '';
                const checkBtn = document.querySelector('.btn__check-population');

                if (!answerBtns.every((btn) => btn.innerText) && checkBtn) {
                    checkBtn.setAttribute('disabled', 'disabled');
                }
            });
            answersBlock.append(answer);
            return answer;
        });

        answersBlock.append(this.createCheckBtn(answerBtns, answers));
        return answersBlock;
    }

    render() {
        const round = document.querySelector('.quizz-round');
        if (round) {
            round.textContent = `${PopulationQuestion.roundNum}/10`;
        }
        const wrap = createOurElement('div', 'question flex-columns');
        wrap.append(this.createGeoChart(), this.createAnswerBlock());
        return wrap;
    }
}
