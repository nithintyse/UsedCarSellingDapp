import './App.css';
import {useState} from 'react';
import {ethers} from 'ethers'
import CarCreate from './artifacts/contracts/CarCreate.sol/CarCreate.json'

const carContractAddress = "0xb55E67dAC915cf9Fde43F47eb3fe81FE8E89a3e2"

function App () {
  const [showCarAdd, setShowCarAdd] = useState(false);
  const [adTitle, setAdTitle] = useState("");
  const [carModel, setCarModel] = useState("");
  const [manufactYear, setManufactYear] = useState("");
  const [engineCapacity, setEngineCapacity] = useState("");

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contractForGet = new ethers.Contract(carContractAddress, CarCreate.abi, provider);
  const contractForSend = new ethers.Contract(carContractAddress, CarCreate.abi, signer);


  // request access to the user's MetaMask account
  async function requestAccount () {
    await window.ethereum.request({method: 'eth_requestAccounts'});
  }

  /* UI controls */
  function showCarAddDiv () {
    setShowCarAdd(true);
  }

  const handleForm = (e) => {
    e.preventDefault();
    addCar();
  }

  async function addCar () {
    try {
      if (typeof window.ethereum !== 'undefined') {
        await requestAccount()
        const transaction = await contractForSend.create(adTitle, carModel, manufactYear, engineCapacity);
        await transaction.wait();
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <hr className="invis"></hr>
      <button className="btn btn-primary" onClick={showCarAddDiv}>Add a new Car</button>
      <hr className="invis"></hr>
      {showCarAdd ?
        <div id="div_car_add">
          <form className="form-inline" onSubmit={handleForm}>
            <input type="text" className="form-control" value={adTitle} onChange={e => setAdTitle(e.target.value)} placeholder="Advertisement Title" name="adTitle"></input>
            <input type="text" className="form-control" value={carModel} onChange={e => setCarModel(e.target.value)} placeholder="Car Model" name="carModel"></input>
            <input type="text" className="form-control" value={manufactYear} onChange={e => setManufactYear(e.target.value)} placeholder="Manufacturing Year" name="manufactYear"></input>
            <input type="text" className="form-control" value={engineCapacity} onChange={e => setEngineCapacity(e.target.value)} placeholder="Engine Capacity" name="engineCapacity"></input>
            <button type="reset" className="btn btn-cancel">Cancel</button>
            <button type="submit" className="btn btn-primary">Create</button>
          </form>
        </div>
        : ""
      }
      <hr className="invis"></hr>
      <div className="blog-top clearfix">
        <h4 className="pull-left">Recently Added Cars <a href="#"><i className="fa fa-rss"></i></a></h4>
      </div>

    </div>
  );
}

export default App;
