// kwiik

// define basic vars
var kiwis = 0;
var pressCount = 0;
var pressPrice = 25;
var lds = localDataStorage("kwiikStorage");
var kiwiCounter = document.getElementById("kiwiCounter");
var pressCounter = document.getElementById("pressCounter");
var kiwiPressUnlocked = false;
var makeKiwiButton = document.getElementById('makeKiwiButton');
var kiwiPressButton = document.getElementById('kiwiPressButton');

// start logic

window.onload = () => {
    console.log("loading script");

    if (isNaN(lds.get('kiwis'))){
        lds.set('kiwis', 0);
    }
    kiwis = lds.get("kiwis");
    kiwiPressUnlocked = lds.get("kiwiPressUnlocked");
    pressCount = lds.get("pressCount");

    kiwiCounter.innerHTML = `${kiwis} kiwis`;
};

// click kiwi function
function makeKiwi() {
    console.log("kiwi made");
    kiwis+=1;
    console.log(kiwis);
    kiwiCounter.innerHTML = `${kiwis} kiwis`;
}

function buyPress() {
    if (kiwis - pressPrice >= 0){
        kiwis -= 25;
        pressCount += 1;
        console.log("press bought");
        kiwiCounter.innerHTML = `${kiwis} kiwis`;
        pressCount.innerHTML = `${pressCount} press`;
    } else {
        alert("you cannot buy a press rn");
    }
}

// reset kiwi function
function resetKiwis(){
    lds.clear();
    kiwis = 0;
    kiwiCounter.innerHTML = `${kiwis} kiwis`;
}

//check every second
setInterval(function(){ 
    // click upgrades unlock check
    if (kiwis > 24) {
        console.log("25 or more");
        kiwiPressUnlocked = true;
        document.getElementById('kiwiPressButton').style.border = "rgb(0, 138, 185) solid 5px";
        document.getElementById('kiwiPressButton').style.color = "rgb(43, 150, 87)";
        document.getElementById('kiwiPressButton').style.opacity = "100%";
    } else {
        console.log("24 or less");
        kiwiPressUnlocked = false;
        document.getElementById('kiwiPressButton').style.border = "rgb(80, 80, 80) solid 5px";
        document.getElementById('kiwiPressButton').style.color = "rgb(75, 75, 75)";
        document.getElementById('kiwiPressButton').style.opacity = "0.5";
    }
}, 1000);

if(kiwiPressUnlocked == true){
    document.getElementById('kiwiPressButton').style.border = "rgb(43, 150, 87)";
    document.getElementById('kiwiPressButton').style.color = "rgb(43, 150, 87)";
    document.getElementById('kiwiPressButton').style.opacity = "100%";
    document.getElementById('kiwiPressButton').style.padding = "1%";
}

console.log("script loaded");

// before quitting
window.onbeforeunload = () => {
    lds.set("kiwis", kiwis);
    lds.set("kiwiPressUnlocked", kiwiPressUnlocked);
    lds.set("pressCount", pressCount);
};