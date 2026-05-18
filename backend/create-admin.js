const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();

async function createPermanentAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    
    const db = mongoose.connection.db;
    const usersCollection = db.collection('users');
    
    // Check if admin exists
    const adminExists = await usersCollection.findOne({ role: 'admin' });
    
    if (!adminExists) {
      // Create a fixed admin (this admin can never be deleted by the system)
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('Admin@123', salt);
      
      await usersCollection.insertOne({
        name: 'Master Admin',
        email: 'masteradmin@system.com',
        password: hashedPassword,
        role: 'admin',
        isSystemAdmin: true,  // Protected flag
        createdAt: new Date()
      });
      
      console.log('✅ Permanent Admin Created!');
      console.log('📧 Email: masteradmin@system.com');
      console.log('🔑 Password: Admin@123');
    } else {
      console.log('✅ Admin already exists');
    }
    
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error:', error.message);
  }
}

createPermanentAdmin();
