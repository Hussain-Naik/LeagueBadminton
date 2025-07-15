import React, { useEffect } from "react";
import "./App.css";
import { Route, Routes } from "react-router";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/home/Home";
import League from "./pages/league/League";
import Session from "./pages/session/Session";
import SessionSetting from "./pages/session/SessionSetting";
import { persistor } from "./store/store";

function App() {

  useEffect(()=>{
    persistor.purge();
  }, [])
  return (
    <div className="flex flex-column justify-content-between min-h-screen mx-3">
      <Header />
      <main className="col-12 md:col-6 flex-grow-1 m-auto p-0">
        <Routes>
          <Route index element={<Home />} />
          <Route path="league" element={<League />} />
          <Route path="session" element={<Session />} />
          <Route path="session/create" element={<SessionSetting />} />
          <Route path="*" element={<h1>Not found</h1>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
