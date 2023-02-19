export const codes = {
    world: 'world',
    africa: '002',
    europe: '150',
    america: '019',
    asia: '142',
    oceania: '009',
};

export const codesTranslate: ICodes = {
    world: { ru: 'Весь мир', en: 'All world' },
    '002': { ru: 'Африка', en: 'Africa' },
    '150': { ru: 'Европа', en: 'Europe' },
    '019': { ru: 'Америка', en: 'America' },
    '142': { ru: 'Азия', en: 'Asia' },
    '009': { ru: 'Океания', en: 'Oceania' },
};

export interface ICodes {
    world: { ru: string; en: string };
    '002': { ru: string; en: string };
    '150': { ru: string; en: string };
    '019': { ru: string; en: string };
    '142': { ru: string; en: string };
    '009': { ru: string; en: string };
}
