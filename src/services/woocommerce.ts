import { api } from './api';

export const verifyCustomer = async (email: string): Promise<boolean> => {
  if (!email || !email.includes('@')) {
    return false;
  }

  try {
    const response = await api.get('/customers', {
      params: { 
        email,
        per_page: 1
      }
    });

    // Check if we have a valid response with customer data
    if (response.data && Array.isArray(response.data) && response.data.length > 0) {
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('WooCommerce verification failed:', error);
    throw new Error("Cette adresse email n'existe pas dans notre base de données Cgbshop1");
  }
};