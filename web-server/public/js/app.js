console.log('Client side javascript file is loaded!');

fetch('http://localhost:3000/weather/?address=HohoHaha').then((res) => {
    res.json().then((data) => {
        if(data.error) {
            return console.log("Error: " + data.error);
        }
        console.log(data);
    })
});