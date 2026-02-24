// SPDX-License-Identifier: MIT

// 01. First we need to define the solidity version
pragma solidity >=0.6.0 <0.9.0;

//02. Defining contract
contract SimpleStorage{

    //defining custom datatype with struct to configure People's choice for the sample contract
    struct People{
        uint256 favNum;
        address add;
        string name;
    }

    //sample example of a People object
    People public Person=People(25,0x606C71aD246DFD42497C1F5a8b91dE1de13BffFe,"Deepmalya");

    // for n number of peoples with same configurations, let create an array(array here is a dynamic in nature like list in python)
    People[] public people; // <datatype> <access-specifier> <name_of_arr> : here datatype is customised People type(made with struct)

    //function to add people to the array
    // # storage of array elements can be done in 2 ways - memory or storage
    //memory: data remains stored uptill execution of the contract
    //storage: data remains stored even after function is executed
    function addPeople(uint256 _num, address _add, string memory _name) public {
        people.push(People(_num,_add,_name));
    } 


}