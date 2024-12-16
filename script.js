const powerButton = document.getElementById("power-button");
const drumPads = document.querySelectorAll(".drum-pad");
const audio = document.querySelectorAll("audio");
const display = document.getElementById("display");
const volumeSlider = document.getElementById("volume-slider");
let powerOn = true;

powerButton.addEventListener("click", togglePower);

volumeSlider.addEventListener("input", () => {
  setVolume(volumeSlider.value);
});

for (let i = 0; i < drumPads.length; i++) {
  drumPads[i].addEventListener("click", () => {
    if (powerOn) {
      playAudio(i);
    }
  });
}

document.addEventListener("keydown", (event) => {
  const key = event.key.toUpperCase();
  const index = [...drumPads].findIndex((drumPad) => drumPad.id === key);
  if(powerOn && index !== -1){
    playAudio(index);
  }
});

function playAudio(index){
  audio[index].currentTime = 0; // Reset audio to beginning
  audio[index].volume = volumeSlider.value; // Set audio volume
  audio[index].play();
  display.textContent = audio[index].src.split("/").pop().replace(".mp3", "").replace("-", " "); // Display part within URL that defines the audio
}

function setVolume(volume){
  audio.forEach((audio) => {
    audio.volume = volume;
  });
}

function togglePower() {
  powerOn = !powerOn;
  const slider = powerButton.querySelector(".slider");
  slider.classList.toggle("power-off", !powerOn);
}