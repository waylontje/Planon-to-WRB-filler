// JavaScript source code




    chrome.storage.local.get(['pInfo'], function (result) {

        let mInfo = result.pInfo
    

        let alleText = document.querySelectorAll('p')[0].innerText

   

    
        bevestigingsText = alleText.split("\n\n")
    
        bevestigingsText = bevestigingsText[0] + "\n\n" + mInfo 

    
        console.log(bevestigingsText)

        chrome.storage.local.set({ ['bText']: bevestigingsText }, function () {
        

        })


    })

