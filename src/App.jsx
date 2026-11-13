import React, { useState } from 'react';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file (PNG, JPG, JPEG, WEBP).');
        return;
      }
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
      setError(null);
    }
  };

  // Reset uploaded image
  const handleReset = () => {
    setSelectedFile(null);
    setImagePreview(null);
    setError(null);
  };

  // Submit image to Flask API
  const handleAnalyze = async () => {
    if (!selectedFile) {
      setError('Please select or upload a car image first.');
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to analyze image. Please try another picture.');
      }

      setResult(data);
      setActiveTab('result');
    } catch (err) {
      setError(err.message || 'Error connecting to backend server. Make sure Flask backend is running on port 5000.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      {/* Header / Navbar */}
      <header className="navbar">
        <div className="brand-logo" onClick={() => setActiveTab('home')} style={{ cursor: 'pointer' }}>
          <span>🏎️ CarVisionAI</span>
        </div>
        <nav className="nav-links">
          <button 
            className={`nav-btn ${activeTab === 'home' ? 'active' : ''}`}
            onClick={() => setActiveTab('home')}
          >
            Home
          </button>
          <button 
            className={`nav-btn ${activeTab === 'upload' ? 'active' : ''}`}
            onClick={() => setActiveTab('upload')}
          >
            Upload
          </button>
          {result && (
            <button 
              className={`nav-btn ${activeTab === 'result' ? 'active' : ''}`}
              onClick={() => setActiveTab('result')}
            >
              Result
            </button>
          )}
        </nav>
      </header>

      {/* Global Error Banner */}
      {error && (
        <div className="error-box">
          <span>⚠️ {error}</span>
          <button 
            onClick={() => setError(null)} 
            style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', fontWeight: 'bold' }}
          >
            ✕
          </button>
        </div>
      )}

      {/* Section 1: Home */}
      {activeTab === 'home' && (
        <section className="section">
          <div className="hero">
            <h1 className="hero-title">
              Instant AI <span>Car & Model</span> Recognition
            </h1>
            <p className="hero-subtitle">
              Upload any photo of a car and our pre-trained AI vision model will instantly identify the brand, model, approximate year, and key specifications.
            </p>
            <button className="cta-btn" onClick={() => setActiveTab('upload')}>
              Upload Car Image →
            </button>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🔍</div>
              <h3 className="feature-title">Model Identification</h3>
              <p className="feature-desc">Recognizes car makes, models, and vehicle body styles in seconds.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3 className="feature-title">Pre-Trained AI</h3>
              <p className="feature-desc">Powered by PyTorch MobileNet vision architecture for instant fast inference.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3 className="feature-title">Detailed Specs</h3>
              <p className="feature-desc">Retrieves approximate release years, engine types, horsepower, and seating details.</p>
            </div>
          </div>
        </section>
      )}

      {/* Section 2: Upload */}
      {activeTab === 'upload' && (
        <section className="section">
          <div className="upload-card">
            <h2 style={{ fontFamily: 'var(--font-heading)', marginBottom: '10px' }}>Upload Vehicle Image</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '25px' }}>
              Select a clear photo of any car to analyze.
            </p>

            {!imagePreview ? (
              <label className="dropzone">
                <div className="dropzone-icon">📷</div>
                <p style={{ fontWeight: '600', marginBottom: '5px' }}>Click to select an image</p>
                <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>Supports PNG, JPG, JPEG, WEBP</p>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleFileChange} 
                  className="file-input"
                />
              </label>
            ) : (
              <div className="preview-container">
                <img src={imagePreview} alt="Car preview" className="image-preview" />
              </div>
            )}

            {loading ? (
              <div className="spinner-container">
                <div className="spinner"></div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                  Analyzing car details with PyTorch AI...
                </p>
              </div>
            ) : (
              <div className="action-bar">
                {imagePreview && (
                  <>
                    <button className="btn-secondary" onClick={handleReset}>
                      Change Photo
                    </button>
                    <button className="cta-btn" onClick={handleAnalyze}>
                      Analyze Car ✨
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Section 3: Result */}
      {activeTab === 'result' && result && (
        <section className="section">
          <div className="result-layout">
            <div className="result-image-card">
              <img src={imagePreview} alt={result.car_name} className="result-img" />
              <button 
                className="btn-secondary" 
                onClick={() => { setActiveTab('upload'); handleReset(); }} 
                style={{ marginTop: '20px', width: '100%' }}
              >
                ← Analyze Another Car
              </button>
            </div>

            <div className="result-info-card">
              <div className="result-header">
                <div>
                  <h2 className="car-title">{result.car_name}</h2>
                  <span className="car-category">{result.category}</span>
                </div>
                {result.confidence && (
                  <span className="confidence-badge">Match: {result.confidence}</span>
                )}
              </div>

              <div className="details-grid">
                <div className="detail-box">
                  <div className="detail-label">Brand / Make</div>
                  <div className="detail-value">{result.brand}</div>
                </div>
                <div className="detail-box">
                  <div className="detail-label">Model / Series</div>
                  <div className="detail-value">{result.model}</div>
                </div>
                <div className="detail-box">
                  <div className="detail-label">Approximate Year</div>
                  <div className="detail-value">{result.year}</div>
                </div>
                <div className="detail-box">
                  <div className="detail-label">Horsepower</div>
                  <div className="detail-value">{result.specs?.horsepower || 'N/A'}</div>
                </div>
                <div className="detail-box">
                  <div className="detail-label">Engine</div>
                  <div className="detail-value">{result.specs?.engine || 'N/A'}</div>
                </div>
                <div className="detail-box">
                  <div className="detail-label">Seating Capacity</div>
                  <div className="detail-value">{result.specs?.seating || 'N/A'}</div>
                </div>
              </div>

              {result.description && (
                <div>
                  <h4 style={{ color: 'var(--text-muted)', marginBottom: '8px', fontSize: '0.85rem', textTransform: 'uppercase' }}>
                    Vehicle Overview
                  </h4>
                  <div className="car-description">
                    {result.description}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="footer">
        CarVisionAI • Powered by React + Vite and Python Flask
      </footer>
    </div>
  );
}
