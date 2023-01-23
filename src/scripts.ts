import axios from "axios";

type Animal = {
  id: number;
  name: string;
  description: string;
};

const randomImg = () => {
  let result = Math.floor(Math.random() * 80) +1;
  const randomImg = "https://picsum.photos/id/237/200/300";
  return `"https://picsum.photos/id/${result}/200/300"`
}

const wrapper = document.querySelector("[data-insert-cards]");


document.addEventListener("DOMContentLoaded", function () {
  //when Web Page Start, load getData(counter)
  loadAllData();
});


//---GET---------------------------------------------------------------------GET---

const loadAllData = () => {
  axios.get<Animal[]>("http://localhost:3000/animals").then(({ data }) => {
    data.forEach((element) => {
      const card = document.createElement("div"); //     <div class="card-wrapper">
      card.classList.add("card-wrapper");

      card.innerHTML = ` 
        <div class="titleForme">      
        <img class="img-responsive" src=${randomImg()}>
        
        <p class="">${element.name}</p>
        <p class="">${element.description}</p>
        
        <button data-edit-btn="${element.id}">Edit</button>
        <button data-delete-btn="${element.id}">Delete</button>
        </div><br>
                
        <div data-wrapper-form="${element.id}" class="editForm hide">

        <input data-card-input-text="${element.id}" type="text" id="text" rows="10" placeholder="New Title"></label><br>
        <textarea data-card-text-area-text="${element.id}" id="text" rows="10" cols="15" placeholder="New description"></textarea><br>
        
        <button data-update-btn="${element.id}">Update</button>
        </div>
        <br><br><br><br>`;
      wrapper.append(card);
    });
    initEvents();
  });
};


//---post------------------------New post---------------------------------------------post---

const inputText = document.querySelector("[data-input-text]") as HTMLInputElement; //input for new card
const textareaText = document.querySelector("[data-textarea-text]") as HTMLInputElement; //textarea for new card
const btnAddNewObj = document.querySelector("[data-add-btn]"); //button for new card

let userTitleText = "";
let userDescriptionText = "";

inputText.addEventListener("change", function () {
  userTitleText = this.value;  //catch the changes => save in 'let'
});

textareaText.addEventListener("change", function () {
  userDescriptionText = this.value;   //catch the changes => save in 'let'
});

btnAddNewObj.addEventListener("click", () => {
  axios.post<Animal>("http://localhost:3000/animals", {
    name: userTitleText, //text from input
    description: userDescriptionText, //text from textarea
  })
  .then(() => {
    wrapper.innerHTML = ""; //reset wrapper from card
    loadAllData(); //again load data
    inputText.value = ""; //reset input
    textareaText.value = ""; //reset textarea
  });
});

//-----------------------------------------------------------------------------------

const initEvents = () => { // only when cards are loaded
  //all elements in cards
  const btnEdit = document.querySelectorAll("[data-edit-btn]") as NodeListOf<HTMLElement>; // all edit buttons 
  const btnDelete = document.querySelectorAll("[data-delete-btn]") as NodeListOf<HTMLElement>; // all delete buttons 
  const cardInputText = document.querySelectorAll(`[data-card-input-text]`) as NodeListOf<HTMLInputElement>; //all inputs
  const cardInputTextArea = document.querySelectorAll(`[data-card-text-area-text]`) as NodeListOf<HTMLInputElement>; //all textarea
  const btnUpdate = document.querySelectorAll("[data-update-btn]") as NodeListOf<HTMLElement>;

  let cardTitleText = "";
  let cardDescriptionText = "";

  // add button-edit click event
  btnEdit.forEach((btn) => { //all cards edit buttons
    btn.addEventListener("click", () => {
      
      const cardID = btn.dataset.editBtn; 
      const wrapperForm2 = document.querySelector(`[data-wrapper-form="${cardID}"]`);
      wrapperForm2.classList.remove("hide");
    });
  });

  // add button-delete click event
  btnDelete.forEach((btn) => {
    btn.addEventListener("click", () => {
      const cardID = btn.dataset.deleteBtn;
      deleteCard(parseInt(cardID)); // parseInt() - transform string to number
    });
  });

  // add input change event
  cardInputText.forEach((cardInput) => {
    cardInput.addEventListener("change", function () {
      cardTitleText = this.value;
    });
  });
  // add textarea input change event
  cardInputTextArea.forEach((cardInput) => {
    cardInput.addEventListener("change", function () {
      cardDescriptionText = this.value;
    });
  });
  
  btnUpdate.forEach((btn) => {
    btn.addEventListener("click", () => {
      const cardID = btn.dataset.updateBtn;
      putCard(cardTitleText, cardDescriptionText, cardID);
    });
  });
};


//---------------------------UPDATE------------------------------------------------

const putCard = (title:string,description:string, card:string) => {
  
  axios.put<Animal>(`http://localhost:3000/animals/${card}`, {
    name: title, //text from input
    description: description //text from textarea
  })
  .then(() => {
    wrapper.innerHTML = ""; //remove from page old cards
    loadAllData(); //load new data
  });
}

//---------------------------DELETE------------------------------------------------

const deleteCard = (card: number) => {
  axios.delete<Animal>(`http://localhost:3000/animals/${card}`).then(() => {
    wrapper.innerHTML = ""; //remove from page old cards
    loadAllData(); //load new data
  });
};








