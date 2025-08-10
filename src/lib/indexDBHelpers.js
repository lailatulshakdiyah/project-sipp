// // lib/indexedDBHelpers.js

// const DB_NAME = "SIPP-Cache";
// const DB_VERSION = 1;
// const STORE_NAME = "Wilayah";

// export function openDB() {
//   return new Promise((resolve, reject) => {
//     const request = indexedDB.open(DB_NAME, DB_VERSION);

//     request.onerror = (event) => reject("Failed to open DB: " + event.target.errorCode);

//     request.onsuccess = (event) => resolve(event.target.result);

//     request.onupgradeneeded = (event) => {
//       const db = event.target.result;
//       if (!db.objectStoreNames.contains(STORE_NAME)) {
//         db.createObjectStore(STORE_NAME, { keyPath: "id" });
//       }
//     };
//   });
// }

// export async function saveWilayahToCache(data) {
//   const db = await openDB();
//   const tx = db.transaction(STORE_NAME, "readwrite");
//   const store = tx.objectStore(STORE_NAME);
//   data.forEach((item) => store.put(item));
//   return tx.complete;
// }

// export async function getWilayahFromCache() {
//   const db = await openDB();
//   const tx = db.transaction(STORE_NAME, "readonly");
//   const store = tx.objectStore(STORE_NAME);
//   return new Promise((resolve, reject) => {
//     const request = store.getAll();
//     request.onsuccess = () => resolve(request.result);
//     request.onerror = () => reject("Failed to get data from cache");
//   });
// }

// export async function clearWilayahCache() {
//   const db = await openDB();
//   const tx = db.transaction(STORE_NAME, "readwrite");
//   const store = tx.objectStore(STORE_NAME);
//   store.clear();
//   return tx.complete;
// }
