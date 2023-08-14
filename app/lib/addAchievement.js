export default function addAchievement(email, achievement) {
    fetch('/api/user/achievements', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, achievement }),
    });
}
