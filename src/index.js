import './styles.css';
import axios from 'axios';

const messageForm = document.forms.messageForm;
const list = document.querySelector('.list');
const editInput = document.querySelector('.editInput');


const createMessage = async (e) => {
  e.preventDefault();
  const message = messageForm.elements.message.value;
  // fetch('https://chat-74d03.firebaseio.com/messanger.json', {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json"
  //   },
  //   body: JSON.stringify({ message })
  // }).then(data=> data.json()).then(data=> console.log(data))
  // // console.dir(axios);
  try {
    await axios.post('https://chat-74d03.firebaseio.com/messanger.json', { message: message })
  } catch (error) {
    console.log(error)
  }
  finally {
    getMessages();
  }
  messageForm.reset();
}

messageForm.addEventListener('submit', createMessage)

const getMessages = async () => {
  const response = await axios.get('https://chat-74d03.firebaseio.com/messanger.json');
  if (response.data !== null) {
    const data = Object.keys(response.data).map(id => {
      return { id, ...response.data[id] }
    }) //[{},{}]

    const markup = data.reduce((acc, item) => {
      return acc += `
      <li className="listItem">
        <span className="spanItem">${item.message}</span>
        <button className="editButton" data-button="edit" data-id=${item.id}>Edit</button>
        <button className="delButton" data-button="delete" data-id=${item.id}>Delete</button>
      </li>
      `
    }, '')
    list.innerHTML = markup;
  } else list.innerHTML = `<li><span>No messages</span></li>`


  // const object = {
  //   a: "asddasd",
  //   b: "dasdsd",
  //   c: "fsdfsdfd"
  // }
  // console.log(object.a)

  // const keys = Object.keys(object); //[a,b,c]
  // for(const key of keys) {
  //   console.log(object[key])
  // }

}
const deleteMessage = async (id) => {
  try {
    await axios.delete(`https://chat-74d03.firebaseio.com/messanger/${id}.json`);
  } catch (err) {
    console.log(err)
  }
  finally {
    getMessages();
  }
}

const updateMessage = async (id) => {
  const message = editInput.value;
  try {
    await axios.patch(`https://chat-74d03.firebaseio.com/messanger/${id}.json`, { message });
  } catch (err) {
    console.log(err)
  }
  finally {
    getMessages();
    editInput.value = '';
  }
}

const actions = (e) => {
  if (e.target.dataset.button === "delete") {
    deleteMessage(e.target.dataset.id)
  }
  if (e.target.dataset.button === "edit") {
    if (e.target.textContent === "Save") {
      updateMessage(e.target.dataset.id);
      e.target.textContent = "Edit";
    }
    if (e.target.textContent === "Edit") {
      editInput.classList.toggle('editInputActive');
      e.target.textContent = "Save";
      editInput.value = e.target.previousElementSibling.textContent
    }
  }
}

getMessages();
list.addEventListener('click', actions)


