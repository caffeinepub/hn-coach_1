import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  CheckCircle2,
  Download,
  Droplets,
  Dumbbell,
  FileText,
  Flame,
  Footprints,
  Heart,
  Scale,
  Shield,
  Timer,
  User,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

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

interface HealthRisk {
  condition: string;
  timeline: string;
  urgency: "high" | "medium" | "low";
}

interface SupersetExercise {
  number: number;
  exerciseA: string;
  exerciseB: string;
  sets: number;
  reps: string;
  rest: string;
  duration: string;
}

interface SupersetPlan {
  level: string;
  goal: string;
  exercises: SupersetExercise[];
  totalTime: string;
  tip: string;
}

// ── Calculations ───────────────────────────────────────────────────────────────
const ACTIVITY_MULTIPLIERS: Record<string, number> = {
  sedentary: 1.2,
  lightly_active: 1.375,
  moderately_active: 1.55,
  very_active: 1.725,
  extra_active: 1.9,
};

function computeResults(inputs: AssessmentInputs): AssessmentResults | null {
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

  // Water intake: weight / 15 litres
  const waterIntake = w / 15;

  // Footsteps
  const footsteps =
    a > 60 || w > 100 ? "7,000 – 8,000 steps/day" : "10,000 steps/day";

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

// ── Health Risks Logic ─────────────────────────────────────────────────────────
function getHealthRisks(bmiCategory: string, gender: string): HealthRisk[] {
  if (bmiCategory === "Obese") {
    const risks: HealthRisk[] = [
      {
        condition: "Type 2 Diabetes",
        timeline: "Risk within 6–12 months",
        urgency: "high",
      },
      {
        condition: "Hypertension",
        timeline: "Risk within 6–12 months",
        urgency: "high",
      },
      {
        condition: "Heart Disease",
        timeline: "Risk within 1–2 years",
        urgency: "medium",
      },
      {
        condition: "Sleep Apnea",
        timeline: "Risk within 1–2 years",
        urgency: "medium",
      },
      {
        condition: "Fatty Liver Disease",
        timeline: "Risk within 6–12 months",
        urgency: "high",
      },
      {
        condition: "Joint Pain & Osteoarthritis",
        timeline: "Risk within 1–3 years",
        urgency: "low",
      },
      {
        condition: "Metabolic Syndrome",
        timeline: "Risk within 6 months",
        urgency: "high",
      },
    ];
    if (gender === "female") {
      risks.push({
        condition: "PCOS",
        timeline: "Risk within 6–12 months",
        urgency: "high",
      });
    }
    return risks;
  }
  if (bmiCategory === "Overweight") {
    return [
      {
        condition: "Pre-Diabetes",
        timeline: "Risk within 1–2 years",
        urgency: "medium",
      },
      {
        condition: "Hypertension",
        timeline: "Risk within 1–3 years",
        urgency: "low",
      },
      {
        condition: "Insulin Resistance",
        timeline: "Risk within 6–12 months",
        urgency: "high",
      },
      {
        condition: "Joint Stress",
        timeline: "Risk within 2–3 years",
        urgency: "low",
      },
      {
        condition: "Fatty Liver",
        timeline: "Risk within 1–2 years",
        urgency: "medium",
      },
    ];
  }
  if (bmiCategory === "Underweight") {
    const risks: HealthRisk[] = [
      {
        condition: "Anemia",
        timeline: "Risk within 3–6 months",
        urgency: "high",
      },
      {
        condition: "Osteoporosis",
        timeline: "Risk within 1–2 years",
        urgency: "medium",
      },
      {
        condition: "Weakened Immune System",
        timeline: "Risk within few months",
        urgency: "high",
      },
      {
        condition: "Hormonal Imbalance",
        timeline: "Risk within 6–12 months",
        urgency: "high",
      },
    ];
    if (gender === "female") {
      risks.push({
        condition: "Irregular Menstruation",
        timeline: "Risk within few months",
        urgency: "high",
      });
    }
    return risks;
  }
  return []; // Normal BMI
}

function urgencyBadgeClass(urgency: HealthRisk["urgency"]) {
  switch (urgency) {
    case "high":
      return "bg-red-100 text-red-700 border-red-200";
    case "medium":
      return "bg-orange-100 text-orange-700 border-orange-200";
    case "low":
      return "bg-yellow-100 text-yellow-700 border-yellow-200";
  }
}

// ── Superset Plans ─────────────────────────────────────────────────────────────
function computeSupersetPlan(level: string, goal: string): SupersetPlan {
  const tips: Record<string, string> = {
    lose_weight: "Tip: Keep rest times strict for fat burn",
    build_muscle:
      "Tip: Focus on progressive overload — increase weight each week",
    maintain_fitness: "Tip: Consistency is key — 3–4 sessions per week",
  };

  if (level === "beginner") {
    return {
      level,
      goal,
      exercises: [
        {
          number: 1,
          exerciseA: "Push-ups",
          exerciseB: "Bodyweight Squats",
          sets: 3,
          reps: "10 reps",
          rest: "60s rest",
          duration: "~8 min",
        },
        {
          number: 2,
          exerciseA: "Dumbbell Rows",
          exerciseB: "Lunges",
          sets: 3,
          reps: "10 reps",
          rest: "60s rest",
          duration: "~8 min",
        },
        {
          number: 3,
          exerciseA: "Shoulder Press",
          exerciseB: "Glute Bridges",
          sets: 3,
          reps: "10 reps",
          rest: "60s rest",
          duration: "~8 min",
        },
        {
          number: 4,
          exerciseA: "Plank",
          exerciseB: "Mountain Climbers",
          sets: 3,
          reps: "30s hold",
          rest: "45s rest",
          duration: "~6 min",
        },
      ],
      totalTime: "~30 min",
      tip: tips[goal] ?? tips.maintain_fitness,
    };
  }

  if (level === "intermediate") {
    return {
      level,
      goal,
      exercises: [
        {
          number: 1,
          exerciseA: "Bench Press",
          exerciseB: "Pull-ups",
          sets: 4,
          reps: "12 reps",
          rest: "60s rest",
          duration: "~10 min",
        },
        {
          number: 2,
          exerciseA: "Deadlift",
          exerciseB: "Overhead Press",
          sets: 4,
          reps: "10 reps",
          rest: "60s rest",
          duration: "~10 min",
        },
        {
          number: 3,
          exerciseA: "Romanian Deadlift",
          exerciseB: "Dumbbell Curls",
          sets: 4,
          reps: "12 reps",
          rest: "60s rest",
          duration: "~10 min",
        },
        {
          number: 4,
          exerciseA: "Lat Pulldown",
          exerciseB: "Tricep Dips",
          sets: 4,
          reps: "12 reps",
          rest: "45s rest",
          duration: "~8 min",
        },
      ],
      totalTime: "~40 min",
      tip: tips[goal] ?? tips.maintain_fitness,
    };
  }

  // Advanced
  return {
    level,
    goal,
    exercises: [
      {
        number: 1,
        exerciseA: "Barbell Squat",
        exerciseB: "Pull-ups",
        sets: 5,
        reps: "12 reps",
        rest: "45s rest",
        duration: "~12 min",
      },
      {
        number: 2,
        exerciseA: "Deadlift",
        exerciseB: "Incline Press",
        sets: 5,
        reps: "10 reps",
        rest: "45s rest",
        duration: "~12 min",
      },
      {
        number: 3,
        exerciseA: "Leg Press",
        exerciseB: "Seated Row",
        sets: 5,
        reps: "12 reps",
        rest: "45s rest",
        duration: "~10 min",
      },
      {
        number: 4,
        exerciseA: "Romanian Deadlift",
        exerciseB: "Arnold Press",
        sets: 5,
        reps: "12 reps",
        rest: "45s rest",
        duration: "~10 min",
      },
      {
        number: 5,
        exerciseA: "Plank",
        exerciseB: "Burpees",
        sets: 5,
        reps: "30s / 10 reps",
        rest: "30s rest",
        duration: "~8 min",
      },
    ],
    totalTime: "~52 min",
    tip: tips[goal] ?? tips.maintain_fitness,
  };
}

// ── PDF Generator (browser print) ─────────────────────────────────────────────
function generatePDF(
  name: string,
  age: string,
  city: string,
  height: string,
  weight: string,
  target: string,
  results: AssessmentResults,
  supersetPlan: SupersetPlan | null,
  gender: string,
) {
  const today = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const currentW = Number.parseFloat(weight);
  const weightDiff = currentW - results.idealWeight;
  const absWeightDiff = Math.abs(weightDiff).toFixed(1);

  const risks = getHealthRisks(results.bmiCategory, gender);
  const topRisks = risks.slice(0, 4);

  let weightGoalHtml = "";
  if (Math.abs(weightDiff) <= 1) {
    weightGoalHtml = `<div class="banner green">&#10003; You are at your <strong>IDEAL WEIGHT!</strong> Keep it up.</div>`;
  } else if (weightDiff > 0) {
    weightGoalHtml = `<div class="banner orange">&#9888; You need to <strong>LOSE ${absWeightDiff} kg</strong> to reach your ideal weight (${results.idealWeight.toFixed(1)} kg)</div>`;
  } else {
    weightGoalHtml = `<div class="banner blue">&#8593; You need to <strong>GAIN ${absWeightDiff} kg</strong> to reach your ideal weight (${results.idealWeight.toFixed(1)} kg)</div>`;
  }

  let risksHtml = "";
  if (results.bmiCategory === "Normal") {
    risksHtml = `<div class="banner green">&#10003; Your weight is in a healthy range. Maintain your habits!</div>`;
  } else {
    risksHtml = topRisks
      .map(
        (r) =>
          `<div class="risk-row"><span class="risk-name">${r.condition}</span><span class="risk-badge ${r.urgency}">${r.timeline}</span></div>`,
      )
      .join("");
  }

  let supersetHtml = "";
  if (supersetPlan) {
    const levelCap =
      supersetPlan.level.charAt(0).toUpperCase() + supersetPlan.level.slice(1);
    const exerciseRows = supersetPlan.exercises
      .map(
        (ex) =>
          `<tr><td><strong>Superset ${ex.number}</strong></td><td>${ex.exerciseA} + ${ex.exerciseB}</td><td>${ex.sets} × ${ex.reps}</td><td>${ex.rest}</td><td>${ex.duration}</td></tr>`,
      )
      .join("");
    supersetHtml = `
      <div class="section-title">Your Superset Workout Plan</div>
      <div class="banner teal">Total Session: <strong>${supersetPlan.totalTime}</strong> &nbsp;|&nbsp; Level: ${levelCap}</div>
      <table class="superset-table">
        <thead><tr><th>#</th><th>Exercises</th><th>Sets × Reps</th><th>Rest</th><th>Duration</th></tr></thead>
        <tbody>${exerciseRows}</tbody>
      </table>
      <p class="tip">${supersetPlan.tip}</p>`;
  }

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<title>HN Coach – Wellness Report – ${name}</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: Arial, Helvetica, sans-serif; font-size: 11pt; color: #1f2937; background: #fff; }
  .page { max-width: 760px; margin: 0 auto; padding: 0 24px 32px; }
  .header { background: #0d9488; color: #fff; padding: 20px 24px 16px; margin: 0 -24px 24px; }
  .header h1 { font-size: 22pt; font-weight: 800; letter-spacing: -0.5px; }
  .header p { font-size: 11pt; margin-top: 4px; opacity: 0.9; }
  .header .date { font-size: 8pt; margin-top: 6px; opacity: 0.75; }
  .personal { background: #f0fdf9; border: 1px solid #99f6e4; border-radius: 8px; padding: 16px 20px; margin-bottom: 24px; }
  .personal h2 { color: #0d9488; font-size: 11pt; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 0.5px; }
  .personal-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4px 24px; }
  .personal-row { display: flex; gap: 6px; font-size: 10pt; padding: 3px 0; }
  .personal-row span:first-child { font-weight: 700; color: #374151; min-width: 80px; }
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
  .banner.teal { background: #ccfbf1; color: #065f46; border: 1.5px solid #5eead4; }
  .risk-row { display: flex; justify-content: space-between; align-items: center; padding: 8px 12px; border-radius: 6px; margin-bottom: 5px; background: #fff5f5; border: 1px solid #fecaca; }
  .risk-name { font-weight: 700; font-size: 10pt; color: #374151; }
  .risk-badge { font-size: 8.5pt; font-weight: 700; padding: 3px 8px; border-radius: 4px; }
  .risk-badge.high { background: #fee2e2; color: #991b1b; }
  .risk-badge.medium { background: #ffedd5; color: #9a3412; }
  .risk-badge.low { background: #fef9c3; color: #713f12; }
  .disclaimer { font-size: 8pt; font-style: italic; color: #9ca3af; margin-top: 8px; line-height: 1.5; }
  .superset-table { width: 100%; border-collapse: collapse; margin: 10px 0; font-size: 9.5pt; }
  .superset-table th { background: #0d9488; color: #fff; padding: 8px 10px; text-align: left; font-size: 9pt; }
  .superset-table td { padding: 8px 10px; border-bottom: 1px solid #e5e7eb; }
  .superset-table tr:nth-child(even) td { background: #f8fffe; }
  .tip { font-size: 9.5pt; font-style: italic; color: #0d9488; margin-top: 8px; font-weight: 600; }
  .footer { background: #0d9488; color: #fff; text-align: center; padding: 10px; margin: 32px -24px 0; font-size: 8.5pt; }
  @media print {
    body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .no-print { display: none; }
  }
</style>
</head>
<body>
<div class="page">
  <div class="header">
    <h1>HN Coach</h1>
    <p>Wellness Assessment Report</p>
    <div class="date">Generated on: ${today}</div>
  </div>

  <div class="personal">
    <h2>Personal Details</h2>
    <div class="personal-grid">
      <div>
        <div class="personal-row"><span>Full Name:</span><span>${name}</span></div>
        <div class="personal-row"><span>Age:</span><span>${age} years</span></div>
        <div class="personal-row"><span>City:</span><span>${city}</span></div>
      </div>
      <div>
        <div class="personal-row"><span>Height:</span><span>${height} cm</span></div>
        <div class="personal-row"><span>Weight:</span><span>${weight} kg</span></div>
        <div class="personal-row"><span>Goal:</span><span>${target}</span></div>
      </div>
    </div>
  </div>

  <div class="section-title">Wellness Assessment Results</div>
  <div class="metric-row"><div><div class="metric-label">Ideal Weight</div><div class="metric-note">Devine Formula</div></div><div class="metric-value">${results.idealWeight.toFixed(1)} kg</div></div>
  <div class="metric-row"><div><div class="metric-label">BMI (Body Mass Index)</div><div class="metric-note">${results.bmiCategory}</div></div><div class="metric-value">${results.bmi.toFixed(1)}</div></div>
  <div class="metric-row"><div><div class="metric-label">BMR (Basal Metabolic Rate)</div><div class="metric-note">Calories burned at rest</div></div><div class="metric-value">${results.bmr.toLocaleString()} kcal/day</div></div>
  <div class="metric-row"><div><div class="metric-label">TDEE (Total Daily Energy Expenditure)</div><div class="metric-note">Calories to maintain weight</div></div><div class="metric-value">${results.tdee.toLocaleString()} kcal/day</div></div>
  <div class="metric-row"><div><div class="metric-label">Daily Water Intake</div><div class="metric-note">1 litre per 15 kg body weight</div></div><div class="metric-value">${results.waterIntake.toFixed(1)} L/day</div></div>
  <div class="metric-row"><div><div class="metric-label">Daily Footsteps</div><div class="metric-note">Recommended walking target</div></div><div class="metric-value">${results.footsteps}</div></div>
  <div class="metric-row"><div><div class="metric-label">Daily Exercise Duration</div><div class="metric-note">Based on activity level</div></div><div class="metric-value">${results.exerciseMinutes}</div></div>

  <div class="section-title">Weight Goal</div>
  ${weightGoalHtml}

  <div class="section-title">Health Risk Awareness</div>
  ${risksHtml}
  <p class="disclaimer">* This is an educational estimate based on BMI. Please consult a healthcare professional for personalized advice.</p>

  ${supersetHtml}

  <div class="footer">Generated by HN Coach &nbsp;|&nbsp; @hn_coach &nbsp;|&nbsp; Personalized Wellness Coaching</div>
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

// ── Result Metric Card ─────────────────────────────────────────────────────────
function MetricBlock({
  icon,
  label,
  value,
  note,
  delay,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  note?: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="flex items-center gap-4 p-4 rounded-xl bg-result-bg border border-result-border relative overflow-hidden"
    >
      <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl bg-primary" />
      <div className="flex items-center justify-center w-9 h-9 rounded-full bg-primary/10 shrink-0 ml-2">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide truncate">
          {label}
        </p>
        {note && (
          <p className="text-xs text-muted-foreground/70 italic truncate">
            {note}
          </p>
        )}
      </div>
      <p className="font-display font-bold text-primary text-lg text-right shrink-0">
        {value}
      </p>
    </motion.div>
  );
}

// ── BMI Category badge colors ──────────────────────────────────────────────────
function bmiColor(category: string) {
  switch (category) {
    case "Underweight":
      return "bg-blue-50 text-blue-700 border-blue-200";
    case "Normal":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "Overweight":
      return "bg-amber-50 text-amber-700 border-amber-200";
    case "Obese":
      return "bg-red-50 text-red-700 border-red-200";
    default:
      return "bg-muted text-muted-foreground border-border";
  }
}

// ── Weight Gap Banner ──────────────────────────────────────────────────────────
function WeightGapBanner({
  currentWeight,
  idealWeight,
}: {
  currentWeight: number;
  idealWeight: number;
}) {
  const diff = currentWeight - idealWeight;
  const absDiff = Math.abs(diff).toFixed(1);

  if (Math.abs(diff) <= 1) {
    return (
      <motion.div
        data-ocid="weight.gap.banner"
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45 }}
        className="flex items-center gap-4 p-5 rounded-2xl bg-emerald-50 border-2 border-emerald-300 shadow-sm"
      >
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 shrink-0">
          <CheckCircle2 className="w-6 h-6 text-emerald-600" />
        </div>
        <div>
          <p className="font-bold text-emerald-800 text-base leading-snug">
            You are at your{" "}
            <span className="text-emerald-600 font-extrabold text-lg">
              Ideal Weight!
            </span>
          </p>
          <p className="text-sm text-emerald-700 mt-0.5">
            Keep up the great work and maintain your healthy habits.
          </p>
        </div>
      </motion.div>
    );
  }

  if (diff > 0) {
    return (
      <motion.div
        data-ocid="weight.gap.banner"
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45 }}
        className="flex items-center gap-4 p-5 rounded-2xl bg-orange-50 border-2 border-orange-300 shadow-sm"
      >
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-orange-100 shrink-0">
          <ArrowDown className="w-6 h-6 text-orange-600" />
        </div>
        <div>
          <p className="font-bold text-orange-900 text-base leading-snug">
            You need to{" "}
            <span className="text-red-600 font-extrabold text-xl">
              LOSE {absDiff} kg
            </span>{" "}
            to reach your ideal weight
          </p>
          <p className="text-sm text-orange-700 mt-0.5">
            Your ideal weight is <strong>{idealWeight.toFixed(1)} kg</strong>.
            Start your journey today.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      data-ocid="weight.gap.banner"
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.45 }}
      className="flex items-center gap-4 p-5 rounded-2xl bg-blue-50 border-2 border-blue-300 shadow-sm"
    >
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 shrink-0">
        <ArrowUp className="w-6 h-6 text-blue-600" />
      </div>
      <div>
        <p className="font-bold text-blue-900 text-base leading-snug">
          You need to{" "}
          <span className="text-blue-600 font-extrabold text-xl">
            GAIN {absDiff} kg
          </span>{" "}
          to reach your ideal weight
        </p>
        <p className="text-sm text-blue-700 mt-0.5">
          Your ideal weight is <strong>{idealWeight.toFixed(1)} kg</strong>.
          Focus on healthy nutrition.
        </p>
      </div>
    </motion.div>
  );
}

// ── Health Risk Section ────────────────────────────────────────────────────────
function HealthRisksSection({
  bmiCategory,
  gender,
}: {
  bmiCategory: string;
  gender: string;
}) {
  const risks = getHealthRisks(bmiCategory, gender);

  return (
    <motion.div
      data-ocid="health.risks.section"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15 }}
    >
      <Card className="shadow-md border-border/60">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2.5 font-display text-lg text-foreground">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-red-100">
              <Heart className="w-4 h-4 text-red-600" />
            </span>
            Health Risks at Your Current Weight
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {bmiCategory === "Normal" ? (
            <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-50 border border-emerald-200">
              <Shield className="w-5 h-5 text-emerald-600 shrink-0" />
              <p className="text-sm font-medium text-emerald-800">
                Your weight is in a healthy range. Maintain your habits and
                you're on the right path!
              </p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {risks.map((risk, idx) => (
                <motion.div
                  key={risk.condition}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: idx * 0.07 }}
                  className="flex items-center justify-between gap-3 p-3.5 rounded-xl bg-card border border-border/50"
                >
                  <div className="flex items-center gap-3">
                    <AlertTriangle
                      className={`w-4 h-4 shrink-0 ${
                        risk.urgency === "high"
                          ? "text-red-500"
                          : risk.urgency === "medium"
                            ? "text-orange-500"
                            : "text-yellow-500"
                      }`}
                    />
                    <span className="text-sm font-semibold text-foreground">
                      {risk.condition}
                    </span>
                  </div>
                  <Badge
                    variant="outline"
                    className={`text-xs font-bold shrink-0 ${urgencyBadgeClass(risk.urgency)}`}
                  >
                    {risk.timeline}
                  </Badge>
                </motion.div>
              ))}
            </div>
          )}
          <p className="text-xs text-muted-foreground italic pt-1 leading-relaxed">
            * This is an educational estimate based on BMI. Please consult a
            healthcare professional for personalized advice.
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// ── Wellness Assessment Component ──────────────────────────────────────────────
function WellnessAssessment() {
  const [inputs, setInputs] = useState<AssessmentInputs>({
    weight: "",
    height: "",
    age: "",
    gender: "",
    activityLevel: "",
  });
  const [results, setResults] = useState<AssessmentResults | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [supersetPlanForPDF, setSupersetPlanForPDF] =
    useState<SupersetPlan | null>(null);

  // Report form state
  const [reportName, setReportName] = useState("");
  const [reportAge, setReportAge] = useState("");
  const [reportCity, setReportCity] = useState("");
  const [reportHeight, setReportHeight] = useState("");
  const [reportWeight, setReportWeight] = useState("");
  const [reportTarget, setReportTarget] = useState("");

  const handleCalculate = () => {
    const r = computeResults(inputs);
    if (r) setResults(r);
  };

  const handleOpenModal = () => {
    setReportHeight(inputs.height);
    setReportWeight(inputs.weight);
    setReportAge(inputs.age);
    setShowDialog(true);
  };

  const handleDownload = () => {
    if (!results) return;
    if (
      !reportName ||
      !reportAge ||
      !reportCity ||
      !reportHeight ||
      !reportWeight ||
      !reportTarget
    )
      return;
    generatePDF(
      reportName,
      reportAge,
      reportCity,
      reportHeight,
      reportWeight,
      reportTarget,
      results,
      supersetPlanForPDF,
      inputs.gender,
    );
    setShowDialog(false);
  };

  // Expose setter for superset plan (passed down via ref-like pattern)
  const currentWeight = Number.parseFloat(inputs.weight);

  return (
    <>
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
            Free Assessment
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-foreground leading-tight">
            Get Your Wellness Assessment
          </h2>
          <p className="text-muted-foreground text-sm mt-2 max-w-md mx-auto">
            Fill in your details once and get a complete report covering 7 key
            wellness metrics — completely free.
          </p>
        </motion.div>

        {/* Assessment form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
        >
          <Card
            data-ocid="assessment.form"
            className="shadow-md border-border/60"
          >
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2.5 font-display text-lg text-foreground">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                  <User className="w-4 h-4 text-primary" />
                </span>
                Your Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              {/* Row 1: Weight + Height */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label
                    htmlFor="aw-weight"
                    className="text-sm font-medium text-foreground/80"
                  >
                    Weight (kg)
                  </Label>
                  <Input
                    id="aw-weight"
                    data-ocid="assessment.weight.input"
                    type="number"
                    placeholder="e.g. 70"
                    value={inputs.weight}
                    onChange={(e) =>
                      setInputs((prev) => ({ ...prev, weight: e.target.value }))
                    }
                    className="h-11"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label
                    htmlFor="aw-height"
                    className="text-sm font-medium text-foreground/80"
                  >
                    Height (cm)
                  </Label>
                  <Input
                    id="aw-height"
                    data-ocid="assessment.height.input"
                    type="number"
                    placeholder="e.g. 170"
                    value={inputs.height}
                    onChange={(e) =>
                      setInputs((prev) => ({ ...prev, height: e.target.value }))
                    }
                    className="h-11"
                  />
                </div>
              </div>

              {/* Row 2: Age + Gender */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label
                    htmlFor="aw-age"
                    className="text-sm font-medium text-foreground/80"
                  >
                    Age (years)
                  </Label>
                  <Input
                    id="aw-age"
                    data-ocid="assessment.age.input"
                    type="number"
                    placeholder="e.g. 30"
                    value={inputs.age}
                    onChange={(e) =>
                      setInputs((prev) => ({ ...prev, age: e.target.value }))
                    }
                    className="h-11"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium text-foreground/80">
                    Gender
                  </Label>
                  <Select
                    value={inputs.gender}
                    onValueChange={(v) =>
                      setInputs((prev) => ({ ...prev, gender: v }))
                    }
                  >
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
              </div>

              {/* Activity Level */}
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-foreground/80">
                  Activity Level
                </Label>
                <Select
                  value={inputs.activityLevel}
                  onValueChange={(v) =>
                    setInputs((prev) => ({ ...prev, activityLevel: v }))
                  }
                >
                  <SelectTrigger
                    data-ocid="assessment.activity.select"
                    className="h-11"
                  >
                    <SelectValue placeholder="How active are you?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sedentary">
                      Sedentary (little/no exercise)
                    </SelectItem>
                    <SelectItem value="lightly_active">
                      Lightly Active (1–3 days/wk)
                    </SelectItem>
                    <SelectItem value="moderately_active">
                      Moderately Active (3–5 days/wk)
                    </SelectItem>
                    <SelectItem value="very_active">
                      Very Active (6–7 days/wk)
                    </SelectItem>
                    <SelectItem value="extra_active">
                      Extra Active (athlete / physical job)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* CTA */}
              <Button
                data-ocid="assessment.submit_button"
                className="w-full h-12 text-base font-bold tracking-wide"
                onClick={handleCalculate}
              >
                <Activity className="w-5 h-5 mr-2" />
                Get My Free Assessment
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Results */}
        <AnimatePresence>
          {results && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-7 space-y-4"
            >
              {/* Weight Gap Banner */}
              {!Number.isNaN(currentWeight) && currentWeight > 0 && (
                <WeightGapBanner
                  currentWeight={currentWeight}
                  idealWeight={results.idealWeight}
                />
              )}

              {/* Health Risks Section */}
              <HealthRisksSection
                bmiCategory={results.bmiCategory}
                gender={inputs.gender}
              />

              {/* Wellness Metrics Card */}
              <Card
                data-ocid="assessment.results.card"
                className="shadow-md border-border/60"
              >
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2.5 font-display text-lg text-foreground">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                      <FileText className="w-4 h-4 text-primary" />
                    </span>
                    Your Wellness Report
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <MetricBlock
                    icon={<Scale className="w-4 h-4 text-primary" />}
                    label="Ideal Weight"
                    value={`${results.idealWeight.toFixed(1)} kg`}
                    note="Devine Formula"
                    delay={0.05}
                  />
                  <MetricBlock
                    icon={<Activity className="w-4 h-4 text-primary" />}
                    label={`BMI — ${results.bmiCategory}`}
                    value={results.bmi.toFixed(1)}
                    note={(() => {
                      const colors = bmiColor(results.bmiCategory);
                      return colors ? results.bmiCategory : undefined;
                    })()}
                    delay={0.1}
                  />
                  <MetricBlock
                    icon={<Flame className="w-4 h-4 text-primary" />}
                    label="BMR (Basal Metabolic Rate)"
                    value={`${results.bmr.toLocaleString()} kcal/day`}
                    note="Calories burned at complete rest"
                    delay={0.15}
                  />
                  <MetricBlock
                    icon={<Flame className="w-4 h-4 text-primary" />}
                    label="TDEE (Total Daily Energy)"
                    value={`${results.tdee.toLocaleString()} kcal/day`}
                    note="Calories to maintain current weight"
                    delay={0.2}
                  />
                  <MetricBlock
                    icon={<Droplets className="w-4 h-4 text-primary" />}
                    label="Daily Water Intake"
                    value={`${results.waterIntake.toFixed(1)} L/day`}
                    note="1 litre per 15 kg body weight"
                    delay={0.25}
                  />
                  <MetricBlock
                    icon={<Footprints className="w-4 h-4 text-primary" />}
                    label="Daily Footsteps"
                    value={results.footsteps}
                    note="Recommended daily walking target"
                    delay={0.3}
                  />
                  <MetricBlock
                    icon={<Timer className="w-4 h-4 text-primary" />}
                    label="Daily Exercise Duration"
                    value={results.exerciseMinutes}
                    note="Based on your activity level"
                    delay={0.35}
                  />

                  <Separator className="my-2" />

                  <Button
                    data-ocid="assessment.download.open_modal_button"
                    className="w-full h-12 text-base font-bold tracking-wide"
                    onClick={handleOpenModal}
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Download My Report (Free)
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Superset Workout Planner — passes plan back up via callback */}
      <SupersetPlannerWithCallback onPlanGenerated={setSupersetPlanForPDF} />

      {/* PDF Download Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent data-ocid="report.dialog" className="max-w-md w-full">
          <DialogHeader>
            <DialogTitle className="font-display text-xl">
              Download Your Wellness Report
            </DialogTitle>
            <DialogDescription>
              Please fill in your details. They will appear on your personalised
              PDF report.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            {/* Full Name */}
            <div className="space-y-1.5">
              <Label htmlFor="r-name" className="text-sm font-medium">
                Full Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="r-name"
                data-ocid="report.name.input"
                type="text"
                placeholder="e.g. Priya Sharma"
                value={reportName}
                onChange={(e) => setReportName(e.target.value)}
                className="h-10"
              />
            </div>

            {/* Age + City */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="r-age" className="text-sm font-medium">
                  Age <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="r-age"
                  data-ocid="report.age.input"
                  type="number"
                  placeholder="e.g. 28"
                  value={reportAge}
                  onChange={(e) => setReportAge(e.target.value)}
                  className="h-10"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="r-city" className="text-sm font-medium">
                  City <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="r-city"
                  data-ocid="report.city.input"
                  type="text"
                  placeholder="e.g. Mumbai"
                  value={reportCity}
                  onChange={(e) => setReportCity(e.target.value)}
                  className="h-10"
                />
              </div>
            </div>

            {/* Height + Weight */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="r-height" className="text-sm font-medium">
                  Height (cm) <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="r-height"
                  data-ocid="report.height.input"
                  type="number"
                  value={reportHeight}
                  onChange={(e) => setReportHeight(e.target.value)}
                  className="h-10"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="r-weight" className="text-sm font-medium">
                  Weight (kg) <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="r-weight"
                  data-ocid="report.weight.input"
                  type="number"
                  value={reportWeight}
                  onChange={(e) => setReportWeight(e.target.value)}
                  className="h-10"
                />
              </div>
            </div>

            {/* Target / Goal */}
            <div className="space-y-1.5">
              <Label htmlFor="r-target" className="text-sm font-medium">
                Your Goal / Target <span className="text-destructive">*</span>
              </Label>
              <Input
                id="r-target"
                data-ocid="report.target.input"
                type="text"
                placeholder='e.g. "Lose 5 kg", "Build muscle"'
                value={reportTarget}
                onChange={(e) => setReportTarget(e.target.value)}
                className="h-10"
              />
            </div>
          </div>

          <DialogFooter className="flex gap-2 pt-2">
            <Button
              data-ocid="report.cancel.cancel_button"
              variant="outline"
              onClick={() => setShowDialog(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              data-ocid="report.download.primary_button"
              className="flex-1 font-bold"
              onClick={handleDownload}
              disabled={
                !reportName ||
                !reportAge ||
                !reportCity ||
                !reportHeight ||
                !reportWeight ||
                !reportTarget
              }
            >
              <Download className="w-4 h-4 mr-2" />
              Download PDF Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

// ── Superset Planner with callback ─────────────────────────────────────────────
function SupersetPlannerWithCallback({
  onPlanGenerated,
}: {
  onPlanGenerated: (plan: SupersetPlan | null) => void;
}) {
  const [weight, setWeight] = useState("");
  const [goal, setGoal] = useState("");
  const [level, setLevel] = useState("");
  const [plan, setPlan] = useState<SupersetPlan | null>(null);

  const handleGenerate = () => {
    if (!level || !goal) return;
    const p = computeSupersetPlan(level, goal);
    setPlan(p);
    onPlanGenerated(p);
  };

  const goalLabel: Record<string, string> = {
    lose_weight: "Lose Weight",
    build_muscle: "Build Muscle",
    maintain_fitness: "Maintain Fitness",
  };

  const levelLabel: Record<string, string> = {
    beginner: "Beginner",
    intermediate: "Intermediate",
    advanced: "Advanced",
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      aria-label="Superset Workout Planner"
      className="w-full mt-10"
    >
      {/* Heading */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary font-semibold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full mb-3">
          <Dumbbell className="w-3.5 h-3.5" />
          Workout Planner
        </div>
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-foreground leading-tight">
          Superset Workout Planner
        </h2>
        <p className="text-muted-foreground text-sm mt-2 max-w-md mx-auto">
          Get a personalised superset plan designed for 30–60 minute sessions
          based on your fitness level.
        </p>
      </div>

      <Card className="shadow-md border-border/60">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2.5 font-display text-lg text-foreground">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
              <Dumbbell className="w-4 h-4 text-primary" />
            </span>
            Your Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Weight */}
          <div className="space-y-1.5">
            <Label
              htmlFor="ss-weight"
              className="text-sm font-medium text-foreground/80"
            >
              Current Weight (kg){" "}
              <span className="text-muted-foreground">(optional)</span>
            </Label>
            <Input
              id="ss-weight"
              data-ocid="superset.weight.input"
              type="number"
              placeholder="e.g. 70"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="h-11"
            />
          </div>

          {/* Fitness Goal */}
          <div className="space-y-1.5">
            <Label className="text-sm font-medium text-foreground/80">
              Fitness Goal
            </Label>
            <Select value={goal} onValueChange={setGoal}>
              <SelectTrigger data-ocid="superset.goal.select" className="h-11">
                <SelectValue placeholder="Select your goal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lose_weight">Lose Weight</SelectItem>
                <SelectItem value="build_muscle">Build Muscle</SelectItem>
                <SelectItem value="maintain_fitness">
                  Maintain Fitness
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Fitness Level */}
          <div className="space-y-1.5">
            <Label className="text-sm font-medium text-foreground/80">
              Fitness Level
            </Label>
            <Select value={level} onValueChange={setLevel}>
              <SelectTrigger data-ocid="superset.level.select" className="h-11">
                <SelectValue placeholder="Select your level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            data-ocid="superset.submit_button"
            className="w-full h-12 text-base font-bold tracking-wide"
            onClick={handleGenerate}
            disabled={!goal || !level}
          >
            <Dumbbell className="w-5 h-5 mr-2" />
            Generate My Superset Plan
          </Button>
        </CardContent>
      </Card>

      {/* Results */}
      <AnimatePresence>
        {plan && (
          <motion.div
            key="superset-plan"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 space-y-4"
          >
            {/* Total time highlight */}
            <div className="flex items-center justify-center gap-3 p-4 rounded-2xl bg-primary/10 border border-primary/20">
              <Timer className="w-6 h-6 text-primary" />
              <div className="text-center">
                <p className="text-xs font-semibold text-primary/70 uppercase tracking-widest">
                  Total Session
                </p>
                <p className="font-display font-extrabold text-3xl text-primary">
                  {plan.totalTime}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {levelLabel[plan.level]} · {goalLabel[plan.goal]}
                </p>
              </div>
            </div>

            {/* Tip */}
            <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-amber-50 border border-amber-200">
              <Activity className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-sm font-medium text-amber-800">{plan.tip}</p>
            </div>

            {/* Superset cards */}
            <div className="space-y-3">
              {plan.exercises.map((ex, idx) => (
                <motion.div
                  key={ex.number}
                  data-ocid="superset.plan.card"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: idx * 0.08 }}
                  className="p-4 rounded-xl bg-card border border-border/60 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                        Superset {ex.number}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 justify-end">
                      <Badge
                        variant="outline"
                        className="text-xs bg-card text-muted-foreground border-border"
                      >
                        {ex.sets} sets × {ex.reps}
                      </Badge>
                      <Badge
                        variant="outline"
                        className="text-xs bg-card text-muted-foreground border-border"
                      >
                        {ex.rest}
                      </Badge>
                      <Badge
                        variant="outline"
                        className="text-xs bg-primary/10 text-primary border-primary/20 font-semibold"
                      >
                        {ex.duration}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 text-center p-2.5 rounded-lg bg-primary/5 border border-primary/10">
                      <p className="font-bold text-foreground text-sm">
                        {ex.exerciseA}
                      </p>
                    </div>
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 shrink-0">
                      <span className="text-primary font-black text-base">
                        +
                      </span>
                    </div>
                    <div className="flex-1 text-center p-2.5 rounded-lg bg-primary/5 border border-primary/10">
                      <p className="font-bold text-foreground text-sm">
                        {ex.exerciseB}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
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
              Health & Nutrition Calculators
            </p>
            <p className="text-xs text-primary/80 mt-1 font-semibold italic">
              Eat all the snacks or look like a snack.
            </p>
          </div>
        </div>
      </header>

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
