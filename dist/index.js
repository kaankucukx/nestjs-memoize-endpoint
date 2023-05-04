"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Memoize = void 0;
/**
 * Cache endpoints with the given params.
 *
 * @param {number} ttl
 * @returns {(target, propertyKey, descriptor: PropertyDescriptor) => void}
 * @constructor
 */
const Memoize = (ttl = 300000) => {
    return (target, propertyKey, descriptor) => {
        const originalMethod = descriptor.value;
        const cache = new Map();
        function removeCache(cacheKey) {
            cache.delete(cacheKey);
        }
        descriptor.value = async function (...args) {
            const cacheKey = JSON.stringify(args);
            if (cache.has(cacheKey)) {
                console.log("Cache hit:", cacheKey);
                return cache.get(cacheKey);
            }
            // console.log("Cache miss:", cacheKey);
            let result;
            try {
                result = await originalMethod.apply(this, args);
                cache.set(cacheKey, result);
            }
            catch (e) {
                console.log("No record", cacheKey);
            }
            setTimeout(() => removeCache(cacheKey), ttl);
            return result;
        };
    };
};
exports.Memoize = Memoize;
