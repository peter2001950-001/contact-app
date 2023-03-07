import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:4200/');
  await page.goto('http://localhost:4200/contacts');
  await page.getByRole('button', { name: 'Add new contact' }).click();
  await page.getByLabel('First name').click();
  await page.getByLabel('First name').fill(labelGen(15));
  await page.getByLabel('First name').press('Tab');
  await page.getByLabel('Surname').fill(labelGen(11));
  await page.getByLabel('Phone number').click();
  await page.getByLabel('Phone number').click();
  await page.getByLabel('Phone number').fill('+359896314939');
  await page.locator('.p-inputtext.p-inputmask').click();
  await page.locator('.p-inputtext.p-inputmask').fill('23/04/2001');
  await page.locator('span').filter({ hasText: 'Address' }).locator('#lastName').click();
  await page.locator('span').filter({ hasText: 'Address' }).locator('#lastName').fill('Ivan test street');
  await page.locator('span').filter({ hasText: 'Iban' }).locator('#lastName').click();
  await page.locator('span').filter({ hasText: 'Iban' }).locator('#lastName').fill('AT483200000012345864');
  await page.getByRole('button', { name: 'Save changes' }).click();
  expect(page.getByText("Successfully saved contact")).toBeDefined()
});

function labelGen(length:number) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}
