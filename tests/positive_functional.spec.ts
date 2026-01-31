import { test, expect } from "@playwright/test";

// Increase navigation timeout for all tests in this file
test.use({ navigationTimeout: 60000 });

const testCases = [
  {
    id: "Pos_Fun_0001",
    name: "daily greetin question",
    input: "oyaata kohomadha?",
    expected: "ඔයාට කොහොමද?",
  },
  {
    id: "Pos_Fun_0002",
    name: "simple greeting",
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
    name: "simple sentence",
    input: "mata bath onee",
    expected: "මට බත් ඔනේ",
  },
  {
    id: "Pos_Fun_0006",
    name: "compound sentence",
    input: "api kaeema kanna yanavaa saha chithrapatayakuth balanavaa",
    expected: "අපි කෑම කන්න යනවා සහ චිත්‍රපටයකුත් බලනවා",
  },
  {
    id: "Pos_Fun_0007",
    name: "conditional sentence",
    input: "oyaa enavanam mama balan innavaa",
    expected: "ඔයා එනවනම් මම බලන් ඉන්නවා",
  },
  {
    id: "Pos_Fun_0008",
    name: "imperative sentence",
    input: "vahaama enna",
    expected: "වහාම එන්න",
  },
  {
    id: "Pos_Fun_0009",
    name: "request phrase",
    input: "karuNaakaralaa eka poddak balanna",
    expected: "කරුණාකරලා එක පොඩ්ඩක් බලන්න",
  },
  {
    id: "Pos_Fun_0010",
    name: "past tense sentence",
    input: "mama iyee gedhara giyaa",
    expected: "මම ඉයේ ගෙදර ගියා",
  },
  {
    id: "Pos_Fun_0011",
    name: "present tense sentence",
    input: "api kaeema kanavaa",
    expected: "අපි කෑම කනවා",
  },
  {
    id: "Pos_Fun_0012",
    name: "future tense sentence",
    input: "mama heta enavaa",
    expected: "මම හෙට එනවා",
  },
  {
    id: "Pos_Fun_0013",
    name: "english technical term",
    input: "zoom meeting ekak thiyenavaa",
    expected: "zoom meeting එකක් තියෙනවා",
  },
  {
    id: "Pos_Fun_0014",
    name: "multiple english terms",
    input: "documents tika attach karala mata email ekak evanna",
    expected: "documents ටික attach කරල මට email එකක් එවන්න",
  },
  {
    id: "Pos_Fun_0015",
    name: "Polite phrasing",
    input: "maava gedhara gihin danna puluvandha?",
    expected: "මාවා ගෙදර ගිහින දාන පුලුවන්දහ?",
  },
  {
    id: "Pos_Fun_0016",
    name: "compound sentence with uestion",
    input: "mama gedhara yanavaa oyaa enavadha?",
    expected: "මම ගෙදර යනවා ඔයා එනවද?",
  },
  {
    id: "Pos_Fun_0017",
    name: "complex sentence with negation",
    input: "vaessa unath api yanna epaeyi",
    expected: "වැස්ස උනත් අපි යන්න එපැයි",
  },
  {
    id: "Pos_Fun_0018",
    name: "convert sentense with adverbs and name",
    input: "Amal adha amuthu vidhihata naetuvaa",
    expected: "අමල් අද අමුතු විදිහට නැටුවා",
  },
  {
    id: "Pos_Fun_0019",
    name: "past tense narrative",
    input: "mama mehee edhdhi beheth aran avaa",
    expected: "මම මෙහේ එද්දි බෙහෙත් අරන් අවා",
  },
  {
    id: "Pos_Fun_0020",
    name: "emotional expression",
    input: "oyaa rassaval karanna mahansi venahati dekkahama mata dhuka hithuna,oyaata lankavee adha saappu ayithi aragena raaja kumarayek wagee inna puluvan kenek",
    expected: "ඔයා රස්සවල් කරන්න මහාන්සි වෙනහති දැක්කහම මට දූක හිතුන,ඔයාට ලංකවී අද සප්පු ආයිති අරගෙන රජයකුමරයකට වගේ ඉන්න පුලුවනයකට",
  },
  {
    id: "Pos_Fun_0021",
    name: "Polite request",
    input: "karuNaakarala mata poddak udhav karanna",
    expected: "කරුණාකරල මට පොඩ්ඩක් උදව් කරන්න",
  },
  {
    id: "Pos_Fun_0022",
    name: "convert sentence with name and purpose",
    input: "apita sidhdha venava tharakaa ekka kathaa karanna",
    expected: "අපිට සිද්ද වෙනව තරකා එක්ක කතා කරන්න",
  },
  {
    id: "Pos_Fun_0023",
    name: "comparative sentence",
    input: "podi kaalee api dhaekka lokeyi dhaen lokeyi hari venas",
    expected: "පොඩි කාලේ අපි දැක්ක ලොකෙයි දැන් ලොකෙයි හරි වෙනස්",
  },
  {
    id: "Pos_Fun_0024",
    name: "simple sentence",
    input: "ikmanin haemadheema hariyayi baya venna epaa",
    expected: "ඉක්මනින් හැමදේම හරියයි බය වෙන්න එපා",
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
