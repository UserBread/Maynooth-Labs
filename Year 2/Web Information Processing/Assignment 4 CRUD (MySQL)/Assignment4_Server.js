const mysql = require('mysql');
const express = require('express');
const app = express();
const cors = require('cors')
const port = //Enter port number;

app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
var userInfo = {};

//establishing connection to database
const db = mysql.createConnection({
  //Your mySQL connection
});

//enabling readline
const readline = require('node:readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

//connecting to the server
db.connect(function(err) {
  if (err) throw err;
});

 //Create SQL table in the database
const sql = `CREATE TABLE IF NOT EXISTS USERS (
  Title VARCHAR(255),
  FName VARCHAR(255),
  SName VARCHAR(255),
  Mobile VARCHAR(20),
  EmailAddr VARCHAR(255) PRIMARY KEY,
  HomeAddrL1 VARCHAR(255),
  HomeAddrL2 VARCHAR(255),
  HomeTown VARCHAR(255),
  HomeCountyCity VARCHAR(255),
  HomeEircode VARCHAR(10),
  ShipAddrL1 VARCHAR(255),
  ShipAddrL2 VARCHAR(255),
  ShipTown VARCHAR(255),
  ShipCountyCity VARCHAR(255),
  ShipEircode VARCHAR(10)
)`;
db.query(sql, function (err, result) {
  if (err) throw err;
});

//Asks user for action they want to do
rl.question('What would you like to do?(Enter the number)\n1 - Create\n2 - Retrieve\n3 - Update\n4 - Delete\n', (action) => {
  if (action == 1) {
    createUserData();
  }
  else if (action == 2) {
    retrieveUserData();
  }
  else if (action == 3) {
    updateUserData();
  }
  else if (action == 4) {
    deleteUserData();
  }
  else {
    console.log('Invalid Command!');
  }
});

//Stores User inputs into a JS Object
function createUserData() {
  rl.question('Title? ', (title) => {
    userInfo.Title = title;

    rl.question('First Name? ', (firstname) => {
      userInfo.FName = firstname;

      rl.question('Surname? ', (surname) => {
        userInfo.SName = surname;

        rl.question('Mobile? ', (mobile) => {
          userInfo.Mobile = mobile;

          rl.question('Email Address? ', (email) => {
            userInfo.EmailAddr = email;

            rl.question('Home Address Line 1? ', (homeaddressline1) => {
              userInfo.HomeAddrL1 = homeaddressline1;

              rl.question('Home Address Line 2? ', (homeaddressline2) => {
                userInfo.HomeAddrL2 = homeaddressline2;

                rl.question('Home Town? ', (hometown) => {
                  userInfo.HomeTown = hometown;

                  rl.question('Home County/City? ', (homecountyorcity) => {
                    userInfo.HomeCountyCity = homecountyorcity;

                    rl.question('Home Eircode? ', (homeeircode) => {
                      userInfo.HomeEircode = homeeircode;
    
                      rl.question('Is Shipping Address the same as Home Address(yes/no) ', (answer) => {
                        if (answer == 'yes') {
                          userInfo.ShipAddrL1 = homeaddressline1;
                          userInfo.ShipAddrL2 = homeaddressline2;
                          userInfo.ShipTown = hometown;
                          userInfo.ShipCountyCity = homecountyorcity;
                          userInfo.ShipEircode = homeeircode;
                          insertUserData()
                        }
                        else if (answer == 'no') {
                          rl.question('Shipping Line Address 1? ', (shippingaddressline1) => {
                            userInfo.ShipAddrL1 = shippingaddressline1;

                            rl.question('Shipping Line Address 2? ', (shippingaddressline2) => {
                              userInfo.ShipAddrL2 = shippingaddressline2;

                              rl.question('Shipping Town? ', (shippingtown) => {
                                userInfo.ShipTown = shippingtown;

                                rl.question('Shipping County/City? ', (shippingcountyorcity) => {
                                  userInfo.ShipCountyCity = shippingcountyorcity;

                                  rl.question('Shipping Eircode? ', (shippingeircode) => {
                                    userInfo.ShipEircode = shippingeircode;
                                    insertUserData()
                                    rl.close();
                                  });
                                });
                              });
                            });
                          });
                        }
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });
}
//Inserts content of the JS Object into the table
function insertUserData() {
  const sql = 'INSERT INTO USERS SET ?';
  db.query(sql, [userInfo], function (err, result) {
    if (err) throw err;
    console.log('Inserted Successfully');
  });
}

//Returns user data where the full name matches
function retrieveUserData() {
  rl.question("Enter the First Name of the user you'd like to retrieve the data for: ", (firstname) => {

    rl.question("Enter the Surname of the user you'd like to retrieve the data for: ", (surname) =>{
      db.query('SELECT * FROM USERS WHERE FName = ? AND SName = ?', [firstname, surname], function (err, result) {
        if (err) throw err;
        console.log("User Found\n");
        console.log(result);
      });
    });
  });
}

//Updates the user data based on email
function updateUserData() {
  rl.question("Enter the email of the user you'd like to update the data for: ", (email) => {

    rl.question(`\nWhat element would you like to update?(Enter the number)\n1- Title\n2 - Mobile\n3 - Email Address
4 - Home\n, 5 - Shipping\n`, (update) => {

        if (update == 1) {
          rl.question("\nEnter the new information ", (newinfo) => {
            db.query("UPDATE USERS SET Title = ? WHERE EmailAddr = ?",[newinfo, email], function (err, result) {
              if (err) throw err;
              console.log(result.affectedRows + " record(s) updated");
            });
          });
        }
        else if (update == 2) {
          rl.question("\nEnter the new information ", (newinfo) => {
            db.query("UPDATE USERS SET Mobile = ? WHERE EmailAddr = ?",[newinfo, email], function (err, result) {
              if (err) throw err;
              console.log(result.affectedRows + " record(s) updated");
            });
          });
        }
        else if (update == 3) {
          rl.question("\nEnter the new information ", (newinfo) => {
            db.query("UPDATE USERS SET EmailAddr = ? WHERE EmailAddr = ?",[newinfo, email], function (err, result) {
              if (err) throw err;
              console.log(result.affectedRows + " record(s) updated");
            });
          });
        }
        else if (update == 4) {
          updateHome(email);
        }
        else if (update == 5) {
          updateShipping(email);
        }
    });
  });
}

function updateHome(email) {
  rl.question("\nEnter the new Home Address Line 1 ", (homeaddressline1) => {
    db.query("UPDATE USERS SET HomeAddrL1 = ? WHERE EmailAddr = ?",[homeaddressline1, email], function (err, result) {
      
      rl.question("\nEnter the new Home Address Line 2 ", (homeaddressline2) => {
        db.query("UPDATE USERS SET HomeAddrL2 = ? WHERE EmailAddr = ?",[homeaddressline2, email], function (err, result) {
          
          rl.question("\nEnter the new Home Town ", (hometown) => {
            db.query("UPDATE USERS SET HomeTown = ? WHERE EmailAddr = ?",[hometown, email], function (err, result) {
              
              rl.question("\nEnter the new County/City ", (homecountyorcity) => {
                db.query("UPDATE USERS SET HomeCountyCity = ? WHERE EmailAddr = ?",[homecountyorcity, email], function (err, result) {
                  
                  rl.question("\nEnter the new Home Eircode ", (homeeircode) => {
                    db.query("UPDATE USERS SET HomeEircode = ? WHERE EmailAddr = ?",[homeeircode, email], function (err, result) {
                      if (err) throw err;
                      console.log(result.affectedRows + " record(s) updated");
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });
}

function updateShipping(email) {
  rl.question("\nEnter the new Shipping Address Line 1 ", (shippingaddressline1) => {
    db.query("UPDATE USERS SET ShipAddrL1 = ? WHERE EmailAddr = ?",[shippingaddressline1, email], function (err, result) {
      
      rl.question("\nEnter the new Shipping Address Line 2 ", (shippingaddressline2) => {
        db.query("UPDATE USERS SET ShipAddrL2 = ? WHERE EmailAddr = ?",[shippingaddressline2, email], function (err, result) {
          
          rl.question("\nEnter the new Shipping Town ", (shippingtown) => {
            db.query("UPDATE USERS SET ShipTown = ? WHERE EmailAddr = ?",[shippingtown, email], function (err, result) {
              
              rl.question("\nEnter the new Shipping County/City ", (shippingcountyorcity) => {
                db.query("UPDATE USERS SET ShipCountyCity = ? WHERE EmailAddr = ?",[shippingcountyorcity, email], function (err, result) {
                  
                  rl.question("\nEnter the new Shipping Eircode ", (shippingeircode) => {
                    db.query("UPDATE USERS SET ShipEircode = ? WHERE EmailAddr = ?",[shippingeircode, email], function (err, result) {  
                      if (err) throw err;
                      console.log(result.affectedRows + " record(s) updated");          
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });
}
//Deletes user data using a combination of email, mobile and first name
function deleteUserData() {
  rl.question("Enter the email addresss of the user you'd like to delete: ", (email) => {
    rl.question("Enter the mobile: ", (mobile) => {
      rl.question("Enter the first name: ", (firstname) => {
        db.query("DELETE FROM USERS WHERE EmailAddr = ? AND Mobile = ? AND FName = ?", [email, mobile, firstname], function(err, result) {
          if (err) throw err;
          console.log("Number of records deleted: " + result.affectedRows);
        });
      });
    });
  });
}

//Creating user data
app.post('/', (req, res) => {
  const param = req.body;
  const query = `INSERT INTO USERS SET ?`;
  db.query(query, param, (err, rows) => {
    if (err) throw err;
      res.json(`User with the email ${param.EmailAddress} has been added.`);
  });
});

//Retrieving user data
app.get('/', (req, res) => {
  const query = 'SELECT * FROM USERS';
  db.query(query, (err, rows) => {
      if (err) throw err;
      res.json(rows);
  });
});

//Updating user data
app.put('/', (req, res) => {
  const param = req.body;
  const query = `UPDATE USERS 
    SET ShipAddrL1 = '${param.ShipAddrL1}', 
      ShipAddrL2 = '${param.ShipAddrL2}', 
      ShipTown = '${param.ShipTown}',
      ShipCountyCity = '${param.ShipCountyCity}', 
      ShipEircode = '${param.ShipEircode}'
    WHERE EmailAddr = '${param.EmailAddr}'`;
  db.query(query, (err, rows) => {
    if (err) throw err;
    res.json(`User with the email ${param.EmailAddr} has been updated.`);
  });
});

//Deleting user data
app.delete('/', (req, res) => {
  const params = req.body;
  const query = `DELETE FROM USERS WHERE FName = '${params.FName}' AND Mobile = '${params.Mobile}' AND EmailAddr = '${params.EmailAddr}'`;
  db.query(query, (err, rows) => {
    if (err) throw err;
      res.json(`User with the email ${req.params.EmailAddress} has been removed.`);
  });
});
app.listen(port, () => console.log(`Listen on port ${port}`))
