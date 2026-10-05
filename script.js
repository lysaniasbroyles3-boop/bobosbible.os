```javascript
/* =====================================
   BOBOS PAGE SYSTEM
===================================== */

function openPage(pageName) {

    // Get every page
    const pages = document.querySelectorAll(".page");

    // Hide every page
    pages.forEach(function(page) {
        page.classList.remove("active");
    });

    // Find requested page
    const selectedPage =
        document.getElementById(pageName);

    // Open requested page
    if (selectedPage) {

        selectedPage.classList.add("active");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    // Update progress
    updateProgress();
}


/* =====================================
   BIBLE STUDY
===================================== */

const questions = [

    {
        question:
            "What does Proverbs 3:5 tell us to do?",

        answers: [
            "Trust in the Lord",
            "Trust only ourselves",
            "Ignore God",
            "Never make decisions"
        ],

        correct: 0
    },


    {
        question:
            "What should we NOT lean on completely?",

        answers: [
            "God's Word",
            "Our own understanding",
            "Prayer",
            "Wisdom"
        ],

        correct: 1
    },


    {
        question:
            "What does God promise to do?",

        answers: [
            "Make our paths straight",
            "Make us famous",
            "Give us everything we want",
            "Remove every problem"
        ],

        correct: 0
    }

];


let currentQuestion = 0;

let score = 0;


/* START STUDY */

function startStudy() {

    currentQuestion = 0;

    score = 0;

    document
        .querySelector(".page#bible .study-card")
        .classList.remove("hidden");

    document
        .getElementById("questions")
        .classList.remove("hidden");

    document
        .getElementById("studyComplete")
        .classList.add("hidden");

    loadQuestion();
}


/* LOAD QUESTION */

function loadQuestion() {

    const question =
        questions[currentQuestion];

    document.getElementById("questionText")
        .textContent = question.question;


    const answers =
        document.getElementById("answers");

    answers.innerHTML = "";


    question.answers.forEach(
        function(answer, index) {

            const button =
                document.createElement("button");

            button.className = "answer";

            button.textContent = answer;

            button.onclick = function() {

                checkAnswer(
                    index,
                    button
                );

            };

            answers.appendChild(button);
        }
    );


    document
        .getElementById("feedback")
        .textContent = "";


    document
        .getElementById("nextQuestion")
        .classList.add("hidden");
}


/* CHECK ANSWER */

function checkAnswer(index, button) {

    const question =
        questions[currentQuestion];

    const buttons =
        document.querySelectorAll(".answer");


    // Prevent multiple answers
    buttons.forEach(function(btn) {
        btn.disabled = true;
    });


    if (index === question.correct) {

        button.classList.add("correct");

        document
            .getElementById("feedback")
            .textContent =
            "✓ Correct!";

        document
            .getElementById("feedback")
            .style.color =
            "#22c55e";

        score++;

    } else {

        button.classList.add("wrong");

        buttons[question.correct]
            .classList.add("correct");

        document
            .getElementById("feedback")
            .textContent =
            "Not quite! The correct answer is highlighted.";

        document
            .getElementById("feedback")
            .style.color =
            "#ef4444";
    }


    document
        .getElementById("nextQuestion")
        .classList.remove("hidden");
}


/* NEXT QUESTION */

function nextQuestion() {

    currentQuestion++;


    if (
        currentQuestion <
        questions.length
    ) {

        loadQuestion();

    } else {

        finishStudy();
    }
}


/* FINISH STUDY */

function finishStudy() {

    const earnedXP =
        25 + (score * 10);


    let xp =
        Number(
            localStorage.getItem("bobosXP")
        ) || 0;


    let studies =
        Number(
            localStorage.getItem("bobosStudies")
        ) || 0;


    xp += earnedXP;

    studies++;


    localStorage.setItem(
        "bobosXP",
        xp
    );

    localStorage.setItem(
        "bobosStudies",
        studies
    );


    document
        .getElementById("questions")
        .classList.add("hidden");


    document
        .getElementById("studyComplete")
        .classList.remove("hidden");


    document
        .getElementById("studyScore")
        .textContent =
        "Score: " +
        score +
        "/" +
        questions.length;


    updateProgress();
}


/* =====================================
   PROGRESS SYSTEM
===================================== */

function updateProgress() {

    const xp =
        Number(
            localStorage.getItem("bobosXP")
        ) || 0;


    const studies =
        Number(
            localStorage.getItem("bobosStudies")
        ) || 0;


    const level =
        Math.floor(xp / 100) + 1;


    const levelXP =
        xp % 100;


    document.getElementById("xp")
        .textContent = xp;


    document.getElementById("studies")
        .textContent = studies;


    document.getElementById("level")
        .textContent = level;


    document.getElementById("progressFill")
        .style.width =
        levelXP + "%";


    document.getElementById("progressText")
        .textContent =
        levelXP +
        " / 100 XP to Level " +
        (level + 1);
}


/* =====================================
   BOBOS AI DEMO
===================================== */

function askAI() {

    const input =
        document.getElementById("aiInput");

    const response =
        document.getElementById("aiResponse");


    const question =
        input.value.trim();


    if (question === "") {

        response.textContent =
            "Please type a question first.";

        return;
    }


    response.textContent =
        "BOBOS AI received your question: \"" +
        question +
        "\". The AI connection can be added here later.";
}


/* =====================================
   SHOP / OTHER MESSAGES
===================================== */

function showMessage(message) {

    alert(message);
}


/* =====================================
   STARTUP
===================================== */

updateProgress();
```
