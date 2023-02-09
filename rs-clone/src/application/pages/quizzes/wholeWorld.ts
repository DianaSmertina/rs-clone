import Page from '../../patterns/pagePattern';

class WholeWorldQuiz extends Page {
    static TextObject = {
        MainTitle: 'Whole World Quiz',
    };

    constructor(id: string) {
        super(id);
    }

    render() {
        const title = this.createHeaderTitle(WholeWorldQuiz.TextObject.MainTitle);
        this.container.append(title);
        return this.container;
    }
}

export default WholeWorldQuiz;
