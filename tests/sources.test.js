"use strict";

const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const { exams, notices, sources, statuses } = require("../official-sources.js");

test("all required examination categories are present with defined statuses", () => {
  assert.deepEqual(
    exams.map((exam) => exam.id),
    ["ble", "see", "neb12", "csit-entrance", "csit-semester", "other"]
  );
  exams.forEach((exam) => {
    assert.ok(statuses[exam.status], `${exam.id} has a recognized status`);
    exam.sourceIds.forEach((sourceId) => assert.ok(sources[sourceId], `${sourceId} exists`));
  });
});

test("official result categories redirect to their verified authority source", () => {
  assert.equal(exams.find((exam) => exam.id === "see").resultSourceId, "seeResults");
  assert.equal(exams.find((exam) => exam.id === "neb12").resultSourceId, "nebResults");
  assert.equal(exams.find((exam) => exam.id === "csit-entrance").resultSourceId, "iostCsit");
  assert.equal(exams.find((exam) => exam.id === "csit-semester").resultSourceId, "iostCsit");
  assert.match(sources.iostCsit.url, /^https:\/\/iost\.tu\.edu\.np\/notices\?title=csit$/);
});

test("BLE and additional exams are not represented as verified integrations", () => {
  assert.equal(exams.find((exam) => exam.id === "ble").status, "NOT_VERIFIED");
  assert.equal(sources.bleMunicipality.url, null);
  assert.equal(exams.find((exam) => exam.id === "other").status, "NOT_VERIFIED");
  assert.equal(exams.find((exam) => exam.id === "other").resultSourceId, undefined);
});

test("all configured destinations use HTTPS and a recognized integration status", () => {
  Object.values(sources).forEach((source) => {
    assert.ok(statuses[source.status], `${source.id} has a recognized status`);
    if (source.url) assert.match(source.url, /^https:\/\//, `${source.id} uses HTTPS`);
  });
});

test("production lookup contains no fabricated student records or result calculations", () => {
  const projectRoot = path.resolve(__dirname, "..");
  const productionFiles = ["index.html", "student.js", "official-sources.js"]
    .map((file) => readFileSync(path.join(projectRoot, file), "utf8"))
    .join("\n");

  assert.doesNotMatch(productionFiles, /2024-10-00[1-5]/);
  assert.doesNotMatch(productionFiles, /Samyog Sapkota|Aarav Sharma|Bibek Karki|Sneha Adhikari|Prashant Shrestha/);
  assert.doesNotMatch(productionFiles, /gradePointFor|rankFor|PASS_MARK/);
  assert.doesNotMatch(productionFiles, /fetch\s*\(/);
});

test("notice cards link to configured official sources without invented publication dates", () => {
  assert.ok(notices.length >= 3);
  notices.forEach((notice) => {
    assert.ok(sources[notice.sourceId]);
    assert.match(sources[notice.sourceId].url, /^https:\/\//);
    assert.doesNotMatch(notice.description, /\b(20\d{2}|208\d)\b/);
  });
});
