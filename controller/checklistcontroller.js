const express = require('express');
const router = express.Router();
const checklist = require('../src/models/checklist');

router.get('/', async (req, res) => {
    res.json(await checklist.find());
});

router.get('/:id', async (req, res) => {
    res.json(await checklist.findById(req.params.id));
});

router.post('/', async (req, res) => {
    res.json(await new checklist(req.body).save());
});

router.put('/:id', async (req, res) => {
    res.json(await checklist.fingByIdAndUpdate(req.params.id, req.body));
});

router.delete('/:id', async (req, res) => {
    res.json(await checklist.findByIdAndRemove(req.params.id));
});

module.exports = router;
