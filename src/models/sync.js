import User from './User.js';
import Car from './Car.js';
import Location from './Location.js';

User.sync({ alter: true });
Car.sync({ alter: true });
Location.sync({ alter: true });
