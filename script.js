let input = document.querySelector("input");
let estack;
let imagesArray = [];
let imageNames = [];

input.addEventListener("change", () => {
  const files = input.files;
  for (let i = 0; i < files.length; i++) {
    imagesArray.push(URL.createObjectURL(files[i]));
    imageNames.push(files[i].name);
  }
  displayNames();
});

function displayNames() {
  let dispDiv = document.getElementById("imagestack");

  for (let i = 0; i < imageNames.length; i++) {
    let a = document.createElement("Button");
    name = imageNames[i];
    dispDiv.appendChild(a);
    a.innerHTML = name;
    a.setAttribute("style", "width: 100%; height: 30px; border: 1px solid #2f994d; background-color: #1d1d1d; color: white;")
  }
  const img = document.getElementById("img")
  let children = dispDiv.children;
  for( let i=0; i < children.length; i++){
    children[i].addEventListener("click", ()=>{
        img.setAttribute("src", imagesArray[i])        
    })
  }
  
  Tesseract.recognize(
    imagesArray[4],
    'eng',
    { logger: m => console.log(m) }
  ).then(({ data: { text } }) => {
    console.log(text);
  })

}



// const arr = []
// function displayImages() {
//   let images = "";
//   imagesArray.forEach((image, index) => {
//     arr.push(URL.createObjectURL(image));
//   });
//   var dispImg = document.getElementById("imagedisplay");
//   let output = document.createElement("output");
//   dispImg.appendChild(output);
//   output.innerHTML = images;
// }
