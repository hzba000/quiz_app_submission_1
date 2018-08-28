//Holds data for the app in the form of an array of objects
const STORE = [
    { question: "Which place on this list was founded because of a      vicious spat between owners of another well known burger        spot?",
      answer: ["Killer burger", "Little Big burger", "Rock and Roll Chili Pit", "Wendy's"],
      correctAnswer: "Rock and Roll Chili Pit",
      deepExplanation: "There were three original founders of Killer Burger. They had an argument, and two of them left to found Rock and Roll Chili Pit."
    },
  
    { question: "Which place on this list has a really weird elephant mural on the left side as you walk in?",
      answer: ["Staccato Gelato", "Alotto Gelato", "Pinolo Gelato",
      "Ben & Jerrys"],
      correctAnswer: "Staccato Gelato",
      deepExplanation: "This is a great place for Gelato on the cheap."
    },
  
    { question: "This restaurant had a really chill owner that could show you how to really make a soda and do the blob...",
      answer: ["Spike's Hot Dogs", "Franks-a-Lot", "Otto's Deli", "Dogs and Fries"],
      correctAnswer: "Spike's Hot Dogs",
      deepExplanation: "If you were wondering what the 'blob' was...you use every condiment available! This place has a ton of them! Every bite of your hot dog will be a different experience. "
    },
  
    { question: "In the daytime, you can find amazing sandwiches, but at night only the finest steaks pass muster...",
      answer: ["Laurelhurst market", "Shut up and Eat", "Bunk Alberta", "Steak and Shake"],
      correctAnswer: "Laurelhurst market",
      deepExplanation: "During the day they make some awesome counter style sandwiches. At night, they turn into a full on formal attire steakhouse."
    },
  
    { question: "If you are looking for barbeque, this has its own      plot of land for growing vegetables...",
      answer: ["People's Pig", "Reverend's barbeque", "Podnah's barbeque", "Road Runner Barbecue"],
      correctAnswer: "People's Pig",
      deepExplanation: "The owners basically own a small city block. Their restaurant takes up less than a quarter of it, and the rest is for growing vegetables."
    },
  
    { question: "This Mexican place is known for its guisados,          homestyle stews and stir fries...",
      answer: ["Guero", "Mi mero mole", "Por que no", 
      "Tacqueria Hoz"],
      correctAnswer: "Mi mero mole",
      deepExplanation: "They have an open kitchen where you can see what everyone is making. It's a family run joint."
    },
  
    { question: "In the mood for pizza, you can get the good stuff      here, but don't even try at lunch on a weekday...",
      answer: ["Apizza Scholls", "Bellagio's pizza", "Baby Doll pizza", "Ken's Artisan pizza"],
      correctAnswer: "Apizza Scholls",
      deepExplanation: "They only open for lunch on Saturday and Sunday. It's also next to an arcade, so how can you go wrong?"
    },
  
    { question: "You can get liver on your sandwich and no one bats     an eye, its one of their most popular items!",
      answer: ["Kenny and Zukes", "Stacked", "Lardo", "Potbelly Sandwich Shop"],
      correctAnswer: "Kenny and Zukes",
      deepExplanation: "The pastrami and reuben sandwiches at this place are unreal. They even have a smaller location that specializes in bagels!"
  
    },
  
    { question: "One of these places isn't even a restaurant! Which one is it?",
      answer: ["Le Pigeon", "Beast", "Coava Coffee", "Pho Ni Restaurant"],
      correctAnswer: "Pho Ni Restaurant",deepExplanation: "Read it slowly."
    },
  
    { question: "If you ever wanted to go back to your good ole         school days, this food-place has a magic school bus to take you   there...",
      answer: ["Grilled Cheese Grill", "Pizza school", "Annie's Cafe", "Void"],
      correctAnswer: "Grilled Cheese Grill",
      deepExplanation: "You eat inside a school bus! There is an awesome mural along the roof of the bus that will really make you wonder what you've been missing in life."
    },
  ]
  
  //sets initial value for status bar
  let questionNumber = 0;
  let score = 0;
  
  //generates question from data set in STORE or calls 'ready for your results page' if done with questions
  function generateQuestion () {
    if (questionNumber < STORE.length) {
      return`<div class="stage">
      
        <div class="answer-choices">
          <form>
          <fieldset>
            <legend class="question">${STORE[questionNumber].question} </legend>
            <div class = "optionsContainer">
            <input type="radio" name="choices" required id="choice-a" value="${STORE[questionNumber].answer[0]}" >
            <label for="choice-a">${STORE[questionNumber].answer[0]}</label>
            <br>
            <input type="radio" name="choices" required id="choice-b" value="${STORE[questionNumber].answer[1]}">
            <label for="choice-b">${STORE[questionNumber].answer[1]}</label>
            <br>
            <input type="radio" name="choices" required id="choice-c" value="${STORE[questionNumber].answer[2]}">
            <label for="choice-c">${STORE[questionNumber].answer[2]}</label>
            <br>
            <input type="radio" name="choices" required id="choice-d" value="${STORE[questionNumber].answer[3]}">
            <label for="choice-d">${STORE[questionNumber].answer[3]}</label>
            </div>
            <br><br>
            <button type="submit" class="submit-button"> Submit Answer </button> 
         </fieldset>
         </br>
         </form>
      </div></div>`;
      }
  
    else {
        $('main').addClass('hidden');
        $('.questionNumber').text("Question: 10/10");
        finalResultReady();
        $('.result').addClass(`result-border`);
        $('.submit-button').remove();  
    } 
  }
  
  //renders question to DOM
  function renderQuestion() {
    $('main').html(`${generateQuestion()}`);
  }
  
  function renderFirstQuestion() {
    $('main').on('click', '.start-button', function (event) {
      $('.questionNumber').text("Question: 1/10");
      $('.score').text("Score: 0");
      renderQuestion();
    });
  }
  
  //checks user answer against correct answer and calls result
  function renderNextQuestion() {
    if(questionNumber < STORE.length){
    $('main').on('submit', function (event) {
      event.preventDefault();
  
      let answerChoice = $('input:checked').val();
  
      if (answerChoice === STORE[questionNumber].correctAnswer){
        console.log("You got it Right!");
        $("input[type=radio]").attr('disabled', true);
  
        updateScore();
        $(`.submit-button`).remove();
        gotRight();
        $(`<button type="button" class="continue-button"> Continue? </button>`).appendTo('body');
        $('.continue-button').on('click', function(event){
              $('.continue-button').remove();
              $('.right-explanation').remove();
              incrementQuestionNumber();
              renderQuestion();
        })
      }
  
      else{
        console.log("You got it wrong!");
        $("input[type=radio]").attr('disabled', true);
        $(`.submit-button`).remove();
        gotWrong();
        $(`<button type="button" class="continue-button"> Continue? </button>`).appendTo('body');
        $('.continue-button').on('click', function(event){
              $('.continue-button').remove();
              $('.wrong-explanation').remove();
              incrementQuestionNumber();
              renderQuestion();
        })
      }   
    })
  }
  }
  
  //displays the explanation when user gets an answer correct
  function gotRight(){
    $(`<div class="gotRightContainer"><strong><span class="right-explanation">Answer</span></strong><p class="right-explanation"><img src="images/thumbs-up.png" alt="thumbs-up" class="thumbs-up"><strong>Right!</strong> It is ${STORE[questionNumber].correctAnswer}.</p></div> `).appendTo('body');
  
    $(`<div class="rightExplanationContainer"><p class="right-explanation">${STORE[questionNumber].deepExplanation}</p></div> `).appendTo('body');
  }
  
  //displays the explanation when user gets an answer wrong
  function gotWrong(){
    $(`<strong><span class="wrong-explanation" class="answer-spacing">Answer</span></strong><p class="wrong-explanation"><img src="images/thumbs-down.png" alt="thumbs-down" class="thumbs-down"><strong>Wrong!</strong> It is ${STORE[questionNumber].correctAnswer}.</p> `).appendTo('body');
  
    $(`<div class="wrongExplanationContainer"><p class="wrong-explanation">${STORE[questionNumber].deepExplanation}</p></div> `).appendTo('body');
  }
  
  //sets up, 'are you ready to see your results page'
  function finalResultReady(){
    
    $('main').remove();
    
    $(`<p class="ready-result-question"> Are you ready for the results? </p>`).appendTo('body');
  
    $('<button type = "button" class="get-result-button"> <span>Get Results </span></button>').appendTo('body');
  
    $(".get-result-button").on('click', function(event){
  
    $('.ready-result-question, .get-result-button').remove();
    finalResult();
    })
  }
  
  //displays final result of quiz
  function finalResult(){
    if (score >= 8){
      $('body').append('<p class="result"> You might like to eat a little too much. Slow down before you turn into this guy! </p><p class="result-image"><img src="images/deadly-eating.gif" alt="deadly-eating-result-image" class="responsive"/></p>');
    }
  
    else if(score > 3 ){
      $('body').append('<p class="result"> You\'ve been around the block once or twice. There\s always time for a scone, go get some! </p><p class="result-image"><img src="images/chewchew.gif" alt="chewing-guy-image" class="responsive"/></p>');
    }
  
    else{
     $('body').append('<p class="result"> You don\'t look so good. Don\'t worry, it happens to everybody.</p><p class="result-image"><img src="images/vomit-computer.gif" alt="vomit-image" class="responsive"/></p>');
    }
  
    $('<p><button type = "button" class="restart-button"> Play again? </button></p>').appendTo('body');
  
    $(".restart-button").on('click', function(event){
      location.reload();
    })
  }
  
  function incrementQuestionNumber() {
    questionNumber++;
    $('.questionNumber').text("Question: " + (questionNumber+1+"/10"));
  }
  
  function updateScore(){
    score++;
    $('.score').text("Score: " + score);
  }
  
  function restartAnywhere(){
    $('body h1').on('click', function(event){
      location.reload();
    })
  }
  
  function handleFunctions(){
    renderFirstQuestion();
    renderNextQuestion();
    restartAnywhere();
  }
  
  $(handleFunctions);
  
  
  
  
  