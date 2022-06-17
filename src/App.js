import logo from './logo.svg';
import './App.css';
import { AllRoutes } from './Routes/AllRoutes';
import { AuthenticationRoutes } from './Routes/AuthenticationRoutes';

function App() {
  return (
    <div className="App">
      <AllRoutes />
      <AuthenticationRoutes />
      
    </div>
  );
}

export default App;
