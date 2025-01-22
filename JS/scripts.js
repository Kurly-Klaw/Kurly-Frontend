// Function to load the header and footer templates
function loadHeaderAndFooter() {
  // Load header template
  fetch("/menu.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementsByTagName('body')[0].innerHTML = data +document.getElementsByTagName('body')[0].innerHTML;
    });
  fetch("/header.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementsByTagName('body')[0].innerHTML = data +document.getElementsByTagName('body')[0].innerHTML;
    });

  // Load footer template
//   fetch("/footer.html")
//     .then((response) => response.text())
//     .then((data) => {
//       document..getElementsByTagName('footer')[0].innerHTML = data;
//     });
}

loadHeaderAndFooter();

function openNav(){
  document.getElementById("sideNav").style.width = "250px";
}
function closeNav() {
  console.log("Rodei")
  document.getElementById("sideNav").style.width = "0px";
}

function load(){
  console.log("Rodei")
  document.getElementsByTagName('main').setAttribute("onmousedown","closeNav()");
}


document.addEventListener('DOMContentLoaded', function() {
  load();
}, false);