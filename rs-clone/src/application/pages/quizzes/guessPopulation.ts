import { createOurElement } from '../../patterns/createElement';
import PopulationQuizTemplate from '../../patterns/populationQuizPattern';

export class QuizPopulation {
    private createMapsData() {
        const data = [['Country'], ['Germany'], ['United States'], ['Brazil'], ['Canada'], ['France'], ['RU']];
        return data;
    }

    private createAnswerData() {
        const data = ['Germany', 'United States', 'Brazil', 'Canada'];
        return data;
    }

    private createLevelChoise() {
        const level = createOurElement('div', 'main__wrapper wrapper flex-columns');
        return level;
    }

    createPage() {
        // const previousRound = document.querySelector('.main__wrapper');
        // const quiz = previousRound
        //     ? new QuizTemplate(
        //           'population-quiz',
        //           'Quess population',
        //           this.createMapsData(),
        //           this.createAnswerData()
        //       ).render()
        //     : this.createLevelChoise();
        return new PopulationQuizTemplate('population-quiz', 'Quess population', this.createMapsData(), 2).render();
        // return this.createLevelChoise();
    }
}
