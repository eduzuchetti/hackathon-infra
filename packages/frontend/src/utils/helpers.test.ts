// Basic helper functions test

describe('Basic Tests', () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(1 + 2).toBe(3);
  });
  
  test('true should be truthy', () => {
    expect(true).toBeTruthy();
  });
  
  test('false should be falsy', () => {
    expect(false).toBeFalsy();
  });
}); 