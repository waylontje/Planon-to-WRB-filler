// JavaScript source code

chrome.storage.local.get(['bText'], function (result) {



    let bevestigingsText = result.bText;
   

    console.log(bevestigingsText);
    
    const textElement = document.querySelector("textarea");

    const plakCheckTextRip = textElement.value;

    if (textElement) {
        if (bevestigingsText.includes(plakCheckTextRip)) {

            textElement.value = bevestigingsText;

            textElement.dispatchEvent(new Event('change', {
                view: window,
                bubbles: true,
                cancelable: true,

            }));
        } else {
            alert('iets klopt niet');
        }
    }

   
});