( function () {


const eindBlokDag = 4
const eindBlokMaand = 2
const eindBlokJaar = 2023



document.querySelectorAll("select")[1].value = "*"
document.querySelectorAll("select")[1].dispatchEvent(new Event('change', {
            view: window,
            bubbles: true,
            cancelable: true
        }));
document.querySelectorAll("select")[2].value = ""
document.querySelectorAll("select")[2].dispatchEvent(new Event('change', {
            view: window,
            bubbles: true,
            cancelable: true
        }));
document.querySelectorAll("select")[4].value = "0"
document.querySelectorAll("select")[4].dispatchEvent(new Event('change', {
            view: window,
            bubbles: true,
            cancelable: true
        }));
document.querySelectorAll("select")[6].value = "0"
document.querySelectorAll("select")[6].dispatchEvent(new Event('change', {
            view: window,
            bubbles: true,
            cancelable: true
        }));
    
    //get info from browser save
    chrome.storage.local.get(['pInfo'], function (result) {
        //console.log('Value currently is ' + result.pInfo);
        
       // console.log(result)
        //console.log(result.pInfo)
        
        let mInfo = result.pInfo

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

        
        
        let locatie = textMap.get("Locatie");
        let personenAantal = textMap.get("Aantal personen");
        let ruimteType = textMap.get("Type ruimte");
        let datum = textMap.get("Datum"); 
        let aanvangstijd = textMap.get("Aanvangstijd");
        let eindtijd = textMap.get("Eindtijd");
        
      
        //notificatie als emailadres geen hva mail is.

        let hvaMail = textMap.get("Vul hier je HvA e-mail adres in");
        hvaMail = hvaMail[0]
        if (!hvaMail.includes("@hva.nl")) {
            alert('Email adres is geen hvamail of bevat en typfout');
        }



         //set month selector
        let monthtxt = datum[0].split('-')
        
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        let monthnr = months.indexOf(monthtxt[1]) + 1;

       

        monthnr = monthnr.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })

        //set date format
        

        monthValue = `01/${monthnr}/${monthtxt[2]} 00:00:00`

       


        document.querySelectorAll("select")[3].value = monthValue; 
        document.querySelectorAll("select")[3].dispatchEvent(new Event('change', {
            view: window,
            bubbles: true,
            cancelable: true
        }))

        //select date
        const monthsS = {
            "Jan":"January",
            "Feb": "February",
            "Mar": "March",
            "Apr": "April",
            "May": "May",
            "Jun": "June",
            "Jul": "July",
            "Aug": "August",
            "Sep": "September",
            "Oct": "October",
            "Nov": "November",
            "Dec": "December"
        }

        let monthFullName = monthsS[monthtxt[1]]
       

        //let dateTitleSelector = monthtxt[0] +" "+ monthFullName
        


        function getDate () {

            const newDate = new Date();
            const year = newDate.getFullYear();
            const month = newDate.getMonth() + 1;
            const d = newDate.getDate();

           

            return newDate;
            //return [parseInt(d.toString().padStart(2, '0')), parseInt(month.toString().padStart(2, '0')), year, newDate];
        }
        let curDate = getDate();
        let reservationDate = getDate();
      
        reservationDate.setFullYear(monthtxt[2]);

        let resDateDateNr = parseInt(monthtxt[0])
        reservationDate.setDate(resDateDateNr)
        let resDateMonthNr = months.indexOf(monthtxt[1])
        reservationDate.setMonth(resDateMonthNr)

                
        

        if (curDate >= reservationDate) {
            alert("LET OP! We kunnen niet op de huidige dag of in het verleden boeken ");
        }

        




        function addDays(date, days) {
            var result = new Date(date);
            result.setDate(result.getDate() + days);
            return result;
        }
        let maxTheorieDate = addDays(curDate, 28);

        let eindeBlokDate = getDate();
        eindeBlokDate.setDate(eindBlokDag);
        eindeBlokDate.setMonth(eindBlokMaand - 1);
        eindeBlokDate.setFullYear(eindBlokJaar);

        console.log(eindeBlokDate)

        if (reservationDate > eindeBlokDate) {
            alert('Het einde van het Blok is '+ eindBlokDag +"-"+ eindBlokMaand+"-"+eindBlokJaar)
        }


        //maxTheorieDate = [maxTheorieDate.getDate(), maxTheorieDate.getMonth() + 1, maxTheorieDate.getFullYear()]
       
       // document.querySelectorAll("[title= " + CSS.escape(dateTitleSelector) + "]")[0].click()


         //check if/wait for page updates if possible

      
      




        //fill in the rest


        //get the right size value
        const aantalOpties = [1, 4, 8, 12, 16, 20, 24, 32, 36];
        

        let aantalVal = Math.max.apply(Math, aantalOpties.filter(function (x) { return x <= personenAantal[0] }));
        
        //set reqired size
        document.querySelectorAll("select")[0].value = [
            ...document.querySelectorAll("select")[0]
        ].filter((optionElement) => optionElement.textContent == aantalVal)[0].value;

        document.querySelectorAll("select")[0].dispatchEvent(new Event('change', {
            view: window,
            bubbles: true,
            cancelable: true
        }))


        //set location

        if (locatie.length > 1) {
            document.querySelectorAll("select")[1].value = [
                ...document.querySelectorAll("select")[1]
            ].filter(
                (optionElement) => optionElement.textContent === 'Amstelcampus'
            )[0].value;

            alert('Amstelcampus word geselecteerd. Er is een selectie aan locaties geselecteerd. Dus let op bij het selecteren van ruimtes' )

        }else if (locatie[0] == "Geen voorkeur") {
            document.querySelectorAll("select")[1].value = [
                ...document.querySelectorAll("select")[1]
            ].filter(
                (optionElement) => optionElement.textContent === 'Amstelcampus'
            )[0].value;

        } else {
            document.querySelectorAll("select")[1].value = [
                ...document.querySelectorAll("select")[1]
            ].filter(
                (optionElement) => optionElement.textContent === locatie[0]
            )[0].value;

        }
        document.querySelectorAll("select")[1].dispatchEvent(new Event('change', {
            view: window,
            bubbles: true,
            cancelable: true,
            
        }))

       


        //set Room type
        let ruimteType1 = ruimteType[0].toString()

        if (ruimteType1.includes('Projectruimte')) {
            document.querySelectorAll("select")[2].value = [
                ...document.querySelectorAll("select")[2]
            ].filter(
                (optionElement) => optionElement.textContent === "01LocType/Projectruimte"
            )[0].value;
            
        } else if (ruimteType1.includes('Theorielokaal')) {

            //set Room type
            document.querySelectorAll("select")[2].value = [
                ...document.querySelectorAll("select")[2]
            ].filter(
                (optionElement) => optionElement.textContent === "01LocType/Theorielokaal"
            )[0].value;
            
            // waarheidstabel controleren
            if (reservationDate > maxTheorieDate) {
                alert('Let op!! Theorielokaal kan alleen 4 weken vooruit geboekt worden');
            }
        } else if (ruimteType1.includes('Geen voorkeur')) {
            if (personenAantal[0] < 11) {
                document.querySelectorAll("select")[2].value = [
                    ...document.querySelectorAll("select")[2]
                ].filter(
                    (optionElement) => optionElement.textContent === "01LocType/Projectruimte"
                )[0].value;
            }
            if (personenAantal[0] > 10) {
                document.querySelectorAll("select")[2].value = [
                    ...document.querySelectorAll("select")[2]
                ].filter(
                    (optionElement) => optionElement.textContent === "01LocType/Theorielokaal"
                )[0].value;
                if (reservationDate > maxTheorieDate) {
                    alert('Let op!! Theorielokaal kan alleen 4 weken vooruit geboekt worden');
                }
            }
        }
        

        document.querySelectorAll("select")[2].dispatchEvent(new Event('change', {
            view: window,
            bubbles: true,
            cancelable: true
        }))
       
        //set start time
        let newStarttime = [
            ...document.querySelectorAll("select")[4]
        ].filter((optionElement) => optionElement.textContent === aanvangstijd[0])[0].value;

        document.querySelectorAll("select")[4].value = newStarttime;

        document.querySelectorAll("select")[4].dispatchEvent(new Event('change', {
            view: window,
            bubbles: true,
            cancelable: true,
            
        }))

        //set end time
        let newEndtime = [
            ...document.querySelectorAll("select")[6]
        ].filter((optionElement) => optionElement.textContent === eindtijd[0])[0].value

        document.querySelectorAll("select")[6].value = newEndtime;

        document.querySelectorAll("select")[6].dispatchEvent(new Event('change', {
            view: window,
            bubbles: true,
            cancelable: true,
            
        }))
    });




    //submit and wait for results





    

   

    
})();

   
    

  


