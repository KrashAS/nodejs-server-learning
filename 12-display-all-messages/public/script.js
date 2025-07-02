import { initMessageForm } from "./messageForm.js";
import { loadMessages } from "./messagesLoader.js";

window.addEventListener("DOMContentLoaded", () => {
    initMessageForm();
    loadMessages();
});
