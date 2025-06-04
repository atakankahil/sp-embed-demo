let redirectMap = {};

fetch("suggestions.json")
  .then(response => response.json())
  .then(data => {
    redirectMap = data;
  })
  .catch(error => {
    console.error("❌ Не може да се вчита suggestions.json:", error);
  });

document.getElementById("convertBtn").addEventListener("click", function () {
  const input = document.getElementById("oldUrl").value.trim();
  const output = document.getElementById("output");

  if (!input.startsWith("http://mktintranet/") && !input.startsWith("https://mktintranet/")) {
    output.innerHTML = "❌ Линкот мора да започнува со <code>http://mktintranet/</code>";
    return;
  }

  const relativePath = input.replace(/^https?:\/\/mktintranet\//, "");
  let translatedPath;

  if (redirectMap[relativePath]) {
    translatedPath = redirectMap[relativePath];
  } else {
    const parts = relativePath.split("/");
    const siteName = (parts[0] || "") + (parts[1] ? "-" + parts[1] : "");
    const rest = parts.slice(2).join("/");
    translatedPath = siteName + (rest ? "/" + rest : "");
  }

  const translated = `https://telekommk1.sharepoint.com/sites/${translatedPath}`;
  output.innerHTML = `✅ <span style="color: green;">Нов линк:</span> <a href="${translated}" target="_blank">${translated}</a>`;
});
