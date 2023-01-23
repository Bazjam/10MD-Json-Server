import axios from "axios";

type Animal = {
  id: number;
  name: string;
  description: string;
};

const randomImg = "https://picsum.photos/id/237/200/300";
const wrapper = document.querySelector("[data-insert-cards]");


document.addEventListener("DOMContentLoaded", function () {
  //when Web Page Start, load getData(counter)
  loadAllData();
});
//---------------------------GET------------------------------------------------

const loadAllData = () => {
  axios.get<Animal[]>("http://localhost:3000/animals").then(({ data }) => {
    data.forEach((element) => {
      const card = document.createElement("div"); //     <div class="card-wrapper">
      card.classList.add("card-wrapper");

      card.innerHTML = ` 
        <div class="titleForme">      
        <img class="img-responsive" src=${randomImg}>
        
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

//---------------------------New post------------------------------------------------
const inputText = document.querySelector("[data-input-text]") as HTMLInputElement; //input dlja novoj kartochki
const textareaText = document.querySelector("[data-textarea-text]") as HTMLInputElement; //textarea dlja novoj kartochki
const btnAddNewObj = document.querySelector("[data-add-btn]"); //knopka dlja novoj kartochki

let userTitleText = "";
let userDescriptionText = "";

inputText.addEventListener("change", function () {
  userTitleText = this.value;  //otlavlivajet izmenenija => sohranjaet v peremennuju
});

textareaText.addEventListener("change", function () {
  userDescriptionText = this.value;   //otlavlivajet izmenenija => sohranjaet v peremennuju
});

btnAddNewObj.addEventListener("click", () => {
  axios
    .post<Animal>("http://localhost:3000/animals", {
      name: userTitleText, //text iz inputa
      description: userDescriptionText, //text iz textarea
    })
    .then(() => {
      wrapper.innerHTML = ""; //opustoshitj wrapper ot kartochek
      loadAllData(); //zanovo zagruzitj dannie
      inputText.value = ""; //opustoshili input
      textareaText.value = ""; //opustoshili textarea
    });
});

//-----------------------------------------------------------------------------------


const initEvents = () => { // only when cards are loaded
  //sobirajem vse elementi s kartochki
  const btnEdit = document.querySelectorAll("[data-edit-btn]") as NodeListOf<HTMLElement>; // vse edit knopki
  const btnDelete = document.querySelectorAll("[data-delete-btn]") as NodeListOf<HTMLElement>; // vse delete knopki
  const cardInputText = document.querySelectorAll(`[data-card-input-text]`) as NodeListOf<HTMLInputElement>; //vse inputi
  const cardInputTextArea = document.querySelectorAll(`[data-card-text-area-text]`) as NodeListOf<HTMLInputElement>; //vse textarea
  const btnUpdate = document.querySelectorAll("[data-update-btn]") as NodeListOf<HTMLElement>;

  let cardTitleText = "";
  let cardDescriptionText = "";

  // dobavlajem knopke edit click event
  btnEdit.forEach((btn) => { //vsem edit knopkam
    btn.addEventListener("click", () => {
      
      const cardID = btn.dataset.editBtn; 
      const wrapperForm2 = document.querySelector(`[data-wrapper-form="${cardID}"]`);
      wrapperForm2.classList.remove("hide");
    });
  });

  // dobavlajem knopke delete click event
  btnDelete.forEach((btn) => {
    btn.addEventListener("click", () => {
      const cardID = btn.dataset.deleteBtn;
      deleteCard(parseInt(cardID)); // parseInt() - transform string to number
    });
  });

  // dobavljaem inputu change event
  cardInputText.forEach((cardInput) => {
    cardInput.addEventListener("change", function () {
      cardTitleText = this.value;
    });
  });
  // dobavljaem textarea inputu change event
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
    name: title, //text iz inputa
    description: description //text iz textarea
  })
  .then(() => {
    wrapper.innerHTML = ""; //opustoshitj wrapper ot kartochek
    loadAllData(); //zanovo zagruzitj dannie
  });
}

      

//---------------------------DELETE------------------------------------------------

const deleteCard = (card: number) => {
  axios.delete<Animal>(`http://localhost:3000/animals/${card}`).then(() => {
    wrapper.innerHTML = ""; //opustoshitj vse kartocki
    loadAllData(); //zanovo zagruzitj dannie
    console.log(`del`);
  });
};








