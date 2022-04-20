function Withdraw() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [withdraw, setWithdraw] = React.useState("");
  const ctx = React.useContext(UserContext);

  //Validate functions
  function validate(field, label) {
    if (!field) {
      setStatus("Error: " + label);
      setTimeout(() => setStatus(""), 10000);
      alert(`Please enter a valid input`);
      return false;
    }
    if (field === withdraw) {
      if (Number(withdraw) >= 10000) {
        alert("Over the limit.");
        return false;
      }
      if (Number(withdraw) >= ctx.users[0].balance){
        alert("Insufficient Funds");
        return false;
      }
      if ((ctx.users[0].balance - Number(withdraw)) < 25){
        alert("Minimum balance can't be below $25")
        return false;
      }
    }
    return true;
  }

  function handleWithdraw() {
    if (!validate(email, 'email')) return;  
    if (!validate(withdraw, 'withdraw')) return;
    if (email == ctx.users[0].email) {     
    console.log(email, `Withdraw amount: ${withdraw}`);
    ctx.users.push({withdraw});
    if (Number(withdraw) <= ctx.users[0].balance){
    ctx.users[0].balance -= Number(withdraw);
    setShow(false);
    } else {
      alert("Invalid Account Email");
      return;
    }
  } 
  else{
    ctx.users[0].balance -= Number(withdraw);
    setShow(false);
  }

}
  function clearForm() {
    setWithdraw("");
    setShow(true);
  }

//Style Deposit Card with Bootstrap
  return (
    <Card
      bgcolor="success"
      header="Withdraw"
      status={status}
      body={
        show ? (
          <>
            Current Balance
            <br /> {ctx.users[0].balance} <br />
            <br />
            Email Address
            <br />
            <input
              type="input"
              className="form-control"
              id="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
            <br />
            Withdraw Amount
            <br />
            <input
              type="number"
              className="form-control"
              id="withdraw"
              placeholder="Enter Amount"
              value={withdraw}
              onChange={(e) => setWithdraw(e.currentTarget.value)}
            />
            <br />
            <button
              type="submit"
              className="btn btn-danger"
              onClick={handleWithdraw}
            >
              Submit Transaction
            </button>
          </>
        ) : (

//Validate Transaction Completed Successfully / Add Another Transaction.          
          <>
            <h5>Transaction Successful!</h5><br/>
            <button type="submit" className="btn btn-danger" onClick={clearForm}>
              Add Another Transaction
            </button>
          </>
        )
      }
    />
  );
}