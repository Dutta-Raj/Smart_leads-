const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const readline = require('readline');
dotenv.config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function createEmergencyAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');
    
    const usersCollection = mongoose.connection.db.collection('users');
    
    // Check if any admin exists
    const existingAdmin = await usersCollection.findOne({ role: 'admin' });
    
    if (existingAdmin) {
      console.log('⚠️ An admin already exists in the system!');
      console.log(`   Email: ${existingAdmin.email}`);
      console.log('\n💡 If you forgot password, you can reset it using this script.\n');
      
      rl.question('Do you want to reset admin password? (yes/no): ', async (answer) => {
        if (answer.toLowerCase() === 'yes') {
          rl.question('Enter admin email: ', async (email) => {
            rl.question('Enter new password: ', async (newPassword) => {
              const salt = await bcrypt.genSalt(10);
              const hashedPassword = await bcrypt.hash(newPassword, salt);
              
              await usersCollection.updateOne(
                { email: email, role: 'admin' },
                { $set: { password: hashedPassword } }
              );
              
              console.log('\n✅ Password reset successful!');
              console.log(`📧 Email: ${email}`);
              console.log(`🔑 New Password: ${newPassword}`);
              await mongoose.disconnect();
              rl.close();
              process.exit(0);
            });
          });
        } else {
          console.log('Exiting...');
          await mongoose.disconnect();
          rl.close();
          process.exit(0);
        }
      });
    } else {
      console.log('🔴 No admin found in the system!');
      console.log('📝 Creating emergency admin...\n');
      
      rl.question('Enter admin name: ', async (name) => {
        rl.question('Enter admin email: ', async (email) => {
          rl.question('Enter admin password: ', async (password) => {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            
            await usersCollection.insertOne({
              name: name,
              email: email,
              password: hashedPassword,
              role: 'admin',
              isEmergencyAdmin: true,
              createdAt: new Date()
            });
            
            console.log('\n✅ Emergency Admin Created Successfully!');
            console.log('📋 Admin Credentials:');
            console.log(`   Name: ${name}`);
            console.log(`   Email: ${email}`);
            console.log(`   Password: ${password}`);
            console.log('\n🔐 You can now login with these credentials.');
            
            await mongoose.disconnect();
            rl.close();
            process.exit(0);
          });
        });
      });
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
    await mongoose.disconnect();
    rl.close();
    process.exit(1);
  }
}

console.log('🔧 EMERGENCY ADMIN RECOVERY TOOL\n');
createEmergencyAdmin();
