// init app
const trialAPI = `https://jsonplaceholder.typicode.com/posts/1`;

// dom variables
const form = document.getElementById("apiForm");
const responseWrapper = document.querySelector(".responseWrapper");
const dataWrapper = document.querySelector(".dataWrapper");
const statusSpan = document.getElementById("status");
const responseBtns = document.querySelectorAll(".responseBtn");

// states
let currentResponse = null;
let resultRaw = "";
let resultJSON = null;
let isValidJSON = false;
let activeView = "raw";

responseBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const btnAction = e.target.dataset.name;
    if (btnAction === "json" && !isValidJSON) return;

    responseBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    activeView = btnAction;

    if (currentResponse) {
      renderData(
        currentResponse,
        activeView === "json" ? resultJSON : resultRaw,
        activeView
      );
    }
  });
});
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
    resultRaw = await response.text();
    currentResponse = response;
    try {
      resultJSON = JSON.parse(resultRaw);
      isValidJSON = true;
    } catch (error) {
      resultJSON = null;
      isValidJSON = false;
      activeView = "raw";
      responseBtns.forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.name === "raw");
      });
    }
    renderData(
      currentResponse,
      activeView === "json" ? resultJSON : resultRaw,
      activeView
    );
  } catch (error) {
    console.error(error);
  }
}

function renderData(response, result, action) {
  statusSpan.innerText = response.status;
  statusSpan.classList = "";
  if (response.ok) {
    statusSpan.classList.add("ok");
  } else {
    statusSpan.classList.add("err");
  }
  if (action === "raw") {
    dataWrapper.textContent = result;
  } else {
    const formatted = JSON.stringify(result, null, 2).trimStart();
    dataWrapper.innerHTML = Prism.highlight(
      formatted,
      Prism.languages.json,
      "json"
    );
  }
}
