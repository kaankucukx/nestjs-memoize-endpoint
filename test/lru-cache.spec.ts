import {LRUCache} from "@memoize/lru-cache";


describe('LRUCache', () => {
    let cache: LRUCache<string, number>;
    beforeEach(() => {
        cache = new LRUCache<string, number>(3);
    });
    it('should set and get values', () => {
        cache.set('a', 1);
        expect(cache.get('a')).toEqual(1);
    });

    it('should return undefined for get on empty cache', () => {
        expect(cache.get('a')).toBeUndefined();
    });

    it('should handle set, get, delete, and get operations', () => {
        cache.set('a', 1);
        expect(cache.get('a')).toEqual(1);
        cache.delete('a');
        expect(cache.get('a')).toBeUndefined();
    });

    it('should evict least recently used key when capacity is reached', () => {
        cache.set('a', 1);
        cache.set('b', 2);
        cache.set('c', 3);
        expect(cache.get('a')).toBeUndefined();
        expect(cache.get('b')).toEqual(2);
        expect(cache.get('c')).toEqual(3);
    });

    it('should update the order of keys when get is called', () => {
        cache.set('a', 1);
        cache.set('b', 2);
        cache.set('c', 3);
        cache.get('a');
        cache.set('d', 4);
        expect(cache.get('a')).toEqual(1);
        expect(cache.get('b')).toBeUndefined();
        expect(cache.get('c')).toEqual(3);
        expect(cache.get('d')).toEqual(4);
    });
});
