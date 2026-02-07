import sys
import os

# Add the current directory to sys.path to resolve 'src' imports correctly
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from src.main_menu import MainMenu
from src.utils import set_console_title

def main():
    """
    Aaayafuj_SMM.py - Main Entry Point
    """
    # Set the console title for better UI/UX
    set_console_title("[Aaayafuj SMM Suite] - TikTok Ultimate Bot Core")
    
    try:
        app = MainMenu()
        app.run()
    except KeyboardInterrupt:
        print("\n\n[!] Application interrupted by user. Exiting...")
        sys.exit(0)
    except Exception as e:
        print(f"\n[FATAL ERROR] {str(e)}")
        # Print traceback for easier debugging if needed
        import traceback
        traceback.print_exc()
        sys.exit(1)

if __name__ == "__main__":
    main()
