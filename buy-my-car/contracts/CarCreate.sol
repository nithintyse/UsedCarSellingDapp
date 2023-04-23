// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";

contract Car {
    address public owner;
    string public adTitle;
    string public carModel;
    string public manufactYear;
    string public engineCapacity;
    address public carAddr;

    constructor(address _owner, string memory _adTitle, string memory _carModel, string memory _manufactYear, string memory _engineCapacity) payable {
        owner = _owner;
        adTitle = _adTitle;
        carModel = _carModel;
        manufactYear = _manufactYear;
        engineCapacity = _engineCapacity;
        carAddr = address(this);
    }
}

contract CarCreate is ERC721Upgradeable {
    Car[] public cars;
    uint public number;

   function initialValue(uint _num) external {
       number=_num;
   }

   function increase() external {
       number += 1;
   }

    function create(string memory _adTitle, string memory _carModel, string memory _manufactYear, string memory _engineCapacity) public {
        Car car = new Car(msg.sender, _adTitle, _carModel, _manufactYear, _engineCapacity);
        cars.push(car);
    }

    function create2(address _owner, string memory _adTitle, string memory _carModel, string memory _manufactYear, string memory _engineCapacity, bytes32 _salt) public {
        Car car = (new Car){salt: _salt}(_owner, _adTitle, _carModel, _manufactYear, _engineCapacity);
        cars.push(car);
    }

    function getCar(
        uint _index
    )
        public
        view
        returns (address owner, string memory adTitle, string memory carModel, address carAddr)
    {
        Car car = cars[_index];

        return (car.owner(), car.adTitle(), car.carModel(), car.carAddr());
    }
}