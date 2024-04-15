'use strict'

function ProgressBar({ index, maxPoints, numQuestions, points, answer }) {
    return (
        <header className="progress">
            <progress max={numQuestions} value={index + Number(answer !== null)} className="" />
            <p>Question <strong>{index + 1}</strong> / {numQuestions}</p>
            <p>Points: <strong>{points}</strong> / {maxPoints}</p>
        </header>
    )
}

export default ProgressBar
