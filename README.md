# Web-to-Sheet Logger 📋➡️📄

A Chrome Extension that allows users to highlight text on any webpage and save it directly to a connected **Google Sheet** along with the **page title, URL, and timestamp**.

---

## 🔥 Features

- 🖱️ Highlight any text on a web page
- 📌 Floating “Save to Sheet” button appears near the selected text
- 🕓 Captures metadata (text, title, URL, timestamp)
- 📤 Sends the data to Google Sheets via Google Apps Script
- 📄 Ideal for researchers, students, writers, journalists, etc.

---

## 🚀 How It Works

1. User highlights text on a web page
2. A floating “Save to Sheet” button appears
3. On click, the selected text and metadata are sent to a **Google Apps Script**
4. The script appends this data to a **Google Sheet**

---

## 🛠️ Installation

1. Download or clone this repo
2. Go to `chrome://extensions`
3. Enable **Developer mode**
4. Click **"Load unpacked"** and select this folder
5. Use the extension by highlighting text on any web page

---

## ⚙️ Google Sheet Integration

1. Create a new Google Sheet and note the Sheet ID from the URL
2. Open [Google Apps Script](https://script.google.com)
3. Paste the script from `Code.gs` below:

```js
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.openById("YOUR_SPREADSHEET_ID").getActiveSheet();
    var data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      data.text || "No text",
      data.url || "No URL",
      data.title || "No title",
      data.timestamp || new Date().toISOString()
    ]);

    return ContentService.createTextOutput("Success").setMimeType(ContentService.MimeType.TEXT);
  } catch (err) {
    return ContentService.createTextOutput("Error: " + err).setMimeType(ContentService.MimeType.TEXT);
  }
}
