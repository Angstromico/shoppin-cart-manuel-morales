//Variables
const cart = document.getElementById('cart');
const containerCart = document.getElementById('list-cart');
const emptyButton = document.getElementById('empty-cart');
const coursesList = document.getElementById('list-courses');
const form = document.querySelector('#Searching');
let cartArticles = [];
const coursesTitles = document.querySelectorAll('h4');
const coursesArray = Array.from(coursesTitles).map(
  (titles) => titles.textContent
);
const searching = document.getElementById('searcher');
let total = 0;
const hero = document.getElementById('hero');
//Buy Button
const buyButton = document.createElement('BUTTON');
buyButton.setAttribute('type', 'button');
buyButton.textContent = 'Buy Here';
buyButton.classList.add('golden-button');
cart.append(buyButton);
//Even Listeners
eventListeners();
function eventListeners() {
  //to add and remove course
  coursesList.addEventListener('click', addCourse);
  //Eliminated courses from the shopping Cart
  cart.addEventListener('click', eraseCourses);
  //Button to Empty the cart
  emptyButton.addEventListener('click', () => {
    cartArticles = [];
    localStorage.removeItem('cart');
    cleaningDOM();
  });
  //Show elements on localStorage
  document.addEventListener('DOMContentLoaded', () => {
    cartArticles = JSON.parse(localStorage.getItem('cart')) || [];
    cartDOM();
  });
}
//Functions
function addCourse(e) {
  e.preventDefault();
  if (e.target.classList.contains('add-cart')) {
    const courseSelected = e.target.parentElement.parentElement;
    readCourseData(courseSelected);
  }
}
//Eliminate courses from the shopping cart
function eraseCourses(e) {
  if (e.target.classList.contains('eraser')) {
    const courseId = e.target.getAttribute('data-id');
    //total -= 15;
    //Vanish for the array
    cartArticles = cartArticles.filter((course) => course.id !== courseId);
    cartDOM();
  }
}
//Take the HtML info for the Card of The Courses
function readCourseData(course) {
  console.log(course);
  //Creating an Object that content  the course information
  const courseInfo = {
    image: course.querySelector('img').src,
    title: course.querySelector('h4').textContent,
    teacher: course.querySelector('p').textContent,
    price: course.querySelector('.price span').textContent,
    id: course.querySelector('a').getAttribute('data-id'),
    quantity: 1,
  };
  //Review is an element already exist on the Shopping Cart
  const exist = cartArticles.some((course) => course.id === courseInfo.id);
  if (exist) {
    //Update quantity
    const courses = cartArticles.map((course) => {
      if (course.id === courseInfo.id) {
        course.quantity++;
        return course;
      } else {
        return course;
      }
    });
    cartArticles = [...courses];
  } else {
    //App the course to the Shopping Cart
    cartArticles = [...cartArticles, courseInfo];
  }
  //Cleaning the Array cartArticles of previus elments

  console.log(cartArticles);
  cartDOM();
}
//Show the shopping car on the HTML
function cartDOM() {
  //Cleaning the Last adition to shopping cart
  cleaningDOM();
  //Loop the cart and genetes the HTML
  cartArticles.forEach((course) => {
    const { image, title, price, quantity, id } = course;
    const row = document.createElement('TR');
    total = quantity * 15;
    hero.style.backgroundImage = `url(${image})`;
    row.innerHTML = `
            <td>
                <img src="${image}" class="shop-img">  
            </td>
            <td>
                ${title}
            </td>
            <td>
                ${price}
            </td>
            <td>
                ${quantity}
            </td>
            <td>
                <a href="#" class="eraser" data-id="${id}">X</a>
            </td>
            <td class="pay">
                ${total}
            </td>
        `;
    //Add the info to the tbody
    containerCart.append(row);
    //Show buy button
    const sumatorium = document.querySelectorAll('.pay');
    const totalToPay = Array.from(sumatorium).map((td) =>
      parseInt(td.textContent.trim())
    );
    const payTotal = totalToPay.reduce((a, b) => a + b);
    console.log(payTotal);
    buyButton.textContent = `Total to Pay: ${payTotal}`;
    console.log(buyButton);
  });
  //Add Information to Local Store
  storageSyn();
}
function storageSyn() {
  localStorage.setItem('cart', JSON.stringify(cartArticles));
}
//Cleaning the Courses from tbody
function cleaningDOM() {
  //Slow way
  //containerCart.innerHTML = '';
  //Efficient way
  while (containerCart.firstChild) {
    containerCart.removeChild(containerCart.firstChild);
  }
}
//Autocomplete bar
$(function () {
  coursesArray;
  $('#searcher').autocomplete({
    source: coursesArray,
  });
});
//Scroll to Search Bar
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const searchBar = searching.value.toLowerCase().trim();
  const h4 = document.querySelectorAll('h4');
  const courses = Array.from(h4);
  const coursesLower = coursesArray.map((e) => e.toLowerCase());
  for (let i = 0; i <= courses.length; i++) {
    if (searchBar == coursesLower[i]) {
      const obj = courses[i];
      obj.scrollIntoView({
        behavior: 'smooth',
      });
    }
  }
});
//Set time intervals to change background image
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
const randomImages = [
  'https://miro.medium.com/max/1400/1*bcZz-qb_DNpvrNNwQBhQmQ.jpeg',
  'https://www.rohm.com/documents/portlet_file_entry/11308/SouhaHassine_ROHMSemiconductor.jpg/a49e31e5-1972-44df-c72f-1288e7b06eac',
  'https://ubiqum.com/assets/uploads/2019/07/code-coder-coding-270348.jpg',
  'https://modeling-languages.com/wp-content/uploads/2019/03/php.png',
  'https://www.limestone.edu/sites/default/files/styles/de2e/public/images/2020-06/computer-programming.jpg?itok=2eSD1_GT',
];
document.addEventListener('DOMContentLoaded', function () {
  setInterval(() => {
    hero.style.backgroundImage = `url(${
      randomImages[getRandomInt(0, randomImages.length - 1)]
    })`;
  }, 25000);
});
