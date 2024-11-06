const { Router} = require("express");

const router = Router();

router.get('/', (req, res) => {
    res.send('Bienvenido index.js');
}); 



module.exports = router; 