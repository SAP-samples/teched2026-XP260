const cds = require('@sap/cds/lib')
const log = require('cf-nodejs-logging-support')
const { allocateMemory, getMemoryInfo } = require('../memory-allocator')

const logger = log.createLogger();

// IDs that are intentionally missing from seed data — always produce error logs
const MISSING_BOOK_IDS = [9999, 8888];

// Flag to ensure memory is allocated only once
let memoryAllocated = false;

module.exports = class AdminService extends cds.ApplicationService {
  async init(){
    // Allocate memory when the service initializes
    if (!memoryAllocated) {
      try {
        logger.info('AdminService initializing - allocating memory...');
        allocateMemory();
        memoryAllocated = true;

        // Add a periodic memory report every 30 seconds
        setInterval(() => {
          const info = getMemoryInfo();
          logger.info(`Memory status - RSS: ${info.rss}MB, Heap: ${info.heapUsed}MB, Buffer: ${info.bufferAllocated}MB`);
        }, 30000);
      } catch (error) {
        logger.error('Warning: Failed to allocate additional memory in AdminService:', error.message);
      }
    }

    // Start catalog integrity checks after the DB is connected
    cds.on('served', () => {
      checkCatalog();
      setInterval(checkCatalog, 60 * 1000);
    });

    this.before ('NEW','Authors', genid)
    this.before ('NEW','Books', genid)
    return super.init()
  }
}

/** Log info for every book in the catalog, error for each missing ID. */
async function checkCatalog() {
  try {
    const db = await cds.connect.to('db');

    // Info log for every book that exists
    const books = await db.run(SELECT.from('sap.capire.bookshop.Books').columns('ID', 'title'));
    for (const book of books) {
      logger.info(`[Catalog] Book ID ${book.ID} found: "${book.title}"`);
    }

    // Error log for each ID that should exist but doesn't
    for (const id of MISSING_BOOK_IDS) {
      const book = await db.run(SELECT.one.from('sap.capire.bookshop.Books').where({ ID: id }));
      if (!book) {
        logger.error(`[Catalog] Book ID ${id} not found. Possible data migration issue.`);
      }
    }
  } catch (err) {
    logger.error('[Catalog] Catalog check failed:', err.message);
  }
}

/** Generate primary keys for target entity in request */
async function genid (req) {
  const {ID} = await cds.tx(req).run (SELECT.one.from(req.target).columns('max(ID) as ID'))
  req.data.ID = ID - ID % 100 + 100 + 1
}
