const DataBase = require ("../db/config")

module.exports = {
    
    async create(req, res){
        const db = await DataBase()
        const pass = req.body.password
        let roomId
        let isRoom = true

        while(isRoom){
            /*Gera numero da sala */
            for(var i = 0; i < 6; i++){

                i == 0 ? roomId = Math.floor(Math.random() * 10).toString() :
                roomId += Math.floor(Math.random() * 10).toString()
            }

            /*Verifica se esse numero já existe */
            const roomsExistIds = await db.all(`SELECT id FROM rooms`)
            isRoom = roomsExistIds.some(roomExistIds => roomExistIds === roomId)
            
            /*Inseri a sala no banco */
            if(!isRoom){
                await db.run(`INSERT INTO rooms (
                    id,
                    pass
                ) VALUES (
                    ${parseInt(roomId)},
                    ${pass}
                )`)
            }
        }

        await db.close()

        res.redirect(`/room/${roomId}`)
    },

    async open(req,res){
        const db = await DataBase()
        let roomId = req.params.room
        const questions = await db.all(`SELECT * FROM questions WHERE room = ${roomId} and read = 0`)
        const questionsReade = await db.all(`SELECT * FROM questions WHERE room = ${roomId} and read = 1`)
        let isNoQuestions

        if(questions.length == 0){
            if(questionsReade.length == 0){
                isNoQuestions = true
            }
        }
        
        res.render("room", {roomId: roomId, questions: questions, questionsReade: questionsReade, isNoQuestions: isNoQuestions})
    },

    enter(req, res){
        const roomId = req.body.roomId

        res.redirect(`/room/${roomId}`)
    }
}