export function createOurElement(type: string, classText: string, text = '') {
    const elem = document.createElement(`${type}`);
    elem.className = classText;
    elem.innerHTML = text;

    return elem;
}
