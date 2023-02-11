import { Icountry } from '../../../components/countries/data';
import { drawChart } from '../../../components/maps/geoChart';
import { createOurElement } from '../../../patterns/createElement';

export class PopulationQuestion {
    constructor(private mapData: Array<Icountry>) {}

    private createGeoChart() {
        const geoChartWrap = document.createElement('div');
        geoChartWrap.id = 'regions_div';
        const countries = this.mapData.map((el) => [el.countryEn]);
        countries.unshift(['Country']);
        drawChart(geoChartWrap, countries);
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
                btn.innerHTML === answers[i].countryEn
                    ? btn.classList.add('btn__right')
                    : btn.classList.add('btn__wrong');
            });
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
