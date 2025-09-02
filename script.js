// Sample car data
const cars = [
  {
    id: 1,
    make: "toyota",
    model: "Camry",
    year: 2022,
    price: 32000,
    km: 15000,
    fuel: "Petrol",
    transmission: "Automatic",
    location: "Sydney",
    bodyType: "Sedan",
    image: "Toyota Camry 2022",
  },
  {
    id: 2,
    make: "mazda",
    model: "CX-5",
    year: 2023,
    price: 45000,
    km: 8000,
    fuel: "Petrol",
    transmission: "Automatic",
    location: "Melbourne",
    bodyType: "SUV",
    image: "Mazda CX-5 2023",
  },
  {
    id: 3,
    make: "bmw",
    model: "320i",
    year: 2021,
    price: 55000,
    km: 25000,
    fuel: "Petrol",
    transmission: "Automatic",
    location: "Brisbane",
    bodyType: "Sedan",
    image: "BMW 320i 2021",
  },
  {
    id: 4,
    make: "ford",
    model: "Ranger",
    year: 2022,
    price: 48000,
    km: 20000,
    fuel: "Diesel",
    transmission: "Manual",
    location: "Perth",
    bodyType: "Ute",
    image: "Ford Ranger 2022",
  },
  {
    id: 5,
    make: "honda",
    model: "Civic",
    year: 2023,
    price: 28000,
    km: 5000,
    fuel: "Petrol",
    transmission: "Manual",
    location: "Adelaide",
    bodyType: "Hatchback",
    image: "Honda Civic 2023",
  },
  {
    id: 6,
    make: "nissan",
    model: "X-Trail",
    year: 2021,
    price: 38000,
    km: 35000,
    fuel: "Petrol",
    transmission: "Automatic",
    location: "Sydney",
    bodyType: "SUV",
    image: "Nissan X-Trail 2021",
  },
];

let currentResults = [];

// Populate featured cars on page load
function populateFeaturedCars() {
  const container = document.getElementById("featured-cars");
  const shuffledCars = cars.sort(() => 0.5 - Math.random()).slice(0, 6);

  container.innerHTML = shuffledCars
    .map(
      (car) => `
          <div class="car-card" onclick="viewCarDetails(${car.id})">
              <div class="car-image">${car.image}</div>
              <div class="car-details">
                  <div class="car-title">${car.year} ${
        car.make.charAt(0).toUpperCase() + car.make.slice(1)
      } ${car.model}</div>
                  <div class="car-specs">
                      <span class="spec">${car.km.toLocaleString()}km</span>
                      <span class="spec">${car.fuel}</span>
                      <span class="spec">${car.transmission}</span>
                      <span class="spec">${car.location}</span>
                  </div>
                  <div class="car-price">$${car.price.toLocaleString()}</div>
              </div>
          </div>
      `
    )
    .join("");
}

// Handle search form submission
function performSearch(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const filters = {
    make: formData.get("make"),
    model: formData.get("model"),
    priceMin: formData.get("price-min"),
    priceMax: formData.get("price-max"),
    location: formData.get("location"),
  };

  // Filter cars based on search criteria
  currentResults = cars.filter((car) => {
    if (filters.make && car.make !== filters.make) return false;
    if (
      filters.model &&
      car.model.toLowerCase() !== filters.model.toLowerCase()
    )
      return false;
    if (filters.priceMin && car.price < parseInt(filters.priceMin))
      return false;
    if (filters.priceMax && car.price > parseInt(filters.priceMax))
      return false;
    if (
      filters.location &&
      car.location.toLowerCase() !== filters.location.toLowerCase()
    )
      return false;
    return true;
  });

  displaySearchResults();
  showSection("search");
}

// Display search results
function displaySearchResults() {
  const container = document.getElementById("search-results");
  const countElement = document.getElementById("results-count");

  countElement.textContent = currentResults.length;

  if (currentResults.length === 0) {
    container.innerHTML =
      '<div style="text-align: center; padding: 2rem; color: #666;">No cars found matching your criteria. Please try adjusting your filters.</div>';
    return;
  }

  container.innerHTML = currentResults
    .map(
      (car) => `
          <div class="car-card" onclick="viewCarDetails(${car.id})">
              <div class="car-image">${car.image}</div>
              <div class="car-details">
                  <div class="car-title">${car.year} ${
        car.make.charAt(0).toUpperCase() + car.make.slice(1)
      } ${car.model}</div>
                  <div class="car-specs">
                      <span class="spec">${car.km.toLocaleString()}km</span>
                      <span class="spec">${car.fuel}</span>
                      <span class="spec">${car.transmission}</span>
                      <span class="spec">${car.location}</span>
                  </div>
                  <div class="car-price">$${car.price.toLocaleString()}</div>
              </div>
          </div>
      `
    )
    .join("");
}

// Sort search results
function sortResults(sortBy) {
  switch (sortBy) {
    case "price-low":
      currentResults.sort((a, b) => a.price - b.price);
      break;
    case "price-high":
      currentResults.sort((a, b) => b.price - a.price);
      break;
    case "year-new":
      currentResults.sort((a, b) => b.year - a.year);
      break;
    case "year-old":
      currentResults.sort((a, b) => a.year - b.year);
      break;
    case "km-low":
      currentResults.sort((a, b) => a.km - b.km);
      break;
  }
  displaySearchResults();
}

// Show different sections
function showSection(section) {
  const homeSection = document.getElementById("home-section");
  const searchSection = document.getElementById("search-section");

  if (section === "home") {
    homeSection.style.display = "block";
    searchSection.style.display = "none";
  } else if (section === "search") {
    homeSection.style.display = "none";
    searchSection.style.display = "block";
  }
}

// View car details (placeholder)
function viewCarDetails(carId) {
  const car = cars.find((c) => c.id === carId);
  if (car) {
    alert(
      `Viewing details for: ${car.year} ${
        car.make.charAt(0).toUpperCase() + car.make.slice(1)
      } ${car.model}\nPrice: $${car.price.toLocaleString()}\nLocation: ${
        car.location
      }`
    );
  }
}

// Update models based on selected make
document.getElementById("make").addEventListener("change", function () {
  const modelSelect = document.getElementById("model");
  const selectedMake = this.value;

  // Clear existing options
  modelSelect.innerHTML = '<option value="">All Models</option>';

  if (selectedMake) {
    const models = [
      ...new Set(
        cars
          .filter((car) => car.make === selectedMake)
          .map((car) => car.model)
      ),
    ];
    models.forEach((model) => {
      const option = document.createElement("option");
      option.value = model.toLowerCase();
      option.textContent = model;
      modelSelect.appendChild(option);
    });
  }
});

// Initialize page
document.addEventListener("DOMContentLoaded", function () {
  populateFeaturedCars();
});
