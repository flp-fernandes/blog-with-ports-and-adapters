import CryptoJS from 'crypto-js';

export class Encryption {
  encrypt(password: string) {
    const iv = CryptoJS.lib.WordArray.random(16);

    const encryptedData = CryptoJS.AES.encrypt(
      JSON.stringify(password),
      'sharedKey',
      {
        iv,
      }
    ).toString();

    return encryptedData;
  }

  decrypt(hash: string) {
    const descryptedBytes = CryptoJS.AES.decrypt(hash, 'shared');

    const decryptedData = JSON.parse(
      descryptedBytes.toString(CryptoJS.enc.Utf8)
    );

    return decryptedData;
  }
}
