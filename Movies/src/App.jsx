import './App.css'

function App() {

  return (
    <div>
      <p>Hello World</p>
      <Text display={"What's up?"} />
      <Text display={"I'm bored"} />
    </div>

  )
}

function Text({display}) {
  return (
    <div>
      <p>{display}</p>
    </div>
  )
}

export default App
