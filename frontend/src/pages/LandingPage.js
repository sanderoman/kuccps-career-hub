import React from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      {/* Theme Toggle Button */}
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>
      {/* Hero Section */}
      <div 
        className="relative h-screen bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'linear-gradient(rgba(196, 30, 58, 0.6), rgba(26, 26, 26, 0.7)), url("https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")'
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-6">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
              KUCCPS Career Hub
            </h1>
            <p className="text-xl md:text-3xl mb-12 animate-fade-in-delay" style={{ color: '#FFB3B3' }}>
              Discover Your KUCCPS Course Eligibility Instantly
            </p>
            
            {/* Three Main Buttons */}
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
              <Link
                to="/entry"
                className="btn-primary font-bold py-4 px-8 rounded-lg text-lg transition-all transform hover:scale-105 shadow-lg focus-ring"
              >
                Get Started
              </Link>
              
              <Link
                to="/universities"
                className="btn-secondary font-bold py-4 px-8 rounded-lg text-lg transition-all transform hover:scale-105 shadow-lg focus-ring"
              >
                Explore Universities
              </Link>
              
              <a
                href="https://wa.me/254743315353"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-light font-bold py-4 px-8 rounded-lg text-lg transition-all transform hover:scale-105 shadow-lg focus-ring"
              >
                Support
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-20" style={{ backgroundColor: 'var(--kuccps-white)' }}>
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16" style={{ color: 'var(--kuccps-black)' }}>
            How It Works
          </h2>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center card-hover">
              <div className="rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: 'var(--kuccps-red)' }}>
                <span className="text-3xl font-bold" style={{ color: 'var(--kuccps-white)' }}>1</span>
              </div>
              <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--kuccps-black)' }}>Enter Your Grades</h3>
              <p style={{ color: 'var(--gray-600)' }}>
                Input your KCSE grades for all subjects to calculate your mean grade and eligibility.
              </p>
            </div>
            
            <div className="text-center card-hover">
              <div className="rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: 'var(--red-light)' }}>
                <span className="text-3xl font-bold" style={{ color: 'var(--kuccps-white)' }}>2</span>
              </div>
              <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--kuccps-black)' }}>Get Matched</h3>
              <p style={{ color: 'var(--gray-600)' }}>
                Our system matches your grades against KUCCPS requirements for various courses.
              </p>
            </div>
            
            <div className="text-center card-hover">
              <div className="rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: 'var(--red-medium)' }}>
                <span className="text-3xl font-bold" style={{ color: 'var(--kuccps-white)' }}>3</span>
              </div>
              <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--kuccps-black)' }}>Download Results</h3>
              <p style={{ color: 'var(--gray-600)' }}>
                Receive a comprehensive PDF report with all eligible courses and institutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: 'var(--kuccps-black)', color: 'var(--kuccps-white)' }} className="py-8">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-lg mb-4">
            KUCCPS Career Hub © 2026 | Independent Career Advisory Tool
          </p>
          <p className="text-sm mb-4" style={{ color: 'var(--red-pink)' }}>
            ⚠️ This is an independent career advisory tool and is NOT affiliated with KUCCPS
          </p>
          <div className="flex justify-center space-x-6">
            <Link to="/admin" className="underline transition-colors hover:text-red-300" style={{ color: 'var(--red-light)' }}>
              Admin Portal
            </Link>
            <span style={{ color: 'var(--gray-400)' }}>|</span>
            <a href="https://wa.me/254743315353" className="transition-colors hover:text-red-300" style={{ color: 'var(--red-light)' }}>
              WhatsApp Support: 0743315353
            </a>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        .animate-fade-in-delay {
          animation: fade-in 1s ease-out 0.3s both;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
