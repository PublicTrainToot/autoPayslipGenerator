document.addEventListener("DOMContentLoaded", () => {
    const currencyInputs = document.querySelectorAll(".currency");
    const potonganInputs = document.querySelectorAll(".currencyPotongan");

    const clearButtons = document.querySelectorAll("#clearButton"); // careful, you have 2 clear buttons
    const potonganClearButtons = document.querySelectorAll("#potonganClearButton"); // careful, you have 2 clear buttons
    const subtotalGajiElement = document.getElementById("subtotalGaji");
    const totalGajiElement = document.getElementById("totalGaji");

    // Format number into Rupiah
    function formatRupiah(value) {
        const number = Number(value.replace(/\D/g, ""));
        if (!number) return "";
        return "Rp " + number.toLocaleString("id-ID");
    }

    function parseRupiah(value) {
        return Number(value.replace(/\D/g, "")) || 0;
    }

    function hitungSubtotalGaji() {
        let subtotal = 0;
        currencyInputs.forEach(input => {
            subtotal += parseRupiah(input.value);
        });
        return subtotal;
    }

    function hitungTotalPotongan() {
        let potongan = 0;
        potonganInputs.forEach(input => {
            potongan += parseRupiah(input.value);
        });
        return potongan;
    }

    function updateTotals() {
        const subtotal = hitungSubtotalGaji();
        const potongan = hitungTotalPotongan();
        const total = subtotal - potongan;
        const totalPotonganElement = document.getElementById("totalPotongan");

        totalPotonganElement.textContent = "Rp " + potongan.toLocaleString("id-ID");
        subtotalGajiElement.textContent = "Rp " + subtotal.toLocaleString("id-ID");
        totalGajiElement.textContent = "Rp " + total.toLocaleString("id-ID");
    }

    // Attach input listeners for gaji
    currencyInputs.forEach(input => {
        input.addEventListener("input", () => {
            input.value = formatRupiah(input.value);
            updateTotals();
        });
        input.addEventListener("blur", () => {
            input.value = formatRupiah(input.value);
        });
    });

    // Attach input listeners for potongan
    potonganInputs.forEach(input => {
        input.addEventListener("input", () => {
            input.value = formatRupiah(input.value);
            updateTotals();
        });
        input.addEventListener("blur", () => {
            input.value = formatRupiah(input.value);
        });
    });

    // Clear buttons
    clearButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            currencyInputs.forEach(input => input.value = ""); // ONLY gaji inputs
            updateTotals();
        });
    });

    potonganClearButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            potonganInputs.forEach(input => input.value = ""); // ONLY potongan inputs
            updateTotals();
        });
    });

    function shakeInput(inputEl) {
        inputEl.classList.add("shake");
        setTimeout(() => inputEl.classList.remove("shake"), 300);
    }

    const yearSelect = document.getElementById("periodeGajiTahun");
    const currentYear = new Date().getFullYear();

    for (let year = 2000; year <= currentYear + 10; year++) {
        const option = document.createElement("option");
        option.value = year;
        option.textContent = year;
        yearSelect.appendChild(option);
    }

    function validateFormFields() {
        let isValid = true;
        let firstInvalidInput = null;

        const nama = document.getElementById("nama");
        const bulan = document.getElementById("bulan");
        const tahun = document.getElementById("periodeGajiTahun");
        const jabatan = document.getElementById("jabatan")

        const errorNama = document.getElementById("errorNama");
        const errorBulan = document.getElementById("errorBulan");
        const errorTahun = document.getElementById("errorTahun");
        const errorJabatan = document.getElementById("errorJabatan")

        function handleInvalid(input, errorBox) {
            errorBox.textContent = "*Kolom ini harus diisi 🙃";
            errorBox.style.display = "block";
            shakeInput(input);
            if (!firstInvalidInput) {
                firstInvalidInput = input;
            }
            isValid = false;
    }

    function clearError(errorBox) {
        errorBox.textContent = "";
        errorBox.style.display = "none";
    }

    // 💡 Define reusable name formatter
    function formatName(str) {
        return str
            .replace(/\s+/g, ' ')         // collapse multiple spaces
            .trim()                       // remove leading/trailing spaces
            .toLowerCase()               // lowercase all
            .replace(/\b\w/g, c => c.toUpperCase());  // capitalize first letter of each word
    }

    // 💡 Name validation inside your validateFormFields()
    const namePattern = /^[A-Za-z\s]+$/;
    if (nama.value.trim() === "") {
        handleInvalid(nama, errorNama);
    } else if (!namePattern.test(nama.value.trim())) {
        errorNama.textContent = "*Nama hanya boleh huruf dan spasi 😐";
        errorNama.style.display = "block";
        shakeInput(nama);
        if (!firstInvalidInput) firstInvalidInput = nama;
        isValid = false;
    } else {
        nama.value = formatName(nama.value);  // ← Auto-format it
        clearError(errorNama);
    }
    // 💡 Make it auto-correct as user types away and leaves the field
    nama.addEventListener("blur", () => {
        nama.value = formatName(nama.value);
    });


    if (bulan.value.trim() === "") {
        handleInvalid(bulan, errorBulan);
    } else {
        clearError(errorBulan);
    }

    if (tahun.value.trim() === "") {
        handleInvalid(tahun, errorTahun);
    } else {
        clearError(errorTahun);
    }

     if (jabatan.value.trim() === "") {
        handleInvalid(jabatan, errorJabatan);
    } else {
        clearError(errorJabatan);
    }

    return { isValid, firstInvalidInput };
    }

    function download_pdf() {
        const pdfElement = document.getElementById("payslipPDF");

        // Get user inputs
        const name = document.getElementById("nama").value.trim().replace(/\s+/g, '_'); // Replace spaces
        const month = document.getElementById("bulan").value.trim();
        const year = document.getElementById("periodeGajiTahun").value.trim();

        // Sanitize and build filename
        const filename = `${name || 'nama'}-${month || 'bulan'}-${year || 'tahun'}.pdf`;

        const opt = {
            margin:       0,
            filename:     filename,
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  {
                scale: 1.25,
                useCORS: true,
                scrollY: 0
            },
            jsPDF:        { unit: 'pt', format: [595.28, 841.89] }, // A4 in points
            pagebreak:    { mode: ['avoid-all', 'css', 'legacy'] }
        };

        html2pdf().set(opt)
        .from(pdfElement)
        .save();
    }

    function fillPayslipContent(){
        document.getElementById("outNama").textContent = document.getElementById("nama").value;
        document.getElementById("outNamaTtd").textContent = document.getElementById("nama").value;
        document.getElementById("outJabatan").textContent = document.getElementById("jabatan").value;
        document.getElementById("outBulan").textContent = document.getElementById("bulan").value;
        document.getElementById("outTahun").textContent = document.getElementById("periodeGajiTahun").value;
            

        // Gaji components
        document.getElementById("outGajiPokok").textContent = document.getElementById("gajiPokok").value;
        document.getElementById("outTunjanganStruktural").textContent = document.getElementById("tunjanganStruktural").value;
        document.getElementById("outTunjanganFungsional").textContent = document.getElementById("tunjanganFungsional").value;
        document.getElementById("outTunjanganKehadiran").textContent = document.getElementById("tunjanganKehadiran").value;
        document.getElementById("outInsentif").textContent = document.getElementById("Insentif").value;
        document.getElementById("outOnCall").textContent = document.getElementById("onCall").value;
        document.getElementById("outLembur").textContent = document.getElementById("lembur").value;
        document.getElementById("outLainLain").textContent = document.getElementById("lainLain").value;

        // Subtotal + Totals
        document.getElementById("outSubtotal").textContent = subtotalGajiElement.textContent;
        document.getElementById("outTotalPotongan").textContent = document.getElementById("totalPotongan").textContent;
        document.getElementById("outTotalGaji").textContent = totalGajiElement.textContent;

        // Potongan
        document.getElementById("outBpjsKetenagakerjaan").textContent = document.getElementById("bpjsKetenagakerjaan").value;
        document.getElementById("outBpjsKesehatan").textContent = document.getElementById("bpjsKesehatan").value;
        document.getElementById("outBpjsKesehatanKeluargaTambahan").textContent = document.getElementById("bpjsKesehatanKeluargaTambahan").value;
        document.getElementById("outAbsensiKeterlambatan").textContent = document.getElementById("absensiKeterlambatan").value;
        document.getElementById("outAbsensiKetidakhadiranSakit").textContent = document.getElementById("absensiKetidakhadiranSakit").value;
        document.getElementById("outDendaKetidakhadiran").textContent = document.getElementById("dendaKetidakhadiran").value;
        document.getElementById("outTagihan").textContent = document.getElementById("tagihan").value;
        document.getElementById("outKoperasi").textContent = document.getElementById("koperasi").value;
        document.getElementById("outPPH21").textContent = document.getElementById("pph21").value;
    };

    const btnGenerate = document.getElementById("generatePayslip");
    const btnDownload = document.getElementById("downloadPayslip");

    btnGenerate.addEventListener("click", () => {
        const validation = validateFormFields();

        if (validation.isValid) {
            fillPayslipContent();
            document.getElementById("payslipPDF").style.display = "block";
            document.getElementById("pdfWrapper").style.display = "block";
        } else {
            validation.firstInvalidInput.scrollIntoView({ behavior: "smooth", block: "center" });
            validation.firstInvalidInput.focus();
            alert("Kolom diatas tidak boleh kosong 🫠");
        }   
    });
});        
