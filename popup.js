let captureButton = document.getElementById('captureButton');


captureButton.addEventListener('click', async() => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true});
    // Get value from input box.
    var optioninput = document.getElementById('idNameSelector').value;
    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        func: grabHTML,
        args: [optioninput],
    },
    (injectionResults) => {
        // Populate codeDisplay element
        for (const frameResult of injectionResults)
            document.getElementById('codeDisplay').innerHTML = frameResult.result;
    });
});

function grabHTML(optioninput){
//  Return grabbed element and contents inside
    return document.getElementById(optioninput).outerHTML;
}