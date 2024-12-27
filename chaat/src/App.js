import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Join from "./Component/Join/Join.js";
import Chat from "./Component/Chat/Chat.js"; 

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Home Route */}
          <Route path="/" element={<Join />} />

          {/* Chat Route */}
          <Route path="/chat" element={<Chat />} /> 
        </Routes>
      </Router>
    </div>
  );
}

export default App;
