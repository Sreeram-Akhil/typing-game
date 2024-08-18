document.addEventListener("DOMContentLoaded", () => {
    //Select the elements
    const textToTypeElement = document.getElementById("text-to-type");
    const typingInputElement = document.getElementById("typing-input");
    const speedElement = document.getElementById("speed");
    const accuracyElement = document.getElementById("accuracy");
  
    //Text to display
    const sampleTexts = ["you", "me", "when", "They","Jim and Jen are going to the zoo and the drive never seems to end" ,"EVER They just made a song for the road and the tune is growing on mom and dad","Lets tap our feet and sing along","After they got into the family cars back seat"," mom checked their seat belts and dad said,If everyone is ready let the journey begin","They were off and headed to the Big Zoo in the city","The Big Zoo in the city was a long way from home","It wasnt long before Jennie and Jimmy were bored","They were so excited and just wanted to see the animals" ,"even get some peanuts, popcorn, and soda. But it was taking so long"];
    //initial values
    let currentIndex = 0;
    let startTime = new Date();
    let errors = 0;
  
    //Function to initialize or restart the game
    function initializeGame() {
      const text = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
      textToTypeElement.textContent = text;
      typingInputElement.value = "";
      currentIndex = 0;
      startTime = new Date();
      errors = 0;
      //update fn
      updateFeedback();
    }
    //Function to update the speed and the accuracy feedback
    function updateFeedback() {
      const currentTime = new Date();
      const elapsedTime = (currentTime - startTime) / 60000;
      if (elapsedTime <= 0) {
        speedElement.textContent = 0;
      } else {
        const wordsTyped = typingInputElement.value.trim().split(/\s+/).length;
        const speed = Math.round(wordsTyped / elapsedTime);
        speedElement.textContent = speed;
      }
      //cal accurracy
      const accuracy =
        currentIndex > 0
          ? Math.round(((currentIndex - errors) / currentIndex) * 100)
          : 100;
      accuracyElement.textContent = accuracy;
    }
  
    //Function to check typed character
    function checkCharacter(inputChar, targetChar) {
      if (inputChar !== targetChar) {
        errors++;
        //play error sound
        new Audio("/error.mp3").play();
        return false;
      } else {
        return true;
      }
    }
    //Function to display messages to the user
    function displayMessage(message) {
      const messageArea = document.getElementById("message-area");
      messageArea.textContent = message;
      //clear the msg after 3s
      setTimeout(() => {
        messageArea.textContent = "";
      }, 3000);
    }
    //Event listener for typing input
    typingInputElement.addEventListener("input", (e) => {
      const typedText = typingInputElement.value;
      const targetText = textToTypeElement.textContent;
      if (currentIndex < targetText.length) {
        const isCorrect = checkCharacter(
          typedText[currentIndex],
          targetText[currentIndex]
        );
  
        textToTypeElement.innerHTML =
          targetText.substring(0, currentIndex) +
          `<span class='${isCorrect ? "correct" : "incorrect"}'>${
            targetText[currentIndex]
          }</span>` +
          targetText.substring(currentIndex + 1);
        currentIndex++;
        if (currentIndex === targetText.length) {
          displayMessage("Text completed starting a new one.");
          initializeGame();
        }
      }
      //update the feedback
      updateFeedback();
    });
    //Start the game
    initializeGame();
  });