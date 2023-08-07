import './App.css';
import { useReducer, useEffect } from "react";

const evaluate = (state) => {
  let calculation;

  if (!!state.currentOp) {
    switch (state.currentOp) {
      case "ADD":
        calculation = parseFloat(state.value) + parseFloat(state.current);
        break;
      case "SUBTRACT":
        calculation = parseFloat(state.value) - parseFloat(state.current);
        break;
      case "MULTIPLY":
        calculation = parseFloat(state.value) * parseFloat(state.current);
        break;
      case "DIVIDE":
        calculation = parseFloat(state.value) / parseFloat(state.current);
        break;
      default:
        calculation = "";
    }
  } else return state
  state.prevOp = state.currentOp;
  state.currentOp = "";
  state.value = calculation;
  console.log("Line29", state)
  return { ...state }
}

const reducer = (state, action) => {
  switch (action.type) {
    case "CLEAR":
      return ({ value: 0, current: "0" });
    case "APPENDDECIMAL":
      if (!!!state.current.includes(".")) return ({ ...state, current: state.current.concat(action.value) })
      return state;
    case "APPEND":
      const regex = /^0(?!.)/;
      const containsMoreThanOneZeroAtStart = regex.test(state.current);
      console.log(containsMoreThanOneZeroAtStart);
      if (state.currentOp) return evaluate(state);
      if (!!containsMoreThanOneZeroAtStart) return ({ ...state, current: state.current.concat(action.value).slice(1) });
      console.log("here");
      return ({ ...state, current: state.current.concat(action.value) });
    case "ADD":
      return { ...state, currentOp: "ADD", prevVal: state.current, current: "0" };
    case "SUBTRACT":
      return { ...state, currentOp: "SUBTRACT" };
    case "MULTIPLY":
      return { ...state, currentOp: "MULTIPLY" };
    case "DIVIDE":
      return { ...state, currentOp: "DIVIDE" };
    default:
      return state;
  }
}

function App() {

  const [state, dispatch] = useReducer(reducer, { value: 0, current: "0" });

  useEffect(() => { console.log(state); })

  return (
    <main>
      <div id="displayArea">
        {state.value}
        <br />
        <span id="display">{state.current}</span>
      </div>
      <button
        onClick={() => dispatch({ type: "CLEAR" })}
        id="clear">clear</button>
      <button id="equals">=</button>
      <button onClick={e => {
        dispatch({ type: "APPEND", value: e.target.value })
      }} value={9} id="nine">9</button>
      <button onClick={e => {
        dispatch({ type: "APPEND", value: e.target.value })
      }} value={8} id="eight">8</button>
      <button onClick={e => {
        dispatch({ type: "APPEND", value: e.target.value })
      }} value={7} id="seven">7</button>
      <button onClick={e => {
        dispatch({ type: "APPEND", value: e.target.value })
      }} value={6} id="six">6</button>
      <button onClick={e => {
        dispatch({ type: "APPEND", value: e.target.value })
      }} value={5} id="five">5</button>
      <button onClick={e => {
        dispatch({ type: "APPEND", value: e.target.value })
      }} value={4} id="four">4</button>
      <button onClick={e => {
        dispatch({ type: "APPEND", value: e.target.value })
      }} value={3} id="three">3</button>
      <button onClick={e => {
        dispatch({ type: "APPEND", value: e.target.value })
      }} value={2} id="two">2</button>
      <button onClick={e => {
        dispatch({ type: "APPEND", value: e.target.value })
      }} value={1} id="one">1</button>
      <button onClick={e => {
        dispatch({ type: "APPEND", value: e.target.value })
      }} value={0} id="zero">0</button>
      <button
        onClick={() => {
          dispatch({ type: "ADD" })
        }}
        id="add">+</button>
      <button id="subtract">-</button>
      <button id="multiply">*</button>
      <button id="divide">/</button>
      <button
        onClick={e => {
          dispatch({ type: "APPENDDECIMAL", value: e.target.value })
        }}
        value={"."} id="decimal">.</button>
    </main>
  );
}

export default App;
