import time
import threading
import random
import sys
from src.utils import clear_console, print_banner, get_input, print_status, Colors
from src.api import AaayafujAPI

class MainMenu:
    def __init__(self):
        self.api = AaayafujAPI()
        self.success = 0
        self.fails = 0
        self.reqs = 0
        self.rps = 0
        self.rpm = 0
        self._lock = threading.Lock()
        self.running = False

    def run(self):
        while True:
            clear_console()
            print_banner()
            
            print("\n[1] - TikTok Video Views")
            print("[2] - TikTok Video Favorite")
            print("[3] - TikTok Video Share")
            print("[4] - TikTok Video Like (Heart)")
            print("[5] - TikTok Followers")
            print("[6] - TikTok Live Stream")
            print("[0] - Exit")
            
            choice = get_input("\nType option number : ")
            
            if choice == '0':
                break
            elif choice in ['1', '2', '3', '4', '5', '6']:
                self.start_automation(choice)
            else:
                print_status("Invalid selection!", Colors.red)
                time.sleep(1)

    def rps_loop(self):
        while self.running:
            initial = self.reqs
            time.sleep(1)
            self.rps = self.reqs - initial
            self.rpm = self.rps * 60

    def start_automation(self, choice):
        clear_console()
        print_banner()
        
        try:
            threads_count = int(get_input("Number of Threads: "))
            amount = int(get_input("Number of hits: "))
        except ValueError:
            print_status("Invalid input!", Colors.red)
            time.sleep(1.5)
            return

        hit_types = {
            '1': "views",
            '2': "favorites",
            '3': "shares",
            '4': "likes",
            '5': "followers",
            '6': "live_views"
        }
        
        hit_type = hit_types.get(choice, "views")
        self.success = 0
        self.fails = 0
        self.reqs = 0
        self.running = True

        threading.Thread(target=self.rps_loop, daemon=True).start()

        def worker():
            while self.running and self.success < amount:
                if not self.api.devices:
                    print_status("\n[!] No devices loaded!", Colors.red)
                    self.running = False
                    break
                
                device = random.choice(self.api.devices)
                res = self.api.send_hit(device, hit_type)
                
                with self._lock:
                    self.reqs += 1
                    if res:
                        self.success += 1
                        sys.stdout.write(f"\r{Colors.green}[SUCCESS]{Colors.white} Hits: {self.success} | {Colors.red}Fails: {self.fails}{Colors.white} | RPM: {self.rpm}")
                        sys.stdout.flush()
                    else:
                        self.fails += 1
                
                if self.success >= amount:
                    self.running = False
                    break

        print_status(f"\n[*] Starting {hit_type} automation with {threads_count} threads...", Colors.cyan)
        
        threads = []
        for _ in range(threads_count):
            t = threading.Thread(target=worker, daemon=True)
            t.start()
            threads.append(t)

        try:
            while self.running and self.success < amount:
                time.sleep(1)
        except KeyboardInterrupt:
            self.running = False
            print_status("\n[!] Stopping threads...", Colors.red)

        print_status(f"\n\n[!] Finished. Total Success: {self.success}", Colors.green)
        get_input("\nPress Enter to return to menu...")
