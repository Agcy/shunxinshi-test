import './App.css';
import Question from './views/Question';

function App() {
  return (
      <div className="App">
        <header>
          <h1>选择题测试</h1>
        </header>
        <main>
          <Question />
        </main>
      </div>
  );
}

export default App;
