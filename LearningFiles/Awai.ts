// 5️⃣ Async / Await & Promises (MOST CRITICAL TOPIC)
// ❓ Why Async is Needed
// Playwright actions:
// Open browser
// Click button
// Load page
// All take time → they return Promises.
// 🔹 Promise (Simple Explanation)
// A promise means: 
// “I will give you the result later.”

const promise = new Promise((resolve) => {
    setTimeout(() => {
      resolve("Done!");
    }, 2000);
  });
//   This says:
//   Wait 2 seconds
//   Then return "Done!"

//ASYNC
//You can only use await inside an async function.
async function example() {
    const result = await promise;
    console.log(result);
  }

//AWAIT - these statements will throw error as they are not inside an async function.
//await page.goto("https://example.com");
//await page.click("#login");

// Every Playwright action returns a Promise.
// You MUST use await.

//Error handling with async/await
// try {
//     await page.click("#submit");
//   } catch (error) {
//     console.error("Button not found");
//   }