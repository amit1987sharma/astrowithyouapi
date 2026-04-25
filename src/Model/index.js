import User from './User.js';
import Astrologer from './Astrologer.js';
import Booking from './Booking.js';
import Payment from './Payment.js';
import Horoscope from './Horoscope.js';
import Report from './Report.js';
import ContactMessage from './ContactMessage.js';
import AboutPage from './AboutPage.js';
import BlogPost from './BlogPost.js';
import ServiceRequest from './ServiceRequest.js';

// Associations (based on your SQL foreign keys)
User.hasOne(Astrologer, { foreignKey: 'user_id', as: 'astrologerProfile' });
Astrologer.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

User.hasMany(Booking, { foreignKey: 'user_id', as: 'bookings' });
Booking.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

Astrologer.hasMany(Booking, { foreignKey: 'astrologer_id', as: 'bookings' });
Booking.belongsTo(Astrologer, { foreignKey: 'astrologer_id', as: 'astrologer' });

Booking.hasMany(Payment, { foreignKey: 'booking_id', as: 'payments' });
Payment.belongsTo(Booking, { foreignKey: 'booking_id', as: 'booking' });

User.hasMany(Payment, { foreignKey: 'user_id', as: 'payments' });
Payment.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

User.hasMany(Report, { foreignKey: 'user_id', as: 'reports' });
Report.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

export { User, Astrologer, Booking, Payment, Horoscope, Report, ContactMessage, AboutPage, BlogPost, ServiceRequest };

