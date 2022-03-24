const API_URL = 'https://thronesapi.com/api/v2/Characters';
const cards = document.querySelector('#cards');
const form = document.querySelector('#form');
const search = document.querySelector('#search');

// initially get
getChars(API_URL);
async function getChars(url) {
  try {
    const resp = await fetch(url);
    const respData = await resp.json();
    if (respData.length !== 0) {
      showChars(respData);
      document.querySelector('.loader').classList.add('hide');
    }
  } catch (error) {
    console.log(error);
  }
}

function showChars(chars) {
  // clear main
  cards.innerHTML = '';

  chars.forEach(char => {
    const {id, fullName,firstName:name, family, imageUrl: img, title} = char;

    const charEle = document.createElement('div');
    charEle.classList.add('card');

    charEle.innerHTML = `
        <a href="details.html?id=${id}&name=${name}">
            <img src="${img}" alt="${name}" />
            <div class="char_info">
                <h3>Full Name: <span>${fullName}</span></h3>
                <h3>Family: <span>${family}</span></h3>
                <h3>Title: <span>${title}</span></h3>
            </div>
        </a>
        `;

    cards.appendChild(charEle);
  });
}
