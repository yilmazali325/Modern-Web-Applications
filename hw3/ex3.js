const events = require('events');

module.exports = class Gym extends events{
    
    constructor(){
        super();
        this.visit();
        this.messageToPrint();
    }
    visit(){
        setInterval(()=>{
            this.emit('go')
        },1000);
    }
    messageToPrint(){
        return 'Athlete is working out';
    }
};