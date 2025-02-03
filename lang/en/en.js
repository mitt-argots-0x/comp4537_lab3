module.exports = {
    greet: function(name, time) {
        return `<h2 style="color: blue;">Hello ${name}, What a beautiful day. Server current date and time is ${time}</h2>`
    },
    successWritten: "File has been successfully written",
    failWritten: "text: empty error",
    err404: "File not found",
    err500: "Server error"
};