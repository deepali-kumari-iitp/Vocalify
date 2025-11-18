let speech = new SpeechSynthesisUtterance();
let voices = [];

const voiceSelect = document.getElementById("voiceSelect");
const textInput = document.getElementById("text");
const speakBtn = document.getElementById("speakBtn");
const stopBtn = document.getElementById("stopBtn");

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
    speech.lang = voices[0].lang;
};

// VOICE CHANGE
voiceSelect.addEventListener("change", () => {
    speech.voice = voices[voiceSelect.value];
    speech.lang = voices[voiceSelect.value].lang;  // ⭐ FIX: Change language properly
});

// Pitch
pitchControl.addEventListener("input", () => {
    speech.pitch = pitchControl.value;
});

// Speed
rateControl.addEventListener("input", () => {
    speech.rate = rateControl.value;
});

// Speak
speakBtn.addEventListener("click", () => {
    if (window.speechSynthesis.speaking) return;
    speech.text = textInput.value.trim();
    if (speech.text !== "") {
        window.speechSynthesis.speak(speech);
    }
});

// Pause
pauseBtn.addEventListener("click", () => {
    if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
        window.speechSynthesis.pause();
    }
});

// Resume
resumeBtn.addEventListener("click", () => {
    if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
    }
});

// Stop
stopBtn.addEventListener("click", () => {
    window.speechSynthesis.cancel();
});
