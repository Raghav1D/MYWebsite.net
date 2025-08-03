// const sections = document.querySelectorAll('section[id]')

// function scrollActive(){
//     const scrollY = window.pageYOffset

//     sections.forEach(current =>{
//         const sectionHeight = current.offsetHeight,
//               sectionBottom = current.offsetTop - 60,
//               sectionId = current.getAttribute('id')

//         if(scrollY > sectionBottom && scrollY <= sectionBottom + sectionHeight){
//             document.querySelector('.ul a[href*=' + sectionId + ']').classList.add('active-link')
//         }else{
//             document.querySelector('.ul a[href*=' + sectionId + ']').classList.remove('active-link')
//         }
//     })
// }
// window.addEventListener('scroll', scrollActive)

// Get the current dark mode state from local storage
let darkMode = localStorage.getItem('darkMode');

// Select all buttons with the dark-mode-toggle class
const darkModeToggles = document.querySelectorAll('.dark-mode-toggle');

// Function to enable dark mode
const enableDarkMode = () => {
  document.body.classList.add('darkmode');
  localStorage.setItem('darkMode', 'enabled');
};

// Function to disable dark mode
const disableDarkMode = () => {
  document.body.classList.remove('darkmode');
  localStorage.removeItem('darkMode');
};

// Check if dark mode was already active on page load
if (darkMode === 'enabled') {
  enableDarkMode();
}

// Add a click event listener to each button
darkModeToggles.forEach(toggle => {
  toggle.addEventListener('click', () => {
    // Re-check the current state
    darkMode = localStorage.getItem('darkMode');

    // Toggle the dark mode based on the current state
    if (darkMode !== 'enabled') {
      enableDarkMode();
    } else {
      disableDarkMode();
    }
  });
});


window.onscroll = function() {
     scrollFunction();
   };
 
   function scrollFunction() {
     if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
       document.getElementById("navbar2").style.top = "-50px"; // Show the navbar
     } else {
       document.getElementById("navbar2").style.top = "0px"; // Hide the navbar
     }
   }
