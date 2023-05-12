export interface MemoizeOptions {
    ttl?: number;
    verbose?: boolean;
    capacity?: number;
}
/**
 * Cache endpoints with the given params.
 *
 * @param {number} ttl
 * @param {boolean} verbose
 * @param {number} capacity
 * @returns {(target, propertyKey, descriptor: PropertyDescriptor) => void}
 * @constructor
 */
export declare const Memoize: ({ ttl, verbose, capacity }: MemoizeOptions) => (target: any, propertyKey: any, descriptor: PropertyDescriptor) => void;
