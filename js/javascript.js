//Fetching data > category

//close the modal when clicked
const modal = document.querySelector(".modal-background");
modal.addEventListener("click", () => {
  modal.classList.add("hide");
});


fetch("http://kea-alt-del.dk/t5/api/categories")
.then(res=>res.json())
.then(function(data){
      data.forEach(createCategory)
    getProducts();
      })

function createCategory(data){
    const section = document.createElement("section");
    const header = document.createElement("h1");
    header.textContent=data;
    section.setAttribute("id", data)
    section.appendChild(header);
    document.querySelector("main").appendChild(section);

}

// Fetching the data//
function getProducts(){
fetch("https://kea-alt-del.dk/t5/api/productlist")
.then(function(response){
      return response.json()
      }).then(function(data){
      data.forEach(showDish)
      })

}

//Cloning//
function showDish(dish){
    console.log(dish)
    const template = document.querySelector("template").content;
    const copy = template.cloneNode(true);
    copy.querySelector(".data_name").textContent=dish.name;
    copy.querySelector(".data_price").textContent=dish.price;
    if(dish.discount){
        copy.querySelector(".data_price").classList.add("discount");
        copy.querySelector  (".data_discount").textContent=
            Math.round(dish.price - dish.discount / 100 * dish.price)
    } else {
        copy.querySelector(".data_discount").remove();
    }

    if(!dish.soldout){

        copy.querySelector("article").classList.remove("soldOut");
    }




    copy.querySelector("button").addEventListener("click", () => {
    fetch(`https://kea-alt-del.dk/t5/api/product?id=${dish.id}`)
      .then(res => res.json())
      .then(showDetails);
  });

    document.querySelector("#"+dish.category).appendChild(copy);
}

function showDetails(data) {
  modal.querySelector(".modal-name").textContent = data.name;
  modal.querySelector(".modal-description").textContent = data.longdescription;
  modal.classList.remove("hide");
}



