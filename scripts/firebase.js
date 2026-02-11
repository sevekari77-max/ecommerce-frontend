import { initializeApp } from
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

import { getAuth } from
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDXn3C5ccaq1hlVEJ_9AFRA9_efKBibVS0",
  authDomain: "shopeasy-auth-2305c.firebaseapp.com",
  projectId: "shopeasy-auth-2305c",
  storageBucket: "shopeasy-auth-2305c.firebasestorage.app",
  messagingSenderId: "954677388907",
  appId: "1:954677388907:web:7d7cdf3445b0eefffb732e"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
