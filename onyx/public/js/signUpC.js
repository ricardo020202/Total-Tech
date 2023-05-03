const password = document.getElementById('newPassword');
const confirmPassword = document.getElementById('confirmPassword');
const message = document.getElementById('passwordMessage');
const button = document.getElementById('changePassword');

function validatePassword() {
	if (password.value !== confirmPassword.value) {
		message.textContent = 'Las contraseñas no coinciden';
		message.style.color = 'red';
        button.disabled = true;
	} else if (password.value.length < 8) {
		message.textContent = 'La contraseña debe tener al menos 8 caracteres';
		message.style.color = 'red';
        button.disabled = true;
	} else if (!/[A-Z]/.test(password.value)) {
		message.textContent = 'La contraseña debe tener al menos una letra mayúscula';
		message.style.color = 'red';
        button.disabled = true;
	} else if (!/[a-z]/.test(password.value)) {
		message.textContent = 'La contraseña debe tener al menos una letra minúscula';
		message.style.color = 'red';
        button.disabled = true;
	} else if (!/[0-9]/.test(password.value)) {
		message.textContent = 'La contraseña debe tener al menos un número';
		message.style.color = 'red';
        button.disabled = true;
	} else {
		message.textContent = 'La contraseña es válida';
		message.style.color = 'green';
        button.disabled = false;
	}
}

confirmPassword.addEventListener('input', validatePassword);
password.addEventListener('input', validatePassword);
