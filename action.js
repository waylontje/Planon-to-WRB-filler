console.log("Action.js opened");
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("getPlanonInfo").addEventListener("click", runscript);
});

async function runscript() {
    console.log("event listener fires");
    let queryOptions = {
        url: "https://uvahva-prod.planoncloud.com/home/UvAHvA/wc_uvahva?*"
    };

    let [tab] = await chrome.tabs.query(queryOptions);

   // console.log(tab);

    // let frameId = ["pcc_keycloakloader", "workspaceFrame", "home", ""];

    // for (let i = 0; i < frameId.length; i++) {
    let ripInfo = await chrome.scripting.executeScript(
        {
            target: { tabId: tab.id, allFrames: true },
            files: ["ripper.js"]
        },

       
    );

    console.log(ripInfo[4]);
    //}

    let info = ripInfo[4].result

    console.log(info)

    queryOptions = {
        url: "https://roosterportal-wrb.hva.nl/WRB/*"
    };

    [tab] = await chrome.tabs.query(queryOptions);

    chrome.scripting.executeScript({
        code: "let info = JSON.parse('" + encoder(info) + "');"
    }, function () {
        chrome.scripting.executeScript({
            target: { tabId: tab.id, allFrames: true },
            file: "plakker.js"
        });
    });


    function encoder(obj) {
        //Encodes into JSON and quotes \ characters so they will not break
        //  when re-interpreted as a string literal. Failing to do so could
        //  result in the injection of arbitrary code and/or JSON.parse() failing.
        return JSON.stringify(obj).replace(/\\/g, '\\\\').replace(/'/g, "\\'")
    }



    console.log("ripper js word aangeroepen");
    // });
    console.log("einde action.js");
}
