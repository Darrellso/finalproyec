//customizatio.js
// Importar la clase RecommendationBuilder
import { RecommendationBuilder } from "./modules/builder.js";

// Obtener elementos del DOM
const customizationForm = document.getElementById("customization-form");
const potDecorationsToggle = document.getElementById("pot-decorations-toggle");
const potColorToggle = document.getElementById("pot-color-toggle");
const potColorOptionsList = document.getElementById("pot-color-options-list");
const plantSelect = document.getElementById("plant");
const plantPreviewDiv = document.getElementById("plant-preview");
const orderInfoDiv = document.getElementById("order-info");

// Evento de cambio en el toggle de pot color
potColorToggle.addEventListener("change", function () {
  if (potColorToggle.checked) {
    potColorOptionsList.style.display = "block";
  } else {
    potColorOptionsList.style.display = "none";
  }
});
// Obtener el botón "Check store availability"
const checkStoreButton = document.getElementById("check-store-button");

// Agregar evento de clic al botón
checkStoreButton.addEventListener("click", () => {
  // Redirigir al usuario al view de producto (product.html)
  window.location.href = "product.html";
});

// Evento de submit del formulario de personalización
customizationForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Evitar el envío del formulario

  // Obtener respuestas del formulario de personalización
  const pot = document.querySelector('input[name="pot"]:checked').value;
  const potDecorations = potDecorationsToggle.checked ? "Yes" : "No";
  const potColor = potColorToggle.checked
    ? document.querySelector('input[name="pot-color"]:checked').value
    : "No";
  const plant = plantSelect.value;
  const soil = document.querySelector('input[name="soil"]:checked').value;
  const extras = Array.from(
    document.querySelectorAll('input[name="extras"]:checked'),
  ).map((el) => el.value);

  // Construir objeto de recomendación personalizada
  const customizedRecommendation = RecommendationBuilder.withPot(pot)
    .withPotDecorations(potDecorations)
    .withPotColor(potColor)
    .withPlant(plant)
    .withSoil(soil)
    .withExtras(extras)
    .build();

  // Actualizar la vista de preview de planta
  plantPreviewDiv.innerHTML = "";
  const plantPreviewCard = customizedRecommendation.render();
  plantPreviewDiv.appendChild(plantPreviewCard);

  // Actualizar la vista de información de la orden
  orderInfoDiv.innerHTML = "";
  const orderInfo = customizedRecommendation.getOrderInfo();
  orderInfoDiv.appendChild(orderInfo);
});
