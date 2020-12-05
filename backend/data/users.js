import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "admin@gmail.com",
    password: bcrypt.hashSync("test1234", 10),
    isAdmin: true,
  },
  {
    name: "John Doe",
    email: "john@gmail.com",
    password: bcrypt.hashSync("test1234", 10),
  },
  {
    name: "Will Som",
    email: "will@gmail.com",
    password: bcrypt.hashSync("test1234", 10),
  },
];

export default users;
