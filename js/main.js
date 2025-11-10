let speech = new SpeechSynthesisUtterance();
let voices = [];

const voiceSelect = document.getElementById("voiceSelect");
const textInput = document.getElementById("text");
const speakBtn = document.getElementById("speakBtn");
const stopBtn = document.getElementById("stopBtn");

// Create new buttons for pause and resume dynamically (optional)
const pauseBtn = document.createElement("button");
pauseBtn.id = "pauseBtn";
pauseBtn.textContent = "⏸ Pause";
document.querySelector(".buttons").appendChild(pauseBtn);

const resumeBtn = document.createElement("button");
resumeBtn.id = "resumeBtn";
resumeBtn.textContent = "▶ Resume";
document.querySelector(".buttons").appendChild(resumeBtn);

const pitchControl = document.getElementById("pitch");
const rateControl = document.getElementById("rate");

window.speechSynthesis.onvoiceschanged = () => {
    voices = window.speechSynthesis.getVoices();
    voiceSelect.innerHTML = '';
    voices.forEach((voice, i) => {
        const option = new Option(`${voice.name} (${voice.lang})`, i);
        voiceSelect.add(option);
    });
    speech.voice = voices[0];
};

voiceSelect.addEventListener("change", () => {
    speech.voice = voices[voiceSelect.value];
});

pitchControl.addEventListener("input", () => {
    speech.pitch = pitchControl.value;
});

rateControl.addEventListener("input", () => {
    speech.rate = rateControl.value;
});

// Start speaking
speakBtn.addEventListener("click", () => {
    // If already speaking, prevent restarting
    if (window.speechSynthesis.speaking) return;
    speech.text = textInput.value.trim();
    if (speech.text !== "") {
        window.speechSynthesis.speak(speech);
    }
});

// Pause speaking
pauseBtn.addEventListener("click", () => {
    if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
        window.speechSynthesis.pause();
    }
});

// Resume speaking
resumeBtn.addEventListener("click", () => {
    if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
    }
});

// Stop speaking completely
stopBtn.addEventListener("click", () => {
    window.speechSynthesis.cancel();
});
