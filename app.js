const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')

const app = express()
const port = process.env.PORT || 5000

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

// MySQL
const pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'admin',
    password        : 'admin',
    database        : 'cjfwholesale'
})

// Get all shelf
app.get('/shelf', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)

        connection.query('SELECT * from shelf', (err, rows) => {
            connection.release() // return the connection to pool

            if(!err) {
                res.send(rows)
            } else {
                console.log(err)
            }

        })
    })
})


// Get all auth_permission
app.get('/auth_permission', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)

        connection.query('SELECT * from auth_permission', (err, rows) => {
            connection.release() // return the connection to pool

            if(!err) {
                res.send(rows)
            } else {
                console.log(err)
            }

        })
    })
})


// Get a beer by ID
app.get('/:id', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)

        connection.query('SELECT * from shelf WHERE id = ?', [req.params.id], (err, rows) => {
            connection.release() // return the connection to pool

            if(!err) {
                res.send(rows)
            } else {
                console.log(err)
            }

        })
    })
})

// Delete a records / beer
app.delete('/:id', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)

        connection.query('DELETE from shelf WHERE id = ?', [req.params.id], (err, rows) => {
            connection.release() // return the connection to pool

            if(!err) {
                res.send(`Beer with the Record ID: ${[req.params.id]} has been removed.`)
            } else {
                console.log(err)
            }

        })
    })
})


// Add a record / beer
app.post('', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)

        const params = req.body

        connection.query('INSERT INTO shelf SET ?', params , (err, rows) => {
            connection.release() // return the connection to pool

            if(!err) {
                res.send(`Beer with the name: ${params.name} has been added.`)
            } else {
                console.log(err)
            }

        })

        console.log(req.body)
    })
})


// Update a record / beer
app.put('', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)

        const { id, name, tagline, description, image } = req.body

        connection.query('UPDATE shelf SET name = ?, tagline = ?, description = ?, image = ? WHERE id = ?', [name, tagline, description, image, id] , (err, rows) => {
            connection.release() // return the connection to pool

            if(!err) {
                res.send(`Beer with the name: ${name} has been added.`)
            } else {
                console.log(err)
            }

        })

        console.log(req.body)
    })
})



// Listen on enviroment port or 5000
app.listen(port, () => console.log(`Listen on port ${port}`))