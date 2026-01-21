const listingsContainer = document.getElementById("listings");

async function loadListings() {
  try {
    const response = await fetch("airbnb_sf_listings_500.json");
    const data = await response.json();

    // Only first 50 listings
    const listings = data.slice(0, 50);

    listings.forEach(listing => {
      const card = document.createElement("div");
      card.className = "listing-card";

      const amenities = listing.amenities
        ? listing.amenities.split(",").slice(0, 10).join(", ")
        : "No amenities listed";

      card.innerHTML = `
        <img 
          class="thumbnail"
          src="${listing.picture_url || 'https://via.placeholder.com/300'}"
          alt="Listing Image"
        />

        <div class="listing-content">
          <h2>${listing.name || "No title"}</h2>

          <span class="price">$${listing.price}</span>

          <p class="description">
            ${listing.description || "No description available"}
          </p>

          <div class="host">
            <img 
              src="${listing.host_picture_url || 'https://via.placeholder.com/50'}"
              alt="Host"
            />
            <span>${listing.host_name || "Unknown Host"}</span>
          </div>

          <button class="toggle-btn">Show Amenities</button>
          <p class="amenities hidden">
            <strong>Amenities:</strong> ${amenities}
          </p>
        </div>
      `;

      const toggleBtn = card.querySelector(".toggle-btn");
      const amenitiesPara = card.querySelector(".amenities");

      toggleBtn.addEventListener("click", () => {
        amenitiesPara.classList.toggle("hidden");
        toggleBtn.textContent =
          amenitiesPara.classList.contains("hidden")
            ? "Show Amenities"
            : "Hide Amenities";
      });

      listingsContainer.appendChild(card);
    });

  } catch (error) {
    console.error("Error loading listings:", error);
  }
}

loadListings();