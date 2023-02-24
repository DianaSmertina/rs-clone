/* eslint-disable prettier/prettier */
export class Translation {
    static nowLanguage: string;

    constructor() {
        Translation.nowLanguage = 'ru';
    }

    static translate() {
        const elements = document.querySelectorAll('[dataI18n]');

        elements.forEach((el) => {
            el.innerHTML = i18Obj[Translation.nowLanguage as keyof typeof i18Obj][el.getAttribute('dataI18n') as keyof typeof i18Obj.en];
        })
    }
}

export const i18Obj = {
    'en': {
        'mainTitleText': 'fascinating quizzes for exploring the countries of the world',
        'main__text': `<p class="main__text_p">Our app includes three quizzes:</p>
        <ul class="main__text_list">
        <li>using the quiz <b>"Guess the country"</b> you will be able to quickly remember the location of countries,</li>
        <li>in the quiz <b>"Guess the population"</b> you will be able to practice in the definition
        population,</li>
        <li>thanks to the quiz <b>"Guess the country by the flag"</b> you will easily learn the flags of the countries of the world.</li>
        </ul>
        <p class="main__text_p1">You will also be able to track your progress by registering in your personal account.</p>
        <p class="main__text_p">The whole world is open to you!</p>
       `
    },
    'ru': {
        'mainTitleText': 'увлекательные викторины для изучения стран мира',
        'main__text': `<p class="main__text_p">Наше приложение включает в себя три викторины:</p>
        <ul class="main__text_list">
        <li>с помощью викторины <b>"Угадай страну"</b> вы сможете быстро запомнить расположение стран,</li>
        <li>в викторине <b>"Угадай численность населения"</b> вы сможете потренироваться в определении
        численности населения,</li>
        <li>благодаря викторине <b>"Угадай страну по флагу"</b> вы легко изучите флаги  стран мира.</li>
        </ul>
        <p class="main__text_p1">Также вы сможете отслеживать свой прогресс изучения зарегистрировавшись в личном кабинете.</p>
        <p class="main__text_p">Весь мир открыт для Вас!</p>
       `
    },
};
