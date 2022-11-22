// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract Simple2 {
    function return7() public pure returns (uint256) {
        return 7;
    }

    function returnParameter(uint256 _num) public pure returns (uint256) {
        return _num;
    }
}
