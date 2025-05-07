let colorsArr = [];
const colorPicker = document.getElementById("color-picker");
const colorScheme = document.getElementById("color-scheme");
const colorMode = document.getElementById("color-mode");
const footer = document.getElementById("footer");
const mainContainer = document.getElementById("main-container");
const colorCol = document.querySelectorAll(".color-hex");

function renderFooter() {
  let footerHtml = "";
  for (let color of colorsArr) {
    footerHtml += `
            <div><p>${color.hex.value}</p></div>
        `;

    colorCol.style.setProperty("color", `${color.hex.value}`);
  }
  footer.innerHTML = footerHtml;
}

function renderColors() {
  let colorHtml = "";
  for (let i = 0; i < colorsArr.length; i++) {
    colorHtml += `
            <div class="color-hex"></div>
        `;
  }
  mainContainer.innerHTML = colorHtml;
}

colorScheme.addEventListener("submit", (e) => {
  e.preventDefault();
  const seedColor = colorPicker.value;
  const colorSchemeMode = colorMode.value;
  const apiUrl = "https://www.thecolorapi.com";
  const queryString = `/scheme?hex=${seedColor.slice(
    1
  )}&mode=${colorSchemeMode}&count=5`;

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  fetch(apiUrl + queryString, options)
    .then((res) => res.json())
    .then((data) => {
      colorsArr = data.colors;
      renderColors();
      renderFooter();
    });
});
