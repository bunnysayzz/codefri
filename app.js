/* ===================================================================
   CodeFri – Coding Assessment Platform  |  Application Logic
   =================================================================== */

// ─── Questions Data ──────────────────────────────────────────────────
const questions = [
  {
    id: 1,
    title: "Unique Subset Sum Count",
    status: "Strong",
    description: `You are given a list of candidate numbers, which may include duplicates, and a target sum. Your task is to find the <strong>total count</strong> of unique combinations of these numbers that sum exactly to the target. Each number from the list may be used <strong>only once</strong> in any combination. The solution must not count duplicate combinations. For example, if the input list is [1, 1, 2] and the target is 3, the combination [1, 2] should only be counted once.`,
    examples: [
      {
        input: "7 8\n[10, 1, 2, 7, 6, 1, 5]",
        output: "4",
        explanation: "The 4 unique combinations are [1, 1, 6], [1, 2, 5], [1, 7], and [2, 6]."
      },
      {
        input: "5 5\n[2, 5, 2, 1, 2]",
        output: "2",
        explanation: "The 2 unique combinations are [1, 2, 2] and [5]."
      }
    ],
    testCases: [
      { input: "15\n5", expectedOutput: "1" },
      { input: "7 8\n10 1 2 7 6 1 5", expectedOutput: "4" },
      { input: "5 5\n2 5 2 1 2", expectedOutput: "2" }
    ],
    starterCode: {
      java: `public static int countUniqueCombinations(int[] candidates, int target) {\n    // your code here\n}`,
      cpp: `int countUniqueCombinations(vector<int>& candidates, int target) {\n    // your code here\n    return 0;\n}`,
      c: `int countUniqueCombinations(int* candidates, int n, int target) {\n    // your code here\n    return 0;\n}`,
      javascript: `function countUniqueCombinations(candidates, target) {\n    // your code here\n    return 0;\n}`
    }
  },
  {
    id: 2,
    title: "Matrix Spiral Traversal",
    status: "Medium",
    description: `Given a 2D matrix of integers with <strong>m</strong> rows and <strong>n</strong> columns, return all elements of the matrix in spiral order. The spiral starts from the top-left corner, moves right along the top row, then down the last column, then left along the bottom row, and then up the first column, continuing inward until all elements are visited.`,
    examples: [
      {
        input: "3 3\n[[1, 2, 3], [4, 5, 6], [7, 8, 9]]",
        output: "[1, 2, 3, 6, 9, 8, 7, 4, 5]",
        explanation: "Starting from top-left, we traverse right → down → left → up → inward."
      },
      {
        input: "3 4\n[[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]]",
        output: "[1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7]",
        explanation: "The spiral traversal visits all 12 elements in order."
      }
    ],
    testCases: [
      { input: "3 3\n1 2 3\n4 5 6\n7 8 9", expectedOutput: "1 2 3 6 9 8 7 4 5" },
      { input: "3 4\n1 2 3 4\n5 6 7 8\n9 10 11 12", expectedOutput: "1 2 3 4 8 12 11 10 9 5 6 7" },
      { input: "1 4\n1 2 3 4", expectedOutput: "1 2 3 4" }
    ],
    starterCode: {
      java: `public static List<Integer> spiralOrder(int[][] matrix) {\n    // your code here\n    return new ArrayList<>();\n}`,
      cpp: `vector<int> spiralOrder(vector<vector<int>>& matrix) {\n    // your code here\n    return {};\n}`,
      c: `int* spiralOrder(int** matrix, int m, int n, int* returnSize) {\n    // your code here\n    return NULL;\n}`,
      javascript: `function spiralOrder(matrix) {\n    // your code here\n    return [];\n}`
    }
  }
];

// ─── State ───────────────────────────────────────────────────────────
let currentQuestion = 0;
let currentLang = "java";
let currentCase = 0;
let timerSeconds = 59 * 60 + 24; // 00:59:24
let timerInterval = null;

// Code storage per question + language
const codeStore = {};
questions.forEach((q, qi) => {
  codeStore[qi] = {};
  Object.keys(q.starterCode).forEach(lang => {
    codeStore[qi][lang] = q.starterCode[lang];
  });
});

// ─── DOM Refs ────────────────────────────────────────────────────────
const $timer         = document.getElementById("timer");
const $qCurrent      = document.getElementById("q-current");
const $qTotal        = document.getElementById("q-total");
const $qStatus       = document.getElementById("q-status");
const $qBody         = document.getElementById("question-body");
const $prevQ         = document.getElementById("prev-q");
const $nextQ         = document.getElementById("next-q");
const $langSelect    = document.getElementById("lang-select");
const $codeEditor    = document.getElementById("code-editor");
const $lineNumbers   = document.getElementById("line-numbers");
const $runBtn        = document.getElementById("run-btn");
const $submitBtn     = document.getElementById("submit-btn");
const $testBtn       = document.getElementById("test-btn");
const $tcInput       = document.getElementById("tc-input");
const $tcOutput      = document.getElementById("tc-output");
const $tabBtns       = document.querySelectorAll(".tab-btn");
const $endBtn        = document.getElementById("end-btn");
const $closeTC       = document.getElementById("close-testcase");

// Modals
const $resultModal   = document.getElementById("result-modal");
const $modalTitle    = document.getElementById("modal-title");
const $modalBody     = document.getElementById("modal-body");
const $modalClose    = document.getElementById("modal-close");
const $submitModal   = document.getElementById("submit-modal");
const $submitCancel  = document.getElementById("submit-cancel");
const $submitConfirm = document.getElementById("submit-confirm");
const $endModal      = document.getElementById("end-modal");
const $endCancel     = document.getElementById("end-cancel");
const $endConfirm    = document.getElementById("end-confirm");

// Panels
const $questionPanel = document.getElementById("question-panel");
const $resizer       = document.getElementById("panel-resizer");

// ─── Timer ───────────────────────────────────────────────────────────
function formatTime(s) {
  const h = String(Math.floor(s / 3600)).padStart(2, "0");
  const m = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
  const sec = String(s % 60).padStart(2, "0");
  return `${h}:${m}:${sec}`;
}

function startTimer() {
  $timer.textContent = formatTime(timerSeconds);
  timerInterval = setInterval(() => {
    if (timerSeconds <= 0) {
      clearInterval(timerInterval);
      $timer.textContent = "00:00:00";
      showEndModal();
      return;
    }
    timerSeconds--;
    $timer.textContent = formatTime(timerSeconds);

    // Warning at 5 min
    if (timerSeconds <= 300) {
      $timer.style.color = "#d32f2f";
    }
  }, 1000);
}

// ─── Render Question ─────────────────────────────────────────────────
function renderQuestion() {
  const q = questions[currentQuestion];
  $qCurrent.textContent = currentQuestion + 1;
  $qTotal.textContent = questions.length;
  $qStatus.textContent = q.status;

  let html = `<h2>${q.title}</h2><p>${q.description}</p>`;
  q.examples.forEach((ex, i) => {
    html += `
      <div class="example-block">
        <div class="example-title">Example ${i + 1}</div>
        <div class="example-label">Input:</div>
        <div class="example-content">${escapeHtml(ex.input)}</div>
        <div class="example-label">Output:</div>
        <div class="example-content">${escapeHtml(ex.output)}</div>
        <div class="example-label">Explaination:</div>
        <div class="example-content">${escapeHtml(ex.explanation)}</div>
      </div>`;
  });
  $qBody.innerHTML = html;
}

function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// ─── Code Editor ─────────────────────────────────────────────────────
function loadCode() {
  $codeEditor.value = codeStore[currentQuestion][currentLang];
  updateLineNumbers();
}

function saveCode() {
  codeStore[currentQuestion][currentLang] = $codeEditor.value;
}

function updateLineNumbers() {
  const lines = $codeEditor.value.split("\n").length;
  let html = "";
  for (let i = 1; i <= Math.max(lines, 20); i++) {
    html += `<span class="ln">${i}</span>`;
  }
  $lineNumbers.innerHTML = html;
}

// Sync scroll
$codeEditor.addEventListener("scroll", () => {
  $lineNumbers.scrollTop = $codeEditor.scrollTop;
});

$codeEditor.addEventListener("input", () => {
  saveCode();
  updateLineNumbers();
});

// Tab key support
$codeEditor.addEventListener("keydown", (e) => {
  if (e.key === "Tab") {
    e.preventDefault();
    const start = $codeEditor.selectionStart;
    const end = $codeEditor.selectionEnd;
    $codeEditor.value = $codeEditor.value.substring(0, start) + "    " + $codeEditor.value.substring(end);
    $codeEditor.selectionStart = $codeEditor.selectionEnd = start + 4;
    saveCode();
    updateLineNumbers();
  }
});

// ─── Test Cases ──────────────────────────────────────────────────────
function loadTestCase() {
  const tc = questions[currentQuestion].testCases[currentCase];
  $tcInput.value = tc ? tc.input : "";
  $tcOutput.value = tc ? tc.expectedOutput : "";
}

$tabBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    $tabBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentCase = parseInt(btn.dataset.case);
    loadTestCase();
  });
});

// ─── Language Switch ─────────────────────────────────────────────────
$langSelect.addEventListener("change", () => {
  saveCode();
  currentLang = $langSelect.value;
  loadCode();
});

// ─── Question Navigation ────────────────────────────────────────────
$prevQ.addEventListener("click", () => {
  if (currentQuestion > 0) {
    saveCode();
    currentQuestion--;
    renderQuestion();
    loadCode();
    currentCase = 0;
    $tabBtns.forEach(b => b.classList.remove("active"));
    $tabBtns[0].classList.add("active");
    loadTestCase();
  }
});

$nextQ.addEventListener("click", () => {
  if (currentQuestion < questions.length - 1) {
    saveCode();
    currentQuestion++;
    renderQuestion();
    loadCode();
    currentCase = 0;
    $tabBtns.forEach(b => b.classList.remove("active"));
    $tabBtns[0].classList.add("active");
    loadTestCase();
  }
});

// ─── Run / Test ──────────────────────────────────────────────────────
$runBtn.addEventListener("click", () => {
  showResultModal("Run Results", simulateRun());
});

$testBtn.addEventListener("click", () => {
  showResultModal("Test Case Result", simulateTestCase());
});

function simulateRun() {
  const q = questions[currentQuestion];
  return q.testCases.map((tc, i) => ({
    label: `Case ${i + 1}`,
    passed: Math.random() > 0.4 // simulated
  }));
}

function simulateTestCase() {
  return [{
    label: `Case ${currentCase + 1}`,
    passed: Math.random() > 0.3
  }];
}

function showResultModal(title, results) {
  $modalTitle.textContent = title;
  let html = "";
  results.forEach(r => {
    const cls = r.passed ? "result-pass" : "result-fail";
    const icon = r.passed ? "✓" : "✗";
    html += `<div class="result-row"><span class="${cls}">${icon}</span><span>${r.label}</span><span class="${cls}">${r.passed ? "Passed" : "Failed"}</span></div>`;
  });
  $modalBody.innerHTML = html;
  $resultModal.classList.remove("hidden");
}

$modalClose.addEventListener("click", () => {
  $resultModal.classList.add("hidden");
});

// ─── Submit ──────────────────────────────────────────────────────────
$submitBtn.addEventListener("click", () => {
  $submitModal.classList.remove("hidden");
});

$submitCancel.addEventListener("click", () => {
  $submitModal.classList.add("hidden");
});

$submitConfirm.addEventListener("click", () => {
  $submitModal.classList.add("hidden");
  showResultModal("Submission Result", simulateRun());
});

// ─── End Assessment ──────────────────────────────────────────────────
$endBtn.addEventListener("click", showEndModal);

function showEndModal() {
  $endModal.classList.remove("hidden");
}

$endCancel.addEventListener("click", () => {
  $endModal.classList.add("hidden");
});

$endConfirm.addEventListener("click", () => {
  clearInterval(timerInterval);
  $endModal.classList.add("hidden");
  document.body.innerHTML = `
    <div style="display:flex;align-items:center;justify-content:center;height:100vh;flex-direction:column;font-family:Inter,sans-serif;background:#f3f3f3">
      <div style="background:#fff;padding:48px 56px;border-radius:12px;text-align:center;box-shadow:0 4px 20px rgba(0,0,0,0.08)">
        <div style="font-size:48px;margin-bottom:16px">✓</div>
        <h2 style="font-size:24px;font-weight:700;margin-bottom:8px">Assessment Completed</h2>
        <p style="color:#666;font-size:15px">Your responses have been submitted successfully.</p>
      </div>
    </div>`;
});

// ─── Close Test Case ─────────────────────────────────────────────────
$closeTC.addEventListener("click", () => {
  const tc = document.querySelector(".testcase-section");
  tc.style.display = tc.style.display === "none" ? "flex" : "none";
});

// ─── Panel Resizer ───────────────────────────────────────────────────
let isResizing = false;

$resizer.addEventListener("mousedown", (e) => {
  isResizing = true;
  $resizer.classList.add("active");
  document.body.style.cursor = "col-resize";
  document.body.style.userSelect = "none";
  e.preventDefault();
});

document.addEventListener("mousemove", (e) => {
  if (!isResizing) return;
  const containerWidth = document.getElementById("main-content").offsetWidth;
  const newWidth = (e.clientX / containerWidth) * 100;
  if (newWidth >= 0 && newWidth < 70) {
    // Snap to fully hidden if below 5%
    if (newWidth < 5) {
      $questionPanel.style.width = "0%";
      $questionPanel.style.overflow = "hidden";
      $questionPanel.style.minWidth = "0";
      $questionPanel.style.borderRight = "none";
    } else {
      $questionPanel.style.width = newWidth + "%";
      $questionPanel.style.overflow = "";
      $questionPanel.style.minWidth = "";
      $questionPanel.style.borderRight = "";
    }
  }
});

document.addEventListener("mouseup", () => {
  if (isResizing) {
    isResizing = false;
    $resizer.classList.remove("active");
    document.body.style.cursor = "";
    document.body.style.userSelect = "";
  }
});

// ─── Modal backdrop clicks ───────────────────────────────────────────
document.querySelectorAll(".modal-backdrop").forEach(bd => {
  bd.addEventListener("click", () => {
    bd.parentElement.classList.add("hidden");
  });
});

// ─── Profile button → Fullscreen Toggle ─────────────────────────────
document.getElementById("profile-btn").addEventListener("click", () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(() => {});
  } else {
    document.exitFullscreen().catch(() => {});
  }
});

// ─── Theme Toggle ────────────────────────────────────────────────────
document.getElementById("theme-toggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// ─── Init ────────────────────────────────────────────────────────────
function init() {
  renderQuestion();
  loadCode();
  loadTestCase();
  startTimer();
}

init();
