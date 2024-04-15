'use strict'
import Options from "./Options"
function Questions({ questions, dispatch, answer, totalPoints }) {

    console.log(typeof (questions))
    const { question, options, correctOption, points } = questions
    console.log(question)
    console.log(options)
    return (
        <div>
            <h4>{question}</h4>
            <Options options={options} dispatch={dispatch} correctOption={correctOption} points={points} totalPoints={totalPoints} answer={answer} />
        </div>
    )
}

export default Questions
