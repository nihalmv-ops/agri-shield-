import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from './models/User.js';
import Product from './models/Product.js';
import Complaint from './models/Complaint.js';
import WildlifeAlert from './models/WildlifeAlert.js';
import CameraTrap from './models/CameraTrap.js';
import ActivityLog from './models/ActivityLog.js';
import {
  seedUsers,
  seedCameras,
  seedAlerts,
  seedComplaints,
  seedActivities
} from './utils/seedData.js';

dotenv.config();

const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/agrishield';
    await mongoose.connect(mongoUri);
    console.log(`[Seed] Connected to MongoDB at ${mongoUri}`);

    // Clear existing collections
    await User.deleteMany({});
    await Product.deleteMany({});
    await Complaint.deleteMany({});
    await WildlifeAlert.deleteMany({});
    await CameraTrap.deleteMany({});
    await ActivityLog.deleteMany({});
    console.log('[Seed] Cleared existing database records.');

    // 1. Create Users
    const createdUsers = [];
    for (const u of seedUsers) {
      const user = await User.create(u);
      createdUsers.push(user);
    }
    console.log(`[Seed] Created ${createdUsers.length} users (Officers, Farmers, Users).`);

    const farmerRahul = createdUsers.find(u => u.email === 'rahul.farmer@agrishield.com');
    const farmerAnjali = createdUsers.find(u => u.email === 'anjali.idukki@agrishield.com');

    // 2. Create Marketplace Products
    const productsData = [
      {
        name: 'Fresh Wayanad Organic Tomatoes',
        category: 'Vegetables',
        price: 60,
        priceUnit: 'kg',
        quantity: 100,
        quantityUnit: 'kg',
        description: 'Farm-fresh, vine-ripened red tomatoes organically cultivated without synthetic chemical pesticides in the high-altitude volcanic soil of Wayanad.',
        image: 'https://images.unsplash.com/photo-1546470427-227c7369a489?auto=format&fit=crop&w=800&q=80',
        images: [
          'https://images.unsplash.com/photo-1546470427-227c7369a489?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80'
        ],
        seller: farmerRahul._id,
        sellerName: farmerRahul.name,
        sellerPhone: farmerRahul.phone,
        sellerWhatsApp: '919847123456',
        sellerBio: 'Organic grower managing 4.5 acres in Sultan Bathery.',
        location: 'Sultan Bathery',
        district: 'Wayanad',
        isOrganic: true,
        status: 'active',
        featured: true
      },
      {
        name: 'Highland Malabar Black Pepper (Panniyur-1)',
        category: 'Spices',
        price: 680,
        priceUnit: 'kg',
        quantity: 45,
        quantityUnit: 'kg',
        description: 'GI-tagged high-piperine Malabar black peppercorns sun-dried on clean bamboo mats from old-growth Wayanad vines.',
        image: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=800&q=80',
        images: [
          'https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=800&q=80'
        ],
        seller: farmerRahul._id,
        sellerName: farmerRahul.name,
        sellerPhone: farmerRahul.phone,
        sellerWhatsApp: '919847123456',
        sellerBio: 'Direct farmer supply of export-grade spices.',
        location: 'Meenangadi',
        district: 'Wayanad',
        isOrganic: true,
        status: 'active',
        featured: true
      },
      {
        name: 'Single-Estate Shade Grown Robusta Coffee Beans',
        category: 'Rice & Grains',
        price: 380,
        priceUnit: 'kg',
        quantity: 80,
        quantityUnit: 'kg',
        description: 'Washed and sun-dried Robusta cherry coffee beans harvested at 900m altitude in Wayanad hills. Deep chocolate profile.',
        image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=800&q=80',
        seller: farmerRahul._id,
        sellerName: farmerRahul.name,
        sellerPhone: farmerRahul.phone,
        sellerWhatsApp: '919847123456',
        location: 'Mananthavady',
        district: 'Wayanad',
        isOrganic: true,
        status: 'active'
      },
      {
        name: 'Green Cardamom (Alleppey Green Extra Bold)',
        category: 'Spices',
        price: 2400,
        priceUnit: 'kg',
        quantity: 15,
        quantityUnit: 'kg',
        description: 'Extra-bold 8mm+ emerald cardamom pods cured in traditional firewood kilns on the misty Cardamom Hills of Idukki.',
        image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80',
        seller: farmerAnjali._id,
        sellerName: farmerAnjali.name,
        sellerPhone: farmerAnjali.phone,
        sellerWhatsApp: '919446287654',
        location: 'Vandiperiyar',
        district: 'Idukki',
        isOrganic: true,
        status: 'active',
        featured: true
      },
      {
        name: 'Pure Wild Forest Honey (Unprocessed)',
        category: 'Dairy Products',
        price: 650,
        priceUnit: 'bottle (750ml)',
        quantity: 25,
        quantityUnit: 'bottle',
        description: 'Ethically harvested multi-floral raw honey from Western Ghats apiaries. Rich in pollen, enzymes and medicinal flavonoids.',
        image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80',
        seller: farmerAnjali._id,
        sellerName: farmerAnjali.name,
        sellerPhone: farmerAnjali.phone,
        sellerWhatsApp: '919446287654',
        location: 'Peerumade',
        district: 'Idukki',
        isOrganic: true,
        status: 'active'
      }
    ];

    const createdProducts = await Product.insertMany(productsData);
    console.log(`[Seed] Created ${createdProducts.length} marketplace product listings.`);

    // 3. Create Cameras
    const createdCameras = await CameraTrap.insertMany(seedCameras);
    console.log(`[Seed] Created ${createdCameras.length} AI camera trap sensor nodes.`);

    // 4. Create Alerts
    const createdAlerts = await WildlifeAlert.insertMany(seedAlerts);
    console.log(`[Seed] Created ${createdAlerts.length} wildlife alerts.`);

    // 5. Create Complaints
    const complaintsWithRefs = seedComplaints.map(c => ({
      ...c,
      user: farmerRahul._id
    }));
    const createdComplaints = await Complaint.insertMany(complaintsWithRefs);
    console.log(`[Seed] Created ${createdComplaints.length} complaints.`);

    // 6. Create Activities
    const createdActivities = await ActivityLog.insertMany(seedActivities);
    console.log(`[Seed] Created ${createdActivities.length} tactical activity stream logs.`);

    console.log('\n=============================================');
    console.log('✅ AgriShield Database Seeded Successfully!');
    console.log('=============================================');
    console.log('Forest Officer Login: officer@agrishield.gov.in / password123');
    console.log('Farmer Login:         rahul.farmer@agrishield.com / password123');
    console.log('User Login:           suresh.user@agrishield.com / password123');
    console.log('=============================================\n');

    process.exit(0);
  } catch (error) {
    console.error('[Seed Error]:', error);
    process.exit(1);
  }
};

seedDatabase();

