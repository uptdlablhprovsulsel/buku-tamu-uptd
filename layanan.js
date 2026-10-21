
const scriptURL = "https://script.google.com/macros/s/AKfycbwUMX_T6dO2htqRAB2A5fDdxywroi3t-gUI8rEeadCJA1ng_iJJI5AB46sgTe4Eb0BZ/exec";

const complaintForm = document.getElementById("complaintForm");

if (complaintForm) {
  complaintForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    if (!this.reportValidity()) return;

    const status = document.getElementById("complaintStatus");
    const button = this.querySelector('button[type="submit"]');

    if (!status || !button) {
      console.error("Elemen status atau tombol kirim tidak ditemukan.");
      return;
    }

    const originalText = button.textContent;

    const data = {
      action: "complaint",
      nama: document.getElementById("namaPengadu").value.trim(),
      alamat: document.getElementById("alamatPengadu").value.trim(),
      hp: document.getElementById("hpPengadu").value.trim(),
      deskripsi: document.getElementById("deskripsi").value.trim(),
      harapan: document.getElementById("harapan").value.trim()
    };

    button.disabled = true;
    button.textContent = "Mengirim...";
    status.hidden = true;

    try {
      // Kirim sebagai data formulir agar Apps Script
      // dapat membaca JSON melalui e.parameter.payload.
      const formData = new URLSearchParams();
      formData.append("payload", JSON.stringify(data));

      await fetch(scriptURL, {
        method: "POST",
        mode: "no-cors",
        body: formData
      });

      status.textContent =
        "Permintaan telah dikirim. Periksa Google Sheets untuk memastikan data tersimpan.";
      status.className = "form-status";
      status.hidden = false;

    } catch (error) {
      console.error("Kesalahan pengiriman:", error);

      status.textContent =
        "Pengiriman gagal dimulai. Periksa koneksi internet dan coba kembali.";
      status.className = "form-status error";
      status.hidden = false;

    } finally {
      button.disabled = false;
      button.textContent = originalText;
    }
  });
}
