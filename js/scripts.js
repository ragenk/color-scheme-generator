let colorsArr = [];
const colorPicker = document.getElementById("color-picker");
const colorScheme = document.getElementById("color-scheme");
const colorMode = document.getElementById("color-mode");
const footer = document.getElementById("footer");
const mainContainer = document.getElementById("main-container");

function renderMain() {
  mainContainer.innerHTML = "";
  colorsArr.forEach((color) => {
    const colorDiv = document.createElement("div");
    colorDiv.className = "color-hex";
    colorDiv.style.backgroundColor = color.hex.value;
    colorDiv.setAttribute("data-hex", color.hex.value);
    mainContainer.appendChild(colorDiv);
  });
}

function renderFooter() {
  let footerHtml = "";
  for (let color of colorsArr) {
    footerHtml += `
            <div><p>${color.hex.value}</p></div>
        `;
  }
  footer.innerHTML = footerHtml;
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
      renderMain();
      renderFooter();
    });
});
