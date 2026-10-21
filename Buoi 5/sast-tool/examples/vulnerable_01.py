password = "123456"  # Hardcoded password

import pickle  # Co the gay nguy hiem


def unsafe_func(data):
    return eval(data)  # Rat nguy hiem, eval dung tuy y


def safe_func():
    print("Hello world!")


if __name__ == "__main__":
    unsafe_func("2 + 2")
    safe_func()
