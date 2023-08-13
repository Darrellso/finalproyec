//build.js
export const RecommendationBuilder = {
  recommendation: {
    plantImage: "",
    plantName: "",
    soilImage: "",
    soilType: "",
    potImage: "",
    potMaterial: "",
    potDecoration: "",
    potColor: "",
    extras: [],
  },

  withLight(light) {
    const lightConfig = {
      indirect: { plant: "fern", plantName: "Fern" },
      lot_of_indirect: { plant: "peace-lily", plantName: "Peace Lily" },
      outside: { plant: "cactus", plantName: "Cactus" },
    };
    const config = lightConfig[light];
    if (config) {
      this.recommendation.plantImage = config.plant;
      this.recommendation.plantName = config.plantName;
    }
    console.log(this.recommendation.plantImage);
    return this;
  },

  withSunlight(sunlight) {
    const soilConfig = {
      direct: { soil: "soil-composted", soilType: "Composted Soil" },
      indirect: { soil: "soil-fertilized", soilType: "Fertilized Soil" },
    };
    const config = soilConfig[sunlight];

    if (config) {
      this.recommendation.soilImage = config.soil;
      this.recommendation.soilType = config.soilType;
    }
    console.log(this.recommendation.soilImage);
    return this;
  },

  withPets(pets) {
    const plantConfig = {
      yes_pets: { plant: "fern", plantName: "Fern" },
      no_pets: { plant: "cactus", plantName: "Cactus" },
    };
    const config = plantConfig[pets];
    if (config) {
      this.recommendation.plantImage = config.plant;
      this.recommendation.plantName = config.plantName;
    }
    console.log(pets);
    return this;
  },

  withWatering(watering) {
    const potConfig = {
      overwater: { potImage: "simple-clay-pot", potMaterial: "Clay Pot" },
      underwater: {
        potImage: "simple-ceramic-pot",
        potMaterial: "Ceramic Pot",
      },
      neither: { potImage: "simple-ceramic-pot", potMaterial: "Ceramic Pot" },
    };
    const config = potConfig[watering];
    if (config) {
      this.recommendation.potImage = config.potImage;
      this.recommendation.potMaterial = config.potMaterial;
    }
    console.log(watering);
    return this;
  },

  withPot(pot) {
    const potConfig = {
      clay: { potMaterial: "Clay Pot" },
      ceramic: { potMaterial: "Ceramic Pot" },
    };
    const config = potConfig[pot];
    if (config) {
      this.recommendation.potMaterial = config.potMaterial;
    }
    return this;
  },

  withStyle(style) {
    const potConfig = {
      minimalism: { potDecoration: "", potColor: "clay" },
      decoration: { potDecoration: "-Decorated", potColor: "clay" },
      bright: { potDecoration: "-Decorated", potColor: "blue" },
    };
    const config = potConfig[style];
    if (config) {
      this.recommendation.potDecoration = config.potDecoration;
      this.recommendation.potColor = config.potColor;
    }
    console.log(style);
    return this;
  },

  withElements(elements) {
    if (elements.includes("moss")) {
      this.recommendation.extras.push("Moss-Pole");
    }
    if (elements.includes("pebbles")) {
      this.recommendation.extras.push("Pebbles");
    }
    if (elements.includes("plants")) {
      this.recommendation.extras.push("Mini-Plants");
    } 
    return this;
  },
  
  withPotStyle(potStyle) {
    // Agrega lógica para actualizar la configuración de la maceta aquí
    this.recommendation.potStyle = potStyle;
    return this;
  },

  withPlantStyle(plantStyle) {
    // Agrega lógica para actualizar la configuración de la planta aquí
    this.recommendation.plantStyle = plantStyle;
    return this;
  },

  withSoilType(soilType) {
    // Agrega lógica para actualizar la configuración del suelo aquí
    this.recommendation.soilType = soilType;
    return this;
  },

  withExtras(extras) {
    // Agrega lógica para actualizar la configuración de los extras aquí
    this.recommendation.extras = extras;
    return this;
  },
  build() {
    const recommendation = this.recommendation; // Almacenar referencia
    const testObject = JSON.stringify(this.recommendation);
    localStorage.setItem("localPlant", testObject);
    console.log(this.recommendation);
    return {
      render() {
        // Crear contenedor para las imágenes
        const imagesContainer = document.createElement("div");
        imagesContainer.classList.add("images-container");

        // Crear elementos de imagen y configurar sus atributos
        const plantImage = document.createElement("img");
        plantImage.src = `./Assets/plant-${recommendation.plantImage}.png`;
        plantImage.alt = recommendation.plantName;

        const potImage = document.createElement("img");
        potImage.src = `./Assets/${recommendation.potImage}${recommendation.potDecoration}.png`;
        potImage.alt = "Pot Image";

        const soilImage = document.createElement("img");
        soilImage.src = `./Assets/${recommendation.soilImage}.png`;
        soilImage.alt = "Soil Image";

        const extrasImage = document.createElement("img");
        extrasImage.src = `./Assets/${recommendation.extras}.png`;
        extrasImage.alt = "Extras";

        // Agregar imágenes al contenedor
        imagesContainer.appendChild(soilImage);
        imagesContainer.appendChild(plantImage);
        imagesContainer.appendChild(potImage);
        imagesContainer.appendChild(extrasImage);

        // ... (código para agregar imágenes extras)

        // Crear el elemento de la tarjeta de planta
        const plantCard = document.createElement("div");
        plantCard.classList.add("plant-card");
        plantCard.appendChild(imagesContainer);

        // ... (código para agregar información adicional a la tarjeta)
        localStorage.setItem('plantRecommendation', JSON.stringify(plantCard));
        return plantCard;
      },
    };
  },
};
