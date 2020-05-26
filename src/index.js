import './styles.css';
import axios from 'axios';


const messageForm = document.forms.messageForm;

const createMessage = (e) => {
  e.preventDefault();
  const message = messageForm.elements.message.value;

  // fetch('https://chat-74d03.firebaseio.com/messanger.json', {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json"
  //   },
  //   body: JSON.stringify({ message })
  // }).then(data=> data.json()).then(data=> console.log(data))

  // // console.dir(axios)
  axios.post('https://chat-74d03.firebaseio.com/messanger.json', { message })
    .then(response => console.log(response.data));

  messageForm.reset();

}

messageForm.addEventListener('submit', createMessage)












const getMessages = () => {

}
const deleteMessage = () => {

}
const updateMessage = () => {

}
