var database = require("../database/config");


function votar(idPersonagem){
    instrucaoSql = `INSERT INTO
    usuario (fk_personagem)
    VALUES (${idPersonagem})`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarUltimasMedidas(idPersonagem, limite_linhas) {
    instrucaoSql = `select nomePersonagem, 
    ROUND((count(fk_personagem) / t.total * 100),1) as porcentagem,
   count(fk_personagem) as id 
        from personagem
            join usuario
                on fk_personagem = idPersonagem,
                    ( SELECT COUNT(fk_personagem) as total from usuario) t
 group by fk_personagem`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(idPersonagem) {
    instrucaoSql = `select 
    select nomePersonagem, count(fk_personagem) as id from Personagem
    join usuario
    on fk_personagem = ${idPersonagem}
    group by fk_personagem
    order by fk_personagem`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    votar,
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal
}