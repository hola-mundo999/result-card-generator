# Result Card Generator

A Tribhuvan University–style examination result portal: enter a name or roll number and get a
proper marksheet — subject-wise marks, grades, totals, percentage and pass/fail status. Built to
practise JavaScript and to imagine what a real university result site could look like.

## Features

- Look up a result by **roll number or full name** (case-insensitive, either field alone works)
- Subject table with max marks, marks obtained, percentage and grade, with failing subjects
  highlighted in red
- Summary: total score, percentage, overall grade and pass/fail status
- Animated percentage bar that switches to red when a subject is failed
- **Print / Save PDF** button with a dedicated print stylesheet (prints only the marksheet)
- **New search** button resets the form and the result
- Inline validation instead of `alert()`: empty form, unknown student, typo guidance
- Consistent grading: `A+ ≥ 90`, `A ≥ 80`, `B+ ≥ 70`, `B ≥ 60`, `C ≥ 50`, `D ≥ 40`, `F < 40`;
  the 40 pass mark is used for both subject badges and overall status
- Preloaded demo student so the page is never blank, fully responsive, keyboard friendly

## Demo rolls

| Roll No | Student | Result |
| --- | --- | --- |
| 2024-10-001 | Samyog Sapkota | A+ |
| 2024-10-002 | Aarav Sharma | A |
| 2024-10-003 | Bibek Karki | B+ |
| 2024-10-004 | Sneha Adhikari | A+ |
| 2024-10-005 | Prashant Shrestha | Fail (Operating Systems 33) |

## Built With

HTML · CSS · JavaScript (no libraries, no build step)

## Structure

```text
result-card-generator/
├── index.html
├── style.css
├── student.js
└── README.md
```

## How to Run

Open `index.html` in any browser.

## Concepts Practised

- Array `find` / `reduce` / `Object.entries` over a small dataset
- Template-literal rendering with data-derived classes
- Derived state: totals, percentage, grade and status computed from raw marks
- Print stylesheets (`@media print`) and `window.print()`
- Form validation with inline errors and keyboard handling
