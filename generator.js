// generator.js
// Small client-side quiz generator: loads per-domain question sets from
// files `data/domain1.json` … `data/domain7.json` and assembles a randomized
// quiz based on a domains->count map or a total desired count.
function shuffleArray(arr) {
  // Use Web Crypto API when available for better randomness; fallback to Math.random
  function randIntInclusive(max) {
    if (
      typeof window !== "undefined" &&
      window.crypto &&
      typeof window.crypto.getRandomValues === "function"
    ) {
      // generate a floating value in [0,1) using a 32-bit random integer
      const r =
        window.crypto.getRandomValues(new Uint32Array(1))[0] / 4294967296;
      return Math.floor(r * (max + 1));
    }
    return Math.floor(Math.random() * (max + 1));
  }

  for (let i = arr.length - 1; i > 0; i--) {
    const j = randIntInclusive(i);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// pick N random items from array without replacement
function pickRandom(arr, n) {
  if (!Array.isArray(arr) || arr.length === 0 || n <= 0) return [];
  const copy = arr.slice();
  shuffleArray(copy);
  return copy.slice(0, Math.min(n, copy.length));
}

// Generate a quiz given either:
// - perDomainCounts: { domain1: 10, domain2: 20, ... }
// OR
// - totalCount: number, and selectedDomains: ['domain1','domain2'] - generator will distribute counts proportionally.
// Returns a flat array of question objects in the same shape used by script.js
async function generateQuiz({
  perDomainCounts = null,
  totalCount = null,
  selectedDomains = null,
} = {}) {
  // no aggregated domains.json used — we'll load per-domain files directly

  // Helper: try to load a per-domain file (data/domainX.json). If present and
  // contains an array, use that. Otherwise fall back to `domains[domain]`.
  async function loadPerDomain(domainKey) {
    try {
      const path = `data/${domainKey}.json`;
      const res = await fetch(path, { cache: "no-store" });
      if (res && res.ok) {
        const j = await res.json();
        if (Array.isArray(j)) return j;
        if (j && Array.isArray(j[domainKey])) return j[domainKey];
      }
    } catch (e) {
      // ignore and fallback
    }
    // if per-domain file not present or invalid, return empty array
    return [];
  }

  // Default domain keys (domain1..domain7) unless selectedDomains provided
  const allDomainKeys = Array.from({ length: 7 }, (_, i) => `domain${i + 1}`);
  const chosenCandidates =
    selectedDomains && selectedDomains.length
      ? selectedDomains.slice()
      : allDomainKeys;

  // Build chosen list by ensuring we only include domain keys that are
  // expected (domain1..domain7) or were explicitly selected. We'll probe
  // per-domain files when assembling the map below; for now use candidates.
  const chosen = chosenCandidates.slice();
  if (!chosen.length) {
    console.warn("No selected domains found; using all domains");
  }

  // Build an in-memory map of domain arrays preferring per-domain files when present.
  const domainDataMap = {};
  for (const d of chosen) {
    domainDataMap[d] = await loadPerDomain(d);
  }

  let result = [];

  if (perDomainCounts) {
    // honor counts for domains present in perDomainCounts
    for (const [domain, count] of Object.entries(perDomainCounts)) {
      const pool = domainDataMap[domain] || [];
      if (!pool || pool.length === 0) continue;
      const picks = pickRandom(pool, count);
      result = result.concat(picks);
    }
  } else if (totalCount && totalCount > 0) {
    // distribute totalCount across chosen domains proportionally by available size
    const poolSizes = chosen.map((d) => ({
      d,
      size: (domainDataMap[d] || []).length,
    }));
    const totalAvailable = poolSizes.reduce((s, p) => s + p.size, 0);
    if (totalAvailable === 0) {
      console.warn("No questions available in selected domains");
      return [];
    }
    // compute raw allocation and then round while ensuring sum equals totalCount
    let allocations = poolSizes.map((p) => ({
      d: p.d,
      alloc: Math.floor((p.size / totalAvailable) * totalCount),
    }));
    // adjust any shortfall by adding one to domains with remaining items until totalCount reached
    let allocatedSum = allocations.reduce((s, x) => s + x.alloc, 0);
    let idx = 0;
    while (allocatedSum < totalCount) {
      const domain = allocations[idx % allocations.length];
      // only allocate if domain still has unused questions
      if (domain.alloc < (domainDataMap[domain.d] || []).length) {
        domain.alloc += 1;
        allocatedSum += 1;
      }
      idx += 1;
      // safety: break if can't allocate
      if (idx > 10000) break;
    }

    for (const { d, alloc } of allocations) {
      if (alloc <= 0) continue;
      const picks = pickRandom(domainDataMap[d] || [], alloc);
      result = result.concat(picks);
    }
  } else {
    console.warn("No perDomainCounts or totalCount provided to generateQuiz");
    return [];
  }

  // final shuffle to mix domain questions
  shuffleArray(result);
  return result;
}

// Integration helper: build and start the quiz using generated questions
// options: see generateQuiz signature. Example:
// generateAndStart({ totalCount: 120, selectedDomains: ['domain1','domain2'] })
async function generateAndStart(options = {}) {
  const quiz = await generateQuiz(options);
  if (!quiz || quiz.length === 0) {
    alert(
      "No quiz generated. Check that per-domain data files (data/domain1.json ... data/domain7.json) exist and contain questions."
    );
    return;
  }

  // If the main script exposes setActiveQuestions, use it; otherwise attempt to set global activeQuestions
  if (typeof window.setActiveQuestions === "function") {
    window.setActiveQuestions(quiz);
  } else if (typeof window.activeQuestions !== "undefined") {
    window.activeQuestions = quiz;
  }

  // Start the quiz if startQuiz is available
  if (typeof window.startQuiz === "function") {
    window.startQuiz();
  } else {
    // try to call startQuiz from the page (script.js defines startQuiz in global scope)
    try {
      startQuiz();
    } catch (e) {
      console.warn("startQuiz not available");
    }
  }
}

// Export functions to global for console/testing
window.generateQuiz = generateQuiz;
window.generateAndStart = generateAndStart;
