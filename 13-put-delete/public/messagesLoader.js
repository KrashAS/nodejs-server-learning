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
            .forEach(({ id, name, message, time }) => {
                const msgEl = document.createElement("div");
                msgEl.className = "message";

                const date = new Date(time).toLocaleString();

                msgEl.innerHTML = `<p><strong>${name}</strong> <em>${date}</em></p><p class="msg-text">${message}</p><button class="edit-btn">Редагувати</button><button class="delete-btn">Видалити</button><hr />`;

                // Обробники кнопок:
                const editBtn = msgEl.querySelector(".edit-btn");
                const deleteBtn = msgEl.querySelector(".delete-btn");

                editBtn.addEventListener("click", () => {
                    const newText = prompt(
                        "Введіть новий текст повідомлення:",
                        message
                    );
                    if (newText && newText.trim() !== "") {
                        updateMessage(id, newText.trim())
                            .then(() => loadMessages())
                            .catch((e) => alert(e.message));
                    }
                });

                deleteBtn.addEventListener("click", () => {
                    if (
                        confirm(
                            "Ви впевнені, що хочете видалити це повідомлення?"
                        )
                    ) {
                        deleteMessage(id)
                            .then(() => loadMessages())
                            .catch((e) => alert(e.message));
                    }
                });

                container.appendChild(msgEl);
            });
    } catch (err) {
        console.error(err);
    }
}

export async function updateMessage(id, newText) {
    try {
        const res = await fetch(`/api/message/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: newText }),
        });

        if (!res.ok) throw new Error("Не вдалося оновити повідомлення");

        return await res.json();
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export async function deleteMessage(id) {
    try {
        const res = await fetch(`/api/message/${id}`, {
            method: "DELETE",
        });

        if (!res.ok) throw new Error("Не вдалося видалити повідомлення");

        return true;
    } catch (err) {
        console.error(err);
        throw err;
    }
}
