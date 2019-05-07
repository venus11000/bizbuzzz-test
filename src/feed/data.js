import img001 from '../images/items/biscuits/001.jpeg';
import img002 from '../images/items/biscuits/002.jpeg';
import img003 from '../images/items/biscuits/003.jpeg';
import img004 from '../images/items/biscuits/004.jpeg';
import img005 from '../images/items/biscuits/005.jpeg';

export const userData = [{
    mobileNumber: '8495030355',
    otp: '123456'
}];

export const categories =  [{
    name: 'biscuits',
    label: 'Biscuits',
    types: ['all', 'cookies', 'cream biscuit', 'milk  & glucose', 'salted', 'cheeslets']
}, {
    name: 'tea',
    label: 'Tea',
    types: ['all', 'tea', 'tea bags', 'green tea', 'ice tea']
}, {
    name: 'juice',
    label: 'Juice',
    types: ['all', 'orenge juice', 'other juice']
}];

export const items = [{
    name: "Parle G Original Gluco Biscuits",
    image: img001,
    available: true,
    liked: true,
    price: 123,
    quantity: '500g',
    rating: 4.8,
    commentsCount: 33,
    sellingPrice: 80,
    actualPrice: 84,
    discount: 4
}, {
    name: "Britannia Marie Gold Biscuits",
    image: img002,
    available: false,
    liked: true,
    price: 456,
    quantity: '500g',
    rating: 4.8,
    commentsCount: 33,
    sellingPrice: 80,
    actualPrice: 84,
    discount: 4
}, {
    name: "Sunfeast Dark Fantasy Choco Fills",
    image: img003,
    available: true,
    liked: false,
    price: 234,
    quantity: '500g',
    rating: 4.8,
    commentsCount: 33,
    sellingPrice: 80,
    actualPrice: 84,
    discount: 4
}, {
    name: "Sunfeast Dark Fantasy Choco Fills Luxuria",
    image: img004,
    available: true,
    liked: false,
    price: 789,
    quantity: '500g',
    rating: 4.8,
    commentsCount: 33,
    sellingPrice: 80,
    actualPrice: 84,
    discount: 4
}, {
    name: "Unibic Fruit & Nut Cookies",
    image: img005,
    available: true,
    liked: false,
    price: 143,
    quantity: '500g',
    rating: 4.8,
    commentsCount: 33,
    sellingPrice: 80,
    actualPrice: 84,
    discount: 4
}]