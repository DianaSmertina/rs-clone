export const soundOn = new Audio('../assets/soundOn.mp3');
export const rightAnswAudio = new Audio('../assets/win.mp3');
export const wrongAnswAudio = new Audio('../assets/fail.mp3');

export function playAudio(sound: HTMLAudioElement) {
    const soundBtn = document.querySelector('.sound');
    if (soundBtn?.classList.contains('sound-off')) {
        sound.pause();
    } else {
        sound.volume = 0.4;
        sound.play();
    }
}
