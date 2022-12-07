console.log("Action.js opened");
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("getAndPasteRoomInfo").addEventListener("click", runRoomInfoScript);
});

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("pasteUserInfo").addEventListener("click", runGInfoScript);
});

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("pasteConfirmation").addEventListener("click", pasteConfirmationScript);
});


async function runRoomInfoScript() {
    console.log("event listener fires");
    let queryOptions = {
        url: "https://uvahva-prod.planoncloud.com/home/UvAHvA/wc_uvahva?*"
    };

    let [tab] = await chrome.tabs.query(queryOptions);

    
    let ripInfo = await chrome.scripting.executeScript({
        target: { tabId: tab.id, allFrames: true },
        files: ["ripper.js"]
    });

    console.log(ripInfo);
    

    let info = ripInfo[4];

    console.log(info);

    queryOptions = {
        url: "https://roosterportal-wrb.hva.nl/WRB/*"
    };

    [tab] = await chrome.tabs.query(queryOptions);

    await chrome.scripting.executeScript({
        target: { tabId: tab.id, allFrames: true },
        files: ["plakker.js"]
    });


    
    
    
}


async function runGInfoScript() {

    let queryOptions = {
        url: "https://roosterportal-wrb.hva.nl/WRB/*"
    };

    let [tab] = await chrome.tabs.query(queryOptions);
    await chrome.scripting.executeScript({
        target: { tabId: tab.id, allFrames: true },
        files: ["gegevensplakker.js"]
    });
}


async function pasteConfirmationScript() {

    let queryOptions = {
        url: "https://roosterportal-wrb.hva.nl/WRB/*"
    };

    let [tab] = await chrome.tabs.query(queryOptions);
    await chrome.scripting.executeScript({
        target: { tabId: tab.id, allFrames: true },
        files: ["bevestigingspakker.js"]
    });


   
    queryOptions = {
        url: "https://uvahva-prod.planoncloud.com/home/UvAHvA/wc_uvahva?*"
    };

    [tab] = await chrome.tabs.query(queryOptions);


    await chrome.scripting.executeScript({
        target: { tabId: tab.id, allFrames: true },
        files: ["bevestigingsplakker.js"]
    });

}
