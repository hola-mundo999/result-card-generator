(function (root) {
  "use strict";

  const statuses = {
    LIVE_API: "Live API",
    PUBLIC_DOCUMENT: "Official public document",
    OFFICIAL_PORTAL_REDIRECT: "Available only on the official portal",
    UNAVAILABLE: "Unavailable",
    NOT_VERIFIED: "Unable to verify"
  };

  const sources = {
    seeResults: {
      id: "see-results",
      name: "Nepal Telecom SEE result portal",
      authority: "Office of the Controller of Examinations, Grade 10 / National Examination Board",
      url: "https://see.ntc.net.np/results/grade",
      status: "OFFICIAL_PORTAL_REDIRECT",
      checked: "2026-10-31",
      note: "The result portal is an official destination supplied for this directory. Automated access and its current input fields could not be verified."
    },
    seeOffice: {
      id: "see-office",
      name: "Office of the Controller of Examinations, Grade 10",
      authority: "National Examination Board",
      url: "https://see.gov.np/",
      status: "OFFICIAL_PORTAL_REDIRECT",
      checked: "2026-10-31",
      note: "The official office homepage was reachable. A documented public result API or downloadable result dataset was not found."
    },
    nebResults: {
      id: "neb-results",
      name: "Nepal Telecom NEB result portal",
      authority: "National Examination Board",
      url: "https://neb.ntc.net.np/index.php",
      status: "OFFICIAL_PORTAL_REDIRECT",
      checked: "2026-10-31",
      note: "On 2026-10-31, the portal displayed Class XII Supplementary Results 2083 and requested a symbol number and date of birth. Portal content and result availability can change; other Grade 12 result types and automated result access were not verified. The page states that copying, embedding, modifying, or adapting its content requires prior written consent."
    },
    neb: {
      id: "neb",
      name: "National Examination Board",
      authority: "National Examination Board",
      url: "https://neb.gov.np/",
      status: "OFFICIAL_PORTAL_REDIRECT",
      checked: "2026-10-31",
      note: "Official NEB site. Use it for board announcements and authoritative information."
    },
    iostCsit: {
      id: "iost-csit",
      name: "IoST B.Sc. CSIT notices",
      authority: "Institute of Science and Technology, Tribhuvan University",
      url: "https://iost.tu.edu.np/notices?title=csit",
      status: "OFFICIAL_PORTAL_REDIRECT",
      checked: "2026-10-31",
      note: "IoST's CSIT notice page is the authority for CSIT result announcements. No personal marksheet lookup service or public API was verified."
    },
    csitEntrance: {
      id: "csit-entrance",
      name: "B.Sc. CSIT entrance portal",
      authority: "Institute of Science and Technology, Tribhuvan University",
      url: "https://entrancecsit.iost.tu.edu.np/",
      status: "OFFICIAL_PORTAL_REDIRECT",
      checked: "2026-10-31",
      note: "The official portal currently presents entrance registration information. Check IoST notices for published entrance results."
    },
    tuExam: {
      id: "tu-exam",
      name: "TU Office of the Controller of Examinations",
      authority: "Tribhuvan University",
      url: "https://exam.tu.edu.np/",
      status: "OFFICIAL_PORTAL_REDIRECT",
      checked: "2026-10-31",
      note: "Official TU examination office site. It is not treated as an IoST CSIT personal-result portal."
    },
    bleMunicipality: {
      id: "ble-municipality",
      name: "Relevant municipality or local government",
      authority: "Local government responsible for the Basic Level Examination",
      url: null,
      status: "NOT_VERIFIED",
      checked: "2026-10-31",
      note: "BLE results are municipality-specific. No municipality result announcement or portal has been independently verified for this directory."
    }
  };

  const exams = [
    {
      id: "ble",
      title: "Class 8",
      name: "Basic Level Examination (BLE)",
      description: "Results and notices are published by the relevant local government.",
      authority: "Your municipality or local government",
      status: "NOT_VERIFIED",
      sourceIds: ["bleMunicipality"],
      guidance: "There is no single national BLE result portal. A municipality must be selected and its official result link verified before this directory can provide a destination. No student information is requested here."
    },
    {
      id: "see",
      title: "Class 10",
      name: "Secondary Education Examination (SEE)",
      description: "Open the official result provider to check the published result.",
      authority: "NEB Office of the Controller of Examinations, Grade 10",
      status: "OFFICIAL_PORTAL_REDIRECT",
      sourceIds: ["seeResults", "seeOffice"],
      resultSourceId: "seeResults",
      guidance: "Enter the symbol number and any other details requested on the official provider's website. The currently available result years and exam types could not be confirmed here."
    },
    {
      id: "neb12",
      title: "Class 12",
      name: "NEB Grade 12",
      description: "Open the official NEB result provider for published results.",
      authority: "National Examination Board",
      status: "OFFICIAL_PORTAL_REDIRECT",
      sourceIds: ["nebResults", "neb"],
      resultSourceId: "nebResults",
      guidance: "On 2026-10-31, the provider displayed Class XII Supplementary Results 2083 and requested a symbol number and date of birth. Portal content and result availability can change; other Grade 12 result types have not been verified. Check the provider for current information."
    },
    {
      id: "csit-entrance",
      title: "B.Sc. CSIT",
      name: "Entrance examination",
      description: "Check IoST's official notice for published entrance results.",
      authority: "Institute of Science and Technology, Tribhuvan University",
      status: "OFFICIAL_PORTAL_REDIRECT",
      sourceIds: ["iostCsit", "csitEntrance"],
      resultSourceId: "iostCsit",
      guidance: "An entrance merit list is not a semester marksheet. IoST notices are the result-announcement authority; the entrance portal is linked separately for entrance information."
    },
    {
      id: "csit-semester",
      title: "B.Sc. CSIT",
      name: "Semester examination results",
      description: "Check IoST notices for regular, partial, retotalling and make-up announcements.",
      authority: "Institute of Science and Technology, Tribhuvan University",
      status: "OFFICIAL_PORTAL_REDIRECT",
      sourceIds: ["iostCsit", "tuExam"],
      resultSourceId: "iostCsit",
      guidance: "No public personal marksheet lookup, documented API, or authorized automated integration was verified. Results and any linked documents must be checked at IoST."
    },
    {
      id: "other",
      title: "More examinations",
      name: "Additional examination categories",
      description: "No additional category is listed until its official source is verified.",
      authority: "Not verified",
      status: "NOT_VERIFIED",
      sourceIds: [],
      guidance: "Additional examinations will be listed only after their official result source and permitted access method are verified."
    }
  ];

  const notices = [
    {
      title: "SEE announcements",
      description: "Check the Grade 10 examination office for notices and result information.",
      sourceId: "seeOffice"
    },
    {
      title: "NEB announcements",
      description: "Check the National Examination Board for current notices and result publications.",
      sourceId: "neb"
    },
    {
      title: "B.Sc. CSIT notices",
      description: "IoST notices are the authority for CSIT entrance and semester-result announcements.",
      sourceId: "iostCsit"
    }
  ];

  const data = { statuses, sources, exams, notices };
  root.NepalResults = data;
  if (typeof module !== "undefined" && module.exports) {
    module.exports = data;
  }
})(typeof globalThis !== "undefined" ? globalThis : window);
