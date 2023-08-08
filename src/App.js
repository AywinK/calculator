import './App.css';
import { useReducer, useEffect } from "react";

const pressOperation = (state, currentOp) => {
  let calculation;
  if (!!state.prevVal) {
    switch (state.prevOp) {
      case "ADD":
        calculation = parseFloat(state.prevVal) + parseFloat(state.current);
        break;
      case "SUBTRACT":
        calculation = parseFloat(state.prevVal) - parseFloat(state.current);
        break;
      case "MULTIPLY":
        calculation = parseFloat(state.prevVal) * parseFloat(state.current);
        break;
      case "DIVIDE":
        calculation = parseFloat(state.prevVal) / parseFloat(state.current);
        break;
      default:
        calculation = state.value;
    }

    const updatedState = { ...state, value: calculation, prevOp: "", currentOp: currentOp, prevVal: calculation, current: "0" }
    return updatedState;
  }

  return { ...state, currentOp: currentOp, prevVal: state.current, current: "0" };
}

const pressNumber = (state) => {
  return { ...state, prevOp: state.currentOp }
}

const evaluate = (state) => {
  let calculation = parseFloat(state.prevVal);
  state.value = state.prevVal;

  if (!!state.prevOp) {
    switch (state.prevOp) {
      case "ADD":
        calculation = parseFloat(state.current) + parseFloat(state.prevVal);
        break;
      case "SUBTRACT":
        calculation = parseFloat(state.current) - parseFloat(state.prevVal);
        break;
      case "MULTIPLY":
        calculation = parseFloat(state.current) * parseFloat(state.prevVal);
        break;
      case "DIVIDE":
        calculation = parseFloat(state.current) / parseFloat(state.prevVal);
        break;
      default:
        calculation = "";
    }
  }
  state.prevOp = state.currentOp;
  state.value = calculation || parseFloat(state.prevVal);
  state.currentOp = "";
  state.prevVal = calculation || parseFloat(state.prevVal);
  console.log("Line29", state)
  return { ...state }
}

const reducer = (state, action) => {
  switch (action.type) {
    case "EVALUATE":
      const finalState = evaluate(state);
      return ({ ...finalState, current: finalState.value })
    case "CLEAR":
      return ({ value: 0, current: "0" });
    case "APPENDDECIMAL":
      if (!!!state.current.includes(".")) return pressNumber({ ...state, current: state.current.concat(action.value) })
      return state;
    case "APPEND":
      const regex = /^0(?!.)/;
      const containsMoreThanOneZeroAtStart = regex.test(state.current);
      console.log(containsMoreThanOneZeroAtStart);
      if (!!containsMoreThanOneZeroAtStart) return pressNumber({ ...state, current: state.current.concat(action.value).slice(1) });
      console.log("here");
      return pressNumber({ ...state, current: state.current.concat(action.value) });

    case "ADD":
      const updatedState = pressOperation(state, "ADD");
      return updatedState;
    case "SUBTRACT":
      return { ...state, currentOp: "SUBTRACT", prevVal: state.current, current: "0" };
    case "MULTIPLY":
      return { ...state, currentOp: "MULTIPLY", prevVal: state.current, current: "0" };
    case "DIVIDE":
      return { ...state, currentOp: "DIVIDE", prevVal: state.current, current: "0" };
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
      <button
        onClick={() => {
          dispatch({ type: "EVALUATE" })
        }}
        id="equals">=</button>
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
      <button
        onClick={() => {
          dispatch({ type: "SUBTRACT" })
        }}
        id="subtract">-</button>
      <button
        onClick={() => {
          dispatch({ type: "MULTIPLY" })
        }}
        id="multiply">*</button>
      <button
        onClick={() => {
          dispatch({ type: "DIVIDE" })
        }}
        id="divide">/</button>
      <button
        onClick={e => {
          dispatch({ type: "APPENDDECIMAL", value: e.target.value })
        }}
        value={"."} id="decimal">.</button>
    </main>
  );
}

export default App;
