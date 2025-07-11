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
            form.reset();
            loadMessages();
        } else {
            responseDiv.textContent =
                "Помилка: " + (json.error || "Невідома помилка");
        }
    } catch (err) {
        responseDiv.textContent = "Помилка мережі: " + err.message;
    }
});

async function loadMessages() {
    try {
        const res = await fetch("/api/messages");
        const messages = await res.json();

        const container = document.getElementById("messagesContainer");
        container.innerHTML = "";

        messages.reverse().forEach(({ name, message, time }) => {
            const msgEl = document.createElement("div");
            msgEl.className = "message";
            msgEl.innerHTML = `<p><strong>${name}</strong> (${new Date(
                time
            ).toLocaleString()}):</p><p>${message}</p>`;
            container.appendChild(msgEl);
        });
    } catch (err) {
        console.error("❌ Неможливо завантажити повідомлення", err);
    }
}

window.addEventListener("DOMContentLoaded", loadMessages);
