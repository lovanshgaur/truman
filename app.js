// init app
const trialAPI = `https://jsonplaceholder.typicode.com/posts/1`;

// dom variables
const form = document.getElementById("apiForm");
const outputWrapper = document.querySelector(".output");
const dataWrapper = document.querySelector(".dataWrapper");
const statusSpan = document.getElementById("status");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  submitForm(data);
  form.reset();
});

async function submitForm(data) {
  dataWrapper.innerHTML = ``;
  let api = data.api;
  try {
    const response = await fetch(api);
    console.log(response);
    if (response.ok) {
      statusSpan.innerText = response.status;
    }

    const result = await response.json();
    dataWrapper.textContent = JSON.stringify(result,null,2).trimStart();
    Prism.highlightElement(dataWrapper);
    // for (const key in result) {
    //   const dataField = document.createElement("div");
    //   dataField.classList.add("dataField");
    //   dataField.innerHTML = `
    //     <b>${key}</b>: ${result[key]}
    //     `;
    //   dataWrapper.appendChild(dataField);
    //   console.log(key, result[key]);
    // }
  } catch (error) {
    console.error(error);
  }
}
