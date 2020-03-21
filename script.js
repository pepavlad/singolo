window.scrollTo(0,0);

//header 
window.addEventListener('scroll', changeActiveLink); 
const ANCHORS = document.querySelectorAll('a[href*="#"]');
for (let anchor of ANCHORS) {
  anchor.addEventListener('click', (e) =>{
    e.preventDefault();
      // document.querySelectorAll('.link').forEach( element => {
      //     element.classList.remove('active-link');
      // });
      // e.target.classList.add('active-link');
    const blockID = anchor.getAttribute('href').substr(1);
    document.getElementById(blockID).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
    activeLink = document.querySelector('.active-link');

  });
}
activeLink = document.querySelector('.active-link');
function changeActiveLink() {
  if (pageYOffset >= 0 && pageYOffset < 598) {
    currentLink = document.getElementById('home-link'); 
    changeClass();
  }

  if (pageYOffset > 598 && pageYOffset <= 1098) {
    currentLink = document.getElementById('services-link');
    changeClass();
  }

  if (pageYOffset > 1098 && pageYOffset <= 1968) {
    currentLink = document.getElementById('portfolio-link');
    changeClass();
  }
  
  if (pageYOffset > 1968 && pageYOffset <= 2687) {
    currentLink = document.getElementById('about-link');  
    changeClass();
  }
  if (pageYOffset > 2687){
    currentLink = document.getElementById('contact-link')
    if (currentLink.classList.contains('active-link')) return;
    changeClass();
  }
  if(pageYOffset > 2440 && document.documentElement.clientHeight > 800){
    currentLink = document.getElementById('contact-link')
    if (currentLink.classList.contains('active-link')) return;
    changeClass();
  }
  
  function changeClass() {                  
    activeLink.classList.remove('active-link');
    currentLink.classList.add('active-link');
    activeLink = currentLink;
  }
};
document.querySelectorAll('.phone-btn').forEach( element => {
  element.addEventListener('click', () => {
      let screen = element.parentElement.querySelector('.screen');
      if (screen.style.opacity === "1") {
          screen.style.opacity = "0";
      } else {
          screen.style.opacity = "1";
      }
  });
});

//slider

let items = document.querySelectorAll('.carousel .item');
const slider = document.querySelector('.slider');
let currentItem = 0;
let isEnabled = true;

function changeCurrentItem(n) {
  currentItem = (n + items.length) % items.length;
}

function hideItem(direction) {
  isEnabled = false;
  items[currentItem].classList.add(direction);
	items[currentItem].addEventListener('animationend', function() {
    this.classList.remove('active', direction);
  });
}

function showItem(direction) {
  items[currentItem].classList.add('next', direction);
	items[currentItem].addEventListener('animationend', function() {
    this.classList.remove('next', direction);
    this.classList.add('active');
    if(currentItem === 1){
    slider.style.backgroundColor = '#648bf0';
    slider.style.borderBottom = '6px solid #648bf0';
    } else {
      slider.style.backgroundColor= '#f06c64';
      slider.style.borderBottom = '6px solid #ea676b';
    }
		isEnabled = true;
	});
}

function nextItem(n) {
	hideItem('to-left');
	changeCurrentItem(n + 1);
	showItem('from-right');
}

function previousItem(n) {
	hideItem('to-right');
	changeCurrentItem(n - 1);
	showItem('from-left');
}

document.querySelector('.control.left').addEventListener('click', function() {
	if (isEnabled) {
		previousItem(currentItem);
	}
});

document.querySelector('.control.right').addEventListener('click', function() {
	if (isEnabled) {
		nextItem(currentItem);
	}
});

//portfolio

let div = document.querySelector('.portfolio-wrap');
let arrayOfDivs = [].slice.call(div.querySelectorAll('.portfolio-item'));

let btns = document.querySelectorAll('button');
for (let btn of btns) {
    btn.addEventListener('click', (e) =>{
      if(!e.target.classList.contains('active-btn')){
        document.querySelectorAll('.button').forEach( e => {
            e.classList.remove('active-btn');
        });
        e.target.classList.add('active-btn');
        for (let i = 0; i < 2; i++) arrayOfDivs.unshift(arrayOfDivs.pop());
        // arrayOfDivs.sort(() => Math.random() - 0.5);
        arrayOfDivs.forEach(el => div.appendChild(el));
      }
    });
  }

let portfolioItems = document.querySelectorAll('.portfolio-item');
for (let item of portfolioItems) {
  item.addEventListener('click', (e) =>{
    if(!e.target.classList.contains('active-item')){
        document.querySelectorAll('.portfolio-pic').forEach( e => {
        e.classList.remove('active-item');
      });
      e.target.classList.add('active-item');
    } else e.target.classList.remove('active-item');
  });
};


//modal

let modal = document.getElementById('modal');
let modalBtn = document.getElementById('form-btn');
let closeBtn = document.getElementsByClassName('close-modal')[0];
let OKbtn = document.getElementById('modal-btn');
let name = document.getElementById('name');
let email = document.getElementById('email');
let subject = document.getElementById('subject');
let description = document.querySelector('.description');

modalBtn.addEventListener('click', () =>{
  if(name.value.replace(/\s/g, '') != '' && email.value.replace(/\s/g, '') != '' && /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(email.value)){
    modal.style.display = 'block';
    if(subject.value != ''){
      document.getElementById('modal-subj').textContent  = `Subject: ${subject.value}`;
    } else {  
      document.getElementById('modal-subj').textContent  = 'No subject';
    }
    if(description.value != '') {
      document.getElementById('modal-descr').textContent  = `Description: ${description.value}`;
    } else {
      document.getElementById('modal-descr').textContent  = 'No description';
    }
  }
});

closeBtn.addEventListener('click', () =>{
  modal.style.display = 'none';
  Reset();
});
OKbtn.addEventListener('click', () =>{
  modal.style.display = 'none';
  Reset();
});
window.addEventListener('click', e => {
  if(e.target == modal){
    modal.style.display = 'none';
    Reset();
  }
});

function Reset(){
  name.value  = '';
  email.value  = '';
  subject.value  = '';
  description.value  = '';
}