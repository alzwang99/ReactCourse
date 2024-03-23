import React, { useState } from "react"

export const Buttons = () => {

    const day = 24 * 60 * 60 * 1000;
    const currentDate = new Date()
    const [date, setDate] = useState(currentDate)

    const [step, setStep] = useState(1);

    const subStep = () => {
        if (step > 1) setStep(s => s - 1)
    }
    const addStep = () => {
        setStep(s => s + 1)
    }

    const [count, setCount] = useState(0);

    const subCount = () => {
        setCount(c => c - (1 * step))
        setDate(d => new Date(currentDate.getTime() + ((count - (1 * step)) * day)))
    }

    const addCount = () => {
        setCount(c => c + (1 * step))
        setDate(d => new Date(currentDate.getTime() + ((count + (1 * step)) * day)))
    }

    const dateString = () => {
        const absCount = Math.abs(count)
        return count === 0 ? "Today is " :
            count > 0 ? `${count} day${count !== 1 ? 's' : ''} from today is ` :
                `${absCount} day${count !== -1 ? 's' : ''} ago was `
    }

    return (
        <>
            <div>
                <button onClick={subStep}>-</button>
                <span>Step: {step}</span>
                <button onClick={addStep}>+</button>
            </div>
            <div>
                <button onClick={subCount}>-</button>
                <span>Count: {count}</span>
                <button onClick={addCount}>+</button>
            </div>
            <div>
                <h1>{dateString()}{date.toDateString()}</h1>
            </div>
        </>
    )
}

// 1 day ago was Date

// Today is Date

// 5 days from today is Date