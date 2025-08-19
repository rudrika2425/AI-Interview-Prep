import react from 'react'
import {BrowserRouter as Router,Routes,Route, BrowserRouter} from 'react-router-dom';
import {Toaster} from 'react-hot-toast';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard'
import InterviewPrep from './pages/interview/InterviewPrep'
function App() {
  return (
    <>
    <BrowserRouter>
     <Router>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/interview-prep/:sessionId" element={<InterviewPrep/>}/>
        <Route path="/" element={<LandingPage/>}/>
      </Routes>
     </Router>
     </BrowserRouter> 
    </>
  )
}

export default App

