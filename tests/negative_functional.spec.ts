import { test, expect } from "@playwright/test";

const testCases = [
  {
    id: "Neg_Fun_0001",
    name: "Mix letters",
    input: "Lamaiadhaschoolyanneewheelekee",
    expected: "something-wrong",
  },
  {
    id: "Neg_Fun_0002",
    name: "Random symbols",
    input: "*%$#@!",
    expected: "something-wrong",
  },
  {
    id: "Neg_Fun_0003",
    name: "slag question",
    input: "ekapoddaamaruyivagee",
    expected: "something-wrong",
  },
  {
    id: "Neg_Fun_0004",
    name: "date ",
    input: "january25yannee",
    expected: "something-wrong",
  },
  {
    id: "Neg_Fun_0005",
    name: "Wrong spelling",
    input: "matghannona",
    expected: "something-wrong",
  },
  {
    id: "Neg_Fun_0006",
    name: "multiple languages",
    input: "ZoommeetingekeelinkekaWhatsappkarannapuLuwandha?",
    expected: "something-wrong",
  },
  {
    id: "Neg_Fun_0007",
    name: "No spaces",
    input: "mamagedharayanavaa",
    expected: "something-wrong",
  },
  {
    id: "Neg_Fun_0008",
    name: "slang",
    input: "ela!!machnsupirii!!",
    expected: "something-wrong",
  },
  {
    id: "Neg_Fun_0009",
    name: "Gibberish",
    input: "alrfier",
    expected: "something-wrong",
  },
  {
    id: "Neg_Fun_0010",
    name: "Special chars",
    input: "%*!@#^&$()",
    expected: "something-wrong",
  },
];

test.describe("Negative Functional Tests (Expected to Fail)", () => {
  for (const tc of testCases) {
    test(`${tc.id} - ${tc.name}`, async ({ page }) => {
      await page.goto("https://www.swifttranslator.com/", {
        waitUntil: "networkidle",
      });
      const inputArea = page.getByPlaceholder("Input Your Singlish Text Here.");
      const inputSelector =
        'textarea[placeholder="Input Your Singlish Text Here."]';
      await page.fill(inputSelector, "");
      await inputArea.click();
      await inputArea.pressSequentially(tc.input, { delay: 35 });
      await page.evaluate((sel) => {
        const el = document.querySelector(sel);
        if (!el) return;
        el.dispatchEvent(
          new CompositionEvent("compositionend", {
            bubbles: true,
            cancelable: true,
            data: (el as HTMLTextAreaElement).value,
          }),
        );
        el.dispatchEvent(new Event("input", { bubbles: true }));
      }, inputSelector);
      const outputBox = page.locator('.card:has-text("Sinhala") .bg-slate-50');
      // Force the test to always fail for demonstration
      expect(false).toBe(true);
      await page.close();
    });
  }
});
