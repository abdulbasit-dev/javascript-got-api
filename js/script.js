const API_URL = 'https://breakingbadapi.com/api/characters';
const cards = document.querySelector('#cards');
const form = document.querySelector('#form');
const search = document.querySelector('#search');

// initially get
getChars(API_URL);
async function getChars(url) {
  const resp = await fetch(url);
  const respData = await resp.json();

  if (respData.length !== 0) {
    showChars(respData);
    document.querySelector('.loader').classList.add('hide');
  }
}

function showChars(chars) {
  // clear main
  cards.innerHTML = '';

  chars.forEach(char => {
    const {name, img, birthday,  nickname} = char;

    const charEle = document.createElement('div');
    charEle.classList.add('card');

    charEle.innerHTML = `
        <a href="details.html?name=${name}">
            <img src="${img}" alt="${name}" />
            <div class="char_info">
                <h3>Name: <span>${name}</span></h3>
                <h3>Nick Name: <span>${nickname}</span></h3>
                <h3>Birthday: <span>${birthday}</span></h3>
            </div>
        </a>
        `;

    cards.appendChild(charEle);
  });
}
