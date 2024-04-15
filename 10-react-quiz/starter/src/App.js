import { useEffect, useReducer } from "react";
import Header from "./components/Header"
import Main from "./Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Questions from "./components/Questions";
import NextButton from "./components/NextButton";
import ProgressBar from "./components/ProgressBar";
import Finished from "./components/Finished";


const initialState = {
  questions: [],
  //loading, error, ready, active, finished
  status: 'loading',
  index: 0,
  answer: null,
  totalPoints: 0,
};

function reducer(state, { type, payload }) {
  switch (type) {
    case "dataReceived":
      return {
        ...state,
        questions: payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      }
    case "start":
      return {
        ...state,
        status: "active",
      }
    case "answer":
      return {
        ...state,
        answer: payload.index,
        totalPoints: payload.correctAnswer
      }
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null
      }
    case "finished":
      return {
        ...state,
        status: "finished"
      }
    case "restart":
      return {
        ...state,
        status: "ready",
        index: 0,
        answer: null,
        totalPoints: 0,
      }
    default:
      throw new Error("Action unknown");
  }
}


function App() {

  const [{ questions, status, index, answer, totalPoints }, dispatch] = useReducer(reducer, initialState)

  const maxPoints = questions.reduce((total, cur) => total + cur.points, 0);
  const numQuestions = questions.length

  useEffect(function () {
    const questions = async () => {
      try {
        const res = await fetch("http://localhost:8000/questions");
        const data = await res.json();
        dispatch({ type: "dataReceived", payload: data });
      } catch (err) {
        dispatch({ type: "dataFailed" });
        console.error(err);
      }
    }
    questions()
  }, [])

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen numQuestions={numQuestions} dispatch={dispatch} />}
        {status === "active" && (
          <>
            <ProgressBar index={index} points={totalPoints} numQuestions={numQuestions} maxPoints={maxPoints} answer={answer} />
            <Questions questions={questions[index]} dispatch={dispatch} totalPoints={totalPoints} answer={answer} />
            <NextButton dispatch={dispatch} answer={answer} numQuestions={numQuestions} index={index} />
          </>)}
        {status === "finished" && (
          <Finished points={totalPoints} maxPoints={maxPoints} dispatch={dispatch} />
        )}
      </Main>
    </div>
  );
}

export default App;
