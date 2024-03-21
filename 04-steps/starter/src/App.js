
const messages = [
  "Learn React",
  "Apply for jobs 💼",
  "Save money for a house 🏠"
]

export function App() {

  return (
    <div className="steps">
      <Info />
      <div className="buttons">
        <button style={{ backgroundColor: "#7950f2", color: "#fff" }} className="button">Yuh</button>
        <button style={{ backgroundColor: "#7950f2", color: "#fff" }} className="button">Naw</button>
      </div>
    </div>
  );
}

const Info = () => {
  let step = 1;
  return (
    <>
      <div className="numbers">
        {messages.map((_, index) => {
          const i = index + 1
          return <div className={`${step >= i ? "active" : ""}`}>{i}</div>
        })}
      </div>
      <p className="message">
        Step {step}: {messages[step - 1]}
      </p>
    </>
  )
}