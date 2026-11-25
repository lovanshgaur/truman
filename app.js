import { sendRequest } from "./scripts/api.js";
import { renderResponse, renderError, setLoading } from "./scripts/render.js";
import { initRequestTabs, getKeyValuePairs } from "./scripts/requestUI.js";

const DEFAULT_API = "https://jsonplaceholder.typicode.com/posts/1";

const form = document.getElementById("apiForm");
const input = document.getElementById("input");
const methodSelect = document.getElementById("methodSelect");
const bodyInput = document.getElementById("bodyInput");
const sendBtn = document.getElementById("sendBtn");
const responseBtns = document.querySelectorAll(".responseBtn");

const state = {
  lastResult: null,
  activeView: "raw",
};

initRequestTabs();

methodSelect.addEventListener("change", () => {
  const method = methodSelect.value;
  if (method === "POST" || method === "PUT") {
    document.querySelector('.reqTabBtn[data-tab="body"]').click();
  }
});

responseBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const view = btn.dataset.name;
    if (view === "json" && !state.lastResult?.isValidJSON) return;

    state.activeView = view;
    if (state.lastResult) {
      renderResponse(state.lastResult, state.activeView);
    }
  });
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const url = input.value.trim() || DEFAULT_API;
  const method = methodSelect.value;
  const params = getKeyValuePairs("paramsList");
  const headers = getKeyValuePairs("headersList");
  const body = bodyInput.value;

  input.value = url;
  setLoading(true, sendBtn);

  try {
    const result = await sendRequest({ url, method, params, headers, body });
    state.lastResult = result;
    state.activeView = result.isValidJSON ? "json" : "raw";
    renderResponse(result, state.activeView);
  } catch (err) {
    state.lastResult = null;
    const msg =
      err instanceof TypeError && err.message.includes("URL")
        ? "Invalid URL. Include http:// or https://"
        : err.message;
    renderError(msg);
  } finally {
    setLoading(false, sendBtn);
  }
});