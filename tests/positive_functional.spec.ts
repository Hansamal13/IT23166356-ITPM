import { test, expect } from "@playwright/test";

// Increase navigation timeout for all tests in this file
test.use({ navigationTimeout: 60000 });

const testCases = [
  {
    id: "Pos_Fun_0001",
    name: "Greeting phrase",
    input: "oyaata kohomadha?",
    expected: "ඔයාට කොහොමද?",
  },
  {
    id: "Pos_Fun_0002",
    name: "Mixed-language input",
    input: "aayuboovan!",
    expected: "ආයුබෝවන්!",
  },
  {
    id: "Pos_Fun_0003",
    name: "Short request",
    input: "hari, mama karannam",
    expected: "හරි, මම කරන්නම්",
  },
  {
    id: "Pos_Fun_0004",
    name: "Simple sentence",
    input: "mama gedhara yanvaa",
    expected: "මම ගෙදර යන්වා",
  },
  {
    id: "Pos_Fun_0005",
    name: "Compound sentence",
    input: "mata bath onee",
    expected: "මට බත් ඔනේ",
  },
  {
    id: "Pos_Fun_0006",
    name: "Question sentence",
    input: "api kaeema kanna yanavaa saha chithrapatayakuth balanavaa",
    expected: "අපි කෑම කන්න යනවා සහ චිත්‍රපටයකුත් බලනවා",
  },
  {
    id: "Pos_Fun_0007",
    name: "Imperative",
    input: "oyaa enavanam mama balan innavaa",
    expected: "ඔයා එනවනම් මම බලන් ඉන්නවා",
  },
  {
    id: "Pos_Fun_0008",
    name: "Polite phrase",
    input: "vahaama enna",
    expected: "වහාම එන්න",
  },
  {
    id: "Pos_Fun_0009",
    name: "Negative sentence",
    input: "karuNaakaralaa eka poddak balanna",
    expected: "කරුණාකරලා එක පොඩ්ඩක් බලන්න",
  },
  {
    id: "Pos_Fun_0010",
    name: "Long sentence",
    input: "mama iyee gedhara giyaa",
    expected: "මම ඉයේ ගෙදර ගියා",
  },
  {
    id: "Pos_Fun_0011",
    name: "Thanks phrase",
    input: "api kaeema kanavaa",
    expected: "අපි කෑම කනවා",
  },
  {
    id: "Pos_Fun_0012",
    name: "Apology phrase",
    input: "mama heta enavaa",
    expected: "මම හෙට එනවා",
  },
  {
    id: "Pos_Fun_0013",
    name: "Instruction sentence",
    input: "zoom meeting ekak thiyenavaa",
    expected: "zoom meeting එකක් තියෙනව",
  },
  {
    id: "Pos_Fun_0014",
    name: "Request sentence",
    input: "documents tika attach karala mata email ekak evanna",
    expected: "මට ටිකක් දෙන්න පුළුවන්ද?",
  },
  {
    id: "Pos_Fun_0015",
    name: "Future tense",
    input: "maava gedhara gihin danna puluvandha?",
    expected: "මම ලබන සතියේ කියන්නම්",
  },
  {
    id: "Pos_Fun_0016",
    name: "Past tense",
    input: "mama gedhara yanavaa oyaa enavadha?",
    expected: "මට අමාරුවක් තිබ්බා",
  },
  {
    id: "Pos_Fun_0017",
    name: "Emotional phrase",
    input: "vessa unath api yanna epayi",
    expected: "මට හරිම අප්පිරියයි",
  },
  {
    id: "Pos_Fun_0018",
    name: "Advice sentence",
    input: "Amal adha amuthu widihata natuvaa",
    expected: "දිනපතා උදේට දුවන්න",
  },
  {
    id: "Pos_Fun_0019",
    name: "Motivation",
    input: "mama mehee eddi beheth aran avaa",
    expected: "ඔබට එය උඩ දැමිය හැකියි",
  },
  {
    id: "Pos_Fun_0020",
    name: "Simple chat",
    input: "oyaa rassaval karanna mahansi venahati dekkahama mata dhuka hithuna,oyaata lankavee adha saappu ayithi aragena raaja kumarayek wagee inna puluvan kenek",
    expected: "",
  },
  {
    id: "Pos_Fun_0021",
    name: "Polite request",
    input: "karunakarala mata poddak udav karanna",
    expected: "කරුණකරලා අරින්න",
  },
  {
    id: "Pos_Fun_0022",
    name: "Simple answer",
    input: "apita sidda venava tharakaa ekka kathaa karanna",
    expected: "හොඳයි",
  },
  {
    id: "Pos_Fun_0023",
    name: "Simple negative",
    input: "podi kaalee api dekka lokeyi den lokeyi hari venas",
    expected: "කැතයි",
  },
  {
    id: "Pos_Fun_0024",
    name: "Simple thanks",
    input: "ikmanin hemadhema hariyai baya venna epaa",
    expected: "ස්තුතියි",
  },
];

test.describe("Positive Functional Tests", () => {
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
      await expect(outputBox).toContainText(tc.expected, { timeout: 10000 });
      const output = await outputBox.textContent();
      expect(output).toContain(tc.expected);
      await page.close();
    });
  }
});
