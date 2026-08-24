import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { ChatWidget, Navbar, Footer, LoadingScreen } from './components';
import { Home } from './pages';
import { useLenis } from './hooks';

function App() {
  useLenis();
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <LoadingScreen onFinished={() => setLoading(false)} />}

      {/* Only mount the page after the loading screen is fully gone.
          This guarantees every Framer Motion `animate` fires for the first
          time after onFinished, so no animation has already "played out"
          while hidden behind the loading screen. */}
      {!loading && (
        <div className="min-h-screen bg-black text-white antialiased flex flex-col items-center w-full">
          <Navbar />
          <Home />
          <Footer />
          <ChatWidget />
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
      )}
    </>
  );
}

export default App;