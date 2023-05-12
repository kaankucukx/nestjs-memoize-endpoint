import { Memoize } from '@memoize/index';


let mockSet: jest.Mock = jest.fn();
let mockGet: jest.Mock = jest.fn();
let mockDelete: jest.Mock = jest.fn();
let mockFunction: jest.Mock = jest.fn();

jest.mock('@memoize/lru-cache', () => {
    return {
        LRUCache: jest.fn().mockImplementation(() => ({
            set: mockSet,
            get: mockGet,
            delete: mockDelete,
        })),
    };
});
class TestClass {

    @Memoize({ ttl: 1000, verbose: false, capacity: 1 })
    async testMethod(param: any) {
        return mockFunction(param);
    }
}



describe('Memoize', () => {

    let testObject: TestClass;

    beforeEach(() => {
        // Clear all instances and calls to constructor and all methods
        testObject = new TestClass();
    });
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should set if not hit', async () => {

        await testObject.testMethod('param1');
        expect(mockSet).toHaveBeenCalled();
        expect(mockFunction).toHaveBeenCalledWith('param1');

    });

    it('should hit the cache', async () => {
        const value = "value";
        mockGet.mockReturnValueOnce({ value });
        const result = await testObject.testMethod('param1');
        expect(mockGet).toHaveBeenCalled();
        expect(mockFunction).not.toHaveBeenCalled();
        expect(result).toEqual(value);
    });
    it('should delete the cache', async () => {
        const value = "value";
        mockFunction.mockReturnValue(value );
        const response = await testObject.testMethod('param1');
        expect(mockFunction).toHaveBeenCalled();
        expect(response).toEqual(value);
        await new Promise(resolve => setTimeout(resolve, 1000));
        expect(mockDelete).toHaveBeenCalled();
        const response2 =   await testObject.testMethod('param1');
        expect(response2).toBe(value);

    });
    it('should call delete if more elements that capacity is added', async () => {
        const value = "value";
        mockFunction.mockReturnValue(value );
        await testObject.testMethod('param1');
        await testObject.testMethod('param2');
        expect(mockDelete).toHaveBeenCalled();
        expect(mockDelete).toHaveBeenCalledWith(JSON.stringify(['param1']));
        expect(mockFunction).toHaveBeenCalledTimes(2);

    });
});
