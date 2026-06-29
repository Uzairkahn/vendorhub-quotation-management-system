import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './pages/Dashboard';
import Vendors from './pages/Vendors';
import Quotations from './pages/Quotations';
import Compare from './pages/Compare';
import './index.css';

export default function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3500,
          style: { fontSize: 13.5, fontFamily: 'Inter, sans-serif' },
        }}
      />
      <div className="app-layout">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/"           element={<Dashboard />} />
            <Route path="/vendors"    element={<Vendors />} />
            <Route path="/quotations" element={<Quotations />} />
            <Route path="/compare"    element={<Compare />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
