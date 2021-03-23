module.exports = class MongoConnection {
    constructor(mongo) {
        this.mongo = mongo
        this.url = 'mongodb://localhost:27017/pkmdb';
    }
      

    openConnection(actionDb) {
        this.mongo.connect(this.url, (err, db) => {
            if (err) {
                throw err;
            }

            actionDb(db);
        });
    }


    createPkmCollection() {
        return new Promise(resolve => {
            function createCollection(db) {
                const pkmDb = db.db("pkmdb");
    
                pkmDb.createCollection("pkm", function(err, res) {
                    if (err) {
                        console.log('Collection already exists');
                    }
    
                    console.log("Collection created!");
                    db.close();
                    resolve();
                });
            }
    
            this.openConnection(createCollection);
        }); 
    }


    insertPkmCollection(pkmList) {
        return new Promise(resolve => {
            function insertIntoCollection(db) {
                const pkmDb = db.db("pkmdb");
    
                pkmDb.collection("pkm").insertMany(pkmList, (err, res) => {
                    if (err) {
                        throw err;
                    }
    
                    console.log("Number of documents inserted: " + res.insertedCount);
                    db.close();
                    resolve();
                });           
            }
    
            this.openConnection(insertIntoCollection);
        });
    }


    dropPkmCollection() {
        return new Promise(resolve => {
            function dropCollection(db) {
                const pkmDb = db.db("pkmdb");
    
                pkmDb.collection("pkm").drop((err, res) => {
    
                    if (err) {
                        console.log('Collection does not exists');
                    }
    
                    if (res) {
                        console.log("Collection deleted");
                    }
                    
                    db.close();
                    resolve();
                });
            }
    
            this.openConnection(dropCollection);
        }); 
    }

    createPkmInfoCollection() {
        return new Promise(resolve => {
            function createCollection(db) {
                const pkmDb = db.db("pkmdb");
    
                pkmDb.createCollection("pkmInfo", function(err, res) {
                    if (err) {
                        console.log('Collection already exists');
                    }
    
                    console.log("Collection created!");
                    db.close();
                    resolve();
                });
            }
    
            this.openConnection(createCollection);
        }); 
    }

    insertPkmInfoCollection(pkmInfoList) {
        return new Promise(resolve => {
            function insertIntoCollection(db) {
                const pkmDb = db.db("pkmdb");
    
                pkmDb.collection("pkmInfo").insertMany(pkmInfoList, (err, res) => {
                    if (err) {
                        throw err;
                    }
    
                    console.log("Number of documents inserted: " + res.insertedCount);
                    db.close();
                    resolve();
                });           
            }
    
            this.openConnection(insertIntoCollection);
        });
    }

    dropPkmInfoCollection() {
        return new Promise(resolve => {
            function dropCollection(db) {
                const pkmDb = db.db("pkmdb");
    
                pkmDb.collection("pkmInfo").drop((err, res) => {
    
                    if (err) {
                        console.log('Collection does not exists');
                    }
    
                    if (res) {
                        console.log("Collection deleted");
                    }
                    
                    db.close();
                    resolve();
                });
            }
    
            this.openConnection(dropCollection);
        }); 
    }
}