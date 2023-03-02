/* eslint-disable prettier/prettier */
export function translate() {
    const elements = document.querySelectorAll('[dataI18n]');

    elements.forEach((el) => {
        el.innerHTML =
            i18Obj[localStorage.getItem('nowLanguage') as keyof typeof i18Obj][
                el.getAttribute('dataI18n') as keyof typeof i18Obj.en
            ];
    });
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
        'choose quizz': 'Choose quiz',
        'country-quiz': 'Guess the country',
        'population-quiz': 'Guess the population',
        'flag-quiz': 'Guess the country by the flag',
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
        'quizz-next': '<a class = "link-modal-btn" href="quizzes">Next</a>',
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
        'name': 'Name',
        'result': 'Result',
        'region': 'Region',
        'world': 'All world',
        '002': 'Africa',
        '150': 'Europe',
        '019': 'America',
        '142': 'Asia',
        '009': 'Oceania',
        'null': 'null',
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
        'photo-limit': 'please select an image that is 500 kb or smaller',
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
        <p class="main__text_p1">Также вы сможете отслеживать свой прогресс изучения, зарегистрировавшись в личном кабинете.</p>
        <p class="main__text_p">Весь мир открыт для Вас!</p>
       `,
        'Регистрация': 'Регистрация',
        'Войти': 'Войти',
        'Log out': 'Выйти',
        'Главная': 'Главная',
        'Викторины': 'Викторины',
        'Достижения': 'Достижения',
        'choose quizz': 'Выберите викторину',
        'country-quiz': 'Угадай страну',
        'population-quiz': 'Угадай численность населения',
        'flag-quiz': 'Угадай страну по флагу',
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
        'quizz-next': '<a class = "link-modal-btn" href="quizzes">Дальше</a>',
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
        'name': 'Имя',
        'result': 'Результат',
        'region': 'Регион',
        'world': 'Весь мир',
        '002': 'Африка',
        '150': 'Европа',
        '019': 'Америка',
        '142': 'Азия',
        '009': 'Океания',
        'null': 'null',
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
        'achiev-record-flags': 'ТОП-10 в квизе угадай флаг',
        'photo-limit': 'пожалуйста, выберете изображение размером 500 кб или меньше',
    },
};

export const markersStrings = {
    'Австралия': 'Australia',
    'Австралия является мировым лидером по запасам урана.': 'Australia is a world leader in uranium reserves.',
    'Китай': 'China',
    'В Китае насчитывается сразу четыре мегаполиса с населением свыше 10 миллионов человек. Это больше, чем в любой другой стране мира.': 'There are four megacities with a population of over 10 million people in China at once. This is more than in any other country in the world.',
    'США': 'USA',
    'Ежегодно на США обрушивается порядка 800 разрушительных торнадо.': "About 800 destructive tornadoes hit the United States every year.",
    'Бразилия': 'Brazil',
    'В Бразилии расположено сразу два из 7 современных чудес света – статуя Христа, возвышающаяся над Рио-де-Жанейро, и река Амазонка.': "Two of the 7 modern wonders of the world are located in Brazil at once – the statue of Christ towering over Rio de Janeiro and the Amazon River.",
    'Гренландия': 'Greenland',
    'Лучшее место на земле для наблюдения за северным сиянием.': 'The best place on earth to observe the northern lights.',
    'Южная Африка': 'South Africa',
    'Самые древние останки ископаемого человека были обнаружены здесь.': 'The oldest human fossil remains have been discovered here.',
    'Мали': 'Mali',
    'Единственный в Мали университет был закрыт из-за недостатка студентов.': 'The only university in Mali was closed due to a lack of students.',
    'Украина': 'Ukraine',
    'Украина по собственной инициативе отказалась от третьего в мире по величине арсенала ядерного оружия.': "Ukraine, on its own initiative, abandoned the world's third largest arsenal of nuclear weapons.",
    'Швеция': 'Sweden',
    'Столица Швеции, Стокгольм, располагается на четырнадцати островах.': 'The capital of Sweden, Stockholm, is located on fourteen islands.',
    'Канада': 'Canada',
    'Граница между Соединенными Штатами и Канадой – самая длинная из существующих на планете.': "The border between the United States and Canada is the longest existing on the planet.",
    'Аргентина': 'Argentina',
    'В Аргентине живет множество потомков людей, сбежавших из России перед революцией и сразу после нее.': "There are many descendants of people living in Argentina who fled Russia before the revolution and immediately after it.",
    'Казахстан': 'Kazakhstan',
    'Средняя плотность населения в Казахстане ненамного выше, чем в Сибири — около 6 человек на квадратный километр.': "The average population density in Kazakhstan is not much higher than in Siberia — about 6 people per square kilometer.",
    'Россия': 'Russia',
    'Россия граничит с 16 странами.': 'Russia borders with 16 countries.',
    'Египет': 'Egypt',
    'Более 95% всей египетской территории — бесплодные пустыни.': 'More than 95% of the entire Egyptian territory is barren deserts.',
    'Франция': 'France',
    'Красное вино в этой стране более популярно, нежели белое.': 'Red wine is more popular in this country than white wine.',
}