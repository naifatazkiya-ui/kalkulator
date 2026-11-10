const display = document.getElementById('display');
let currentInput = '0';
let shouldReset = false;

function updateDisplay() {
  display.textContent = currentInput;
}

document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const value = btn.dataset.value;

    // Tombol C
    if (btn.classList.contains('clear')) {
      currentInput = '0';
      updateDisplay();
      return;
    }
    // Tombol Hapus
    if (btn.classList.contains('delete')) {
      currentInput = currentInput.slice(0, -1) || '0';
      updateDisplay();
      return;
    }
    // Tombol =
    if (btn.classList.contains('equals')) {
      try {
        // ganti ÷ dan × biar bisa dihitung
        let result = eval(currentInput.replace(/%/g, '/100'));
        currentInput = String(result);
      } catch {
        currentInput = 'Error';
      }
      shouldReset = true;
      updateDisplay();
      return;
    }

    if (shouldReset && !isNaN(value)) {
      currentInput = '';
      shouldReset = false;
    }
    if (currentInput === '0' && value !== '.') currentInput = '';
    if (value) {
      currentInput += value;
      shouldReset = false;
      updateDisplay();
    }
  });
});