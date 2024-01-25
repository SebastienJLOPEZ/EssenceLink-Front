export default function truncateEmail(email) {
    if (!email) return '';
    const atIndex = email.indexOf('@');
    if (atIndex !== -1) {
        const firstThird = Math.ceil(atIndex / 3);
        return email.substring(0, firstThird) + '...@' + email.substring(atIndex + 1);
    } else {
        return email;
    }
}