const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const scoreCount = document.querySelector(".current-score");


let shuffledQuestions, 
    currentQuestionIndex,
    points = 0; 

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
	currentQuestionIndex++;
	setNextQuestion();
});

function startGame() {
	startButton.classList.add("hide");
	shuffledQuestions = questions.sort(() => Math.random() - 0.5);
	currentQuestionIndex = 0;
	questionContainerElement.classList.remove("hide");
	setNextQuestion();
}

function setNextQuestion() {
	resetState();
	showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
	questionElement.innerText = question.question;
	question.answers.forEach((answer) => {
		const button = document.createElement("button");
		button.innerText = answer.text;
		questionContainerElement.classList.remove("pointer-fix");
		button.classList.add("btn");
		if (answer.correct) {
			button.dataset.correct = answer.correct;
		}
		button.addEventListener("click", selectAnswer);
		answerButtonsElement.appendChild(button);
	});
}

function resetState() {
	clearStatusClass(document.body);
	nextButton.classList.add("hide");
	while (answerButtonsElement.firstChild) {
		answerButtonsElement.removeChild(answerButtonsElement.firstChild);
	}
}

function selectAnswer(e) {
	const selectedButton = e.target;
	const correct = selectedButton.dataset.correct;
	//setStatusClass(document.body, correct)
	if (correct) {
		points += 10; 
		scoreCount.textContent = `Score: ${points}`;
		questionContainerElement.classList.add("pointer-fix");
	} else { 
		questionContainerElement.classList.add("pointer-fix");
	}
	Array.from(answerButtonsElement.children).forEach((button) => {
		setStatusClass(button, button.dataset.correct);
	});
	if (shuffledQuestions.length > currentQuestionIndex + 1) {
		nextButton.classList.remove("hide");
	} else {
		startButton.innerText = "Try Again";
		startButton.classList.remove("hide");
	}
}

function setStatusClass(element, correct) {
	clearStatusClass(element);
	if (correct) {
        element.classList.add("correct");
         
        
	} else {
		element.classList.add("wrong");
	}
}

function clearStatusClass(element) {
	element.classList.remove("correct");
	element.classList.remove("wrong");
}

const questions = [
	{
		question: "What is 2 + 2 ?",
		answers: [
			{ text: "4", correct: true },
			{ text: "22", correct: false },
			{ text: "3", correct: false },
			{ text: "2", correct: false },
		],
	},
	{
		question: "What is 6 * 5 ?",
		answers: [
			{ text: "11", correct: false },
			{ text: "35", correct: false },
			{ text: "30", correct: true },
			{ text: "15", correct: false },
		],
	},
	{
		question: "What is an apple ?",
		answers: [
			{ text: "fruit", correct: true },
			{ text: "toy", correct: false },
			{ text: "liquid", correct: false },
			{ text: "phone", correct: false },
		],
	},
	{
		question: "What founded Facebook ?",
		answers: [
			{ text: "Jane", correct: false },
			{ text: "John", correct: false },
			{ text: "Mark", correct: true },
			{ text: "Mike", correct: false },
		],
	},
	{
		question: "Who is the richest man in the world ?",
		answers: [
			{ text: "Aliko", correct: false },
			{ text: "Jeff", correct: true },
			{ text: "Bill", correct: false },
			{ text: "Warrent", correct: false },
		],
	},
];