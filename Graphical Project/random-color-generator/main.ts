let Body: any = document.querySelector("body");
let mode = document.querySelector("#mode");
let colorCode: any = document.querySelector("#color-code");

let changeMode = () => {
    let hexCode = `#${Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6,"0")}`;
    console.log(hexCode);
    Body.style.backgroundColor = hexCode
    colorCode.innerHTML = hexCode;
    colorCode.style.color = hexCode
    navigator.clipboard.writeText(hexCode)
}

mode?.addEventListener("click", changeMode)