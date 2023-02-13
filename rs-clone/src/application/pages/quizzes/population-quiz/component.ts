import { Icountry } from '../../../components/countries/data';
import { drawChart } from '../../../components/maps/geoChart';
import { createOurElement } from '../../../patterns/createElement';

export class PopulationQuestion {
    static ourChart: google.visualization.GeoChart;

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
        });

        setTimeout(() => {
            google.visualization.events.addListener(PopulationQuestion.ourChart, 'select', () => {
                const selectedItem = PopulationQuestion.ourChart.getSelection()[0];
                const answersBlock = Array.from(document.querySelectorAll('.btn__population'));
                if (selectedItem && answersBlock) {
                    for (const btn of answersBlock) {
                        if (btn.innerHTML === '') {
                            btn.innerHTML = `${countries[Number(selectedItem.row) + 1][1]}`;
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

    private createAnswerBlock() {
        const answersBlock = createOurElement('div', 'answers flex-rows', '');
        const answers = this.mapData.slice(0);
        console.log(answers);
        const answerBtns = answers?.map(() => {
            const answer = createOurElement('button', 'btn btn__population');
            answersBlock.append(answer);
            return answer;
        });

        const checkBtn = createOurElement('button', 'btn btn__bordered btn__check-population', 'Проверить');
        checkBtn.setAttribute('disabled', 'disabled');
        checkBtn.addEventListener('click', () => {
            answerBtns.forEach((btn, i) => {
                btn.innerText === answers[i].countryRu
                    ? btn.classList.add('btn__right')
                    : btn.classList.add('btn__wrong');
                const rightPopulation = (
                    Number(answers.find((el) => el.countryRu === btn.innerText)?.population) / 1000000
                ).toFixed(2);
                btn.innerText += ` ${rightPopulation} млн`;
            });
            checkBtn.setAttribute('disabled', 'disabled');
            document.querySelector('.btn__next')?.removeAttribute('disabled');
        });

        answersBlock.append(checkBtn);
        return answersBlock;
    }

    render() {
        const wrap = createOurElement('div', 'question flex-columns');
        wrap.append(this.createGeoChart(), this.createAnswerBlock());
        return wrap;
    }
}
