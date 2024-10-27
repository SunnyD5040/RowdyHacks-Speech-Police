// Check if the browser supports SpeechRecognition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let vocalImperfections = 0;

function countWordsInString(text, words) {
  return words.reduce((count, word) => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi'); // Word boundary, case-insensitive
    const matches = text.match(regex); // Find all occurrences
    return count + (matches ? matches.length : 0); // Add match count or 0 if none found
  }, 0);
}

if (!SpeechRecognition) {
  console.error('Speech recognition is not supported in this browser. Try Chrome or Edge.');
} else {
  const recognition = new SpeechRecognition();
  recognition.lang = 'en-US'; // Set language
  recognition.interimResults = true; // Show words as they are spoken
  recognition.continuous = true; // Stop after each phrase

  const viList = [
    //'hmm', 'umm', 'aha', 'ahh', 'uh', 'um', 'er', 
    'you know', 'like', 'so', 'actually', 'basically', 
    'right', 'I mean', 'well', 'anyway', 'literally'
  ];

  //let counter = 0;
   // if (result[0] == 'like') {
   //   counter += 1;
   // }

  const recordButton = document.getElementById('recordButton');
  const transcriptionDisplay = document.getElementById('transcription');
  const counterDisplay = document.getElementById('counter');
  const likecounterDisplay = document.getElementById('likecounter');
  const youknowcounterDisplay = document.getElementById('youknowcounter');
  const socounterDisplay = document.getElementById('socounter');
  const rightcounterDisplay = document.getElementById('rightcounter');
  const wellcounterDisplay = document.getElementById('wellcounter');
  const imeancounterDisplay = document.getElementById('imeancounter');
  const anywaycounterDisplay = document.getElementById('anywaycounter');
  const actuallycounterDisplay = document.getElementById('actuallycounter');
  const basicallycounterDisplay = document.getElementById('basicallycounter');
  const literallycounterDisplay = document.getElementById('literallycounter');
  let isRecording = false;

  // Handle transcription result
  recognition.onresult = (event) => {
    const transcript = Array.from(event.results)
      .map(result => result[0].transcript)
      .join('');

    transcriptionDisplay.textContent = transcript; // Display transcription
    // Check for vocal imperfections
    let vocalImperfections = countWordsInString(transcript, viList);
    let likes = countWordsInString(transcript, [viList[1]]);
    let youKnows = countWordsInString(transcript, [viList[0]]);
    let sos = countWordsInString(transcript, [viList[2]]);
    let rights = countWordsInString(transcript, [viList[5]]);
    let wells = countWordsInString(transcript, [viList[7]]);
    let iMeans = countWordsInString(transcript, [viList[6]]);
    let anyways = countWordsInString(transcript, [viList[8]]);
    let actuallys = countWordsInString(transcript, [viList[3]]);
    let basicallys = countWordsInString(transcript, [viList[4]]);
    let literallys = countWordsInString(transcript, [viList[9]]);
    console.log(transcript);
    console.log(`Vocal Imperfections: ${vocalImperfections}`);
    counterDisplay.textContent = "Total Vocal Imperfections: " + vocalImperfections;
    likecounterDisplay.textContent = '"Like" Counter: ' + likes;
    youknowcounterDisplay.textContent = '"You Know" Counter: '+ youKnows;
    socounterDisplay.textContent = '"So" Counter: '+ sos;
    rightcounterDisplay.textContent = '"Right" Counter: '+ rights;
    wellcounterDisplay.textContent = '"Well" Counter: '+ wells;
    imeancounterDisplay.textContent = '"I Mean" Counter: '+ iMeans;
    anywaycounterDisplay.textContent = '"Anyway" Counter: '+ anyways;
    actuallycounterDisplay.textContent = '"Actually" Counter: '+ actuallys;
    basicallycounterDisplay.textContent = '"Basically" Counter: '+ basicallys;
    literallycounterDisplay.textContent = '"Literally" Counter: '+ literallys;
  };

  // Handle errors
  recognition.onerror = (event) => {
    console.error('Speech recognition error:', event.error);
    transcriptionDisplay.textContent = 'Error in transcription. Please try again.';
  };

  
  // Toggle recording on button click
  recordButton.addEventListener('click', () => {
    if (!isRecording) {
      recognition.start();
      isRecording = true;
      recordButton.textContent = 'Stop Transcription';
    } else {
      recognition.stop();
      isRecording = false;
      recordButton.textContent = 'Restart Transcription';
    }
  });
}
