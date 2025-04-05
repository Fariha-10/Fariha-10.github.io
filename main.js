const customName = document.getElementById('customname');
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');

// Function to get a random value from an array
function randomValueFromArray(array){
  const random = Math.floor(Math.random()*array.length);
  return array[random];
}

// Define the template for the story and possible inserts
const storyText = "It was 94 fahrenheit outside, so :insertx: went for a walk. When they got to :inserty:, they stared in horror for a few moments, then :insertz:. Bob saw the whole thing, but was not surprised — :insertx: weighs 300 pounds, and it was a hot day.";
const insertX = ["Willy the Goblin", "Big Daddy", "Father Christmas"];
const insertY = ["the soup kitchen", "Disneyland", "the White House"];
const insertZ = ["spontaneously combusted", "melted into a puddle on the sidewalk", "turned into a slug and crawled away"];

// Event listener for when the "Randomize" button is clicked
randomize.addEventListener('click', result);

// Function to generate the story based on random values and user input
function result() {
    let newStory = storyText;

    // Get random values from the insert arrays
    const xItem = randomValueFromArray(insertX);
    const yItem = randomValueFromArray(insertY);
    const zItem = randomValueFromArray(insertZ);

    // Replace placeholders in the story with the random values
    newStory= newStory
              .replaceAll(":insertx:", xItem)
              .replace(":inserty:", yItem)
              .replace(":insertz:", zItem);


  // If a custom name is entered, replace "Bob" with the custom name
  if(customName.value !== '') {
    const name = customName.value;
    newStory = newStory.replace("Bob", name);

  }
  
  // If the user selects the UK option, convert weight and temperature to UK units
  if(document.getElementById("uk").checked) {
    const weight = `${Math.round(300/14)} stone`;
    const temperature =  `${Math.round((94-32)*(5/9))} centigrade`;
    newStory = newStory
               .replace("300 pounds", weight)
               .replace("94 fahrenheit", temperature);
    
  }
  
  // Display the generated story
  story.textContent = newStory ;
  story.style.visibility = 'visible';
}