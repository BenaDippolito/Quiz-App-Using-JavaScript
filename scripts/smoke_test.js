const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

function shuffleArray(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = crypto.randomInt(0, i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickRandom(arr, n) {
  if (!Array.isArray(arr) || arr.length === 0 || n <= 0) return [];
  const copy = shuffleArray(arr);
  return copy.slice(0, Math.min(n, copy.length));
}

function generateQuiz(
  domains,
  { perDomainCounts = null, totalCount = null, selectedDomains = null } = {}
) {
  const available = Object.keys(domains);
  const chosen =
    selectedDomains && selectedDomains.length
      ? selectedDomains.filter((d) => available.includes(d))
      : available.slice();
  let result = [];

  if (perDomainCounts) {
    for (const [domain, count] of Object.entries(perDomainCounts)) {
      if (!domains[domain]) continue;
      const picks = pickRandom(domains[domain], count);
      // annotate picks with domain
      result = result.concat(picks.map((q) => ({ ...q, _domain: domain })));
    }
  } else if (totalCount && totalCount > 0) {
    const poolSizes = chosen.map((d) => ({
      d,
      size: (domains[d] || []).length,
    }));
    const totalAvailable = poolSizes.reduce((s, p) => s + p.size, 0);
    if (totalAvailable === 0) return [];
    let allocations = poolSizes.map((p) => ({
      d: p.d,
      alloc: Math.floor((p.size / totalAvailable) * totalCount),
    }));
    let allocatedSum = allocations.reduce((s, x) => s + x.alloc, 0);
    let idx = 0;
    while (allocatedSum < totalCount) {
      const domain = allocations[idx % allocations.length];
      if (domain.alloc < (domains[domain.d] || []).length) {
        domain.alloc += 1;
        allocatedSum += 1;
      }
      idx += 1;
      if (idx > 10000) break;
    }
    for (const { d, alloc } of allocations) {
      if (alloc <= 0) continue;
      const picks = pickRandom(domains[d] || [], alloc);
      result = result.concat(picks.map((q) => ({ ...q, _domain: d })));
    }
  }

  result = shuffleArray(result);
  return result;
}

// Load per-domain files domain1..domain7 into a map
const data = {};
for (let i = 1; i <= 7; i++) {
  const k = `domain${i}`;
  const p = path.join(__dirname, "..", "data", `${k}.json`);
  try {
    if (fs.existsSync(p)) {
      const j = JSON.parse(fs.readFileSync(p, "utf8"));
      if (Array.isArray(j)) data[k] = j;
      else if (j && Array.isArray(j[k])) data[k] = j[k];
      else data[k] = [];
    } else {
      data[k] = [];
    }
  } catch (e) {
    data[k] = [];
  }
}

console.log("Domains loaded (per-domain files):");
Object.keys(data).forEach((k) =>
  console.log(`  ${k}: ${(data[k] || []).length} questions`)
);

// Smoke test: run several generations
const runs = 6;
console.log("\nRunning smoke test: generate 3 questions total, 6 times...");
for (let r = 1; r <= runs; r++) {
  const quiz = generateQuiz(data, { totalCount: 3 });
  console.log(`\nRun ${r}: ${quiz.length} questions`);
  quiz.forEach((q, i) => {
    console.log(` ${i + 1}. [${q._domain}] ${q.question}`);
  });
}

// Also test perDomainCounts
console.log(
  "\nNow test perDomainCounts: request domain1:1, domain2:1, domain3:1 (6 runs)"
);
for (let r = 1; r <= runs; r++) {
  const per = { domain1: 1, domain2: 1, domain3: 1 };
  const quiz = generateQuiz(data, { perDomainCounts: per });
  console.log(`\nRun ${r}: ${quiz.length} questions`);
  quiz.forEach((q, i) => {
    console.log(` ${i + 1}. [${q._domain}] ${q.question}`);
  });
}

// If domains have limited items, try requesting more than available
console.log(
  "\nRequesting more questions than available (domain1:2 domain2:2 domain3:2)"
);
const per2 = { domain1: 2, domain2: 2, domain3: 2 };
const quiz2 = generateQuiz(data, { perDomainCounts: per2 });
console.log(`Got ${quiz2.length} questions:`);
quiz2.forEach((q, i) => console.log(` ${i + 1}. [${q._domain}] ${q.question}`));

console.log("\nSmoke test complete.");
