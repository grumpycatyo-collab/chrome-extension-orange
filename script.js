// MESSAGE INPUT
const textarea = document.querySelector('.chatbox-message-input')
const chatboxForm = document.querySelector('.chatbox-message-form')

textarea.addEventListener('input', function () {
	let line = textarea.value.split('\n').length

	if(textarea.rows < 6 || line < 6) {
		textarea.rows = line
	}

	if(textarea.rows > 1) {
		chatboxForm.style.alignItems = 'flex-end'
	} else {
		chatboxForm.style.alignItems = 'center'
	}
})



// TOGGLE CHATBOX
const chatboxToggle = document.querySelector('.chatbox-toggle')
const chatboxMessage = document.querySelector('.chatbox-message-wrapper')

	chatboxMessage.classList.toggle('show')




// DROPDOWN TOGGLE
const dropdownToggle = document.querySelector('.chatbox-message-dropdown-toggle')
const dropdownMenu = document.querySelector('.chatbox-message-dropdown-menu')

dropdownToggle.addEventListener('click', function () {
	dropdownMenu.classList.toggle('show')
})

document.addEventListener('click', function (e) {
	if(!e.target.matches('.chatbox-message-dropdown, .chatbox-message-dropdown *')) {
		dropdownMenu.classList.remove('show')
	}
})







// CHATBOX MESSAGE
// CHATBOX MESSAGE
const chatboxMessageWrapper = document.querySelector('.chatbox-message-content')
const chatboxNoMessage = document.querySelector('.chatbox-message-no-message')

chatboxForm.addEventListener('submit', function (e) {
	e.preventDefault()

	if(isValid(textarea.value)) {
		writeMessage()
		setTimeout(autoReply, 1000)
	}
})



function addZero(num) {
	return num < 10 ? '0'+num : num
}

function writeMessage() {
	const today = new Date()
	let message = `
		<div class="chatbox-message-item sent">
			<span class="chatbox-message-item-text">
				${textarea.value.trim().replace(/\n/g, '<br>\n')}
			</span>
			<span class="chatbox-message-item-time">${addZero(today.getHours())}:${addZero(today.getMinutes())}</span>
		</div>
	`
	console.log("writeMessage: ",textarea.value.trim().replace(/\n/g, '<br>\n'))
	chatboxMessageWrapper.insertAdjacentHTML('beforeend', message)
	chatboxForm.style.alignItems = 'center'
	textarea.rows = 1
	textarea.focus()
	
	chatboxNoMessage.style.display = 'none'
	scrollBottom()
}


function scrollBottom() {
	chatboxMessageWrapper.scrollTo(0, chatboxMessageWrapper.scrollHeight)
}

function isValid(value) {
	let text = value.replace(/\n/g, '')
	text = text.replace(/\s/g, '')

	return text.length > 0
}


function autoReply() {
	document.querySelector('.chatbox-message-form').disabled = true;
	console.log("autoReply: ",textarea.value.trim().replace(/\n/g, '<br>\n'))
    const query = textarea.value.trim().replace(/\n/g, '<br>\n');
    const history = ''; 
    console.log(query);
 
    fetch('https://a2b0-195-22-251-59.ngrok-free.app/predict', {
       method: 'POST',
       body: JSON.stringify({ query, history }),
       headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(data => {
       const today = new Date();
       const message = `
		<div class="chatbox-message-item received">
			<span class="chatbox-message-item-text">
				${data.result}
			</span>
			<span class="chatbox-message-item-time">${addZero(today.getHours())}:${addZero(today.getMinutes())}</span>
		</div>
	`;
		textarea.value = '';
	chatboxMessageWrapper.insertAdjacentHTML('beforeend', message);
       scrollBottom();
	   document.querySelector('.chatbox-message-form').disabled = false;
    })
    .catch(error => console.error('Error:', error));
	document.querySelector('.chatbox-message-form').disabled = false
 }
 
 document.querySelector('.chatbox-message-form').addEventListener('submit', function(event) {
    event.preventDefault();
    // autoReply();
 });

// function scrollBottom() {
// 	chatboxMessageWrapper.scrollTo(0, chatboxMessageWrapper.scrollHeight)
// }

// function isValid(value) {
// 	let text = value.replace(/\n/g, '')
// 	text = text.replace(/\s/g, '')

// 	return text.length > 0
// }