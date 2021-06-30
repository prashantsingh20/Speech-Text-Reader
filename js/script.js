const main = document.querySelector('main');
const voicesSelect = document.getElementById('voices');
const textarea = document.getElementById('text');
const readBtn = document.getElementById('read');
const toggleBtn = document.getElementById('toggle');
const closeBtn = document.getElementById('close');

const data = [
  {
    image: './img/sale.png',
    text: "Sudhanshu selling patato, Raste ka maal saste me",
  },
  {
    image: './img/bike washing.png',
    text: "Every morning Sudhanshu washes the bike thoroughly whithout any reason",
  },
  {
    image: './img/celebrating b-day.png',
    text: "Birthday boy sudhanshu",
  },
  {
    image: './img/chamak chalo.png',
    text: "When Sudhanshu is in western dress, people definitely play a song....pagal banaibe kare patarki pagal banaibe ka ",
  },
  {
    image: './img/pro player.png',
    text: "pro player Sudhanshu",
  },
  {
    image: './img/photo shot.png',
    text: "Camera man Sudhanshu",
  },
  {
    image: './img/propose.png',
    text: "When sudhanshu goes to porpose someone on valentine's, his dress code is like this",
  },
  {
    image: './img/riding bike.png',
    text: "sudhanshu don’t need a therapy, I just need to ride my fat bike",
  },
  {
    image: './img/bday.png',
    text: "Sudhanshu goes like this on on his girlfrind's birthda",
  },
  {
    image: './img/six pack.png',
    text: 'Sudhanshu did not get any girl even making six pack',
  },
  {
    image: './img/riding car.png',
    text: 'After two shorts of whiskey, sudhanshu drives the car something like this',
  },
  {
    image: './img/itam.png',
    text: 'Naam jalebi bai or ye samastipur se Aaie',
  },
];

data.forEach(createBox);

function createBox(item) {
  const box = document.createElement('div');

  const { image, text } = item;

  box.classList.add('box');
  box.innerHTML = `
    <img src="${image}" alt="${text}" />
    <p class="info"> ${text} </p>
  `;

  box.addEventListener('click', () => {
    setTextMessage(text);
    speakText();

    box.classList.add('active');
    setTimeout(()=> box.classList.remove('active'), 800);
  });

  main.appendChild(box);
}

// Init speech synth
const message = new SpeechSynthesisUtterance();

// Store voices
let voices = [];

function getVoices() {
  voices = speechSynthesis.getVoices();

  voices.forEach(voice => {
    const option = document.createElement('option');

    option.value = voice.name;
    option.innerText = `${voice.name} ${voice.lang}`;

    voicesSelect.appendChild(option);
  })
}

// Set text
function setTextMessage(text) {
  message.text = text;
}

// Speak text
function speakText() {
  speechSynthesis.speak(message);
}

// Set Voice
function setVoice(e) {
  message.voice = voices.find(voice => voice.name === e.target.value);
}

// Voices changed
speechSynthesis.addEventListener('voiceschanged', getVoices);

// Toggle text box
toggleBtn.addEventListener('click', () => {
  document.getElementById('text-box').classList.toggle('show')
}
);

closeBtn.addEventListener('click', () =>
  document.getElementById('text-box').classList.toggle('show')
);

// Change voice
voicesSelect.addEventListener('change', setVoice);

// Read text button
readBtn.addEventListener('click', () => {
  setTextMessage(textarea.value);
  speakText();
});

getVoices();
