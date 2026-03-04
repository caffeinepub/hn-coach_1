import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Activity,
  Apple,
  Droplets,
  FileText,
  Flame,
  Leaf,
  Loader2,
  MapPin,
  Phone,
  Target,
  User,
  UtensilsCrossed,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

// ── Types ──────────────────────────────────────────────────────────────────────
interface AssessmentResults {
  idealWeight: number;
  bmi: number;
  bmiCategory: string;
  bmr: number;
  tdee: number;
  waterIntake: number;
  footsteps: string;
  exerciseMinutes: string;
}

interface AssessmentInputs {
  weight: string;
  height: string;
  age: string;
  gender: string;
  activityLevel: string;
}

interface UnifiedFormData {
  // Personal details
  fullName: string;
  age: string;
  city: string;
  whatsapp: string;
  // Body metrics
  height: string;
  weight: string;
  gender: string;
  activityLevel: string;
  // Goal
  target: string;
  // Diet preferences
  dietType: string;
  rawFruits: string;
  rawSalad: string;
  curd: string;
  hungerCapacity: string;
}

// ── Calculations ───────────────────────────────────────────────────────────────
const ACTIVITY_MULTIPLIERS: Record<string, number> = {
  sedentary: 1.2,
  lightly_active: 1.375,
  moderately_active: 1.55,
  very_active: 1.725,
  extra_active: 1.9,
};

function computeResults(
  inputs: AssessmentInputs | UnifiedFormData,
): AssessmentResults | null {
  const w = Number.parseFloat(inputs.weight);
  const h = Number.parseFloat(inputs.height);
  const a = Number.parseFloat(inputs.age);
  const { gender, activityLevel } = inputs;
  if (!w || !h || !a || !gender || !activityLevel) return null;

  // Ideal Weight (Devine formula)
  const heightInches = h / 2.54;
  const idealWeight =
    gender === "male"
      ? 50 + 2.3 * (heightInches - 60)
      : 45.5 + 2.3 * (heightInches - 60);

  // BMI
  const heightM = h / 100;
  const bmi = w / (heightM * heightM);
  let bmiCategory: string;
  if (bmi < 18.5) bmiCategory = "Underweight";
  else if (bmi < 25) bmiCategory = "Normal";
  else if (bmi < 30) bmiCategory = "Overweight";
  else bmiCategory = "Obese";

  // BMR (Mifflin-St Jeor)
  const bmr =
    gender === "male"
      ? 10 * w + 6.25 * h - 5 * a + 5
      : 10 * w + 6.25 * h - 5 * a - 161;

  // TDEE
  const tdee = bmr * (ACTIVITY_MULTIPLIERS[activityLevel] ?? 1.2);

  // Water intake: weight / 18 litres
  const waterIntake = w / 18;

  // Footsteps: 1 kg body = 110 footsteps
  const footstepsNum = Math.round(w * 110);
  const footsteps = `${footstepsNum.toLocaleString()} steps/day`;

  // Exercise minutes
  let exerciseMinutes: string;
  if (activityLevel === "sedentary") {
    exerciseMinutes = "45 mins/day";
  } else if (activityLevel === "lightly_active") {
    exerciseMinutes = a <= 40 && w <= 80 ? "30 mins/day" : "35 mins/day";
  } else if (activityLevel === "moderately_active") {
    exerciseMinutes = "20–25 mins/day";
  } else {
    exerciseMinutes = "30 mins/day";
  }

  return {
    idealWeight,
    bmi,
    bmiCategory,
    bmr: Math.round(bmr),
    tdee: Math.round(tdee),
    waterIntake,
    footsteps,
    exerciseMinutes,
  };
}

// ── Health Risk Helper ─────────────────────────────────────────────────────────
interface HealthRisk {
  disease: string;
  description: string;
  timeline: string;
  urgency: "high" | "medium" | "low";
}

function getHealthRisks(bmi: number): HealthRisk[] {
  if (bmi < 18.5) {
    return [
      {
        disease: "Weakened Immunity",
        description:
          "Low body weight suppresses the immune system, making you prone to frequent infections.",
        timeline: "Risk within 1–3 months",
        urgency: "high",
      },
      {
        disease: "Nutritional Deficiencies (Iron, B12, Vitamin D)",
        description:
          "Inadequate intake leads to deficiencies affecting blood, bones, and neurological health.",
        timeline: "Risk within 2–4 months",
        urgency: "high",
      },
      {
        disease: "Anaemia",
        description:
          "Insufficient red blood cell production causes fatigue, breathlessness, and paleness.",
        timeline: "Risk within 3–6 months",
        urgency: "high",
      },
      {
        disease: "Hormonal Imbalance",
        description:
          "Low body fat disrupts hormonal cycles, affecting metabolism, mood, and reproductive health.",
        timeline: "Risk within 6–12 months",
        urgency: "medium",
      },
      {
        disease: "Osteoporosis",
        description:
          "Inadequate calcium and nutrient absorption weakens bone density, increasing fracture risk.",
        timeline: "Risk within 6–12 months",
        urgency: "medium",
      },
    ];
  }

  if (bmi < 25) {
    return [];
  }

  if (bmi < 30) {
    return [
      {
        disease: "High Cholesterol",
        description:
          "Excess weight raises LDL levels, narrowing arteries and reducing cardiovascular efficiency.",
        timeline: "Risk within 6–12 months",
        urgency: "medium",
      },
      {
        disease: "Hypertension (High Blood Pressure)",
        description:
          "Extra body mass forces the heart to work harder, straining the arterial system over time.",
        timeline: "Risk within 6–12 months",
        urgency: "medium",
      },
      {
        disease: "Type 2 Diabetes (Pre-diabetic Stage)",
        description:
          "Excess fat increases insulin resistance, progressively impairing blood sugar regulation.",
        timeline: "Risk within 12–18 months",
        urgency: "low",
      },
      {
        disease: "Fatty Liver Disease (NAFLD)",
        description:
          "Fat accumulates in liver cells, reducing liver function and increasing inflammation.",
        timeline: "Risk within 12–18 months",
        urgency: "low",
      },
      {
        disease: "Sleep Apnoea",
        description:
          "Excess neck and throat tissue obstructs airways during sleep, disrupting oxygen supply.",
        timeline: "Risk within 12–24 months",
        urgency: "low",
      },
      {
        disease: "Joint Pain & Osteoarthritis",
        description:
          "Extra weight accelerates cartilage wear in knees, hips, and spine joints.",
        timeline: "Risk within 18–24 months",
        urgency: "low",
      },
    ];
  }

  // BMI >= 30 (Obese)
  return [
    {
      disease: "Hypertension (Stage 2)",
      description:
        "Severe arterial pressure strain significantly elevates the risk of heart attack and stroke.",
      timeline: "Risk within 3–6 months",
      urgency: "high",
    },
    {
      disease: "Type 2 Diabetes",
      description:
        "Chronic insulin resistance leads to uncontrolled blood sugar, damaging organs and nerves.",
      timeline: "Risk within 6–9 months",
      urgency: "high",
    },
    {
      disease: "Sleep Apnoea (Severe)",
      description:
        "Obstructed airways cause dangerous sleep hypoxia, increasing cardiac arrhythmia risk.",
      timeline: "Risk within 6–12 months",
      urgency: "medium",
    },
    {
      disease: "Metabolic Syndrome",
      description:
        "A cluster of conditions — high blood sugar, fat, and pressure — multiplying disease risk.",
      timeline: "Risk within 6–12 months",
      urgency: "medium",
    },
    {
      disease: "Heart Disease & Stroke",
      description:
        "Excess fat deposits in arteries raise the likelihood of blocked vessels and cardiac events.",
      timeline: "Risk within 12–18 months",
      urgency: "low",
    },
    {
      disease: "Fatty Liver (NASH)",
      description:
        "Severe fat accumulation causes liver inflammation, scarring (fibrosis), and cirrhosis risk.",
      timeline: "Risk within 12–24 months",
      urgency: "low",
    },
    {
      disease: "Kidney Disease",
      description:
        "Hypertension and diabetes caused by obesity gradually impair kidney filtration function.",
      timeline: "Risk within 12–24 months",
      urgency: "low",
    },
    {
      disease: "Certain Cancers (Colorectal, Breast)",
      description:
        "Chronic inflammation and hormonal disruption from excess fat increase cancer cell growth.",
      timeline: "Risk within 2–5 years",
      urgency: "low",
    },
  ];
}

// ── (HealthRiskAwareness only used in PDF now — removed from page render) ──────

// ── PDF Generator (browser print) ─────────────────────────────────────────────
interface DietPrefs {
  dietType: string;
  rawFruits: string;
  rawSalad: string;
  curd: string;
  hungerCapacity: string;
}

function generatePDF(
  name: string,
  age: string,
  city: string,
  whatsapp: string,
  height: string,
  weight: string,
  target: string,
  results: AssessmentResults,
  dietPrefs: DietPrefs,
) {
  const today = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const logoUrl = `${window.location.origin}/assets/uploads/IMG-20260226-WA0000-1-1.jpg`;

  const currentW = Number.parseFloat(weight);
  const weightDiff = currentW - results.idealWeight;
  const absWeightDiff = Math.abs(weightDiff).toFixed(1);
  const absWeightDiffNum = Math.abs(weightDiff);
  const healthRisks = getHealthRisks(results.bmi);

  let weightGoalHtml = "";
  const motivationMsg = `<div class="motivation-msg">&#127775; Achieve your ideal weight without wasting any single minute to avoid long-term disease, disorders and live a medicine-free life. Consult HN Coach for personalized guidance.</div>`;
  if (Math.abs(weightDiff) <= 1) {
    weightGoalHtml = `<div class="banner green">&#10003; You are at your <strong>IDEAL WEIGHT!</strong> Keep it up.</div>${motivationMsg}`;
  } else if (weightDiff > 0) {
    weightGoalHtml = `<div class="banner orange">&#9888; You need to <strong>LOSE ${absWeightDiff} kg</strong> to reach your ideal weight (${results.idealWeight.toFixed(1)} kg)</div>${motivationMsg}`;
  } else {
    weightGoalHtml = `<div class="banner blue">&#8593; You need to <strong>GAIN ${absWeightDiff} kg</strong> to reach your ideal weight (${results.idealWeight.toFixed(1)} kg)</div>${motivationMsg}`;
  }

  // Timeline calculation
  let timelineHtml = "";
  if (Math.abs(weightDiff) > 1) {
    if (weightDiff > 0) {
      // Need to LOSE weight — 3 to 5 kg/month
      const fastMonths = Math.ceil(absWeightDiffNum / 5);
      const slowMonths = Math.ceil(absWeightDiffNum / 3);
      timelineHtml = `
      <div class="section-title" style="color:#ea580c;border-bottom-color:#ea580c;">&#128197; Your Weight Loss Timeline</div>
      <div class="timeline-box loss">
        <div class="timeline-header">&#128170; To lose <strong>${absWeightDiff} kg</strong> and reach your ideal weight of <strong>${results.idealWeight.toFixed(1)} kg</strong>:</div>
        <div class="timeline-grid">
          <div class="timeline-col fast">
            <div class="tl-rate">Fast Track</div>
            <div class="tl-rate-sub">5 kg/month</div>
            <div class="tl-months">${fastMonths} Month${fastMonths > 1 ? "s" : ""}</div>
          </div>
          <div class="timeline-vs">to</div>
          <div class="timeline-col slow">
            <div class="tl-rate">Steady Pace</div>
            <div class="tl-rate-sub">3 kg/month</div>
            <div class="tl-months">${slowMonths} Month${slowMonths > 1 ? "s" : ""}</div>
          </div>
        </div>
        <div class="timeline-note">With consistent diet &amp; exercise, you can achieve your ideal weight in <strong>${fastMonths}–${slowMonths} months</strong>. Start today — every day counts!</div>
      </div>`;
    } else {
      // Need to GAIN weight — 2 to 3 kg/month
      const fastMonths = Math.ceil(absWeightDiffNum / 3);
      const slowMonths = Math.ceil(absWeightDiffNum / 2);
      timelineHtml = `
      <div class="section-title" style="color:#2563eb;border-bottom-color:#2563eb;">&#128197; Your Weight Gain Timeline</div>
      <div class="timeline-box gain">
        <div class="timeline-header">&#127807; To gain <strong>${absWeightDiff} kg</strong> and reach your ideal weight of <strong>${results.idealWeight.toFixed(1)} kg</strong>:</div>
        <div class="timeline-grid">
          <div class="timeline-col fast" style="background:#dbeafe;border-color:#93c5fd;">
            <div class="tl-rate" style="color:#1d4ed8;">Fast Track</div>
            <div class="tl-rate-sub" style="color:#3b82f6;">3 kg/month</div>
            <div class="tl-months" style="color:#1e3a8a;">${fastMonths} Month${fastMonths > 1 ? "s" : ""}</div>
          </div>
          <div class="timeline-vs">to</div>
          <div class="timeline-col slow" style="background:#eff6ff;border-color:#bfdbfe;">
            <div class="tl-rate" style="color:#1d4ed8;">Steady Pace</div>
            <div class="tl-rate-sub" style="color:#3b82f6;">2 kg/month</div>
            <div class="tl-months" style="color:#1e3a8a;">${slowMonths} Month${slowMonths > 1 ? "s" : ""}</div>
          </div>
        </div>
        <div class="timeline-note" style="background:#eff6ff;border-color:#93c5fd;color:#1e3a8a;">With a proper nutrition plan, you can reach your ideal weight in <strong>${fastMonths}–${slowMonths} months</strong>. Every meal is a step forward!</div>
      </div>`;
    }
  }

  const hungerLabel: Record<string, string> = {
    "3hrs": "Every 3 Hours",
    "4hrs": "Every 4 Hours",
    "5hrs": "Every 5 Hours",
  };

  // Health Risk section for PDF
  let healthRiskHtml = "";
  if (results.bmi >= 18.5 && results.bmi < 25) {
    healthRiskHtml = `
    <div class="section-title risk-header">&#9989; Health Risk Awareness — WHO Guidelines</div>
    <div class="risk-healthy">
      <strong>&#128994; Your BMI is in the healthy range.</strong> Maintain your lifestyle to stay disease-free.
      <div class="risk-disclaimer">This is for awareness only. Consult HN Coach for personalised guidance.</div>
    </div>`;
  } else if (healthRisks.length > 0) {
    const riskRows = healthRisks
      .map((r) => {
        const badgeColor =
          r.urgency === "high"
            ? "#fecaca;color:#b91c1c"
            : r.urgency === "medium"
              ? "#fed7aa;color:#c2410c"
              : "#fef9c3;color:#a16207";
        return `<tr>
          <td class="risk-disease">${r.disease}</td>
          <td class="risk-desc">${r.description}</td>
          <td><span class="risk-badge" style="background:${badgeColor}">${r.timeline}</span></td>
        </tr>`;
      })
      .join("");
    healthRiskHtml = `
    <div class="section-title risk-header">&#9888; Health Risk Awareness — WHO Guidelines</div>
    <div class="risk-warning">&#9888; These are potential risks if your current weight is not addressed. Early action prevents these conditions.</div>
    <table class="risk-table">
      <thead>
        <tr>
          <th style="width:26%">Condition</th>
          <th>What it affects</th>
          <th style="width:22%">Expected Timeline</th>
        </tr>
      </thead>
      <tbody>${riskRows}</tbody>
    </table>
    <div class="risk-disclaimer">This is for awareness only. Consult HN Coach for personalised guidance.</div>`;
  }

  const waMsg = encodeURIComponent(
    `Hi HN Coach! I just downloaded my Free Wellness Assessment Report.\n\nName: ${name}\nWeight: ${weight} kg\nBMI: ${results.bmi.toFixed(1)} (${results.bmiCategory})\nGoal: ${target}\n\nI'd love a FREE Consultation. Can you please help me? 🙏`,
  );
  const waUrl = `https://wa.me/919155348866?text=${waMsg}`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<title>HN Coach – Wellness Report – ${name}</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: Arial, Helvetica, sans-serif; font-size: 11pt; color: #1f2937; background: #fff; }
  .page { max-width: 760px; margin: 0 auto; padding: 0 24px 32px; }
  .header { background: linear-gradient(135deg, #0d9488 0%, #059669 100%); color: #fff; padding: 20px 24px 16px; margin: 0 -24px 24px; display: flex; align-items: center; gap: 16px; }
  .header-logo { width: 64px; height: 64px; border-radius: 12px; object-fit: cover; border: 2px solid rgba(255,255,255,0.4); flex-shrink: 0; }
  .header-text h1 { font-size: 22pt; font-weight: 800; letter-spacing: -0.5px; }
  .header-text p { font-size: 11pt; margin-top: 4px; opacity: 0.9; }
  .header-text .date { font-size: 8pt; margin-top: 6px; opacity: 0.75; }
  .tagline-center { background: linear-gradient(135deg, #0d9488, #059669); color: #fff; text-align: center; font-size: 14pt; font-weight: 900; font-style: italic; padding: 12px 20px; margin: 0 -24px 20px; letter-spacing: 0.5px; text-shadow: 0 1px 2px rgba(0,0,0,0.25); border-top: 3px solid rgba(255,255,255,0.3); border-bottom: 3px solid rgba(255,255,255,0.3); }
  .personal { background: #f0fdf9; border: 1px solid #99f6e4; border-radius: 8px; padding: 16px 20px; margin-bottom: 24px; }
  .personal h2 { color: #0d9488; font-size: 11pt; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 0.5px; }
  .personal-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4px 24px; }
  .personal-row { display: flex; gap: 6px; font-size: 10pt; padding: 3px 0; }
  .personal-row span:first-child { font-weight: 700; color: #374151; min-width: 120px; }
  .section-title { font-size: 13pt; font-weight: 800; color: #0d9488; margin: 20px 0 6px; border-bottom: 1.5px solid #0d9488; padding-bottom: 4px; }
  .metric-row { display: flex; justify-content: space-between; align-items: center; padding: 10px 12px; border: 1px solid #d1fae5; border-radius: 6px; margin-bottom: 6px; }
  .metric-row:nth-child(even) { background: #f8fffe; }
  .metric-label { font-weight: 700; font-size: 9.5pt; color: #374151; }
  .metric-note { font-size: 8pt; color: #6b7280; font-style: italic; }
  .metric-value { font-weight: 800; font-size: 12pt; color: #0d9488; }
  .banner { border-radius: 8px; padding: 12px 16px; margin: 10px 0; font-size: 11pt; font-weight: 600; }
  .banner.green { background: #dcfce7; color: #14532d; border: 1.5px solid #86efac; }
  .banner.orange { background: #fff7ed; color: #7c2d12; border: 1.5px solid #fdba74; }
  .banner.blue { background: #eff6ff; color: #1e3a8a; border: 1.5px solid #93c5fd; }
  .motivation-msg { background: linear-gradient(135deg, #fef3c7, #fde68a); color: #78350f; border: 2px solid #f59e0b; border-radius: 8px; padding: 12px 16px; margin: 8px 0; font-size: 10.5pt; font-weight: 700; line-height: 1.5; }
  .diet-box { background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 14px 18px; margin-bottom: 6px; }
  .diet-box h3 { color: #065f46; font-size: 10.5pt; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px; }
  .diet-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4px 20px; }
  .diet-row { display: flex; gap: 6px; font-size: 9.5pt; padding: 3px 0; }
  .diet-row span:first-child { font-weight: 700; color: #374151; min-width: 130px; }
  .poster-img { width: 55%; max-height: 180px; border-radius: 10px; margin: 16px auto; display: block; object-fit: cover; }
  .footer { background: linear-gradient(135deg, #0d9488 0%, #059669 100%); color: #fff; text-align: center; padding: 14px 16px; margin: 20px -24px 0; font-size: 9pt; }
  .risk-header { color: #dc2626 !important; border-bottom-color: #dc2626 !important; }
  .risk-healthy { background: #f0fdf4; border: 1.5px solid #86efac; border-radius: 8px; padding: 12px 16px; font-size: 10pt; color: #14532d; margin-bottom: 8px; }
  .risk-warning { background: #fffbeb; border: 1.5px solid #fcd34d; border-radius: 6px; padding: 8px 12px; font-size: 9pt; color: #92400e; margin-bottom: 8px; font-weight: 600; }
  .risk-table { width: 100%; border-collapse: collapse; margin-bottom: 6px; font-size: 9pt; }
  .risk-table thead tr { background: #fff1f2; }
  .risk-table th { text-align: left; padding: 7px 10px; font-size: 8.5pt; color: #991b1b; font-weight: 700; border-bottom: 1.5px solid #fecaca; }
  .risk-table td { padding: 7px 10px; border-bottom: 1px solid #fee2e2; vertical-align: top; }
  .risk-disease { font-weight: 700; color: #1f2937; }
  .risk-desc { color: #4b5563; font-style: italic; }
  .risk-badge { display: inline-block; padding: 2px 8px; border-radius: 20px; font-size: 8pt; font-weight: 700; white-space: nowrap; }
  .risk-disclaimer { font-size: 8pt; color: #6b7280; font-style: italic; text-align: center; margin-top: 6px; }
  .timeline-box { border-radius: 8px; padding: 14px 16px; margin: 8px 0 6px; }
  .timeline-box.loss { background: #fff7ed; border: 1.5px solid #fdba74; }
  .timeline-box.gain { background: #eff6ff; border: 1.5px solid #93c5fd; }
  .timeline-header { font-size: 10.5pt; font-weight: 700; color: #1f2937; margin-bottom: 12px; }
  .timeline-grid { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
  .timeline-col { flex: 1; text-align: center; background: #fff3e0; border: 1.5px solid #ffcc80; border-radius: 8px; padding: 10px 8px; }
  .timeline-col.slow { background: #fef9c3; border-color: #fcd34d; }
  .timeline-vs { font-size: 9pt; font-weight: 800; color: #6b7280; flex-shrink: 0; }
  .tl-rate { font-size: 9pt; font-weight: 800; color: #c2410c; text-transform: uppercase; letter-spacing: 0.3px; }
  .tl-rate-sub { font-size: 8pt; color: #ea580c; margin: 2px 0 6px; }
  .tl-months { font-size: 18pt; font-weight: 900; color: #9a3412; line-height: 1; }
  .timeline-note { font-size: 9pt; color: #7c2d12; background: #fff3e0; border: 1px solid #fdba74; border-radius: 6px; padding: 8px 12px; font-weight: 600; line-height: 1.5; }
  @media print {
    body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .no-print { display: none; }
  }
</style>
</head>
<body>
<div class="page">
  <div class="header">
    <img src="${logoUrl}" alt="HN Coach Logo" class="header-logo" />
    <div class="header-text">
      <h1>HN Coach</h1>
      <p>Wellness Assessment Report</p>
      <div class="date">Generated on: ${today}</div>
    </div>
  </div>

  <div class="tagline-center">✨ Eat all the snacks or look like a snack ✨</div>

  <div class="personal">
    <h2>Personal Details</h2>
    <div class="personal-grid">
      <div>
        <div class="personal-row"><span>Full Name:</span><span>${name}</span></div>
        <div class="personal-row"><span>Age:</span><span>${age} years</span></div>
        <div class="personal-row"><span>City:</span><span>${city}</span></div>
        <div class="personal-row"><span>WhatsApp:</span><span>${whatsapp}</span></div>
      </div>
      <div>
        <div class="personal-row"><span>Height:</span><span>${height} cm</span></div>
        <div class="personal-row"><span>Weight:</span><span>${weight} kg</span></div>
        <div class="personal-row"><span>Goal:</span><span>${target}</span></div>
      </div>
    </div>
  </div>

  <div class="section-title">Diet Preferences</div>
  <div class="diet-box">
    <div class="diet-grid">
      <div>
        <div class="diet-row"><span>Diet Type:</span><span>${dietPrefs.dietType === "veg" ? "Vegetarian" : "Non-Vegetarian"}</span></div>
        <div class="diet-row"><span>Eats Raw Fruits:</span><span>${dietPrefs.rawFruits === "yes" ? "Yes" : "No"}</span></div>
        <div class="diet-row"><span>Eats Raw Salad:</span><span>${dietPrefs.rawSalad === "yes" ? "Yes" : "No"}</span></div>
      </div>
      <div>
        <div class="diet-row"><span>Eats Curd:</span><span>${dietPrefs.curd === "yes" ? "Yes" : "No"}</span></div>
        <div class="diet-row"><span>Hunger Capacity:</span><span>${hungerLabel[dietPrefs.hungerCapacity] ?? dietPrefs.hungerCapacity}</span></div>
      </div>
    </div>
  </div>

  <div class="section-title">Wellness Assessment Results</div>
  <div class="metric-row"><div><div class="metric-label">Ideal Weight</div><div class="metric-note">Devine Formula</div></div><div class="metric-value">${results.idealWeight.toFixed(1)} kg</div></div>
  <div class="metric-row"><div><div class="metric-label">BMI (Body Mass Index)</div><div class="metric-note">${results.bmiCategory}</div></div><div class="metric-value">${results.bmi.toFixed(1)}</div></div>
  <div class="metric-row"><div><div class="metric-label">BMR (Basal Metabolic Rate)</div><div class="metric-note">Calories burned at rest</div></div><div class="metric-value">${results.bmr.toLocaleString()} kcal/day</div></div>
  <div class="metric-row"><div><div class="metric-label">TDEE (Total Daily Energy Expenditure)</div><div class="metric-note">Calories to maintain weight</div></div><div class="metric-value">${results.tdee.toLocaleString()} kcal/day</div></div>
  <div class="metric-row"><div><div class="metric-label">Daily Water Intake</div><div class="metric-note">1 litre per 18 kg body weight</div></div><div class="metric-value">${results.waterIntake.toFixed(1)} L/day</div></div>
  <div class="metric-row"><div><div class="metric-label">Daily Footsteps</div><div class="metric-note">1 kg body = 110 footsteps</div></div><div class="metric-value">${results.footsteps}</div></div>
  <div class="metric-row"><div><div class="metric-label">Daily Exercise Duration</div><div class="metric-note">Based on activity level</div></div><div class="metric-value">${results.exerciseMinutes}</div></div>

  <div class="section-title">Weight Goal</div>
  ${weightGoalHtml}

  ${timelineHtml}

  ${healthRiskHtml}

  <div class="footer">
    <div style="margin-bottom:6px;font-size:10pt;font-weight:700;">HN Coach &nbsp;|&nbsp; Personalized Wellness Coaching</div>
    <div style="margin-bottom:8px;">
      <a href="${waUrl}" style="display:inline-flex;align-items:center;gap:6px;background:#25D366;color:#fff;padding:8px 18px;border-radius:20px;text-decoration:none;font-size:9.5pt;font-weight:700;box-shadow:0 2px 10px rgba(37,211,102,0.4);">
        <svg viewBox="0 0 24 24" fill="white" style="width:16px;height:16px;flex-shrink:0;"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        Send This Report &amp; Get FREE Consultation
      </a>
    </div>
    <div style="font-size:8pt;opacity:0.85;">Consult HN Coach for personalized advice.</div>
  </div>
</div>
</body>
</html>`;

  const printWindow = window.open("", "_blank", "width=900,height=700");
  if (!printWindow) return;
  printWindow.document.write(html);
  printWindow.document.close();
  printWindow.focus();
  setTimeout(() => {
    printWindow.print();
  }, 600);
}

// ── Wellness Assessment (Single Unified Form) ──────────────────────────────────
const EMPTY_FORM: UnifiedFormData = {
  fullName: "",
  age: "",
  city: "",
  whatsapp: "",
  height: "",
  weight: "",
  gender: "",
  activityLevel: "",
  target: "",
  dietType: "",
  rawFruits: "",
  rawSalad: "",
  curd: "",
  hungerCapacity: "",
};

function WellnessAssessment() {
  const [form, setForm] = useState<UnifiedFormData>(EMPTY_FORM);
  const [isGenerating, setIsGenerating] = useState(false);

  const set = (field: keyof UnifiedFormData) => (value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const setInput =
    (field: keyof UnifiedFormData) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const allFilled =
    form.fullName.trim() &&
    form.age.trim() &&
    form.city.trim() &&
    form.whatsapp.trim() &&
    form.height.trim() &&
    form.weight.trim() &&
    form.gender &&
    form.activityLevel &&
    form.target.trim() &&
    form.dietType &&
    form.rawFruits &&
    form.rawSalad &&
    form.curd &&
    form.hungerCapacity;

  const handleGenerateReport = () => {
    const results = computeResults({
      weight: form.weight,
      height: form.height,
      age: form.age,
      gender: form.gender,
      activityLevel: form.activityLevel,
    });
    if (!results) return;

    setIsGenerating(true);
    setTimeout(() => {
      generatePDF(
        form.fullName,
        form.age,
        form.city,
        form.whatsapp,
        form.height,
        form.weight,
        form.target,
        results,
        {
          dietType: form.dietType,
          rawFruits: form.rawFruits,
          rawSalad: form.rawSalad,
          curd: form.curd,
          hungerCapacity: form.hungerCapacity,
        },
      );
      setIsGenerating(false);
    }, 200);
  };

  return (
    <section className="w-full" aria-label="Wellness Assessment">
      {/* Section heading */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary font-semibold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full mb-3">
          <FileText className="w-3.5 h-3.5" />
          Free Wellness Report
        </div>
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-foreground leading-tight">
          Get Your Free Wellness Assessment Report
        </h2>
        <p className="text-muted-foreground text-sm mt-2 max-w-md mx-auto">
          Fill in your details once and instantly download your personalised
          wellness report — completely free.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.1 }}
      >
        <Card
          data-ocid="assessment.form"
          className="shadow-lg border-border/60 ring-1 ring-primary/10"
          style={{
            boxShadow:
              "0 0 0 1px oklch(0.5 0.145 196 / 0.12), 0 4px 24px oklch(0.5 0.145 196 / 0.08)",
          }}
        >
          <CardContent className="pt-6 space-y-8">
            {/* ── Section 1: Personal Details ──────────────────────── */}
            <div className="space-y-4">
              <div className="flex items-center gap-2.5">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary/10">
                  <User className="w-3.5 h-3.5 text-primary" />
                </span>
                <h3 className="font-display font-bold text-base text-foreground tracking-tight">
                  Personal Details
                </h3>
              </div>

              {/* Full Name */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="f-name"
                  className="text-sm font-medium text-foreground/80"
                >
                  Full Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="f-name"
                  data-ocid="assessment.name.input"
                  type="text"
                  placeholder="e.g. Priya Sharma"
                  value={form.fullName}
                  onChange={setInput("fullName")}
                  className="h-11"
                />
              </div>

              {/* Age + City */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label
                    htmlFor="f-age"
                    className="text-sm font-medium text-foreground/80"
                  >
                    Age (years) <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="f-age"
                    data-ocid="assessment.age.input"
                    type="number"
                    placeholder="e.g. 30"
                    value={form.age}
                    onChange={setInput("age")}
                    className="h-11"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label
                    htmlFor="f-city"
                    className="text-sm font-medium text-foreground/80"
                  >
                    City <span className="text-destructive">*</span>
                  </Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60 pointer-events-none" />
                    <Input
                      id="f-city"
                      data-ocid="assessment.city.input"
                      type="text"
                      placeholder="e.g. Mumbai"
                      value={form.city}
                      onChange={setInput("city")}
                      className="h-11 pl-9"
                    />
                  </div>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="f-whatsapp"
                  className="text-sm font-medium text-foreground/80"
                >
                  WhatsApp No. <span className="text-destructive">*</span>
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60 pointer-events-none" />
                  <Input
                    id="f-whatsapp"
                    data-ocid="assessment.whatsapp.input"
                    type="tel"
                    placeholder="e.g. +91 98765 43210"
                    value={form.whatsapp}
                    onChange={setInput("whatsapp")}
                    className="h-11 pl-9"
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* ── Section 2: Body Metrics ───────────────────────────── */}
            <div className="space-y-4">
              <div className="flex items-center gap-2.5">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary/10">
                  <Activity className="w-3.5 h-3.5 text-primary" />
                </span>
                <h3 className="font-display font-bold text-base text-foreground tracking-tight">
                  Body Metrics
                </h3>
              </div>

              {/* Height + Weight */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label
                    htmlFor="f-height"
                    className="text-sm font-medium text-foreground/80"
                  >
                    Height (cm) <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="f-height"
                    data-ocid="assessment.height.input"
                    type="number"
                    placeholder="e.g. 165"
                    value={form.height}
                    onChange={setInput("height")}
                    className="h-11"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label
                    htmlFor="f-weight"
                    className="text-sm font-medium text-foreground/80"
                  >
                    Weight (kg) <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="f-weight"
                    data-ocid="assessment.weight.input"
                    type="number"
                    placeholder="e.g. 70"
                    value={form.weight}
                    onChange={setInput("weight")}
                    className="h-11"
                  />
                </div>
              </div>

              {/* Gender + Activity Level */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium text-foreground/80">
                    Gender <span className="text-destructive">*</span>
                  </Label>
                  <Select value={form.gender} onValueChange={set("gender")}>
                    <SelectTrigger
                      data-ocid="assessment.gender.select"
                      className="h-11"
                    >
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium text-foreground/80">
                    Activity Level <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={form.activityLevel}
                    onValueChange={set("activityLevel")}
                  >
                    <SelectTrigger
                      data-ocid="assessment.activity.select"
                      className="h-11"
                    >
                      <SelectValue placeholder="How active?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sedentary">Sedentary</SelectItem>
                      <SelectItem value="lightly_active">
                        Lightly Active
                      </SelectItem>
                      <SelectItem value="moderately_active">
                        Moderately Active
                      </SelectItem>
                      <SelectItem value="very_active">Very Active</SelectItem>
                      <SelectItem value="extra_active">Extra Active</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Separator />

            {/* ── Section 3: Your Goal ───────────────────────────────── */}
            <div className="space-y-4">
              <div className="flex items-center gap-2.5">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary/10">
                  <Target className="w-3.5 h-3.5 text-primary" />
                </span>
                <h3 className="font-display font-bold text-base text-foreground tracking-tight">
                  Your Goal
                </h3>
              </div>
              <div className="space-y-1.5">
                <Label
                  htmlFor="f-target"
                  className="text-sm font-medium text-foreground/80"
                >
                  Goal / Target <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="f-target"
                  data-ocid="assessment.target.input"
                  type="text"
                  placeholder='e.g. "Lose 5 kg", "Build muscle", "Stay fit"'
                  value={form.target}
                  onChange={setInput("target")}
                  className="h-11"
                />
              </div>
            </div>

            <Separator />

            {/* ── Section 4: Diet Preferences ───────────────────────── */}
            <div className="space-y-4">
              <div className="flex items-center gap-2.5">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary/10">
                  <Leaf className="w-3.5 h-3.5 text-primary" />
                </span>
                <h3 className="font-display font-bold text-base text-foreground tracking-tight">
                  Diet Preferences
                </h3>
              </div>

              {/* Diet Type */}
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-foreground/80">
                  Diet Preference <span className="text-destructive">*</span>
                </Label>
                <Select value={form.dietType} onValueChange={set("dietType")}>
                  <SelectTrigger
                    data-ocid="assessment.diet.select"
                    className="h-11"
                  >
                    <SelectValue placeholder="Vegetarian or Non-Vegetarian?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="veg">
                      <span className="flex items-center gap-2">
                        <Leaf className="w-3.5 h-3.5 text-green-600" />
                        Vegetarian
                      </span>
                    </SelectItem>
                    <SelectItem value="nonveg">
                      <span className="flex items-center gap-2">
                        <UtensilsCrossed className="w-3.5 h-3.5 text-red-500" />
                        Non-Vegetarian
                      </span>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Raw Fruits + Raw Salad */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium text-foreground/80 flex items-center gap-1.5">
                    <Apple className="w-3.5 h-3.5 text-orange-500" />
                    Raw Fruits added today?{" "}
                    <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={form.rawFruits}
                    onValueChange={set("rawFruits")}
                  >
                    <SelectTrigger
                      data-ocid="assessment.rawfruits.select"
                      className="h-11"
                    >
                      <SelectValue placeholder="Yes / No" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium text-foreground/80 flex items-center gap-1.5">
                    <Leaf className="w-3.5 h-3.5 text-green-600" />
                    Raw Salad added today?{" "}
                    <span className="text-destructive">*</span>
                  </Label>
                  <Select value={form.rawSalad} onValueChange={set("rawSalad")}>
                    <SelectTrigger
                      data-ocid="assessment.rawsalad.select"
                      className="h-11"
                    >
                      <SelectValue placeholder="Yes / No" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Curd + Hunger Capacity */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium text-foreground/80 flex items-center gap-1.5">
                    <Droplets className="w-3.5 h-3.5 text-yellow-600" />
                    Curd added today?{" "}
                    <span className="text-destructive">*</span>
                  </Label>
                  <Select value={form.curd} onValueChange={set("curd")}>
                    <SelectTrigger
                      data-ocid="assessment.curd.select"
                      className="h-11"
                    >
                      <SelectValue placeholder="Yes / No" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium text-foreground/80 flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 text-primary" />
                    Hunger Control Capacity{" "}
                    <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={form.hungerCapacity}
                    onValueChange={set("hungerCapacity")}
                  >
                    <SelectTrigger
                      data-ocid="assessment.hunger.select"
                      className="h-11"
                    >
                      <SelectValue placeholder="Select diet timing" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3hrs">3 hrs diet</SelectItem>
                      <SelectItem value="4hrs">4 hrs diet</SelectItem>
                      <SelectItem value="5hrs">5 hrs diet</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Separator />

            {/* ── CTA ────────────────────────────────────────────────── */}
            <div className="space-y-3">
              {!allFilled && (
                <p className="text-center text-xs text-muted-foreground">
                  Fill in all fields above to generate your free report.
                </p>
              )}
              <Button
                data-ocid="assessment.submit_button"
                className="w-full h-14 text-base font-bold tracking-wide shadow-lg"
                style={{
                  background: allFilled
                    ? "linear-gradient(135deg, #0d9488 0%, #059669 100%)"
                    : undefined,
                }}
                onClick={handleGenerateReport}
                disabled={!allFilled || isGenerating}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Generating Your Report…
                  </>
                ) : (
                  <>
                    <FileText className="w-5 h-5 mr-2" />
                    Get Your Free Wellness Assessment Report
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
}

// ── Social Buttons (fixed bottom-right, icon-only) ────────────────────────────
function SocialButtons() {
  return (
    <div className="fixed bottom-6 right-5 z-50 flex flex-col items-center gap-2.5">
      {/* YouTube */}
      <a
        data-ocid="youtube.button"
        href="https://youtube.com/@hn_coach?si=RhYfRtvtfq8TD79D"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-10 h-10 rounded-full shadow-lg hover:shadow-xl hover:brightness-110 transition-all duration-200 hover:scale-110 active:scale-95"
        style={{ background: "#FF0000" }}
        aria-label="Subscribe on YouTube"
      >
        <span className="sr-only">Subscribe on YouTube</span>
        <svg
          viewBox="0 0 24 24"
          fill="white"
          className="w-4 h-4"
          aria-hidden="true"
        >
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      </a>

      {/* Instagram */}
      <a
        data-ocid="instagram.button"
        href="https://www.instagram.com/hn_coach?igsh=cXRobXd0MDVhenlp"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-10 h-10 rounded-full shadow-lg hover:shadow-xl hover:brightness-110 transition-all duration-200 hover:scale-110 active:scale-95"
        style={{
          background:
            "linear-gradient(135deg, #f58529 0%, #dd2a7b 50%, #8134af 100%)",
        }}
        aria-label="Follow on Instagram"
      >
        <span className="sr-only">Follow on Instagram</span>
        <svg
          viewBox="0 0 24 24"
          fill="white"
          className="w-4 h-4"
          aria-hidden="true"
        >
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      </a>

      {/* WhatsApp */}
      <a
        data-ocid="whatsapp.button"
        href="https://wa.me/919155348866"
        target="_blank"
        rel="noopener noreferrer"
        className="wa-pulse flex items-center justify-center w-10 h-10 rounded-full bg-whatsapp shadow-lg hover:shadow-xl hover:brightness-110 transition-all duration-200 hover:scale-110 active:scale-95"
        aria-label="WhatsApp Personal Coaching"
      >
        <span className="sr-only">WhatsApp Personal Coaching</span>
        <svg
          viewBox="0 0 24 24"
          fill="white"
          className="w-4 h-4"
          aria-hidden="true"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </div>
  );
}

// ── App ────────────────────────────────────────────────────────────────────────
export default function App() {
  const year = new Date().getFullYear();
  const hostname = encodeURIComponent(window.location.hostname);

  // FOMO countdown: starts at 5 minutes (300 seconds)
  const [countdown, setCountdown] = useState(300);
  useEffect(() => {
    const id = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(id);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);
  const countdownMins = String(Math.floor(countdown / 60)).padStart(2, "0");
  const countdownSecs = String(countdown % 60).padStart(2, "0");

  return (
    <div className="min-h-screen flex flex-col bg-background page-mesh">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/85 backdrop-blur-md border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-3.5 flex items-center gap-3.5">
          <img
            src="/assets/uploads/IMG-20260226-WA0000-1-1.jpg"
            alt="HN Coach"
            className="w-12 h-12 rounded-xl object-cover shadow-md ring-2 ring-primary/30"
          />
          <div>
            <h1 className="font-display font-bold text-2xl text-foreground leading-none tracking-tight">
              HN Coach
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5 font-medium tracking-wide uppercase">
              Health &amp; Nutrition Calculators
            </p>
          </div>
        </div>
      </header>

      {/* Hero Tagline */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="w-full"
        style={{
          background:
            "linear-gradient(135deg, #0d9488 0%, #059669 55%, #16a34a 100%)",
        }}
      >
        <div className="max-w-4xl mx-auto px-4 py-5 text-center">
          <p className="text-xl sm:text-2xl font-display font-bold italic text-white tracking-tight drop-shadow-sm">
            💪 Eat all the snacks or look like a snack. 💪
          </p>
          <p className="text-xs sm:text-sm text-white/80 mt-1 font-medium tracking-wide">
            Your free personalised wellness assessment starts here
          </p>
        </div>
      </motion.div>

      {/* FOMO Offer Banner */}
      <div className="w-full max-w-4xl mx-auto px-4 pt-4">
        <motion.div
          data-ocid="fomo.offer.banner"
          initial={{ opacity: 0, y: -16, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative overflow-hidden rounded-2xl"
          style={{
            background:
              "linear-gradient(135deg, #dc2626 0%, #ea580c 45%, #f59e0b 100%)",
            boxShadow:
              "0 0 0 2px rgba(251,191,36,0.5), 0 8px 32px rgba(220,38,38,0.4)",
            animation: "fomoPulse 2s ease-in-out infinite",
          }}
        >
          {/* Animated border glow */}
          <div
            className="absolute inset-0 rounded-2xl"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 50%, rgba(255,255,255,0.08) 100%)",
              pointerEvents: "none",
            }}
          />
          <div className="relative px-5 py-5 text-center">
            <p className="text-xl sm:text-2xl font-bold text-white leading-snug drop-shadow-md">
              🔥 Enroll in Our Personal Coaching Program TODAY — Get{" "}
              <span
                className="text-yellow-200"
                style={{
                  textShadow: "0 0 12px rgba(253,224,71,0.8)",
                  fontSize: "inherit",
                }}
              >
                10% OFF!
              </span>
            </p>
            <p className="text-sm sm:text-base text-yellow-100 mt-1.5 font-semibold flex flex-wrap items-center justify-center gap-2">
              <span>⚡ Download your</span>
              <span className="text-white font-extrabold">
                FREE report NOW!
              </span>
              <span>Offer expires in:</span>
              <span
                className="inline-flex items-center gap-1 px-3 py-0.5 rounded-lg font-extrabold text-lg tracking-widest tabular-nums"
                style={{
                  background: countdown <= 60 ? "#dc2626" : "#fefce8",
                  color: countdown <= 60 ? "#fff" : "#7c2d12",
                  boxShadow:
                    countdown <= 60
                      ? "0 0 12px rgba(220,38,38,0.7)"
                      : "0 0 8px rgba(253,224,71,0.6)",
                  minWidth: "5.5rem",
                  justifyContent: "center",
                  transition: "background 0.3s, box-shadow 0.3s",
                }}
                aria-live="polite"
                aria-label={`${countdownMins} minutes ${countdownSecs} seconds remaining`}
              >
                ⏱ {countdownMins}:{countdownSecs}
              </span>
              <span className="text-yellow-200 font-bold">
                Only a few spots left!
              </span>
            </p>
            <a
              href="https://wa.me/919155348866?text=Hi%20HN%20Coach%2C%20I%20want%20to%20enroll%20and%20claim%20my%2010%25%20discount!"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 px-6 py-3 rounded-full font-bold text-sm text-gray-900 transition-all duration-200 hover:brightness-110 active:scale-95 hover:scale-105 shadow-lg"
              style={{
                background: "linear-gradient(135deg, #fde047 0%, #fbbf24 100%)",
                boxShadow: "0 4px 16px rgba(251,191,36,0.5)",
              }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                style={{ width: 18, height: 18, flexShrink: 0 }}
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Claim My 10% Discount Now
            </a>
          </div>
        </motion.div>
      </div>

      {/* Banner */}
      <div className="w-full max-w-4xl mx-auto px-4 pt-5">
        <img
          src="/assets/uploads/IMG_20260304_203219-1.jpg"
          alt="20 Days Complete Wellness Transformation Program"
          className="w-full rounded-2xl shadow-md object-cover"
        />
      </div>

      {/* Main */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8">
        <WellnessAssessment />
      </main>

      {/* Join Our Team Section */}
      <div className="w-full max-w-4xl mx-auto px-4 pt-8 pb-4">
        <div
          className="rounded-2xl overflow-hidden shadow-2xl"
          style={{
            background:
              "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {/* Invitation Text */}
          <div className="px-6 pt-8 pb-5 text-center">
            <div
              className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-4"
              style={{
                background: "linear-gradient(90deg, #f59e0b, #ef4444)",
                color: "#fff",
                letterSpacing: "0.12em",
              }}
            >
              Exclusive Opportunity
            </div>
            <h2
              className="text-2xl sm:text-3xl font-extrabold text-white mb-3 leading-tight"
              style={{ textShadow: "0 2px 12px rgba(0,0,0,0.5)" }}
            >
              Join Our Team &amp; Become a{" "}
              <span
                style={{
                  background: "linear-gradient(90deg, #fbbf24, #f59e0b)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Certified Wellness Coach
              </span>
            </h2>
            <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed mb-3">
              We are looking for passionate, driven individuals who believe in
              the power of health and wellness. As an HN Coach partner, you will
              have the opportunity to transform lives, spread health awareness,
              and build a meaningful income — all on your own terms.
            </p>
            <p className="text-yellow-300 font-semibold text-sm sm:text-base mb-5">
              🌟 Start earning while doing what you love — helping people live
              healthier, happier lives.
            </p>
            <a
              href="https://wa.me/919155348866?text=Hi%20HN%20Coach%2C%20I%20am%20interested%20in%20joining%20your%20team%20as%20a%20Wellness%20Coach."
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="join.team.primary_button"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-bold text-gray-900 text-sm transition-all duration-200 hover:brightness-110 hover:scale-105 active:scale-95 shadow-lg"
              style={{
                background: "linear-gradient(135deg, #fde047 0%, #fbbf24 100%)",
                boxShadow: "0 4px 20px rgba(251,191,36,0.5)",
              }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                style={{ width: 18, height: 18, flexShrink: 0 }}
                aria-hidden="true"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Send "START" to Join Now
            </a>
          </div>

          {/* Image */}
          <div className="px-4 pb-6">
            <img
              src="/assets/uploads/IMG_20260304_232730-1.jpg"
              alt="Join HN Coach Team — Opportunity for Serious People"
              className="w-full rounded-xl shadow-lg object-cover"
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border mt-8 py-5 text-center text-xs text-muted-foreground">
        © {year}. Built with ❤️ using{" "}
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-foreground transition-colors"
        >
          caffeine.ai
        </a>
      </footer>

      {/* Social Buttons */}
      <SocialButtons />
    </div>
  );
}
