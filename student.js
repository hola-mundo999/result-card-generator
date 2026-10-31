(function () {
  "use strict";

  const { exams, notices, sources, statuses } = window.NepalResults;
  const examGrid = document.getElementById("examGrid");
  const noticeGrid = document.getElementById("noticeGrid");
  const sourceList = document.getElementById("sourceList");
  const sourcePanel = document.getElementById("sourcePanel");
  const sourcePanelContent = document.getElementById("sourcePanelContent");
  const selectionAnnouncement = document.getElementById("selectionAnnouncement");

  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function externalLink(source, label, className) {
    if (!source.url) return null;
    const link = element("a", className, label);
    link.href = source.url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.referrerPolicy = "no-referrer";
    return link;
  }

  function makeStatus(status) {
    return element("span", `status-pill status-${status.toLowerCase()}`, statuses[status]);
  }

  function renderExamCards() {
    exams.forEach((exam) => {
      const card = element("button", "exam-card");
      card.type = "button";
      card.dataset.examId = exam.id;
      card.setAttribute("aria-pressed", "false");

      const top = element("span", "exam-card-top");
      top.append(element("span", "exam-kicker", exam.title));
      top.append(makeStatus(exam.status));

      const name = element("span", "exam-name", exam.name);
      const description = element("span", "exam-description", exam.description);
      const authority = element("span", "exam-authority", exam.authority);
      const arrow = element("span", "exam-arrow", "View official source");
      arrow.setAttribute("aria-hidden", "true");
      card.append(top, name, description, authority, arrow);
      card.addEventListener("click", () => selectExam(exam.id));
      examGrid.append(card);
    });
  }

  function selectExam(examId) {
    const exam = exams.find((item) => item.id === examId);
    if (!exam) return;

    examGrid.querySelectorAll("[data-exam-id]").forEach((card) => {
      card.setAttribute("aria-pressed", String(card.dataset.examId === examId));
    });

    sourcePanelContent.replaceChildren();

    const headingRow = element("div", "panel-heading");
    const headingCopy = element("div");
    headingCopy.append(element("p", "eyebrow", exam.title));
    const panelTitle = element("h3", "", exam.name);
    panelTitle.id = "panelTitle";
    headingCopy.append(panelTitle);
    headingRow.append(headingCopy, makeStatus(exam.status));
    sourcePanelContent.append(headingRow);
    sourcePanelContent.append(element("p", "panel-guidance", exam.guidance));

    if (exam.resultSourceId) {
      const source = sources[exam.resultSourceId];
      const link = externalLink(source, `Continue to ${source.name}`, "button button-primary");
      const links = element("div", "panel-actions");
      link.setAttribute("aria-label", `${link.textContent} (opens in a new tab)`);
      links.append(link);
      sourcePanelContent.append(links);
    }

    const sourceLinks = element("div", "panel-sources");
    sourceLinks.append(element("h4", "", "Related official sources"));
    exam.sourceIds.forEach((sourceId) => {
      const source = sources[sourceId];
      const item = element("div", "panel-source");
      const copy = element("div");
      copy.append(element("strong", "", source.name));
      copy.append(element("span", "", source.authority));
      item.append(copy);
      const link = externalLink(source, "Open source ↗", "text-link");
      item.append(link || element("span", "source-unavailable", "No direct URL verified"));
      sourceLinks.append(item);
    });
    sourcePanelContent.append(sourceLinks);

    const privacyNote = element(
      "p",
      "privacy-note",
      "This directory does not ask for or transmit your symbol number, roll number, date of birth, or marks. Any details requested by the authority are entered on its website."
    );
    sourcePanelContent.append(privacyNote);
    sourcePanel.hidden = false;
    selectionAnnouncement.textContent =
      `${exam.title}, ${exam.name}. Authority: ${exam.authority}. ` +
      `Access status: ${statuses[exam.status]}. ${exam.guidance}`;
    sourcePanel.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function renderNotices() {
    notices.forEach((notice) => {
      const source = sources[notice.sourceId];
      const card = element("article", "notice-card");
      card.append(element("span", "notice-label", "Official source"));
      card.append(element("h3", "", notice.title));
      card.append(element("p", "", notice.description));
      card.append(makeStatus(source.status));
      card.append(externalLink(source, "Visit authority website ↗", "text-link"));
      noticeGrid.append(card);
    });
  }

  function renderSources() {
    Object.values(sources).forEach((source) => {
      const row = element("article", "source-row");
      const sourceName = element("div", "source-main");
      sourceName.append(element("h3", "", source.name));
      sourceName.append(element("p", "", source.authority));

      const sourceDetails = element("div", "source-details");
      sourceDetails.append(makeStatus(source.status));
      sourceDetails.append(element("p", "", source.note));
      sourceDetails.append(element("time", "checked-date", `Reviewed ${source.checked}`));
      const link = externalLink(source, source.url || "No direct link verified", "text-link");
      if (link) {
        link.setAttribute("aria-label", `${source.name} (opens in a new tab)`);
        sourceDetails.append(link);
      } else {
        sourceDetails.append(element("span", "source-unavailable", "No direct link verified"));
      }

      row.append(sourceName, sourceDetails);
      sourceList.append(row);
    });
  }

  renderExamCards();
  renderNotices();
  renderSources();
})();
