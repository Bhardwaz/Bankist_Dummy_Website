'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

const btnScrollTo = document.querySelector('.btn--scroll-to')
const section1 = document.querySelector('#section--1')

btnScrollTo.addEventListener('click', e => {
// e.preventDefault()
// const s1Cords = section1.getBoundingClientRect()
// console.log(s1Cords);
// console.log(e.target.getBoundingClientRect());

// console.log('Current Scroll (X/Y)', window.pageXOffset, window.pageYOffset);
// console.log('height/width viewport', document.documentElement.clientHeight,
// document.documentElement.clientWidth
// );
// // scrolling
// window.scrollTo(s1Cords.left + window.pageXOffset, s1Cords.top + window.pageYOffset)

// window.scrollTo({
//   left: s1Cords.left + window.pageXOffset, 
//   right: s1Cords.top + window.pageYOffset,
//   behavior:"smooth",
// })
// More Modern way of doing this same 
section1.scrollIntoView({
  behavior:'smooth'
})
})

// Page Navigation
// document.querySelectorAll('.nav__link').forEach(function(el) {
// el.addEventListener('click',function(e) {
// e.preventDefault()
// const id = this.getAttribute('href')
// console.log(id);
// document.querySelector(id).scrollIntoView({behavior:"smooth"})
// })})

// Add Event Listener to common parent element 
// Determine what element originated the event 

document.querySelector('.nav__links').addEventListener('click', function(e){
e.preventDefault()

// Matching Strategy 
if(e.target.classList.contains('nav__link')){
  const id = e.target.getAttribute('href')
  document.querySelector(id).scrollIntoView({
    behavior:"smooth"
})}})

// Building a tabbed Component
const tabs = document.querySelectorAll('.operations__tab')
const tabsContainer = document.querySelector('.operations__tab-container')
const tabsContent = document.querySelectorAll('.operations__content') 

tabsContainer.addEventListener('click', function(e){
  const clicked = e.target.closest('.operations__tab')
  console.log(clicked);
  // Guard Clause 
  if(!clicked) return

  tabs.forEach(t => t.classList.remove('operations__tab--active'))
  tabsContent.forEach( t => t.classList.remove('operations__content--active'))  

  // Activate tab
  clicked.classList.add('operations__tab--active')

  // Activate content area
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active')
})

// Passing Arguments into Event Handlers // Menu faded animation

const handleHover = function(){
  nav.addEventListener('mouseover', function(e){
    if(e.target.classList.contains('nav__link')){
      const link = e.target
      const siblings = link.closest('.nav').querySelectorAll('.nav__link')
      const logo = link.closest('.nav').querySelector('img')
      siblings.forEach(el => {
        if(el !== link) el.style.opacity = this
      })
      logo.style.opacity = this
}})}

const nav = document.querySelector('.nav')
nav.addEventListener('mouseover', handleHover.bind(0.5))
nav.addEventListener('mouseout', handleHover.bind(1))

// Sticky navigation
// const initialSec = section1.getBoundingClientRect()
// window.addEventListener('scroll', e => {
// console.log(window.scrollY);
// if(window.scrollY > initialSec.top){
// nav.classList.add('sticky')
// } else {nav.classList.remove('sticky')}
// }) 
// using scrollY can effect performance of page and we must avoid using it rather than this we should use intersection observer API
// THis API allow our page to observer ceratin elements on certails elements and behave according to that

// const observerOptions = {
// root : null,  // in root we can mention target element to intersect but by setting it to null we are simply telling for entire viewport
// threshold: [0, 0.2] // this is the basically percentage of intersection at which observerCallBack will be callled 
// }
// const observerCallback = function (entires, observer){
// // this callback function will be called each time when the observed element so our target element here is intersecting the root element at the threshold that we defined 
// entires.forEach(entry => console.log(entry))
// }
// const sectionObser = new IntersectionObserver(observerCallback, observerOptions)
// sectionObser.observe(section1);

const header = document.querySelector('.header')
const navHeight = nav.getBoundingClientRect().height
const stickyNav = function(entries){
  const [entry] = entries
  console.log(entry);
  if(!entry.isIntersecting) nav.classList.add('sticky')
  else{
  nav.classList.remove('sticky')}
}
const headerObserver = new IntersectionObserver(stickyNav, {
  root:null,
  threshold:0,
  rootMargin:`-${navHeight}px` // percentage and rem do not work here
});
headerObserver.observe(header)

// revealing elements on scroll
const allSections = document.querySelectorAll('.section')
const revealSection = function(entries, observer){
const [entry] = entries
console.log(entry);
if(!entry.isIntersecting) return
entry.target.classList.remove('section--hidden')
observer.unobserve(entry.target)
}
const sectionObserver = new IntersectionObserver(revealSection,{
root:null,
threshold:0.15
})
allSections.forEach(section => {
sectionObserver.observe(section)
//section.classList.add('section--hidden')
})

// Lazy Loading Images
const loadImg = function (entries, observer){
  const [entry] = entries
  console.log(entry);
  if(!entry.isIntersecting) return

  // Replace the images src with data-src
  entry.target.src = entry.target.dataset.src
  entry.target.addEventListener('load',() => {
    entry.target.classList.remove('lazy-img')
  })
  observer.unobserve(entry.target)
}
const imgTargets = document.querySelectorAll('img[data-src]')

const imgObserver = new IntersectionObserver(loadImg,{
root:null,
threshold:0,
rootMargin:'200px'
})
imgTargets.forEach(img => {
  imgObserver.observe(img)
})

// Slider Component
const slides = document.querySelectorAll('.slide')

const btnLeft = document.querySelector('.slider__btn--left')
const btnRight = document.querySelector('.slider__btn--right')

// dot Container
const dotContainer = document.querySelector('.dots')

// const slider = document.querySelector('.slider')
// slider.style.transform = "scale(0.4) translateX(-300px)"
// slider.style.overflow = "visible"

const gotoSlides = function(slide){
  slides.forEach((s, i) => s.style.transform = `translateX(${100 * (i - slide)}%)`)
}
gotoSlides(0)

// Next Slide
let currentSlide = 0
const maxSlide = slides.length

const nextSlide = () => {
  if(currentSlide === maxSlide - 1){
    currentSlide = 0}
    else{currentSlide++}
    gotoSlides(currentSlide)
    activateDot(currentSlide)
}

const prevSlide = function(){
  if(currentSlide === 0){
    currentSlide = maxSlide - 1
  }else{
  currentSlide--
  }
  gotoSlides(currentSlide)
  activateDot(currentSlide)
}

btnRight.addEventListener('click', nextSlide)
btnLeft.addEventListener('click', prevSlide)

const activateDot = slide => {
  document.querySelectorAll('.dots__dot').forEach(dot => {
    dot.classList.remove('dots__dot--active')
  })
  document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active')
}

document.addEventListener('keydown',function(e){
  if(e.key === "ArrowLeft") prevSlide()
  e.key === "ArrowRight" && nextSlide()
})
const createDots = function(){
  slides.forEach(function(_, i){
    dotContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${i}"></button>`)
  })
}
createDots()

// eventDelegation
dotContainer.addEventListener('click', function(e){
  if(e.target.classList.contains('dots__dot')){
    const {slide} = e.target.dataset
    gotoSlides(slide)
    activateDot(slide)
  }
})
activateDot(0)
// all the custom data attributes are in the data set and then dot this value so .slide