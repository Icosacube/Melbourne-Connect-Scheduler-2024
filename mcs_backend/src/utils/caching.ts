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


export const clearCache = (): void => {
  cache.flushAll();
  console.log(`Clear Cache: All cache cleared`);
};



