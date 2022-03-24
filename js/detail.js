const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
const {name} = params;
// Change title 
document.title = `${name} | Info` ;

getChar();
async function getChar() {
  const resp = await fetch(`https://breakingbadapi.com/api/characters?name=${name}`);
  const respData = await resp.json();
  if (respData.length !== 0) {
    showChar(respData[0]);
    document.querySelector('.loader').classList.add('hide');
  }
}

function showChar(char) {
  const {name, img, birthday, occupation, nickname, status, appearance} = char;
  document.querySelector('.main-detail').innerHTML = `
   <div class="detail">
      <div class="img-container">
        <img src="${img}" alt="${name}" />
      </div>
      <div class="info">
        <h1>${name}</h1>
        <div>
          <span>Nick Name: </span>
          <span>${nickname}</span>
        </div>
        <div>
          <span>Occupation:</span>
          <span>${occupation.map(item => ` ${item} `)}</span>
        </div>
        <div>
          <span>Season Appearance:</span>
          <span>${appearance.map(item => ` ${item} `)}</span>
        </div>
        <div>
          <span>Birthday:</span>
          <span>${birthday}</span>
        </div>
        <div>
          <span>Satus:</span>
          <span>${status}</span>
        </div>
      </div>
    </div>
  `;
}
