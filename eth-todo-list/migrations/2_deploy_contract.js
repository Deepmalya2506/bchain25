var TodoList = artifacts.require("./TodoList"); 
//artifacts looks inside build/contracts/TodoList.json. to find the contract


module.exports = function(deployer) {
  deployer.deploy(TodoList);
};