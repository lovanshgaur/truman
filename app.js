// init app
const trialAPI = `https://jsonplaceholder.typicode.com/posts/1`;

// dom variables
const form = document.getElementById("apiForm");
const responseWrapper = document.querySelector(".responseWrapper");
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
    responseWrapper.style.display = "block"
    statusSpan.innerText = response.status;
    statusSpan.classList = "";
    if (response.ok) {
      statusSpan.classList.add("ok");
    } else {
      statusSpan.classList.add("err");
    }

    const result = await response.json();
    dataWrapper.textContent = JSON.stringify(result, null, 2).trimStart();
    Prism.highlightElement(dataWrapper);
  } catch (error) {
    console.error(error);
  }
}
