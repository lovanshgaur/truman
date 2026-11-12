// init app
const trialAPI = `https://jsonplaceholder.typicode.com/posts/1`;

// dom variables
const form = document.getElementById("basicForm");
const outputWrapper = document.querySelector(".output");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  submitForm(data);
  form.reset();
});

async function submitForm(data) {
    outputWrapper.innerHTML = ``
  console.log(data);
  let api = data.api;
  try {
    const response = await fetch(api);
    console.log(response.ok)
    if(response.ok){
        outputWrapper.style.backgroundColor = "green"
    }
    else{
        outputWrapper.style.backgroundColor = "red"
    }
    const result = await response.json();
    console.log(result);
    for (const key in result) {
      const dataField = document.createElement("div");
      dataField.innerHTML = `
        <b>${key}</b>: ${result[key]}
        `;
      outputWrapper.appendChild(dataField);
      console.log(key, result[key]);
    }
  } catch (error) {
    console.error(error);
  }
}
