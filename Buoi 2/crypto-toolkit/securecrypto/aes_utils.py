import os
import base64
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives.ciphers.aead import AESGCM


def derive_key_from_password(password: str, salt: bytes) -> bytes:
    kdf = PBKDF2HMAC(
        algorithm=hashes.SHA256(),
        length=32,
        salt=salt,
        iterations=100_000,
        backend=default_backend()
    )
    return kdf.derive(password.encode())


def encrypt_file_aes(filepath, password):
    salt = os.urandom(16)
    key = derive_key_from_password(password, salt)
    aesgcm = AESGCM(key)
    nonce = os.urandom(12)
    with open(filepath, 'rb') as f:
        data = f.read()
    ct = aesgcm.encrypt(nonce, data, None)
    with open(filepath + '.enc', 'wb') as f:
        f.write(salt + nonce + ct)
    return base64.b64encode(key).decode()


def decrypt_file_aes(encrypted_file, key_or_password):
    with open(encrypted_file, 'rb') as f:
        raw = f.read()
    salt = raw[:16]
    nonce = raw[16:28]
    ct = raw[28:]
    try:
        decoded = base64.b64decode(key_or_password)
        if len(decoded) == 32:
            key = decoded
        else:
            key = derive_key_from_password(key_or_password, salt)
    except Exception:
        key = derive_key_from_password(key_or_password, salt)

    aesgcm = AESGCM(key)
    pt = aesgcm.decrypt(nonce, ct, None)
    out_path = encrypted_file.replace('.enc', '.dec')
    if out_path == encrypted_file:
        out_path += '.dec'
    with open(out_path, 'wb') as f:
        f.write(pt)
    return out_path
