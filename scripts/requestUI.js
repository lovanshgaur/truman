export function initRequestTabs() {
  const tabBtns = document.querySelectorAll(".reqTabBtn");
  const tabContents = document.querySelectorAll(".reqTabContent");

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.tab;
      tabBtns.forEach((b) => b.classList.toggle("active", b === btn));
      tabContents.forEach((panel) => {
        panel.classList.toggle("active", panel.id === `tab-${target}`);
      });
    });
  });

  document.querySelectorAll(".addRowBtn").forEach((btn) => {
    btn.addEventListener("click", () => {
      addKeyValueRow(btn.dataset.target);
    });
  });

  // Seed one empty row in Params and a default Content-Type header
  addKeyValueRow("paramsList");
  addKeyValueRow("headersList", "Content-Type", "application/json");

  const formatBtn = document.getElementById("formatJsonBtn");
  const bodyInput = document.getElementById("bodyInput");

  formatBtn.addEventListener("click", () => {
    const raw = bodyInput.value.trim();
    if (!raw) return;
    try {
      bodyInput.value = JSON.stringify(JSON.parse(raw), null, 2);
    } catch {
      // Leave text untouched if user is mid-edit on invalid JSON
    }
  });
}

export function addKeyValueRow(listId, key = "", value = "") {
  const list = document.getElementById(listId);
  const row = document.createElement("div");
  row.className = "kvRow";

  row.innerHTML = `
    <input type="text" class="kvKey" placeholder="Key" value="${escapeAttr(key)}">
    <input type="text" class="kvValue" placeholder="Value" value="${escapeAttr(value)}">
    <button type="button" class="removeRowBtn" title="Remove">x</button>
  `;

  row.querySelector(".removeRowBtn").addEventListener("click", () => {
    row.remove();
  });

  list.appendChild(row);
}

export function getKeyValuePairs(listId) {
  const rows = document.querySelectorAll(`#${listId} .kvRow`);
  const entries = [];

  rows.forEach((row) => {
    const key = row.querySelector(".kvKey").value.trim();
    const value = row.querySelector(".kvValue").value.trim();
    if (key) {
      entries.push([key, value]);
    }
  });

  return entries;
}

export function setKeyValuePairs(listId, pairs = []) {
  const list = document.getElementById(listId);
  list.innerHTML = "";
  if (pairs.length === 0) {
    addKeyValueRow(listId);
    return;
  }
  pairs.forEach(([k, v]) => addKeyValueRow(listId, k, v));
}

function escapeAttr(str) {
  return String(str).replace(/"/g, "&quot;");
}