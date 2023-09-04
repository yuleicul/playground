const Input = (props) => {
  return <input {...props} step={0.0001} />
}

const Welcome = () => {
  const connectWallet = () => {}
  const handleSubmit = () => {}

  return (
    <div>
      <h1 className="text-white text-3xl">
        Send Crypto
        <br /> across the world
      </h1>
      <button
        type="button"
        onClick={connectWallet}
        className="flex flex-row justify-center items-center my-5 bg-blue-500 cursor-pointer hover:bg-blue-200"
      >
        <p className="text-white text-base font-bold">Connect Wallet</p>
      </button>

      <div>
        <p>Address</p>
        <p>Ethereum</p>
      </div>

      <div>
        <Input
          placeholder="Address To"
          name="addressTo"
          type="text"
          handleChange={() => {}}
        />
        <Input
          placeholder="Amount(ETH)"
          name="amount"
          type="number"
          handleChange={() => {}}
        />
        <Input
          placeholder="Keyword(Gif)"
          name="keyword"
          type="text"
          handleChange={() => {}}
        />
        <Input
          placeholder="Enter Message"
          name="message"
          type="text"
          handleChange={() => {}}
        />

        <button type="button" onClick={handleSubmit} className="text-white">
          Send Now
        </button>
      </div>
    </div>
  )
}

export default Welcome
