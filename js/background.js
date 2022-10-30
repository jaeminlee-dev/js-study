const imageList = ['0.jpg','1.jpg','2.jpg','3.jpg',];

const chosenImage = imageList[Math.floor(Math.random() * imageList.length)];

const bgImage = document.createElement("img");

bgImage.src = `asset/img/${chosenImage}`;

document.body.appendChild(bgImage);