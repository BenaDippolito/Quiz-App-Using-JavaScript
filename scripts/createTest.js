// scripts/createTest.js
// High-level wiring for the "Create Test" UI.
// Reads total questions and domain percent inputs, computes integer allocations
// using the largest-fraction rounding method, and then calls the generator
// to create and start the test. This file deliberately leaves selection and
// capping to the existing generator logic (generateQuiz / generateAndStart).

(function () {
  function q(selector, ctx = document) {
    return ctx.querySelector(selector);
  }
  function qAll(selector, ctx = document) {
    return Array.from(ctx.querySelectorAll(selector));
  }

  function parseNumber(el, fallback = 0) {
    if (!el) return fallback;
    const v = parseFloat(el.value);
    return Number.isFinite(v) ? v : fallback;
  }

  function computeAllocations(total, weights) {
    // weights: [{ key: 'domain1', weight: 14 }, ...]
    const sumWeights = weights.reduce((s, w) => s + w.weight, 0);
    if (sumWeights <= 0) return weights.map((w) => ({ key: w.key, alloc: 0 }));

    // raw allocations
    const raws = weights.map((w) => {
      const raw = (w.weight / sumWeights) * total;
      return {
        key: w.key,
        raw,
        base: Math.floor(raw),
        frac: raw - Math.floor(raw),
      };
    });

    let allocated = raws.reduce((s, r) => s + r.base, 0);
    let remaining = total - allocated;

    // distribute remaining by descending fractional remainders
    raws.sort((a, b) => b.frac - a.frac);
    let idx = 0;
    while (remaining > 0 && idx < raws.length) {
      raws[idx].base += 1;
      remaining -= 1;
      idx += 1;
      if (idx === raws.length && remaining > 0) {
        // wrap around if somehow still remaining (shouldn't happen)
        idx = 0;
      }
    }

    // restore original order
    raws.sort((a, b) => (a.key > b.key ? 1 : -1));

    return raws.map((r) => ({ key: r.key, alloc: r.base }));
  }

  function buildPerDomainCountsFromForm(form) {
    const totalInput = q("#totalQuestions", form);
    const total = Math.max(1, parseInt(totalInput.value, 10) || 0);

    const domainEls = qAll(".domainPct", form);
    // gather weights in domain order
    const weights = domainEls.map((el) => {
      const domain = el.dataset.domain || el.getAttribute("data-domain");
      const key = `domain${domain}`;
      const weight = parseNumber(el, 0);
      return { key, weight };
    });

    const allocations = computeAllocations(total, weights);
    const perDomainCounts = {};
    allocations.forEach((a) => {
      perDomainCounts[a.key] = a.alloc;
    });
    return perDomainCounts;
  }

  function attach() {
    const form = q("#createTestForm");
    if (!form) return;

    form.addEventListener("submit", async function (ev) {
      ev.preventDefault();
      const generateBtn = q("#generateBtn", form);
      if (generateBtn) generateBtn.disabled = true;

      const perDomainCounts = buildPerDomainCountsFromForm(form);

      // sanity: ensure at least one question requested
      const totalRequested = Object.values(perDomainCounts).reduce(
        (s, n) => s + (parseInt(n, 10) || 0),
        0
      );
      if (totalRequested <= 0) {
        alert("Please request at least one question across the domains.");
        if (generateBtn) generateBtn.disabled = false;
        return;
      }

      // Call generator's high level API. generateAndStart will use the provided
      // perDomainCounts and let the generator pick randomly and cap per-domain
      // selections to available JSON entries.
      if (typeof window.generateAndStart === "function") {
        try {
          await window.generateAndStart({ perDomainCounts });
        } catch (e) {
          console.error("Failed to generate test:", e);
          alert("Failed to generate test. See console for details.");
        }
      } else if (typeof window.generateQuiz === "function") {
        try {
          const quiz = await window.generateQuiz({ perDomainCounts });
          if (!quiz || quiz.length === 0) {
            alert("No questions were generated. Check domain data.");
          } else {
            // If the page exposes setActiveQuestions/startQuiz, use them
            if (typeof window.setActiveQuestions === "function")
              window.setActiveQuestions(quiz);
            if (typeof window.startQuiz === "function") window.startQuiz();
          }
        } catch (e) {
          console.error("Failed to generate quiz:", e);
          alert("Failed to generate quiz. See console for details.");
        }
      } else {
        alert("Generator API not available on this page.");
      }

      if (generateBtn) generateBtn.disabled = false;
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", attach);
  } else {
    attach();
  }
})();
