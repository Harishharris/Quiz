import { useEffect, useState } from "react"

export default function(props) {
    const [buttons, setButtons] = useState(props.options.map(option => ({
        option: option,
        holded: false,
        isCorrect: false
    })))

    let selectedOptions = []


    function toggleClick(option) {
        setButtons(buttons.map(button => button.option === option ? {...button, holded: !button.holded}:{...button}))
        props.handleSelectedAnswers(option)
    }

    function changeColorIfCorrect() {
        setButtons(buttons.map(button => props.selectedAnswers.contains(button.option) ? {...button, isSelected: !button.isSelected} : {...button}))
    }

    return (
        <>
            {buttons.map(button => <button style={{backgroundColor: button.holded ? "blue" : "#fff", color: !button.holded ? "#000" : "#fff"}} key={button.option} onClick={() => toggleClick(button.option)}>{button.option}</button>)}
        </>
    )
}