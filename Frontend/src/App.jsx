import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import AddQuestions from './components/AddQuestions';
import ViewList from './components/ViewList';
import MakeNotes from './components/MakeNotes';
import PinnedQuestions from './components/PinnedQuestions';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<AddQuestions />} />
          <Route path="add-questions" element={<AddQuestions />} />
          <Route path="view-list" element={<ViewList />} />
          <Route path="make-notes" element={<MakeNotes />} />
          <Route path="pinned-questions" element={<PinnedQuestions />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;