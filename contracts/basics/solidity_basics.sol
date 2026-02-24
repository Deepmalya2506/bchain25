// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0; // tells the program to use any compiler that's above the certain version

contract basics{
    // A glimpse at the datatypes

    uint favNumber=25; //unsigned integer...can also be more precisely defined as uint256 -> pointing to 256 bits of storage
    bool favBool=true;
    string favStr="Titli";
    int number;
    bytes32 num;
    address myadd;
    
    // functions are of 3 types state_changeable, view and pure....
    // changeable -> these functions modifes the state of the variable on chsin
    // view -> just returns or reads the state of the variables but doesnot modify them
    // pure -> neither reads or modifies, they process local var or parameters

    //                                             Modifyable functions
    //function to store number
    function assign_num(int n) public returns (int){
        number=n;
        return number;
    }

    // function to store address
    function store_address(address add)public returns (address){
        myadd=add;
        return myadd;
    }

    //                                              view or Read-only functions
    //function to just read the number
    function getNumber() public view returns (int){
        return number; // since number is global scoped so it accesses it and displays it
    }
    
    //                                               pure function 
    // function to add 2 numbers -> simply operates on parameters but never modifies the state by storing it 
    function addNum(uint256 a, uint256 b) public pure returns (uint256){
        return a+b;
    }
}