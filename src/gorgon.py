import hashlib
import time

class Gorgon:
    """
    Signature generation logic for TikTok/Aaayafuj API requests.
    """
    def __init__(self, params: str, cookies: str = None, data: str = None, unix: int = None):
        self.params = params
        self.cookies = cookies
        self.data = data
        self.unix = unix if unix else int(time.time())

    def hash(self, data):
        try:
            return hashlib.md5(data.encode()).hexdigest()
        except Exception:
            return hashlib.md5(data).hexdigest()

    def get_value(self):
        """
        Calculates the X-Gorgon and X-Khronos headers.
        """
        # Simplified representation of the signature logic
        # For the full version, we hash the parameters and apply specific offsets
        gorgon_hash = self.hash(self.params)
        return {
            "X-Gorgon": "8402005" + gorgon_hash[:16],
            "X-Khronos": str(self.unix)
        }
