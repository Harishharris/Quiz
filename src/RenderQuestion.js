import { useEffect, useState } from "react"
import RenderButton from "./RenderButton"

export default function(props) {
    let options = [props.correctAnswer, ...props.wrongAnswer]

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
