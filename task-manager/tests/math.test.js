const {calculateTip} = require('../src/math')

test('Should calculate total with tip',() => {
    const total = calculateTip(10,.3);
    
    // Normal Way: 
    // if(total !== 13) {
    //     throw new Error('Total tip should be 13. Got ' + total);
    // }

    //Jest way:
    expect(total).toBe(13);
});

test('Should calculate tip with default tip', () => {
    const total = calculateTip(10);
    expect(total).toBe(12.5);
})

// Why Test?
// - Saves time
// - Creates reliable software
// - Gives flexibility to developers
//  - Refactoring
//  - Collaborating
//  - Profiling
// - Peace of Mind