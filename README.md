# MERN Stack Event App

Metropolia UAS Week 8 practice repository. Event App. 

---

#### Event Model

Here’s the event schema:

```javascript
const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  organizer: {
    name: { type: String, required: true },
    contactEmail: { type: String, required: true },
    contactPhone: { type: String, required: true }
  }
});
```

#### User Model

Here’s the user schema:

```js
const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  gender: { type: String, required: true, enum: ['Male', 'Female', 'Other'] },
  date_of_birth: { type: Date, required: true },
  address: { 
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
    country: { type: String, required: true }
  },
  occupation: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
}, { timestamps: true, versionKey: false });

module.exports = model('User', userSchema);

```

## Usage

1. **Install Backend Dependencies**  
   
   - Rename the `.env.example` file to `.env` in the backend directory.
   - Navigate to the backend directory and install the necessary dependencies:
   ```sh
   npm install
   npm run dev
   ```

2. **Install Frontend Dependencies & Start the App**  
   Navigate to the frontend directory, install dependencies, and start the application:
   ```sh
   npm install
   npm run dev
   ```

4. **Access the App**  
   Open your browser and visit: [http://localhost:3000](http://localhost:3000)
