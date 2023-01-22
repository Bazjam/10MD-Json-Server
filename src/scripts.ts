import axios from "axios";

type Animal = {
  id: number;
  name: string;
  description: string;
};

const randomImg = "https://picsum.photos/id/237/200/300";

const wrapper = document.querySelector("[data-insert-cards]");

const btnAddNewObj = document.querySelector("[data-add-btn]");

const inputText = document.querySelector("[data-input-text]") as HTMLInputElement;
const textareaText = document.querySelector("[data-textarea-text]") as HTMLInputElement;

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
        <button>Delete</button>
        </div>
        <br>
        
        <div data-wrapper-form="${element.id}" class="editForm hide">
        <input type="text" id="text" rows="10" placeholder="New Title"></label>
        <br>
        <textarea id="text" rows="10" cols="15" placeholder="New description"></textarea>
        <br>
        <button data-update-btn>Update</button>
        </div>
        <br><br><br><br>`;
        wrapper.append(card);
      
    });
    initEvents();
  });
  
};

//---------------------------------------------------------------------------

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

  const btnEdit = document.querySelectorAll("[data-edit-btn]") as NodeListOf<HTMLElement>;   //All data attribute 
  // const btnUpdate = document.querySelector("[data-update-btn]");
  
  
  btnEdit.forEach((btn) => {                                      //All btn with data-edit-btn
    btn.addEventListener("click", () => {                         // povesitj na vse knopki Event click
      const cardID = btn.dataset.editBtn;                         // Dataset zabiraem value iz data attribute ([data-wrapper-form="2"])
      const wrapperForm2 = document.querySelector(`[data-wrapper-form="${cardID}"]`);
      wrapperForm2.classList.remove("hide");
    });
  });
  
  // btnEdit.addEventListener("click", () => {
    //   wrapperForm2.classList.remove("hide");
  // });

  // btnUpdate.addEventListener("click", () => {
  //   wrapperForm2.classList.add("hide");
  // });
};

btnAddNewObj.addEventListener("click", () => {
  axios
    .post<Animal>("http://localhost:3000/animals", {
      name: userTitleText,
      description: userDescriptionText,
    })
    .then(() => {
      wrapper.innerHTML = ""; //opustoshitj vse kartocki
      loadAllData(); //zanovo zagruzitj dannie
      inputText.value = "";
      textareaText.value = "";
    });
});
//---------------------------------------------------------------------------
