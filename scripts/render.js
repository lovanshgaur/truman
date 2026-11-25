const statusSpan = document.getElementById("status");
const dataWrapper = document.querySelector(".dataWrapper");
const responseBtns = document.querySelectorAll(".responseBtn");
const jsonBtn = document.querySelector('.responseBtn[data-name="json"]');

export function renderResponse(result, view) {
  statusSpan.textContent = `${result.status} ${result.statusText}`.trim();
  statusSpan.className = result.ok ? "ok" : "err";
  jsonBtn.disabled = !result.isValidJSON;

  responseBtns.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.name === view);
  });

  if (view === "json" && result.isValidJSON) {
    const formatted = JSON.stringify(result.json, null, 2);
    dataWrapper.innerHTML = Prism.highlight(
      formatted,
      Prism.languages.json,
      "json"
    );
  } else {
    dataWrapper.textContent = result.rawText || "(Empty response body)";
  }
}

export function renderError(message) {
  statusSpan.textContent = "Error";
  statusSpan.className = "err";
  jsonBtn.disabled = true;
  dataWrapper.textContent = message;
}

export function setLoading(isLoading, sendBtn) {
  sendBtn.disabled = isLoading;
  sendBtn.textContent = isLoading ? "Sending..." : "Send";
  if (isLoading) {
    dataWrapper.textContent = "Fetching response...";
  }
}