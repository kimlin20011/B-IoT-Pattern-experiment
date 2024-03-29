//下指令編譯新合約 solcjs -o ./ --bin --abi FourPattern_Two.sol
const fs = require('fs');
require('dotenv').config();

//讀進合約abi,bytecode
const Consumer_Abi = JSON.parse(fs.readFileSync('./migrates/oei_new_sol_Consumer.abi').toString());
const Consumer_Bytecode = '0x' + fs.readFileSync('./migrates/oei_new_sol_Consumer.bin').toString();
const QueryRegistry_Abi = JSON.parse(fs.readFileSync('./migrates/oei_new_sol_QueryRegistry.abi').toString());
const QueryRegistry_Bytecode = '0x' + fs.readFileSync('./migrates/oei_new_sol_QueryRegistry.bin').toString();
const OFEI_QueryRegistry_Abi = JSON.parse(fs.readFileSync('./migrates/ofei_sol_QueryRegistry.abi').toString());
const OFEI_QueryRegistry_Bytecode = '0x' + fs.readFileSync('./migrates/ofei_sol_QueryRegistry.bin').toString();
const Observer_Abi = JSON.parse(fs.readFileSync('./migrates/odp_sol_Observer.abi').toString());
const Observer_Bytecode = '0x' + fs.readFileSync('./migrates/odp_sol_Observer.bin').toString();

module.exports ={
    port: 3001,
    Consumer: {
        abi: Consumer_Abi,
        bytecode: Consumer_Bytecode,
    },
    QueryRegistry: {
        abi: QueryRegistry_Abi,
        bytecode: QueryRegistry_Bytecode,
    },
    Observer: {
        abi: Observer_Abi,
        bytecode: Observer_Bytecode,
    },
    OFEI_QueryRegistry: {
        abi: OFEI_QueryRegistry_Abi,
        bytecode: OFEI_QueryRegistry_Bytecode,
    },
    geth: {
        //account:`0xee860c9a2d17121a09222f69e1dc83a1351b90eb`,
        account:`0xbda961da75802363aeaf906f82b524677aa82502`,// edge的帳戶
        //暫時不用
        password: process.env.password,
        gethWebsocketUrl:`ws://localhost:8546`,
        //keystoreDir:`C:\\Users\\nccu\\implement\\chain_new\\data\\keystore`
        keystoreDir:`/Users/nccu/Documents/implement/chain_new/data/keystore`
    },
    mysql:{
        host: process.env.HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE
    }
};
