const users = [
  {
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    password: "hashedpassword123",
    gender: "Female",
    date_of_birth: new Date("1990-05-15"),
    address: {
      street: "123 Maple St",
      city: "Helsinki",
      state: "Uusimaa",
      zip: "00100",
      country: "Finland"
    },
    occupation: "Software Developer",
    phone: "1234567890"
  },
  {
    name: "Bob Smith",
    email: "bob.smith@example.com",
    password: "hashedpassword456",
    gender: "Male",
    date_of_birth: new Date("1985-08-22"),
    address: {
      street: "456 Oak St",
      city: "Espoo",
      state: "Uusimaa",
      zip: "02100",
      country: "Finland"
    },
    occupation: "Data Analyst",
    phone: "9876543210"
  },
  {
    name: "Charlie Davis",
    email: "charlie.davis@example.com",
    password: "hashedpassword789",
    gender: "Other",
    date_of_birth: new Date("1995-12-10"),
    address: {
      street: "789 Birch St",
      city: "Tampere",
      state: "Pirkanmaa",
      zip: "33100",
      country: "Finland"
    },
    occupation: "Graphic Designer",
    phone: "1122334455"
  }
];

module.exports = users;
