( function () {
    console.log("Ripper.js opened");


    const inputLabel = document.querySelector('label[title = "Nummer"]');
    if (inputLabel) { 
        const reserveringLabelId = inputLabel.getAttribute('for');
        const reserveringId = document.getElementById(reserveringLabelId).value
        return reserveringId;
    }
    
     

    // await new Promise((r) => setTimeout(r, 2000));

    

    const textElement = document.querySelector("textarea");

    if (textElement) {
        let textElementStr = textElement.value;
        console.log(textElementStr)
        const textArray = textElementStr.split("\n");


        const results  = textElementStr.matchAll(/\[(.*)\]\n((.*\n?(?!\[|___))*)/gm);

        const textMap = [...results].map((result) => ({
            key: result[1],
            value: result[2].split("\n").filter((v) => !!v)
        }));

        console.log(textMap);
        return textMap
        //console.log(textAreaRip);



        // console.log("Komt dit binnen?");


        /*
        console.log(textArray);
        const reservering = {
            emailadres: "",
            hvaId: "",
            aantalPersonen: "",
            typeRuimte: "",
            datum: "",
            aanvangsTijd: "",
            eindTijd: "",
            activiteitOmschrijving: "",
            activiteitType: "",
            locatie: []
        };

        

        for (let i = 0; i < textArray.length; i++) {
            let item = textArray[i];

            if (item === "[Vul hier je HvA e-mail adres in]") {
                reservering.emailadres = textArray[i + 1];
            }
            if (item === "[Vul hier je HvA-ID in]") {
                reservering.hvaId = textArray[i + 1];
            }
            if (item === "[Aantal personen]") {
                reservering.aantalPersonen = textArray[i + 1];
            }
            if (item === "[Type ruimte]") {
                reservering.typeRuimte = textArray[i + 1];
            }
            if (item === "[Datum]") {
                reservering.datum = textArray[i + 1];
            }
            if (item === "[Aanvangstijd]") {
                reservering.aanvangsTijd = textArray[i + 1];
            }
            if (item === "[Eindtijd]") {
                reservering.eindTijd = textArray[i + 1];
            }
            if (item === "[Omschrijving activiteit]") {
                
                for (let z = 1; z < (textArray.length - i - 6); z++) {
                    console.log(textArray[i + z])
                    if (!textArray[i + z].includes("[")) {
                        reservering.activiteitOmschrijving += textArray[i + z];
                        reservering.activiteitOmschrijving += " "
                        console.log(textArray[i + z])
                    }
                }
                
            }
            if (item === "[Type activiteit]") {
                reservering.activiteitType = textArray[i + 1];
            }
            if (item === "[Locatie]") {
                if (textArray[i + 1] === "Geen voorkeur") {
                    reservering.locatie.push("Geen voorkeur");
                }
                if (textArray.includes("Wibauthuis")) {
                        reservering.locatie.push("Wibauthuis");
                }
                if (textArray.includes("Theo Thijssenhuis")) {
                        reservering.locatie.push("Theo Thijssenhuis");
                }
                if (textArray.includes("Muller-Lulofshuis")) {
                        reservering.locatie.push("Muller-Lulofshuis");
                }
                if (textArray.includes("Kohnstammhuis")) {
                        reservering.locatie.push("Kohnstammhuis");
                }
                if (textArray.includes("Benno Premselahuis")) {
                        reservering.locatie.push("Benno Premselahuis");
                }
            }
        }
        console.log(reservering);

        console.log("gegevens opgehaald");
        return reservering;*/
    }
        
    
    

    
    console.log("einde ripper");

    
       
    
        
   
})();
