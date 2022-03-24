const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
const {name, id} = params;
// Change title
document.title = `${name} | Info`;

getChar();
async function getChar() {
  try {
    const resp = await fetch(`https://thronesapi.com/api/v2/Characters/${id}`);
    const respData = await resp.json();
    if (respData.length !== 0) {
      showChar(respData);
      document.querySelector('.loader').classList.add('hide');
    }
  } catch (error) {
    console.log(error);
  }
}

function showChar(char) {
  const {firstName, lastName, fullName, title, family, imageUrl:img} = char;
  document.querySelector('.main-detail').innerHTML = `
   <div class="detail">
      <div class="img-container">
        <img src="${img}" alt="${firstName}" />
      </div>
      <div class="info">
        <h1>${fullName}</h1>
        <div>
          <span>First Name: </span>
          <span>${firstName}</span>
        </div>
        <div>
          <span>Last Name: </span>
          <span>${lastName}</span>
        </div>
        <div>
          <span>Title:</span>
          <span>${title}</span>
        </div>
        <div>
          <span>Family:</span>
          <span>${family}</span>
        </div>
      </div>
    </div>
  `;
}
