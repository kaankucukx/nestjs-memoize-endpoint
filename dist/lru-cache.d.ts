export declare class LRUCache<K, V> {
    private readonly capacity;
    private readonly cache;
    constructor(capacity: number);
    get(key: K): V | undefined;
    set(key: K, value: V): void;
    delete(key: K): void;
}
