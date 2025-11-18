CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE providers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  rnc VARCHAR(50),
  contact VARCHAR(150),
  address TEXT,
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE merchants (
  id SERIAL PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  location VARCHAR(255),
  contact VARCHAR(150),
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  provider_id INTEGER REFERENCES providers(id),
  sku VARCHAR(100),
  name VARCHAR(200),
  description TEXT,
  price NUMERIC(12,2),
  stock INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  merchant_id INTEGER REFERENCES merchants(id),
  total NUMERIC(12,2),
  status VARCHAR(50) DEFAULT 'PENDING',
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES orders(id),
  product_id INTEGER REFERENCES products(id),
  qty INTEGER,
  unit_price NUMERIC(12,2)
);

CREATE TABLE invoices (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES orders(id),
  invoice_number VARCHAR(100),
  amount NUMERIC(12,2),
  issued_at TIMESTAMP DEFAULT now()
);

CREATE TABLE warehouses (
  id SERIAL PRIMARY KEY,
  name VARCHAR(150),
  location TEXT
);

CREATE TABLE stock_movements (
  id SERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES products(id),
  warehouse_id INTEGER REFERENCES warehouses(id),
  qty INTEGER,
  type VARCHAR(20), -- IN/OUT
  created_at TIMESTAMP DEFAULT now()
);
