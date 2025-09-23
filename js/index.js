
      const correctPassword = "150825";
      const display = document.getElementById("inputDisplay");
      const errorMessage = document.getElementById("errorMessage");
      let input = "";
      let displayState = "";
      let failedAttempts = 0;
      
      function enterDigit(digit) {
        if (input.length < 6) {
          input += digit;
          // Mostrar solo el nuevo dígito por 300ms
          const tempDisplay = "•".repeat(input.length - 1) + digit;
          display.textContent = tempDisplay;
          
          setTimeout(() => {
            // Ocultar el dígito con punto
            displayState = "•".repeat(input.length);
            display.textContent = displayState;
          }, 300);
          
          errorMessage.style.display = "none";
        }
        if (input.length === 6) {
          if (input === correctPassword) {
            window.location.href = "flower.html"; 
          } else {
            failedAttempts++;
            if (failedAttempts >= 3) {
              errorMessage.textContent = "Pista: Es el día en que nos conocimos, con el formato dd/mes/25";
            } else {
              errorMessage.textContent = "Es incorrecta amor";
            }
            errorMessage.style.display = "block";
            input = "";
            displayState = "";
            display.textContent = "";
          }
        }
      }
      
      function deleteDigit() {
        if (input.length > 0) {
          input = input.slice(0, -1);
          displayState = "•".repeat(input.length);
          display.textContent = displayState;
          errorMessage.style.display = "none";
        }
      }
      
      // Inicializar display vacío
      display.textContent = "";
    