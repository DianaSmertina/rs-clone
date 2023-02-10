import QuizTemplate from '../../patterns/quizTemplate';

export class QuizPopulation {
    private createMapsData() {
        const data = [
            ['Country', 'Popularity'],
            ['Germany', 200],
            ['United States', 300],
            ['Brazil', 400],
            ['Canada', 500],
            ['France', 600],
            ['RU', 700],
        ];
        return data;
    }

    private createAnswerData() {
        const data = ['Germany', 'United States', 'Brazil', 'Canada'];
        return data;
    }

    createPage() {
        const quiz = new QuizTemplate(
            'population-quiz',
            'Quess population',
            this.createMapsData(),
            this.createAnswerData()
        );
        return quiz.render();
    }
}
