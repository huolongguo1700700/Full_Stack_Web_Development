import { useState } from 'react'

const Button = ({ children, onClick }) => (
  <button onClick={onClick}>
    {children}
  </button>
);

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = (props) => {
  const { good, neutral, bad, total, avg, positive} = props

  if (!good && !neutral && !bad) return (<p>No feedback given</p>)

  return (
    <>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine text={'good'} value={good} />
          <StatisticLine text={'neutral'} value={neutral} />
          <StatisticLine text={'bad'} value={bad} />
          <StatisticLine text={'all'} value={total} />
          <StatisticLine text={'average'} value={avg} />
          <StatisticLine text={'positive'} value={`${positive} %`} />
        </tbody>
      </table>
    </>
  )
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const total = good + neutral + bad;
  const avg = total === 0 ? 0 : (good - bad) / total;
  const positive = total === 0 ? 0 : (good /total) * 100;

  return (
    <div>
      <div>
        <h1>give feedback</h1>
        <Button onClick={() => setGood(good + 1)}>good</Button>
        <Button onClick={() => setNeutral(neutral + 1)}>neutral</Button>
        <Button onClick={() => setBad(bad + 1)}>bad</Button>
      </div>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        total={total}
        avg={avg}
        positive={positive}
      />
    </div>
  )
}

export default App