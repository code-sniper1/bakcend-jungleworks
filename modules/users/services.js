const db = require("../../db");
const bcrypt = require("bcryptjs");

const saveData = (name, phone, email, password, img, address, ref_token) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM employee where email=? ";
    db.query(sql, [email], function (error, result) {
      if (error) {
        reject(error);
        return;
      }

      if (result[0]) {
        reject("Email already registered");
        return;
      } else {
        bcrypt.genSalt(10, function (err, Salt) {
          if (err) {
            reject("Cannot generate salt");
          }
          bcrypt.hash(password, Salt, function (err, hash) {
            if (err) {
              reject("Cannot hash password");
            }
            const sql =
              "INSERT INTO employee (name, phone, email, password, image, address,ref_token) VALUES (?)";
            const values = [name, phone, email, hash, img, address, ref_token];
            db.query(sql, [values], function (error, result) {
              if (error) reject(error);
              console.log("User Registered successfully");
              const sql2 = "SELECT * FROM employee where email=? ";
              db.query(sql2, [email], function (error, result) {
                if (error) {
                  reject(error);
                  return;
                }
                if (result[0]) {
                  resolve([result[0].ref_token]);
                }
              });
            });
          });
        });
      }
    });
  });
};

const checkData = (email, pass) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM employee where email=? ";
    db.query(sql, [email], function (error, result) {
      if (error) {
        reject(error);
        return;
      }

      if (result[0]) {
        const dbPass = result[0].password;
        bcrypt.compare(pass, dbPass, async function (err, isMatch) {
          if (isMatch) {
            console.log("User logged in");
            resolve([result[0].ref_token]);
          }
          if (!isMatch) {
            reject("Incorrect password");
          }
        });
      } else {
        reject("Email not registered");
        return;
      }
    });
  });
};

const getData = (ref_token) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM employee WHERE ref_token=?";
    db.query(sql, [ref_token], function (error, result) {
      if (error) {
        reject(error);
        return;
      }
      if (result[0]) {
        resolve(result[0]);
        return;
      }
      reject("Data not found");
      return;
    });
  });
};

const getCount = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT COUNT(*) FROM employee WHERE role='user'";
    db.query(sql, function (error, result) {
      if (error) {
        reject(error);
        return;
      }
      if (result) {
        resolve(result[0]["COUNT(*)"]);
        return;
      }
    });
  });
};

const getUsers = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM employee WHERE role='user'";
    db.query(sql, function (error, result) {
      if (error) {
        reject(error);
        return;
      }
      if (result) {
        resolve(result);
        return;
      }
    });
  });
};

const editUserService = (name, phone, email, address, img, ref_token) => {
  return new Promise((resolve, reject) => {
    let sql = "";
    let values = [];
    if (img != null) {
      sql =
        "UPDATE employee SET name=?,phone=?,email=?,address=?,image=? WHERE ref_token = ?";
      values = [name, phone, email, address, img, ref_token];
    } else {
      sql =
        "UPDATE employee SET name=?,phone=?,email=?,address=? WHERE ref_token = ?";
      values = [name, phone, email, address, ref_token];
    }
    db.query(sql, values, function (error, result) {
      if (error) {
        console.log(error)
        reject(error);
        console.log(error);
        return;
      }
      if (result) {
        resolve("Success");
        console.log("Profile updated");
        return;
      }
    });
  });
};

const deleteUserService = (ref_token) => {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM employee WHERE ref_token=?";
    db.query(sql, [ref_token], function (error, result) {
      if (error) {
        console.log(error);
        reject("Failure");
        return;
      }
      if (result) {
        resolve("Success");
        console.log("User Deleted");
        return;
      }
    });
  });
};

const resetPasswordService = (ref_token, password, newPassword) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM employee WHERE ref_token = ?";
    db.query(sql, [ref_token], function (error, result) {
      if (error) {
        reject(error);
        return;
      }
      if (result) {
        const dbPass = result[0].password;
        bcrypt.compare(password, dbPass, async function (err, isMatch) {
          if (!isMatch) {
            reject("Wrong Password");
          } else {
            bcrypt.genSalt(10, function (err, Salt) {
              if (err) {
                reject("Cannot generate salt");
              }
              bcrypt.hash(newPassword, Salt, function (err, hash) {
                if (err) {
                  reject("Cannot hash password");
                }
                const sql2 =
                  "UPDATE employee SET password=? WHERE ref_token = ?";
                db.query(sql2, [hash, ref_token], function (error, result) {
                  if (error) {
                    reject(error);
                    return;
                  }
                  if (result) {
                    resolve("Success");
                    return;
                  }
                });
              });
            });
          }
        });
      }
    });
  });
};

const checkRoleService = (ref_token) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROm employee WHERE ref_token = ?";
    db.query(sql, [ref_token], function (error, result) {
      if (error) {
        reject(error);
        return;
      }
      if (result) {
        const role = result[0].role;
        if (role === "admin") {
          resolve(true);
        } else {
          reject(false);
        }
        return;
      }
    });
  });
};

module.exports = {
  saveData,
  checkData,
  getData,
  getCount,
  getUsers,
  editUserService,
  deleteUserService,
  resetPasswordService,
  checkRoleService,
};
