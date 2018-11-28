let Drawbed = {
    Selected: null,
    PercentX: (number)=>{
        return (number/667)*100
    },   
    PercentY: (number)=>{
        return (number/375)*100
    },    
    Start: (ev) => {
        console.log(ev)
    Drawbed.Selected = ev.target;
        Drawbed.StartLocation = {
            x: ev.pageX,
            y: ev.pageY
        }
    },
    StartLocation: {},
    Move: (ev) => {
        if (ev.screenX > 0) {
            Drawbed.CurrentLocation = {
                x: ev.pageX,
                y: ev.pageY
            };
        }
    },
    CurrentLocation: {},
    init: (ev) => {
        let target = document.querySelector(".drawScreen")
        document.getElementById("Primary Colour").addEventListener("click", Drawbed.ShowPalette)
        document.getElementById("Secondary Colour").addEventListener("click", Drawbed.ShowPalette)
        document.getElementById("Border Colour").addEventListener("click", Drawbed.ShowPalette)
        target.addEventListener("mousedown", Drawbed.Start)
        target.addEventListener("mousemove", Drawbed.Move)
        target.addEventListener("mouseup", Drawbed.UpHandler)
        let ColourSliders = [document.querySelector(".Red"), document.querySelector(".Green"), document.querySelector(".Blue")];
        ColourSliders.forEach((slider)=>{
            slider.addEventListener('input', Drawbed.sampleColour)
        })
    },
    sampleColour: (ev)=>{
        let R = document.querySelector(".Red").value
        let G = document.querySelector(".Green").value
        let B = document.querySelector(".Blue").value;
        
        let target = document.getElementById("Colour Minbar");
        
        target.style.background = `rgb(${R},${G},${B})`
        
    },
    UpHandler: (ev)=> {Drawbed[document.querySelector(".Mode").value](ev)
    },
    ShowPalette: (ev)=>{
        let target = document.querySelector(".Palette")
        Drawbed.SelectedColour = ev.target;
        console.log(Drawbed.SelectedColour)
        target.id = "";
        target = document.querySelector(".ColourZone");
        target.innerHTML = "";
        let Colours = Object.keys(Interractable.objectBuilder.SaveZone.Colours)
    Colours.forEach((colour)=>{
        colour = Interractable.objectBuilder.SaveZone.Colours[colour]
        let additions = document.createElement("div");
        additions.style.width = "1rem";
        additions.style.height = "1rem";
        additions.style.marginRight = "5px";
        additions.style.marginBottom = "5px";
        additions.style.display ="inline-block";
        additions.style.border = "1px solid black";
        additions.style.background = `rgb(${colour.Red},${colour.Green},${colour.Blue})`
        additions.addEventListener("click", ()=>{Drawbed.SelectedColour.style.background = `rgb(${colour.Red},${colour.Green},${colour.Blue})`;
        document.querySelector(".Palette").id = "hidden"
                                                });
        console.log(target)
        target.appendChild(additions)
    })
    },
    
    BoxDraw: (ev) => {
        let start = Drawbed.StartLocation
        console.log(start)
        let end = Drawbed.CurrentLocation
        console.log(end)
        let additions = document.createElement('div');
        additions.classList.add('drawnDiv');
        additions.style.position = "absolute";
        additions.style.borderColor = ColourChecker("Primary Colour")
        additions.style.background = ColourChecker("Secondary Colour")
        if (start.y < end.y) {
            additions.style.height = `${end.y - start.y}px`
            additions.style.top = `${start.y}px`
        } else {
            additions.style.height = `${start.y - end.y}px`
            additions.style.top = `${end.y}px`
        };
        if (start.x > end.x) {
            console.log(end.x);
            additions.style['min-width'] = `${start.x - end.x}px`
            additions.style.left = `${end.x}px`;
        } else {
            console.log(start.x);
            additions.style['min-width'] = `${end.x - start.x}px`;
            additions.style.left = `${start.x}px`;
        };
///////// Navbar Concession
        additions.style.top = (parseInt(additions.style.top) - 40 ) + "px";
        /////////////
        ev.target.appendChild(additions)
    },
    Drag: (ev) => {
       let element = Drawbed.Selected
       if(element.classList != "drawScreen"){
           console.log('ping');
       let X = Number(element.style.left.replace(/\D+/g, ""));
       let Y = Number(element.style.top.replace(/\D+/g, ""));
        differenceX = X + Math.floor(Drawbed.CurrentLocation.x - Drawbed.StartLocation.x);
        differenceY = Y + Math.floor(Drawbed.CurrentLocation.y - Drawbed.StartLocation.y);
        
                element.style.top = `${differenceY}px`;
                element.style.left = `${differenceX}px`;
                console.log(`Moved to X: ${differenceX}px, Y: ${differenceY}px`)
    }},
    Delete: (ev) =>{
       let element = Drawbed.Selected
       if(element.classList != "drawScreen"){
        if(confirm("Do you wish to delete this element?")){
            element.parentNode.removeChild(element)
        }}
    },
    Select: (ev)=>{
    console.log(ev.target);
    Drawbed.Selected = ev.target;
}, 
    Text: (ev)=>{
        let zone = ev.target;
//            document.querySelector('.drawScreen');
        let picker = document.getElementById("Text Settings");
        let additions = document.createElement(picker.querySelector(".TextType").value);
        let X = ev.pageX;
        let Y = ev.pageY;
        additions.style.position = "absolute";
        additions.style.top = Y;
        additions.style.left = X;
///////// Navbar Concession
        additions.style.top = (parseInt(additions.style.top) - 40 ) + "px";
////////////////////////
        additions.style.color = ColourChecker("Primary Colour")
        additions.style.background = ColourChecker("Secondary Colour")
        additions.textContent = prompt("enter your text here");
        additions.style.textAlign = document.querySelector(".TextAlign").value;
        additions.style["font-size"] = picker.querySelector(".FontSize")
        /////////////
        zone.appendChild(additions)
        
    }

}

//let ColourChecker = (checker)=>{
//    let base = document.getElementById(checker);
//    let red = base.querySelector(".Red").value;
//    let green = base.querySelector(".Green").value;
//    let blue = base.querySelector(".Blue").value;
//    return `rgb(${red}, ${green}, ${blue})`;
//}
let ColourChecker = (checker)=>{
    checker = document.getElementById(checker)
    return checker.style.background;
}

document.addEventListener("DOMContentLoaded", Drawbed.init)



//HTML Element = 
//    {
//    element: document.querySelector(".element").value,
//    margin: document.querySelector(".margin").value,
//    padding: document.querySelector(".padding").value, 
//    position: document.querySelector(".position").value,
//    display: document.querySelector(".position").value,
////////// Colour Settings
//
//    {
//    background: {colour: "rgb(255, 255, 255)", Name: "White"},
//    color: {colour: "rgb(0, 0, 0)", Name: "Black"},
//    Border: {colour: "rgb(0, 0, 0)", Name: "Not necessary, but will save time"},
/////////// Text Settings
//    fontSize: '18px',
//    fontWeight: "normal", //lighter,bold,bolder,value,inital,inherit
//    fontStyle: "normal",
//    //italic,oblique,inital,inherit
//    textDecoration: "none",
//    //underline,overline,line-through,blink,inital,inherit
//    textAlign: "left",
/////////// Border Settings
//    borderStyle: {top:'none', right:'none', bottom:'none', left:'none'},
//    // dotted, dashed, solid, double, groove, ridge, inset, outset, hidden
//    borderRadius: {top:'10px', right:'10px', bottom:'10px', left:'10px'},
//    borderWidth: {top:'1px', right:'1px', bottom:'1px', left:'1px'},
//    borderColor: {top:'1px', right:'1px', bottom:'1px', left:'1px'},
//    }
//
