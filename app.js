// importazioni del Framework Express
const express = require('express');
const postRouter = require('./routers/post');

const app = express();
const port = 3000;

//1. Configurazione di activ static public
app.use(express.static('public'));

//2. Rutta radice basic per comprovare il server
app.get('/', (req, res) => {
  res.send('Server del mio Blog');
});

//3 Registro delle rutte sotto il prefisso '/post'
app.use('/post', postRouter);

// 4. Avvio del server
app.listen(port, () => {
  console.log(`Il server è attivo e ascolta sulla porta http://localhost:${port}`)
})