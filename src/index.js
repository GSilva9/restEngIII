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

/**
 * Retorna Todos os clientes em um só linha
 */
app.get('/clients', (request, response) => response.json(clients))


/**
 * Buscar um único Recurso
 */
app.get('/clients/:id', (request, response) => response.json(clients.filter(value => value.id == request.params.id)))
    

/**
 * Inserir dados no servidor - BD
 */

app.post('/clients', (request, response) => {
    const client = request.body
    clients.push(client)
    response.json(client)
})

/**
* Atualizar nome ded Clientes
*/

app.put('/clients/:id', (request, response) => {
    const id = request.params.id;
    const telefone = request.body.telefone;

    let client = clients.filter(value => value.id == id);

    client[0].telefone = telefone;

    response.json(client[0])
})

app.delete('/clients/:id', (request, response) => {
    const id = request.params.id;
    clients = clients.filter(value => value.id != id);
    response.json(clients)
})

app.listen(3000)