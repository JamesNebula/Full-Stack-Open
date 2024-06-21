import { useState } from "react";

const Header = () => {
  return <h2>give feedback</h2>;
};

const Content = () => {
  return <h2>statistics</h2>;
};

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>;
};

const StatsLine = (props) => {
  return (
    <tbody>
      <tr>
        <td>{props.text}</td>
        <td>{props.value}</td>
      </tr>
    </tbody>
  );
};

const Statistics = (props) => {
  if (!(props.good || props.neutral || props.bad)) {
    return <p>Please give feedback</p>;
  }
  return (
    <table>
      <StatsLine text={"good"} value={props.good} />
      <StatsLine text={"neutral"} value={props.neutral} />
      <StatsLine text={"bad"} value={props.bad} />
      <StatsLine text={"all"} value={props.good + props.neutral + props.bad} />
      <StatsLine
        text={"average"}
        value={
          (props.good - props.bad) / (props.good + props.neutral + props.bad)
        }
      />
      <StatsLine
        text={"positive"}
        value={props.good / (props.good + props.neutral + props.bad) + " %"}
      />
    </table>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const goodInput = () => {
    setGood(good + 1);
  };
  const neutralInput = () => {
    setNeutral(neutral + 1);
  };
  const badInput = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <Header />
      <Button handleClick={goodInput} text={"good"} />
      <Button handleClick={neutralInput} text={"neutral"} />
      <Button handleClick={badInput} text={"bad"} />
      <Content />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
