// JavaScript source code
chrome.storage.local.get(['pInfo'], function (result) {

    let mInfo = result.pInfo
    console.log(mInfo);
    const results = mInfo.matchAll(/\[(.*)\]\n((.*\n?(?!\[|___))*)/gm);

    const textObj = [...results].map((result) => ({
        key: result[1],
        value: result[2].split("\n").filter((v) => !!v)
    }));



    const textMap = new Map();

    textObj.forEach(object => {
        textMap.set(object.key, object.value);
    });

    console.log(textMap);


    let telNr = textMap.get("Vul hier je telefoonnummer in als deze niet achter je naam staat");
    let email = textMap.get("Vul hier je HvA e-mail adres in");
   
    let personenAantal = textMap.get("Aantal personen");
    let typeActiviteit = textMap.get("Type activiteit");
    let omschrijvingActiviteit = textMap.get("Omschrijving activiteit");
    let hvaID = textMap.get("Vul hier je HvA-ID in");
    let naam = email[0].split('@');
    naam = naam[0];
    


  
    if (telNr !== undefined) {
        console.log(telNr);
        console.log(telNr[0]);
        document.getElementById("ctl00_Main_BookingForm1_tel").value = telNr[0];
        document.getElementById("ctl00_Main_BookingForm1_tel").dispatchEvent(new Event('change', {
            view: window,
            bubbles: true,
            cancelable: true
        }))
    } else {
        document.getElementById("ctl00_Main_BookingForm1_tel").value = "";
        document.getElementById("ctl00_Main_BookingForm1_tel").dispatchEvent(new Event('change', {
            view: window,
            bubbles: true,
            cancelable: true
        }))
    }

   
   
    document.getElementById("ctl00_Main_BookingForm1_firstlastNameUser").value = naam;
    document.getElementById("ctl00_Main_BookingForm1_firstlastNameUser").dispatchEvent(new Event('change', {
        view: window,
        bubbles: true,
        cancelable: true
    }))



    document.getElementById("ctl00_Main_BookingForm1_cc").value = email[0];
    document.getElementById("ctl00_Main_BookingForm1_cc").dispatchEvent(new Event('change', {
        view: window,
        bubbles: true,
        cancelable: true
    }))
    document.getElementById("ctl00_Main_BookingForm1_hvaid_gebruiker").value = hvaID[0];
    document.getElementById("ctl00_Main_BookingForm1_hvaid_gebruiker").dispatchEvent(new Event('change', {
        view: window,
        bubbles: true,
        cancelable: true
    }))
    document.getElementById("ctl00_Main_BookingForm1_activityDescription").value = omschrijvingActiviteit[0];
    document.getElementById("ctl00_Main_BookingForm1_activityDescription").dispatchEvent(new Event('change', {
        view: window,
        bubbles: true,
        cancelable: true
    }))
    document.getElementById("ctl00_Main_BookingForm1_expectedPeople").value = personenAantal[0];
    document.getElementById("ctl00_Main_BookingForm1_expectedPeople").dispatchEvent(new Event('change', {
        view: window,
        bubbles: true,
        cancelable: true
    }))


    

    document.querySelector("select").value = typeActiviteit[0]
    document.querySelector("select").dispatchEvent(new Event('change', {
        view: window,
        bubbles: true,
        cancelable: true
    }))

});