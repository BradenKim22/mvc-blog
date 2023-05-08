// Helper for Dates posted for blogs/comments
// Helpers to validate user's own blogs
module.exports = {
    format_date: (date) => {
        return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()
            }`;
    },
    user_validate: (user) => {
        
    }
}