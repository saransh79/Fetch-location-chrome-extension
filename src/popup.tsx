import { useState } from "react"
import countryCodes from "../assets/country-codes.json"
import "./style.css"

import dotenv from "dotenv"

dotenv.config()

function IndexPopup() {
  const [isLoading, setIsLoading] = useState(false)
  const [location, setLocation]= useState("")


  const handleClick = async () => {
    setIsLoading(true)
    
    try {
      const ipAddressResponse = await fetch("https://api.ipify.org?format=json")

      const { ip } = await ipAddressResponse.json()
      console.log(ip)

      const ipInfoResponse = await fetch(
        `https://ipinfo.io/${ip}?token=${
          process.env.IPINFO_ACCESS_TOKEN || "0836df2134ee04"
        }`
      )

      const { country, city } = await ipInfoResponse.json()

      console.log(country, city);
      
      const countryName = countryCodes[country] || "Unknown"

      setLocation(`Your country is ${countryName} and city is ${city}`);

    } catch (error) {
      console.log(error);
      setLocation("Error in getting location");
    }
    setIsLoading(false);
  }

  return (
    <div className="popup">
      <div className="content">
        {location}
      </div>
      <button
        type="button"
        onClick={handleClick}
        disabled={isLoading}>
        {isLoading ? (
          <span className="plasmo-flex plasmo-flex-col">
            <span className="plasmo-m-auto plasmo-width-auto plasmo-font-bold">
              Loading...
            </span>
          </span>
        ) : (
          "Show my location"
        )}
      </button>
    </div>
  )
}

export default IndexPopup
