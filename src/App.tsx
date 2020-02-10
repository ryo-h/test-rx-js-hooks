import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { useObservable, useEventCallback } from "rxjs-hooks";
import { interval, Observable } from "rxjs";
import { map } from "rxjs/operators";

function App() {
  const value = useObservable(() => interval(500).pipe(map(val => val * 3)));

  const [clickCallback, [description, x, y]] = useEventCallback(
    (event$: Observable<React.MouseEvent<HTMLButtonElement>>) =>
      event$.pipe(
        map(event => [
          event.currentTarget.innerHTML,
          event.clientX,
          event.clientY
        ])
      ),
    ["nothing", 0, 0]
  );

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <h1>Incremental number: {value}</h1>
      <h1>
        click position: {x}, {y}
      </h1>
      <h1>"{description}" was clicked.</h1>
      <button onClick={clickCallback}>click me</button>
      <button onClick={clickCallback}>click you</button>
      <button onClick={clickCallback}>click him</button>
    </div>
  );
}

export default App;
