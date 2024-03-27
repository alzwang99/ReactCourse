import { useState } from "react"
import "./index.css"

function App() {

  const flashcards = [
    { id: 0, question: "What is the moment of bruh?", answer: "bruh moment", showAnswer: false },
    { id: 1, question: "What is the moment of bruh?", answer: "bruh moment", showAnswer: false },
    { id: 2, question: "What is the moment of bruh?", answer: "bruh moment", showAnswer: false },
    { id: 3, question: "What is the moment of bruh?", answer: "bruh moment", showAnswer: false },
    { id: 4, question: "What is the moment of bruh?", answer: "bruh moment", showAnswer: false },
    { id: 5, question: "What is the moment of bruh?", answer: "bruh moment", showAnswer: false },
  ]

  return (
    <div className="flashcards">
      <Flashcards data={flashcards} />
    </div>
  );
}

const Flashcards = ({ data }) => {

  const [showAnswers, setShowAnswers] = useState(data.map(() => false));

  const toggleAnswer = (index) => {
    setShowAnswers(prevState => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    })
  }

  return (
    <>
      {data.map((data, index) => (
        <div key={index} className={`flashcard ${showAnswers[index] ? "selected" : ""}`}
          onClick={() => toggleAnswer(index)}>
          {!showAnswers[index] ? data.question : data.answer}
        </div>
      ))}
    </>
  )
}

export default App;
