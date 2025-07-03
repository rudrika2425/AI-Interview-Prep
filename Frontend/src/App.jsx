import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import AddQuestions from './components/AddDomain';
import ViewList from './components/ViewList';
import MakeNotes from './components/MakeNotes';
import PinnedQuestions from './components/PinnedQuestions';
import { ToastContainer } from 'react-toastify';
import ViewDomain from './pages/ViewDomain';
import ViewNotes from './components/ViewNotes';

function App() {
  return (
     <UserProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/questions/:domainId" element={<ViewDomain />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<AddQuestions />} />
          <Route path="add-questions" element={<AddQuestions />} />
          <Route path="view-list" element={<ViewList />} />
          <Route path="make-notes" element={<MakeNotes />} />
          <Route path="view-notes" element={<ViewNotes />} />
          <Route path="pinned-questions" element={<PinnedQuestions />} />
        </Route>
      </Routes>
    </Router>
    <ToastContainer position="bottom-right" autoClose={3000} />
    </UserProvider>
  );
}

export default App;