// Ambil elemen form dan hasil
const form = document.getElementById('uktForm');
const result = document.getElementById('result');

// Elemen untuk riwayat pembayaran
const riwayatContainer = document.createElement('div');
riwayatContainer.id = "riwayatContainer";

// Ambil elemen hasil
const resultNama = document.getElementById('resultNama');
const resultNim = document.getElementById('resultNim');
const resultJurusan = document.getElementById('resultJurusan');
const resultJumlah = document.getElementById('resultJumlah');
const resultSlip = document.getElementById('resultSlip');

// Simpan riwayat pembayaran
const riwayatPembayaran = [];

// Fungsi untuk memformat angka menjadi format uang Indonesia
function formatRupiah(angka) {
    return "Rp " + angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// Tambahkan event listener untuk form
form.addEventListener('submit', function (event) {
    event.preventDefault(); // Mencegah reload halaman

    // Ambil data dari input
    const nama = document.getElementById('nama').value;
    const nim = document.getElementById('nim').value;
    const jurusan = document.getElementById('jurusan').value;
    let jumlah = parseFloat(document.getElementById('jumlah').value);
    const slipFile = document.getElementById('slip').files[0];

    // Format jumlah menjadi format uang Indonesia
    const jumlahFormatted = formatRupiah(jumlah);

    // Simpan riwayat pembayaran ke array
    riwayatPembayaran.push({ nama, nim, jurusan, jumlahFormatted });

    // Tampilkan data pada div hasil
    resultNama.textContent = nama;
    resultNim.textContent = nim;
    resultJurusan.textContent = jurusan;
    resultJumlah.textContent = jumlahFormatted;

    // Tampilkan gambar slip pembayaran
    const reader = new FileReader();
    reader.onload = function (e) {
        resultSlip.src = e.target.result;
    };
    reader.readAsDataURL(slipFile);

    // Tampilkan riwayat pembayaran
    renderRiwayat();

    // Sembunyikan form dan tampilkan hasil
    form.style.display = 'none';
    result.style.display = 'block';
});

// Fungsi untuk merender riwayat pembayaran
function renderRiwayat() {
    // Bersihkan kontainer riwayat
    riwayatContainer.innerHTML = '<h3>Riwayat Pembayaran:</h3>';
    const list = document.createElement('ul');

    // Tambahkan setiap riwayat ke daftar
    riwayatPembayaran.forEach((riwayat, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${index + 1}. Nama: ${riwayat.nama}, NIM: ${riwayat.nim}, Jurusan: ${riwayat.jurusan}, Jumlah: ${riwayat.jumlahFormatted}`;
        list.appendChild(listItem);
    });

    riwayatContainer.appendChild(list);
    result.appendChild(riwayatContainer);
}

// Fungsi untuk mereset form
function resetForm() {
    // Tampilkan form kembali
    form.style.display = 'block';
    result.style.display = 'none';

    // Reset form
    form.reset();
    resultSlip.src = ''; // Hapus gambar slip pembayaran
}
