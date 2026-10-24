/* ═══════════════════════════════════════════
   RESULT PORTAL — student.js
   Tribhuvan University Examination Division
   B.Sc. Computer Science & Information Technology
   ═══════════════════════════════════════════ */

const PASS_MARK = 40;

const results = [
  {
    name: "Samyog Sapkota",
    rollNo: "2024-10-001",
    class: "B.Sc. CSIT 6th Sem",
    session: "2023-2024",
    subjects: {
      Software_Engineering: 92,
      Database_Management_Systems: 88,
      Computer_Networks: 91,
      Operating_Systems: 85,
      Artificial_Intelligence: 95,
      Web_Technologies: 94
    }
  },
  {
    name: "Aarav Sharma",
    rollNo: "2024-10-002",
    class: "B.Sc. CSIT 6th Sem",
    session: "2023-2024",
    subjects: {
      Software_Engineering: 85,
      Database_Management_Systems: 82,
      Computer_Networks: 79,
      Operating_Systems: 88,
      Artificial_Intelligence: 90,
      Web_Technologies: 86
    }
  },
  {
    name: "Bibek Karki",
    rollNo: "2024-10-003",
    class: "B.Sc. CSIT 6th Sem",
    session: "2023-2024",
    subjects: {
      Software_Engineering: 76,
      Database_Management_Systems: 74,
      Computer_Networks: 70,
      Operating_Systems: 72,
      Artificial_Intelligence: 80,
      Web_Technologies: 82
    }
  },
  {
    name: "Sneha Adhikari",
    rollNo: "2024-10-004",
    class: "B.Sc. CSIT 6th Sem",
    session: "2023-2024",
    subjects: {
      Software_Engineering: 96,
      Database_Management_Systems: 94,
      Computer_Networks: 92,
      Operating_Systems: 95,
      Artificial_Intelligence: 98,
      Web_Technologies: 97
    }
  },
  {
    name: "Prashant Shrestha",
    rollNo: "2024-10-005",
    class: "B.Sc. CSIT 6th Sem",
    session: "2023-2024",
    subjects: {
      Software_Engineering: 68,
      Database_Management_Systems: 70,
      Computer_Networks: 65,
      Operating_Systems: 33, // below the pass mark — demonstrates a fail
      Artificial_Intelligence: 72,
      Web_Technologies: 75
    }
  }
];

const $ = (id) => document.getElementById(id);
const resultArea = $("resultArea");
const errorBox = $("errorBox");

/* ── grading ── */
function gradeFor(marks) {
  if (marks >= 90) return "A+";
  if (marks >= 80) return "A";
  if (marks >= 70) return "B+";
  if (marks >= 60) return "B";
  if (marks >= 50) return "C";
  if (marks >= 40) return "D";
  return "F";
}

function gradeClass(grade) {
  return "grade-" + grade.toLowerCase().replace("+", "-plus");
}

function prettySubject(key) {
  return key.replace(/_/g, " ");
}

/* ── validation & errors ── */
function showError(message) {
  errorBox.textContent = message;
  errorBox.classList.add("show");
}

function clearError() {
  errorBox.textContent = "";
  errorBox.classList.remove("show");
}

/* ── rendering ── */
function renderResult(student) {
  const entries = Object.entries(student.subjects);
  const outOf = entries.length * 100;
  const total = entries.reduce((sum, [, marks]) => sum + marks, 0);
  const percentage = (total / outOf) * 100;
  const hasFailed = entries.some(([, marks]) => marks < PASS_MARK);
  const overallGrade = hasFailed ? "F" : gradeFor(percentage);
  const status = hasFailed ? "Fail" : "Pass";

  const rows = entries
    .map(([subject, marks]) => {
      const grade = gradeFor(marks);
      const passed = marks >= PASS_MARK;
      return `
        <tr class="${passed ? "" : "row-fail"}">
          <td class="subject-cell">${prettySubject(subject)}</td>
          <td>100</td>
          <td class="marks-cell">${marks}</td>
          <td>${marks}%</td>
          <td><span class="badge ${passed ? "pass-badge" : "fail-badge"}">${grade}</span></td>
        </tr>`;
    })
    .join("");

  resultArea.innerHTML = `
    <div class="result-card">
      <div class="result-top">
        <div class="tu-badge">
          <span class="tu-dot"></span>
          Tribhuvan University · Examination Division
        </div>
        <h2 class="result-name">${student.name}</h2>
        <div class="meta-pills">
          <span>Roll No <strong>${student.rollNo}</strong></span>
          <span>Program <strong>${student.class}</strong></span>
          <span>Session <strong>${student.session}</strong></span>
        </div>
      </div>

      <div class="result-progress">
        <div class="progress-head">
          <span>Overall percentage</span>
          <strong>${percentage.toFixed(1)}%</strong>
        </div>
        <div class="progress-track">
          <div class="progress-fill ${hasFailed ? "is-fail" : ""}" style="width:${Math.min(100, percentage)}%"></div>
        </div>
      </div>

      <div class="table-wrap">
        <table class="result-table">
          <thead>
            <tr>
              <th>Subject</th>
              <th>Max</th>
              <th>Marks</th>
              <th>%</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>

      <div class="result-summary">
        <div class="summary-box">
          <span class="summary-label">Total score</span>
          <span class="summary-value">${total} / ${outOf}</span>
        </div>
        <div class="summary-box">
          <span class="summary-label">Percentage</span>
          <span class="summary-value">${percentage.toFixed(1)}%</span>
        </div>
        <div class="summary-box">
          <span class="summary-label">Overall grade</span>
          <span class="summary-value ${gradeClass(overallGrade)}">${overallGrade}</span>
        </div>
        <div class="summary-box">
          <span class="summary-label">Result</span>
          <span class="summary-value ${status === "Pass" ? "pass" : "fail"}">${status}</span>
        </div>
      </div>

      <p class="result-note">
        ${hasFailed
          ? "One or more subjects are below the pass mark of 40."
          : "Pass mark is 40 per subject. Grades: A+ 90, A 80, B+ 70, B 60, C 50, D 40."}
      </p>

      <div class="result-actions">
        <button class="action-btn primary" type="button" id="printBtn">Print / Save PDF</button>
        <button class="action-btn" type="button" id="resetBtn">New search</button>
      </div>
    </div>
  `;

  $("printBtn").addEventListener("click", () => window.print());
  $("resetBtn").addEventListener("click", resetSearch);

  resultArea.classList.add("has-result");
}

/* ── lookup ── */
function fetchResult() {
  clearError();

  const name = $("studentName").value.trim();
  const roll = $("rollNo").value.trim();

  if (!name && !roll) {
    showError("Enter your full name or your roll number to continue.");
    return;
  }

  const byRoll = roll
    ? results.find((s) => s.rollNo.toLowerCase() === roll.toLowerCase())
    : null;
  const byName = name
    ? results.find((s) => s.name.toLowerCase() === name.toLowerCase())
    : null;
  const student = byRoll || byName;

  if (!student) {
    resultArea.innerHTML = ""; // never leave a stale result under an error
    resultArea.classList.remove("has-result");
    showError(
      `No result found for ${roll ? `roll number “${roll}”` : `“${name}”`}. ` +
        "Check the spelling, or try the demo roll number 2024-10-001."
    );
    return;
  }

  renderResult(student);
  resultArea.scrollIntoView({ behavior: "smooth", block: "start" });
}

function resetSearch() {
  $("studentName").value = "";
  $("rollNo").value = "";
  resultArea.innerHTML = "";
  resultArea.classList.remove("has-result");
  clearError();
  $("studentName").focus();
}

/* ── events ── */
$("fetchBtn").addEventListener("click", fetchResult);

["studentName", "rollNo"].forEach((id) => {
  const input = $(id);
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      fetchResult();
    }
  });
  input.addEventListener("input", clearError);
});

/* Preload the demo student so the page is never blank, but keep the fields editable. */
window.addEventListener("DOMContentLoaded", () => {
  if (!$("studentName").value) $("studentName").value = "Samyog Sapkota";
  if (!$("rollNo").value) $("rollNo").value = "2024-10-001";
  fetchResult();
});
