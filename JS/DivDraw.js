let Drawbed = {
    Selected: null,
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
            }
        }
    },
    CurrentLocation: {},
    init: (ev) => {
        let target = document.querySelector(".drawScreen")
        target.addEventListener("mousedown", Drawbed.Start)
        target.addEventListener("mousemove", Drawbed.Move)
        target.addEventListener("mouseup", Drawbed.UpHandler)
    },
    ActivateRadios: (ev)=>{
        let info = document.querySelector(".Mode").childNodes
        info.forEach((button)=>{
            button.addEventListener('click', (ev)=>{
                if(button.checked != "checked"){ button.checked = true}
                console.log(button.value)
                
            })
        })
    },
    UpHandler: (ev)=>{
        let info = document.querySelector(".Mode").value
        console.log(info)
        Drawbed[info](ev)
        
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
        let X = ev.pageX;
        let Y = ev.pageY;
        let picker = document.getElementById("Text Settings");
        let additions = document.createElement(picker.querySelector(".TextType").value)
        additions.style.color = ColourChecker("Primary Colour")
        additions.style.background = ColourChecker("Secondary Colour")
        additions.style.top = Y;
        additions.style.left = X;
        additions.textContent = prompt("enter your text here");
        additions.style.textAlign = document.querySelector(".TextAlign").value;
        additions.style["font-size"] = picker.querySelector(".FontSize")
///////// Navbar Concession
        additions.style.top = (parseInt(additions.style.top) - 40 ) + "px";
        /////////////
        ev.target.appendChild(additions)
        
    }

}


let ColourChecker = (checker)=>{
    let base = document.getElementById(checker);
    let red = base.querySelector(".Red").value;
    let green = base.querySelector(".Green").value;
    let blue = base.querySelector(".Blue").value;
    return `rgb(${red}, ${green}, ${blue})`;
}


document.addEventListener("DOMContentLoaded", Drawbed.init)
