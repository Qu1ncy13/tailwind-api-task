const servicesGrid = document.querySelector(".services-cards");
const staffCards = document.querySelector(".staff-cards");
const housesCards = document.querySelector(".houses-cards");


async function loadServicesData() {
    const responce = await fetch("http://localhost:3000/api/services", {
        method: "GET"
    });
    const data = await responce.json();
    data.data.forEach((service) => {
        const {name , description, image} = service;
        const serviceCard = createServiceCard(name, description, image);
        servicesGrid.append(serviceCard);

    });
    
}
async function loadStaffData(){
    const responce = await fetch("http://localhost:3000/api/staff", {
        method: "GET"
    });
    const data = await responce.json();

    data.data.forEach((worker) =>{
        const {fio, specialization, profile_image} = worker;
        const staffCard = createStaffCard(fio, specialization, profile_image);
        staffCards.append(staffCard);

    });
}
async function loadHousesData() {
    const responce = await fetch("http://localhost:3000/api/homes", {
        method: "GET"
    });
    const data = await responce.json();
    data.data.forEach((house, index) => {
        const {id, name, short_description, images, capacity, costs} = house;
        const reverse = index % 2 !== 0;
        const houseCard = createHouseCard(id, name, short_description, images[0], capacity, costs, reverse);
        housesCards.append(houseCard);
    });
}
function createHouseCard(id, name, short_description, image, capacity, costs, reverse){
    const card = document.createElement("div");
    card.classList.add("house-card");

    const cardImageDiv = document.createElement('div');
    cardImageDiv.classList.add("card-image-div");
    const cardImg = document.createElement('img');
    cardImg.src = image;
    cardImageDiv.append(cardImg);

    const cardInfo = document.createElement('div');
    cardInfo.classList.add('card-info');
    const cardName = document.createElement('h3');
    const cardCapacity = document.createElement('p');
    const cardDescription = document.createElement('p');

    cardName.textContent = name;
    cardCapacity.textContent = "Вместимость: " + capacity + " человека";
    cardDescription.textContent = short_description;

    const cardBottom = document.createElement('div');
    cardBottom.classList.add("card-bottom");
    const cardCosts = document.createElement('h3');
    const cardButton = document.createElement('button');
    cardButton.classList.add('card-button');
    cardButton.innerHTML = 'Подробнее';
    cardButton.addEventListener('click', () => {
        window.location.href = `home.html?id=${id}`;
    });
    cardCosts.textContent = costs + " руб";
    cardBottom.append(cardCosts, cardButton);

    cardInfo.append(cardName, cardCapacity, cardDescription, cardBottom);
    if (reverse){
        card.append(cardImageDiv, cardInfo);
    } else {
        card.append(cardInfo, cardImageDiv);
    }
    return card;
}
function createStaffCard(fio, specialization, image) {
    const card = document.createElement("div");
    card.classList.add("staff-card");
    const staffCardImage = document.createElement("div");
    staffCardImage.classList.add("staff-card-image");

    const cardImage = document.createElement('img');
    const cardName = document.createElement('h3');
    const cardSpec = document.createElement('p');

    cardImage.src = image;
    if (!image){
        cardImage.src = "images/notFound.png";
    }
    staffCardImage.append(cardImage);

    cardName.textContent = fio;
    cardSpec.textContent = specialization;

    card.append(staffCardImage, cardName, cardSpec);
    return card;

    
}
function createServiceCard(name, description, image){
    const card = document.createElement('div');
    card.classList.add("service-card");
    const cardName = document.createElement('h3');
    const cardImg = document.createElement('img');
    const cardDescription = document.createElement('p');

    cardImg.src = image;
    if(!image){
        cardImg.src = "images/notFound.png"
    }
    cardName.textContent = name;
    cardDescription.textContent = description;

    card.append(cardImg, cardName, cardDescription);

    return card;
}
async function bookHouse(){
    const bookingForm = document.getElementById("bookingForm");

    bookingForm.addEventListener("submit", async (book) =>{
        book.preventDefault();

        const formData = new FormData(bookingForm);
        const userBook = Object.fromEntries(formData.entries());
        userBook.count_people = Number(userBook.count_people);
        userBook.home_id = Number(userBook.home_id);
        
        console.log(userBook);
        const responce = await fetch("http://localhost:3000/api/book", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userBook)
        });
        const data = await responce.json()
        console.log(data);
    });
}

bookHouse();
loadStaffData();
loadServicesData();
loadHousesData();