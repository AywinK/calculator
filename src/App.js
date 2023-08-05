import './App.css';
import { useReducer } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return ({ ...state, value: state.value += action.value });
    case "SUBTRACT":
      return ({ ...state, value: state.value -= action.value });
    case "MULTIPLY":
      return ({ ...state, value: state.value *= action.value });
    case "DIVIDE":
      return ({ ...state, value: state.value /= action.value });
    default:
      return state;
  }
}

function App() {

  const [state, dispatch] = useReducer(reducer, { value: 0 });

  console.log(state);


  return (
    <main>
      <div id="display">{state.value}</div>
      <button id="clear">clear</button>
      <button id="equals">=</button>
      <button value={9} id="nine">9</button>
      <button value={8} id="eight">8</button>
      <button value={7} id="seven">7</button>
      <button value={6} id="six">6</button>
      <button value={5} id="five">5</button>
      <button value={4} id="four">4</button>
      <button value={3} id="three">3</button>
      <button value={2} id="two">2</button>
      <button value={1} id="one">1</button>
      <button value={0} id="zero">0</button>
      <button id="add">+</button>
      <button id="subtract">-</button>
      <button id="multiply">*</button>
      <button id="divide">/</button>
      <button value={0.0} id="decimal">.</button>
    </main>
  );
}

export default App;
