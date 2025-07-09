import { loadMessages } from "./messagesLoader.js";

export function initMessageForm() {
    const nameInput = document.getElementById("nameInput");
    const messageInput = document.getElementById("messageInput");
    const sendBtn = document.getElementById("sendBtn");
    const responseDiv = document.getElementById("response");

    sendBtn.addEventListener("click", async () => {
        const name = nameInput.value.trim();
        const message = messageInput.value.trim();

        if (!name || !message) {
            responseDiv.textContent = "Введіть ім’я та повідомлення.";
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
                nameInput.value = "";
                messageInput.value = "";
                loadMessages();
            } else {
                responseDiv.textContent = "❌ " + (json.error || "Помилка");
            }
        } catch (err) {
            responseDiv.textContent = "❌ Мережева помилка: " + err.message;
        }
    });
}
