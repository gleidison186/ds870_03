const express = require("express")
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.listen(process.env.SYSTEM_PORT, () => {
    console.log("Servidor rodando na porta: " + process.env.SYSTEM_PORT);
})

module.exports = app;