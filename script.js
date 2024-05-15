const mataKuliah = document.getElementById('mata-kuliah');
        const settingTambah = document.getElementById('setting-tambah');
        const tambah = document.getElementById('tambah');
        const editButton = document.getElementById('edit');
        const saveButton = document.getElementById('simpan');
        let editingRow = null;
        let isEditing = false;

        document.addEventListener('DOMContentLoaded', () => {
            loadFromCookies();
        });

        tambah.addEventListener('click', () => {
            settingTambah.style.display = "block";
            tambah.style.display = 'none';
            editButton.style.display = 'none';
            saveButton.style.display = 'none';
            editingRow = null;
        });

        editButton.addEventListener('click', () => {
            isEditing = true;
            const rows = document.querySelectorAll('#kumpulan-mata-kuliah tbody tr');
            rows.forEach(row => {
                row.cells[0].contentEditable = true;
                row.cells[1].querySelector('.edit-buttons-kurang').style.display = 'flex';
                row.cells[1].querySelector('.edit-buttons-tambah').style.display = 'flex';
                row.cells[1].querySelector('.hapus').style.display = 'flex';
            });
            editButton.style.display = 'none';
            saveButton.style.display = 'flex';
        });

        saveButton.addEventListener('click', () => {
            isEditing = false;
            const rows = document.querySelectorAll('#kumpulan-mata-kuliah tbody tr');
            rows.forEach(row => {
                row.cells[0].contentEditable = false;
                row.cells[1].querySelector('.edit-buttons-kurang').style.display = 'none';
                row.cells[1].querySelector('.edit-buttons-tambah').style.display = 'none';
                row.cells[1].querySelector('.hapus').style.display = 'none';
            });
            if (document.querySelectorAll('#kumpulan-mata-kuliah tbody tr').length === 0) {
                editButton.style.display = 'none';
                saveButton.style.display = 'none';
            } else {
                editButton.style.display = 'flex';
                saveButton.style.display = 'none';
            }
            saveToCookies();
        });

        function mataKuliahBaru(namaMatkul, jumlahAbsenMatkul) {
            const tabelKuliah = document.getElementById('kumpulan-mata-kuliah').getElementsByTagName('tbody')[0];
            const kolomBaru = tabelKuliah.insertRow();
            const matkul = kolomBaru.insertCell(0);
            const jumlahAbsen = kolomBaru.insertCell(1);
            matkul.textContent = namaMatkul;
            jumlahAbsen.innerHTML = `
            <div class="flex items-center justify-center gap-2">
                <div class="edit-buttons-kurang hidden">
                    <button class="bg-gray-600 text-white px-2 py-1 rounded" onclick="decrementAbsen(this)">-</button>
                </div>
                <span class="absen-count">${jumlahAbsenMatkul}</span>
                <div class="edit-buttons-tambah hidden">
                    <button class="bg-gray-600 text-white px-2 py-1 rounded" onclick="incrementAbsen(this)">+</button>
                </div>
                <div class="hapus hidden">
                    <button class="bg-gray-600 text-white px-2 py-1 rounded" onclick="hapus(this)">🗑️</button>
                </div>
            </div>

            `;
            if (!isEditing) {
                editButton.style.display = 'flex';
            }
            saveToCookies();
        }

        function oke() {
            const namaMatkulInput = document.getElementById('input-nama-matkul');
            const namaMatkul = namaMatkulInput.value;
            if (namaMatkul.trim() !== '') {
                if (editingRow) {
                    editingRow.cells[0].textContent = namaMatkul;
                } else {
                    mataKuliahBaru(namaMatkul, 0);
                }
                settingTambah.style.display = "none";
                tambah.style.display = "flex";
                namaMatkulInput.value = '';
                editingRow = null;
                saveToCookies();
            } else {
                alert('Nama mata kuliah tidak boleh kosong');
            }
        }

        function batal() {
            settingTambah.style.display = "none";
            tambah.style.display = "flex";
            editingRow = null;
        }

        function incrementAbsen(button) {
            if (isEditing) {
                const span = button.parentElement.previousElementSibling;
                span.textContent = parseInt(span.textContent) + 1;
                saveToCookies();
            }
        }

        function decrementAbsen(button) {
            if (isEditing) {
                const span = button.parentElement.nextElementSibling;
                span.textContent = Math.max(0, parseInt(span.textContent) - 1);
                saveToCookies();
            }
        }

        function hapus(button) {
            const row = button.parentElement.parentElement.parentElement.parentElement;
            row.parentElement.removeChild(row);
            saveToCookies();
        }


        function saveToCookies() {
            const tabelKuliah = document.getElementById('kumpulan-mata-kuliah').getElementsByTagName('tbody')[0];
            const rows = Array.from(tabelKuliah.rows);
            const mataKuliahData = rows.map(row => ({
                nama: row.cells[0].textContent,
                absen: row.cells[1].querySelector('.absen-count').textContent
            }));
            document.cookie = `mataKuliahData=${JSON.stringify(mataKuliahData)};path=/;max-age=${60*60*24*365}`;
        }

        function loadFromCookies() {
            const cookieData = document.cookie.split('; ').find(row => row.startsWith('mataKuliahData='));
            if (cookieData) {
                const mataKuliahData = JSON.parse(cookieData.split('=')[1]);
                mataKuliahData.forEach(matkul => mataKuliahBaru(matkul.nama, matkul.absen));
            }
        }