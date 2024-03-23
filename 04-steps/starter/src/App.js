'use strict'

import { useState } from 'react';

const messages = [
  "Learn React 💀",
  "Apply for jobs 💼",
  "Save money for a house 🏠"
]

export function App() {

  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);
  const [openSymbol, setOpenSymbol] = useState("✖");

  const toggleOpen = () => {
    isOpen ? setOpenSymbol("✚") : setOpenSymbol("✖")
    setIsOpen((open) => !open);
  }

  const handlePrevious = () => {
    if (step > 1) setStep((s) => s - 1)
  }

  const handleNext = () => {
    if (step < messages.length) setStep((s) => s + 1)
  }
  return (
    <>
      <button className='close' onClick={toggleOpen}>
        {openSymbol}
      </button>
      {isOpen && (
        <div className="steps">
          <Info step={step} />
          <Button func1={handlePrevious} func2={handleNext} />
        </div>
      )}
    </>
  );
}

const Info = (props) => {

  return (
    <>
      <div className="numbers">
        {messages.map((step, index) => {
          const i = index + 1
          return <div key={step} className={`${props.step >= i ? "active" : ""}`}>{i}</div>
        })}
      </div>
      <p className="message">
        Step {props.step}: {messages[props.step - 1]}
      </p>
    </>
  )
}

const Button = (props) => {
  return (
    <div className="buttons">
      <button style={{ backgroundColor: "#7950f2", color: "#fff" }} className="button"
        onClick={props.func1}>Yuh</button>
      <button style={{ backgroundColor: "#7950f2", color: "#fff" }} className="button"
        onClick={props.func2}>Naw</button>
    </div>
  )
}