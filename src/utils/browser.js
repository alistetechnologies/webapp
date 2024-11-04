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
