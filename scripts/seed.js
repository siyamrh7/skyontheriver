import { config } from 'dotenv';
config({ path: '.env.local' });
import bcrypt from 'bcryptjs';
import connectDB from '../lib/mongodb.js';
import Cabin from '../lib/models/Cabin.js';
import Settings from '../lib/models/Settings.js';
import User from '../lib/models/User.js';
import { defaultFotos } from '../lib/utils/photoSlots.js';
import {
  DEFAULT_DEKKEN,
  DEFAULT_SUITES,
  DEFAULT_SUITE_PRIJS,
  DEFAULT_JUNIOR,
  DEFAULT_JUNIOR_PRIJS,
  DEFAULT_PROGRAMMA,
} from '../lib/utils/defaults.js';

async function seed() {
  await connectDB();

  let settings = await Settings.findOne();
  if (!settings) {
    settings = await Settings.create({
      dekken: DEFAULT_DEKKEN,
      suites: DEFAULT_SUITES,
      suitePrijs: DEFAULT_SUITE_PRIJS,
      junior: DEFAULT_JUNIOR,
      juniorPrijs: DEFAULT_JUNIOR_PRIJS,
      programma: DEFAULT_PROGRAMMA,
      fotos: defaultFotos(),
    });
    console.log('Settings seeded.');
  } else {
    console.log('Settings already exist — skipped.');
  }

  const cabinCount = await Cabin.countDocuments();
  if (cabinCount === 0) {
    const cabins = [];
    for (const dek of DEFAULT_DEKKEN) {
      for (let n = dek.van; n <= dek.tot; n++) cabins.push({ nummer: n, status: 'vrij' });
    }
    await Cabin.insertMany(cabins);
    console.log(`${cabins.length} cabins seeded.`);
  } else {
    console.log(`Cabins already exist (${cabinCount}) — skipped.`);
  }

  const userCount = await User.countDocuments();
  if (userCount === 0) {
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;
    if (!email || !password) {
      console.log('No admin user created — set ADMIN_EMAIL and ADMIN_PASSWORD in .env.local and re-run `npm run seed`.');
    } else {
      const passwordHash = await bcrypt.hash(password, 10);
      await User.create({ email: email.toLowerCase(), passwordHash });
      console.log(`Admin user created: ${email}`);
    }
  } else {
    console.log('Admin user already exists — skipped.');
  }

  console.log('Seed complete.');
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
