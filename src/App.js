import './App.css';
import { useReducer, useEffect } from "react";

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
      console.log(containsMoreThanOneZeroAtStart)
      if (!!containsMoreThanOneZeroAtStart) return ({ ...state, current: state.current.concat(action.value).slice(1) });
      console.log("here");
      return ({ ...state, current: state.current.concat(action.value) });
    case "ADD":
      return ({ value: state.value += parseFloat(state.current), current: "0" });
    case "SUBTRACT":
      return ({ value: state.value -= parseFloat(state.current), current: "0" });
    case "MULTIPLY":
      return ({ value: state.value *= parseFloat(state.current), current: "0" });
    case "DIVIDE":
      return ({ value: state.value /= parseFloat(state.current), current: "0" });
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
