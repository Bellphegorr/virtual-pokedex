const https           = require('https'),
      mongo           = require('mongodb').MongoClient;
      PkmList         = require('../required/GetHttpList'),
      MongoConnection = require('../required/MongoConnection');


const pkmList         = new PkmList(https),
      mongoConnection = new MongoConnection(mongo);

(async () => {
    let response = await pkmList.getPkmList();
    await mongoConnection.dropPkmCollection();
    await mongoConnection.createPkmCollection();
    await mongoConnection.insertPkmCollection(response.pokemon);
    
    let response = await pkmList.getPkmInfoList();
    let pkmInfoList = await Promise.all(response).then(response => {
        for (let i in response) {
            response[i] = JSON.parse(response[i]);
            response[i].number = Number(i) + 1;
        }

        return response;
    });
    
    await mongoConnection.dropPkmInfoCollection();
    await mongoConnection.createPkmInfoCollection();
    await mongoConnection.insertPkmInfoCollection(pkmInfoList);

    console.log('Migration finished');
})();