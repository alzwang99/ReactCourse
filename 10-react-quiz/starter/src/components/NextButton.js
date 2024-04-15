'use strict'

function NextButton({ dispatch, answer, numQuestions, index }) {
    const handleNext = () => {
        dispatch({ type: "nextQuestion" })
    }
    const handleFinish = () => {
        dispatch({ type: "finished" })
    }
    return (
        <div>{index + 1 !== numQuestions ? (
            <button className="btn btn-ui" disabled={answer === null} onClick={() => handleNext()}>Next</button>
        ) : (
            <button className="btn btn-ui" disabled={answer === null} onClick={() => handleFinish()}>Finish</button>
        )}
        </div>
    )
}

export default NextButton
