// ═══════════════════════════════════════════
//  RESULT PORTAL — script.js
//  Class 10 — Annual Examination 2024
//  Tribhuvan University Examination Division
// ═══════════════════════════════════════════

let results = [

  {
    name:     "Samyog Sapkota",
    rollNo:   "2024-10-001",
    class:    "10th Grade",
    session:  "2023-2024",
    subjects: {
      Urdu:        78,
      English:     82,
      Mathematics: 91,
      Physics:     88,
      Chemistry:   85,
      Islamiat:    90,
      Pakistan_Studies: 87
    }
  },

  {
    name:     "Sara Ahmed",
    rollNo:   "2024-10-002",
    class:    "10th Grade",
    session:  "2023-2024",
    subjects: {
      Urdu:        92,
      English:     95,
      Mathematics: 88,
      Physics:     90,
      Chemistry:   93,
      Islamiat:    97,
      Pakistan_Studies: 91
    }
  },

  {
    name:     "Waqas Ahmad",
    rollNo:   "2024-10-003",
    class:    "10th Grade",
    session:  "2023-2024",
    subjects: {
      Urdu:        55,
      English:     48,
      Mathematics: 60,
      Physics:     52,
      Chemistry:   45,
      Islamiat:    70,
      Pakistan_Studies: 58
    }
  },

  {
    name:     "Samyog Sapkota",
    rollNo:   "2024-10-004",
    class:    "10th Grade",
    session:  "2023-2024",
    subjects: {
      Urdu:        85,
      English:     79,
      Mathematics: 72,
      Physics:     68,
      Chemistry:   74,
      Islamiat:    88,
      Pakistan_Studies: 82
    }
  },

  {
    name:     "Usman Tariq",
    rollNo:   "2024-10-005",
    class:    "10th Grade",
    session:  "2023-2024",
    subjects: {
      Urdu:        40,
      English:     35,
      Mathematics: 42,
      Physics:     38,
      Chemistry:   30,
      Islamiat:    55,
      Pakistan_Studies: 44
    }
  },

  {
    name:     "Ayesha Malik",
    rollNo:   "2024-10-006",
    class:    "10th Grade",
    session:  "2023-2024",
    subjects: {
      Urdu:        96,
      English:     98,
      Mathematics: 94,
      Physics:     97,
      Chemistry:   95,
      Islamiat:    99,
      Pakistan_Studies: 96
    }
  },

  {
    name:     "Bilal Khan",
    rollNo:   "2024-10-007",
    class:    "10th Grade",
    session:  "2023-2024",
    subjects: {
      Urdu:        63,
      English:     57,
      Mathematics: 70,
      Physics:     65,
      Chemistry:   60,
      Islamiat:    75,
      Pakistan_Studies: 68
    }
  },

  {
    name:     "Hina Nawaz",
    rollNo:   "2024-10-008",
    class:    "10th Grade",
    session:  "2023-2024",
    subjects: {
      Urdu:        88,
      English:     84,
      Mathematics: 79,
      Physics:     83,
      Chemistry:   80,
      Islamiat:    92,
      Pakistan_Studies: 86
    }
  },

  {
    name:     "Omar Farooq",
    rollNo:   "2024-10-009",
    class:    "10th Grade",
    session:  "2023-2024",
    subjects: {
      Urdu:        47,
      English:     52,
      Mathematics: 44,
      Physics:     49,
      Chemistry:   41,
      Islamiat:    60,
      Pakistan_Studies: 50
    }
  },

  {
    name:     "Zara Siddiqui",
    rollNo:   "2024-10-010",
    class:    "10th Grade",
    session:  "2023-2024",
    subjects: {
      Urdu:        74,
      English:     80,
      Mathematics: 65,
      Physics:     70,
      Chemistry:   68,
      Islamiat:    85,
      Pakistan_Studies: 77
    }
  },

  {
    name:     "Hamza Iqbal",
    rollNo:   "2024-10-011",
    class:    "10th Grade",
    session:  "2023-2024",
    subjects: {
      Urdu:        82,
      English:     76,
      Mathematics: 88,
      Physics:     91,
      Chemistry:   86,
      Islamiat:    80,
      Pakistan_Studies: 79
    }
  },

  {
    name:     "Sana Rehman",
    rollNo:   "2024-10-012",
    class:    "10th Grade",
    session:  "2023-2024",
    subjects: {
      Urdu:        59,
      English:     63,
      Mathematics: 55,
      Physics:     58,
      Chemistry:   52,
      Islamiat:    70,
      Pakistan_Studies: 61
    }
  },

  {
    name:     "Kamran Akhtar",
    rollNo:   "2024-10-013",
    class:    "10th Grade",
    session:  "2023-2024",
    subjects: {
      Urdu:        33,
      English:     28,
      Mathematics: 40,
      Physics:     35,
      Chemistry:   30,
      Islamiat:    48,
      Pakistan_Studies: 37
    }
  },

  {
    name:     "Nadia Hussain",
    rollNo:   "2024-10-014",
    class:    "10th Grade",
    session:  "2023-2024",
    subjects: {
      Urdu:        90,
      English:     87,
      Mathematics: 83,
      Physics:     86,
      Chemistry:   89,
      Islamiat:    94,
      Pakistan_Studies: 88
    }
  },

  {
    name:     "Tariq Mehmood",
    rollNo:   "2024-10-015",
    class:    "10th Grade",
    session:  "2023-2024",
    subjects: {
      Urdu:        70,
      English:     66,
      Mathematics: 74,
      Physics:     72,
      Chemistry:   69,
      Islamiat:    78,
      Pakistan_Studies: 73
    }
  }

];



// fetch the button
document.getElementById("fetchBtn").addEventListener("click", fetchResult);

function fetchResult() {
    // fetch the name and roll no
    let enteredName = document.getElementById("studentName").value;
    let enteredRollNo = document.getElementById("rollNo").value;

// find the student from the results array
let student = results.find(s=> 
    s.name.toLowerCase() === enteredName.toLowerCase() &&
    s.rollNo === enteredRollNo

);

// if student is not found, shows an alert
if(!student){
    alert("student not found! Please check your name and roll number");
    return;
}

    
// calculate total marks
let total = Object.values(student.subjects).reduce((acc, marks)=>acc + marks, 0);


//maximum possible marks
let outOf = Object.keys(student.subjects).length*100;

//calculate percentage
let percentage = (total / outOf) * 100;
percentage = percentage.toFixed(1);

// determine grade
let grade;
if(percentage >= 90) grade = "A+";
else if(percentage >= 80) grade= "A";
else if(percentage >= 70) grade = "B";
else if(percentage >= 60) grade = "C";
else if(percentage >= 50) grade = "D";
else grade = "F";

// pass or fail
let hasFailed = Object.values(student.subjects).some(marks => marks<33);
let status = hasFailed ? "Fail" : "Pass";



// build the result card
let subjectRows = "";
for(let subject in student.subjects){
    let mark = student.subjects[subject];
    let subGrade;
    if      (mark >= 90) subGrade = "A+";
  else if (mark >= 80) subGrade = "A";
  else if (mark >= 70) subGrade = "B";
  else if (mark >= 60) subGrade = "C";
  else if (mark >= 50) subGrade = "D";
  else                 subGrade = "F";
  subjectRows += `
  <tr>
  <td>${subject}</td>
  <td>100</td>
  <td>${mark}% </td>
  <td>${subGrade}</td>
 </tr>`;


}



// get the result area div
let resultArea = document.getElementById("resultArea");

// inject the full result card
resultArea.innerHTML = `

  <div class="result-card">

    <!-- student info -->
    <div class="result-header">
      <h2>${student.name}</h2>
      <p>Roll No: ${student.rollNo}</p>
      <p>Class: ${student.class}</p>
      <p>Session: ${student.session}</p>
    </div>

    <!-- subjects table -->
    <table class="result-table">
      <thead>
        <tr>
          <th>Subject</th>
          <th>Total Marks</th>
          <th>Marks Obtained</th>
          <th>Percentage</th>
          <th>Grade</th>
        </tr>
      </thead>
      <tbody>
        ${subjectRows}
      </tbody>
    </table>

    <!-- summary -->
    <div class="result-summary">
      <div class="summary-box">
        <span class="summary-label">Total Marks</span>
        <span class="summary-value">${total} / ${outOf}</span>
      </div>
      <div class="summary-box">
        <span class="summary-label">Percentage</span>
        <span class="summary-value">${percentage}%</span>
      </div>
      <div class="summary-box">
        <span class="summary-label">Grade</span>
        <span class="summary-value">${grade}</span>
      </div>
      <div class="summary-box">
        <span class="summary-label">Status</span>
        <span class="summary-value ${status === 'PASS' ? 'pass' : 'fail'}">${status}</span>
      </div>
    </div>

  </div>

`;

// scroll down to result smoothly
resultArea.scrollIntoView({ behavior: "smooth" });


}

