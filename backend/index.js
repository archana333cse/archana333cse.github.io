const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");



const app = express();
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:3000", // your frontend URL
  credentials: true // allow cookies to be sent
}));

const JWT_SECRET = "mySuperSecretKey123!@#";
const JWT_EXPIRES_IN = "1h";

//app.use(cors());
app.use(bodyParser.json());

// Setup MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'myapp'
});

// Connect to MySQL
db.connect(err => {
  if (err) {
    console.error('MySQL connection error:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Fetch all products
app.get('/products', (req, res) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Optional: Fetch products by category (if you add category field later)
app.get('/products/category/:category', (req, res) => {
  const { category } = req.params;
  db.query('SELECT * FROM products WHERE category = ?', [category], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});


// ================= SIGNUP =================
app.post('/signup', async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({ message: 'Please fill all fields' });
  }

  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error' });

    if (results.length > 0) {
      return res.status(409).json({ message: 'User already exists' });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      db.query(
        'INSERT INTO users (full_name, email, password_hash) VALUES (?, ?, ?)',
        [fullName, email, hashedPassword],
        (err, results) => {
          if (err) {
            console.error('Insert error:', err); 
            return res.status(500).json({ message: 'Database error' });
          }

          return res.status(201).json({ message: 'User created successfully' });
        }
      );
    }
  });
});

// ================= LOGIN =================
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "Please enter both email and password" });

  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });

    if (results.length === 0)
      return res.status(401).json({ message: "Invalid email or password" });

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch)
      return res.status(401).json({ message: "Invalid email or password" });

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, fullName: user.full_name, email: user.email },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    // Set HTTP-only cookie
    res.cookie("access_token", token, {
      httpOnly: true,
      //secure: process.env.NODE_ENV === "production", // true in production
      secure:true,
      sameSite:"Lax", // "Lax" for dev, "None" for cross-site
      maxAge: 3600000 // 1 hour
    });

    return res.json({
      message: "Login successful",
      user: { id: user.id, fullName: user.full_name, email: user.email }
    });
  });
});



// ================= CHECK SESSION =================
app.get("/me", (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json({ message: "Not authenticated" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ user: decoded });
  } catch {
    res.status(401).json({ message: "Invalid or expired token" });
  }
});

// ================= LOGOUT =================
app.post("/logout", (req, res) => {
  res.clearCookie("access_token", {
    httpOnly: true,
    //secure: process.env.NODE_ENV === "production",
    secure: false,
    sameSite: "Lax"
  });
  res.json({ message: "Logged out successfully" });
});


// ✅ AUTHENTICATE MIDDLEWARE
function authenticate(req, res, next) {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

// Search products by title, brand, or description
app.get('/search', (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(400).json({ error: 'Query is required' });

  const sql = `
    SELECT * FROM products
    WHERE title LIKE ? OR brand LIKE ? OR description LIKE ?
  `;
  const searchTerm = `%${q}%`;
  db.query(sql, [searchTerm, searchTerm, searchTerm], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});


// ================= PLACE ORDER =================
app.post("/orders", (req, res) => {
  const { items, total_price, address, payment_method, email } = req.body;

  // Determine if user is logged in
  const user_email = req.user ? req.user.email : email;

  if (!items || !total_price || !address || !payment_method || !user_email) {
    return res.status(400).json({ message: "Missing order data" });
  }

  const sql = `INSERT INTO userorder 
               (user_email, items, total_price, address, payment_method)
               VALUES (?, ?, ?, ?, ?)`;

  db.query(
    sql,
    [user_email, JSON.stringify(items), total_price, address, payment_method],
    (err) => {
      if (err) {
        console.error("Error placing order:", err);
        return res.status(500).json({ message: "Database error placing order" });
      }

      res.json({ message: "Order placed successfully" });
    }
  );
});



// ================= GET USER ORDERS =================
app.get("/orders", authenticate, (req, res) => {
  const user_email = req.user.email;

  db.query("SELECT * FROM userorder WHERE user_email = ?", [user_email], (err, results) => {
    if (err) return res.status(500).json({ message: "Failed to fetch orders" });

    const parsedOrders = results.map(order => ({
      ...order,
      items: JSON.parse(order.items),
    }));

    res.json(parsedOrders);
  });
});


// ================= START SERVER =================
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
