"use strict";
// Same-origin by default. CHANGE BEFORE PUBLISHING if using separate API hosting;
// also update the backend CORS allowlist and connect-src policy.
window.CollegeAPI = Object.freeze({
 async get(path) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 6000);
  try {
   const response = await fetch(path, {headers:{Accept:"application/json"},signal:controller.signal});
   if (!response.ok) throw new Error("Content temporarily unavailable.");
   return await response.json();
  } finally {clearTimeout(timeout);}
 }
});
