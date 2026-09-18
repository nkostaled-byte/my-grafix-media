const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Set viewport to match desktop
  await page.setViewport({ width: 1920, height: 1080 });
  
  // Navigate to the page
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle2' });
  
  // Scroll to the Living System section
  await page.evaluate(() => {
    const section = Array.from(document.querySelectorAll('section')).find(s => 
      s.textContent.includes('Intelligence, moving through the business')
    );
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
  
  await page.waitForTimeout(1000);
  
  // Get the scenario state
  console.log('=== Testing Customer Scenario (3→5 transition) ===');
  
  // Find and click the "Customer" button
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const customerBtn = buttons.find(b => b.textContent.trim() === 'Customer');
    if (customerBtn) customerBtn.click();
  });
  
  await page.waitForTimeout(500);
  
  // Take screenshot at step 3→5 transition
  await page.screenshot({ path: 'customer-scenario.png', fullPage: false });
  console.log('Screenshot saved: customer-scenario.png');
  
  // Test Business scenario
  console.log('\n=== Testing Business Scenario (3→5 transition) ===');
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const businessBtn = buttons.find(b => b.textContent.trim() === 'Business');
    if (businessBtn) businessBtn.click();
  });
  
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'business-scenario.png', fullPage: false });
  console.log('Screenshot saved: business-scenario.png');
  
  // Test Lead scenario
  console.log('\n=== Testing Lead Scenario (all adjacent) ===');
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const leadBtn = buttons.find(b => b.textContent.trim() === 'Lead');
    if (leadBtn) leadBtn.click();
  });
  
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'lead-scenario.png', fullPage: false });
  console.log('Screenshot saved: lead-scenario.png');
  
  await browser.close();
  console.log('\nTest complete!');
})();
