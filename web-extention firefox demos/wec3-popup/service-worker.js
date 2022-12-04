chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse){
        if(request.method == "changePage"){
            document.body.innerText = "Foot";
            console.log ('pied');
            sendResponse ({text: document.body.innerText, method: "changePage" });
        }
    }
);