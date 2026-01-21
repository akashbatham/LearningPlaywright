import {test,expect, Page, Locator} from '@playwright/test'

const date = '28';
const month = 'November';
const pastyear = 2023;
const futureyear = 2028;

test('Date Picker One', async ({page}) => {
    await page.goto('https://testautomationpractice.blogspot.com/')
    //Option one - if the date picker has tag of input, then we can fill the date in the field
    //await datepick.fill(`${month}/${date}/${year}`);

    selectDate(date, month, pastyear, page);
    await page.waitForTimeout(10000);
    selectDate(date, month, futureyear, page);
    await page.waitForTimeout(10000);
})

async function selectDate(date: string, month: string, year: number,page: Page) {
  //You can add an argument for the calendar to be passed as a parameter to make it more flexible
  const datepick = page.locator('#datepicker');
  await datepick.click();
  const Months = ['January','February','March','April','May','June', 'July','August','September','October','November','December'];
  const targetMonthIndex = Months.indexOf(month);
  const calendar = page.locator('#ui-datepicker-div');
  await expect(calendar).toBeVisible();
  
  const monthLabel = calendar.locator('.ui-datepicker-month');
  const yearLabel = calendar.locator('.ui-datepicker-year');
  while((await monthLabel.textContent())?.trim() !== month || Number(await yearLabel.textContent()) !== year) {
    const displayedMonth = (await monthLabel.textContent())?.trim()!;
    const displayedYear = Number(await yearLabel.textContent());
    const displayedMonthIndex = Months.indexOf(displayedMonth);

    if (displayedYear > year || (displayedYear === year && displayedMonthIndex > targetMonthIndex)) {
      await calendar.getByTitle('Prev').click();
    } else {
      await calendar.getByTitle('Next').click();
    }
  }
  await calendar.getByRole('cell', {name: date}).click();
}

/*
🧠 Truth Table (THIS is the root cause)

Let’s assume your target is November 2023.

Current Month	Current Year	Month Wrong?	Year Wrong?	AND (&&)	Loop runs?
March	2025	✅	✅	✅	✔️
November2025	❌	✅	❌	❌ (Stops too early)
October 2023	✅	❌	❌	❌
November2023	❌	❌	❌	❌ (Correct stop)

*/

/*

async function selectDate(date: string, month: string, year: number,page: Page) {
  const MONTHS = ['January','February','March','April','May','June', 'July','August','September','October','November','December'];
  
  const calendar = page.locator('#ui-datepicker-div');
  await expect(calendar).toBeVisible();
  
  1const monthLabel = calendar.locator('.ui-datepicker-month');
  const yearLabel = calendar.locator('.ui-datepicker-year');
  
  const targetMonthIndex = MONTHS.indexOf(month);
  console.log('TMI: ',targetMonthIndex);
  let guard = 0;
  
  while (guard < 50) {
    2const displayedMonth = (await monthLabel.textContent())?.trim()!;
    const displayedYear = Number((await yearLabel.textContent())?.trim());
  
    3const displayedMonthIndex = MONTHS.indexOf(displayedMonth);
    console.log('DMI: ',displayedMonthIndex);
  
    if (displayedYear === year && displayedMonthIndex === targetMonthIndex) {
      break;
    }
  
    if (displayedYear > year || (displayedYear === year && displayedMonthIndex > targetMonthIndex)) {
      await calendar.getByTitle('Prev').click();
    } else {
      await calendar.getByTitle('Next').click();
    }
      guard++;
    }
  
  await calendar.getByRole('cell', {name: date, exact: true}).click();
}
  
*/