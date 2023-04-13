/**
 * Cache endpoints with the given params.
 *
 * @param {number} ttl
 * @returns {(target, propertyKey, descriptor: PropertyDescriptor) => void}
 * @constructor
 */
export declare const Memoize: (ttl?: number) => (target: any, propertyKey: any, descriptor: PropertyDescriptor) => void;
