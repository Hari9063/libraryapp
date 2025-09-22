import React from "react";
import "./App.css";
import Navbar from "./component/navbar";
import Home from "./component/Home";
import Books from "./component/book";
import Loans from "./component/Loan";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import Members from "./component/Member";
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/members" element={<Members />} />
        <Route path="/loans"  element={<Loans/>}/>
      </Routes>
    </div>
  );
}

export default App;
