export interface MemoizeOptions {
    ttl?: number;
    verbose?: boolean;
    capacity?: number;
}
/**
 * Cache endpoints with the given params.
 *
 * @param {number} ttl
 * @returns {(target, propertyKey, descriptor: PropertyDescriptor) => void}
 * @constructor
 */
export declare const Memoize: ({ ttl, verbose, capacity }: MemoizeOptions) => (target: any, propertyKey: any, descriptor: PropertyDescriptor) => void;
