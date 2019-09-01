const express = require('express');

const server = express();

server.use(express.json());

const project = [];

let numberOfRequests = 0;

server.use(function requests(req, res, next) {
    numberOfRequests++;
    console.log(`Quantidade de Requisições: ${numberOfRequests}`);
    next();
});

function checkIfIdExists(req, res, next){
    const { id } = req.params;
    
    if(!project[id]) {
        return res.status(400).json({ error: 'Project not found' });
    }

    return next();
}

server.post('/projects', (req, res) => {
    const { id } = req.body;
    const { title } = req.body;

    project.push({ "id": id, "title": title, "tasks": [] });

    return res.json(project);
});

server.get('/projects', (req, res) => {
    return res.json(project)
});

server.put('/projects/:id', checkIfIdExists, (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    project[id].title = title;

    return res.json(project);
});

server.delete('/projects/:id', checkIfIdExists, (req, res) => {
    const { id } = req.params;
    project.splice(id, 1);

    return res.send();
});

server.post('/projects/:id/tasks', checkIfIdExists, (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    project[id].tasks.push(title);

    return res.json(project);

});

server.listen('3000');