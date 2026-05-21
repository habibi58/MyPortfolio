import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Navbar, Footer, LoadingScreen } from './components';
import { Home } from './pages';
import { useLenis } from './hooks';

function App() {
  useLenis();
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <LoadingScreen onFinished={() => setLoading(false)} />}
      <div className={`min-h-screen bg-black text-white antialiased flex flex-col items-center w-full transition-opacity duration-1000 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        <Navbar />
        <Home />
        <Footer />
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#1e293b',
              color: '#f1f5f9',
              borderRadius: '12px',
              border: '1px solid rgba(148, 163, 184, 0.1)',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
              fontFamily: 'Inter, sans-serif',
            },
          }}
        />
      </div>
    </>
  );
}

export default App;

