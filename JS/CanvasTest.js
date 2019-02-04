let base = document.getElementById("PaintZone");

let DrawTools = {
    init: (ev)=>{
        DrawTools.pixelTranslate = {x: base.offsetLeft, y: base.offsetTop};
        DrawTools.initalListeners();
        CanvasElement.init(ev); 
//        document.getElementById("Save").addEventListener('click', DrawTools.Save)
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
        
        let save = document.getElementById("Save")
        var image = base.toDataURL("image/png").replace("image/png", "image/octet-stream");
        save.href = image;
        save.download = "TestName";
        
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
        var image = base.toDataURL("image/png").replace("image/png", "image/octet-stream");  // here is the most important part because if you dont replace you will get a DOM 18 exception.
window.location.href=image; // it will save locally
        
        
    }
}

let CanvasElement = {
    init: (ev)=>{
    let c = CanvasElement;
    c.Element = document.getElementById("PaintZone");
    c.Context = c.Element.getContext("2d");
}
}

document.addEventListener("DOMContentLoaded", DrawTools.init)