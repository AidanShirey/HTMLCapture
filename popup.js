let captureButton = document.getElementById('captureButton');


captureButton.addEventListener('click', async() => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true});
    var optioninput = document.getElementById('idNameSelector').value;
    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        func: grabHTML,
        args: [optioninput],
    },
    (injectionResults) => {
        for (const frameResult of injectionResults)
            document.getElementById('codeDisplay').innerHTML = frameResult.result;
    });
});

function grabHTML(optioninput){
// Optionselect will be either 1 or 0: 1 being an ID Call, and 0 Being a class name retrieval.
    return document.getElementById(optioninput).outerHTML;
}