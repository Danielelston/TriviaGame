


$(document).ready(function () {

    function pregame() {
        $(".game-startScreen").show();
        $(".game-mainScreen").hide();
        $(".game-endScreen").hide();
    }

    pregame();

    // TODO: make arrys into obj

    var questionsArry = ["Who says wubadubadubdub?", 'What is "Schmeckle"?', "what is the name of Jerrys favorite Rick?", "What job does Beth have?"];

    var answerArry = [["Morty", "Rick", "Mr.President", "Summer"], ["An alien informercial product", "Morty's favorite cerial", "A currency", "Only bird person knows"], ["Doofus", "Roofus", "Goofus", "Rick C-406"], ["Chef", "Horse Surgeon", "Novel Writer", "House wife"]];

    var correctAnswerArry = ["Rick", "A currency", "Doofus", "Horse Surgeon"];

    var countDown;

    $(".floatingHead").click(function startGame() {

        $(".game-startScreen").hide();
        $(".game-mainScreen").show();

        $("#game-floatingHead").attr("src", "assets/media/FloatingHead.gif");
        $("#resultVid").attr("src", "");


        var questionCounter = 0;
        var correctCounter = 0;
        var wrongCounter = 0;

        var $htmlAnswers = [$("#answer1"), $("#answer2"), $("#answer3"), $("#answer4")];

        function questionPopulation() {

            $("#game-question").html("<p>" + questionsArry[questionCounter] + "</p>");

            for (let i = 0; i < (questionCounter + 1); i++) {
                for (let q = 0; q < 4; q++) {
                    $htmlAnswers[q].text(answerArry[i][q]);
                };
            };
        };

        function nextQuestion() {

            if (questionCounter === questionsArry.length) {
                $(".game-startScreen").hide();
                $(".game-mainScreen").hide();
                $(".game-endScreen").show();

                $("#questionsCorrect").text("Correct answers: " + correctCounter);
                $("#questionsWrong").text("Wrong answers: " + wrongCounter);
            } else {
                questionPopulation();
                questionTimer();
            }
        }

        function questionTimer() {
            var timeLimit = 10;

            countDown = setInterval(function () {

                $("#timer").html("<b>Time left: " + timeLimit + "</b>");
                console.log("got to timer");
                if (timeLimit < 0) {
                    wrongCounter++
                    questionCounter++;
                    timeLimit = 5;
                    clearInterval(countDown);

                    $("#timer").html("<b> TIMES UP!</b>");

                    $("#correctAnswer").text("the correct answer is: " + correctAnswerArry[questionCounter - 1]);

                    $("#resultVid").show;
                    $("#game-floatingHead").attr("style", "display: none;");

                    var myVideo = $("#resultVid");
                    $("#resultVid").attr("style", "display: in-line;");
                    $("#resultVid").attr("src", "assets/media/Disqualified.mp4");

                    $("#resultVid")[0].play();

                    setTimeout(function () {
                        $("#resultVid").attr("src", "");
                        $("#resultVid").attr("style", "display: none;");

                        $("#game-floatingHead").attr("style", "display: in-line;");

                        $("#correctAnswer").text("");

                        nextQuestion();
                    }, 5000);
                } else {
                    timeLimit--
                }

            }, 1000);
        }

        function stopTimer() {
            clearInterval(countDown);
            $("#timer").html("");
        };

        questionTimer()

        questionPopulation();

        $(".gameAnswer").click(function validateChoice(event) {

            var userChoice = $(this).text();
            stopTimer();


            if (userChoice === correctAnswerArry[questionCounter]) {

                correctCounter++
                questionCounter++;

                $("#game-floatingHead").attr("style", "display: none;");

                $("#resultVid").attr("style", "display: in-line;");
                $("#resultVid").attr("src", "assets/media/iLike.mp4");

                $("#resultVid")[0].play();

                setTimeout(function () {
                    $("#resultVid").attr("src", "");
                    $("#resultVid").attr("style", "display: none;");

                    $("#game-floatingHead").attr("style", "display: in-line;")

                    nextQuestion();

                }, 6000)

            } else {

                wrongCounter++
                questionCounter++;

                $("#correctAnswer").text("the correct answer is: " + correctAnswerArry[questionCounter - 1])

                $("#resultVid").show;
                $("#game-floatingHead").attr("style", "display: none;");

                var myVideo = $("#resultVid");
                $("#resultVid").attr("style", "display: in-line;");
                $("#resultVid").attr("src", "assets/media/Disqualified.mp4");

                $("#resultVid")[0].play();

                setTimeout(function () {
                    $("#resultVid").attr("src", "");
                    $("#resultVid").attr("style", "display: none;");

                    $("#game-floatingHead").attr("style", "display: in-line;")

                    $("#correctAnswer").text("")

                    nextQuestion();
                }, 5000)
            }
        });

        $("#restart").click(function () {
            questionCounter = 0;
            correctCounter = 0;
            wrongCounter = 0;

            pregame();
            questionPopulation();
        })
    });
});
