import { i18Obj } from './translation';
import { Translation } from './translation';

export function createOurElement(type: string, classText: string, text = '', i18 = '') {
    if (Translation.nowLanguage === undefined) new Translation();

    const elem = document.createElement(`${type}`) as HTMLLinkElement & { dataI18n: string };
    elem.className = classText;
    if (i18 !== '') {
        elem.setAttribute('dataI18n', i18);
    }
    elem.innerHTML = text;
    if (i18 !== '') {
        elem.innerHTML = i18Obj[Translation.nowLanguage as keyof typeof i18Obj][i18 as keyof typeof i18Obj.en];
    }

    return elem;
}
