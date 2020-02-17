import CryptoJS from 'crypto-js'
import config from '../static/config'
const key = CryptoJS.enc.Utf8.parse(md5encode(config.key));
const iv = CryptoJS.enc.Utf8.parse(getHalfMD5(config.iv));

function Decrypt(word) {
    let encryptedHexStr = CryptoJS.enc.Hex.parse(word);
    let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
    let decrypt = CryptoJS.AES.decrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedStr.toString());
}

function Encrypt(data) {
    let srcs = CryptoJS.enc.Utf8.parse(JSON.stringify(data));
    let edata = CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    return edata.ciphertext.toString().toUpperCase();
}

function md5encode(word) {
    return CryptoJS.MD5(word).toString();
}
function getHalfMD5(word) {
    return md5encode(word).slice(0, 16);
}

export default {
    Decrypt,
    Encrypt
}