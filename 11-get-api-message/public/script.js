const form = document.getElementById("messageForm");
const responseDiv = document.getElementById("response");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
        name: form.name.value.trim(),
        message: form.message.value.trim(),
    };

    try {
        const res = await fetch("/api/message", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        const json = await res.json();

        if (res.ok) {
            responseDiv.textContent = json.reply;
        } else {
            responseDiv.textContent =
                "Помилка: " + (json.error || "Невідома помилка");
        }
    } catch (err) {
        responseDiv.textContent = "Помилка мережі: " + err.message;
    }
});
