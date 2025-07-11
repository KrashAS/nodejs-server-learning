const form = document.getElementById("messageForm");
const responseDiv = document.getElementById("response");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const message = form.message.value.trim();

    if (!name || !message) {
        responseDiv.textContent = "Ім’я і повідомлення обов’язкові!";
        return;
    }

    if (message.length < 2) {
        responseDiv.textContent =
            "Повідомлення коротке та не повинно перевищувати 100 символів.";
        return;
    }

    try {
        const res = await fetch("/api/message", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, message }),
        });

        const json = await res.json();

        if (res.ok) {
            responseDiv.textContent = json.reply;
            form.reset();
            loadMessages(); // оновити список
        } else {
            responseDiv.textContent = "⚠️ " + (json.error || "Сталася помилка");
        }
    } catch (err) {
        responseDiv.textContent = "Помилка з’єднання: " + err.message;
    }
});

async function loadMessages() {
    try {
        const res = await fetch("/api/messages");
        const messages = await res.json();

        const container = document.getElementById("messagesContainer");
        container.innerHTML = "";

        messages.reverse().forEach(({ name, message, time }) => {
            const div = document.createElement("div");
            div.className = "message";
            const date = new Date(time).toLocaleString("uk-UA");

            div.innerHTML = `
        <p><strong>${name}</strong> <em>${date}</em></p>
        <p>${message}</p>
      `;
            container.appendChild(div);
        });
    } catch (err) {
        console.error("Помилка завантаження:", err);
    }
}

window.addEventListener("DOMContentLoaded", loadMessages);
