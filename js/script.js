// Greeting di Home Page + set max tanggal lahir
document.addEventListener("DOMContentLoaded", function () {
  const name = prompt("Masukkan Nama Anda:");
  document.getElementById("greeting").innerText =
    name ? `Hi ${name}, Welcome To Website` : `Hi, Welcome To Website`;

  // Atur max tanggal lahir (minimal 10 tahun)
  const tanggalInput = document.getElementById("tanggal");
  const today = new Date();
  today.setFullYear(today.getFullYear() - 10);
  const maxDate = today.toISOString().split("T")[0];
  tanggalInput.setAttribute("max", maxDate);
  tanggalInput.setAttribute("min", "1900-01-01");
});

// Validasi Form
function validateForm(event) {
  event.preventDefault();

  const nama = document.getElementById("nama").value.trim();
  const tanggal = document.getElementById("tanggal").value;
  const email = document.getElementById("email").value.trim();
  const pesan = document.getElementById("pesan").value.trim();

  let valid = true;

  // Reset error message
  document.querySelectorAll("[id^='error-']").forEach(el => el.classList.add("hidden"));

  // Validasi nama
  if (!nama) {
    document.getElementById("error-nama").classList.remove("hidden");
    valid = false;
  }

  // Validasi tanggal (minimal umur 10 tahun)
  if (!tanggal) {
    document.getElementById("error-tanggal").classList.remove("hidden");
    valid = false;
  } else {
    const birthDate = new Date(tanggal);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    if (age < 10) {
      document.getElementById("error-tanggal").textContent = "Umur minimal 10 tahun";
      document.getElementById("error-tanggal").classList.remove("hidden");
      valid = false;
    }
  }

  // Validasi email
  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (!emailPattern.test(email)) {
    document.getElementById("error-email").classList.remove("hidden");
    valid = false;
  }

  // Validasi pesan
  if (!pesan) {
    document.getElementById("error-pesan").classList.remove("hidden");
    valid = false;
  }

  if (!valid) return;

  // Tambahkan ke history
  const outputList = document.getElementById("outputList");

  const now = new Date();
  const formattedDate = now.toLocaleString("id-ID", {
    timeZoneName: "short"
  });

  const div = document.createElement("div");
  div.className = "border p-3 rounded bg-white shadow";
  div.innerHTML = `
    <p><span class="font-semibold">Nama:</span> ${nama}</p>
    <p><span class="font-semibold">Tanggal Lahir:</span> ${tanggal}</p>
    <p><span class="font-semibold">Email:</span> ${email}</p>
    <p><span class="font-semibold">Pesan:</span> ${pesan}</p>
    <p class="text-xs text-gray-500">Dikirim pada: ${formattedDate}</p>
  `;

  outputList.appendChild(div);

  // Reset form
  event.target.reset();
}

// Hamburger menu
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

// Floating button logic
const toTopBtn = document.getElementById("toTopBtn");
window.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
    toTopBtn.classList.remove("hidden");
  } else {
    toTopBtn.classList.add("hidden");
  }
});
toTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
