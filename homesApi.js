const main = document.getElementById("main");

function getIdFromUrl(){
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
}

async function loadHomeDataById(id){
    const responce = await fetch(`http://localhost:3000/api/homes/${id}`, {
        method: "GET"
    });
    const data = await responce.json();
    return data.data;
}

function createImage(src, classes){
    const img = document.createElement('img');
    img.src = src || "images/notFound.png";
    img.classList.add(...classes);
    return img;
}

function renderHome(home){
    const {name, description, short_description, images = [], capacity, costs, square} = home;

    const container = document.createElement('div');
    container.classList.add('container');

    const wrapper = document.createElement('div');
    wrapper.classList.add('flex', 'flex-row', 'gap-10', 'items-start', 'my-10');

    
    const imagesCol = document.createElement('div');
    imagesCol.classList.add('flex', 'flex-col', 'w-1/2', 'gap-5');

    const mainImgClasses = ['block', 'w-full', 'aspect-[16/9]', 'object-cover', 'box-border', 'border-4', 'border-sage', 'rounded-[10px]'];
    imagesCol.append(createImage(images[0], mainImgClasses));

    const thumbs = images.slice(1, 4);
    if (thumbs.length){
        const thumbsRow = document.createElement('div');
        thumbsRow.classList.add('grid', 'grid-cols-3', 'gap-5', 'w-full');
        const thumbClasses = ['block', 'w-full', 'aspect-square', 'object-cover', 'box-border', 'border-4', 'border-sage', 'rounded-[10px]'];
        thumbs.forEach((src) => {
            thumbsRow.append(createImage(src, thumbClasses));
        });
        imagesCol.append(thumbsRow);
    }

    
    const textCol = document.createElement('div');
    textCol.classList.add('flex', 'flex-col', 'w-1/2', 'gap-5', 'text-left');

    const title = document.createElement('h2');
    title.classList.add('text-5xl', 'leading-tight', 'm-0');
    title.textContent = name;
    textCol.append(title);

    const capacityP = document.createElement('p');
    capacityP.classList.add('text-lg', 'm-0');
    capacityP.textContent = `Вместимость: ${capacity} человека`;
    textCol.append(capacityP);

    if (square){
        const squareP = document.createElement('p');
        squareP.classList.add('text-lg', 'm-0');
        squareP.textContent = `Площадь: ${square} м²`;
        textCol.append(squareP);
    }

    const desc = document.createElement('p');
    desc.classList.add('text-lg', 'leading-relaxed', 'm-0');
    desc.textContent = description || short_description || '';
    textCol.append(desc);

    const price = document.createElement('h2');
    price.classList.add('text-4xl', 'mt-4', 'm-0');
    price.textContent = `${costs} руб`;
    textCol.append(price);

    wrapper.append(imagesCol, textCol);
    container.append(wrapper);
    main.append(container);
}

async function init(){
    const id = getIdFromUrl();
    const home = await loadHomeDataById(id);
    renderHome(home);
    
}

init();