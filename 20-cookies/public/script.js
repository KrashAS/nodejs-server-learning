async function loadUsername() {
    const res = await fetch("/api/get-name");
    const data = await res.json();
    document.getElementById("username").textContent = data.username;
}

document.getElementById("nameForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = e.target.name.value.trim();

    await fetch("/api/set-name", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
    });

    loadUsername();
});

window.addEventListener("DOMContentLoaded", loadUsername);
