const Physician = require("../models/Physician");
const Appointment = require("../models/Appointment")
const Sequelize = require("sequelize");

module.exports = {
    async newPhysician(req, res) {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ msg: "Dados obrigatórios não foram preenchidos.", })
        }

        const physician = await Physician.create({
            name,
            email,
            password,
        }).catch((error) => {
            return res.status(500).json({ msg: "Não foi possível inserir os dados " + error })
        })
        if (physician){
            return res.status(201).json({ msg: "Novo médico adicionado" })
        }else{
            return res.status(404).json({ msg: "Não foi possível cadastrar novo médico" })
        }
    },

    async listAllPhysician(req, res){
        const physicians = await Physician.findAll()
        .catch((error) => {
            return res.status(500).json({ msg: "Falha na conexão " + error });
        })
        if (physicians){
            if (physicians == ""){
                return res
                .status(404)
                .json({ msg: "Não foram encontrados médicos." });
            }else{
                return res.status(200).json(physicians)
            }
        }else{
            return res.status(404).json({ msg: "Não foram encontrados médicos." })
        }
    },

    async updatePhysician(req, res){
        const physicianId = req.body.id;
        const physician = req.body;
        if (!physicianId){
            return res.status(400).json({ msg: "ID do médico vazio" })
        }else{
            const physicianExists = await Physician.findByPk(physicianId);
            if (!physicianExists){
                return res.status(400).json({ msg: "Médico não encontrado" })
            }else{
                if (physician.name || physician.email || physician.password){
                    await Physician.update(physician, {
                        where: {id: physicianId}
                    })
                    return res.status(200).json({ msg: "Médico atualizado com sucesso" })
                }else{
                    return res.status(400).json({ msg: "Campos obrigatórios não preenchidos." })
                }
            }
        }

    },

    async deletePhysician(req, res){
        const physicianId = req.params.id
        const deletedPhysician = await Physician.destroy({
            where: {id: physicianId}
        }).catch(async (error) => {
            const physicianHasRef = await Appointment.findOne({
                where: {physicianId}
            }).catch((error) => {
                return res.status(500).json({ msg: "Falha na conexão " +  error})
            })
            if (physicianHasRef){
                return res.status(403).json({ msg: "Médico possui consultas em seu nome" })
            }
        })

        if (deletedPhysician != 0){
            res.status(200).json({ msg: "Médico excluído com sucesso" })
        }else{
            res.status(404).json({ msg: "Médico não encontrado" })
        }

    }
}
