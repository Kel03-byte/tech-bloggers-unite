// Formats the Date to display on the site - used in Posts and Comments

module.exports = {
    format_time: (date) => {
        return date.toLocaleTimeString();
    },

    format_date: (date) => {
        return `${new Date(date).getDate()}/${new Date(date).getMonth() + 1}/${new Date(date).getFullYear()
            }`;
    }
};