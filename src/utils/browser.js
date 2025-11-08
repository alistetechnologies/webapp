import { octiotUrl } from '@/constants/config';
import crypto from 'crypto-js';

export const getBrowserDetails = () => {
  const userAgent = navigator.userAgent;
  const language = navigator.language;

  return {
    userAgent,
    language,
  };
};

export const getDeviceIdentifier = () => {
  const { userAgent, language } = getBrowserDetails();

  const uniqueId = `${userAgent}-${language}-${new Date().getTime()}`;
  const hashed = crypto.SHA256(uniqueId).toString();

  return hashed;
};

export let isOctiot = document.URL.includes(octiotUrl)

export const faviconUpdate = async () => {
      //grab favicon element by ID
      const favicon = window.document.getElementById("favicon");
    
      //check count value, if below 0 we change href property to our red circle image path
      if (isOctiot) {
        favicon.href = `/OCTIOT.ico`;
        document.title = "Energy Savings"
      }
      //if above 0, we set back to green
      else {
        favicon.href = `/favicon.ico`;
      }
};