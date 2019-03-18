// Object property shorthand 

const name = 'Alexander';

const userAge = 24;

const user = {
    name,
    age : userAge,
    location : 'Skövde'
};

console.log(user);

// Object destructuring

const product = {
    label : 'Red',
    price: 3,
    stock : 1337,
    salePrice: undefined
};

// const label = product.label;
// const stock = product.stock;

// const {label : productLabel, stock} = product;

// console.log(productLabel);

const transaction = (type, {label,stock} = productLabel) => {
    console.log(type,label,stock);
}

transaction('order',product);