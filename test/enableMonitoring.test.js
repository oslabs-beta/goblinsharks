const { enableMonitoring } = require('../src/main');
const {stateTypeResolvers } = require('../testResolvers/mockResolvers')

test('should return an object', () => {
    expect(typeof enableMonitoring({})).toBe('object')
})

test('resolver state does not change', () => {
    expect(JSON.stringify(enableMonitoring(stateTypeResolvers).State.name)).toBe((JSON.stringify(stateTypeResolvers.State.name)))
})

// test('resolver name does not change', () => {
//     expect(enableMonitoring(stateTypeResolvers).State.county.name).toBe(('name'))
// })

test('checking the state type', () => {
    console.log(stateTypeResolvers);
    expect(JSON.stringify(enableMonitoring(stateTypeResolvers))).toBe(JSON.stringify(stateTypeResolvers))

})

test('checking State total dosage', () => {
    expect(JSON.stringify(enableMonitoring(stateTypeResolvers).State.total_dosage)).toBe((JSON.stringify(stateTypeResolvers.State.total_dosage)))
})

test('checking total_manufactured', () => {
    expect(JSON.stringify(enableMonitoring(stateTypeResolvers).State.total_manufactured)).toBe((JSON.stringify(stateTypeResolvers.State.total_manufactured)))
})

test('Checking county', () => {
    expect(JSON.stringify(enableMonitoring(stateTypeResolvers).State.county)).toBe((JSON.stringify(stateTypeResolvers.State.county)))
})