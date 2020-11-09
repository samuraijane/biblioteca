// find out where we are in the app
const afterTrailingSlash = window.location.href.substr(window.location.href.lastIndexOf('/') + 1);
const endpoint = !!afterTrailingSlash ? afterTrailingSlash : 'root';

// utils
function isEmpty(obj) { 
  for (var x in obj) return false;
  return true;
}

// code specific to '/search' endpoint
if (endpoint === "search") {
  const search = document.getElementById('searchForm');
  search.addEventListener('submit', e => handleSubmit(e));

  const handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const body = stringifyFormData(formData);
    doPost('http://localhost:3001/api/books', body)
    .then(res => addElementsToDom('books', res, 'searchPage', 'li'))
    .catch(err => console.log('We have an error:', err));
  }

  function stringifyFormData(fd) {
    const data = {};

    for (let field of fd.keys()) {
      const value = fd.get(field);
      if (!value) break;
      data[field] = fd.get(field);
    }
    return data;
  }
}

async function doPost (url = '', body = {}) {
  if (!url || isEmpty(body)) {
    console.error('Either the URL or the body is empty and each must have a value.');
    return undefined;
  }
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
  return response.json();
}


function addElementsToDom(className, data, elID, type) {
  if(type === 'li') {
    const elUL = document.createElement('ul');
    elUL.className = className;
    data.docs.forEach(item => {
      const elLI = document.createElement('li');
      elLI.innerHTML = `<p>${item.title}</p><p>by ${item.author_name[0]}</p>`;
      elUL.appendChild(elLI);
    });
    const searchPage = document.getElementById(elID);
    searchPage.appendChild(elUL);
  }
}