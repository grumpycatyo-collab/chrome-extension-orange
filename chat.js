var logo = document.createElement('img');
logo.src = chrome.extension.getURL('icon.png');
logo.style.position = 'fixed';
logo.style.bottom = '10px';
logo.style.right = '10px';
logo.style.width = '90px';     
logo.style.zIndex = '10';
logo.id = 'myLogo';
document.body.appendChild(logo);

var chatUI = document.createElement('iframe');
chatUI.src = chrome.extension.getURL('chat.html');
chatUI.style.width = '500px';
chatUI.style.height = '700px';
chatUI.style.display = 'none';
chatUI.style.position = 'fixed';
chatUI.style.bottom = '0px'; // Adjust this value to position the chat above the icon
chatUI.style.right = '250px';
chatUI.style.border = '0';
chatUI.id = 'myChat';
document.body.appendChild(chatUI);

document.getElementById('myLogo').addEventListener('click', function() {
    var chatUI = document.getElementById('myChat');
    if (chatUI.style.display === 'none') {
        chatUI.style.display = 'block';
    } else {
        chatUI.style.display = 'none';
    }
});



