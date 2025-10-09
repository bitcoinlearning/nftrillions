import { MemStorage } from '../server/storage.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function exportData() {
  const storage = new MemStorage();
  
  const slices = await storage.getAllSlices();
  const stats = await storage.getDebtStats();
  
  const data = {
    slices: slices,
    stats: stats,
    lastUpdated: new Date().toISOString()
  };
  
  const outputPath = path.join(__dirname, '../client/public/data.json');
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
  
  console.log(`✅ Exported ${slices.length} slices to ${outputPath}`);
  console.log(`📊 Current debt: ${stats.currentDebt}`);
  console.log(`🔓 Unlocked slices: ${stats.unlockedSlices}`);
}

exportData().catch(err => {
  console.error('❌ Export failed:', err);
  process.exit(1);
});
