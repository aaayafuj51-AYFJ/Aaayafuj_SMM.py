import requests
import random
import time
import os
import sys
from urllib.parse import urlencode
from src.gorgon import Gorgon
from src.utils import BlockCookies

class AaayafujAPI:
    def __init__(self):
        self.session = requests.Session()
        self.session.cookies.set_policy(BlockCookies())
        self.root_path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        self.load_resources()
        
        # Internal configuration from snippet
        self.domains = ["api-h2.tiktokv.com", "api22-core-c-useast1a.tiktokv.com", "api19-core-c-useast1a.tiktokv.com", "api16-core-c-useast1a.tiktokv.com", "api21-core-c-useast1a.tiktokv.com", "api19-core-useast5.us.tiktokv.com"]
        self.versions = ["190303", "190205", "190204", "190103", "180904", "180804", "180803", "180802", "270204"]
        self.offsets = ["-28800", "-21600"]

    def load_resources(self):
        def read_file(filename):
            path = os.path.join(self.root_path, filename)
            if os.path.exists(path):
                with open(path, "r", encoding="utf-8") as f:
                    return [line.strip() for line in f.read().splitlines() if line.strip()]
            return []

        self.locales = read_file("locale_lang.txt")
        self.regions = read_file("region_lang.txt")
        self.timezones = read_file("region_timezone.txt")
        self.video_ids = read_file("video_links.txt")
        self.room_ids = read_file("room_id.txt")
        self.sessions = read_file("sessions.txt")
        self.devices = read_file(os.path.join("config", "devices.txt"))

    def send_hit(self, device_data, hit_type="views"):
        """
        Sends a single hit (views/likes/shares/favorites) based on device data.
        """
        try:
            if not device_data or ':' not in device_data: return False
            did, iid, cdid, oudid = device_data.split(':')[:4]
            
            aweme_id = random.choice(self.video_ids) if self.video_ids else "7123456789012345678"
            domain = random.choice(self.domains)
            
            params = {
                "device_id": did,
                "install_id": iid,
                "cdid": cdid,
                "openudid": oudid,
                "item_id": aweme_id,
                "device_type": "SM-G9900",
                "os_version": "12",
                "version_code": random.choice(self.versions),
                "app_name": "musically_go",
                "device_platform": "android",
                "aid": "1340"
            }

            if hit_type == "views":
                params["play_delta"] = "1"
            elif hit_type == "shares":
                params["share_delta"] = "1"

            query_string = urlencode(params)
            sig = Gorgon(params=query_string).get_value()
            
            headers = {
                "X-Gorgon": sig["X-Gorgon"],
                "X-Khronos": sig["X-Khronos"],
                "User-Agent": "com.zhiliaoapp.musically/2022405030 (Linux; U; Android 12; en_US; SM-G9900; Build/SQ1A.211205.008; Cronet/58.0.2991.0)",
                "Host": domain,
                "Connection": "Keep-Alive"
            }

            url = f"https://{domain}/aweme/v1/aweme/stats/?{query_string}"
            if hit_type == "favorites":
                url = f"https://{domain}/aweme/v1/aweme/collect/?aweme_id={aweme_id}&{query_string}"
            
            resp = self.session.post(url, headers=headers, timeout=10, verify=False)
            
            if resp.status_code == 200:
                return resp.json().get('status_code') == 0
            return False
        except:
            return False
