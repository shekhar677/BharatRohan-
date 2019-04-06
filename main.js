//swiper controller

var mySwiper = new Swiper('.swiper-container', {
  direction: 'horizontal',
  loop: true,
  speed: 500,
  effect: 'slide',
  autoplay: {
    delay: 5000,
  },

  // pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  observer: true,
  observeParents: true,
})


// nav bar controller
var navButton = document.getElementById('nav-btn');
var menu = document.getElementById('main-nav');
var send = document.getElementById('send');
var modal = document.getElementById('modal');
var loading = document.getElementById('loading');
var done = document.getElementById('done');
var close = document.getElementById('close');
var emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var firstName = document.getElementById('first-name');
var lastName = document.getElementById('last-name');
var email = document.getElementById('email');
var phone = document.getElementById('phone');
var message = document.getElementById('message');

navButton.addEventListener('click', function() {
  menu.classList.toggle('active');
});

if (send) {
  send.addEventListener('click', sendEmail);
}

if (close) {
  close.addEventListener('click', function() {
    modal.style.display = 'none';
  });
}

function sendEmail(e) {
  e.preventDefault();
  // display loader
  modal.style.display = 'block';
  loading.style.display = 'block';

  if (validate()) {
    const url = 'http://br.bharatrohan.in/api/b2b/send-email';
    var user = {
      first_name: firstName.value,
      last_name: lastName.value,
      email: email.value,
      phone: phone.value,
      message: message.value
    }
    axios({
      method: 'post',
      url: url,
      data: user
    })
    .then(function(data) {
      loading.style.display = 'none';
      done.style.display = 'block';
      setTimeout(function() {
        modal.style.display = 'none';
      }, 1500);
    })
    .catch(function(err) {
      alert('Failed to send data.');
      modal.style.display = 'none';
    });
  } else {
    modal.style.display = 'none';
  }
}

function validate() {
  if (firstName.value === '' || email.value === '') {
    alert('please fill all fields !!');
    return false;
  } else if (!(email.value).match(emailReg)) {
    alert('Invalid Email !!');
    return false;
  } else {
    return true;
  }
}