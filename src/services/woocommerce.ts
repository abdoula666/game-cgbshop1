import axios from 'axios';
import OAuth from 'oauth-1.0a';
import CryptoJS from 'crypto-js';
import { WooCommerceConfig } from '../types';

const config: WooCommerceConfig = {
  url: import.meta.env.VITE_WOOCOMMERCE_URL,
  consumerKey: import.meta.env.VITE_CONSUMER_KEY,
  consumerSecret: import.meta.env.VITE_CONSUMER_SECRET
};

const oauth = new OAuth({
  consumer: {
    key: config.consumerKey,
    secret: config.consumerSecret
  },
  signature_method: 'HMAC-SHA1',
  hash_function(base_string, key) {
    return CryptoJS.HmacSHA1(base_string, key).toString(CryptoJS.enc.Base64);
  }
});

export const verifyCustomer = async (email: string): Promise<boolean> => {
  try {
    const requestData = {
      url: `${config.url}/customers`,
      method: 'GET',
      data: { email }
    };

    const auth = oauth.authorize(requestData);
    const response = await axios.get(`${config.url}/customers`, {
      params: {
        email,
        consumer_key: config.consumerKey,
        consumer_secret: config.consumerSecret
      }
    });

    return response.data.length > 0;
  } catch (error) {
    console.error("WooCommerce API Error:", error);
    return false;
  }
};
