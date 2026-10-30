# Nepal Examination Results

An independent directory that helps students find official examination result portals and notices
for Nepal. The application does not currently retrieve individual results. It does not display
sample records, calculate grades, or claim to be affiliated with an examination authority.

## Initial project audit

- The original project was a static vanilla HTML/CSS/JavaScript page with no package manifest,
  backend, API, database, or custom Vercel build configuration.
- `student.js` contained five fictional student records, made up roll numbers and marks, and
  searched by student name or roll number. The page prefilled and rendered one sample record when it
  loaded.
- The old rendering code derived percentages, pass/fail, grades, a 4.0 GPA, and a class rank from
  invented marks using one fixed grading scale. Those calculations were not verified against any
  examination authority and have been removed.
- The original page identified itself as the Tribhuvan University Examination Division and used an
  Annual Examination 2024 label despite having no official affiliation or live result source.
- Its generic name/roll/class/session fields did not match the requirements of the different
  examinations. It had no source attribution, notice directory, or genuine result lookup.
- The old page kept its invented records in public frontend JavaScript. No server persistence or
  database was found. The replacement asks for no personal result identifiers and sends no
  information to a server.
- The deployed page content observed at `https://result-card-generator-red.vercel.app/` matched the
  old local page's title, branding, form, and 2024 text. No content mismatch was evident; the
  deployment's configured Git branch could not be independently inspected.
- `.vercel/` is ignored and was not tracked; no deployment settings, environment variables, or live
  site were changed.

## Current integration status

| Examination/source | Status | What this application supports |
| --- | --- | --- |
| Class 8 BLE | `NOT_VERIFIED` | Municipality-specific result portals are not listed until the exact official link is verified. |
| Class 10 SEE | `OFFICIAL_PORTAL_REDIRECT` | Direct links to the Nepal Telecom result portal and the official Grade 10 office. |
| Class 12 NEB | `OFFICIAL_PORTAL_REDIRECT` | Direct links to the Nepal Telecom result portal and NEB. |
| B.Sc. CSIT entrance | `OFFICIAL_PORTAL_REDIRECT` | IoST CSIT notices for published results, plus the separate entrance portal for entrance information. |
| B.Sc. CSIT semesters | `OFFICIAL_PORTAL_REDIRECT` | Direct link to IoST CSIT notices; no personal marksheet lookup is claimed. |
| Other examinations | `NOT_VERIFIED` | Additional categories are not presented as supported before source verification. |

No source has a documented public API or an authorized machine-readable result dataset verified for
this application. `OFFICIAL_PORTAL_REDIRECT` means only that the user can continue to the authority
website; it is not an automated result integration. The SEE Nepal Telecom portal timed out during
review, so its current input requirements and availability were not verified. On 2026-10-31, the
NEB Nepal Telecom portal displayed Class XII Supplementary Results 2083 and requested a symbol
number and date of birth. This observation does not verify other Grade 12 result types, and portal
content and result availability can change. The NEB Nepal Telecom page states that copying,
embedding, modifying, or adapting its content requires prior written consent; this application only
links to that page. Dynamic authority pages did not expose a verified result dataset. No scraping,
private endpoint access, CAPTCHA bypass, proxy, or result calculation is implemented.

The official source registry, integration status, links, notes, and supported categories are kept in
[`official-sources.js`](./official-sources.js). The interface is rendered by
[`student.js`](./student.js); styles and responsive behavior are in [`style.css`](./style.css).

## Official source directory

| Source | URL | Verified use |
| --- | --- | --- |
| OCE Grade 10 / SEE | <https://see.gov.np/> | Official office homepage. |
| Nepal Telecom SEE results | <https://see.ntc.net.np/results/grade> | Official result destination supplied for direct student access; automated access not verified. |
| National Examination Board | <https://neb.gov.np/> | Official NEB information and announcements. |
| Nepal Telecom NEB results | <https://neb.ntc.net.np/index.php> | On 2026-10-31 displayed Class XII Supplementary Results 2083 and requested symbol number and date of birth. Other result types are not verified; portal content and availability can change. |
| IoST CSIT notices | <https://iost.tu.edu.np/notices?title=csit> | IoST is treated as the authority for CSIT result notices. |
| B.Sc. CSIT entrance portal | <https://entrancecsit.iost.tu.edu.np/> | Official entrance information; not treated as a result integration. |
| TU Office of the Controller of Examinations | <https://exam.tu.edu.np/> | TU examination notices; not represented as the CSIT authority for results. |
| BLE | Municipality-specific | No municipality result link is included until independently verified. |

Sources were reviewed on 2026-10-31. This is a manual review date, not an automated freshness
indicator. The notice section links to authority pages but does not publish scraped or cached
announcements. Publication dates, result years, exam types, and updates must be checked on the
authority website.

## Privacy and security

- The static application has no backend, database, analytics, or server-side environment variables.
- It does not request, store, or transmit names, symbol/roll numbers, dates of birth, marks, or
  result documents.
- External result-provider links open the authority page in a new tab; any details requested there
  are submitted directly to that provider, subject to its own privacy and security practices.
- External links use `noopener`, `noreferrer`, and `no-referrer`.
- HTTPS links are used for listed sources.
- This static application cannot provide server-side rate limiting or security headers. No backend
  was introduced because there is no verified, authorized result API to call.

## Run locally

Open `index.html` in a browser. No package install, build, server, or database is required.

## Tests

Run the dependency-free registry and production-data checks with Node.js:

```sh
node --test tests/sources.test.js
```

There are no automated end-to-end integrations because no permitted machine-readable result source
has been verified.

## Deployment

The current site is a static HTML/CSS/JavaScript project and remains compatible with its existing
Vercel static deployment. Review the source directory and tests, then deploy this feature branch
through the project's normal approval process. Do not configure result credentials or a database;
none are required for portal redirects. No deployment, push, or environment change was made.
