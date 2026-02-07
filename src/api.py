import requests
import random
import time
import os
import sys
from urllib.parse import urlencode
from src.gorgon import Gorgon

# Try to import Google GenAI, fallback gracefully if not installed
try:
    import google.generativeai as genai
    HAS_GENAI = True
except ImportError:
    HAS_GENAI = False

class AaayafujAPI:
    def __init__(self):
        self.session = requests.Session()
        # Disable insecure warnings for SSL-unverified requests
        from urllib3.exceptions import InsecureRequestWarning
        requests.packages.urllib3.disable_warnings(category=InsecureRequestWarning)
        
        self.api_key = os.environ.get("API_KEY")
        if self.api_key and HAS_GENAI:
            genai.configure(api_key=self.api_key)
            self.ai_model = genai.GenerativeModel('gemini-3-flash-preview')
        else:
            self.ai_model = None

        # Determine root path to ensure resource loading works regardless of where main.py is called from
        self.root_path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        self.load_resources()

    def load_resources(self):
        def read_file(filename):
            path = os.path.join(self.root_path, filename)
            if os.path.exists(path):
                with open(path, "r", encoding="utf-8") as f:
                    return [line.strip() for line in f.read().splitlines() if line.strip()]
            return []

        # Load resources from root or config folder
        self.locales = read_file("locale_lang.txt")
        self.regions = read_file("region_lang.txt")
        self.timezones = read_file("region_timezone.txt")
        self.video_ids = read_file("video_links.txt")
        self.room_ids = read_file("room_id.txt")
        self.sessions = read_file("sessions.txt")
        self.devices = read_file(os.path.join("config", "devices.txt"))
        
        self.domains = [
            "api-h2.tiktokv.com", "api22-core-c-useast1a.tiktokv.com", 
            "api19-core-c-useast1a.tiktokv.com", "api16-core-c-useast1a.tiktokv.com"
        ]

    def send_views(self, device_data):
        try:
            if not device_data or ':' not in device_data:
                return False
                
            parts = device_data.split(':')
            if len(parts) < 4: return False
            
            did, iid, cdid, oudid = parts[0], parts[1], parts[2], parts[3]
            
            aweme_id = random.choice(self.video_ids) if self.video_ids else "7123456789012345678"
            domain = random.choice(self.domains)
            
            params = {
                "device_id": did,
                "install_id": iid,
                "cdid": cdid,
                "openudid": oudid,
                "item_id": aweme_id,
                "play_delta": "1",
                "device_type": "SM-G960F",
                "os_version": "10",
                "version_code": "2022405030",
                "app_name": "musically_go",
                "channel": "googleplay",
                "device_platform": "android",
                "aid": "1340"
            }
            
            query_string = urlencode(params)
            sig = Gorgon(params=query_string).get_value()
            
            headers = {
                "X-Gorgon": sig["X-Gorgon"],
                "X-Khronos": sig["X-Khronos"],
                "User-Agent": "com.zhiliaoapp.musically/2022405030 (Linux; U; Android 10; en_US; SM-G960F; Build/QP1A.190711.020; Cronet/58.0.2991.0)",
                "Host": domain,
                "Connection": "Keep-Alive",
                "Accept-Encoding": "gzip"
            }
            
            # Use verify=False as the original script used unverified context
            resp = self.session.post(
                f"https://{domain}/aweme/v1/aweme/stats/?{query_string}", 
                headers=headers, 
                timeout=10, 
                verify=False
            )
            
            if resp.status_code == 200:
                data = resp.json()
                return data.get('status_code') == 0
            return False
        except Exception:
            return False

    def get_ai_advice(self, query):
        if not HAS_GENAI:
            return "AI Error: 'google-generativeai' package not installed."
        if not self.ai_model:
            return "AI Core Offline: API_KEY not set in environment variables."
        
        prompt = (
            "You are the Aaayafuj SMM Strategic Advisor. Your task is to provide technical, "
            "concise, and high-value advice on social media growth. User query: " + query
        )
        try:
            response = self.ai_model.generate_content(prompt)
            return response.text
        except Exception as e:
            return f"Gemini API Error: {str(e)}"
