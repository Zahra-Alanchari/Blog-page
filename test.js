// URL of the JSON file
const jsonURL = 'data.json'; // Adjust this path if necessary

// Function to fetch and store data if not already in local storage
function fetchData() {
  if (!localStorage.getItem('userData')) {
    fetch(jsonURL)
      .then(response => response.json())
      .then(data => {
        localStorage.setItem('userData', JSON.stringify(data));
        displayData();
      })
      .catch(error => console.error('Error fetching data:', error));
  } else {
    displayData();
  }
}

// Function to display data in HTML
function displayData() {
  const dataDisplay = document.getElementById('dataDisplay');
  const storedData = JSON.parse(localStorage.getItem('userData'));
  dataDisplay.innerHTML = `
    <p>Name: ${storedData.name}</p>
    <p>Age: ${storedData.age}</p>
    <p>City: ${storedData.address.city}</p>
    <p>Country: ${storedData.address.country}</p>
  `;
}

// Function to update nested data in local storage
function updateData() {
  let storedData = JSON.parse(localStorage.getItem('userData'));
  storedData.age += 1; // Example update: Increment age by 1
  storedData.address.city = "Tehran"; // Example update: Change city
  localStorage.setItem('userData', JSON.stringify(storedData));
  displayData();
}

// Fetch data on page load
fetchData();

// Add event listener to button to update data
document.getElementById('updateButton').addEventListener('click', updateData);