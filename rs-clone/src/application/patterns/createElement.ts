import { i18Obj } from './translation';
import Header from '../pages/components/header';

export function createOurElement(type: string, classText: string, text = '', i18 = '') {
    const elem = document.createElement(`${type}`) as HTMLLinkElement & { dataI18n: string };
    elem.className = classText;
    elem.dataI18n = i18;
    elem.innerHTML = text;
    if (i18 !== '') {
        elem.innerHTML = i18Obj[Header.nowLanguage as keyof typeof i18Obj][i18 as keyof typeof i18Obj.en];
    }

    return elem;
}
