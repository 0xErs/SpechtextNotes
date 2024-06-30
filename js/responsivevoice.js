document.addEventListener("DOMContentLoaded", function () {
  const startBtn = document.getElementById("startBtn");
  const stopBtn = document.getElementById("stopBtn");
  const saveBtn = document.getElementById("saveBtn");
  const voiceNote = document.getElementById("voiceNote");
  const notesList = document.getElementById("notesList");
  let recognition;
  let recognizing = false;

  if (!("webkitSpeechRecognition" in window)) {
    alert("Your browser doesn't support speech recognition. Please try Google Chrome.");
  } else {
    recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = function () {
      recognizing = true;
    };

    recognition.onresult = function (event) {
      let interimTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          voiceNote.value += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
    };

    recognition.onerror = function (event) {
      console.error(event.error);
    };

    recognition.onend = function () {
      recognizing = false;
    };
  }

  startBtn.addEventListener("click", function () {
    if (recognizing) {
      recognition.stop();
      return;
    }
    recognition.start();
    voiceNote.value = "";
  });

  stopBtn.addEventListener("click", function () {
    if (recognizing) {
      recognition.stop();
    }
  });

  saveBtn.addEventListener("click", function () {
    const noteText = voiceNote.value.trim();
    if (noteText) {
      const noteItem = document.createElement("li");
      noteItem.className = "list-group-item";
      noteItem.textContent = noteText;
      notesList.appendChild(noteItem);
      voiceNote.value = "";
    }
    if (notesList.children[0].textContent === "You have no notes yet.") {
      notesList.removeChild(notesList.children[0]);
    }
  });
});
