function sendMessage() {
    const name = document.getElementById("name").value;
    const message = document.getElementById("message").value;

    fetch("/api/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, message }),
    })
        .then((res) => res.json())
        .then((data) => {
            document.getElementById(
                "response"
            ).innerText = `✅ Сервер відповів: ${data.reply}`;
        })
        .catch(() => {
            document.getElementById("response").innerText = "❌ Помилка запиту";
        });
}
