const readline=require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const questions = [
    {
        question: "Which language runs in a web browser?",
        options: ["1. Python", "2. JavaScript", "3. C++", "4. Java"],
        answer: "2"
    },
    {
        question: "Which keyword declares a constant in JavaScript?",
        options: ["1. let", "2. var", "3. const", "4. function"],
        answer: "3"
    },
    {
        question: "Which method adds an item to the end of an array?",
        options: ["1. push()", "2. pop()", "3. shift()", "4. find()"],
        answer: "1"
    },
    {
        question: "Which symbol starts a single-line comment in JavaScript?",
        options: ["1. ##", "2. //", "3. <!--", "4. **"],
        answer: "2"
    },
    {
        question: "Which array method transforms each item into a new value?",
        options: ["1. filter()", "2. find()", "3. map()", "4. pop()"],
        answer: "3"
    }
];

let score = 0;
const timeLimit = 10;

function startQuiz() {
    console.log("\nWelcome to the Trivia Quiz!");
    console.log(`You have ${timeLimit} seconds per question.`);
    askQuestion(0);
}

function askQuestion(index) {
    if (index >= questions.length) {
        console.log(`\nQuiz finished! Your score is ${score}/${questions.length}.`);
        rl.close();
        return;
    }

    const currentQuestion = questions[index];

    console.log(`\nQuestion ${index + 1}: ${currentQuestion.question}`);

    currentQuestion.options.forEach((option) => {
        console.log(option);
    });

    let answered = false;

    const timer = setTimeout(() => {
        if (!answered) {
            answered = true;
            console.log("\nTime is up!");
            console.log(`Correct answer: ${currentQuestion.answer}`);
            askQuestion(index + 1);
        }
    }, timeLimit * 1000);

    rl.question("Enter your answer (1-4): ", (answer) => {
        if (answered) {
            return;
        }

        answered = true;
        clearTimeout(timer);

        const userAnswer = answer.trim();

        if (!["1", "2", "3", "4"].includes(userAnswer)) {
            console.log("Invalid input. Please enter 1, 2, 3, or 4.");
            askQuestion(index);
            return;
        }

        if (userAnswer === currentQuestion.answer) {
            console.log("Correct!");
            score++;
        } else {
            console.log(`Incorrect. The correct answer was ${currentQuestion.answer}.`);
        }

        askQuestion(index + 1);
    });
}

startQuiz();