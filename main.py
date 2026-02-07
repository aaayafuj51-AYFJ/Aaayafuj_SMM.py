import sys
import os
import ssl
import requests
from urllib3.exceptions import InsecureRequestWarning

# Dependency Check
try:
    import pystyle
    import google.generativeai
except ImportError:
    print("\n[!] Missing dependencies. Please run: python -m pip install -r requirements.txt")
    sys.exit(1)

# Add current directory to path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from src.main_menu import MainMenu
from src.utils import set_console_title, clear_console

# Global configuration and initialization
requests.packages.urllib3.disable_warnings(category=InsecureRequestWarning)
ssl._create_default_https_context = ssl._create_unverified_context

def main():
    """
    Aaayafuj_SMM.py - High Performance TikTok Bot Core
    """
    set_console_title("[TikTok Ultimate Bot] Aaayafuj_SMM.py")
    clear_console()
    
    try:
        app = MainMenu()
        app.run()
    except KeyboardInterrupt:
        print("\n\n[!] Interrupted by user. Exiting...")
        sys.exit(0)
    except Exception as e:
        print(f"\n[FATAL ERROR] {str(e)}")
        import traceback
        traceback.print_exc()
        sys.exit(1)

if __name__ == "__main__":
    main()
