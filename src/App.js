import { useEffect, useState } from "react"
import AnnounceScore from "./AnnounceScore"
import RenderQuestion from "./RenderQuestion"

export default function() {

	const [questions, setQuestions] = useState([])
	const [selectedAnswers, setSelectedAnswers] = useState([])
	const [correctAnswersFromAPI, setCorrectAnswersFromAPI] = useState([])
	const [score, setScore] = useState(1)
	const [isDoneClicked, setIsDoneClicked] = useState(false)

	function handleSelectedAnswers(option) {
		setSelectedAnswers(prevState => [...prevState, option])
	}
	console.log(selectedAnswers)
	console.log(correctAnswersFromAPI)

	useEffect(() => {
		{fetch('https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple')
		.then(res => res.json())
		.then(data => {
			setCorrectAnswersFromAPI(data.results.map(result => result.correct_answer))
			console.log(correctAnswersFromAPI)
			setQuestions(data.results.map(result => ({...result, isHold: false, id: Math.random()})))
		})}
	}, [])
	
	function setHold(id) {
		setQuestions(questions.map(question => question === id ? {...question, isHold: !question.isHold} : {...question}))
	}

	function handleScore() {
		let scoreReference = 0
		for (const ans of selectedAnswers) {
			if (correctAnswersFromAPI.includes(ans)) {
				scoreReference++
			}
		}
		setScore(scoreReference)
		setIsDoneClicked(prev => !prev)

	}

	return (
		<div className='main'>
			{questions.map(question => (
				<RenderQuestion
					questionToRender={question.question}
					correctAnswer={question.correct_answer}
					wrongAnswer={question.incorrect_answers}
					options={[question.correct_answer, ...question.incorrect_answers]}
					isHold={question.isHold}
					setHold={setHold}
					id={question.question}
					key={Math.random()}
					handleSelectedAnswers={handleSelectedAnswers}
					selectedAnswers={selectedAnswers}
				/>
			))}
			<br/>
			<button className="done" onClick={handleScore}>Done!!</button>
			<p className="score-declaration">{isDoneClicked ? ("Your Score is " + score) : ''}</p>
		</div>
	)
}