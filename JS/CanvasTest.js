let base = document.getElementById("PaintZone");

let DrawTools = {
    init: (ev)=>{
        DrawTools.pixelTranslate = {x: base.offsetLeft, y: base.offsetTop};
        DrawTools.initalListeners();
        CanvasElement.init(ev); 
        CameraTool.init(ev)
    },
    initalListeners: ()=>{
        let d = DrawTools;
        base.addEventListener('mousedown', d.startEvent)
        base.addEventListener('touchstart', d.startEvent)
        base.addEventListener('mouseup', d.endEvent)
        base.addEventListener('touchend', d.endEvent)
    },
    startEvent: (ev)=>{
        let d = DrawTools;
        d.Start = d.Utar(ev);
        base.addEventListener('mousemove', d.dragEvent);
        base.addEventListener('touchmove', d.dragEvent);
        CanvasElement.Context.moveTo(d.Start.x, d.Start.y)
    },
    dragEvent: (ev)=>{
        let d = DrawTools;
        d.Current = d.Utar(ev);
        CanvasElement.Context.lineTo(d.Current.x, d.Current.y);
        CanvasElement.Context.stroke()
    },
    endEvent: (ev)=>{
        let d = DrawTools;
        d.Current = ""; d.Start = "";
        base.removeEventListener('mousemove', d.dragEvent)
        base.removeEventListener('touchmove', d.dragEvent)
        DrawTools.Save(ev);
    },
    Utar: (ev)=>{
        let d = DrawTools.pixelTranslate;
        if(ev.clientX){
            return {x: (ev.clientX - d.x), y: (ev.clientY - d.y)}
        } else {
            return {x: (ev.targetTouches[0].clientX - d.x), y: (ev.targetTouches[0].clientY - d.y)}
        }
    },
    Save: (ev)=>{
        let save = document.getElementById("Save")
        var image = base.toDataURL("image/png").replace("image/png", "image/octet-stream");
        save.href = image;
        save.download = "TestName";
    }
}

let CameraTool = {
    open: false,
    constraints: {
        audio: false,
        video: {
            width: 800, height: 800,
            facingMode: "environment"} //or "user" for selfie mode
    },
    init: (ev)=>{ document.querySelector("#camera").addEventListener("click", CameraTool.shutter);

               

    },
    shutter: async(ev)=>{
        let shutter = document.getElementById("Shutter");
       CameraTool.open = !CameraTool.open;
           CanvasElement.Element.classList.toggle("hidden");
        shutter.classList.toggle("hidden")
        console.log("ping")
        
       if(CameraTool.open){
           navigator.mediaDevices.getUserMedia(CameraTool.constraints)
               .then(function sucess(stream){
               console.log("ok!");
               console.log(stream)
            shutter.srcObject = stream
               shutter.onloadedmetadata = (ev)=>{ shutter.play()}
        })}
        
        else{
            console.log(shutter.srcObject)
            CanvasElement.Context.drawImage(shutter, 0, 0, 800, 800)
            
        }
    }
    
}
let CanvasElement = {
    init: (ev)=>{
    let c = CanvasElement;
    c.Element = document.getElementById("PaintZone");
    c.Context = c.Element.getContext("2d");
    c.Context.lineWidth = 3;
    c.Context.strokeStyle = "yellow"
}
}

document.addEventListener("DOMContentLoaded", DrawTools.init)