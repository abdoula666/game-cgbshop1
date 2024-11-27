import axios from 'axios';
import OAuth from 'oauth-1.0a';
import CryptoJS from 'crypto-js';

const WOOCOMMERCE_URL = import.meta.env?.VITE_WOOCOMMERCE_URL || 'https://cgbshop1.com/wp-json/wc/v3';
const CONSUMER_KEY = import.meta.env?.VITE_CONSUMER_KEY || 'ck_da1507a982310e8a29d704df57b4e886b26d528a';
const CONSUMER_SECRET = import.meta.env?.VITE_CONSUMER_SECRET || 'cs_2917aeffff79c6bb2427849b617f0c992959f301';

const oauth = new OAuth({
  consumer: {
    key: CONSUMER_KEY,
    secret: CONSUMER_SECRET
  },
  signature_method: 'HMAC-SHA1',
  hash_function(base_string, key) {
    return CryptoJS.HmacSHA1(base_string, key).toString(CryptoJS.enc.Base64);
  }
});

export const verifyCustomer = async (email: string) => {
  try {
    const requestData = {
      url: `${WOOCOMMERCE_URL}/customers`,
      method: 'GET',
      data: { email }
    };

    const auth = oauth.authorize(requestData);
    const response = await axios.get(`${WOOCOMMERCE_URL}/customers`, {
      params: {
        email,
        consumer_key: CONSUMER_KEY,
        consumer_secret: CONSUMER_SECRET
      }
    });

    return response.data.length > 0;
  } catch (error) {
    console.error("WooCommerce API Error:", error);
    return false;
  }
};