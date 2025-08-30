document.addEventListener("DOMContentLoaded", () => {
    const currencyInputs = document.querySelectorAll(".currency");
    const potonganInputs = document.querySelectorAll(".currencyPotongan");

    const clearButtons = document.querySelectorAll("#clearButton"); // careful, you have 2 clear buttons
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
            [...currencyInputs, ...potonganInputs].forEach(input => input.value = "");
            subtotalGajiElement.textContent = "Rp 0";
            totalGajiElement.textContent = "Rp 0";
        });
    });

        const btnGenerate = document.getElementById("generatePayslip");
        const btnDownload = document.getElementById("downloadPayslip");

        btnGenerate.addEventListener("click", () => {
            // Fill text fields
            document.getElementById("outNama").textContent = document.getElementById("nama").value;
            document.getElementById("outNamaTtd").textContent = document.getElementById("nama").value;
            document.getElementById("outJabatan").textContent = document.getElementById("jabatan").value;
            document.getElementById("outBulan").textContent = document.getElementById("bulan").value;
            document.getElementById("outTahun").textContent = document.getElementById("periodeGajiTahun").value;
            

            // Gaji components
            document.getElementById("outGajiPokok").textContent = document.getElementById("gajiPokok").value;
            document.getElementById("outTunjanganStruktural").textContent = document.getElementById("tunjanganStruktural").value;
            document.getElementById("outTunjanganFungsional").textContent = document.getElementById("tunjanganFungsional").value;
            document.getElementById("outTunjanganKehadiran").textContent = document.getElementById("tunjangankehadiran").value;
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

            // Show for preview
            document.getElementById("payslipPDF").style.display = "block";
        });

        btnDownload.addEventListener("click", () => {
            const element = document.getElementById("payslipPDF");
            html2pdf()
                .set({ margin: 10, filename: "slip-gaji.pdf", image: { type: "jpeg", quality: 0.98 }, html2canvas: { scale: 2 }, jsPDF: { unit: "mm", format: "a4", orientation: "portrait" } })
                .from(element)
                .save();
        });
});
