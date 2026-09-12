# Holly Money Kitchen & Fries

Production-ready restaurant web application built with React, Tailwind CSS, and modern UI/UX practices.

## Features

### 🍽️ Customer Features
- **Dynamic Menu**: Browse 10+ categories with real-time search
- **Shopping Cart**: Add/remove items, manage quantities
- **Order Management**: Pickup or delivery options with customer details
- **WhatsApp Integration**: Send orders directly to WhatsApp
- **Table Reservations**: Book tables with date, time, and guest count
- **Restaurant Status**: Live indicator showing if restaurant is open (9 AM - 1 AM)

### 🔧 Admin Features
- **Live Orders Dashboard**: View pending, preparing, and completed orders
- **Reservation Management**: Track all table bookings
- **Menu Toggle**: Mark items as available or out of stock
- **Order Status Updates**: Update order progress in real-time

### 📱 Design & Performance
- **Mobile-First**: Fully responsive design optimized for all devices
- **Dark Mode**: Premium dark theme with warm amber/gold accents
- **Fast Loading**: Vite-powered instant development and production builds
- **Local Storage**: Persist cart, orders, and reservations
- **Smooth Animations**: Tailwind CSS transitions for polished interactions

## Tech Stack

- **Frontend**: React 18
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Icons**: Lucide React
- **State Management**: React Context API
- **Storage**: Browser LocalStorage

## Getting Started

### Prerequisites
- Node.js 16+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/nwiichun/holly-money-kitchen.git
cd holly-money-kitchen

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The app will open at `http://localhost:3000`

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.jsx      # Navigation bar with cart
│   ├── Hero.jsx        # Landing hero section
│   ├── Menu.jsx        # Menu with categories and search
│   ├── Cart.jsx        # Shopping cart drawer
│   ├── Reservation.jsx # Table reservation form
│   └── Admin.jsx       # Admin dashboard
├── context/
│   └── CartContext.jsx # Global cart & order state
├── data/
│   └── menuData.js     # Restaurant info & menu items
├── utils/
│   └── helpers.js      # Utility functions
├── App.jsx             # Main app component
├── main.jsx            # React entry point
└── index.css           # Global styles & Tailwind
```

## Restaurant Details

**Holly Money Kitchen and Fries**
- 📍 City Centre, behind Arkin Colony Hotel
- ☎️ +90 5488789193
- 🕐 9:00 AM - 1:00 AM (Daily)
- 📸 [@hollymoney_kitchen](https://www.instagram.com/hollymoney_kitchen)

## Menu Categories

1. Rice Menu (7 items)
2. Swallow Menu (4 items)
3. Protein/Meat Add-ons (8 items)
4. Soups (6 items)
5. Breakfast Menu (4 items)
6. Special Menu (6 items)
7. Nigerian Classics (5 items)
8. Casual & Fast Foods (7 items)
9. Sides & Extras (5 items)
10. Drinks & Beverages (5 items)

## Features in Detail

### Order Management
- Add items to cart with quantity controls
- Choose between pickup and delivery
- Enter customer details and special requests
- Submit orders or send via WhatsApp
- Real-time order status tracking

### Reservations
- Book tables for specific dates and times
- Flexible guest count (1-20+)
- Add special requests (occasions, dietary needs, etc.)
- Instant confirmation with booking details

### Admin Dashboard
- Monitor all incoming orders
- Track table reservations
- Toggle item availability on the fly
- Update order status (Pending → Preparing → Completed)

## Dark Mode Design

- Primary background: #111827 (gray-900)
- Accent color: #f59e0b (amber-500)
- Border/secondary: #374151 (gray-700)
- Text: White (#ffffff) and #d1d5db (gray-300)

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

MIT License - See LICENSE file for details

## Support

For questions or issues:
- 📧 Email: contact@hollymoneykitchen.com
- 📞 Phone: +90 5488789193
- 💬 WhatsApp: https://wa.me/905488789193
