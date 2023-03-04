export const soundOn = new Audio('../assets/soundOn.mp3');
export const rightAnswAudio = new Audio('../assets/win.mp3');
export const wrongAnswAudio = new Audio('../assets/fail.mp3');

export function playAudio(sound: HTMLAudioElement) {
    const soundState = localStorage.getItem('quizSound');
    const soundBtn = document.querySelector('.sound');
    if (soundState === 'on') {
        soundBtn?.classList.remove('sound-off');
        soundBtn?.classList.add('sound-on');
        sound.volume = 0.4;
        sound.play();
    } else {
        soundBtn?.classList.remove('sound-on');
        soundBtn?.classList.add('sound-off');
        sound.pause();
    }
}
