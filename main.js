// kwiik
// by walitam & h912 - do anything you want, just credit us please
/* versions:
done 0.1 : technical test
upcoming 0.2 : buildings alpha (ex : press) 
*/

$body = $("body");

$(document).on({
    ajaxStart: function() { $body.addClass("loading");    },
     ajaxStop: function() { $body.removeClass("loading"); }    
});

// define variables
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
    kiwis = lds.get("kiwis");
    pressCount = lds.get("pressCount");
    pressPrice = lds.get("pressPrice");

    makeKiwiButton.innerHTML = `make kiwi (${kiwiMakeCount})`;
    kiwiCounterText.innerHTML = `${kiwis} kiwis`;

    pressCounterText.innerHTML = `${pressCount} presses`;

    let pressToAdd = pressCount;
    while(pressToAdd > 0){
        pressToAdd--
        let btn = document.createElement("button");
        btn.innerHTML = "Press";
        btn.name = "PRESS";
        btn.className = "PressStyle";
        document.body.appendChild(btn);
    }
};

// click kiwi function
function makeKiwi() {
    console.log("kiwi made");
    kiwis+=kiwiMakeCount;
    console.log(kiwis);
    kiwiCounterText.innerHTML = `${kiwis} kiwis`;
}

// runs when you buy a press
function buyPress() {
    if (kiwis - pressPrice >= 0){
        kiwis -= pressPrice;
        pressCount += 1;
        console.log("press bought");
        console.log(pressCount + "press")
        kiwiCounterText.innerHTML = `${kiwis} kiwis`;
        pressCounterText.innerHTML = `${pressCount} presses`;
        // create the button when buyPress clicked
        let btn = document.createElement("button");
        btn.innerHTML = "Press";
        btn.name = "PRESS";
        btn.className = "PressStyle";
        // append in the html document
        document.body.appendChild(btn);
        if (pressCount > 0) {
            kiwiMakeCount = kiwiMakeCount + pressCount;
        }
    } else {
        alert("you cannot buy a press rn");
    }
} 

// reset kiwi function
function resetSave(){
    lds.clear();
    kiwis = 0;
    pressCount = 0;
    kiwiMakeCount = 1;
    kiwiCounterText.innerHTML = `${kiwis} kiwis`;
    pressCounterText.innerHTML = `${pressCount} press`;
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

//check every second (will probably begin to be extremely laggy in the future sorry)
setInterval(function(){ 
    // click upgrades unlock check
    if (kiwis > 249) {
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
    lds.set("kiwis", kiwis);
    lds.set("pressCount", pressCount);
    lds.set("pressPrice", pressPrice);
};