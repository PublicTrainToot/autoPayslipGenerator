document.addEventListener("DOMContentLoaded", () => {
    const currencyInputs = document.querySelectorAll(".currency");
    const subtotalGajiElement = document.getElementById("subtotalGaji");
    const totalGajiElement = document.getElementById("totalGaji");

    // Format number into Rupiah
    function formatRupiah(value) {
        const number = Number(value.replace(/\D/g, "")); // strip non-digits
        if (!number) return "";
        return "Rp. " + number.toLocaleString("id-ID");
    }

    // Remove Rp. and commas to get raw number
    function parseRupiah(value) {
        return Number(value.replace(/\D/g, "")) || 0;
    }

    function updateTotal() {
        let total = 0;
        currencyInputs.forEach(input => {
            total += parseRupiah(input.value);
        });
        subtotalGajiElement.textContent = "Rp " + total.toLocaleString("id-ID");
    }

    // Event listeners for all inputs
    currencyInputs.forEach(input => {
        input.addEventListener("input", (e) => {
            const cursorPosition = input.selectionStart;
            const rawValue = input.value;
            
            input.value = formatRupiah(rawValue);
            
            updateTotal();
        });

        // Ensure it’s formatted on blur too
        input.addEventListener("blur", () => {
            input.value = formatRupiah(input.value);
        });

     // 🚀 Clear button logic
    clearButton.addEventListener("click", () => {
        currencyInputs.forEach(input => {
            input.value = ""; // empty each field
        });
        subtotalGajiElement.textContent = "Rp 0"; // reset subtotal
    });
    });
});
