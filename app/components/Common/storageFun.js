import CryptoAES from "crypto-js/aes";
import CryptoENC from "crypto-js/enc-utf8";

export const getCookieData = (name) => {
  let cookieName = name + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      let value = c.substring(cookieName.length, c.length);
      if (Number.isInteger(parseInt(value))) {
        return parseInt(value);
      } else {
        let _cipherText = CryptoAES.decrypt(value.toString(), "uftKey");
        let cookieValue = JSON.parse(_cipherText.toString(CryptoENC));
        return cookieValue;
      }
    }
  }
  return null;
};

export const setCookieData = (name, value, time) => {
  let expires = "";
  if (time) {
    expires = "; expires=" + time;
  }
  let encryptedValue = Number.isInteger(value)
    ? value
    : CryptoAES.encrypt(value, "uftKey");

  document.cookie = name + "=" + encryptedValue + expires + "; path=/";
};

export const expireCookie = (name) => {
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
};
