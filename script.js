// ===== 1. Compte à rebours jusqu'au début du festival =====
const festivalDate = new Date("2026-12-18T18:00:00");

function pad(n) { return String(n).padStart(2, "0"); }

function updateCountdown() {
  const diff = festivalDate - new Date();
  const box = document.getElementById("countdown");

  if (diff <= 0) {
    box.innerHTML = '<p style="font-size:1.6rem;font-weight:700">Le festival a commencé ! 🎶</p>';
    clearInterval(timer);
    return;
  }

  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);

  document.getElementById("days").textContent = pad(days);
  document.getElementById("hours").textContent = pad(hours);
  document.getElementById("minutes").textContent = pad(minutes);
  document.getElementById("seconds").textContent = pad(seconds);
}

updateCountdown();
const timer = setInterval(updateCountdown, 1000);

// ===== 2. Validation du formulaire d'inscription =====
const form = document.getElementById("registerForm");

function setError(id, message) {
  document.getElementById("err-" + id).textContent = message;
  const field = document.getElementById(id);
  if (field && field.type !== "checkbox") field.classList.toggle("invalid", Boolean(message));
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const nom = document.getElementById("nom").value.trim();
  const email = document.getElementById("email").value.trim();
  const pass = document.getElementById("pass").value;
  const cgv = document.getElementById("cgv").checked;
  const success = document.getElementById("formSuccess");
  success.textContent = "";

  let ok = true;

  if (nom.length < 3) { setError("nom", "Veuillez saisir votre nom complet (3 caractères minimum)."); ok = false; }
  else setError("nom", "");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) { setError("email", "Adresse e-mail invalide."); ok = false; }
  else setError("email", "");

  if (!pass) { setError("pass", "Choisissez un type de pass."); ok = false; }
  else setError("pass", "");

  if (!cgv) { setError("cgv", "Vous devez accepter les conditions."); ok = false; }
  else setError("cgv", "");

  if (ok) {
    success.textContent = "Merci " + nom + " ! Votre inscription est enregistrée. Une confirmation sera envoyée à " + email + ".";
    form.reset();
  }
});
