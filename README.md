# 🚀 Aaayafuj_SMM.py

> **Ultimate TikTok & Social Media Marketing Automation Suite**
> *Developed by Aaayafuj (AYFJ)*

Aaayafuj_SMM is a high-performance terminal tool written in Python, designed for rapid interaction with social media APIs. It features advanced signature spoofing, multi-threaded request handling, and robust device emulation.

---

## 🛠 Features

- **⚡ Blazing Fast**: Asynchronous and multi-threaded request core for maximum RPM.
- **🛡 Gorgon Signature**: Built-in support for TikTok's `X-Gorgon` and `X-Khronos` authentication headers.
- **📱 Device Rotation**: Emulates various Android devices to stay below the radar.
- **📈 Real-time Stats**: Watch your success rate and requests-per-minute live in the terminal.
- **🛠 Comprehensive SMM**: Support for Views, Likes, Shares, Favorites, and Live Stream views.

---

## 🚀 Installation

### Windows (Recommended)
Simply run the setup utility:
```bash
setup.bat
```

### Manual Installation
1. **Clone the repo:**
   ```bash
   git clone https://github.com/aaayafuj51-AYFJ/Aaayafuj_SMM.py.git
   cd Aaayafuj_SMM.py
   ```

2. **Install requirements:**
   *If you encounter "Fatal error in launcher", use this command:*
   ```bash
   python -m pip install -r requirements.txt
   ```

3. **Run the tool:**
   ```bash
   python main.py
   ```

---

## ❓ Troubleshooting

### "Fatal error in launcher"
This happens when your Windows `pip.exe` is broken or pointing to a deleted Python version. 
**Fix:** Always use `python -m pip` instead of just `pip`. 
Example: `python -m pip install -r requirements.txt`

### "ModuleNotFoundError"
Ensure you have installed all requirements using the command above. If you use a virtual environment, ensure it is activated.

---

## 📖 Configuration

- `config/devices.txt`: Add your device IDs in the format `device_id:install_id:cdid:openudid`.
- `video_links.txt`: List of TikTok Video IDs for the bot to target.
- `locale_lang.txt`: Configuration for region/language emulation.

---

## ⚠️ Disclaimer

This tool is for educational purposes only. Unauthorized automation of social media platforms may violate their terms of service. Use responsibly and at your own risk.

**Made with ❤️ by Aaayafuj**
