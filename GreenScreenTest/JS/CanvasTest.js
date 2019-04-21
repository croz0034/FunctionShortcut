let Coords = {
    Start: {x: 0, y: 0},
    init: (ev) =>{
        if(navigator.geolocation){
            console.log("here")
            navigator.geolocation.getCurrentPosition(Coords.Launch)
            console.log(navigator.geolocation)
        }
    },
    Launch: (position)=>{
        console.log(position)
        console.log("there")
    }
}

let Camera = {
    open: false,
    constraints: {
        audio: false,
        video: {
            facingMode: "environment"
        } //or "user" for selfie mode
    },
    init: (ev) => {
        Canvas.init(ev)
        Coords.init(ev)
        Camera.shutter(ev)
    },
    shutter: async (ev) => {
        let shutter = document.getElementById("Video");
        navigator.mediaDevices.getUserMedia(Camera.constraints)
                .then(function sucess(stream) {
                    shutter.srcObject = stream
            Canvas.Draw(shutter)
                })
    }
}

let Canvas = {
    init: (ev) => {
        let c = Canvas;
        c.Element = document.getElementById("Canvas");
        c.Context = c.Element.getContext("2d");
        c.Context.lineWidth = 3;
        c.Context.strokeStyle = "yellow"
    },
    Draw: (video)=>{
        setInterval(()=>{
            console.log("ping")
        Canvas.Context.drawImage(video, 0, 0, Canvas.Element.width, Canvas.Element.height)
            let frame = Canvas.Context.getImageData(0,0, Canvas.Element.width, Canvas.Element.height);
            let l = frame.data.length / 4
            for (let i = 0; i < l; i++) {
            let r = frame.data[i * 4 + 0];
            let g = frame.data[i * 4 + 1];
            let b = frame.data[i * 4 + 2];
            if (g < 75 && r < 75 && b > 100)
                frame.data[i * 4 + 3] = 0;
        }
        Canvas.Context.putImageData(frame, 0, 0);
            
            
        }, 1000/30)
    }
}





document.addEventListener("DOMContentLoaded", Camera.init)
