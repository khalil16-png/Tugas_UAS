📝 To-Do List App

Aplikasi To-Do List sederhana berbasis **HTML, CSS, dan JavaScript** yang memungkinkan penggunanya untuk menambahkan, menghapus, serta menandai tugas sebagai apakah sudah selesai atau belumnya. Aplikasi ini juga menyimpan data secara otomatis menggunakan **LocalStorage**, sehingga daftar tugas tetap tersimpan meskipun halaman direfresh kembali.

  🖥️ Fitur Utama:
- 📄 Menambahkan tugas baru
- ⏳ Menentukan tanggal dan waktu secara manual
- 📊 Menampilkan jumlah keseluruhan tugas
- 🌟 Menandai tugas sebagai selesai
- ❌ Menghapus tugas secara individual
- 💾 Penyimpanan menggunakan LocalStorage
- 🎨 Tampilan UI modern
- ⏱️ Input date & time yang mudah digunakan


## Teknologi yang Digunakan
- **HTML5**  
- **CSS3 (Flexbox, Gradient, Shadow)**  
- **JavaScript ES6 (DOM, Events, LocalStorage)**  

---

## Alur Algoritma (Flow)

### 1. **Inisialisasi**
- Ketika halaman dimuat (`DOMContentLoaded`), apliksi membaca data dari `localStorage`:
  - Jika ada, data dikonversi dari JSON ke array tugas.
  - Jika tidak ada data, aplikasi membuat array kosong.

### 2. **Menambahkan Tugas**
1. Pengguna mengisi:
   - Teks tugas
   - Tanggal
   - Waktu
2. Pengguna menekan tombol **Tambah**.
3. Validasi:
   - Jika teks kosong → tampilkan peringatan.
4. Jika valid:
   - Buat objek tugas baru:
   - Push ke array `tasks`.
   - Simpan array ke LocalStorage.
   - Render ulang daftar tugas.

### 3. **Menampilkan (Render) Tugas**
Untuk setiap elemen `tasks`:
- Buat `<li>` secara dinamis.
- Jika tugas sudah selesai → beri class `completed`.
- Tampilkan teks, tanggal, dan waktu.
- Tampilkan tombol **Delete**.

### 4. **Menandai Tugas Selesai**
- Jika pengguna klik elemen `<li>`, toggle:
- Simpan ulang ke LocalStorage.
- Render ulang daftar.

### 5. **Menghapus Tugas**
- Klik tombol **Delete** pada setiap item.
- Hapus dari array menggunakan `splice(index, 1)`.
- Simpan ulang LocalStorage.
- Render ulang daftar.

### 6. **Menghitung Statistik**
Setiap kali daftar dirender:
- Hitung jumlah total tugas.
- Hitung yang selesai (`completed = true`).
- Hitung yang belum selesai.
- Update tampilan.

---
