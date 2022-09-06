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
let lds = localDataStorage("kwiikStorage");
let kiwiCounter = document.getElementById("kiwiCounter");
let kiwiCounterText = document.getElementById("kiwiCounterText");
let pressCounter = document.getElementById("pressCounter");
let pressCounterText = document.getElementById("pressCounterText");
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

    makeKiwiButton.innerHTML = `make kiwi (${kiwiMakeCount})`;
    kiwiCounterText.innerHTML = `${kiwis} kiwis`;

    pressCounterText.innerHTML = `${pressCount} presses`;

    let pressToAdd = pressCount;
    while(pressToAdd > 0){
        pressToAdd--;
        let btn = document.createElement("button");
        btn.innerHTML = "Press";
        btn.name = "PRESS";
        btn.className = "PressStyle";
        document.body.appendChild(btn);
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

// reset kiwi function
function resetSave(){
    lds.clear();
    saveMade = false;
    kiwis = 0;
    pressCount = 0;
    pressPrice = 250;
    kiwiMakeCount = 1;
    kiwiCounterText.innerHTML = `${kiwis} kiwis`;
    pressCounterText.innerHTML = `${pressCount} press`;
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

    
}, 1000);

// before quitting
window.onbeforeunload = () => {
    saveMade = true;
    lds.set("saveMade", saveMade);
    lds.set("kiwis", kiwis);
    lds.set("kiwiMakeCount", kiwiMakeCount);
    lds.set("pressCount", pressCount);
    lds.set("pressPrice", pressPrice);
};