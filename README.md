# Grocery Ecommerce Website

A modern, responsive grocery ecommerce platform built for seamless online grocery shopping experiences. This application allows customers to browse products, manage their cart, and complete purchases with ease.

## Features

### Customer Features
- **Product Catalog**: Browse through categorized grocery items with detailed descriptions
- **Advanced Search**: Find products quickly with search and filter functionality
- **Shopping Cart**: Add, remove, and modify items in your cart
- **User Authentication**: Secure login and registration system
- **Order Management**: Track order history and current order status
- **Payment Integration**: Multiple payment options including credit cards and digital wallets
- **Delivery Options**: Choose between home delivery and store pickup
- **Wishlist**: Save favorite items for future purchases
- **Product Reviews**: Read and write product reviews and ratings

### Admin Features
- **Inventory Management**: Add, edit, and remove products
- **Order Processing**: View and manage customer orders
- **Analytics Dashboard**: Track sales, popular products, and customer metrics
- **User Management**: Manage customer accounts and permissions
- **Discount Management**: Create and manage promotional offers

## Technology Stack

### Frontend
- **Framework**: React.js
- **Styling**: Tailwind CSS
- **State Management**: Context API
- **HTTP Client**: Axios
- **Build Tool**: Create React App / Vite

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose 
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt
- **Payment Processing**: Stripe 

### Additional Tools
- **Image Storage**: Cloudinary
- **Email Service**: Nodemailer
- **Deployment**: Vercel
- **Version Control**: Git

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local installation or MongoDB Atlas)

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/khushikumari0202/JhatpatGrocery
   cd JhatpatGrocery
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   cd server
   npm install
   
   # Install frontend dependencies
   cd client
   npm install
   ```

3. **Database Setup**
   ```bash
   
   # use MongoDB Atlas connection string in MONGO_URI
   ```

5. **Run the application**
   ```bash
   # Start backend server
   cd server
   npm run server
   
   # Start frontend (in a new terminal)
   cd client
   npm run dev
   ```

6. **Access the application**
   - Frontend: https://jhatpat-grocery.vercel.app/



## API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Product Endpoints
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create new product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Order Endpoints
- `GET /api/orders` - Get user orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order by ID
- `PUT /api/orders/:id` - Update order status (Admin)

## Testing

### Running Tests
```bash
# Backend tests
cd server
npm test

# Frontend tests
cd client
npm test

# Run all tests with coverage
npm run test:coverage
```

### Package.json Scripts
```json
{
  "scripts": {
    "dev": "nodemon server.js",
    "start": "node server.js",
    "test": "jest",
    "seed": "node seeder.js"
  }
}
```

## Deployment

### Production Build
```bash
# frontend
cd client
npm run dev

# Set NODE_ENV to production
export NODE_ENV=production
```

### Deployment 

#### Vercel (Frontend) + Vercel (Backend)
- Deploy React app to Vercel
- Deploy Express API to Vercel
- Update API endpoints in frontend

#### MongoDB Atlas
- Create a cluster on MongoDB Atlas
- Whitelist IP addresses
- Update MONGO_URI in environment variables


### Code Standards
- Follow ESLint configuration
- Write unit tests for new features
- Update documentation for API changes
- Use semantic commit messages

## Security Considerations

- Input validation and sanitization
- SQL injection prevention
- XSS protection
- CSRF protection
- Rate limiting
- Secure password hashing
- HTTPS enforcement

## Performance Optimization

- Image optimization and lazy loading
- Database query optimization
- Caching strategies (Redis)
- CDN integration
- Code splitting
- Bundle optimization

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support and questions:
- Email: kk2682117@gmail.com
