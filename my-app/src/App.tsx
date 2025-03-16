import React from "react";
import "./App.css";
import { Route, Routes } from "react-router";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/home/Home";

function App() {
  return (
    <div className="flex flex-column justify-content-between min-h-screen mx-3">
      <Header />
      <main className="col-12 md:col-6 flex-grow-1 m-auto p-0">
        <Routes>
          <Route index element={<Home />} />
          <Route path="league" element={<h1>League</h1>} />
          <Route path="session" element={<h1>Session</h1>} />
          <Route path="session/create" element={<h1>Session Settings</h1>} />
          <Route path="*" element={<h1>Not found</h1>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
