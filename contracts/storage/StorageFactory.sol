// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./storage.sol"; // import the file with path relative to the present directory


//we create a separate contract here and from this contract using our premade storage contract we create transactions using its object 
// and store the transactions in an array for reference

contract StorageFactory{

    SimpleStorage [] public simplestoragearray;
    function createSimpleStorageContract() public {
        SimpleStorage simpstorg=new SimpleStorage();
        simplestoragearray.push(simpstorg);
    }

    // You can also define functions that internally uses the addPeop func() from storage.sol or SimpleStorage contract to add people
    // contract StorageFactory is Simplestorage -> this means inheritance of all the methods and properties from SimpleStorage contract to StorageFactory contract
}