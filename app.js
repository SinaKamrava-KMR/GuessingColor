const header = document.querySelector(".header");
const colorText = document.querySelector(".color-text");
const colorBox = document.getElementById("color-box");
const gameState = document.getElementById("gameState")
const newColors = document.getElementById("newColors")

const easyBtn = document.getElementById("Easy");
const hardBtn = document.getElementById("Hard");
let isHardGame = false;
let colors,colorRandomIndex,hexRandomColor;


start(randomColors());



newColors.addEventListener("click", () => {

  if (isHardGame) {
    start(generate3RandomNearColor());
  } else {
    start(randomColors());
  }
 
})

easyBtn.addEventListener("click", () => {
  isHardGame=false
  easyBtn.classList.add("active")
  hardBtn.classList.remove("active")
  start(randomColors());
})

hardBtn.addEventListener("click", () => {
  isHardGame = true;
  easyBtn.classList.remove("active")
  hardBtn.classList.add("active");
  start(generate3RandomNearColor());
})


function start(colors) {
  gameState.textContent="Start"
  
  colorRandomIndex = Math.floor(Math.random() * 3)

  hexRandomColor = `#${colors[colorRandomIndex]}`;
  header.style.backgroundColor=`#${randomColors()[1]}`

  colorText.textContent=hexToRgb(hexRandomColor)
  genarateBox(colors);
  getBoxes();
}


function getBoxes() {
  
  Array.from(colorBox.children).forEach((box) => {
    console.log(box);
    box.addEventListener("click", (e) => {
      let bgColor = rgbToHex(e.target.style.backgroundColor);
      if (hexRandomColor == bgColor) {
        
        gameState.textContent="Correct !"
      } else {
        box.remove()
        gameState.textContent="Try Again "
      }

    })
  })
}

function genarateBox(colors) {
  colorBox.innerHTML = ``;
  
  colors.forEach((color) => {
    let box = document.createElement("div");
    box.classList.add("box");
    box.style.backgroundColor = `#${color}`;
    colorBox.append(box);
  })


}

function randomColors() {
  let colors = []
  for (let i = 0; i < 3; i++){
    colors.push(get6CharOfStr(Math.random().toString(16)))
  }
  return colors;
}

function get6CharOfStr(str) {
  let charList = [...str].splice(-7, 6);
  return charList.join("")
}

function hexToRgb(hex) {
  return `rgb(${hex.match(/\w\w/g).map(x => +`0x${x}`)})`
}

function rgbToHex([...rgbStr]) {
  //remover 'rgb(' and ')' char from rgbstr
  rgbStr.splice(0, 4)
  rgbStr.splice(-1, 1)
 
  let [r, g, b] = rgbStr.join("").split(",");
  
  
  let hex = '#';
  [r, g, b].forEach(num => {
    num = +num.trim("")
    
    hex += num.toString(16);
   
  })
  return hex
}

function generate3RandomNearColor() {
  let hex = get6CharOfStr(Math.random().toString(16));
  let rgbColor = [...hexToRgb(hex)];

  rgbColor.splice(0, 4)
  rgbColor.splice(-1, 1)
 
  let colors = [hex];
  let [r, g, b] = rgbColor.join("").split(",");
  

  let r1 = +r > 80 ? +r - 50 : +r + 10;
  let r2 = +r < 80 ? +r + 50 : +r - 10;

  let fRgb = `rgb(${r1},${g},${b})`;
  let sRgb = `rgb(${r2},${g},${b})`;

  colors.push(rgbToHex(fRgb).substring(1))
  colors.push(rgbToHex(sRgb).substring(1))
  console.log(colors);

  colors.forEach(hex => {
    if (hex.length != 6) {
      colors = generate3RandomNearColor();
      
    }
  })

  return colors
  
}















// function get2charOfStr([...str]) {
//   let chars = []
//   for (let i = 0; i < 3; i++) {
//     chars.push(str.splice(0, 2).join(''))
    
//   }

//   return chars


// }





// function hexToRgb(hex) {
//   let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
//   return result ? [
//      parseInt(result[1], 16),
//      parseInt(result[2], 16),
//      parseInt(result[3], 16)
//   ]: null;
// }
