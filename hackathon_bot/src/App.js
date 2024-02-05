
import './App.css';
import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import CodeSuggestion from './CodeSuggestion';
import Paraphraser from './Paraphraser.js'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import GrammarFixer from './GrammarFixer.js'
import Translator from './Translator.js';

const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
console.log(OPENAI_API_KEY);

function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [title, setTitle] = useState('Default Title');

  useEffect(() => {
    document.title = title;
  }, [title]);

  const changeTitle = () => {
    setTitle('New Title');
  };

  return (
    <Router>
      <div className="App">
        <Sidebar isSidebarCollapsed={isSidebarCollapsed} setIsSidebarCollapsed={setIsSidebarCollapsed} />
        <Routes>
        <Route path="/" element={<Paraphraser OPENAI_API_KEY={OPENAI_API_KEY}/>} />
          <Route path="/summarizer" element={<Paraphraser OPENAI_API_KEY={OPENAI_API_KEY}/>} />
          <Route path="/codesuggestion" element={<CodeSuggestion OPENAI_API_KEY={OPENAI_API_KEY}/>} />
          <Route path="/grammarfixer" element={<GrammarFixer OPENAI_API_KEY={OPENAI_API_KEY}/>} />
          <Route path="/translator" element={<Translator OPENAI_API_KEY={OPENAI_API_KEY}/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
