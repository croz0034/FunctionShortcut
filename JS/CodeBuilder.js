let CodeBuilder = {
    init: () => {

        //       ColourPicker
        document.getElementById("SaveToPallette").addEventListener('click', CodeBuilder.ColourSelector.ColourUpdate)
        CodeBuilder.Scour('ColourSelector');
        CodeBuilder.allBuild('ColourSelector');
        CodeBuilder.Scour('ColourPallette');
        CodeBuilder.allBuild('ColourPallette');
        TextBuilder.init();

        ////////////

    },

    ColourSelector: {
        WhichColour: () => {
            let colourName = document.querySelector("#ColourName").value;
            if (colourName) {
                return colourName
            } else {
                return "default"
            }
        },
        GetCurrentColour: () => {
            let Pickers = CodeBuilder.ColourSelector.List;
            let savethis = {
                "Red": 0,
                "Green": 0,
                "Blue": 0
            };
            let colour = ["Red", 'Green', 'Blue'];
            for (i = 0; i < Pickers.length; i++) {
                savethis[colour[i]] = Pickers[i].value;
            }
            return savethis

        },
        List: [],
        Build: (zone) => {
            console.log(zone);
            zone.addEventListener('input', CodeBuilder.ColourSelector.Slide)
        },
        Slide: (ev) => {
            let newNumber = ev.target.value;
            ev.target.parentElement.firstElementChild.textContent = newNumber;
            let colour = CodeBuilder.ColourSelector.GetCurrentColour()
            document.getElementById("PaletteBlock").style["background-color"] = `rgb(${colour.Red},${colour.Green},${colour.Blue})`;
            console.log(`rgb(${colour.Red},${colour.Green},${colour.Blue})`)
        },

        ColourUpdate: (ev) => {
            let ColourName = CodeBuilder.ColourSelector.WhichColour();
            userSettings.Colours[ColourName] = CodeBuilder.ColourSelector.GetCurrentColour();

            CodeBuilder.allBuild('ColourPallette');
            TextBuilder.PopulateColorPicker(TextBuilder.Background);
            TextBuilder.PopulateColorPicker(TextBuilder.TextColor);
            TextBuilder.PopulateColorPicker(document.querySelector(".BorderColor"));
            console.log(CodeBuilder.ColourSelector.GetCurrentColour());
            console.log(userSettings.Colours);
        }
    },
    ColourPallette: {
        List: [],
        Build: (zone) => {
            console.log(userSettings.Colours)
            let colourList = Object.keys(userSettings.Colours);
            console.log(colourList);
            zone.innerHTML = "";
            let target = userSettings.Colours
            colourList.forEach((colour) => {
                let textcolour = () => {
                    if ((parseInt(target[colour].Red) + parseInt(target[colour].Green) + parseInt(target[colour].Blue)) < 400) {
                        console.log(target[colour].Red + target[colour].Green + target[colour].Blue);
                        return "white";
                    } else {
                        console.log(target[colour].Red + target[colour].Green + target[colour].Blue);
                        return "black";
                    }
                }
                let colourTarget = `rgb(${target[colour].Red}, ${target[colour].Green}, ${target[colour].Blue})`
                zone.innerHTML += `<div id="${colour}" style=";width: 100%; border:solid 1px black; color: ${textcolour()}; background-color: ${colourTarget}"> ${colour} <div class="delete" style:"float: right; width: 1rem">X</div></div>`
            })
            CodeBuilder.Scour("delete");
            CodeBuilder.allBuild("delete")
        }
    },
    delete: {
        List: [],
        Build: (zone)=>{
            zone.addEventListener("click", CodeBuilder.delete.trash)
        },
        trash: (ev)=>{
            ev.preventDefault()
            let target = ev.target.parentElement;
            console.log(target.id);
            delete userSettings.Colours[target.id]
            CodeBuilder.allBuild("ColourPallette")
        }
        
    },
    Scour: (Item) => {
        CodeBuilder[Item].List = document.querySelectorAll(`.${Item}`);
    },
    allBuild: (Item) => {
        CodeBuilder[Item].List.forEach((X) => {
            CodeBuilder[Item].Build(X)
        })
    }

};

let TextBuilder = {
    init: () => {
        TextBuilder.PopulateColorPicker(TextBuilder.Background);
        TextBuilder.PopulateColorPicker(TextBuilder.TextColor);
//        TextBuilder.PopulateColorPicker(document.querySelector(".BorderColor"));
        TextBuilder.className.addEventListener("input", TextBuilder.ModTest);
        TextBuilder.TextType.addEventListener("change", TextBuilder.ModTest);
        TextBuilder.FontSize.addEventListener("input", TextBuilder.ModTest);
        TextBuilder.Background.addEventListener("change", TextBuilder.ModTest);
        TextBuilder.TextColor.addEventListener("change", TextBuilder.ModTest);
        TextBuilder.TextAlign.addEventListener("change", TextBuilder.ModTest);


    },
    className: document.querySelector(".classname"),
    TextType: document.querySelector(".TextType"),
    FontSize: document.querySelector(".FontSize"),
    Background: document.querySelector(".bgColor"),
    TextColor: document.querySelector(".TextColor"),
    TextTest: document.querySelector(".TextTest"),
    TextAlign: document.querySelector(".TextAlign"),
    
    

    ModTest: (ev) => {
        TextBuilder.TextTest.innerHTML = " ";
        let additions = document.createElement(TextBuilder.TextType.value);
        additions.style["font-size"] = `${TextBuilder.FontSize.value}px`;
        additions.style["background-color"] = TextBuilder.Background.value;
        additions.style.textAlign = TextBuilder.TextAlign.value;
        additions.style["color"] = TextBuilder.TextColor.value;
        additions.textContent = "Test Text";
        TextBuilder.TextTest.appendChild(additions)
    },

    PopulateColorPicker: (zone) => {
        let currentText = document.querySelector('.TextColor').value
        let currentBG = document.querySelector('.bgColor').value
        zone.innerHTML = ""
        let Options = Object.keys(userSettings.Colours)
        Options.forEach((option) => {
            zone.innerHTML += `<option value="rgb(${userSettings.Colours[option].Red},${userSettings.Colours[option].Green},${userSettings.Colours[option].Blue})">${option}</option>`
        })
        document.querySelector('.TextColor').value= currentText;
        document.querySelector('.bgColor').value= currentBG;
        
    }

}
let userSettings = {
    Colours: {
        current: {
            Red: 99,
            Green: 137,
            Blue: 2
        },
        black: {
            Red: 0,
            Green: 0,
            Blue: 0
        },
        white: {
            Red: 255,
            Green: 255,
            Blue: 255
        }
    }
}


let test = (ev) => {
    console.log(ev)
}

CodeBuilder.init()
