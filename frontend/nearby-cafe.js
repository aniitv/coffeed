navigator.geolocation.getCurrentPosition(function (position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

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
});
