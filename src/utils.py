import os
from pystyle import Center, Colorate, Colors, Add, Write

def clear_console():
    os.system('cls' if os.name == 'nt' else 'clear')

def set_console_title(title):
    if os.name == 'nt':
        import ctypes
        ctypes.windll.kernel32.SetConsoleTitleW(title)
    else:
        print(f'\33]0;{title}\a', end='', flush=True)

def print_banner():
    banner_text = r"""
████████╗██╗██╗  ██╗████████╗ ██████╗ ██╗  ██╗    ██████╗  ██████╗ ████████╗
╚══██╔══╝██║██║ ██╔╝╚══██╔══╝██╔═══██╗██║ ██╔╝    ██╔══██╗██╔═══██╗╚══██╔══╝
   ██║   ██║█████╔╝    ██║   ██║   ██║█████╔╝     ██████╔╝██║   ██║   ██║   
   ██║   ██║██╔═██╗    ██║   ██║   ██║██╔═██╗     ██╔══██╗██║   ██║   ██║   
   ██║   ██║██║  ██╗   ██║   ╚██████╔╝██║  ██╗    ██████╔╝╚██████╔╝   ██║   
   ╚═╝   ╚═╝╚═╝  ╚═╝   ╚═╝    ╚═════╝ ╚═╝  ╚═╝    ╚═════╝  ╚═════╝    ╚═╝                                                                            
                                                   made by Aaayafuj
    """
    print(Center.XCenter(Colorate.Vertical(Colors.green_to_cyan, banner_text, 2)))

def get_input(text):
    return Write.Input(text, Colors.green_to_yellow, interval=0.0001)

def print_status(message, color=Colors.white):
    print(Colorate.Horizontal(color, message))
