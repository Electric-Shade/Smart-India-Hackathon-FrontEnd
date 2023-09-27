let input = document.querySelector("input");
let estack;
let imagesArray = [];
let imageNames = [];

input.addEventListener("change", () => {
  const files = input.files;
  for (let i = 0; i < files.length; i++) {
    imagesArray.push(files[i]);
    imageNames.push(files[i].name);
  }
  displayNames();
});

function displayNames() {
  var dispDiv = document.getElementById("imagestack");

  for (let i = 0; i < imageNames.length; i++) {
    let a = document.createElement("Button");
    name = imageNames[i];
    dispDiv.appendChild(a);
    a.innerHTML = name;
    a.setAttribute("style", "width: 100%; height: 30px; border: 1px solid #2f994d; background-color: #1d1d1d; color: white;")
  }
}
function displayImages() {
  let images = "";
  imagesArray.forEach((image, index) => {
    images += `<div class="image">
                <img src="${URL.createObjectURL(image)}" alt="image">
                <span onclick="deleteImage(${index})">&times;</span>
              </div>`;
  });
  var dispImg = document.getElementById("imagedisplay");
  let output = document.createElement("output");
  dispImg.appendChild(output);
  output.innerHTML = images;
}
