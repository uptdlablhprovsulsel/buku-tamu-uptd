const scriptURL = "https://uptdlablhprovsulsel.github.io/buku-tamu-uptd/";

const complaintForm = document.getElementById("complaintForm");

if (complaintForm) {
  complaintForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    if (!this.reportValidity()) return;

    const status = document.getElementById("complaintStatus");
    const button = this.querySelector('button[type="submit"]');
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
      await fetch(scriptURL, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify(data)
      });

      status.textContent =
        "Permintaan pengiriman telah dilakukan. Periksa Google Sheets untuk memastikan data tersimpan.";
      status.className = "form-status";
      status.hidden = false;

      // Form tidak langsung dikosongkan supaya pengguna
      // dapat menyalin data jika perlu melakukan pengiriman ulang.
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
