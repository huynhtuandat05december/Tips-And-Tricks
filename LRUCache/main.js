class LRUCache {
  constructor(size) {
    this.size = size || 3;
    this.cache = new Map();
  }
  get(key) {
    const existingKey = this.cache.has(key);
    if (existingKey) {
      const value = this.cache.get(key);
      this.cache.delete(key);
      this.cache.set(key, value);
      return value;
    }
    return -1;
  }
  put(key, value) {
    const existingKey = this.cache.has(key);
    if (existingKey) {
      this.cache.delete(key);
    }
    this.cache.set(key, value);
    if (this.cache.size > this.size) {
      this.cache.delete(this.cache.keys().next().value);
    }
  }
  items() {
    return this.cache.entries();
  }
}
