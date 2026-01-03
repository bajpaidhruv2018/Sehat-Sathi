# 🩺 Sehat Saathi (सेहत साथी)
### *Bridging the Rural Healthcare Gap with AI-Driven Empathy & Digital Literacy*

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![AI-Powered](https://img.shields.io/badge/AI-Gemini%201.5%20Flash-green)
![Accessibility](https://img.shields.io/badge/Accessibility-Bilingual--Audio-orange)

---

## 📖 Project Overview
**Sehat Saathi** is an all-in-one digital health companion designed for rural India. It targets the "Next Billion Users" by removing barriers of literacy, language, and misinformation. By combining generative AI with real-time mapping and gamified education, Sehat Saathi empowers users to navigate the healthcare system with confidence.

---

## 🚀 Active Features

### 🤖 1. AI Health Chatbot ("Sehat Saathi")
- **WhatsApp-Style UI:** A familiar, high-trust chat interface.
- **Bilingual Intelligence:** Powered by **Gemini AI** to handle complex health queries in both English and Hindi.
- **Floating Access:** Always available via a "Sparkles" button on every page.

### 📍 2. Smart Hospital Locator
- **Live Location Logic:** Real-time hospital discovery using Google Maps API.
- **Emergency Triage:** Filters results by "Severity." High-severity cases highlight red markers and prioritize proximity.
- **Deep Insights:** Displays ETA (driving time), distance, opening status, and one-tap calling.

### 🎓 3. Health Education Hub
- **Visual Library:** Module cards for Hygiene, Vaccination, Nutrition, and Mental Health.
- **Audio Support:** Integrated **Text-to-Speech (TTS)** "Listen" buttons for illiterate or elderly users.

### 📚 4. Digital Health Literacy
- **Step-by-Step Tutorials:** Guides for booking appointments, digital payments, and using health apps.
- **Gamified Progress:** Users earn "Beginner" and "Intermediate" badges as they master digital health skills.

### 🚨 5. Emergency Center
- **SOS Countdown:** A persistent red button that triggers a countdown to call **108 (Ambulance)**.
- **Quick Dial Cards:** Direct access to Police (112), Women's Helpline (1091), and Child Helpline (1098).
- **First Aid Tips:** Immediate "What to do while waiting" instructions.

### ❌ 6. Myth vs. Fact (Misconceptions)
- **Interactive Flip-Cards:** Scientific debunking of common rural health myths (e.g., vaccine rumors, pregnancy nutrition).
- **Audio Enabled:** Myths and facts can be read aloud in regional languages.

### 👨‍⚕️ 7. Ask a Doctor
- **Consultation Interface:** A structured form for users to submit specific medical queries.
- **AI-Simulated Response:** Provides immediate, high-quality medical guidance powered by Supabase Edge Functions.

### 📊 8. User Dashboard
- **Progress Tracking:** Visualized charts showing literacy module completion.
- **Badge Showcase:** A gallery of earned achievements like "Health Guardian" or "Tech Savvy."

---

## 🌐 Global Accessibility Features
- **Multilingual Support:** Full interface switching between English, Hindi, and regional dialects.
- **Voice-First Design:** Extensive text-to-speech integration to assist users with reading difficulties.
- **Theme Support:** Dark/Light mode optimization for varying lighting conditions.

---

## 🛠️ Tech Stack
| Layer | Technology |
| :--- | :--- |
| **Frontend** | React.js, Tailwind CSS, Lucide Icons, Vite |
| **Backend** | Supabase (Database, Auth, Edge Functions) |
| **AI Engine** | Google Gemini 1.5 Flash (via Supabase Edge) |
| **Mapping** | Google Maps JavaScript API, Places API, Distance Matrix API |

---

## 🏗️ Architecture
1. **The Brain:** Supabase Edge Functions act as a bridge between the user and Google Gemini.
2. **The Map:** Google Maps API calculates real-time ETA based on user coordinates.
3. **The Voice:** Browser-native Web Speech API provides text-to-speech for accessibility.
4. **The Trust:** WhatsApp-inspired UI components ensure zero learning curve for the user.

---

## 🚀 How to Run

Follow these steps to set up the project locally on your machine.

### 1. Prerequisites
- **Node.js** (v18.0+) & **npm**
- **Supabase CLI** (Required for Edge Functions)
- **Google Cloud Account** (For Maps & Gemini API Keys)

### 2. Clone the Repository
```bash
git clone [https://github.com/your-username/SehatSaathi.git](https://github.com/your-username/SehatSaathi.git)
cd SehatSaathi
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Configure Environment Variables
Create a file named .env in the root directory and add your credentials:
```Code snippet
# Supabase Configuration
VITE_SUPABASE_URL=[https://your-project-id.supabase.co](https://your-project-id.supabase.co)
VITE_SUPABASE_ANON_KEY=your-anon-key

# Google Maps Platform
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

### 5. Setup Backend(AI & Supabase)
To enable the Gemini AI Chatbot and Triage Logic, you must configure the Supabase Edge Functions:
```bash
# Link your local CLI to your Supabase project
supabase login
supabase link --project-ref your-project-id

# Set your Gemini API Key in Supabase Secrets
supabase secrets set GEMINI_API_KEY=your_gemini_api_key

# Deploy the AI Edge Function
supabase functions deploy triage-assist
```

### 6. Run Development Server
```bash
npm run dev
```
Open http://localhost:5173 in your browser to see the app.


