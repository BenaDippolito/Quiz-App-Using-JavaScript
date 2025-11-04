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
    // Create a small UI area for allocation preview/messages (inserted at top of form)
    let previewArea = q("#allocPreview", form);
    if (!previewArea) {
      previewArea = document.createElement("div");
      previewArea.id = "allocPreview";
      previewArea.style.margin = "8px 0 12px";
      previewArea.setAttribute("aria-live", "polite");
      form.insertBefore(previewArea, form.firstChild);
    }

    // Prepare badges next to domain inputs to show computed allocations
    const domainEls = qAll(".domainPct", form);
    const badges = {};
    domainEls.forEach((el) => {
      const span = document.createElement("span");
      span.className = "alloc-badge";
      span.style.marginLeft = "8px";
      span.style.fontWeight = "600";
      span.textContent = "0";
      el.parentNode && el.parentNode.appendChild(span);
      const key = `domain${
        el.dataset.domain || el.getAttribute("data-domain")
      }`;
      badges[key] = span;
    });

    let availableCounts = null; // set after fetching data/domains.json

    async function fetchAvailable() {
      try {
        const res = await fetch("data/domains.json", { cache: "no-store" });
        if (!res.ok) return null;
        const all = await res.json();
        const map = {};
        for (let i = 1; i <= 7; i++) {
          const k = `domain${i}`;
          map[k] = Array.isArray(all[k]) ? all[k].length : 0;
        }
        return map;
      } catch (e) {
        return null;
      }
    }

    function updatePreview() {
      const perDomainCounts = buildPerDomainCountsFromForm(form);
      const requested = Object.values(perDomainCounts).reduce(
        (s, n) => s + (parseInt(n, 10) || 0),
        0
      );
      // update badges
      for (const [k, span] of Object.entries(badges)) {
        const val = perDomainCounts[k] || 0;
        if (availableCounts && typeof availableCounts[k] === "number") {
          if (val > availableCounts[k]) {
            span.textContent = `${val} (max ${availableCounts[k]})`;
            span.style.color = "#b02a37"; // red
          } else {
            span.textContent = String(val);
            span.style.color = "";
          }
        } else {
          span.textContent = String(val);
          span.style.color = "";
        }
      }

      // update previewArea
      let msg = `Requested: ${requested}`;
      if (availableCounts) {
        const totalAvailable = Object.values(availableCounts).reduce(
          (s, n) => s + n,
          0
        );
        msg += ` — Available: ${totalAvailable}`;
        const generateBtn = q("#generateBtn", form);
        if (requested > totalAvailable) {
          msg += " — Too many requested. Reduce total or adjust weights.";
          previewArea.style.color = "#b02a37";
          if (generateBtn) generateBtn.disabled = true;
        } else {
          previewArea.style.color = "";
          if (generateBtn) generateBtn.disabled = false;
        }
      }
      previewArea.textContent = msg;
    }

    // wire inputs to update preview on change
    const totalInput = q("#totalQuestions", form);
    totalInput && totalInput.addEventListener("input", updatePreview);
    domainEls.forEach((el) => el.addEventListener("input", updatePreview));

    // fetch availability and update preview
    (async () => {
      availableCounts = await fetchAvailable();
      updatePreview();
    })();

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
