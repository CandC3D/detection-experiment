/**
 * Backend for the Student Essay Authenticity Calibration exercise.
 *
 * Deployment:
 *   1. Create a new Google Sheet. Add a single tab with this header row in row 1:
 *      timestamp | session_id | branch | started_at | completed_at | self_assessment |
 *      position | essay_id | topic_id | source | human_likeness | attribution
 *   2. Extensions -> Apps Script. Paste this file in as Code.gs.
 *   3. Deploy -> New deployment -> Web app. Execute as "Me". Who has access: "Anyone".
 *   4. Copy the /exec URL into assets/experiment.js as BACKEND_URL.
 *
 * The client sends the payload as text/plain to avoid a CORS preflight; Apps Script
 * reads the body via e.postData.contents regardless of Content-Type.
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    var data = JSON.parse(e.postData.contents);
    var timestamp = new Date().toISOString();

    var rows = (data.responses || []).map(function (r) {
      return [
        timestamp,
        data.session_id,
        data.branch,
        data.started_at,
        data.completed_at,
        data.self_assessment,
        r.position,
        r.essay_id,
        r.topic_id,
        r.source,
        r.human_likeness,
        r.attribution
      ];
    });

    if (rows.length) {
      sheet.getRange(sheet.getLastRow() + 1, 1, rows.length, rows[0].length).setValues(rows);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok', rows: rows.length }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', note: 'POST only' }))
    .setMimeType(ContentService.MimeType.JSON);
}
