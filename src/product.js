import { RecommendationBuilder } from "./modules/builder.js";

document.addEventListener("DOMContentLoaded", function () {
  // Obtener elementos del DOM
  const orderPreviewDiv = document.getElementById("order-preview");
  const orderInfoDiv = document.getElementById("order-info");
  const backToCustomizationButton = document.getElementById("back-to-customization");
  const orderNowButton = document.getElementById("order-now-button");
  const accordions = document.querySelectorAll(".accordion");

  // Obtener la información almacenada en localStorage
  const storedRecommendation = JSON.parse(localStorage.getItem("localPlant"));

// Construir el objeto de recomendación personalizada
// ...
const customizedRecommendation = RecommendationBuilder
  .withPotStyle(storedRecommendation.potMaterial)  // Usa withPotStyle en lugar de withPot
  .withPotDecorations(storedRecommendation.potDecoration)
  .withPotColor(storedRecommendation.potColor)
  .withPlantStyle(storedRecommendation.plantImage)  // Usa withPlantStyle en lugar de withPlant
  .withSoilType(storedRecommendation.soilType)
  .withExtras(storedRecommendation.extras)
  .build();
// ...
  
  // Renderizar el preview de la orden
  const orderPreviewCard = customizedRecommendation.render();
  orderPreviewDiv.appendChild(orderPreviewCard);

  // Renderizar la información de la orden
  const orderInfo = customizedRecommendation.getOrderInfo();
  orderInfoDiv.appendChild(orderInfo);

  // Mostrar el título y el precio de la orden
  const orderTitle = document.getElementById("order-title");
  orderTitle.textContent = "Your Custom Plant Order";

  const orderPrice = document.getElementById("order-price");
  orderPrice.textContent = `Total Price: $${customizedRecommendation.getTotalPrice().toFixed(2)}`;

  // Mostrar la alerta general de inventario
  const inventoryAlert = document.getElementById("inventory-alert");
  const inventoryStatus = customizedRecommendation.checkInventory();

  if (inventoryStatus === "inStock") {
    inventoryAlert.textContent = "In Stock";
    inventoryAlert.style.color = "green";
  } else if (inventoryStatus === "lowStock") {
    inventoryAlert.textContent = "One of the items in your order has limited stock. Order soon!";
    inventoryAlert.style.color = "yellow";
    orderNowButton.disabled = true;
  } else if (inventoryStatus === "outOfStock") {
    inventoryAlert.textContent = "One of the items in your order is out of stock. Please check the inventory alerts.";
    inventoryAlert.style.color = "red";
    orderNowButton.disabled = true;
  }

  // Agregar evento de clic al botón "Back to Customization"
  backToCustomizationButton.addEventListener("click", () => {
    window.location.href = "../dist/customization.html";
  });

  // Agregar evento de clic a los accordions
  accordions.forEach((accordion) => {
    accordion.addEventListener("click", () => {
      // Colapsar todos los accordions
      accordions.forEach((acc) => {
        if (acc !== accordion) {
          acc.nextElementSibling.style.maxHeight = null;
        }
      });

      // Expandir el accordion actual
      const panel = accordion.nextElementSibling;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  });

  // Mostrar solo el accordion "Inventory Alerts" si hay elementos sin stock
  if (inventoryStatus === "outOfStock") {
    const inventoryAccordion = document.getElementById("inventory-accordion");
    inventoryAccordion.style.maxHeight = inventoryAccordion.scrollHeight + "px";
  }

  // Mostrar el desglose del precio de la orden
  const priceBreakdown = document.getElementById("price-breakdown");
  const priceList = customizedRecommendation.getPriceBreakdown();

  priceList.forEach((item) => {
    const itemDiv = document.createElement("div");
    itemDiv.textContent = `${item.name}: $${item.price.toFixed(2)}`;
    priceBreakdown.appendChild(itemDiv);
  });

  // Mostrar el total de la orden
  const totalPrice = document.createElement("div");
  totalPrice.textContent = `Total: $${customizedRecommendation.getTotalPrice().toFixed(2)}`;
  priceBreakdown.appendChild(totalPrice);
});
