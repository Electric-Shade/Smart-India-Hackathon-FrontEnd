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
  const documents = []
  const box = document.getElementsByClassName("chatbox")[0]
  for (let i=0; i < imagesArray.length; i++){

        Tesseract.recognize(
            imagesArray[i],
            'eng',
            { logger: m => console.log(m) }
        ).then(({ data: { text } }) => {
            console.log(text);
            documents.push(text);
            if (imageNames.length === i+1){
                fetch("http://127.0.0.1:8000/load_documents/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body : JSON.stringify({documents})
                }).then(res=>{
                    res.json().then(r=>{
                        console.log(r.summary);
                        let a= document.createElement("div");
                        a.innerHTML = r.summary;
                        a.setAttribute("style", "width: 650px; color: beige; background: purple; border-radius:15px; padding:20px")
                        box.appendChild(a);
                    })
                }).catch(err=>{
                    console.log(err);
                })
            }
        })
  }

}

const bt=  document.getElementById("submit")
bt.addEventListener("click", ()=>{
  let text = document.getElementById("userin").value;
  if (!text) return;
  const box = document.getElementsByClassName("chatbox")[0]
  let bubble = document.createElement("div");
  bubble.innerHTML = text;
  bubble.setAttribute("style", "width: 650px; color: black; background: cyan; border-radius:15px; padding:20px;")
  box.appendChild(bubble)
  fetch("http://127.0.0.1:8000/chat_response/", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body : JSON.stringify({prompt: text}) 
  }).then(res=>{
    res.json().then(r=>{
      let a = document.createElement("div");
      a.innerHTML = r.reply;
      a.setAttribute("style", "width: 650px; color: beige; background: purple; border-radius:15px; padding:20px;")
      box.appendChild(a);
    })
  })
})




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
