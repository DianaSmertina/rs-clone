import { Icountry } from '../../../components/countries/data';
import { drawChart } from '../../../components/maps/geoChart';
import { createOurElement } from '../../../patterns/createElement';

export class PopulationQuestion {
    static ourChart: google.visualization.GeoChart;
    static rightAnswer: number;

    constructor(private mapData: Array<Icountry>) {}

    private createGeoChart() {
        const geoChartWrap = document.createElement('div');
        geoChartWrap.id = 'regions_div';
        const countries = this.mapData.map((el) => [el.countryCodeLetters, el.countryRu, el.area]);
        countries.unshift(['Country', 'Назание', 'Площадь']);
        drawChart(geoChartWrap, countries, 'population', {
            region: '142',
            colorAxis: { colors: ['blue', 'orange', 'green'] },
            legend: 'none',
            backgroundColor: '#81d4fa',
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
        const checkBtn = createOurElement('button', 'btn btn__bordered btn__check-population', 'Проверить');
        checkBtn.setAttribute('disabled', 'disabled');

        checkBtn.addEventListener('click', () => {
            answerBtns.forEach((btn, i) => {
                if (btn.innerText === answers[i].countryRu) {
                    btn.classList.add('btn__right');
                    PopulationQuestion.rightAnswer += 1;
                } else {
                    btn.classList.add('btn__wrong');
                }
                const rightPopulation = (
                    Number(answers.find((el) => el.countryRu === btn.innerText)?.population) / 1000000
                ).toFixed(2);

                btn.innerText += ` ${rightPopulation} млн`;
            });
            checkBtn.setAttribute('disabled', 'disabled');
            document.querySelector('.btn__next')?.removeAttribute('disabled');
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
        const wrap = createOurElement('div', 'question flex-columns');
        wrap.append(this.createGeoChart(), this.createAnswerBlock());
        return wrap;
    }
}
