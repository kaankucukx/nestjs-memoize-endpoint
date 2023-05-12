export class LRUCache<K, V> {
    private readonly capacity: number;
    private readonly cache: Map<K, V>;

    constructor(capacity: number) {
        this.capacity = capacity;
        this.cache = new Map();
    }

    get(key: K): V | undefined {
        const temp = this.cache.get(key);
        if (temp !== undefined) {
            this.cache.delete(key);
            this.cache.set(key, temp);
        }
        return temp;
    }

    set(key: K, value: V): void {
        if (this.cache.has(key)) {
            this.cache.delete(key);
        } else if (this.cache.size >= this.capacity) {
            const firstKey = this.cache.keys().next().value;
            this.cache.delete(firstKey);
        }
        this.cache.set(key, value);
    }

    delete(key: K): void {
        this.cache.delete(key);
    }
}
