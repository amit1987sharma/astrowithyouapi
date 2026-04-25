/**
 * Seed blog_posts with 2–3 dummy entries.
 * Run from astroapi root: node scripts/seed-blog.js
 */
import 'dotenv/config';
import sequelize from '../src/Config/sequelize.js';
import BlogPost from '../src/Model/BlogPost.js';

const DUMMY_POSTS = [
  {
    title: 'Understanding Your Daily Horoscope',
    slug: 'understanding-daily-horoscope',
    excerpt: 'Learn how to read and apply your daily horoscope for better decision-making and self-awareness.',
    content: 'Your daily horoscope is more than just a fun read—it can offer insights into your day ahead. Astrologers use the positions of the planets and the zodiac to provide guidance on love, career, and health.\n\nIn this post we explore how to interpret your sign and use the advice in a practical way.',
    status: 'published',
    meta_title: 'Understanding Your Daily Horoscope | Astrologger',
    meta_description: 'Learn how to read and apply your daily horoscope for better decisions.',
  },
  {
    title: 'Best Practices for Your First Astrology Consultation',
    slug: 'first-astrology-consultation-tips',
    excerpt: 'What to expect and how to prepare for your first session with an astrologer.',
    content: 'Booking your first astrology consultation can feel exciting but also a bit uncertain. Here are some tips to get the most out of your session.\n\n1. Have your birth details ready: date, time, and place of birth.\n2. Think about the areas you want guidance on—career, relationships, or life direction.\n3. Come with an open mind and specific questions.\n\nOur verified astrologers are here to help you navigate life with clarity.',
    status: 'published',
    meta_title: 'First Astrology Consultation Tips | Astrologger',
    meta_description: 'How to prepare for your first astrology consultation.',
  },
  {
    title: 'The Role of Moon Signs in Emotional Astrology',
    slug: 'moon-signs-emotional-astrology',
    excerpt: 'Your moon sign reveals your inner world. Discover how it shapes your emotions and reactions.',
    content: 'While your sun sign often gets the spotlight, your moon sign plays a crucial role in how you process emotions and feel secure.\n\nThe moon moves quickly through the zodiac, and its position at your birth can reveal your emotional nature, needs, and how you nurture others. Understanding your moon sign can bring clarity to your reactions and relationships.\n\nConsider consulting an astrologer to get a full picture of your chart, including your moon sign.',
    status: 'published',
    meta_title: 'Moon Signs and Emotional Astrology | Astrologger',
    meta_description: 'How your moon sign shapes your emotions and inner world.',
  },
];

async function seed() {
  try {
    await sequelize.authenticate();
    console.log('Database connected.');

    const existing = await BlogPost.count();
    if (existing > 0) {
      console.log(`blog_posts already has ${existing} row(s). Skipping seed to avoid duplicates.`);
      process.exit(0);
      return;
    }

    await BlogPost.bulkCreate(DUMMY_POSTS);
    console.log(`Inserted ${DUMMY_POSTS.length} blog post(s).`);
    process.exit(0);
  } catch (err) {
    console.error('Seed failed:', err.message);
    process.exit(1);
  }
}

seed();
