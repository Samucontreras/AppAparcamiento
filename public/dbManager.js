const { response } = require('express');
const db = require('./db');

const insertCar = async (ID_Plaza, matricula) => {
    try {
        const respuesta = await new Promise((resolve, reject) => {
            db.query(
                "UPDATE Plazas SET Matricula = ? WHERE id_plaza = ?",
                [matricula, ID_Plaza],
                (err, res) => {
                    if (err) reject(err)
                    else resolve(res);
                }
            );
        });

    } catch (error) {
        console.error('ERROR INTRODUCING CAR, ERROR CODE: ' + error.message);
    }
}

const getData = async () => {
    try {
        const respuesta = await new Promise((resolve, reject) => {
            db.query(
                "SELECT * FROM Plazas",
                [],
                (err, res) => {
                    if (err) reject(err)
                    else resolve(res);
                }
            )
        });

        return (respuesta);
    } catch (error) {
        
    }
}

const exitCar = async (ID_Plaza) => {
    try {
        const respuesta = await new Promise((resolve, reject) => {
            db.query(
                "UPDATE Plazas SET Matricula = null WHERE id_plaza = ?",
                [ID_Plaza],
                (err, res) => {
                    if (err) reject(err)
                    else resolve(res);
                }
            );
        });

    } catch (error) {
        console.error('ERROR EXIT CAR, ERROR CODE: ' + error.message);
    }
}

const getMoney = async () => {
    try {
        const respuesta = await new Promise((resolve, reject) => {
            db.query(
                `SELECT SUM(Importe) AS SumaImportes
                FROM Tickets
                WHERE DATE(Inicio)=CURDATE();`,
                [],
                (err, res) => {
                    if (err) reject(err)
                    else resolve(res);
                }
            )
        });
        return respuesta[0].SumaImportes;
    } catch (error) {
    }
}

module.exports = {getData, insertCar, exitCar}