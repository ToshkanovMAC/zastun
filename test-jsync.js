import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { createApp } from './node_modules/json-server/lib/app.js';
import path from 'path';

async function test() {
  try {
    const adapter = new JSONFile('db.json');
    const db = new Low(adapter, {});
    await db.read();
    const app = createApp(db);
    console.log('App created successfully');
    console.log('App type:', typeof app);
  } catch (e) {
    console.error('Error:', e);
  }
}

test();
