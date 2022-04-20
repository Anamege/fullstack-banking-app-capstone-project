function Deposit(){    
  const [show, setShow]               = React.useState(true);
  const [status, setStatus]           = React.useState('');
  const [email, setEmail]          = React.useState('');
  const [deposit, setDeposit]         = React.useState('');
  const ctx = React.useContext(UserContext);

  //Validate functions
  function validate(field, label){
      if (!field) {             
              setStatus("Error: " + label);
              setTimeout(() => setStatus(''), 10000);
              alert(`Please enter a valid input`);
              return false;                
      }

      if (field === deposit) {
          if (Number(deposit) <= 0) {
              alert("Please enter a valid Deposit Amount");
              return false;
  }
  

      }
return true;
  }

  function handleDeposit() {       
          if (!validate(email, 'email')) return;
          if (!validate(deposit, 'deposit')) return;            
          if (email == ctx.users[0].email) { 
          console.log(email, `Deposit amount: ${deposit}`);           
          ctx.users.push({deposit});  
          if (Number(deposit) <= ctx.users[0].balance){           
          ctx.users[0].balance += Number(deposit);
          setShow(false);
      } else {
          alert("Invalid Account Email");
          return;

          
      }
  } 
  else {
      ctx.users[0].balance += Number(deposit);
      setShow(false);
  }
}

  //Clear Form After Deposit Completed                
  function clearForm(){
      setDeposit('');
      setShow(true);

  }

//Style Deposit Card Using Bootstrap
     return (
      <Card
      bgcolor="warning"
      header="Deposit"
      status={status}
      body={show ? (
          <>
      Current Balance<br/> {ctx.users[0].balance} <br/><br/> 
      Email Address<br/>
      <input type="input" className="form-control" id="email" placeholder="Enter Your Email" value={email} onChange={e => setEmail(e.currentTarget.value)} /><br/>  

      Deposit Amount<br/>                  
      <input type="number" className="form-control" id="deposit"
      placeholder="Enter Deposit Amount" value={deposit} onChange={e => setDeposit(e.currentTarget.value)} /><br/>

      <button type="submit" className="btn btn-danger" onClick={handleDeposit}>Submit Transaction</button>
          </>

      ):(
  //Validate Successful Completion of Deposit / Add Another Transaction       
      <>
      <h5>Transaction Successful!</h5><br/>
      <button type="submit" className="btn btn-danger" onClick={clearForm}>Add Another Transaction</button>
      </>

  )}
  />
      )
          }










