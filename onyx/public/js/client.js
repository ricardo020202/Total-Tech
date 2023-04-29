gapi.load('auth2', function() {
    // Inicializa Google Sign-In
    gapi.auth2.init({
        client_id: '141860110384-4rkak3dc4oehtdj46ogd2aufa9vf34le.apps.googleusercontent.com',
    });
});

function onSignIn(googleUser) {
    // Obtén el ID token del usuario que inició sesión
    const id_token = googleUser.getAuthResponse().id_token;

    // Envía el ID token al lado del servidor a través de una solicitud POST
    fetch('/auth/google/callback', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ idtoken: id_token }),
    })
    .then(response => {
        if (response.ok) {
            console.log('ID Token enviado correctamente al servidor');
        } else {
            console.error('Error al enviar el ID Token al servidor');
        }
    })
    .catch(error => {
        console.error('Error al enviar el ID Token al servidor:', error);
    });
}
