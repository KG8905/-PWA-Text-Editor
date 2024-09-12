import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Method to add or update content in the database
export const putDb = async (content) => {
  console.log('PUT to the database');
  
  // Open a connection to the database
  const jateDb = await openDB('jate', 1);

  // Create a transaction and specify the store and privileges
  const tx = jateDb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');

  // Use .put() method to update/add data
  const request = store.put({ id: 1, value: content });

  // Await the transaction to complete
  const result = await request;
  console.log('🚀 - data saved to the database', result);
};

// Method to get all content from the database
export const getDb = async () => {
  console.log('GET from the database');

  // Open a connection to the database
  const jateDb = await openDB('jate', 1);

  // Create a transaction and specify the store
  const tx = jateDb.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');

  // Get all the data from the store
  const request = store.getAll();

  // Await the result of the request
  const result = await request;
  console.log('result.value', result);
  return result?.[0]?.value;  // Returning the first entry's value if it exists
};

initdb();
