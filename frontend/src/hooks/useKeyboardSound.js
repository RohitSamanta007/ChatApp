
const keyStrokeSounds = [
    new Audio("/sounds/keystroke1.mp3"),
    new Audio("/sounds/keystroke2.mp3"),
    new Audio("/sounds/keystroke3.mp3"),
    new Audio("/sounds/keystroke4.mp3"),
]

function useKeyboardSound(){
    const playRandomKeyStrokeSound = () =>{
        const randoemSound = keyStrokeSounds[Math.floor(Math.random() * keyStrokeSounds.length)]

        randoemSound.currentTime = 0; 
        randoemSound.play().catch(error => console.log("Error in playing keyboard sound : ", error));
    };

    return {playRandomKeyStrokeSound};
}

export default useKeyboardSound