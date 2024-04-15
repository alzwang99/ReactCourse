'use strict'

function Finished({ points, maxPoints, dispatch }) {
    const onRestart = () => {
        dispatch({ type: "restart" })
    }
    return (
        <>
            <p className="result">You scored <strong>{points}</strong> out of {maxPoints}</p>
            <button className="btn btn-ui" onClick={() => onRestart()}>Restart</button>
        </>
    )
}

export default Finished
