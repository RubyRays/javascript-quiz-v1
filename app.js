

    var userClickedAnswer = [];
    var backgroundColor = localStorage.getItem("backgroundColor");
    var correctAnswer = ["D"];
    let correctAnswerSize = 0;
    let wrongAnswerSize = 0;
    let RandomIds = [];
    // correctAnswer.push("D");
    //var q_id=0;
    let randomQuestionsList=[];
      

    function getRandomQuestionsList(size) {
    const list = [];
    const chosenQuestions = new Set();
    for (let i = 0; i < size; i++) {
        let randomQuestion;
        do {
        randomQuestion = Math.floor(Math.random() * (size)+ 1);//4 choices
        } while (chosenQuestions.has(randomQuestion));
        chosenQuestions.add(randomQuestion);
        list.push(randomQuestion);
    }
    return list;
    }
    $(document).ready(function(){
        randomQuestionsList = getRandomQuestionsList(4)
        console.log(randomQuestionsList);
    })


    
    if(backgroundColor){
        $("body").css("background-color", backgroundColor);
    }   

    $(".rbutton").click(function(event) {
        event.preventDefault();
        var userChosenAnswer = $(this).attr("id");
        userClickedAnswer.push(userChosenAnswer);
        console.log(userClickedAnswer);
    
    if (userChosenAnswer === correctAnswer[(correctAnswer.length-1)]) {
        $("#"+userChosenAnswer).css("background-color", "green");
        localStorage.setItem("backgroundColor", "green" );
        } 
    else{
        $("#"+userChosenAnswer).css("background-color", "red");
        localStorage.setItem("backgroundColor","red" );  
        }
    })
    $(".rbutton").click(function(){
        $(".rbutton").not(this).prop("disabled", true);
    })

    // function nextQuestion(){
    $(".next1").click(function(){ 
        localStorage.clear();
        $(".rbutton").css("background-color", "white");
        $(".rbutton").prop("disabled", false);


        newQuestion();
    })
    
// }


function newQuestion(){    
    if(randomQuestionsList.length == 0){
            
            $(".heading").html("Quiz Ended");
            $("#A").html("Correct answers: "+ correctAnswerSize);
            $("#B").html("Wrong answers: " + wrongAnswerSize );
            $("#C").html(correctAnswerSize +"/"+ (correctAnswerSize + wrongAnswerSize));
            $("#D").html(correctAnswerSize / (correctAnswerSize+wrongAnswerSize) *100 + "%");
            $(".next1").html("Refresh page to try again");
            $(".next1").prop("disabled", true);
            
     }else{
        var questionId = randomQuestionsList.pop();
            $.getJSON("questions.json", function(questions){
                let item = questions.find( x => x.id === questionId);
                $(".heading").html(item.title);
                $("#A").html(item.a);
                $("#B").html(item.b);
                $("#C").html(item.c);
                $("#D").html(item.d);
                correctAnswer.push(item.answer);
                $(".next1").prop("disabled", false); 

            })        
     }
checkAnswer();

}

function checkAnswer() {
  if (userClickedAnswer[userClickedAnswer.length - 1] === correctAnswer[(correctAnswer.length - 1)]) {
    correctAnswerSize++;
  }
  else {
    wrongAnswerSize++;
  }
}
