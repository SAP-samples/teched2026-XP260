/**
 * Memory allocation utility to artificially increase application memory usage
 * This allocates approximately 300 MB of memory and keeps it allocated
 */

let memoryBuffer = null;

/**
 * Allocates 300 MB of memory by creating a large buffer
 * The memory will remain allocated until the application shuts down
 */
function allocateMemory() {
  const memorySize = 300 * 1024 * 1024; // 300 MB in bytes

  try {
    console.log('Allocating 300 MB of memory...');

    // Create a buffer filled with random data to ensure it's actually allocated
    memoryBuffer = Buffer.alloc(memorySize);

    // Fill buffer with some data to ensure memory is actually used
    for (let i = 0; i < memoryBuffer.length; i += 4096) {
      memoryBuffer.writeInt32BE(Math.floor(Math.random() * 1000000), i);
    }

    console.log(`Successfully allocated ${(memorySize / 1024 / 1024).toFixed(0)} MB of memory`);

    // Log memory usage
    const memUsage = process.memoryUsage();
    console.log('Memory usage after allocation:');
    console.log(`  RSS: ${(memUsage.rss / 1024 / 1024).toFixed(2)} MB`);
    console.log(`  Heap Used: ${(memUsage.heapUsed / 1024 / 1024).toFixed(2)} MB`);
    console.log(`  Heap Total: ${(memUsage.heapTotal / 1024 / 1024).toFixed(2)} MB`);
    console.log(`  External: ${(memUsage.external / 1024 / 1024).toFixed(2)} MB`);
  } catch (error) {
    console.error('Failed to allocate memory:', error.message);
    throw error;
  }
}

/**
 * Returns information about current memory usage
 */
function getMemoryInfo() {
  const memUsage = process.memoryUsage();
  return {
    rss: Math.round(memUsage.rss / 1024 / 1024),
    heapUsed: Math.round(memUsage.heapUsed / 1024 / 1024),
    heapTotal: Math.round(memUsage.heapTotal / 1024 / 1024),
    external: Math.round(memUsage.external / 1024 / 1024),
    bufferAllocated: memoryBuffer ? Math.round(memoryBuffer.length / 1024 / 1024) : 0
  };
}

module.exports = {
  allocateMemory,
  getMemoryInfo
};
