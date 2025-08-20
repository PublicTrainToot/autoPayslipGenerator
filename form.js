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
});
