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
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [selected, setSelected] = useState(0);

  const goodInput = () => {
    setGood(good + 1);
  };
  const neutralInput = () => {
    setNeutral(neutral + 1);
  };
  const badInput = () => {
    setBad(bad + 1);
  };

  const randomised = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomIndex);
  };

  const firstVotes = new Array(anecdotes.length).fill(0);
  const [votes, setVotes] = useState(firstVotes);

  const processVote = () => {
    const newVotes = [...votes];
    console.log(newVotes);
    newVotes[selected] += 1;
    setVotes(newVotes);
  };

  const maximumVoteIndex = votes.indexOf(Math.max(...votes));

  return (
    <div>
      <Header />
      <Button handleClick={goodInput} text={"good"} />
      <Button handleClick={neutralInput} text={"neutral"} />
      <Button handleClick={badInput} text={"bad"} />
      <Content />
      <Statistics good={good} neutral={neutral} bad={bad} />
      <h2>Anecdote of the day</h2>
      <h6>{anecdotes[selected]}</h6>
      <h6>has {votes[selected]} Votes</h6>
      <button onClick={processVote}>Vote</button>
      <button onClick={randomised}>Next anecdote</button>
      <h2>Anecdote with most votes</h2>
      {votes[maximumVoteIndex] === 0 ? (
        <p>No votes yet</p>
      ) : (
        <>
          <h6>{anecdotes[maximumVoteIndex]}</h6>
          <h6>has {votes[maximumVoteIndex]} Votes</h6>
        </>
      )}
    </div>
  );
};
export default App;
