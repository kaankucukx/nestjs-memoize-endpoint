"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LRUCache = void 0;
class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = new Map();
    }
    get(key) {
        const temp = this.cache.get(key);
        if (temp !== undefined) {
            this.cache.delete(key);
            this.cache.set(key, temp);
        }
        return temp;
    }
    set(key, value) {
        if (this.cache.has(key)) {
            this.cache.delete(key);
        }
        else if (this.cache.size >= this.capacity) {
            const firstKey = this.cache.keys().next().value;
            this.cache.delete(firstKey);
        }
        this.cache.set(key, value);
    }
    delete(key) {
        this.cache.delete(key);
    }
}
exports.LRUCache = LRUCache;
