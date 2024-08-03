// contains the function that we re-use across the project
import { async } from 'regenerator-runtime';
import { TIMEOUT_SEC } from './config';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPRO = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', // whe are telling to the api that the data we're gonna sent is in json format
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);

    // not return nothing, only update the 'state' object
    const fetchPro = fetch(url);
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data; // return promise
  } catch (err) {
    throw err;
  }
};

export const getJSON = async function (url) {
  // not return nothing, only update the 'state' object
  try {
    const fetchPro = fetch(url);
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data; // return promise
  } catch (err) {
    throw err;
  }
};

// Sending data with fetch data
export const sendJSON = async function (url, uploadData) {
  // not return nothing, only update the 'state' object
  try {
    const fetchPro = fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // whe are telling to the api that the data we're gonna sent is in json format
      },
      body: JSON.stringify(uploadData),
    });
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data; // return promise
  } catch (err) {
    throw err;
  }
};
