const popularCafe = [
  { name: "Cafe A", rating: 4.5 },
  { name: "Cafe B", rating: 4.0 },
  { name: "Cafe C", rating: 3.5 },
];
function* getTopCafes(cafes) {
  for (const cafe of cafes) {
    yield cafe;
  }
  return null;
}

navigator.geolocation.getCurrentPosition(
  (position) => {
    const { latitude, longitude } = position.coords;
    const map = L.map("map").setView([latitude, longitude], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap",
    }).addTo(map);

    L.marker([latitude, longitude])
      .addTo(map)
      .bindPopup("You are here")
      .openPopup();

    const query = `
                    [out:json];
                    node
                    ["amenity"="cafe"]
                    (around:1000, ${latitude}, ${longitude});
                    out;
                `;

    fetch("https://overpass-api.de/api/interpreter", {
      method: "POST",
      body: query,
    })
      .then((response) => response.json())
      .then((data) => {
        data.elements.forEach((cafe) => {
          L.marker([cafe.lat, cafe.lon])
            .addTo(map)
            .bindPopup(cafe.tags.name || "Cafe");
        });
      });
  },
  (error) => {
    console.error("Error getting location:", error);
    document.getElementById("map").style.display = "none";
    const listContainer = document.getElementById("cafe-list-container");
    listContainer.style.display = "block";

    const topCafesGenerator = getTopCafes(popularCafe);

    for (const cafe of topCafesGenerator) {
      const card = document.createElement("div");
      card.className = "cafe-card";
      card.innerHTML = `
        <h3>${cafe.name}</h3>
        <p>Рейтинг: ${cafe.rating}</p>
        <hr>
      `;
      listContainer.appendChild(card);
    }
  },
);
