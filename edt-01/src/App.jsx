import { Routes, Route } from 'react-router-dom';
import './App.css';
import Register from './components/register';



function App() {
  return (
    
    <div className="App">
      <Routes>
      <Route path= '/' Component={Register} exact/>
      </Routes>
    </div>
  );
}

export default App;
