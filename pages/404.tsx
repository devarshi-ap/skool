export default function Custom404() {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                margin: '2rem',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                fontFamily: 'monospace'
            }}
        >
            <h1>Ahoy matey! This here be a 404 page 🏴‍☠️.</h1>
            <h2>The API entrypoint is @ <a href="https://skool-rest-api.herokuapp.com/api/">/api</a></h2>
        </div>
    );
}
