let Joystick = {
    Base: {x: 125, y: 125},
    Start: {},
    Current: {x: 0, y: 0},
    init: (ev)=>{
        let playzone = document.getElementById("Area")
        playzone.addEventListener("touchstart", Joystick.start)
        playzone.addEventListener("touchmove", Joystick.move)
        playzone.addEventListener("touchend", Joystick.end)
        let joystick = document.getElementById("Stick");
        joystick.style.top = Joystick.Base.y + "px";
        joystick.style.left = Joystick.Base.x + "px";
    },
    start: (ev)=>{
        console.log(ev.target)
        if(ev.target.id= "Stick"){
            Joystick.Start = {
                    x: ev.targetTouches[0].pageX,
                    y: ev.targetTouches[0].pageY
                };
            console.log(Joystick.Current)
        }
        
    },
    move: (ev)=>{
        let Stick = ev.target
        if(Stick.id= "Stick" ){
            let X = ev.targetTouches[0].pageX;
            let Y = ev.targetTouches[0].pageY;
            if(((X-Joystick.Current.x
) + (Y-Joystick.Current.y
)) > 600){}else{console.log("Too Far!")}
            Joystick.Current = {
                    x: X,
                    y: Y
                };
            Stick.style.top = (Math.floor(Joystick.Current.y)) + "px";
            Stick.style.left = (Math.floor(Joystick.Current.x)) + "px";
        }
        
    },
    end: (ev)=>{
        ev.target.style.top = Math.floor(Joystick.Base.y) + "px";
        ev.target.style.left = Math.floor(Joystick.Base.x) + "px";
        Joystick.Current = {x: 0, y: 0};
    }
}




addEventListener("DOMContentLoaded", Joystick.init)