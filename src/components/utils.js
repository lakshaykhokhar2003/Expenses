export const getDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
        day: '2-digit', month: 'short', year: 'numeric',
    });
}

export const daysLeft = (date) => {
    const today = new Date();
    const deadline = new Date(date);
    const diff = deadline.getTime() - today.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return Math.max(0, days); // Ensure the result is not less than 0
};
