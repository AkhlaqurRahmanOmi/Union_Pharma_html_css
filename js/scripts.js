document.addEventListener("DOMContentLoaded", function () {
  const medicineList = document.getElementById("medicineList");
  const genericSelect = document.getElementById("genericSelect");
  const therapeuticSelect = document.getElementById("therapeuticSelect");

  // Function to create a medicine card
  function createMedicineCard(medicine) {
    const article = document.createElement("article");
    article.classList.add("col-md-6", "col-lg-4", "mt-12");

    article.innerHTML = `
            <div class="card card-style5 border-0 shadow border-radius-5 h-100">
                <div class="card-img">
                     <img src="${medicine.ImageURL}" alt="${medicine["Brand Name"]} Image" class="card-img-top">
                </div>
                <div class="card-body">
                    <h3 class="h4">${medicine["Brand Name"]}</h3>
                    <p>Generic Name: ${medicine["Generic Name"]}</p>
                    <p>Strength: ${medicine.Strength}</p>
                    <p>Dosage Description: ${medicine["Dosage Description"]}</p>
                    <p>Therapeutic Class: ${medicine["Therapeutic Class"]}</p>
                </div>
            </div>
        `;

    return article;
  }

  // Function to filter medicine cards
  function filterMedicineCards() {
    const selectedGeneric = genericSelect.value;
    const selectedTherapeutic = therapeuticSelect.value;

    const medicineCards = document.querySelectorAll("#medicineList article");
    medicineCards.forEach((card) => {
      const genericName = card
        .querySelector("p:nth-child(3)")
        .textContent.split(":")[1]
        .trim();
      const therapeuticClass = card
        .querySelector("p:nth-child(5)")
        .textContent.split(":")[1]
        .trim();

      if (
        (selectedGeneric === "" || selectedGeneric === genericName) &&
        (selectedTherapeutic === "" || selectedTherapeutic === therapeuticClass)
      ) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  }

  // Event listeners for filter select elements
  genericSelect.addEventListener("change", filterMedicineCards);
  therapeuticSelect.addEventListener("change", filterMedicineCards);

  // Function to fetch medicine data and populate the medicine cards
  function fetchAndPopulateMedicineCards() {
    // Replace this fetch call with your actual fetch call to get medicine data
    fetch("medicines.json")
      .then((response) => response.json())
      .then((data) => {
        // Clear existing content
        medicineList.innerHTML = "";

        // Populate filter options
        const genericNames = [
          ...new Set(data.map((medicine) => medicine["Generic Name"])),
        ];
        genericNames.forEach((name) => {
          const option = document.createElement("option");
          option.textContent = name;
          option.value = name;
          genericSelect.appendChild(option);
        });

        const therapeuticClasses = [
          ...new Set(data.map((medicine) => medicine["Therapeutic Class"])),
        ];
        therapeuticClasses.forEach((cls) => {
          const option = document.createElement("option");
          option.textContent = cls;
          option.value = cls;
          therapeuticSelect.appendChild(option);
        });

        // Create and append medicine cards
        data.forEach((medicine) => {
          const card = createMedicineCard(medicine);
          medicineList.appendChild(card);
        });
      })
      .catch((error) => console.error("Error fetching medicine data:", error));
  }

  // Fetch and populate medicine cards on page load
  fetchAndPopulateMedicineCards();
});
