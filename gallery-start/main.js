const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */
const images = ["pic1.jpg", "pic2.jpg", "pic3.jpg", "pic4.jpg", "pic5.jpg" ]

/* Declaring the alternative text for each image file */
const alts ={
    "pic1.jpg": "Closeup of a human eye",
    "pic2.jpg": "Rock that looks like a wave",
    "pic3.jpg": "Purple and white pansies",
    "pic4.jpg": "Section of wall from a pharaoh's tomb",
    "pic5.jpg": "Large moth on a leaf"
};  

/* Looping through images */

for (const image of images) {
    const newImage = document.createElement('img');
    newImage.setAttribute('src', `images/${image}`);
    newImage.setAttribute('alt', alts[image]);
    thumbBar.appendChild(newImage);
    newImage.addEventListener('click', e => {
      displayedImage.src = e.target.src;
      displayedImage.alt = e.target.alt;
    });
  }


/* Wiring up the Darken/Lighten button */


// Event listener for the button to toggle the overlay color between dark and light
btn.addEventListener('click', () => {
    const btnClass = btn.getAttribute('class');
    if (btnClass === 'dark') {
      // If the button has the 'dark' class, change to 'light' and adjust overlay color
      btn.setAttribute('class','light');
      btn.textContent = 'Lighten';
      overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
    } else {
       // If the button has the 'light' class, change to 'dark' and adjust overlay color
      btn.setAttribute('class','dark');
      btn.textContent = 'Darken';
      overlay.style.backgroundColor = 'rgba(0,0,0,0)';
    }
  });