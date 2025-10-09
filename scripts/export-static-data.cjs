#!/usr/bin/env node

/**
 * Export static data for static deployment
 * This script fetches fresh data from the running server and exports it to JSON files
 */

const fs = require('fs');
const path = require('path');
const http = require('http');

const SERVER_URL = 'http://localhost:5000';
const OUTPUT_DIR = path.join(__dirname, '..', 'client', 'public');

async function fetchData(endpoint) {
  return new Promise((resolve, reject) => {
    http.get(`${SERVER_URL}${endpoint}`, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (err) {
          reject(err);
        }
      });
    }).on('error', reject);
  });
}

async function main() {
  console.log('🚀 Exporting static data...\n');
  
  try {
    // Fetch slices
    console.log('📦 Fetching slices...');
    const slices = await fetchData('/api/slices');
    const slicesPath = path.join(OUTPUT_DIR, 'slices.json');
    fs.writeFileSync(slicesPath, JSON.stringify(slices, null, 2));
    console.log(`✅ Exported ${slices.length} slices to ${slicesPath}`);
    
    // Fetch debt stats
    console.log('📊 Fetching debt stats...');
    const stats = await fetchData('/api/debt-stats');
    const statsPath = path.join(OUTPUT_DIR, 'stats.json');
    fs.writeFileSync(statsPath, JSON.stringify(stats, null, 2));
    console.log(`✅ Exported debt stats to ${statsPath}`);
    console.log(`   Current debt: ${stats.currentDebt}`);
    console.log(`   Unlocked slices: ${stats.unlockedSlices}`);
    
    console.log('\n✨ Static data export complete!');
  } catch (error) {
    console.error('❌ Error exporting data:', error.message);
    console.error('\nMake sure the development server is running: npm run dev');
    process.exit(1);
  }
}

main();
