// kwiik
// by walitam & h912 - do anything you want, just credit us please
/* versions:
done 0.1 : technical test
done 0.2 : buildings alpha (ex : press) 
upcoming 0.3 : auto-kiwi generator
*/

$body = $("body");

$(document).on({
    ajaxStart: function() { $body.addClass("loading");    },
     ajaxStop: function() { $body.removeClass("loading"); }    
});

// define variables
let saveMade = false;
let kiwis = 0;
let defaultKiwiMakeCount = 1;
let kiwiMakeCount = 1;
let pressCount = 0;
let pressPrice = 250;
let extractorCount = 0;
let extractorMakeCount = 5;
let extractorPrice = 15000;
let lds = localDataStorage("kwiikStorage");
let kiwiCounter = document.getElementById("kiwiCounter");
let kiwiCounterText = document.getElementById("kiwiCounterText");
let pressCounter = document.getElementById("pressCounter");
let pressCounterText = document.getElementById("pressCounterText");
let extractorCounter = document.getElementById("extractorCounter");
let extractorCounterText = document.getElementById("extractorCounterText");
let makeKiwiButton = document.getElementById('makeKiwiButton');
let kiwiPressButton = document.getElementById('kiwiPressButton');

// start logic
window.onload = () => {
    if (isNaN(lds.get('kiwis'))){
        lds.set('kiwis', 0);
    }
    saveMade = lds.get("saveMade");
    kiwis = lds.get("kiwis");
    kiwiMakeCount = lds.get("kiwiMakeCount");
    pressCount = lds.get("pressCount");
    pressPrice = lds.get("pressPrice");
    extractorCount = lds.get("extractorCount");
    extractorMakeCount = lds.get("extractorMakeCount");
    extractorPrice = lds.get("extractorPrice");

    makeKiwiButton.innerHTML = `make kiwi (${kiwiMakeCount})`;
    kiwiCounterText.innerHTML = `${kiwis} kiwis`;
    pressCounterText.innerHTML = `${pressCount} presses`;
    extractorCounterText.innerHTML = `${extractorCount} extractors`;

    let pressToAdd = pressCount;
    while(pressToAdd > 0){
        pressToAdd--;
        let btn = document.createElement("button");
        btn.innerHTML = "Press";
        btn.name = "PRESS";
        btn.className = "PressStyle";
        document.body.appendChild(btn);
    }

    if (saveMade == false) {
        kiwiCounterText.innerHTML = `${kiwis} kiwis`;
        pressCounterText.innerHTML = `${pressCount} presses`;
    }
};

// click kiwi function
function makeKiwi() {
    kiwis+=kiwiMakeCount;
    kiwiCounterText.innerHTML = `${kiwis} kiwis`;
}

// runs when you buy a press
function buyPress() {
    if (kiwis - pressPrice >= 0){
        kiwis -= pressPrice;
        pressCount += 1;
        console.log("press bought");
        console.log(pressCount + "press");
        kiwiCounterText.innerHTML = `${kiwis} kiwis`;
        pressCounterText.innerHTML = `${pressCount} presses`;
        // create the button when buyPress clicked
        let btn = document.createElement("button");
        btn.innerHTML = "Press";
        btn.name = "PRESS";
        btn.className = "PressStyle";
        // add press to html
        document.body.appendChild(btn);
        if (pressCount > 0) {
            kiwiMakeCount = defaultKiwiMakeCount + pressCount;
            document.getElementById("makeKiwiButton").innerHTML = `make kiwi (${kiwiMakeCount})`;
        }
        // calculate new pressPrice and flatten it
        pressPrice = Math.floor(pressPrice * 1.2);
        document.getElementById("kiwiPressButton").innerHTML = `buy press (${pressPrice})`;
    } else {
        let missingKiwis = pressPrice - kiwis;
        alert(`You don't have enough kiwis (missing ${missingKiwis} kiwis)`);
    }
}

function buyExtractor(){
    if (kiwis - extractorPrice >= 0){
        kiwis -= extractorPrice;
        extractorCount += 1;
        console.log("extractor bought");
        console.log(extractorCount + "extractor");
        kiwiCounterText.innerHTML = `${kiwis} kiwis`;
        extractorCounterText.innerHTML = `${extractorCount} extractors`;
    } else {
        let missingKiwis = pressPrice - kiwis;
        alert(`You don't have enough kiwis (missing ${missingKiwis} kiwis)`);
    }
}

// reset kiwi function
function resetSave(){
    lds.clear();
    saveMade = false;
    kiwis = 0;
    pressCount = 0;
    pressPrice = 250;
    kiwiMakeCount = 1;
    extractorPrice = 15000;
    extractorCount = 0;
    extractorMakeCount = 5;
    kiwiCounterText.innerHTML = `${kiwis} kiwis`;
    pressCounterText.innerHTML = `${pressCount} press`;
    extractorCounterText.innerHTML = `${extractorCount} extractors`;
    makeKiwiButton.innerHTML = `make kiwi (${kiwiMakeCount})`;
    kiwiPressButton.innerHTML = `buy press (${pressPrice})`;
    $('.PressStyle').remove();
}

// makes presses show
function createButton(){
    var createButton = document.createElement('BUTTON');
    var buttonText = document.createTextNode('Press');
    createButton.appendChild(text);
    document.getElementById('createButton').style.border = "rgb(0, 138, 185) solid 5px";
    document.getElementById('createButton').style.color = "rgb(43, 150, 87)";
    document.getElementById('createButton').style.opacity = "100%";
}

// debug functions don't touch
function getSaveMade(){
    console.log(saveMade);
}
function getKiwis(){
    console.log(kiwis);
}
function getDefaultKiwiMakeCount(){
    console.log(defaultKiwiMakeCount);
}
function getKiwiMakeCount(){
    console.log(kiwiMakeCount);
}
function getPressCount(){
    console.log(pressCount);
}
function getPressPrice(){
    console.log(pressPrice);
}

//check every second (will probably begin to be extremely laggy in the future sorry)
setInterval(function(){ 
    // click upgrades unlock check
    if (kiwis > pressPrice - 1) {
        document.getElementById('kiwiPressButton').style.border = "rgb(0, 138, 185) solid 5px";
        document.getElementById('kiwiPressButton').style.color = "rgb(43, 150, 87)";
        document.getElementById('kiwiPressButton').style.opacity = "100%";
    } else {
        document.getElementById('kiwiPressButton').style.border = "rgb(80, 80, 80) solid 5px";
        document.getElementById('kiwiPressButton').style.color = "rgb(75, 75, 75)";
        document.getElementById('kiwiPressButton').style.opacity = "0.5";
    }
    
    if (kiwis > extractorPrice - 1) {
        document.getElementById('buyExtractorButton').style.border = "rgb(102, 0, 255) solid 5px";
        document.getElementById('buyExtractorButton').style.color = "rgb(153, 51, 255)";
        document.getElementById('buyExtractorButton').style.opacity = "100%";
    } else {
        document.getElementById('buyExtractorButton').style.border = "rgb(80, 80, 80) solid 5px";
        document.getElementById('buyExtractorButton').style.color = "rgb(75, 75, 75)";
        document.getElementById('buyExtractorButton').style.opacity = "0.5";
    }
    if (extractorCount > 0) {
        kiwis = kiwis + extractorMakeCount * extractorCount;
        kiwiCounterText.innerHTML = `${kiwis} kiwis`;
    }
}, 1000);

// before quitting
window.onbeforeunload = () => {
    saveMade = true;
    lds.set("saveMade", saveMade);
    lds.set("kiwis", kiwis);
    lds.set("kiwiMakeCount", kiwiMakeCount);
    lds.set("pressCount", pressCount);
    lds.set("pressPrice", pressPrice);
    lds.set("extractorCount", extractorCount);
    lds.set("extractorMakeCount", extractorMakeCount);
    lds.set("extractorPrice", extractorPrice);
};