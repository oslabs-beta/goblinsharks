const  enableTracking  = require('../src/enableTracking');

test('should return an object', () => {
    expect(typeof enableTracking({})).toBe('object')
})


// test('checking if filds value is right', () => {
//     console.log(enableTracking);
//     expect(JSON.stringify(enableTracking.fields)).toBe(JSON.stringify(Object.keys(resolversObject)))

// })
