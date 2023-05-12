"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Memoize = void 0;
const lru_cache_1 = require("@memoize/lru-cache");
/**
 * Cache endpoints with the given params.
 *
 * @param {number} ttl
 * @param {boolean} verbose
 * @param {number} capacity
 * @returns {(target, propertyKey, descriptor: PropertyDescriptor) => void}
 * @constructor
 */
const Memoize = ({ ttl = 300000, verbose = false, capacity = 1000 }) => {
    return (target, propertyKey, descriptor) => {
        const originalMethod = descriptor.value;
        const cache = new lru_cache_1.LRUCache(capacity);
        descriptor.value = async function (...args) {
            const cacheKey = JSON.stringify(args);
            const cachedEntry = cache.get(cacheKey);
            if (cachedEntry) {
                verbose && console.log("Cache hit:", cacheKey);
                return cachedEntry.value;
            }
            let result;
            try {
                result = await originalMethod.apply(this, args);
                // Set the new value and timeout
                const timeoutId = setTimeout(() => cache.delete(cacheKey), ttl);
                cache.set(cacheKey, { value: result, timeoutId });
                verbose && console.log("Cache miss:", cacheKey);
            }
            catch (e) {
                verbose && console.error(e);
            }
            return result;
        };
    };
};
exports.Memoize = Memoize;
