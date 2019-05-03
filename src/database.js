const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, { // Conectandonos a la base de datos
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
})
.then(db => { console.log('DB Conectada'); }).catch(err => { console.error(err); });