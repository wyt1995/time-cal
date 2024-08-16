import React from 'react';
import { BrowserRouter, Route, Routes, Navigate, useParams } from 'react-router-dom';
import Header from './components/Header';
import LandingSection from "./components/LandingSection";
import MainSection from "./components/MainSection";
import Footer from "./components/Footer";
import './index.css';
import './App.css';

function AppContent(): React.ReactElement {
  const title: string = 'Time in Calculation'
  const tabTitles: string[] = ['Home', 'Calendar', 'Eclipse', 'Time'];
  const { tab } = useParams<{ tab?: string }>();
  const activeTab = tab || '';

  return (
    <>
      <Header title={title} tabs={tabTitles} activeTab={activeTab} />
      <LandingSection />
      <MainSection activeTab={activeTab} />
      <Footer />
    </>
  );
}

function App(): React.ReactElement {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:tab?" element={<AppContent />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
