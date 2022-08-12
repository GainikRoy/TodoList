exports.getdate = ()=> {
    const date = new Date();
    const option = {
        weekday: 'long',
        years: 'numeric',
        month: 'long',
        day: 'numeric'
    }
    return date.toLocaleString("en-US", option);
}