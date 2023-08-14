document.addEventListener('DOMContentLoaded', function () {
    const replaceButton = document.getElementById('replaceButton');
    replaceButton.addEventListener('click', replaceLogo);
  });
  
  function replaceLogo() {
    
  
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const activeTab = tabs[0];
      chrome.scripting.executeScript({
        target: { tabId: activeTab.id },
        function: replaceLogoFunction,
        args: ["./images/icon16.png"],
      });
    });
  }
  
  function replaceLogoFunction(newLogoUrl) {
    const linkElements = document.querySelectorAll('link[rel="icon"]');
    
    if (linkElements) {
      linkElements.forEach(linkElement => {
        linkElement.href = newLogoUrl;
      });
    }
    
    // Change the tab icon
    chrome.action.setIcon({
      path: newLogoUrl,
    });
  }
  