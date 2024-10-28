const NodeCache = require("node-cache");

const cache = new NodeCache({ stdTTL: 300 });

export const getCache = (key: string): any => {
  return cache.get(key); 
};

export const setCache = (key: string, value: any): void => {
  cache.set(key, value);
  console.log(`Set Cache: Key = ${key}, Value = ${JSON.stringify(value, null, 2)}`);
};


export const deleteCache = (key: string): void => {
  cache.del(key);
  console.log(`Delete Cache: Key = ${key}`);
};

 // returns an array of all cache keys
export const getCacheKeys = (): string[] => {
  return cache.keys();
};

// Delete all cache keys that start with a specific prefix
export const deleteCacheByPrefix = (prefix: string): void => {
  const allKeys = getCacheKeys();
  allKeys.forEach((key) => {
    if (key.startsWith(prefix)) {
      deleteCache(key);
    }
  });
  console.log(`Delete Cache: All keys starting with '${prefix}' have been deleted`);
};

export const clearCache = (): void => {
  cache.flushAll();
  console.log(`Clear Cache: All cache cleared`);
};



