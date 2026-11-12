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
  outputWrapper.innerHTML = ``;
  let api = data.api;
  try {
    const response = await fetch(api);
    console.log(response);
    if (response.ok) {
      outputWrapper.style.backgroundColor = "green";
      const tags = document.createElement("div");
      tags.innerHTML = `
        <div class="tag status"><b>Status</b>: ${response.status}</div>
      `;
      outputWrapper.appendChild(tags);
    } else {
      outputWrapper.style.backgroundColor = "red";
    }

    const result = await response.json();

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
