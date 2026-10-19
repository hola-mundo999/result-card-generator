// ═══════════════════════════════════════════
//  RESULT PORTAL — student.js
//  Tribhuvan University Examination Division
//  B.Sc. Computer Science & Information Technology
// ═══════════════════════════════════════════

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
      Operating_Systems: 62,
      Artificial_Intelligence: 72,
      Web_Technologies: 75
    }
  }
];

// Fetch button listener
document.getElementById("fetchBtn").addEventListener("click", fetchResult);

function fetchResult() {
  const enteredName = (document.getElementById("studentName").value || "").trim();
  const enteredRollNo = (document.getElementById("rollNo").value || "").trim();

  // Find student by roll number or name
  const student = results.find(s => 
    s.rollNo.toLowerCase() === enteredRollNo.toLowerCase() ||
    (enteredName && s.name.toLowerCase() === enteredName.toLowerCase())
  );

  const errorBox = document.getElementById("errorBox");
  if (!student) {
    if (errorBox) {
      errorBox.textContent = "Student not found! Try Roll No: 2024-10-001 (Samyog Sapkota)";
      errorBox.style.display = "block";
    } else {
      alert("Student not found! Please check your name and roll number. Example: Samyog Sapkota / 2024-10-001");
    }
    return;
  }

  if (errorBox) {
    errorBox.style.display = "none";
  }

  // Calculate total marks
  const total = Object.values(student.subjects).reduce((acc, marks) => acc + marks, 0);
  const outOf = Object.keys(student.subjects).length * 100;
  const percentage = ((total / outOf) * 100).toFixed(1);

  let grade;
  if (percentage >= 90) grade = "A+";
  else if (percentage >= 80) grade = "A";
  else if (percentage >= 70) grade = "B+";
  else if (percentage >= 60) grade = "B";
  else if (percentage >= 50) grade = "C";
  else grade = "F";

  const hasFailed = Object.values(student.subjects).some(marks => marks < 40);
  const status = hasFailed ? "Fail" : "Pass";

  let subjectRows = "";
  for (const subject in student.subjects) {
    const mark = student.subjects[subject];
    let subGrade;
    if (mark >= 90) subGrade = "A+";
    else if (mark >= 80) subGrade = "A";
    else if (mark >= 70) subGrade = "B+";
    else if (mark >= 60) subGrade = "B";
    else if (mark >= 50) subGrade = "C";
    else subGrade = "F";

    const cleanSubject = subject.replace(/_/g, " ");

    subjectRows += `
      <tr>
        <td><strong>${cleanSubject}</strong></td>
        <td>100</td>
        <td>${mark}</td>
        <td>${mark}%</td>
        <td><span class="badge ${mark >= 50 ? 'pass-badge' : 'fail-badge'}">${subGrade}</span></td>
      </tr>
    `;
  }

  const resultArea = document.getElementById("resultArea");
  resultArea.innerHTML = `
    <div class="result-card">
      <div class="result-header">
        <div class="tu-badge">Tribhuvan University · Examination Division</div>
        <h2>${student.name}</h2>
        <div class="meta-pills">
          <span>Roll No: <strong>${student.rollNo}</strong></span>
          <span>Program: <strong>${student.class}</strong></span>
          <span>Academic Session: <strong>${student.session}</strong></span>
        </div>
      </div>

      <table class="result-table">
        <thead>
          <tr>
            <th>Subject</th>
            <th>Max Marks</th>
            <th>Marks Obtained</th>
            <th>Percentage</th>
            <th>Grade</th>
          </tr>
        </thead>
        <tbody>
          ${subjectRows}
        </tbody>
      </table>

      <div class="result-summary">
        <div class="summary-box">
          <span class="summary-label">Total Score</span>
          <span class="summary-value">${total} / ${outOf}</span>
        </div>
        <div class="summary-box">
          <span class="summary-label">Percentage</span>
          <span class="summary-value">${percentage}%</span>
        </div>
        <div class="summary-box">
          <span class="summary-label">Overall Grade</span>
          <span class="summary-value grade-${grade.toLowerCase().replace('+', '-plus')}">${grade}</span>
        </div>
        <div class="summary-box">
          <span class="summary-label">Result Status</span>
          <span class="summary-value ${status.toLowerCase() === 'pass' ? 'pass' : 'fail'}">${status}</span>
        </div>
      </div>
    </div>
  `;

  resultArea.scrollIntoView({ behavior: "smooth" });
}

// Enter key support
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    fetchResult();
  }
});

// Prepopulate Samyog Sapkota by default and run fetch on mount
window.addEventListener("DOMContentLoaded", () => {
  const nameInput = document.getElementById("studentName");
  const rollInput = document.getElementById("rollNo");
  if (nameInput && !nameInput.value) nameInput.value = "Samyog Sapkota";
  if (rollInput && !rollInput.value) rollInput.value = "2024-10-001";
  fetchResult();
});
