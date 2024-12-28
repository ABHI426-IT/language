document.getElementById('translateButton').addEventListener('click', function() {
    const inputText = document.getElementById('inputText').value.trim();
    const fromLanguage = document.getElementById('fromLanguage').value;
    const toLanguage = document.getElementById('toLanguage').value;
  
    if (!inputText) {
      document.getElementById('outputText').innerText = "Please enter text to translate.";
      return;
    }
  
    const translateButton = document.getElementById('translateButton');
    translateButton.innerHTML = 'Translating<span class="dot">.</span><span class="dot">.</span><span class="dot">.</span>'; // Change button text to include dots
  
    const apiKey = 'b604a13bdacdc6bbf259';
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(inputText)}&langpair=${fromLanguage}|${toLanguage}&key=${apiKey}`;
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.responseStatus === 200) {
          document.getElementById('outputText').innerText = data.responseData.translatedText || "Translation failed.";
        } else {
          document.getElementById('outputText').innerText = "Translation failed. Please try again.";
        }
      })
      .catch(error => {
        console.error('Error:', error);
        document.getElementById('outputText').innerText = "Translation failed. Please try again.";
      })
      .finally(() => {
        translateButton.innerHTML = 'Translate';
      });
  });
  
  const voiceInputButton = document.getElementById('voiceInputButton');
  const inputTextArea = document.getElementById('inputText');
  
  if ('webkitSpeechRecognition' in window) {
     const recognition = new webkitSpeechRecognition();
     recognition.continuous = false; 
     recognition.interimResults = false; 
     recognition.onstart = function() {
       console.log("Voice recognition started. Speak now.");
       voiceInputButton.classList.add('pulse-animation'); 
     };
  
     recognition.onresult = function(event) {
       const transcript = event.results[0][0].transcript;
       inputTextArea.value = transcript; 
       console.log("Recognized text:", transcript);
     };
  
     recognition.onerror = function(event) {
       console.error("Error occurred in recognition:", event.error);
     };
  
     recognition.onend = function() {
       console.log("Voice recognition ended.");
       voiceInputButton.classList.remove('pulse-animation'); 
     };
  
     voiceInputButton.addEventListener('click', function() {
       recognition.start(); 
     });
  } else {
     alert("Your browser does not support speech recognition.");
  }
  
  
  const readAloudButton = document.getElementById('readAloudButton');
  
  readAloudButton.addEventListener('click', function() {
     const translatedText = document.getElementById('outputText').innerText;
  
     if (!translatedText) {
       alert("Please translate some text first.");
       return;
     }
  
     const utterance = new SpeechSynthesisUtterance(translatedText);
  
     utterance.lang = document.getElementById('toLanguage').value;
  
  
     window.speechSynthesis.speak(utterance);
  
     utterance.onend = function() { 
       console.log("Finished reading aloud.");
     };
  });