import { africa, america, asia, europe, oceania, world } from '../../../components/countries/data';
import { stateObj } from './types';

export function getState(regionCode: string) {
    const stateFromLocalStore = localStorage.getItem('stateObj');
    if (stateFromLocalStore) {
        const curRoundObj: stateObj = JSON.parse(stateFromLocalStore);
        return curRoundObj;
    } else {
        const firstRoundObj: stateObj = createStateObj(regionCode);
        localStorage.setItem('stateObj', JSON.stringify(firstRoundObj));
        return firstRoundObj;
    }
}

function createStateObj(regionCode: string) {
    const stateObj = {
        regionCode: regionCode,
        max: getDataArr(regionCode).length - 1,
        min: 0,
        usedCountries: [],
        round: 1,
        score: 0,
    };
    return stateObj;
}

export function getDataArr(regionCode: string): typeof world {
    switch (regionCode) {
        case '002': {
            return africa;
            break;
        }
        case '009': {
            return oceania;
            break;
        }
        case '019': {
            return america;
            break;
        }
        case '142': {
            return asia;
            break;
        }
        case '150': {
            return europe;
            break;
        }

        case 'world': {
            return world;
            break;
        }
        default: {
            return world;
        }
    }
}

function getRandomNumber(min: number, max: number): number {
    const rand = Math.abs(min + Math.random() * (max - min + 1));
    return Math.floor(rand);
}

export function getRandomCountry(arr: typeof world) {
    const stateFromLocalStore = localStorage.getItem('stateObj');
    if (!stateFromLocalStore) return;

    const localStorObj: stateObj = JSON.parse(stateFromLocalStore);
    const randomNumber = getRandomNumber(localStorObj.min, localStorObj.max);
    const possiblRandCountry = arr[randomNumber].countryCodeLetters;

    if (localStorObj.usedCountries.includes(possiblRandCountry)) {
        getRandomCountry(arr);
    }

    localStorObj.usedCountries.push(possiblRandCountry);
    localStorage.setItem('stateObj', JSON.stringify(localStorObj));

    return possiblRandCountry;
}

export function getAnswers(country: string, arr: typeof world) {
    const setAnswer = new Set<string>();

    arr.forEach((item) => {
        if (item.countryCodeLetters === country) {
            setAnswer.add(item.countryEn);
        }
    });

    while (setAnswer.size < 4) {
        const index = getRandomNumber(0, arr.length - 1);
        if (arr[index].countryCodeLetters === country) {
            continue;
        } else {
            setAnswer.add(arr[index].countryEn);
        }
    }

    return setAnswer;
}

export function shuffle(set: Set<string>) {
    const arr = Array.from(set);
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return new Set(arr);
}

export function checkAnswer(eTarget: EventTarget | null, rightAnswer: string, arr: typeof world) {
    if (!eTarget || !rightAnswer) return;

    const nextBtn = document.getElementById('nextBtn');
    nextBtn?.removeAttribute('disabled');

    const target = eTarget as HTMLElement;
    const rightAnswerName = arr.find((item) => item.countryCodeLetters === rightAnswer)?.countryEn;
    if (!rightAnswerName) return;
    if (target.id === rightAnswerName) {
        const anotherAnsw = document.querySelectorAll('.answer');
        anotherAnsw.forEach((item) => item.classList.add('btn__wrong'));
        target.classList.remove('btn__wrong');
        target.classList.add('btn__right');
        changeRoundAndScore(true);
    } else {
        const anotherAnsw = document.querySelectorAll('.answer');
        anotherAnsw.forEach((item) => item.classList.add('btn__wrong'));
        const trulyRightAnsw = document.getElementById(rightAnswerName);
        trulyRightAnsw?.classList.remove('btn__wrong');
        trulyRightAnsw?.classList.add('btn__right');
        changeRoundAndScore(false);
    }
}

function changeRoundAndScore(flag: boolean) {
    const stateFromLocalStore = localStorage.getItem('stateObj');
    if (!stateFromLocalStore) {
        return;
    }
    const localStorObj: stateObj = JSON.parse(stateFromLocalStore);
    if (flag === true) {
        localStorObj.round++;
        localStorObj.score++;
    } else {
        localStorObj.round++;
    }
    if (localStorObj.round === 15) {
        clearQuiz();
    }
    localStorage.setItem('stateObj', JSON.stringify(localStorObj));
}

function clearQuiz() {
    localStorage.removeItem('stateObj');
    alert("That's all!");
    window.location.href = '/results';
}
