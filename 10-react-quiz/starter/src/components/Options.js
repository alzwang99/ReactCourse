'use strict'

function Options({ options, dispatch, correctOption, points, totalPoints, answer }) {
    const hasAnswered = answer !== null;

    const clickAnswer = (index) => {
        console.log(index)
        const correctAnswer = index === correctOption ? totalPoints + points : totalPoints;
        console.log(correctAnswer)
        dispatch({ type: "answer", payload: { index, correctAnswer } })
    }
    return (
        <div className="options">
            {options.map((op, index) =>
            (<button className={`btn btn-option ${index === answer ? "answer" : ""}
            ${hasAnswered ? index === correctOption ? "correct" : "wrong" : ""}`}
                key={index} disabled={hasAnswered}
                onClick={() => clickAnswer(index)}>{op}</button>))
            }
        </div >
    )
}

export default Options
