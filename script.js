// ======================================
// KONFIGURASI
// ======================================

const scriptURL = "https://script.google.com/macros/s/AKfycbyTwXjwglvQ5bsu44XUTIy5W6cnz-jgMe-wm_ZAxdSrKxA4t18jGBEJ2E57x_TrdP7H/exec";

const form = document.getElementById("guestForm");
const status = document.getElementById("status");
const tombol = document.querySelector('button[type="submit"]');


// ======================================
// TAMPILKAN TANGGAL HARI INI
// ======================================

const hari = new Date();

const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
};

document.getElementById("tanggalHari").innerHTML =
    hari.toLocaleDateString("id-ID", options);


// ======================================
// ISI OTOMATIS INPUT TANGGAL
// ======================================

document.getElementById("tanggal").valueAsDate = new Date();


// ======================================
// SUBMIT FORM
// ======================================

form.addEventListener("submit", function (e) {

    e.preventDefault();

    tombol.disabled = true;

    tombol.innerHTML = `
        <span class="spinner-border spinner-border-sm me-2"></span>
        Mengirim...
    `;

    const data = {

        nama: document.getElementById("nama").value,

        instansi: document.getElementById("instansi").value,

        alamat: document.getElementById("alamat").value,

        hp: document.getElementById("hp").value,

        tanggal: document.getElementById("tanggal").value,

        tujuan: document.getElementById("tujuan").value

    };

    fetch(scriptURL, {

        method: "POST",
        body: JSON.stringify(data)

    })

    .then(response => response.text())

    .then(result => {

        status.classList.remove("d-none");
        status.classList.remove("alert-danger");
        status.classList.add("alert-success");

        status.innerHTML =
            "✅ Data berhasil disimpan. Terima kasih atas kunjungan Anda.";

        form.reset();

        document.getElementById("tanggal").valueAsDate = new Date();

    })

    .catch(error => {

        status.classList.remove("d-none");
        status.classList.remove("alert-success");
        status.classList.add("alert-danger");

        status.innerHTML =
            "❌ Gagal mengirim data. Silakan coba kembali.";

        console.error(error);

    })

    .finally(() => {

        tombol.disabled = false;

        tombol.innerHTML = `
            <i class="bi bi-send-fill"></i>
            Kirim Data
        `;

        setTimeout(() => {

            status.classList.add("d-none");

        }, 5000);

    });

});
