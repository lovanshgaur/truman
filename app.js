// init app
const trialAPI = `https://jsonplaceholder.typicode.com/posts/1`;

// dom variables
const form = document.getElementById("apiForm");
const responseWrapper = document.querySelector(".responseWrapper");
const dataWrapper = document.querySelector(".dataWrapper");
const statusSpan = document.getElementById("status");
const responseBtns = document.querySelectorAll(".responseBtn");

// variables

let loading;

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
    const resultRaw = await response.text();
    const resultJSON = JSON.parse(resultRaw);
    renderData(response, resultRaw, "raw");

    responseBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        responseBtns.forEach(b=>{
            b.classList.remove('active')
        })
        btn.classList.add("active");
        let btnAction = e.target.dataset.name;
        if (btnAction === "json") {
          renderData(response, resultJSON, "json");
        }
        if (btnAction === "raw") {
          renderData(response, resultRaw, "raw");
        }
      });
    });
  } catch (error) {
    console.error(error);
  }
}

function renderData(response, result, action) {
  console.log(action);
  if (action === "raw") {
    statusSpan.innerText = response.status;
    statusSpan.classList = "";
    if (response.ok) {
      statusSpan.classList.add("ok");
    } else {
      statusSpan.classList.add("err");
    }
    dataWrapper.textContent = result;
  } else {
    dataWrapper.textContent = JSON.stringify(result, null, 2).trimStart();
    Prism.highlight(
      JSON.stringify(result, null, 2),
      Prism.languages.json,
      "json"
    );
  }
}
