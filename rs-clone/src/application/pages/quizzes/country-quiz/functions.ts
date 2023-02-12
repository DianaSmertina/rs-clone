import { africa, america, asia, europe, oceania, world } from '../../../components/countries/data';
import { dataObj } from './types';

export function getDataArr(region: string): dataObj[] {
    const arrCopy: Array<dataObj> = [];

    switch (region) {
        case 'World':
            world.forEach((item) => {
                arrCopy.push(JSON.parse(JSON.stringify(item)));
            });
            return arrCopy;
            break;
        case 'Africa': {
            africa.forEach((item) => {
                arrCopy.push(JSON.parse(JSON.stringify(item)));
            });
            return arrCopy;
            break;
        }
        case 'Oceania': {
            oceania.forEach((item) => {
                arrCopy.push(JSON.parse(JSON.stringify(item)));
            });
            return arrCopy;
            break;
        }
        case 'America': {
            america.forEach((item) => {
                arrCopy.push(JSON.parse(JSON.stringify(item)));
            });
            return arrCopy;
            break;
        }
        case 'Asia': {
            asia.forEach((item) => {
                arrCopy.push(JSON.parse(JSON.stringify(item)));
            });
            return arrCopy;
            break;
        }
        case 'Europe': {
            europe.forEach((item) => {
                arrCopy.push(JSON.parse(JSON.stringify(item)));
            });
            return arrCopy;
            break;
        }
        default: {
            return arrCopy;
        }
    }
}

export function getInitialState(arr: dataObj[]) {
    const code = arr[0].regionCode;
    const minValue = 0;
    const maxValue = arr.length - 1;
    return {
        region: code,
        min: minValue,
        max: maxValue,
    };
}

export function getRandomNumber(min: number, max: number): number {
    const rand = Math.abs(min + Math.random() * (max - min + 1));
    return Math.floor(rand);
}

export function getRandomCountry(arr: dataObj[] | undefined, randomNumber: number) {
    if (!arr) return;
    const randomCountry = arr[randomNumber].countryEn;
    return randomCountry;
}

export function getAnswers(country: string | undefined, arrCopy: dataObj[]) {
    const arrAnswer: string[] = [];
    if (!country) {
        return arrAnswer;
    }
    arrAnswer.push(country);
    for (let i = 0; i < 3; i++) {
        const ind = getRandomNumber(0, arrCopy.length - 1);
        const countryAnsw = arrCopy[ind];
        arrAnswer.push(countryAnsw.countryEn);
    }
    console.log(country);
    return arrAnswer;
}

export function shuffle(arr: string[]) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    console.log(arr);
    return arr;
}

export function deleteUsedCountry(country: string | undefined, arr: dataObj[]) {
    const countryObj = arr.filter((item) => item.countryEn === country);
    const countryObjInd = arr.indexOf(countryObj[0]);
    arr.splice(countryObjInd, 1);
}

export function checkAnswer(eTarget: EventTarget | null, rightAnswer: string | undefined) {
    if (!eTarget || !rightAnswer) return;
    const nextBtn = document.getElementById('nextBtn');
    nextBtn?.removeAttribute('disabled');
    const target = eTarget as HTMLElement;
    if (target.id === rightAnswer) {
        const anotherAnsw = document.querySelectorAll('.answer');
        anotherAnsw.forEach((item) => item.classList.add('wrongAnswer'));
        target.classList.remove('wrongAnswer');
        target.classList.add('rightAnswer');
    } else {
        const anotherAnsw = document.querySelectorAll('.answer');
        anotherAnsw.forEach((item) => item.classList.add('wrongAnswer'));
        const trulyRightAnsw = document.getElementById(rightAnswer);
        trulyRightAnsw?.classList.remove('wrongAnswer');
        trulyRightAnsw?.classList.add('rightAnswer');
    }
}
