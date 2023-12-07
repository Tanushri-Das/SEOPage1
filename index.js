
var selectedFilesByCard = {};
var currentCardIndex;

function handleAttachmentIconClick(icon) {
  currentCardIndex = icon
    .closest(".card")
    .getAttribute("data-card-index");
  console.log("Paperclip icon clicked for card index:", currentCardIndex);

  attachmentCountElement = document.getElementById(
    "attachmentCount_" + currentCardIndex
  );

  console.log("Current cardIndex value:", currentCardIndex);

  displaySelectedImages(currentCardIndex);
}

document
  .querySelector(".scrollable-container")
  .addEventListener("scroll", function () {
    var container = document.querySelector(".scrollable-container");
    var scrollPosition = container.scrollLeft;

    if (scrollPosition > container.clientWidth / 2) {
      container.style.width = "200%";
    } else {
      container.style.width = "100%";
    }
  });

function handleAttachmentSelection() {
  var attachmentInput = document.getElementById("attachmentInput");
  var selectedFile = attachmentInput.files[0];

  if (selectedFile) {
    if (!selectedFilesByCard[currentCardIndex]) {
      console.log(selectedFilesByCard[currentCardIndex]);
      selectedFilesByCard[currentCardIndex] = [];
    }

    selectedFilesByCard[currentCardIndex].push(selectedFile);

    var attachmentCountElement = document.getElementById(
      "attachmentCount_" + currentCardIndex
    );
    attachmentCountElement.textContent =
      selectedFilesByCard[currentCardIndex].length;

    console.log(
      "Attachment Count:",
      selectedFilesByCard[currentCardIndex].length
    );

    attachmentInput.value = "";

    displaySelectedImages(currentCardIndex);
  }
}

function displaySelectedImages(cardIndex) {
  console.log("Displaying images for card index:", cardIndex);
  var selectedImagePreviewContainer = document.getElementById(
    "selectedImagePreviewContainer_" + cardIndex
  );
  console.log(
    "Selected Image Preview Container:",
    selectedImagePreviewContainer
  );

  selectedImagePreviewContainer.innerHTML = "";

  if (selectedFilesByCard[cardIndex]) {
    var loadCounter = 0;

    function loadImage(index) {
      var imageElement = document.createElement("img");
      imageElement.alt = "Selected Image";
      imageElement.className = "custom-circle-image";
      imageElement.style.maxWidth = "60px";
      imageElement.style.maxHeight = "60px";

      var reader = new FileReader();
      reader.onload = function (event) {
        imageElement.src = event.target.result;

        selectedImagePreviewContainer.appendChild(imageElement);

        console.log("Image URL:", imageElement.src);

        loadCounter++;

        if (loadCounter === selectedFilesByCard[cardIndex].length) {
          selectedImagePreviewContainer.style.display = "block";
          console.log("Image container displayed");

          console.log("Image attached to card index:", cardIndex);

          console.log(
            "Before setting display style:",
            selectedImagePreviewContainer.style.display
          );
          selectedImagePreviewContainer.style.display = "block";
          console.log(
            "After setting display style:",
            selectedImagePreviewContainer.style.display
          );
        } else {
          loadImage(index + 1);
        }
      };
      reader.readAsDataURL(selectedFilesByCard[cardIndex][index]);
    }

    loadImage(0);
  }
}