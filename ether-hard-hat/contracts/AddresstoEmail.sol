// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

contract Address_to_Email {
    event emailStored(string email, address addr);

    event TransactionStatus(bool callStatus, address sender, address reciever);

    uint256 constant MINIMUM_ETH = 50 * 10 * 18;

    mapping(string => address) public s_email_to_addr;

    function storeEmailtoAddr(string memory _email, address _addr) public {
        s_email_to_addr[_email] = _addr;
        emit emailStored(_email, _addr);
    }

    function getAddr(string memory _email) public view returns (address) {
        return (s_email_to_addr[_email]);
    }

    function payToAddr(address payable _addr) public payable {
        (bool callSuccess, ) = _addr.call{value: msg.value}("");
        require(callSuccess, "call is Failiure");
        emit TransactionStatus(callSuccess, msg.sender, _addr);
    }
}
