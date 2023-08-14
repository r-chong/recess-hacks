export default function sendMessage({ recieverEmail }) {
    const userEmail = localStorage.getItem('email');
    // Given the two emails, connect them
    return fetch('/api/chat/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            people: [userEmail, recieverEmail],
        }),
    }).then((res) => {
        if (res.status === 201) {
            return true;
        } else {
            return false;
        }
    });
}
