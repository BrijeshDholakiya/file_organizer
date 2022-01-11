function helpFn(){
    console.log(`Commands Available are:
                node index.js tree "Enter the full directory Path" 
                node index.js organize "Enter the full directory Path"
                node index.js help
                `);
}

module.exports = {
    helpKey=helpFn
}