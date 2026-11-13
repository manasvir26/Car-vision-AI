# 🏎️ CarVisionAI

A simple, modern, beginner-friendly web application to upload a car image and identify the vehicle brand, model, approximate year, category, and key specifications using AI image recognition.

Built with **React + Vite** (Frontend) and **Python Flask** (Backend) using a pre-trained **PyTorch Vision Model** (`torchvision`).

---

## 📁 Project Folder Structure

```
carvisionai/
├── backend/
│   ├── app.py              # Flask server with image analysis API route
│   └── requirements.txt    # Python backend dependencies
├── frontend/
│   ├── index.html          # HTML entry point with fonts
│   ├── package.json        # Node.js dependencies & scripts
│   ├── vite.config.js      # Vite dev server configuration & API proxy
│   └── src/
│       ├── main.jsx        # React DOM mount script
│       ├── App.jsx         # Main UI component (Home, Upload, Result views)
│       └── index.css       # Responsive dark-theme styling
└── README.md               # Setup and usage guide
```

---

## 🚀 Prerequisites

Make sure you have the following installed on your machine:
- **Node.js** (v18 or higher) & `npm`
- **Python** (v3.9 or higher) & `pip`

---

## 🛠️ Step 1: Backend Setup (Python Flask)

1. Open a terminal and navigate to the `backend` folder:
   ```bash
   cd backend
   ```

2. (Optional but recommended) Create and activate a Python virtual environment:
   - **Windows:**
     ```bash
     python -m venv venv
     .\venv\Scripts\activate
     ```
   - **macOS / Linux:**
     ```bash
     python3 -m venv venv
     source venv/bin/activate
     ```

3. Install the backend dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run the Flask backend server:
   ```bash
   python app.py
   ```
   *The Flask backend will start on **`http://localhost:5000`**.*

---

## 💻 Step 2: Frontend Setup (React + Vite)

1. Open a new terminal window and navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```

2. Install Node dependencies:
   ```bash
   npm install
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *The React application will open on **`http://localhost:5173`**.*

---

## 🔑 Optional: Enable Google Gemini API (Enhanced Identification)

CarVisionAI works 100% out-of-the-box offline with the included pre-trained PyTorch model. 
If you wish to use Google Gemini Vision for ultra-detailed identification:

1. Set your Gemini API key in your terminal environment before running `app.py`:
   - **Windows PowerShell:**
     ```powershell
     $env:GEMINI_API_KEY="your_api_key_here"
     ```
   - **macOS / Linux / Bash:**
     ```bash
     export GEMINI_API_KEY="your_api_key_here"
     ```
2. Restart `python app.py`.

---

## 🌟 Key Features
- **Upload Image**: Drag-and-drop or select any vehicle image (PNG, JPG, WEBP).
- **AI Identification**: Instantly analyzes image using pre-trained computer vision.
- **Detailed Specifications**: Displays Car Brand, Model, Approximate Year, Engine Type, Horsepower, Transmission, and Seating Capacity.
- **Clean Responsive UI**: Modern dark theme with seamless section switching (Home, Upload, Result).
- **Error Handling**: Graceful loading animation and helpful error notifications.
