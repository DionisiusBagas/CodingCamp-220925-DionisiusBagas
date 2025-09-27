// Navbar toggle
document.getElementById("menuBtn").addEventListener("click", () => {
  document.getElementById("mobileMenu").classList.toggle("hidden");
});

// Greeting
document.getElementById("username").textContent = "Bagas";

// Batasi tanggal lahir max 10 tahun lalu
const tanggalInput = document.getElementById("tanggal");
const today = new Date();
const maxDate = new Date(today.getFullYear() - 10, today.getMonth(), today.getDate());
tanggalInput.max = maxDate.toISOString().split("T")[0];

// Back to Top
const backToTop = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) backToTop.classList.remove("hidden");
  else backToTop.classList.add("hidden");
});
backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

// Form validation & output
function validateForm(event) {
  event.preventDefault();

  const nama = document.getElementById("nama").value.trim();
  const tanggal = document.getElementById("tanggal").value.trim();
  const email = document.getElementById("email").value.trim();
  const pesan = document.getElementById("pesan").value.trim();
  const warning = document.getElementById("formWarning");

  if (!nama || !tanggal || !email || !pesan) {
    warning.classList.remove("hidden");
    return;
  }

  // cek umur minimal 10 tahun
  const birthDate = new Date(tanggal);
  const age = today.getFullYear() - birthDate.getFullYear();
  if (age < 10) {
    warning.classList.remove("hidden");
    return;
  }

  warning.classList.add("hidden");

  const outputList = document.getElementById("outputList");
  const now = new Date();
  const timeString = now.toLocaleString("id-ID", { timeZoneName: "short" });

  const div = document.createElement("div");
  div.className = "border p-3 rounded bg-white shadow";
  div.innerHTML = `
    <p><span class="font-semibold">Nama:</span> ${nama}</p>
    <p><span class="font-semibold">Tanggal Lahir:</span> ${tanggal}</p>
    <p><span class="font-semibold">Email:</span> ${email}</p>
    <p><span class="font-semibold">Pesan:</span> ${pesan}</p>
    <p class="text-xs text-gray-500 mt-1">Dikirim pada: ${timeString}</p>
  `;
  outputList.appendChild(div);

  // reset form
  event.target.reset();

  // tampilkan toast
  const toast = document.getElementById("toast");
  toast.classList.remove("hidden");
  setTimeout(() => toast.classList.add("hidden"), 3000);
}
