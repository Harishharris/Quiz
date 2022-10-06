import { useEffect, useState } from "react"
import RenderButton from "./RenderButton"

export default function(props) {
    //let options = [props.correctAnswer, ...props.wrongAnswer]
    let options = shuffle([props.correctAnswer, ...props.wrongAnswer])

    useEffect(() => {
        options = shuffle([props.correctAnswer, ...props.wrongAnswer])
    }, [])

    function shuffle(array) {
        let currentIndex = array.length,  randomIndex;

        // While there remain elements to shuffle.
        while (currentIndex != 0) {

            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }

        return array;
    }

    const keyOptions = props.options
    let key = Math.random()

    const [selected, setSelected] = useState({
        question: props.question,
        options: options
    })

    useEffect(() => {
        key = Math.random()
    }, [key])

    return (
        <>
            <div className="question">{props.questionToRender}</div>
            <RenderButton 
                options={options}
                handleSelectedAnswers={(option) => props.handleSelectedAnswers(option)}
                selectedAnswers={props.selectedAnswers}
            />
        </>
    )
}
