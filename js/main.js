const search = document.getElementById("search");
const searchOpen = document.getElementById("searchOpen");
const searchClose = document.getElementById("searchClose");

searchOpen.addEventListener("click", function(){
  search.classList.add("active");
})
searchClose.addEventListener("click", function(){
  search.classList.remove("active");
})
window.onclick = function(event) {
  if (event.target == search) {
    search.classList.remove("active");
  }
}
window.addEventListener("keydown", function(event) {
  if (event.keyCode === 27) {
    search.classList.remove("active");
  }
  if (event.keyCode === 191) {
    search.classList.add("active");
  }
});


document.addEventListener('DOMContentLoaded', function() {
  var cookieConsentElement = document.getElementById('cookieConsent');
  var cookieConsentButton = document.getElementById('cookieConsentButton');

  // Check if the consent is already given
  if (!localStorage.getItem('cookieConsent')) {
    cookieConsentElement.style.display = 'flex';
  }

  // Function to hide the cookie consent message and store the consent in localStorage
  function hideCookieConsent() {
    localStorage.setItem('cookieConsent', 'true');
    cookieConsentElement.style.display = 'none';
  }

  // Add an event listener to the consent button
  cookieConsentButton.addEventListener('click', hideCookieConsent);
});


//----------------------------------------------------------
   const wrapper = document.querySelector(".card-wrapper");
  const carousel = document.querySelector(".card-carousel");
  const firstCardWidth = carousel.querySelector(".card").offsetWidth;
  const arrowBtns = document.querySelectorAll(".card-button");
  const carouselChildrens = [...carousel.children];

  let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;

  // Get the number of cards that can fit in the carousel at once
  let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

  // Insert copies of the last few cards to beginning of carousel for infinite scrolling
  carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
      carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
  });

  // Insert copies of the first few cards to end of carousel for infinite scrolling
  carouselChildrens.slice(0, cardPerView).forEach(card => {
      carousel.insertAdjacentHTML("beforeend", card.outerHTML);
  });

  // Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
  carousel.classList.add("no-transition");
  carousel.scrollLeft = carousel.offsetWidth;
  carousel.classList.remove("no-transition");

  // Add event listeners for the arrow buttons to scroll the carousel left and right
  arrowBtns.forEach(btn => {
      btn.addEventListener("click", () => {
          carousel.scrollLeft += btn.id == "cardLeft" ? -firstCardWidth : firstCardWidth;
      });
  });

  const dragStart = (e) => {
      isDragging = true;
      carousel.classList.add("dragging");
      // Records the initial cursor and scroll position of the carousel
      startX = e.pageX;
      startScrollLeft = carousel.scrollLeft;
  }

  const dragging = (e) => {
      if(!isDragging) return; // if isDragging is false return from here
      // Updates the scroll position of the carousel based on the cursor movement
      carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
  }

  const dragStop = () => {
      isDragging = false;
      carousel.classList.remove("dragging");
  }

  const infiniteScroll = () => {
      // If the carousel is at the beginning, scroll to the end
      if(carousel.scrollLeft === 0) {
          carousel.classList.add("no-transition");
          carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
          carousel.classList.remove("no-transition");
      }
      // If the carousel is at the end, scroll to the beginning
      else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
          carousel.classList.add("no-transition");
          carousel.scrollLeft = carousel.offsetWidth;
          carousel.classList.remove("no-transition");
      }

      // Clear existing timeout & start autoplay if mouse is not hovering over carousel
      clearTimeout(timeoutId);
      if(!wrapper.matches(":hover")) autoPlay();
  }

  const autoPlay = () => {
      if(window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
      // Autoplay the carousel after every 2500 ms
      timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
  }
  autoPlay();

  carousel.addEventListener("mousedown", dragStart);
  carousel.addEventListener("mousemove", dragging);
  document.addEventListener("mouseup", dragStop);
  carousel.addEventListener("scroll", infiniteScroll);
  wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
  wrapper.addEventListener("mouseleave", autoPlay);


//----------------------------------------------------------



document.getElementById('home__prev').onclick = function(){
  let lists = document.querySelectorAll('.home__item');
  document.getElementById('home__slide').prepend(lists[lists.length - 1]);
}

document.getElementById('home__next').onclick = function(){
  let lists = document.querySelectorAll('.home__item');
  document.getElementById('home__slide').appendChild(lists[0]);
}







const logo = document.querySelector(".logo");
const menu = document.querySelector("#menuOpen");
const cartBtn = document.querySelector(".cart");
const heart = document.querySelector(".heart");
const headerRight = document.querySelector(".header__right");






  function initializeMenu(open, close, menuId, content) {
    const menuOpen = document.getElementById(open);
    const menuClose = document.getElementById(close);
    const menu = document.getElementById(menuId);
    const menuList = document.getElementById(content);
  
    function openMenu() {
      menu.classList.add("active");
      menuList.classList.add("active");
    }
  
    function closeMenu() {
      menu.classList.remove("active");
      menuList.classList.remove("active");
    }
  
    function closeMenuOnOutsideClick(event) {
      if (event.target == menu) {
        closeMenu();
      }
    }
  
    menuOpen.addEventListener("click", openMenu);
    menuClose.addEventListener("click", closeMenu);
    window.addEventListener("click", closeMenuOnOutsideClick);
  }
  
  initializeMenu("menuOpen", "menuClose", "menu", "menuContent");
  // initializeMenu('filterOpen', 'filterClose', 'filter', "filterContent");

function toggleDropdown(buttonId, dropdownId) {
  var button = document.querySelector(buttonId);
  var dropdown = document.querySelector(dropdownId);

  button.addEventListener("click", function () {
    dropdown.classList.toggle("show");
  });

  window.addEventListener("click", function (event) {
    if (!event.target.matches(buttonId)) {
      if (dropdown.classList.contains("show")) {
        dropdown.classList.remove("show");
      }
    }
  });
}

toggleDropdown(".cart__btn", ".cart__list");


// Get references to DOM elements
const mainImage = document.querySelector(".thumbnail-active");
const thumbnails = document.querySelectorAll(".thumbnail");
const prevButton = document.querySelector(".product__image-prev");
const nextButton = document.querySelector(".product__image-next");

// Attach click event listener to each thumbnail
thumbnails.forEach((thumbnail, index) => {
  thumbnail.addEventListener("click", function () {
    // Update main image source with clicked thumbnail's source
    const thumbnailSrc = this.getAttribute("src");
    mainImage.setAttribute("src", thumbnailSrc);

    // Remove 'thumbnail-active' class from all thumbnails
    thumbnails.forEach((t) => t.classList.remove("thumbnail-active"));

    // Add 'thumbnail-active' class to the clicked thumbnail
    this.classList.add("thumbnail-active");
  });
});
if(prevButton){
  prevButton.addEventListener("click", function () {
    const activeIndex = Array.from(thumbnails).findIndex((t) =>
      t.classList.contains("thumbnail-active")
    );
    const previousIndex =
      activeIndex === 0 ? thumbnails.length - 1 : activeIndex - 1;
    thumbnails[previousIndex].click();
  });
}
if(nextButton){
  nextButton.addEventListener("click", function () {
    const activeIndex = Array.from(thumbnails).findIndex((t) =>
      t.classList.contains("thumbnail-active")
    );
    const nextIndex = activeIndex === thumbnails.length - 1 ? 0 : activeIndex + 1;
    thumbnails[nextIndex].click();
  });
}

// let counter = 1;
// const counterInput = document.getElementById("count");
// const incrementBtn = document.getElementById("countIncrease");
// const decrementBtn = document.getElementById("countDecrease");

// function updateCounterValue() {
//   counterInput.value = counter;
// }

// function incrementCounter() {
//   counter++;
//   updateCounterValue();
// }

// function decrementCounter() {
//   if (counter > 1) {
//     counter--;
//     updateCounterValue();
//   }
// }

// function validateAndSetCounterValue() {
//   const inputValue = parseInt(counterInput.value);
//   if (!isNaN(inputValue)) {
//     counter = Math.max(inputValue, 1);
//   } else {
//     counter = 0;
//   }
//   updateCounterValue();
// }

// incrementBtn.addEventListener("click", incrementCounter);
// decrementBtn.addEventListener("click", decrementCounter);
// counterInput.addEventListener("input", validateAndSetCounterValue);





function initializeTabs(buttons, panes) {
  const tabButtons = document.querySelectorAll(buttons);
  const tabPanes = document.querySelectorAll(panes);

  // Add 'active' class to the first tab button and pane
  tabButtons[0].classList.add("active");
  tabPanes[0].classList.add("active");

  tabButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      // Remove 'active' class from all tab buttons and panes
      tabButtons.forEach((button) => button.classList.remove("active"));
      tabPanes.forEach((pane) => pane.classList.remove("active"));

      // Add 'active' class to clicked tab button and pane
      button.classList.add("active");
      tabPanes[index].classList.add("active");
    });
  });
}

// Call the function to initialize the tabs
  // initializeTabs(".tab__header--btn", ".tab__pane");
  initializeTabs(".details__tab--btn", ".details__tab--pane");


  var accordions = document.getElementsByClassName('details__accordion');

  for (var i = 0; i < accordions.length; i++) {
    var accordion = accordions[i];
    var headers = accordion.getElementsByClassName('details__accordion-header');
  
    for (var j = 0; j < headers.length; j++) {
      var header = headers[j];
      header.addEventListener('click', toggleAccordion);
    }
  }
  
  function toggleAccordion() {
    var content = this.nextElementSibling;
    var accordionItem = this.parentNode;
    var accordion = accordionItem.parentNode;
  
    // Close all other accordion items
    var items = accordion.getElementsByClassName('details__accordion--item');
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      if (item !== accordionItem) {
        var itemContent = item.querySelector('.details__accordion-wrap');
        var itemHeader = item.querySelector('.details__accordion-header');
        itemHeader.classList.remove('active');
        itemContent.style.maxHeight = null;
      }
    }
  
    this.classList.toggle('active');
    content.style.maxHeight = content.style.maxHeight ? null : content.scrollHeight + 'px';
  }
  



const imgModal = document.getElementById("Modal");
const btnModal = document.getElementById("openModal");
const prevModal = document.querySelector(".product__modal-prev");
const nextModal = document.querySelector(".product__modal-next");

btnModal.onclick = function () {
  modal.classList.toggle("active");
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.classList.toggle("active");
  }
};



