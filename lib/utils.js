const faker=require('faker');

module.exports={
    generateId:()=>{
        let result=faker.random.uuid();
        return result;
    },
    generateEmail:()=>{
        return faker.internet.email();
    },
    generateNumbers:()=>{
        return faker.random.number();
    }
};


