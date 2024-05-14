const mataKuliah = document.getElementById('mata-kuliah')
const settingTambah = document.getElementById('setting-tambah')
const tambah = document.getElementById('tambah')

tambah.addEventListener('click', () => {
    settingTambah.style.display = "block"
    tambah.style.display = 'none'
})

function mataKuliahBaru(namaMatkul, jumlahAbsenMatkul) {
    const tabelKuliah = document.getElementById('kumpulan-mata-kuliah').getElementsByTagName('tbody')[0]
    const kolomBaru = tabelKuliah.insertRow()
    const matkul = kolomBaru.insertCell(0)
    const jumlahAbsen = kolomBaru.insertCell(1)
    matkul.textContent = namaMatkul
    jumlahAbsen.textContent = jumlahAbsenMatkul
}

function oke() {
    const namaMatkulInput = document.getElementById('input-nama-matkul')
    const namaMatkul = namaMatkulInput.value
    if (namaMatkul.trim() !== '') {
        mataKuliahBaru(namaMatkul, 0)
        settingTambah.style.display = "none"
        tambah.style.display = "flex"
        namaMatkulInput.value = ''
    } else {
        alert('Nama mata kuliah tidak boleh kosong')
    }
}

function batal() {
    settingTambah.style.display = "none"
    tambah.style.display = "flex"
}
