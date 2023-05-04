/**
 * Cache endpoints with the given params.
 *
 * @param {number} ttl
 * @returns {(target, propertyKey, descriptor: PropertyDescriptor) => void}
 * @constructor
 */
export const Memoize = (
  ttl = 300000
): ((
  target: any,
  propertyKey: any,
  descriptor: PropertyDescriptor
) => void) => {
  return (target, propertyKey, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;
    const cache: Map<string, Record<string, string>> = new Map();

    function removeCache(cacheKey: string) {
      cache.delete(cacheKey);
    }

    descriptor.value = async function (...args: any) {
      const cacheKey = JSON.stringify(args);

      if (cache.has(cacheKey)) {
        // console.log("Cache hit:", cacheKey);
        return cache.get(cacheKey);
      }

      console.log("Cache miss:", cacheKey);
      let result;
      try {
        result = await originalMethod.apply(this, args);
        cache.set(cacheKey, result);
      } catch (e) {
        // console.log("No record", cacheKey);
      }
      setTimeout(() => removeCache(cacheKey), ttl);

      return result;
    };
  };
};
