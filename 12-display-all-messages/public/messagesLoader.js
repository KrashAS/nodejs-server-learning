export async function loadMessages() {
    try {
        const res = await fetch("/api/messages");
        if (!res.ok) throw new Error("Помилка завантаження повідомлень");
        const messages = await res.json();

        const container = document.getElementById("messagesContainer");
        container.innerHTML = "";

        messages
            .slice()
            .reverse()
            .forEach(({ name, message, time }) => {
                const msgEl = document.createElement("div");
                msgEl.className = "message";

                const date = new Date(time).toLocaleString();

                msgEl.innerHTML = `<p><strong>${name}</strong> <em>${date}</em></p><p>${message}</p><hr />`;

                container.appendChild(msgEl);
            });
    } catch (err) {
        console.error(err);
    }
}
