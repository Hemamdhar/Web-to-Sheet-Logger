document.addEventListener("mouseup", (e) => {
  const selectedText = window.getSelection().toString().trim();
  if (selectedText.length > 0) {
    showSaveButton(e.pageX, e.pageY, selectedText);
  }
});

function showSaveButton(x, y, text) {
  removeExistingButton();

  const btn = document.createElement("button");
  btn.innerText = "Save to Sheet";
  btn.className = "websheet-button";
  btn.style.position = "absolute";
  btn.style.left = `${x}px`;
  btn.style.top = `${y}px`;
  btn.style.zIndex = 9999;
  document.body.appendChild(btn);

  btn.onclick = () => {
    const data = {
      text: text,
      url: window.location.href,
      title: document.title,
      timestamp: new Date().toISOString(),
    };

    fetch(
      "https://script.google.com/macros/s/AKfycbwd3x9ybetiItYp3E586QadlZWJtKSxN-AOqNpcmcHg/exec",
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.text())
      .then((response) => {
        alert("✅ Saved to Sheet!");
        console.log("Server says:", response);
      })
      .catch((err) => {
        alert("❌ Error saving.");
        console.error("Error:", err);
      });

    btn.remove();
  };
}

function removeExistingButton() {
  const existing = document.querySelector(".websheet-button");
  if (existing) existing.remove();
}
