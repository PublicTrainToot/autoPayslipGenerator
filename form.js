document.addEventListener("DOMContentLoaded", () => {
    const inputs = document.querySelectorAll("#payslipFormBottom input[type='number']");
    const totalGajiElement = document.getElementById("subtotalGaji");

    function updateTotal() {
        let total = 0;
        inputs.forEach(input => {
            total += Number(input.value) || 0;
        });
        totalGajiElement.textContent = "Rp " + total.toLocaleString("id-ID");
    }

    inputs.forEach(input => {
        input.addEventListener("input", updateTotal);
    });
});
