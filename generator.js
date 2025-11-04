// generator.js
// Small client-side quiz generator: loads domain question sets from data/domains.json
// and assembles a randomized quiz based on a domains->count map or a total desired count.

async function loadDomainsJson(path = "data/domains.json") {
  try {
    const res = await fetch(path, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch domains.json: " + res.status);
    return await res.json();
  } catch (err) {
    console.error(err);
    return {};
  }
}

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
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
  const domains = await loadDomainsJson();
  if (!domains || Object.keys(domains).length === 0) {
    console.warn("No domain data available");
    return [];
  }

  // normalize available domain keys
  const available = Object.keys(domains);
  const chosen =
    selectedDomains && selectedDomains.length
      ? selectedDomains.filter((d) => available.includes(d))
      : available.slice();
  if (!chosen.length) {
    console.warn("No selected domains found; using all domains");
  }

  let result = [];

  if (perDomainCounts) {
    // honor counts for domains present in perDomainCounts
    for (const [domain, count] of Object.entries(perDomainCounts)) {
      if (!domains[domain]) continue;
      const picks = pickRandom(domains[domain], count);
      result = result.concat(picks);
    }
  } else if (totalCount && totalCount > 0) {
    // distribute totalCount across chosen domains proportionally by available size
    const poolSizes = chosen.map((d) => ({
      d,
      size: (domains[d] || []).length,
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
      if (domain.alloc < (domains[domain.d] || []).length) {
        domain.alloc += 1;
        allocatedSum += 1;
      }
      idx += 1;
      // safety: break if can't allocate
      if (idx > 10000) break;
    }

    for (const { d, alloc } of allocations) {
      if (alloc <= 0) continue;
      const picks = pickRandom(domains[d] || [], alloc);
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
      "No quiz generated. Check that data/domains.json is populated and domains were selected."
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
