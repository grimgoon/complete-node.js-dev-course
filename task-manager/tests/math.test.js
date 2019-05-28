const {calculateTip, celsiusToFahrenheit, fahrenheitToCelsius, add} = require('../src/math')

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

test('Should convert celsius to fahrenheit', () => {
    const degree = celsiusToFahrenheit(0);
    expect(degree).toBe(32);
});

test('Should convert fahrenheit to celsius', () => {
    const degree = fahrenheitToCelsius(32);
    expect(degree).toBe(0);
});

// test('Async test demo', (done) => {
//     setTimeout(() => {
//         expect(1).toBe(2);
//         done();
//     }, 2000);
// });

test('Should add two numbers', async () => {
    const sum = await add(2,3);
    expect(sum).toBe(5);
});


// Why Test?
// - Saves time
// - Creates reliable software
// - Gives flexibility to developers
//  - Refactoring
//  - Collaborating
//  - Profiling
// - Peace of Mind