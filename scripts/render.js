const statusSpan = document.getElementById("status");
const timeSpan = document.getElementById("time");
const sizeSpan = document.getElementById("size");
const dataWrapper = document.querySelector(".dataWrapper");
const responseBtns = document.querySelectorAll(".responseBtn");
const jsonBtn = document.querySelector('.responseBtn[data-name="json"]');
const headersBtn = document.querySelector('.responseBtn[data-name="headers"]');
const historyList = document.getElementById("historyList");

export function renderResponse(result, view) {
  statusSpan.textContent = `${result.status} ${result.statusText}`.trim();
  statusSpan.className = result.ok ? "ok" : "err";
  timeSpan.textContent = `${result.duration} ms`;
  sizeSpan.textContent = formatBytes(result.size);

  jsonBtn.disabled = !result.isValidJSON;
  headersBtn.disabled = false;

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
  } else if (view === "headers") {
    const entries = Object.entries(result.headers);
    dataWrapper.textContent =
      entries.length > 0
        ? entries.map(([k, v]) => `${k}: ${v}`).join("\n")
        : "(No response headers exposed)";
  } else {
    dataWrapper.textContent = result.rawText || "(Empty response body)";
  }
}

export function renderError(message) {
  statusSpan.textContent = "Error";
  statusSpan.className = "err";
  timeSpan.textContent = "-";
  sizeSpan.textContent = "-";
  jsonBtn.disabled = true;
  headersBtn.disabled = true;
  dataWrapper.textContent = message;
}

export function setLoading(isLoading, sendBtn) {
  sendBtn.disabled = isLoading;
  sendBtn.textContent = isLoading ? "Sending..." : "Send";
  if (isLoading) {
    dataWrapper.textContent = "Fetching response...";
  }
}

export function renderHistory(items, onSelect) {
  historyList.innerHTML = "";

  if (!items.length) {
    const empty = document.createElement("li");
    empty.className = "historyEmpty";
    empty.textContent = "No recent requests.";
    historyList.appendChild(empty);
    return;
  }

  items.forEach((item) => {
    const li = document.createElement("li");
    li.className = "historyItem";

    const statusClass = item.ok ? "ok" : "err";
    li.innerHTML = `
      <div class="historyMeta">
        <span class="historyMethod">${item.method}</span>
        <span class="historyUrl">${escapeHtml(item.url)}</span>
      </div>
      <span class="historyStatus ${statusClass}">${item.status}</span>
    `;

    li.addEventListener("click", () => onSelect(item));
    historyList.appendChild(li);
  });
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  return `${(bytes / 1024).toFixed(2)} KB`;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}