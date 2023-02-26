/* eslint-disable prettier/prettier */
export function translate() {
    const elements = document.querySelectorAll('[dataI18n]');

    elements.forEach((el) => {
        el.innerHTML = i18Obj[localStorage.getItem('nowLanguage') as keyof typeof i18Obj][el.getAttribute('dataI18n') as keyof typeof i18Obj.en];
    })
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
       `,
       'Регистрация': 'Sign in',
       'Войти': 'Log in',
       'Log out': 'Log out',
       'Главная': 'Main',
       'Викторины': 'Quizzes',
       'Достижения': 'Achievements',
       'choose quizz': 'Choose quizz',
       'quizzes variants': `<a href="country-quiz">
       <div class="menu__item flex-columns">
           <h3>Guess the country</h3>
           <div class="menu__quiz-cover country-cover img">
           </div>
       </div>
   </a>
   <a href="population-quiz">
       <div class="menu__item flex-columns">
           <h3>Guess the population</h3>
           <div class="menu__quiz-cover population-cover img"></div>
       </div>
   </a>
   <a href="quizz-flag">
   <div class="menu__item flex-columns">
       <h3>Guess the country by the flag</h3>
       <div class="menu__quiz-cover flag-cover img"></div>
   </div>
   </a>`,
   'registerGreetings': 'We are glad to welcome a new connoisseur of countries!',
   'registerText': 'Come up with a username and password, the length of which should be 6 or more characters',
   'signInGreetings': 'Glad to see you again!',
   'signInText': 'Please enter your username and password from your account',
   'Пароль': 'Password',
   'Логин': 'Login',
   'Дальше': 'Next',
   'Выберите регион': 'Choose region',
   'regionInputs': `<div><input type="radio" name="place" id="choice1" checked="checked" value="world"> 
   <label for="choice1">All world</label></div>
   <div><input type="radio" name="place" id="choice2" value="africa">
   <label for="choice2">Africa</label></div>
   <div><input type="radio" name="place" id="choice3" value="asia">
   <label for="choice3">Asia</label></div>
   <div><input type="radio" name="place" id="choice4" value="america">
   <label for="choice4">America</label></div>
   <div><input type="radio" name="place" id="choice5" value="europe">
   <label for="choice5">Europe</label></div>`,
   'Результат': 'Result',
   'quizz-next': '<a href="quizzes">Next</a>',
   'form-wrap__is-record': 'New Record!',
   'form-wrap__is-record-register': 'Please register to save the results',
   'main__title_quiz-flag': 'Guess the country by the flag',
   'Правильно!': 'Right!',
   'Неправильно!': 'Wrong!',
   'Проверить': 'Check',
   'main__title_quiz-population': 'Guess the population',
   'main__rules': `In this quiz, you need to arrange the countries highlighted on the map in ascending order of population.
   Hover to find out information about the country and click to add to the field for answers.
   Until you click "Check", you can change the final order by clicking on the answers.`,
   'main__title-quizz-country': 'Guess the country',
   'update-photo': 'Update photo',
   'registration-date': 'Registration date: ',
   'my-records': 'My records',
   'record-country': 'Guess the country',
   'record-population': 'Guess the population',
   'record-flag': 'Guess the country by the flag',
   'achievements-title': 'My achievements',
   'achiev-all-quiz': 'All quizzes are passed',
   'achiev-all-quiz-100': 'All quizzes are 100% passed',
   'achiev-record-country': 'TOP-10 in the quiz guess the country',
   'achiev-record-population': 'TOP 10 in the quiz guess the population',
   'achiev-record-flags': 'TOP 10 in the quiz guess the country by the flag',
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
       `,
       'Регистрация': 'Регистрация',
       'Войти': 'Войти',
       'Log out': 'Выйти',
       'Главная': 'Главная',
       'Викторины': 'Викторины',
       'Достижения': 'Достижения',
       'choose quizz': 'Выберите викторину',
       'quizzes variants': `<a href="country-quiz">
       <div class="menu__item flex-columns">
           <h3>Угадай страну</h3>
           <div class="menu__quiz-cover country-cover img">
           </div>
       </div>
   </a>
   <a href="population-quiz">
       <div class="menu__item flex-columns">
           <h3>Угадай численность населения</h3>
           <div class="menu__quiz-cover population-cover img"></div>
       </div>
   </a>
   <a href="quizz-flag">
   <div class="menu__item flex-columns">
       <h3>Угадай страну по флагу</h3>
       <div class="menu__quiz-cover flag-cover img"></div>
   </div>
   </a>`,
   'registerGreetings': 'Рады приветсвовать нового знатока стран!',
   'registerText': 'Придумай логин и пароль, длина которого должна быть 6 или больше символов',
   'signInGreetings': 'Рады видеть тебя снова!',
   'signInText': 'Пожалуйста, введи логин и пароль от своей учетной записи',
   'Пароль': 'Пароль',
   'Логин': 'Логин',
   'Дальше': 'Дальше',
   'Выберите регион': 'Выберите регион',
   'regionInputs': `<div><input type="radio" name="place" id="choice1" checked="checked" value="world"> 
   <label for="choice1">Весь мир</label></div>
   <div><input type="radio" name="place" id="choice2" value="africa">
   <label for="choice2">Африка</label></div>
   <div><input type="radio" name="place" id="choice3" value="asia">
   <label for="choice3">Азия</label></div>
   <div><input type="radio" name="place" id="choice4" value="america">
   <label for="choice4">Америка</label></div>
   <div><input type="radio" name="place" id="choice5" value="europe">
   <label for="choice5">Европа</label></div>`,
   'Результат': 'Результат',
   'quizz-next': '<a href="quizzes">Дальше</a>',
   'form-wrap__is-record': 'Новый рекорд!',
   'form-wrap__is-record-register': 'Пожалуйста, зарегистрируйся, чтобы сохранять результаты',
   'main__title_quiz-flag': 'Угадай страну по флагу',
   'Правильно!': 'Правильно!',
   'Неправильно!': 'Неправильно!',
   'Проверить': 'Проверить',
   'main__title_quiz-population': 'Угадай численность населения',
   'main__rules': `В этом квизе тебе нужно расположить выделенные на карте страны в порядке возрастания численности населения.
   Наведи чтобы узнать информацию о стране и кликни, чтобы добавить в поле для ответов.
   Пока ты не нажал "Проверить", можешь изменить окончательный порядок, кликнув на ответы.`,
   'main__title-quizz-country': 'Угадай страну',
   'update-photo': 'Обновить фото',
   'registration-date': 'Дата регистрации: ',
   'my-records': 'Мои рекорды',
   'record-country': 'Угадай страну',
   'record-population': 'Угадай численность населения',
   'record-flag': 'Угадай страну по флагу',
   'achievements-title': 'Мои достижения',
   'achiev-all-quiz': 'Все квизы пройдены',
   'achiev-all-quiz-100': 'Все квизы пройдены на 100%',
   'achiev-record-country': 'ТОП-10 в квизе угадай страну',
   'achiev-record-population': 'ТОП-10 в квизе угадай население',
   'achiev-record-flags': 'ТОП-10 в квизе угадай флаг'
    },
};
