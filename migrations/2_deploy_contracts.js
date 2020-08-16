var MyFirstToken = artifacts.require("./MyFirstToken.sol");

module.exports = async function(deployer) {
  await deployer.deploy(MyFirstToken);
};
