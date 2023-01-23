import axios from "axios";

type Animal = {
  id: number;
  name: string;
  description: string;
};

const randomImg = "https://picsum.photos/id/237/200/300";

const wrapper = document.querySelector("[data-insert-cards]");

const btnAddNewObj = document.querySelector("[data-add-btn]");

const inputText = document.querySelector(
  "[data-input-text]"
) as HTMLInputElement;
const textareaText = document.querySelector(
  "[data-textarea-text]"
) as HTMLInputElement;

document.addEventListener("DOMContentLoaded", function () {
  //when Web Page Start, load getData(counter)
  loadAllData();
});

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
                
        <div data-wrapper-form2="${element.id}" class="editForm hide">
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

//---------------------------EDIT------------------------------------------------

let userTitleText = "";
let userDescriptionText = "";

inputText.addEventListener("change", function () {
  userTitleText = this.value;
  // userDescriptionText = this.value;
});

textareaText.addEventListener("change", function () {
  userDescriptionText = this.value;
  // userDescriptionText = this.value;
});

const initEvents = () => {
  const btnEdit = document.querySelectorAll(
    "[data-edit-btn]"
  ) as NodeListOf<HTMLElement>; //All data attribute

  btnEdit.forEach((btn) => {
    //All btn with data-edit-btn
    btn.addEventListener("click", () => {
      // povesitj na vse knopki Event click
      const cardID = btn.dataset.editBtn; // Dataset zabiraem value iz data attribute ([data-wrapper-form="2"])
      const wrapperForm2 = document.querySelector(
        `[data-wrapper-form2="${cardID}"]`
      );
      console.log(cardID);

      wrapperForm2.classList.remove("hide");
    });
  });

  let cardTextArea = document.querySelector(
    `[data-card-text-area-text]`
  ) as unknown as NodeListOf<HTMLElement>;
  const cardInputText = document.querySelector(`[data-card-input-text]`);

  // const cardTextAreaText = document.querySelector(`data-card-text-area-text="${cardID}"]`);

  cardInputText.addEventListener("change", function () {
    cardTextArea = this.value;
  });

  const btnUpdate = document.querySelectorAll(
    "[data-update-btn]"
  ) as NodeListOf<HTMLElement>;

  btnUpdate.forEach((btn) => {
    btn.addEventListener("click", () => {
      const cardID = btn.dataset.updateBtn;
    });
  });

  //---------------------------DELETE------------------------------------------------

  const btnDelete = document.querySelectorAll("[data-delete-btn]") as NodeListOf<HTMLElement>;
  btnDelete.forEach((btn) => {
    btn.addEventListener("click", () => {
      const cardID = btn.dataset.deleteBtn;
      deleteCard(parseInt(cardID));                               // parseInt() - transform string to number
    });
  });
};

const deleteCard = (card:number) => {
  axios
    .delete<Animal>(`http://localhost:3000/animals/${card}`)
    .then(() => {
      wrapper.innerHTML = "";                                         //opustoshitj vse kartocki
      loadAllData();                                                  //zanovo zagruzitj dannie
      console.log(`del`);
    });
};
//---------------------------------------------------------------------------


btnAddNewObj.addEventListener("click", () => {
  axios.post<Animal>("http://localhost:3000/animals", {
      name: userTitleText,
      description: userDescriptionText,
    })
    .then(() => {
      wrapper.innerHTML = "";                                       //opustoshitj vse kartocki
      loadAllData();                                                //zanovo zagruzitj dannie
      inputText.value = "";
      textareaText.value = "";
    });
});
//---------------------------------------------------------------------------
