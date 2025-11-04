import { openDB } from 'idb';

let dbPromise = null;

const getDbPromise = async() => {
  if (!dbPromise && typeof window !== 'undefined') {

    dbPromise = await openDB('trainingProgram', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: 'id' });
      }
    },
  })
   return dbPromise;
  } 
}

    const addData=async(storeName, items) =>{
      dbPromise = await openDB('trainingProgram', 2, {
        upgrade(db) {
          if (!db.objectStoreNames.contains(storeName)) {
            db.createObjectStore(storeName, { keyPath: 'id' });
          }
        },
      })
        const db = dbPromise;
        if (db==undefined) {
          console.log('Database instance is null, cannot proceed with transaction');
          return;
        }
        const tx = db.transaction(storeName, 'readwrite');
        const store = tx.store;
        try {
          console.log(items);
          await Promise.all(items.map(item => store.put(item)));
          await tx.done;
          return true;
        } catch (error) {
        if (error.name === 'AbortError') {
            console.error('Transaction aborted:', error);
            } else {
            console.error('Error storing data:', error);
            }
          return false;
        }
      }

    const updateData=async(storeName,items)=>{
      dbPromise = await openDB('trainingProgram', 2, {
        upgrade(db) {
          if (!db.objectStoreNames.contains(storeName)) {
            db.createObjectStore(storeName, { keyPath: 'id' });
          }
        },
      })
        const db = dbPromise;
        if (db==undefined) {
          console.log('Database instance is null, cannot proceed with transaction');
          return;
        }
        const tx = db.transaction(storeName, 'readwrite');
        const store = tx.store;
    
        try {
          for (const { id, ...updatedData } of items) {
            const existingRecord = await store.get(id); 
      
            if (existingRecord) {
             
              const updatedRecord = { ...existingRecord, ...updatedData };
      
              await store.put(updatedRecord);
            } else {
              await store.put({ id, ...updatedData });
            }
          }
    
          await tx.done;
    
          console.log('Items successfully updated in IndexedDB.');
          return true;
        } catch (error) {
          console.error('Error updating items in IndexedDB:', error);
          return false;
        }
    }

      const getAll=async(storeName) =>{
       
        dbPromise = await openDB('trainingProgram', 2, {
          upgrade(db) {
            if (!db.objectStoreNames.contains(storeName)) {
              db.createObjectStore(storeName, { keyPath: 'id' });
            }
          },
        })
          const db = dbPromise;
        if (db==undefined) {
          console.log('Database instance is null, cannot proceed with transaction');
          return;
        }
        const tx = db.transaction(storeName, 'readonly');
        const store = tx.store;
        
        const results = [];
        for await (const cursor of store) {
          results.push(cursor.value);
        }
        return results;
      }

      const deleteData = async(storeName, items) => {
        dbPromise = await openDB('trainingProgram', 2, {
          upgrade(db) {
            if (!db.objectStoreNames.contains(storeName)) {
              db.createObjectStore(storeName, { keyPath: 'id' });
            }
          },
        })
          const db = dbPromise;
        if (db==undefined) {
          console.log('Database instance is null, cannot proceed with transaction');
          return;
        }
        const tx = db.transaction(storeName, 'readwrite');
        const store = tx.store;

        try {
          await Promise.all(items.map(item => store.delete(item)));
          await tx.done;
          return true;
        } catch (error) {
          console.log(error);
          return false;
        }
      }

      const getData = async (storeName, id) => {
        dbPromise = await openDB('trainingProgram', 2, {
          upgrade(db) {
            if (!db.objectStoreNames.contains(storeName)) {
              db.createObjectStore(storeName, { keyPath: 'id' });
            }
          },
        })
          const db = dbPromise;
        if (db === undefined) {
          console.log('Database instance is null, cannot proceed with transaction');
          return null;
        }
      
        try {
          const tx = db.transaction(storeName, 'readonly');
          const store = tx.store;
          console.log(typeof id);
          const result = await store.get(Number(id)); 
          await tx.done;
          return result || null; 
        } catch (error) {
          console.error('Error retrieving data:', error);
          return null;
        }
      };

      export {addData,updateData,getAll,deleteData,getData,getDbPromise};