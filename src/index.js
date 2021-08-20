const { request, response } = require('express')
const express = require('express')
const app = express()

// const bodyParser = require('body-parser')

app.use(express.json())

let clients = [
    { id: 3, nome: 'Giovane Silva', telefone: '53981528366' },
    { id: 2, nome: 'Rafaela João', telefone: '53985538300' },
    { id: 1, nome: 'Bruno Silva', telefone: '53999538377' },
    { id: 4, nome: 'Maria Silva', telefone: '53984542166' },
]

function log (request, response, next) {
    const {url, method} = request;
    console.log(`${method} -  ${url} at ${new Date()}`)
    return next();
}

app.use(log)

/**
 * Retorna Todos os clientes em um só linha
 */
app.get('/clients', (request, response) => response.status(200).json(clients))


/**
 * Buscar um único Recurso
 */
app.get('/clients/:id', (request, response) => {
    const {id} = request.params;
    const client = clients.find(value => value.id == id);
    if(client == undefined) {
        response.status(400).json({erro: "Requisição inválida"});
    }else {
        response.status(200).json(client)
    }
    //response.json(clients.filter(value => value.id == request.params.id)))
})
    

/**
 * Inserir dados no servidor - BD
 */
// status 201 é status de criação
app.post('/clients', (request, response) => {
    const client = request.body
    clients.push(client)
    response.status(201).json(client)
})

/**
* Atualizar nome ded Clientes
*/
app.put('/clients/:id', (request, response) => {
    const id = request.params.id;
    const telefone = request.body.telefone;

    let client = clients.find(value => value.id == id);

    if(client == undefined){
        response.status(400).json({erro:"id não encontrado"})
    }else {
        client.telefone = telefone;
        response.status(200).json(client)
    }   
})

app.delete('/clients/:id', (request, response) => {
    const {id} = request.params;
    const index = clients.findIndex(value => value.id == id)

    if (index == -1){
        response.status(400).send();
    }else{
        clients.splice(index, 1)
        response.status(204).send();
    }
})

app.listen(3000)