
module.exports = class PkmLisT {
    constructor(https) {
        this.https = https;

        this.options = {
            hostname: 'pokeapi.co',
            port: 443,
            path: '/ap1/v1',
            method: 'GET'
        };

        this.pkmList = '';

        this.pkmInfoList = '';
    }


    getPkmList() {
        return new Promise(resolve => {
            const req = this.https.request(this.options, res => {
                res.on('data', d => {
                    this.pkmList += String(d);
                })
                .on('end', () => {
                    this.pkmList = JSON.parse(this.pkmList);
                    resolve(this.pkmList);
                });
            });
    
            req.on('error', error => {
                console.error(error)
            });
            
            req.end();
        });
    }

    getPkmInfoList() {

        let arrayPromises = [],
            pkmInfo;

        for(let i = 1; i <= 718; i++) {
            let optionsSingle = {
                hostname: 'pokeapi.co',
                port: 443,
                path: '/ap1/v1/' + i,
                method: 'GET'
            }

            let request = new Promise (resolve => {
                const req = this.https.request(optionsSingle, res => {
                    res.on('data', d => {
                        pkmInfo = String(d);
                    })
                    .on('end', () => {
                        resolve(pkmInfo);
                    });
                });
    
                req.on('error', error => {
                    console.error(error)
                });
                
                req.end();
            });

            arrayPromises.push(request);
        } 

        return arrayPromises;
    }
}