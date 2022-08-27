let _cache = {};

const cache = {
  /**
   * Set an item in the cache.
   * @param {String} key - Name of the key.
   * @param {*} value - Value to store.
   */
  set(key, value) {
    validateKey(key);

    _cache[key] = value;
  },

  /**
   * Retrieve an item from the cache.
   * @param {String} key - Name of the key the value was stored as.
   * @param {*} [defaultValue] - Default value to set if there is a cache miss. Functions are evaluated before caching. To override a value already saved, use `set()`.
   * @returns {*} The item stored
   */
  get(key, defaultValue) {
    validateKey(key);

    if (key in _cache) {
      return _cache[key];
    }

    if (arguments.length === 2) {
      this.set(
        key,
        typeof defaultValue === 'function' ? defaultValue() : defaultValue
      );
      return _cache[key];
    }
  },

  /**
   * Clear the cache.
   */
  clear() {
    _cache = {};
  }
};

function validateKey(key) {
  if (typeof key !== 'string') {
    throw new TypeError('cache key must be a string, ' + typeof key + ' given');
  }
}

export default cache;
