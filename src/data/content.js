
export const metadata = {
    title: "Approximate Computing for OS Kernel Internals",
    subtitle: "Designing & Evaluating Error-Bounded Priority Decay Functions for CPU Fair-Share Scheduling",
    phase: "Phase I",
    topic: "Operating Systems · Approximate Computing",
    focus: "CFS Scheduler · PELT · Error Bounding",
  };
  
  export const abstract = {
    wordCount: "~210 words",
    paragraphs: [
      "Modern operating system kernels routinely perform floating-point and fixed-point computations whose results do not require full IEEE-754 precision. The Linux Completely Fair Scheduler (CFS) maintains per-entity load averages through an exponential decay filter; TCP CUBIC derives a congestion window via a cube-root approximation; and thermal governors interpolate from look-up tables — all tolerating small numerical error without visible impact on correctness or fairness.",
      "Approximate computing — trading arithmetic precision for speed and energy — has been extensively studied for user-space workloads such as image processing and machine learning, but its systematic application to kernel internals remains essentially unexplored. The barrier is safety: unbounded error in a scheduler weight can starve processes; in a congestion controller it can collapse throughput.",
      "This paper addresses that gap. We focus on the CFS priority-decay computation, derive tight analytical error bounds for truncated fixed-point decay factors, and propose a family of error-bounded approximate decay functions. We evaluate them against correctness, fairness (Jain index), and latency metrics, demonstrating measurable scheduling-path speedup with provably bounded deviation from the exact CFS output.",
    ],
    tags: ["OS Kernels", "CFS / PELT", "Error Bounding", "Fair-Share Scheduling"],
  };
  
  export const introduction = {
    motivations: [
      {
        title: "Why It Matters Today",
        body: "Cloud and mobile SoCs run millions of scheduling decisions per second. Even nanosecond savings per decision compound to measurable energy reduction at data-center scale — a problem that grows as CPU counts increase.",
        icon: "cpu",
      },
      {
        title: "The Precision Paradox",
        body: "CFS decay constants are empirically derived — only 3–4 significant digits are meaningful — yet the kernel uses full 64-bit arithmetic, paying full precision cost for bits that carry no useful information.",
        icon: "precision",
      },
      {
        title: "Safety is the Barrier",
        body: "Unlike image filters, a scheduler bug can starve processes or violate SLAs. Without proven error bounds, approximate kernel arithmetic is simply dangerous — this paper aims to change that.",
        icon: "shield",
      },
    ],
    contributions: [
      "Formal error-bound derivation for fixed-point exponential decay used in CFS PELT load-average computation",
      "A parameterised family of approximate decay functions with tunable precision–speed tradeoff",
      "Prototype implementation as a Linux 6.x kernel module hooking the SCHED_FAIR update path",
      "Evaluation framework measuring Jain fairness index, per-task latency, and branch/cache efficiency",
      "Evidence that ≤2% arithmetic error produces no statistically significant fairness degradation",
    ],
  };
  
  export const literatureReview = [
    {
      tag: "Foundation",
      venue: "ACM TACO, 2017",
      title: "AxBench (Yazdanbakhsh et al.)",
      summary: "Benchmarked approximate kernels across image, recognition, and finance workloads. Established standard quality-of-result (QoR) metrics now used across the field.",
      limitation: "Purely user-space — no OS or safety analysis whatsoever.",
    },
    {
      tag: "Language-Level",
      venue: "ACM PLDI, 2011",
      title: "EnerJ (Sampson et al.)",
      summary: "Type-system for separating approximate from precise data, preventing safety-critical variables from receiving approximate values using compile-time annotations.",
      limitation: "Relies entirely on programmer annotation; no automated bound derivation.",
    },
    {
      tag: "Hardware",
      venue: "ACM ASPLOS, 2013",
      title: "Approximate Storage (Sampson et al.)",
      summary: "Extends approximation to memory subsystems. Shows storage-level errors under 5% are tolerable for multimedia workloads. Introduced the concept of error-tolerant storage.",
      limitation: "Does not address control-plane or scheduling implications whatsoever.",
    },
    {
      tag: "Compiler",
      venue: "IEEE Micro, 2015",
      title: "ACCEPT (Sampson et al.)",
      summary: "Compiler-driven framework with programmer annotations for precision budgets. Automated some of the EnerJ annotation burden and added feedback-directed optimization.",
      limitation: "No evaluation on real-time or scheduling-sensitive kernel code paths.",
    },
    {
      tag: "Scheduling",
      venue: "Linux Kernel, 2007",
      title: "CFS Design — Molnar et al.",
      summary: "Introduced vruntime and the PELT exponential decay load average using fixed-point (32.32 format) with empirical constants. The foundation of all modern Linux CPU scheduling.",
      limitation: "Precision far exceeds workload variance; no error analysis was performed.",
    },
    {
      tag: "Scheduling",
      venue: "LKML / LWN, 2020",
      title: "PELT Analysis — Vincent Guittot",
      summary: "Detailed walkthrough of Per-Entity Load Tracking decay constants showing the 1024 µs window already introduces approximation in the scheduler's load tracking.",
      limitation: "No formal error analysis; no lower-precision alternative explored.",
    },
    {
      tag: "Numerics",
      venue: "SIAM J. Sci. Comp., 2021",
      title: "Stochastic Rounding (Connolly et al.)",
      summary: "Proves stochastic rounding to low-precision floats outperforms deterministic rounding in iterative algorithms — highly relevant to iterated decay filter computations.",
      limitation: "Evaluated only on dense linear algebra, not OS event streams.",
    },
    {
      tag: "Real-Time OS",
      venue: "USENIX ATC, 2017",
      title: "Real-Time Approx (Blagodurov)",
      summary: "Explored relaxed load balancing in multicore RT schedulers. Found 8% scheduling error acceptable for soft-RT workloads — an important empirical data point.",
      limitation: "No closed-form bounds; does not address CFS fairness or PELT internals.",
    },
  ];
  
  export const researchGaps = [
    {
      title: "No Formal Error Bounds for Kernel Arithmetic",
      body: "Existing approximate computing work provides quality-of-result metrics for user-space applications. No prior work derives mathematically rigorous, closed-form error bounds for approximate arithmetic in OS scheduler hot paths.",
    },
    {
      title: "Approximate Computing Not Applied to CFS / PELT",
      body: "Despite CFS's well-known empirical decay constants (LOAD_AVG_MAX, LOAD_AVG_PERIOD), no study has replaced the exact fixed-point decay with lower-precision alternatives and measured the fairness impact.",
    },
    {
      title: "Missing Safety–Performance Pareto Analysis",
      body: "Existing OS performance work optimises throughput or latency in isolation. No Pareto frontier exists for the tradeoff between arithmetic precision, scheduling fairness (Jain index), and scheduling-path cycle count.",
    },
    {
      title: "Lack of Kernel-Level Approximate Arithmetic Primitives",
      body: "Compiler frameworks (EnerJ, ACCEPT) annotate user programs but provide no kernel-safe primitives. Linux has no mechanism to express 'this computation tolerates ε relative error' as a first-class concept.",
    },
    {
      title: "No Methodology for OS-Safe Approximation Validation",
      body: "Application approximate computing validates with PSNR or ML accuracy. OS scheduling requires starvation freedom, bounded latency, and fairness — none of which have been adapted for approximate evaluation.",
    },
  ];
  
  export const problemStatement = {
    statement: "The Linux CFS scheduler computes per-entity exponential-decay load averages using full 64-bit fixed-point arithmetic, even though the underlying decay constants carry at most four significant digits of empirically meaningful precision. No systematic study has determined the minimum arithmetic precision sufficient to preserve CFS correctness guarantees — specifically, bounded task starvation, proportional fair-share allocation (within ε of the ideal vruntime trajectory), and O(log n) scheduling-decision complexity — nor has any kernel-safe approximate arithmetic primitive been designed or evaluated for this computation.",
    pillars: [
      {
        icon: "ε",
        title: "Precision Target",
        body: "Minimum significant digits for CFS correctness",
      },
      {
        icon: "∂",
        title: "Error Bound",
        body: "Closed-form ε derivation for decay approximations",
      },
      {
        icon: "✓",
        title: "Safety Criteria",
        body: "Starvation freedom + fairness index preservation",
      },
    ],
  };
  
  export const aimAndObjectives = {
    aim: "To design, formally bound, and empirically validate a family of approximate priority-decay functions for the Linux CFS scheduler that provably preserve task-fairness guarantees while reducing per-scheduling-event arithmetic cost.",
    scope: "Linux kernel v6.x · CFS PELT decay path · x86-64 & ARM64 · Synthetic + real workloads · Metrics: Jain Fairness Index + per-task vruntime deviation",
    objectives: [
      {
        code: "O1",
        title: "Error-Bound Derivation",
        body: "Derive a closed-form upper bound on the relative error introduced by truncating the CFS decay factor to k fractional bits (k = 8…32).",
      },
      {
        code: "O2",
        title: "Approximate Function Design",
        body: "Propose ≥3 approximate decay variants (bit-shifted, table-interpolated, stochastic-rounded) parameterised by a precision knob ε.",
      },
      {
        code: "O3",
        title: "Kernel Prototype",
        body: "Implement the best variant as a loadable Linux kernel module hooking sched_avg_update() without modifying core scheduler logic.",
      },
      {
        code: "O4",
        title: "Correctness Evaluation",
        body: "Measure Jain Fairness Index and per-task latency across workload classes; demonstrate statistical equivalence to exact CFS at ε ≤ 2%.",
      },
      {
        code: "O5",
        title: "Performance Measurement",
        body: "Quantify scheduling-path cycle reduction via hardware performance counters (perf) and context-switch overhead on bare-metal hardware.",
      },
    ],
  };