import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Signup from './components/Signup';
import OTPForm from './components/OtpForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/verify-otp' element={<OTPForm />}/>
      </Routes>
    </Router>
  );
}

export default App;
