# 🚀 Aaayafuj SMM CLI Suite

> **High-Performance TikTok & Social Media Automation Engine**
> *Developed by Aaayafuj (AYFJ)*

Aaayafuj SMM CLI Suite is a professional-grade terminal application designed for rapid social media growth automation and strategic consulting. It leverages multi-threaded networking and the Gemini 3 Flash AI core to provide both brute-force automation and intelligent marketing insights.

---

## 🛠 Features

- **⚡ Multi-Threaded Automation**: High-concurrency engines for TikTok views, likes, shares, and favorites.
- **🧠 AI Strategy Core**: Integrated Gemini 3 Flash consultant for viral trend analysis and SEO optimization.
- **🛡 Advanced Signature Spoofing**: Built-in `Gorgon` signature generation for authentic API communication.
- **📱 Device Emulation**: Extensive device database (`config/devices.txt`) for rotating requests and avoiding detection.
- **📊 Real-time Analytics**: Live success/failure tracking and request-per-minute (RPM) monitoring.
- **🔒 Secure Architecture**: Stateless operation using environment variables for sensitive API keys.

---

## 📂 Project Structure

```text
aaayafuj-smm-tool/
├── main.py              # Application entry point
├── config/              # Configuration & Database
│   ├── devices.txt      # Device emulation list
│   ├── services.json    # Service definitions
│   └── user_config.json # Local settings
├── src/                 # Source Engine
│   ├── api.py           # Networking & AI interaction
│   ├── gorgon.py        # Signature & Security logic
│   ├── main_menu.py     # CLI Navigation system
│   └── utils.py         # Terminal aesthetics & helpers
├── requirements.txt     # Python dependencies
└── *.txt                # Resource files (proxies, IDs, locales)
```

---

## 🚀 Getting Started

### Prerequisites

- Python 3.8 or higher
- A valid Google Gemini API Key (for AI consultant features)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/aaayafuj51-AYFJ
   cd aaayafuj-smm-tool
   ```

2. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Configure environment:**
   ```bash
   # Linux/macOS
   export API_KEY='your_gemini_api_key'
   
   # Windows (Command Prompt)
   set API_KEY=your_gemini_api_key
   ```

4. **Launch the suite:**
   ```bash
   python main.py
   ```

---

## 📖 Usage Guide

1. **Automation**: Select an option (1-4) from the main menu. Enter the desired thread count (recommended: 50-100) and the target amount of hits.
2. **AI Consulting**: Select option [5]. Ask specific questions like "How to improve my TikTok retention?" or "What are the trending hashtags in the tech niche?".
3. **Targeting**: Ensure your `video_links.txt` contains the correct TikTok Video IDs (numeric only) for automation to work correctly.

---

## ⚠️ Disclaimer

This tool is for educational and research purposes only. Automation of social media platforms may violate their Terms of Service. Use responsibly.

---

## 🤝 Contribution

Contributions are welcome! Please feel free to submit a Pull Request or open an issue on the [GitHub Repository](https://github.com/aaayafuj51-AYFJ).

**Made with ❤️ by Aaayafuj**