

module.exports = {
//  user          : process.env.NODE_ORACLEDB_USER || "hr",
user          : "sys",
  // Instead of hard coding the password, consider prompting for it,
  // passing it in an environment variable via process.env, or using
  // External Authentication.
  //password      : process.env.NODE_ORACLEDB_PASSWORD,
password      :"#-BaseDeDatos12345",
  // For information on connection strings see:
  // https://oracle.github.io/node-oracledb/doc/api.html#connectionstrings
//  connectString : process.env.NODE_ORACLEDB_CONNECTIONSTRING || "localhost/orclpdb",


connectString : "132.145.217.166:1521/JC_iad1k5.sub05021616340.ocicloud.oraclevcn.com"
  // Setting externalAuth is optional.  It defaults to false.  See:
  // https://oracle.github.io/node-oracledb/doc/api.html#extauth
//  externalAuth  : process.env.NODE_ORACLEDB_EXTERNALAUTH ? true : false
};
