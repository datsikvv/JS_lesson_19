    
let navItem = document.getElementsByClassName('js-nav-item');

[].forEach.call( navItem, (item, i, navItem ) => {
  if( window.location.pathname === item.dataset.url ) {
    item.classList.add('active');
  }
});
