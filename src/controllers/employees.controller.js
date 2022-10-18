import { pool } from '../db.js'

//GET
export const getEmployees = async (req, res) => {
    try {
        const [rows] = await pool.query('select * from employee')
        //const rows = await pool.query('select * from employee')

        res.send(rows)
        //res.send(rows[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }
}
//GET ONE
export const getEmployee = async (req, res) => {
    try {
        const [rows] = await pool.query('select * from employee where id =?', [req.params.id])

        if (rows.length <= 0) return res.status(404).json({
            message: 'Employee not found'
        })

        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }
}
//CREATE(POST)
export const createEmployee = async (req, res) => {
    const { name, salary } = req.body
    try {

        //Aca tambien puede ir logica que valide los datos antes que ingresen a la base de datos

        const [rows] = await pool.query('insert into employee (name,salary) values (?,?)', [name, salary])
        res.send({
            id: rows.insertId,
            name,
            salary
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }
}
//UPDATE
export const updateEmployee = async (req, res) => {
    const { id } = req.params
    const { name, salary } = req.body
    try {
        const [result] = await pool.query('update employee set name= IFNULL(?, name), salary= IFNULL(?, salary) where id=?', [name, salary, id])//IFNULL si no recibe nada se queda con el valor que tenia

        if (result.affectedRows === 0) return res.status(404).json({
            message: "Employeee not found"
        })

        const [rows] = await pool.query('select * from employee where id=?', [id])
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            mesage: 'algo malio sal'
        })
    }
}
//DELETE
export const deleteEmployee = async (req, res) => {
    try {
        const [result] = await pool.query('delete from employee where id=?', [req.params.id])

        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'Employee not found'
        })

        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({
            mesage: 'algo malio sal'
        })
    }
}