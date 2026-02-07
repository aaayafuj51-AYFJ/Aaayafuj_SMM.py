
import json
import os

class ServiceManager:
    def __init__(self):
        self.config_path = os.path.join('config', 'services.json')
        self.services = self.load_services()

    def load_services(self):
        try:
            with open(self.config_path, 'r') as f:
                data = json.load(f)
                return data.get('services', [])
        except FileNotFoundError:
            return []

    def get_service_by_id(self, service_id):
        for s in self.services:
            if s['id'] == service_id:
                return s
        return None

    def list_all(self):
        return self.services
