import time
import threading
import random
import sys
import os

# Use absolute imports for better reliability in CLI entry points
from src.utils import clear_console, print_banner, get_input, print_status, Colors
from src.api import AaayafujAPI

class MainMenu:
    def __init__(self):
        self.api = AaayafujAPI()
        self.success = 0
        self.fails = 0
        self._lock = threading.Lock()
        self.running_automation = False

    def run(self):
        while True:
            clear_console()
            print_banner()
            print("\n[1] - TikTok Video Views")
            print("[2] - TikTok Video Favorite")
            print("[3] - TikTok Video Share")
            print("[4] - TikTok Video Like (Heart)")
            print("[5] - AI SMM Consultant (Strategy Core)")
            print("[6] - Exit")
            
            choice = get_input("\nSelection > ")
            
            if choice == '6':
                print_status("Goodbye!", Colors.cyan)
                break
            elif choice == '5':
                self.ai_mode()
            elif choice in ['1', '2', '3', '4']:
                self.start_automation(choice)
            else:
                print_status("Invalid Selection!", Colors.red)
                time.sleep(1)

    def ai_mode(self):
        clear_console()
        print_banner()
        print_status("\n--- Aaayafuj AI Intelligence Core ---", Colors.purple)
        query = get_input("Your Query (or 'q' to back): ")
        if query.lower() == 'q': return
        
        print_status("\nProcessing query through Aaayafuj nodes...")
        result = self.api.get_ai_advice(query)
        print(f"\n{Colors.white}{result}\n")
        get_input("Press Enter to continue...")

    def start_automation(self, mode):
        clear_console()
        print_banner()
        
        modes = {
            '1': "Video Views",
            '2': "Video Favorites",
            '3': "Video Shares",
            '4': "Video Likes"
        }
        
        print_status(f"\n--- Starting {modes[mode]} Automation ---", Colors.yellow)
        
        try:
            t_input = get_input("Threads count (e.g., 50): ")
            threads_count = int(t_input) if t_input.strip() else 10
            
            a_input = get_input("Target amount (e.g., 1000): ")
            amount = int(a_input) if a_input.strip() else 100
        except ValueError:
            print_status("Invalid numeric input!", Colors.red)
            time.sleep(1.5)
            return
        
        self.success = 0
        self.fails = 0
        self.running_automation = True
        
        def worker():
            while self.running_automation and self.success < amount:
                if not self.api.devices:
                    print_status("No devices found in config/devices.txt!", Colors.red)
                    break
                    
                device = random.choice(self.api.devices)
                # In a real scenario, different modes would call different endpoints
                # For this implementation, we use the primary stats endpoint
                res = self.api.send_views(device)
                
                with self._lock:
                    if res:
                        self.success += 1
                        # Throttle printing slightly or use sys.stdout for speed
                        sys.stdout.write(f"\r{Colors.green}[SUCCESS]{Colors.white} Total: {self.success} | {Colors.red}Fails: {self.fails}{Colors.white}")
                        sys.stdout.flush()
                    else:
                        self.fails += 1
                
                if self.success >= amount:
                    self.running_automation = False
                    break

        print_status(f"\n[*] Deploying {threads_count} threads...", Colors.cyan)
        
        threads = []
        for _ in range(threads_count):
            t = threading.Thread(target=worker)
            t.daemon = True
            t.start()
            threads.append(t)

        try:
            while self.success < amount and self.running_automation:
                time.sleep(0.5)
        except KeyboardInterrupt:
            self.running_automation = False
            print_status("\n[!] Stopping threads...", Colors.red)

        print_status(f"\n\n[!] Task completed. Final Count: {self.success}", Colors.green)
        get_input("\nPress Enter to return to menu...")
