import React from 'react';
import './App.css'
import InputTags from './Components/InputTags';

function App() {
 const suggestions= [
    "abc", "abcd", "prashant", "Text"
  ]

  return (
    <div className="App">
      <InputTags suggestion={suggestions}/>
    </div>
  );
}

export default App;
