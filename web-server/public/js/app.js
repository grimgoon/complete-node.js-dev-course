console.log('Client side javascript file is loaded!');



const search = document.querySelector('input');
const formElement = document.querySelector('form');

formElement.addEventListener('submit', (event) => {
    event.preventDefault();

    const location = search.value;

    fetch('http://localhost:3000/weather/?address=' + location).then((res) => {
        res.json().then((data) => {
            if(data.error) {
                return console.log("Error: " + data.error);
            }
            console.log(data);
        });
    });
});