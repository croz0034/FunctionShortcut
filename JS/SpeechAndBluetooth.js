let initAll = ()=>{
    speechModule.init();
    blueToothModule.init();
    earModule.init()
}
let speechModule = {
    synth: "",
    input: ()=>{return document.getElementById("Speaker").value},
    init: (ev)=>{
        let s = speechModule;
        s.synth = window.speechSynthesis;
        document.getElementById("Talk").addEventListener("click", s.Parrot)
    },
    Parrot: (ev)=>{
        let WhatToSay = new SpeechSynthesisUtterance(speechModule.input());
        speechModule.synth.speak(WhatToSay);
    },
    listen: (ev)=>{
        let s = speechModule;
        
    }
}

let blueToothModule = {
    init: ()=>{
       document.getElementById('Bluetooth').addEventListener('click', blueToothModule.search)
    },
    search: (ev)=>{ 
        
        navigator.bluetooth.requestDevice({acceptAllDevices: true}).then((device)=>{
        console.log(device)
            let z = device.gatt.connect()
            console.log(z);
        return z
    }).then(
    (service)=>{
        console.log(service)
    })
        
        .catch(function(error) {
     // And of course: error handling!
     console.error('Connection failed!', error);
  })
    
        
    }
}


let earModule = {
    counter : 0,
    // Recognition stuff
    SpeechRecognition: webkitSpeechRecognition,
    SpeechGrammarList: webkitSpeechGrammarList,
    SpeechRecognitionEvent: webkitSpeechRecognitionEvent,
    recognition: "",
    
    // Vocabulary
//    Swears: [ 'out of battle I pause to rest' , 'shit' , 'douche' ],
    grammar: '#JSGF V1.0; grammar Swears; public <swear> = awe ;',
    
    init: ()=>{
        let e = earModule;
    document.getElementById("Counter").textContent = e.counter;
        e.recognition = new e.SpeechRecognition();
var speechRecognitionList = new e.SpeechGrammarList();
        
        speechRecognitionList.addFromString(e.grammar, 0);
        
        e.recognition.grammars = speechRecognitionList;
        e.recognition.continuous = false;
        e.recognition.lang = 'en-US';
        e.recognition.interimResults = false;
        e.recognition.maxAlternatives = 5;
        
         document.getElementById("Microphone").addEventListener('click', e.listen)
        
    },
    caseContains : (InputString, targetArray)=>{
        let returnObject = {string: InputString, KeyWord: []};
        targetArray.forEach((target)=>{
            InputString.includes(target)?returnObject.KeyWord = target: console.log(target);
        })
        return returnObject
    },
    listen: ()=>{
        earModule.recognition.start();
        
        earModule.recognition.onresult = function(event) {
    earModule.counter ++;
    document.getElementById("Counter").textContent = earModule.counter;
            let result = event.results[(event.results.length -1)][0].transcript;
            console.log(event.results[(event.results.length -1)])
            result = earModule.caseContains(result, ["f***", "druid", "test"])
            console.log(result)
            
            switch(result.KeyWord){
                case "f***":
                    alert("no, Fuck you!")
                    break;
                case "druid":
                    console.log("best class")
                    break;
                case "test":
    document.getElementById("textOutput").textContent = result.string;
                    break
                    
            }
                
    }
}
}
 
document.addEventListener("DOMContentLoaded", initAll)


// Example code for a bluetooth lightbulb
//// Step 1: Scan for a device with 0xffe5 service
//navigator.bluetooth.requestDevice({
//  filters: [{ services: [0xffe5] }]
//})
//  .then(function(device) {
//    // Step 2: Connect to it
//    return device.gatt.connect();
//  })
//  .then(function(server) {
//    // Step 3: Get the Service
//    return server.getPrimaryService(0xffe5);
//  })
//  .then(function(service) {
//    // Step 4: get the Characteristic
//    return service.getCharacteristic(0xffe9);
//  })
//  .then(function(characteristic) {
//    // Step 5: Write to the characteristic
//    var data = new Uint8Array([0xbb, 0x25, 0x05, 0x44]);
//    return characteristic.writeValue(data);
//  })
//  .catch(function(error) {
//     // And of course: error handling!
//     console.error('Connection failed!', error);
//  });