// export const serverUrl = {
//   user: "https://services.user.aliste.io",
//   sub: "https://subscriptioncloud.alistetechnologies.com",
//   auth: "https://api.oauth.alistetechnologies.com",
//   analytics: "https://c6qofus8ee.execute-api.ap-south-1.amazonaws.com/default",
//   connection: "https://s9lisn1w1b.execute-api.ap-south-1.amazonaws.com/default",
//   deviceHandler:
//     "https://v3kglrcssj.execute-api.ap-south-1.amazonaws.com/default",
//   web: "https://web.alistetechnologies.com",
//   lockservice:
//     "https://9qqqknyk98.execute-api.ap-south-1.amazonaws.com/default",
//   a2: "https://a3.alistetechnologies.com",
//   deviceApi: "https://keiozfbox5.execute-api.ap-south-1.amazonaws.com/default",
//   deviceService:
//     "https://v3kglrcssj.execute-api.ap-south-1.amazonaws.com/default",
// };

const ENV_MODE = import.meta.env.VITE_MODE || "TEST";
console.debug("ENV_MODE", ENV_MODE);

/**
 * @typedef {Object} Urls
 * @property {string} user
 * @property {string} sub
 * @property {string} auth
 * @property {string} analytics
 * @property {string} connection
 * @property {string} deviceHandler
 * @property {string} web
 * @property {string} lockservice
 * @property {string} a2
 * @property {string} deviceApi
 * @property {string} deviceService
 */

/**
 * @type {{ STAGE: Urls, PROD: Urls, TEST: Urls }}
 */
const URLS = {
  STAGE: {
    user: "https://services.user.aliste.io",
    sub: "https://staging.main.aliste.io",
    auth: "https://staging.oauth.aliste.io",
    analytics:
      "https://c6qofus8ee.execute-api.ap-south-1.amazonaws.com/default",
    connection:
      "https://s9lisn1w1b.execute-api.ap-south-1.amazonaws.com/default",
    deviceHandler:
      "https://v3kglrcssj.execute-api.ap-south-1.amazonaws.com/default",
    web: "https://staging.main.aliste.io",
    lockservice:
      "https://9qqqknyk98.execute-api.ap-south-1.amazonaws.com/default",
    a2: "https://staging.main.aliste.io",
    deviceApi:
      "https://keiozfbox5.execute-api.ap-south-1.amazonaws.com/default",
    deviceService:
      "https://v3kglrcssj.execute-api.ap-south-1.amazonaws.com/default",
  },
  PROD: {
    user: "https://services.user.aliste.io",
    sub: "https://subscriptioncloud.alistetechnologies.com",
    auth: "https://api.oauth.alistetechnologies.com",
    analytics:
      "https://c6qofus8ee.execute-api.ap-south-1.amazonaws.com/default",
    connection:
      "https://s9lisn1w1b.execute-api.ap-south-1.amazonaws.com/default",
    deviceHandler:
      "https://v3kglrcssj.execute-api.ap-south-1.amazonaws.com/default",
    web: "https://web.alistetechnologies.com",
    lockservice:
      "https://9qqqknyk98.execute-api.ap-south-1.amazonaws.com/default",
    a2: "https://a3.alistetechnologies.com",
    deviceApi:
      "https://keiozfbox5.execute-api.ap-south-1.amazonaws.com/default",
    deviceService:
      "https://v3kglrcssj.execute-api.ap-south-1.amazonaws.com/default",
  },
  TEST: {
    user: "https://services.user.aliste.io",
    sub: "https://test.alistetechnologies.com:9443",
    auth: "https://test.alistetechnologies.com:8443",
    analytics:
      "https://c6qofus8ee.execute-api.ap-south-1.amazonaws.com/default",
    connection:
      "https://s9lisn1w1b.execute-api.ap-south-1.amazonaws.com/default",
    deviceHandler:
      "https://v3kglrcssj.execute-api.ap-south-1.amazonaws.com/default",
    web: "https://test.alistetechnologies.com:9443",
    lockservice:
      "https://9qqqknyk98.execute-api.ap-south-1.amazonaws.com/default",
    a2: "https://test.alistetechnologies.com:9443",
    deviceApi:
      "https://keiozfbox5.execute-api.ap-south-1.amazonaws.com/default",
    deviceService:
      "https://v3kglrcssj.execute-api.ap-south-1.amazonaws.com/default",
  },
};

export const serverUrl = URLS[ENV_MODE] || URLS["STAGE"];

export const token =
  "Basic N0padjUwWG46RFFFWTdsdjUzcVg0bnFhVkxVd25TMmxuczlhUERPRzA=";
export const DeviceTypeMap = {
  FAN: 0,
  AC: 1,
  BULB: 2,
  CFL: 3,
  SOCKET: 4,
  GEYSER: 5,
  TUBELIGHT: 6,
  NA: 7,
  TWO_WAY: 8,
  SCENE: 9,
  NOVA: 10,
  MOTION_SENSOR: 11,
  TV: 12,
  SPEAKER: 13,
  FOUNTAIN: 14,
  BEDSIDE_LAMP: 15,
  CHANDELIER: 16,
  STRIP_LIGHT: 17,
  STUDY_LAMP: 18,
  LAMPS: 19,
  FAN_REGULATOR: 20,
};

export const unlockType = {
  1: "App unlock",
  2: "Touch the parking lock",
  3: "Gateway unlock",
  4: "Passcode unlock",
  5: "Parking lock raise",
  6: "Parking lock lower",
  7: "IC card unlock",
  8: "Fingerprint unlock",
  9: "Wristband unlock",
  10: "Mechanical key unlock",
  11: "Bluetooth lock",
  12: "Gateway unlock",
  29: "Unexpected unlock",
  30: "Door magnet close",
  31: "Door magnet open",
  32: "Open from inside",
  33: "Lock by fingerprint",
  34: "Lock by passcode",
  35: "Lock by IC card",
  36: "Lock by Mechanical key",
  37: "Remote Control",
  44: "Tamper alert",
  45: "Auto Lock",
  46: "Unlock by unlock key",
  47: "Lock by lock key",
  48: "Use INVALID Passcode several times",
};

export const otpType = {
  1: "One-time",
  2: "Permanent",
  3: "Period",
  4: "Delete",
  5: "Weekend Cyclic",
  6: "Daily Cyclic",
  7: "Workday Cyclic",
  8: "Monday Cyclic",
  9: "Tuesday Cyclic",
  10: "Wednesday Cyclic",
  11: "Thursday Cyclic",
  12: "Friday Cyclic",
  13: "Saturday Cyclic",
  14: "Sunday Cyclic",
};

export const remoteTypes = {
  0: "TV",
  1: "AC",
  2: "Speakers",
  3: "Set-top Box",
  6: "Custom",
};
