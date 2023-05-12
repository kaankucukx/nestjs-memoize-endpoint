import {LRUCache} from "@memoize/lru-cache";

export interface MemoizeOptions {
  ttl?: number;
  verbose?: boolean;
  capacity?: number;
}

type CacheEntry = {
  value: any;
  timeoutId: NodeJS.Timeout;
};

/**
 * Cache endpoints with the given params.
 *
 * @param {number} ttl
 * @returns {(target, propertyKey, descriptor: PropertyDescriptor) => void}
 * @constructor
 */
export const Memoize = ({
                          ttl = 300000,
                          verbose = false,
                          capacity = 1000
                        } : MemoizeOptions): ((
    target: any,
    propertyKey: any,
    descriptor: PropertyDescriptor
) => void) => {
  return (target, propertyKey, descriptor) => {
    const originalMethod = descriptor.value;
    const cache: LRUCache<string, CacheEntry> = new LRUCache(capacity);

    descriptor.value = async function (...args: any) {
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
        const timeoutId : NodeJS.Timeout = setTimeout(() => cache.delete(cacheKey), ttl);
        cache.set(cacheKey, { value: result, timeoutId});

      } catch (e) {
        verbose && console.log("No record", cacheKey);
      }

      return result;
    };
  };
};
