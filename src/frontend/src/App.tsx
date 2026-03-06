import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Activity,
  Copy,
  Download,
  FileText,
  Loader2,
  MapPin,
  Phone,
  Ruler,
  Share2,
  ShieldCheck,
  User,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

// ── Translations ───────────────────────────────────────────────────────────────
type Lang = "en" | "hi";

const translations = {
  en: {
    // Header
    freeWellnessAssessment: "Wellness Assessment",
    // Welcome back banner
    welcomeBack: "Welcome back",
    lastReportReady: "Your last report is ready to re-download.",
    downloadAgainFree: "Download My Report Again",
    generateNewReport: "Generate a New Report",
    noPaymentNeeded: "No payment needed to re-download your last report.",
    paymentRequiredForNew: "Rs. 1 payment required to generate a new report.",
    reportSavedOn: "Report saved on",
    calcBasedOn: "Calculations based on guidelines by these organisations",
    // Tagline
    tagline: "💪 Eat all the snacks or look like a snack. 💪",
    // FOMO
    fomoHeading:
      "🔥 Enroll in Our Personal Coaching Program TODAY — Get 10% OFF!",
    fomoDownload: "⚡ Download your",
    fomoFreeNow: "report for Rs. 1 NOW!",
    fomoExpires: "Offer expires in:",
    fomoSpots: "Only a few spots left!",
    fomoCta: "Claim My 10% Discount Now",
    // Section heading
    sectionTitle: "Get Your Wellness Assessment Report — Just Rs. 1",
    sectionDesc:
      "Fill in your details once and instantly download your personalised wellness report — only Rs. 1.",
    // Trust badges
    trustPrivate: "100% Private & Secure",
    trustClients: "Trusted by 1000+ Clients",
    trustFree: "Just Rs. 1 — Worth Rs. 499",
    trustInstant: "Instant Download",
    // Card header
    cardTitle: "Your Wellness Assessment Report",
    cardSub: "Personalised · Science-backed · Rs. 1 only",
    cardPowered: "Powered by",
    // Step 1
    step1Label: "Personal Details",
    fieldName: "Full Name",
    fieldNamePlaceholder: "e.g. Priya Sharma",
    fieldAge: "Age (years)",
    fieldAgePlaceholder: "e.g. 30",
    fieldCity: "City",
    fieldCityPlaceholder: "e.g. Mumbai",
    fieldWhatsapp: "WhatsApp No.",
    fieldWhatsappPlaceholder: "e.g. +91 98765 43210",
    fieldOccupation: "Occupation",
    fieldOccupationPlaceholder: "e.g. Software Engineer, Teacher, Homemaker",
    // Step dividers
    step1to2: "Step 1 → Step 2",
    step2to3: "Step 2 → Step 3",
    // Step 2
    step2Label: "Body Metrics",
    fieldHeight: "Height",
    heightCm: "cm",
    heightFtIn: "ft / in",
    fieldFeet: "Feet",
    fieldInches: "Inches",
    heightCmPlaceholder: "e.g. 165",
    heightFtPlaceholder: "e.g. 5",
    heightInPlaceholder: "e.g. 6",
    fieldWeight: "Weight (kg)",
    fieldWeightPlaceholder: "e.g. 70",
    fieldGender: "Gender",
    genderSelect: "Select gender",
    genderMale: "Male",
    genderFemale: "Female",
    // Step 3
    step3Label: "Referral",
    step3Required: "(Required)",
    fieldInvitedBy: "Who Invited You?",
    fieldInvitedByPlaceholder:
      "e.g. Friend's name, Instagram, WhatsApp, Google…",
    referredByText: "Referred by",
    tipLabel: "Tip:",
    tipText:
      "If you got a referral link from a friend, their WhatsApp number is already filled in for you!",
    // Mandatory notice
    mandatoryNotice:
      "* All fields are mandatory. Filling in all details is required to generate your wellness report.",
    // CTA
    fillAllFields: "Fill in all fields above to generate your report.",
    generatingReport: "Opening Payment…",
    ctaButton: "Pay Rs. 1 & Download My Report",
    ctaDisclaimer: "Secure payment · Rs. 1 only · Instant personalised report",
    // Referral section
    refer2Friends: "Refer 2 Friends",
    sharingIsCaring: "💚 Sharing is Caring",
    referralShareDesc:
      "Share your personal link — when a friend opens it, their form shows your WhatsApp number as referrer automatically!",
    friend1: "Friend 1",
    friend2: "Friend 2",
    tag2Friends:
      "Tag 2 friends who deserve to know their wellness score today!",
    shareWhatsapp: "Share on WhatsApp",
    copyLink: "Copy My Referral Link",
    linkCopied: "✓ Link Copied!",
    hashtags: "#WellnessForAll · #SharingIsCaring",
    // 30-day guarantee
    surpriseOffer: "🎉 Surprise Offer",
    guarantee: "✅ 30 Days Money Back Guarantee",
    guaranteeDesc:
      "We are so confident in our coaching program that we offer a full 30-day money back guarantee. If you are not completely satisfied with your results within 30 days, we will refund your investment — no questions asked.",
    guaranteeCommit:
      "Your health transformation is our commitment. Zero risk. 100% results focused.",
    guaranteeCta: "Contact HN Coach — Start Today",
    // Join team
    exclusiveOpp: "Exclusive Opportunity",
    joinTeamTitle: "Join Our Team & Become a Certified Wellness Coach",
    joinTeamDesc:
      "We are looking for passionate, driven individuals who believe in the power of health and wellness. As an HN Coach partner, you will have the opportunity to transform lives, spread health awareness, and build a meaningful income — all on your own terms.",
    joinTeamEarn:
      "🌟 Start earning while doing what you love — helping people live healthier, happier lives.",
    joinTeamCta: 'Send "START" to Join Now',
    // Badge above form
    freeWellnessReport: "Wellness Report — Rs. 1",
    // Download again
    downloadAgain: "Download Report Again",
  },
  hi: {
    // Header
    freeWellnessAssessment: "स्वास्थ्य मूल्यांकन",
    // Welcome back banner
    welcomeBack: "वापस आए!",
    lastReportReady: "आपकी पिछली रिपोर्ट फिर से डाउनलोड करने के लिए तैयार है।",
    downloadAgainFree: "मेरी रिपोर्ट फिर से डाउनलोड करें",
    generateNewReport: "नई रिपोर्ट बनाएं",
    noPaymentNeeded: "पिछली रिपोर्ट दोबारा डाउनलोड करने के लिए भुगतान की जरूरत नहीं।",
    paymentRequiredForNew: "नई रिपोर्ट बनाने के लिए ₹1 भुगतान जरूरी है।",
    reportSavedOn: "रिपोर्ट सेव हुई",
    calcBasedOn: "इन संस्थाओं के दिशानिर्देशों पर आधारित गणना",
    // Tagline
    tagline: "💪 सभी खाना खाओ या खाने जैसे दिखो। 💪",
    // FOMO
    fomoHeading: "🔥 आज हमारे पर्सनल कोचिंग प्रोग्राम में जुड़ें — 10% छूट पाएं!",
    fomoDownload: "⚡ अपनी",
    fomoFreeNow: "रिपोर्ट अभी सिर्फ ₹1 में!",
    fomoExpires: "ऑफर समाप्त होगा:",
    fomoSpots: "सीमित सीटें बची हैं!",
    fomoCta: "अभी 10% छूट पाएं",
    // Section heading
    sectionTitle: "अपनी वेलनेस असेसमेंट रिपोर्ट पाएं — सिर्फ ₹1",
    sectionDesc:
      "अपनी जानकारी एक बार भरें और तुरंत अपनी व्यक्तिगत वेलनेस रिपोर्ट डाउनलोड करें — सिर्फ ₹1 में।",
    // Trust badges
    trustPrivate: "100% निजी और सुरक्षित",
    trustClients: "1000+ लोगों का भरोसा",
    trustFree: "सिर्फ ₹1 — कीमत ₹499",
    trustInstant: "तुरंत डाउनलोड",
    // Card header
    cardTitle: "आपकी वेलनेस असेसमेंट रिपोर्ट",
    cardSub: "व्यक्तिगत · विज्ञान आधारित · सिर्फ ₹1",
    cardPowered: "द्वारा संचालित",
    // Step 1
    step1Label: "व्यक्तिगत जानकारी",
    fieldName: "पूरा नाम",
    fieldNamePlaceholder: "जैसे: प्रिया शर्मा",
    fieldAge: "उम्र (साल)",
    fieldAgePlaceholder: "जैसे: 30",
    fieldCity: "शहर",
    fieldCityPlaceholder: "जैसे: मुंबई",
    fieldWhatsapp: "व्हाट्सएप नंबर",
    fieldWhatsappPlaceholder: "जैसे: +91 98765 43210",
    fieldOccupation: "पेशा",
    fieldOccupationPlaceholder: "जैसे: इंजीनियर, शिक्षक, गृहिणी",
    // Step dividers
    step1to2: "चरण 1 → चरण 2",
    step2to3: "चरण 2 → चरण 3",
    // Step 2
    step2Label: "शारीरिक माप",
    fieldHeight: "ऊंचाई",
    heightCm: "सेमी",
    heightFtIn: "फीट / इंच",
    fieldFeet: "फीट",
    fieldInches: "इंच",
    heightCmPlaceholder: "जैसे: 165",
    heightFtPlaceholder: "जैसे: 5",
    heightInPlaceholder: "जैसे: 6",
    fieldWeight: "वजन (किलो)",
    fieldWeightPlaceholder: "जैसे: 70",
    fieldGender: "लिंग",
    genderSelect: "लिंग चुनें",
    genderMale: "पुरुष",
    genderFemale: "महिला",
    // Step 3
    step3Label: "रेफरल",
    step3Required: "(जरूरी)",
    fieldInvitedBy: "आपको किसने बुलाया?",
    fieldInvitedByPlaceholder: "जैसे: दोस्त का नाम, इंस्टाग्राम, व्हाट्सएप, गूगल…",
    referredByText: "द्वारा रेफर किया गया",
    tipLabel: "सुझाव:",
    tipText:
      "अगर आपको किसी दोस्त का रेफरल लिंक मिला है, तो उनका नंबर पहले से भरा होगा!",
    // Mandatory notice
    mandatoryNotice:
      "* सभी जानकारी भरना जरूरी है। आपकी वेलनेस रिपोर्ट बनाने के लिए सभी विवरण आवश्यक हैं।",
    // CTA
    fillAllFields: "अपनी रिपोर्ट बनाने के लिए ऊपर सभी जानकारी भरें।",
    generatingReport: "भुगतान खुल रहा है…",
    ctaButton: "₹1 में भुगतान करें और रिपोर्ट डाउनलोड करें",
    ctaDisclaimer: "सुरक्षित भुगतान · सिर्फ ₹1 · तुरंत व्यक्तिगत रिपोर्ट",
    // Referral section
    refer2Friends: "2 दोस्तों को रेफर करें",
    sharingIsCaring: "💚 शेयरिंग ही केयरिंग है",
    referralShareDesc:
      "अपना लिंक शेयर करें — जब दोस्त खोलेगा तो उनके फॉर्म में आपका व्हाट्सएप नंबर अपने आप भर जाएगा!",
    friend1: "दोस्त 1",
    friend2: "दोस्त 2",
    tag2Friends: "उन 2 दोस्तों को टैग करें जो आज अपना वेलनेस स्कोर जानना चाहते हैं!",
    shareWhatsapp: "व्हाट्सएप पर शेयर करें",
    copyLink: "मेरा रेफरल लिंक कॉपी करें",
    linkCopied: "✓ लिंक कॉपी हो गया!",
    hashtags: "#सबकीसेहत · #शेयरिंगहीकेयरिंग",
    // 30-day guarantee
    surpriseOffer: "🎉 खास ऑफर",
    guarantee: "✅ 30 दिन मनी बैक गारंटी",
    guaranteeDesc:
      "हम अपने कोचिंग प्रोग्राम पर इतना भरोसा करते हैं कि 30 दिन की पूरी मनी बैक गारंटी देते हैं। अगर 30 दिन में आप संतुष्ट नहीं हैं, तो हम पूरा पैसा वापस कर देंगे — बिना किसी सवाल के।",
    guaranteeCommit:
      "आपका स्वास्थ्य बदलना हमारी जिम्मेदारी है। कोई जोखिम नहीं। 100% नतीजों पर ध्यान।",
    guaranteeCta: "HN Coach से संपर्क करें — आज शुरू करें",
    // Join team
    exclusiveOpp: "खास मौका",
    joinTeamTitle: "हमारी टीम से जुड़ें और वेलनेस कोच बनें",
    joinTeamDesc:
      "हम ऐसे लोगों की तलाश में हैं जो स्वास्थ्य और वेलनेस में विश्वास रखते हैं। HN Coach पार्टनर के रूप में आप लोगों की जिंदगी बदल सकते हैं, स्वास्थ्य के बारे में जागरूकता फैला सकते हैं और अच्छी कमाई कर सकते हैं।",
    joinTeamEarn:
      "🌟 जो काम आपको पसंद है वो करते हुए कमाई शुरू करें — लोगों को स्वस्थ और खुशहाल जीवन जीने में मदद करें।",
    joinTeamCta: '"START" भेजकर जुड़ें',
    // Badge above form
    freeWellnessReport: "वेलनेस रिपोर्ट — ₹1",
    // Download again
    downloadAgain: "रिपोर्ट फिर से डाउनलोड करें",
  },
} as const;

type Translations = (typeof translations)[Lang];

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
  occupation: string;
  // Body metrics
  height: string; // always stored in cm
  heightMode: "cm" | "ft"; // which input mode the user chose
  heightFt: string; // feet part when using ft/in mode
  heightIn: string; // inches part when using ft/in mode
  weight: string;
  gender: string;
  activityLevel: string;
  // Goals (multiple selection)
  goals: string[];
  // Referral
  invitedBy: string;
}

// ── Calculations ───────────────────────────────────────────────────────────────
const ACTIVITY_MULTIPLIERS: Record<string, number> = {
  sedentary: 1.2,
  lightly_active: 1.375,
  moderately_active: 1.55,
  very_active: 1.725,
  extra_active: 1.9,
};

const GOAL_LABELS: Record<string, string> = {
  weight_loss: "Weight Loss",
  fat_loss: "Fat Loss",
  belly_fat_loss: "Belly Fat Loss",
  muscle_gain: "Muscle Gain",
  weight_gain: "Weight Gain",
  weight_maintain: "Weight Maintain",
  energy_stamina: "Increase Energy & Stamina",
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

// ── Macronutrient Calculator ───────────────────────────────────────────────────
interface MacroNeeds {
  protein: number; // grams/day — 1.2g per kg of body weight
  fat: number; // grams/day — 25% of BMR calories / 9
  carbs: number; // grams/day — 40% of TDEE calories / 4
  fibre: number; // grams/day — ICMR: 0.5g/kg body weight, min 25g, max 40g
}

function computeMacros(
  _idealWeight: number,
  tdee: number,
  bodyWeight: number,
  bmr: number,
): MacroNeeds {
  const protein = Math.round(bodyWeight * 1.2); // 1.2g per kg of body weight
  const fat = Math.round((bmr * 0.25) / 9); // 25% of BMR calories from fat (Global Nutrition Philosophy)
  const carbs = Math.round((tdee * 0.4) / 4); // 40% of TDEE calories from carbs (Global Nutrition Philosophy)
  const fibre = Math.min(40, Math.max(25, Math.round(bodyWeight * 0.5))); // ICMR 0.5g/kg, 25–40g range
  return { protein, fat, carbs, fibre };
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

// ── Ideal Body Measurements Calculator ────────────────────────────────────────
interface IdealMeasurements {
  chest: { cm: number; inch: number };
  waist: { cm: number; inch: number };
  hips: { cm: number; inch: number };
}

function computeIdealMeasurements(
  heightCm: number,
  gender: string,
): IdealMeasurements {
  // Based on standard fitness / anthropometric guidelines
  // Male: chest ≈ height × 0.535, waist ≈ height × 0.447, hips ≈ height × 0.543
  // Female: chest ≈ height × 0.525, waist ≈ height × 0.415, hips ≈ height × 0.565
  let chestCm: number;
  let waistCm: number;
  let hipsCm: number;
  if (gender === "male") {
    chestCm = Math.round(heightCm * 0.535);
    waistCm = Math.round(heightCm * 0.447);
    hipsCm = Math.round(heightCm * 0.543);
  } else {
    chestCm = Math.round(heightCm * 0.525);
    waistCm = Math.round(heightCm * 0.415);
    hipsCm = Math.round(heightCm * 0.565);
  }
  const toInch = (cm: number) => Math.round((cm / 2.54) * 10) / 10;
  return {
    chest: { cm: chestCm, inch: toInch(chestCm) },
    waist: { cm: waistCm, inch: toInch(waistCm) },
    hips: { cm: hipsCm, inch: toInch(hipsCm) },
  };
}

// ── Foods to Avoid Helper ──────────────────────────────────────────────────────
interface FoodToAvoid {
  food: string;
  reason: string;
  icon: string;
}

function getFoodsToAvoid(goals: string[]): FoodToAvoid[] {
  const allFoods: FoodToAvoid[] = [
    {
      icon: "🍟",
      food: "Deep Fried Foods",
      reason:
        "High in trans fats, causes inflammation and promotes fat storage around the belly.",
    },
    {
      icon: "🥤",
      food: "Sugary Drinks & Sodas",
      reason:
        "Liquid calories spike insulin rapidly and promote fat gain without satiety.",
    },
    {
      icon: "🍰",
      food: "Refined Sugar & Sweets",
      reason:
        "Triggers fat storage hormones (insulin), leads to energy crashes and cravings.",
    },
    {
      icon: "🍞",
      food: "White Bread & Maida Products",
      reason:
        "Causes blood sugar spikes and drops, low nutritional value, promotes belly fat.",
    },
    {
      icon: "🧀",
      food: "Processed Cheese & Dairy",
      reason:
        "High in sodium and saturated fats, contributes to belly fat and water retention.",
    },
    {
      icon: "🍟",
      food: "Chips, Namkeen & Wafers",
      reason:
        "Empty calories loaded with addictive salt and hidden trans fats, zero nutrition.",
    },
    {
      icon: "🍺",
      food: "Alcohol",
      reason:
        "Stops fat burning completely, adds empty calories, disrupts sleep and recovery.",
    },
    {
      icon: "🌭",
      food: "Processed & Packaged Meats",
      reason:
        "Preservatives, sodium, and nitrates are harmful to metabolism and muscle synthesis.",
    },
    {
      icon: "🍦",
      food: "Ice Cream & Frozen Desserts",
      reason:
        "High sugar + fat combination triggers maximum fat storage response in the body.",
    },
    {
      icon: "☕",
      food: "Excess Caffeine & Energy Drinks",
      reason:
        "Disrupts cortisol balance, promotes belly fat accumulation when overconsumed.",
    },
    {
      icon: "🥐",
      food: "Packaged Biscuits & Cookies",
      reason:
        "Hidden trans fats, excess sugar, and refined flour with minimal nutritional value.",
    },
    {
      icon: "🍕",
      food: "Fast Food Burgers & Pizza",
      reason:
        "Extreme calorie density with low nutrients, loaded with sodium and saturated fat.",
    },
    {
      icon: "🫙",
      food: "Canned & Packaged Foods",
      reason:
        "High sodium, preservatives, and hidden sugars that spike insulin and cause bloating.",
    },
    {
      icon: "🍫",
      food: "Milk Chocolate & Candy",
      reason:
        "Pure sugar with minimal nutrients, causes rapid insulin spikes and fat storage.",
    },
  ];

  const hasWeightLoss = goals.some((g) =>
    ["weight_loss", "fat_loss", "belly_fat_loss"].includes(g),
  );
  const hasMuscleGain = goals.includes("muscle_gain");
  const hasWeightGain = goals.includes("weight_gain");
  const hasEnergy = goals.includes("energy_stamina");

  let selected: FoodToAvoid[];

  if (hasWeightLoss && hasMuscleGain) {
    // Fat loss + muscle gain: avoid sugar, fried, alcohol, processed
    selected = [
      allFoods[0], // Deep Fried
      allFoods[1], // Sugary Drinks
      allFoods[2], // Refined Sugar
      allFoods[6], // Alcohol
      allFoods[7], // Processed Meats
      allFoods[5], // Chips
      allFoods[3], // White Bread
      allFoods[10], // Packaged Biscuits
      allFoods[8], // Ice Cream
      allFoods[11], // Fast Food
    ];
  } else if (hasWeightLoss) {
    // Weight/fat loss focus
    selected = [
      allFoods[0], // Deep Fried
      allFoods[1], // Sugary Drinks
      allFoods[2], // Refined Sugar
      allFoods[3], // White Bread
      allFoods[4], // Processed Cheese
      allFoods[5], // Chips
      allFoods[8], // Ice Cream
      allFoods[9], // Excess Caffeine
      allFoods[11], // Fast Food
      allFoods[12], // Canned Foods
    ];
  } else if (hasMuscleGain) {
    // Muscle gain: avoid alcohol, sugar, processed meats, energy-draining foods
    selected = [
      allFoods[6], // Alcohol
      allFoods[7], // Processed Meats
      allFoods[2], // Refined Sugar
      allFoods[1], // Sugary Drinks
      allFoods[9], // Excess Caffeine
      allFoods[0], // Deep Fried
      allFoods[10], // Packaged Biscuits
      allFoods[3], // White Bread
      allFoods[12], // Canned Foods
      allFoods[13], // Milk Chocolate
    ];
  } else if (hasWeightGain) {
    // Weight gain: avoid appetite-suppressing, low-calorie fillers
    selected = [
      allFoods[6], // Alcohol (disrupts appetite)
      allFoods[9], // Excess Caffeine
      allFoods[1], // Diet/Sugary Drinks (no nutrition)
      allFoods[5], // Chips (low calorie quality)
      allFoods[12], // Canned Foods (low calorie density)
      allFoods[0], // Deep Fried (poor quality calories)
      allFoods[7], // Processed Meats
      allFoods[2], // Refined Sugar (energy crashes)
      allFoods[10], // Packaged Biscuits
      allFoods[13], // Milk Chocolate
    ];
  } else if (hasEnergy) {
    // Energy & stamina: avoid energy-draining, blood sugar spiking foods
    selected = [
      allFoods[1], // Sugary Drinks
      allFoods[2], // Refined Sugar
      allFoods[3], // White Bread
      allFoods[6], // Alcohol
      allFoods[9], // Excess Caffeine
      allFoods[0], // Deep Fried
      allFoods[5], // Chips
      allFoods[11], // Fast Food
      allFoods[10], // Packaged Biscuits
      allFoods[8], // Ice Cream
    ];
  } else {
    // Default: general top 10 unhealthy foods
    selected = [
      allFoods[0],
      allFoods[1],
      allFoods[2],
      allFoods[3],
      allFoods[5],
      allFoods[6],
      allFoods[7],
      allFoods[8],
      allFoods[11],
      allFoods[12],
    ];
  }

  return selected.slice(0, 10);
}

// ── Wellness Score Calculator ──────────────────────────────────────────────────
function computeWellnessScore(
  results: AssessmentResults,
  weight: number,
): { score: number; label: string; color: string; ringColor: string } {
  let score = 0;

  // BMI component (0-30 pts)
  if (results.bmi >= 18.5 && results.bmi < 25) score += 30;
  else if (results.bmi >= 17 && results.bmi < 27) score += 20;
  else if (results.bmi >= 15 && results.bmi < 30) score += 10;

  // Water intake proxy — normal BMI gets full water score
  if (results.bmi >= 18.5 && results.bmi < 25) score += 20;
  else if (results.bmi >= 17 && results.bmi < 27) score += 12;
  else score += 6;

  // BMR relative health (0-20 pts)
  const bmrPerKg = results.bmr / weight;
  if (bmrPerKg >= 22) score += 20;
  else if (bmrPerKg >= 18) score += 15;
  else score += 8;

  // Steps component (0-15 pts)
  const stepsNum = weight * 110;
  if (stepsNum >= 8000) score += 15;
  else if (stepsNum >= 5000) score += 10;
  else score += 5;

  // Exercise component (0-15 pts)
  score += 12;

  const label =
    score >= 80
      ? "Excellent"
      : score >= 60
        ? "Good"
        : score >= 40
          ? "Average"
          : "Needs Improvement";
  const color =
    score >= 80
      ? "#16a34a"
      : score >= 60
        ? "#0d9488"
        : score >= 40
          ? "#d97706"
          : "#dc2626";
  const ringColor =
    score >= 80
      ? "#22c55e"
      : score >= 60
        ? "#2dd4bf"
        : score >= 40
          ? "#fbbf24"
          : "#f87171";
  return { score, label, color, ringColor };
}

// ── PDF Generator (browser print) ─────────────────────────────────────────────
function generatePDF(
  name: string,
  age: string,
  city: string,
  whatsapp: string,
  occupation: string,
  height: string,
  weight: string,
  goals: string[],
  results: AssessmentResults,
  gender: string,
  invitedBy: string,
) {
  const macros = computeMacros(
    results.idealWeight,
    results.tdee,
    Number.parseFloat(weight),
    results.bmr,
  );
  const idealMeasurements = computeIdealMeasurements(
    Number.parseFloat(height),
    gender,
  );
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
      // Need to LOSE weight — 3, 4, 5 kg/month
      const months5 = Math.ceil(absWeightDiffNum / 5);
      const months4 = Math.ceil(absWeightDiffNum / 4);
      const months3 = Math.ceil(absWeightDiffNum / 3);
      timelineHtml = `
      <div class="section-title" style="color:#ea580c;border-bottom-color:#ea580c;">&#128197; Your Weight Loss Timeline</div>
      <div class="timeline-box loss">
        <div class="timeline-header">&#128170; To lose <strong>${absWeightDiff} kg</strong> and reach your ideal weight of <strong>${results.idealWeight.toFixed(1)} kg</strong>:</div>
        <div class="timeline-grid">
          <div class="timeline-col fast">
            <div class="tl-rate">Fast Track</div>
            <div class="tl-rate-sub">5 kg/month</div>
            <div class="tl-months">${months5} Month${months5 > 1 ? "s" : ""}</div>
          </div>
          <div class="timeline-vs">·</div>
          <div class="timeline-col mid">
            <div class="tl-rate">Moderate</div>
            <div class="tl-rate-sub">4 kg/month</div>
            <div class="tl-months">${months4} Month${months4 > 1 ? "s" : ""}</div>
          </div>
          <div class="timeline-vs">·</div>
          <div class="timeline-col slow">
            <div class="tl-rate">Steady Pace</div>
            <div class="tl-rate-sub">3 kg/month</div>
            <div class="tl-months">${months3} Month${months3 > 1 ? "s" : ""}</div>
          </div>
        </div>
        <div class="timeline-note">With consistent diet &amp; exercise, you can achieve your ideal weight in <strong>${months5}–${months3} months</strong>. Start today — every day counts!</div>
      </div>`;
    } else {
      // Need to GAIN weight — 2 to 3 kg/month
      const fastMonths = Math.ceil(absWeightDiffNum / 3);
      const midMonths = Math.ceil(absWeightDiffNum / 2.5);
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
          <div class="timeline-vs">·</div>
          <div class="timeline-col mid" style="background:#e0f2fe;border-color:#7dd3fc;">
            <div class="tl-rate" style="color:#1d4ed8;">Moderate</div>
            <div class="tl-rate-sub" style="color:#3b82f6;">2.5 kg/month</div>
            <div class="tl-months" style="color:#1e3a8a;">${midMonths} Month${midMonths > 1 ? "s" : ""}</div>
          </div>
          <div class="timeline-vs">·</div>
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

  // ── Macronutrient section HTML ──────────────────────────────────────────────
  const macroOrigin = window.location.origin;
  const macroNutrientsHtml = `
  <div class="section-title macro-header">&#127807; Your Daily Nutrition Requirements — ICMR Guidelines</div>
  <div class="macro-grid">
    <div class="macro-card protein-card">
      <div class="macro-icon-wrap protein-bg">
        <img src="${macroOrigin}/assets/generated/protein-muscles-transparent.dim_200x200.png" alt="Protein" class="macro-icon" />
      </div>
      <div class="macro-content">
        <div class="macro-badge protein-badge">PROTEIN</div>
        <div class="macro-value">${macros.protein}g<span class="macro-unit">/day</span></div>
        <div class="macro-formula">1.2g × ${weight} kg body weight</div>
        <div class="macro-desc">Builds &amp; repairs muscles, supports immunity and hormones.</div>
      </div>
    </div>
    <div class="macro-card fat-card">
      <div class="macro-icon-wrap fat-bg">
        <img src="${macroOrigin}/assets/generated/fat-icon-transparent.dim_200x200.png" alt="Healthy Fat" class="macro-icon" />
      </div>
      <div class="macro-content">
        <div class="macro-badge fat-badge">HEALTHY FAT</div>
        <div class="macro-value">${macros.fat}g<span class="macro-unit">/day</span></div>
        <div class="macro-formula">25% of BMR (${results.bmr.toLocaleString()} kcal)</div>
        <div class="macro-desc">Supports brain health, hormone production &amp; vitamin absorption.</div>
      </div>
    </div>
    <div class="macro-card carbs-card">
      <div class="macro-icon-wrap carbs-bg">
        <img src="${macroOrigin}/assets/generated/carbs-energy-transparent.dim_200x200.png" alt="Carbohydrates" class="macro-icon" />
      </div>
      <div class="macro-content">
        <div class="macro-badge carbs-badge">CARBOHYDRATES</div>
        <div class="macro-value">${macros.carbs}g<span class="macro-unit">/day</span></div>
        <div class="macro-formula">40% of TDEE (${results.tdee.toLocaleString()} kcal)</div>
        <div class="macro-desc">Primary energy source — fuel for brain, muscles &amp; daily activity.</div>
      </div>
    </div>
    <div class="macro-card fibre-card">
      <div class="macro-icon-wrap fibre-bg">
        <img src="${macroOrigin}/assets/generated/fibre-digestion-transparent.dim_200x200.png" alt="Dietary Fibre" class="macro-icon" />
      </div>
      <div class="macro-content">
        <div class="macro-badge fibre-badge">DIETARY FIBRE</div>
        <div class="macro-value">${macros.fibre}g<span class="macro-unit">/day</span></div>
        <div class="macro-formula">ICMR: 0.5g/kg body weight (25–40g range)</div>
        <div class="macro-desc">Aids digestion, controls blood sugar &amp; keeps you feeling full.</div>
      </div>
    </div>
  </div>
  <div class="macro-note">&#9432; These calculations are based on <strong>Global Nutrition Philosophy</strong> (Protein: 1.2g/kg body weight; Fat: 25% of BMR; Carbs: 40% of TDEE; Fibre: 0.5g/kg body weight per ICMR). For a personalised macro-based meal plan tailored to your body, contact HN Coach.</div>
  `;

  // Foods to Avoid HTML
  const foodsToAvoidList = getFoodsToAvoid(goals);
  const foodCardsHtml = foodsToAvoidList
    .map(
      (f) => `
    <div class="avoid-card">
      <div class="avoid-icon">${f.icon}</div>
      <div class="avoid-content">
        <div class="avoid-name">${f.food}</div>
        <div class="avoid-reason">${f.reason}</div>
      </div>
    </div>`,
    )
    .join("");

  const foodsToAvoidHtml = `
  <div class="section-title avoid-header">&#9888; Foods to Avoid to Achieve Your Goals</div>
  <div class="avoid-grid">
    ${foodCardsHtml}
  </div>
  <div class="avoid-note">&#128161; Avoiding these foods combined with your personalised nutrition plan above will accelerate your goal achievement. Contact HN Coach for a custom meal plan tailored to your specific goals and body type.</div>
  `;

  // Ideal Body Measurements HTML
  const bodyImgUrl =
    gender === "male"
      ? `${window.location.origin}/assets/generated/male-body-measurements-transparent.dim_300x500.png`
      : `${window.location.origin}/assets/generated/female-body-measurements-transparent.dim_300x500.png`;

  const chestLabel = gender === "female" ? "Breast / Chest" : "Chest";
  const idealBodyMeasurementsHtml = `
  <div class="section-title body-measure-section" style="color:#1d4ed8;border-bottom-color:#1d4ed8;">&#128101; Ideal Body Measurements — Based on Your Height</div>
  <div class="body-measure-wrap">
    <div class="body-img-col">
      <img src="${bodyImgUrl}" alt="${gender} body" class="body-img" />
      <div class="body-gender-badge ${gender}">${gender === "male" ? "&#9794; Male" : "&#9792; Female"}</div>
    </div>
    <div class="body-measure-cards">
      <div class="measure-card chest">
        <div class="measure-icon chest">&#128084;</div>
        <div style="flex:1;">
          <div class="measure-label chest">${chestLabel}</div>
          <div class="measure-values">
            <span class="measure-val-primary">${idealMeasurements.chest.inch}"</span><span class="measure-val-unit">inches</span>
            <span class="measure-val-sep">|</span>
            <span class="measure-val-secondary">${idealMeasurements.chest.cm} cm</span>
          </div>
          <div class="measure-note-inline">Ideal chest circumference for your height</div>
        </div>
      </div>
      <div class="measure-card waist">
        <div class="measure-icon waist">&#128091;</div>
        <div style="flex:1;">
          <div class="measure-label waist">Waist</div>
          <div class="measure-values">
            <span class="measure-val-primary">${idealMeasurements.waist.inch}"</span><span class="measure-val-unit">inches</span>
            <span class="measure-val-sep">|</span>
            <span class="measure-val-secondary">${idealMeasurements.waist.cm} cm</span>
          </div>
          <div class="measure-note-inline">Ideal waist circumference for your height</div>
        </div>
      </div>
      <div class="measure-card hips">
        <div class="measure-icon hips">&#128100;</div>
        <div style="flex:1;">
          <div class="measure-label hips">Hips</div>
          <div class="measure-values">
            <span class="measure-val-primary">${idealMeasurements.hips.inch}"</span><span class="measure-val-unit">inches</span>
            <span class="measure-val-sep">|</span>
            <span class="measure-val-secondary">${idealMeasurements.hips.cm} cm</span>
          </div>
          <div class="measure-note-inline">Ideal hip circumference for your height</div>
        </div>
      </div>
    </div>
  </div>
  <div class="body-measure-disclaimer">&#9432; Ideal measurements are calculated based on standard anthropometric proportionality guidelines. Individual variation is natural — these are reference ranges. Consult HN Coach for personalised body composition guidance.</div>
  `;

  const weightDiffLabel =
    Math.abs(weightDiff) <= 1
      ? "At Ideal Weight ✅"
      : weightDiff > 0
        ? `Need to LOSE ${absWeightDiff} kg`
        : `Need to GAIN ${absWeightDiff} kg`;

  const goalsLabel =
    goals.map((g) => GOAL_LABELS[g] || g).join(", ") || "Not specified";

  const referredByLine = invitedBy ? `\n• Referred By: ${invitedBy}` : "";
  const waMsg = encodeURIComponent(
    `Hi HN Coach! 👋 I just downloaded my *Wellness Assessment Report*. Here are my results:\n\n*👤 Personal Details*\n• Name: ${name}\n• Age: ${age} yrs | City: ${city}\n• Occupation: ${occupation}\n• Height: ${height} cm | Weight: ${weight} kg\n• Goal(s): ${goalsLabel}${referredByLine}\n\n*📊 My Wellness Report*\n• Ideal Weight: ${results.idealWeight.toFixed(1)} kg\n• BMI: ${results.bmi.toFixed(1)} (${results.bmiCategory})\n• BMR: ${results.bmr.toLocaleString()} kcal/day\n• TDEE: ${results.tdee.toLocaleString()} kcal/day\n• Daily Water: ${results.waterIntake.toFixed(1)} L/day\n• Daily Steps: ${results.footsteps}\n• Exercise: ${results.exerciseMinutes}\n• Weight Goal: ${weightDiffLabel}\n\nI'd love a consultation. Can you please help me? 🙏`,
  );

  // If invitedBy looks like a phone number (7+ digits), use it as the target; otherwise fallback to coach
  const isPhoneNumber = /^\+?[\d\s\-]{7,}$/.test(invitedBy.trim());
  const targetNumber = isPhoneNumber
    ? invitedBy.trim().replace(/[\s\-+]/g, "")
    : "919155348866";
  const waUrl = `https://wa.me/${targetNumber}?text=${waMsg}`;

  // Referral link uses the person's own WhatsApp number as the ref param
  const referralPageUrl = `${window.location.origin}${window.location.pathname}?ref=${encodeURIComponent(whatsapp || name)}`;
  const referralSection = `
  <div class="referral-section">
    <div style="text-align:center;">
      <div class="referral-badge">
        <svg viewBox="0 0 24 24" fill="white" style="width:12px;height:12px;flex-shrink:0;"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/></svg>
        REFER 2 FRIENDS
      </div>
    </div>
    <div class="referral-title">💚 Sharing is Caring</div>
    <div class="referral-subtitle">Refer 2 friends and help them get their <strong>Wellness Assessment Report</strong></div>
    <div class="referral-desc">Share your personal link below — when your friend opens it, the <strong style="color:#fff;">'Who Invited You?'</strong> field auto-fills with your name!</div>
    <div class="referral-buttons">
      <a href="https://wa.me/?text=${encodeURIComponent(`Hi! I just downloaded my Wellness Assessment Report from HN Coach — only Rs. 1! Get yours here: ${referralPageUrl}\n\n📌 Referred By: ${whatsapp || name}`)}" class="ref-btn-wa">
        <svg viewBox="0 0 24 24" fill="white" style="width:14px;height:14px;flex-shrink:0;"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        Share on WhatsApp
      </a>
      <button type="button" onclick="var el=document.getElementById('ref-copy-input');el.select();document.execCommand('copy');this.textContent='✓ Link Copied!';this.style.background='rgba(255,255,255,0.25)';" class="ref-btn-copy" style="cursor:pointer;border:none;">
        <svg viewBox="0 0 24 24" fill="white" style="width:14px;height:14px;flex-shrink:0;"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>
        Copy My Referral Link
      </button>
    </div>
    <input id="ref-copy-input" type="text" readonly value="${referralPageUrl}" style="opacity:0;position:absolute;left:-9999px;width:1px;height:1px;" />
    <a href="${referralPageUrl}" class="ref-link-box" style="display:block;text-decoration:none;" target="_blank">${referralPageUrl}</a>
    <div class="ref-hashtag">@HN_Coach &nbsp;·&nbsp; #WellnessForAll &nbsp;·&nbsp; #SharingIsCaring</div>
  </div>`;

  const wellnessScore = computeWellnessScore(
    results,
    Number.parseFloat(weight),
  );

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<title>HN Coach – Wellness Report – ${name}</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Segoe UI', Arial, Helvetica, sans-serif; font-size: 11pt; color: #1f2937; background: #fff; }
  .page { max-width: 760px; margin: 0 auto; padding: 0 0 32px; }

  /* ── PREMIUM HEADER ─────────────────────────────────────── */
  .header-main {
    background: linear-gradient(135deg, #064e3b 0%, #0d9488 45%, #059669 75%, #047857 100%);
    color: #fff;
    padding: 14px 20px;
    display: flex;
    align-items: center;
    gap: 14px;
  }
  .header-logo-ring {
    flex-shrink: 0;
    width: 62px;
    height: 62px;
    border-radius: 50%;
    padding: 2px;
    background: linear-gradient(135deg, rgba(255,255,255,0.8), rgba(255,255,255,0.25));
    box-shadow: 0 3px 14px rgba(0,0,0,0.3);
  }
  .header-logo {
    width: 58px;
    height: 58px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid rgba(255,255,255,0.4);
    display: block;
  }
  .header-logo-fallback {
    width: 58px;
    height: 58px;
    border-radius: 50%;
    border: 2px solid rgba(255,255,255,0.4);
    background: rgba(255,255,255,0.18);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18pt;
    font-weight: 900;
    color: #fff;
  }
  .header-brand { flex: 1; min-width: 0; }
  .header-brand h1 { font-size: 20pt; font-weight: 900; letter-spacing: -0.3px; text-shadow: 0 2px 8px rgba(0,0,0,0.25); line-height: 1.1; }
  .header-brand-sub { font-size: 9pt; font-weight: 700; opacity: 0.9; margin-top: 2px; letter-spacing: 0.3px; }
  .header-brand-date { font-size: 7pt; opacity: 0.65; margin-top: 3px; font-family: 'Courier New', monospace; letter-spacing: 0.5px; }
  .header-orgs { display: flex; flex-direction: row; align-items: center; gap: 6px; flex-shrink: 0; border-left: 1px solid rgba(255,255,255,0.2); padding-left: 14px; }
  .header-orgs-inner { display: flex; flex-direction: column; align-items: flex-end; gap: 4px; }
  .org-logos-row { display: flex; align-items: center; gap: 5px; }
  .org-badge-img { width: 24px; height: 24px; border-radius: 4px; background: #fff; object-fit: contain; flex-shrink: 0; padding: 1px; }
  .org-badge-label { display: none; }
  .org-note { font-size: 6.5pt; color: rgba(255,255,255,0.7); text-align: right; margin-top: 3px; font-style: italic; max-width: 140px; line-height: 1.3; }

  /* Gold accent line under header */
  .header-gold-line { height: 3px; background: linear-gradient(90deg, #f59e0b, #fde68a, #f59e0b); }

  /* Report ID band */
  .header-band {
    background: #064e3b;
    padding: 6px 26px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .header-band-label { font-size: 7pt; color: rgba(255,255,255,0.6); font-family: 'Courier New', monospace; letter-spacing: 1px; text-transform: uppercase; }
  .header-band-id { font-size: 7pt; color: rgba(255,255,255,0.75); font-family: 'Courier New', monospace; letter-spacing: 0.5px; }

  /* ── TAGLINE ────────────────────────────────────────────── */
  .tagline-center {
    background: linear-gradient(135deg, #065f46 0%, #047857 50%, #059669 100%);
    color: #fff;
    text-align: center;
    font-size: 16pt;
    font-weight: 900;
    font-style: italic;
    padding: 14px 26px;
    letter-spacing: 0.8px;
    text-shadow: 0 2px 10px rgba(0,0,0,0.4), 0 0 24px rgba(167,243,208,0.25);
    border-top: 2.5px solid rgba(167,243,208,0.35);
    border-bottom: 2.5px solid rgba(167,243,208,0.35);
  }

  /* ── CERTIFICATE BANNER ─────────────────────────────────── */
  .cert-banner {
    margin: 20px 24px;
    border-radius: 10px;
    background: linear-gradient(135deg, #064e3b 0%, #065f46 60%, #047857 100%);
    border: 2px solid #d97706;
    padding: 16px 22px;
    text-align: center;
    box-shadow: 0 4px 20px rgba(6,78,59,0.3), inset 0 1px 0 rgba(255,255,255,0.08);
    position: relative;
    overflow: hidden;
  }
  .cert-banner::before {
    content: '';
    position: absolute;
    inset: 4px;
    border: 1px solid rgba(217,119,6,0.4);
    border-radius: 7px;
    pointer-events: none;
  }
  .cert-prepared { font-size: 9.5pt; font-style: italic; color: rgba(255,255,255,0.75); letter-spacing: 1px; text-transform: uppercase; margin-bottom: 4px; }
  .cert-name { font-size: 22pt; font-weight: 900; color: #fff; text-shadow: 0 2px 12px rgba(0,0,0,0.4); margin-bottom: 2px; letter-spacing: -0.3px; }
  .cert-sub { font-size: 8.5pt; color: rgba(255,255,255,0.65); }

  /* ── PERSONAL DETAILS ───────────────────────────────────── */
  .personal-section { margin: 0 24px 20px; position: relative; overflow: hidden; }
  .personal-watermark {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%) rotate(-30deg);
    font-size: 48pt;
    font-weight: 900;
    color: rgba(13,148,136,0.05);
    white-space: nowrap;
    pointer-events: none;
    user-select: none;
    letter-spacing: 4px;
  }
  .personal-inner { background: #f8fffe; border: 1px solid #a7f3d0; border-radius: 10px; padding: 14px 18px; border-left: 4px solid #0d9488; position: relative; }
  .personal h2 { color: #065f46; font-size: 9pt; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 1px; font-weight: 800; display: flex; align-items: center; gap: 6px; }
  .personal h2::before { content: ''; display: inline-block; width: 18px; height: 3px; background: linear-gradient(90deg, #0d9488, #059669); border-radius: 2px; }
  .personal-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 5px 24px; }
  .personal-row { display: flex; gap: 6px; font-size: 9.5pt; padding: 3.5px 0; border-bottom: 0.5px solid rgba(167,243,208,0.4); }
  .personal-row:last-child { border-bottom: none; }
  .personal-chip { font-size: 7pt; font-weight: 700; color: #0d9488; background: rgba(13,148,136,0.1); padding: 1px 6px; border-radius: 10px; min-width: 80px; align-self: center; text-align: center; text-transform: uppercase; letter-spacing: 0.3px; }
  .personal-val { font-size: 9.5pt; color: #1f2937; font-weight: 600; }

  /* ── SECTION TITLES ─────────────────────────────────────── */
  .section-wrap { margin: 0 24px; }
  .section-title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 11pt;
    font-weight: 800;
    color: #065f46;
    margin: 22px 0 8px;
    padding-bottom: 6px;
    border-bottom: 2px solid #a7f3d0;
  }
  .section-title::before {
    content: '';
    display: inline-block;
    width: 5px;
    height: 18px;
    background: linear-gradient(to bottom, #0d9488, #059669);
    border-radius: 3px;
    flex-shrink: 0;
  }

  /* ── METRIC CARDS (2-col grid) ──────────────────────────── */
  .metric-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 8px; }
  .metric-card {
    display: flex;
    align-items: stretch;
    border-radius: 10px;
    border: 1px solid #d1fae5;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(13,148,136,0.07);
  }
  .metric-card-accent { width: 4px; flex-shrink: 0; }
  .metric-card-accent.teal { background: linear-gradient(to bottom, #0d9488, #059669); }
  .metric-card-accent.emerald { background: linear-gradient(to bottom, #059669, #16a34a); }
  .metric-card-accent.cyan { background: linear-gradient(to bottom, #0891b2, #0d9488); }
  .metric-card-accent.blue { background: linear-gradient(to bottom, #2563eb, #0891b2); }
  .metric-card-accent.indigo { background: linear-gradient(to bottom, #4f46e5, #2563eb); }
  .metric-card-accent.violet { background: linear-gradient(to bottom, #7c3aed, #4f46e5); }
  .metric-card-accent.amber { background: linear-gradient(to bottom, #d97706, #f59e0b); }
  .metric-card-body { flex: 1; padding: 10px 12px; background: #f8fffe; }
  .metric-card:nth-child(even) .metric-card-body { background: #ffffff; }
  .metric-label { font-weight: 700; font-size: 8.5pt; color: #374151; line-height: 1.3; }
  .metric-note { font-size: 7pt; color: #9ca3af; font-style: italic; margin-top: 2px; }
  .metric-value { font-weight: 900; font-size: 13pt; color: #0d9488; margin-top: 5px; }

  /* ── BANNERS ────────────────────────────────────────────── */
  .banner { border-radius: 10px; padding: 12px 16px; margin: 10px 0; font-size: 11pt; font-weight: 600; box-shadow: 0 2px 8px rgba(0,0,0,0.05); }
  .banner.green { background: linear-gradient(135deg, #dcfce7, #bbf7d0); color: #14532d; border: 1.5px solid #86efac; }
  .banner.orange { background: linear-gradient(135deg, #fff7ed, #fde68a); color: #7c2d12; border: 1.5px solid #fdba74; }
  .banner.blue { background: linear-gradient(135deg, #eff6ff, #dbeafe); color: #1e3a8a; border: 1.5px solid #93c5fd; }
  .motivation-msg { background: linear-gradient(135deg, #fef3c7, #fde68a); color: #78350f; border: 2px solid #f59e0b; border-radius: 10px; padding: 12px 16px; margin: 8px 0; font-size: 10pt; font-weight: 700; line-height: 1.5; box-shadow: 0 2px 12px rgba(245,158,11,0.2); }
  .diet-box { background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 14px 18px; margin-bottom: 6px; }
  .diet-box h3 { color: #065f46; font-size: 10.5pt; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px; }
  .diet-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4px 20px; }
  .diet-row { display: flex; gap: 6px; font-size: 9.5pt; padding: 3px 0; }
  .diet-row span:first-child { font-weight: 700; color: #374151; min-width: 130px; }
  .footer {
    background: linear-gradient(135deg, #064e3b 0%, #0d9488 60%, #059669 100%);
    color: #fff;
    text-align: center;
    padding: 0 26px 20px;
    margin-top: 24px;
    position: relative;
  }
  .footer-gold-line { height: 3px; background: linear-gradient(90deg, #f59e0b, #fde68a, #f59e0b); margin-bottom: 20px; }
  .footer-heading { font-size: 15pt; font-weight: 900; color: #fff; margin-bottom: 6px; text-shadow: 0 2px 8px rgba(0,0,0,0.3); }
  .footer-sub { font-size: 9.5pt; color: rgba(255,255,255,0.8); margin-bottom: 16px; font-weight: 600; }
  .footer-wa-btn {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: linear-gradient(135deg, #128C7E 0%, #25D366 100%);
    color: #fff;
    padding: 14px 32px;
    border-radius: 30px;
    text-decoration: none;
    font-size: 13.5pt;
    font-weight: 900;
    box-shadow: 0 4px 24px rgba(37,211,102,0.6), 0 0 0 4px rgba(37,211,102,0.15);
    letter-spacing: 0.1px;
    border: 2px solid rgba(255,255,255,0.22);
    margin-bottom: 14px;
  }
  .footer-cta-text { font-size: 12pt; font-weight: 900; color: #d1fae5; letter-spacing: 0.5px; margin-bottom: 14px; }
  .footer-brand { font-size: 8pt; opacity: 0.7; margin-top: 8px; }
  .risk-header { color: #dc2626 !important; }
  .risk-header::before { background: linear-gradient(to bottom, #dc2626, #b91c1c) !important; }
  .risk-healthy { background: linear-gradient(135deg, #f0fdf4, #dcfce7); border: 1.5px solid #86efac; border-radius: 10px; padding: 12px 16px; font-size: 10pt; color: #14532d; margin-bottom: 8px; border-left: 4px solid #16a34a; }
  .risk-warning { background: linear-gradient(135deg, #fffbeb, #fef3c7); border: 1.5px solid #fcd34d; border-radius: 8px; padding: 8px 12px; font-size: 9pt; color: #92400e; margin-bottom: 8px; font-weight: 600; border-left: 4px solid #f59e0b; }
  .risk-table { width: 100%; border-collapse: collapse; margin-bottom: 6px; font-size: 9pt; border-radius: 8px; overflow: hidden; }
  .risk-table thead tr { background: linear-gradient(90deg, #fff1f2, #ffe4e6); }
  .risk-table th { text-align: left; padding: 8px 10px; font-size: 8.5pt; color: #991b1b; font-weight: 800; border-bottom: 2px solid #fecaca; }
  .risk-table td { padding: 7px 10px; border-bottom: 1px solid #fee2e2; vertical-align: top; }
  .risk-disease { font-weight: 700; color: #1f2937; }
  .risk-desc { color: #4b5563; font-style: italic; }
  .risk-badge { display: inline-block; padding: 2px 8px; border-radius: 20px; font-size: 7.5pt; font-weight: 700; white-space: nowrap; }
  .risk-disclaimer { font-size: 7.5pt; color: #6b7280; font-style: italic; text-align: center; margin-top: 6px; }
  .timeline-box { border-radius: 10px; padding: 14px 16px; margin: 8px 0 6px; box-shadow: 0 2px 10px rgba(0,0,0,0.06); }
  .timeline-box.loss { background: linear-gradient(135deg, #fff7ed, #fde68a22); border: 1.5px solid #fdba74; }
  .timeline-box.gain { background: linear-gradient(135deg, #eff6ff, #dbeafe22); border: 1.5px solid #93c5fd; }
  .timeline-header { font-size: 10.5pt; font-weight: 700; color: #1f2937; margin-bottom: 12px; }
  .timeline-grid { display: flex; align-items: center; gap: 8px; margin-bottom: 12px; }
  .timeline-col { flex: 1; text-align: center; background: linear-gradient(135deg, #fff3e0, #fef3c7); border: 1.5px solid #ffcc80; border-radius: 10px; padding: 12px 6px; box-shadow: 0 2px 8px rgba(0,0,0,0.04); }
  .timeline-col.mid { background: linear-gradient(135deg, #fef3c7, #fde68a); border-color: #fde68a; }
  .timeline-col.slow { background: linear-gradient(135deg, #fef9c3, #fef3c7); border-color: #fcd34d; }
  .timeline-vs { font-size: 11pt; font-weight: 800; color: #d1d5db; flex-shrink: 0; }
  .tl-rate { font-size: 9pt; font-weight: 800; color: #c2410c; text-transform: uppercase; letter-spacing: 0.3px; }
  .tl-rate-sub { font-size: 8pt; color: #ea580c; margin: 2px 0 6px; }
  .tl-months { font-size: 20pt; font-weight: 900; color: #9a3412; line-height: 1; }
  .timeline-note { font-size: 9pt; color: #7c2d12; background: #fff3e0; border: 1px solid #fdba74; border-radius: 8px; padding: 8px 12px; font-weight: 600; line-height: 1.5; }
  .referral-section { background: linear-gradient(135deg, #064e3b 0%, #065f46 50%, #0f766e 100%); border-radius: 12px; padding: 20px 24px; margin: 20px 0 16px; box-shadow: 0 4px 20px rgba(6,78,59,0.3); }
  .referral-badge { display: inline-flex; align-items: center; gap: 6px; background: rgba(255,255,255,0.12); border: 1.5px solid rgba(255,255,255,0.3); border-radius: 20px; padding: 5px 14px; font-size: 8pt; font-weight: 800; color: #fff; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 10px; }
  .referral-title { font-size: 18pt; font-weight: 900; color: #fff; text-align: center; margin-bottom: 6px; }
  .referral-subtitle { font-size: 10pt; font-weight: 700; color: rgba(255,255,255,0.95); text-align: center; margin-bottom: 4px; }
  .referral-subtitle strong { color: #fff; }
  .referral-desc { font-size: 9pt; color: rgba(255,255,255,0.8); text-align: center; margin-bottom: 14px; }
  .referral-buttons { display: flex; gap: 10px; justify-content: center; margin-bottom: 12px; }
  .ref-btn-wa { display: inline-flex; align-items: center; gap: 7px; background: #25D366; color: #fff; padding: 9px 22px; border-radius: 24px; font-size: 10pt; font-weight: 800; text-decoration: none; }
  .ref-btn-copy { display: inline-flex; align-items: center; gap: 7px; background: rgba(255,255,255,0.15); color: #fff; padding: 9px 22px; border-radius: 24px; font-size: 10pt; font-weight: 800; border: 1.5px solid rgba(255,255,255,0.4); }
  .ref-link-box { background: rgba(0,0,0,0.25); border: 1.5px solid rgba(255,255,255,0.2); border-radius: 8px; padding: 8px 14px; font-size: 8.5pt; color: rgba(255,255,255,0.85); font-weight: 600; text-align: center; margin: 0 auto 10px; max-width: 420px; word-break: break-all; }
  .ref-hashtag { font-size: 8pt; color: rgba(255,255,255,0.6); text-align: center; font-style: italic; }
  .macro-header { color: #5b21b6 !important; }
  .macro-header::before { background: linear-gradient(to bottom, #7c3aed, #5b21b6) !important; }
  .macro-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 8px; }
  .macro-card { display: flex; align-items: flex-start; gap: 10px; border-radius: 10px; padding: 12px 14px; border: 1.5px solid; box-shadow: 0 2px 10px rgba(0,0,0,0.05); }
  .protein-card { background: linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%); border-color: #c4b5fd; }
  .fat-card { background: linear-gradient(135deg, #fff7ed 0%, #fef3c7 100%); border-color: #fcd34d; }
  .carbs-card { background: linear-gradient(135deg, #fffbeb 0%, #fef9c3 100%); border-color: #fde68a; }
  .fibre-card { background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border-color: #86efac; }
  .macro-icon-wrap { width: 48px; height: 48px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .protein-bg { background: rgba(124,58,237,0.13); }
  .fat-bg { background: rgba(245,150,0,0.13); }
  .carbs-bg { background: rgba(245,158,11,0.13); }
  .fibre-bg { background: rgba(22,163,74,0.13); }
  .macro-icon { width: 40px; height: 40px; object-fit: contain; border-radius: 6px; }
  .macro-content { flex: 1; }
  .macro-badge { display: inline-block; font-size: 7pt; font-weight: 800; letter-spacing: 0.8px; border-radius: 12px; padding: 2px 8px; margin-bottom: 4px; text-transform: uppercase; }
  .protein-badge { background: #7c3aed; color: #fff; }
  .fat-badge { background: #ea580c; color: #fff; }
  .carbs-badge { background: #d97706; color: #fff; }
  .fibre-badge { background: #16a34a; color: #fff; }
  .macro-value { font-size: 20pt; font-weight: 900; line-height: 1; color: #1f2937; }
  .macro-unit { font-size: 9pt; font-weight: 600; color: #6b7280; margin-left: 2px; }
  .macro-formula { font-size: 7.5pt; color: #6b7280; font-style: italic; margin: 3px 0 4px; line-height: 1.3; }
  .macro-desc { font-size: 8pt; color: #374151; line-height: 1.4; }
  .macro-note { background: #f5f3ff; border: 1px solid #c4b5fd; border-left: 4px solid #7c3aed; border-radius: 8px; padding: 8px 12px; font-size: 8pt; color: #5b21b6; font-style: italic; margin-top: 4px; line-height: 1.5; }
  .macro-coach-cta { background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border: 2px solid #86efac; border-left: 4px solid #059669; border-radius: 10px; padding: 14px 18px; margin-top: 10px; text-align: center; }
  .macro-coach-title { font-size: 11pt; font-weight: 800; color: #065f46; margin-bottom: 6px; }
  .macro-coach-desc { font-size: 8.5pt; color: #374151; line-height: 1.5; margin-bottom: 10px; }
  .macro-coach-btn { display: inline-block; background: linear-gradient(135deg, #0d9488 0%, #059669 100%); color: #fff; padding: 9px 22px; border-radius: 24px; font-size: 9.5pt; font-weight: 800; text-decoration: none; box-shadow: 0 3px 14px rgba(13,148,136,0.4); }
  .guarantee-box { background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%); border: 3px solid #f59e0b; border-radius: 14px; padding: 18px 22px; margin-top: 14px; text-align: center; position: relative; box-shadow: 0 4px 20px rgba(245,158,11,0.2); }
  .guarantee-badge { display: inline-block; background: linear-gradient(135deg, #f59e0b 0%, #ef4444 100%); color: #fff; padding: 4px 16px; border-radius: 20px; font-size: 8pt; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 8px; }
  .guarantee-title { font-size: 16pt; font-weight: 900; color: #78350f; margin-bottom: 8px; }
  .guarantee-desc { font-size: 9.5pt; color: #92400e; line-height: 1.6; max-width: 520px; margin: 0 auto; }
  /* Ideal Body Measurements */
  .body-measure-section { margin: 20px 0 6px; }
  .body-measure-wrap { display: flex; gap: 20px; align-items: flex-start; }
  .body-img-col { flex-shrink: 0; display: flex; flex-direction: column; align-items: center; gap: 6px; }
  .body-img { width: 130px; border-radius: 12px; object-fit: contain; }
  .body-gender-badge { font-size: 8pt; font-weight: 800; letter-spacing: 0.5px; text-transform: uppercase; padding: 3px 12px; border-radius: 20px; }
  .body-gender-badge.male { background: #0d9488; color: #fff; }
  .body-gender-badge.female { background: #ec4899; color: #fff; }
  .body-measure-cards { flex: 1; display: flex; flex-direction: column; gap: 10px; }
  .measure-card { display: flex; align-items: center; gap: 12px; padding: 12px 14px; border-radius: 10px; border: 2px solid; box-shadow: 0 2px 8px rgba(0,0,0,0.04); }
  .measure-card.chest { background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-color: #93c5fd; }
  .measure-card.waist { background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border-color: #86efac; }
  .measure-card.hips { background: linear-gradient(135deg, #fdf4ff 0%, #f3e8ff 100%); border-color: #d8b4fe; }
  .measure-icon { width: 36px; height: 36px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 18pt; flex-shrink: 0; }
  .measure-icon.chest { background: #bfdbfe; }
  .measure-icon.waist { background: #bbf7d0; }
  .measure-icon.hips { background: #e9d5ff; }
  .measure-label { font-size: 8pt; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 2px; }
  .measure-label.chest { color: #1d4ed8; }
  .measure-label.waist { color: #15803d; }
  .measure-label.hips { color: #7c3aed; }
  .measure-values { display: flex; gap: 10px; align-items: baseline; }
  .measure-val-primary { font-size: 15pt; font-weight: 900; color: #1f2937; line-height: 1; }
  .measure-val-unit { font-size: 8pt; font-weight: 600; color: #6b7280; }
  .measure-val-sep { font-size: 9pt; color: #d1d5db; }
  .measure-val-secondary { font-size: 11pt; font-weight: 700; color: #374151; }
  .measure-note-inline { font-size: 7.5pt; color: #9ca3af; font-style: italic; margin-top: 2px; }
  .body-measure-disclaimer { font-size: 7.5pt; color: #6b7280; font-style: italic; text-align: center; margin-top: 8px; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 6px; padding: 6px 10px; }
  .avoid-header { color: #dc2626 !important; }
  .avoid-header::before { background: linear-gradient(to bottom, #dc2626, #b91c1c) !important; }
  .avoid-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 8px; }
  .avoid-card { display: flex; align-items: flex-start; gap: 10px; background: linear-gradient(135deg, #fff1f2 0%, #ffe4e6 100%); border: 1.5px solid #fecaca; border-radius: 8px; padding: 10px 12px; }
  .avoid-icon { font-size: 20pt; flex-shrink: 0; line-height: 1; }
  .avoid-content { flex: 1; }
  .avoid-name { font-size: 9pt; font-weight: 800; color: #991b1b; margin-bottom: 2px; }
  .avoid-reason { font-size: 7.5pt; color: #6b7280; font-style: italic; line-height: 1.3; }
  .avoid-note { background: linear-gradient(135deg, #fff1f2, #ffe4e6); border: 1px solid #fecaca; border-left: 4px solid #dc2626; border-radius: 8px; padding: 8px 12px; font-size: 8pt; color: #991b1b; font-style: italic; margin-top: 4px; line-height: 1.5; }
  @media print {
    body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .no-print { display: none; }
  }
  /* ── WELLNESS SCORE ─────────────────────────────────────── */
  .wellness-score-section { display:flex; align-items:center; gap:20px; margin:16px 24px; background:linear-gradient(135deg,#f0fdf4 0%,#ecfdf5 100%); border:2px solid #a7f3d0; border-radius:14px; padding:16px 20px; box-shadow:0 3px 14px rgba(13,148,136,0.1); }
  .ws-ring-wrap { flex-shrink:0; width:100px; height:100px; position:relative; }
  .ws-content { flex:1; }
  .ws-label { font-size:13pt; font-weight:900; letter-spacing:0.5px; text-transform:uppercase; margin-bottom:2px; }
  .ws-title { font-size:10pt; font-weight:700; color:#374151; margin-bottom:4px; }
  .ws-desc { font-size:8pt; color:#6b7280; line-height:1.4; margin-bottom:10px; }
  .ws-bar-wrap { display:flex; align-items:center; gap:8px; }
  .ws-bar-bg { flex:1; height:8px; background:#e5e7eb; border-radius:4px; overflow:hidden; }
  .ws-bar-fill { height:100%; border-radius:4px; }
  .ws-bar-pct { font-size:9pt; font-weight:800; min-width:32px; }
</style>
</head>
<body>
<div class="page">

  <!-- Premium Header -->
  <div class="header-main">
    <div class="header-logo-ring">
      <img src="${logoUrl}" alt="HN Coach Logo" class="header-logo" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'" />
      <div class="header-logo-fallback" style="display:none;">HN</div>
    </div>
    <div class="header-brand">
      <h1>HN Coach</h1>
      <div class="header-brand-sub">Wellness Assessment Report</div>
      <div class="header-brand-date">GENERATED ON: ${today.toUpperCase()}</div>
    </div>
    <div class="header-orgs">
      <div class="header-orgs-inner">
        <div class="org-logos-row">
          <img src="${window.location.origin}/assets/generated/who-logo-transparent.dim_200x200.png" alt="WHO" class="org-badge-img" title="World Health Organization" />
          <img src="${window.location.origin}/assets/generated/icmr-logo-transparent.dim_200x200.png" alt="ICMR" class="org-badge-img" title="Indian Council of Medical Research" />
          <img src="${window.location.origin}/assets/generated/ida-logo-transparent.dim_200x200.png" alt="IDA" class="org-badge-img" title="Indian Dietetic Association" />
        </div>
        <div class="org-note">Calculations based on guidelines<br/>by these organisations</div>
      </div>
    </div>
  </div>
  <div class="header-gold-line"></div>
  <div class="header-band">
    <span class="header-band-label">CONFIDENTIAL WELLNESS REPORT</span>
    <span class="header-band-id">DATE: ${today}</span>
  </div>

  <div class="tagline-center">✨ &nbsp; Eat all the snacks or look like a snack &nbsp; ✨</div>

  <!-- Certificate banner -->
  <div class="cert-banner">
    <div class="cert-prepared">Prepared Exclusively For</div>
    <div class="cert-name">${name}</div>
    <div class="cert-sub">Your personalised wellness data is ready · Based on WHO &amp; ICMR guidelines</div>
  </div>

  <!-- Wellness Score -->
  <div class="wellness-score-section">
    <div class="ws-ring-wrap">
      <svg viewBox="0 0 120 120" style="width:100px;height:100px;transform:rotate(-90deg);display:block;">
        <circle cx="60" cy="60" r="52" fill="none" stroke="#e5e7eb" stroke-width="10"/>
        <circle cx="60" cy="60" r="52" fill="none" stroke="${wellnessScore.ringColor}" stroke-width="10"
          stroke-dasharray="${Math.round((2 * Math.PI * 52 * wellnessScore.score) / 100)} 999"
          stroke-linecap="round"/>
      </svg>
      <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);text-align:center;line-height:1;">
        <div style="font-size:22pt;font-weight:900;color:${wellnessScore.color};line-height:1;">${wellnessScore.score}</div>
        <div style="font-size:7pt;color:#6b7280;margin-top:2px;">/100</div>
      </div>
    </div>
    <div class="ws-content">
      <div class="ws-label" style="color:${wellnessScore.color};">${wellnessScore.label}</div>
      <div class="ws-title">Your Wellness Score</div>
      <div class="ws-desc">Based on your BMI, BMR, hydration, steps and exercise data — calculated per WHO/ICMR standards.</div>
      <div class="ws-bar-wrap">
        <div class="ws-bar-bg">
          <div class="ws-bar-fill" style="width:${wellnessScore.score}%;background:${wellnessScore.ringColor};"></div>
        </div>
        <span class="ws-bar-pct" style="color:${wellnessScore.color};">${wellnessScore.score}%</span>
      </div>
    </div>
  </div>

  <!-- Personal Details with watermark -->
  <div class="personal-section">
    <div class="personal-watermark">HN COACH</div>
    <div class="personal-inner">
      <div class="personal">
        <h2>Personal Details</h2>
        <div class="personal-grid">
          <div>
            <div class="personal-row"><span class="personal-chip">Name</span><span class="personal-val">${name}</span></div>
            <div class="personal-row"><span class="personal-chip">Age</span><span class="personal-val">${age} years</span></div>
            <div class="personal-row"><span class="personal-chip">City</span><span class="personal-val">${city}</span></div>
            <div class="personal-row"><span class="personal-chip">WhatsApp</span><span class="personal-val">${whatsapp}</span></div>
            <div class="personal-row"><span class="personal-chip">Invited By</span><span class="personal-val">${invitedBy || "—"}</span></div>
          </div>
          <div>
            <div class="personal-row"><span class="personal-chip">Height</span><span class="personal-val">${height} cm</span></div>
            <div class="personal-row"><span class="personal-chip">Weight</span><span class="personal-val">${weight} kg</span></div>
            <div class="personal-row"><span class="personal-chip">Gender</span><span class="personal-val">${gender === "male" ? "Male" : "Female"}</span></div>
            <div class="personal-row"><span class="personal-chip">Occupation</span><span class="personal-val">${occupation}</span></div>
            <div class="personal-row"><span class="personal-chip">Goal(s)</span><span class="personal-val">${goalsLabel}</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="section-wrap">
    <div class="section-title">📊 Wellness Assessment Results</div>
    <div class="metric-grid">
      <div class="metric-card"><div class="metric-card-accent teal"></div><div class="metric-card-body"><div class="metric-label">Ideal Weight</div><div class="metric-note">Devine Formula</div><div class="metric-value">${results.idealWeight.toFixed(1)} kg</div></div></div>
      <div class="metric-card"><div class="metric-card-accent emerald"></div><div class="metric-card-body"><div class="metric-label">BMI <span style="color:${results.bmiCategory === "Normal" ? "#16a34a" : results.bmiCategory === "Overweight" ? "#ea580c" : "#dc2626"};font-size:8pt;">(${results.bmiCategory})</span></div><div class="metric-note">Body Mass Index</div><div class="metric-value">${results.bmi.toFixed(1)}</div></div></div>
      <div class="metric-card"><div class="metric-card-accent cyan"></div><div class="metric-card-body"><div class="metric-label">BMR</div><div class="metric-note">Calories burned at rest</div><div class="metric-value">${results.bmr.toLocaleString()} kcal/day</div></div></div>
      <div class="metric-card"><div class="metric-card-accent blue"></div><div class="metric-card-body"><div class="metric-label">TDEE</div><div class="metric-note">Calories to maintain weight</div><div class="metric-value">${results.tdee.toLocaleString()} kcal/day</div></div></div>
      <div class="metric-card"><div class="metric-card-accent indigo"></div><div class="metric-card-body"><div class="metric-label">Daily Water Intake</div><div class="metric-note">1 litre per 18 kg body weight</div><div class="metric-value">${results.waterIntake.toFixed(1)} L/day</div></div></div>
      <div class="metric-card"><div class="metric-card-accent violet"></div><div class="metric-card-body"><div class="metric-label">Daily Footsteps</div><div class="metric-note">1 kg body = 110 footsteps</div><div class="metric-value">${results.footsteps}</div></div></div>
      <div class="metric-card" style="grid-column:1/-1;"><div class="metric-card-accent amber"></div><div class="metric-card-body"><div class="metric-label">Daily Exercise Duration</div><div class="metric-note">Based on activity level</div><div class="metric-value">${results.exerciseMinutes}</div></div></div>
    </div>
  </div>

  <div class="section-wrap">
  ${idealBodyMeasurementsHtml}

  <div class="section-title">🎯 Weight Goal</div>
  ${weightGoalHtml}

  ${timelineHtml}

  ${healthRiskHtml}

  ${macroNutrientsHtml}

  ${foodsToAvoidHtml}

  <div class="guarantee-box">
    <div class="guarantee-badge">&#127873; SURPRISE OFFER</div>
    <div class="guarantee-title">&#9989; 30 Days Money Back Guarantee</div>
    <div class="guarantee-desc">We are so confident in our coaching program that we offer a full <strong>30-day money back guarantee</strong>. If you are not completely satisfied with your results within 30 days, we will refund your investment — no questions asked. Your health transformation is our commitment.</div>
  </div>

  ${referralSection}
  </div>

  <!-- Premium Footer CTA -->
  <div class="footer">
    <div class="footer-gold-line"></div>
    <div class="footer-cta-text">🌟 Ready to Transform Your Health?</div>
    <div class="footer-sub">Your personal wellness coach is just one message away. Send this report and get a personalised consultation!</div>
    <div>
      <a href="${waUrl}" class="footer-wa-btn">
        <svg viewBox="0 0 24 24" fill="white" style="width:22px;height:22px;flex-shrink:0;"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        🔥 Send This Report &amp; Get Your Consultation 🔥
      </a>
    </div>
    <div class="footer-brand">HN Coach · Personalised Wellness Coaching · Consult HN Coach for personalised advice.</div>
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

// ── Local Storage Persistence ──────────────────────────────────────────────────
interface SavedReport {
  form: UnifiedFormData;
  results: AssessmentResults;
  heightCm: string;
  savedAt: string;
}

const LS_KEY = "hncoach_last_report";

function loadSavedReport(): SavedReport | null {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as SavedReport;
  } catch {
    return null;
  }
}

function saveReport(
  form: UnifiedFormData,
  results: AssessmentResults,
  heightCm: string,
) {
  try {
    const data: SavedReport = {
      form,
      results,
      heightCm,
      savedAt: new Date().toISOString(),
    };
    localStorage.setItem(LS_KEY, JSON.stringify(data));
  } catch {
    // ignore storage errors
  }
}

function clearSavedReport() {
  localStorage.removeItem(LS_KEY);
}

// ── Wellness Assessment (Single Unified Form) ──────────────────────────────────
interface WellnessAssessmentProps {
  lang: Lang;
  t: Translations;
}

const EMPTY_FORM: UnifiedFormData = {
  fullName: "",
  age: "",
  city: "",
  whatsapp: "",
  occupation: "",
  height: "",
  heightMode: "cm",
  heightFt: "",
  heightIn: "",
  weight: "",
  gender: "",
  activityLevel: "moderately_active",
  goals: [],
  invitedBy: "",
};

function WellnessAssessment({ lang, t }: WellnessAssessmentProps) {
  const [savedReport, setSavedReport] = useState<SavedReport | null>(() =>
    loadSavedReport(),
  );
  const [referralLocked] = useState<boolean>(() => {
    const params = new URLSearchParams(window.location.search);
    return !!params.get("ref");
  });
  const [form, setForm] = useState<UnifiedFormData>(() => {
    // Pre-fill "Who Invited You?" from ?ref= URL parameter
    const params = new URLSearchParams(window.location.search);
    const refName = params.get("ref");
    return refName
      ? { ...EMPTY_FORM, invitedBy: decodeURIComponent(refName) }
      : EMPTY_FORM;
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);
  const [showReferral, setShowReferral] = useState(false);
  const [copied, setCopied] = useState(false);
  const referralRef = useRef<HTMLDivElement>(null);
  const lastResultsRef = useRef<{
    results: AssessmentResults;
    heightCm: string;
  } | null>(null);

  // Load Razorpay script on mount
  useEffect(() => {
    if ((window as unknown as Record<string, unknown>).Razorpay) return;
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      // cleanup not strictly needed but safe
    };
  }, []);

  const set = (field: keyof UnifiedFormData) => (value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const setInput =
    (field: keyof UnifiedFormData) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const heightCm =
    form.heightMode === "ft"
      ? (() => {
          const ft = Number.parseFloat(form.heightFt) || 0;
          const inches = Number.parseFloat(form.heightIn) || 0;
          return String(Math.round((ft * 12 + inches) * 2.54));
        })()
      : form.height;

  const allFilled =
    form.fullName.trim() &&
    form.age.trim() &&
    form.city.trim() &&
    form.whatsapp.trim() &&
    form.occupation.trim() &&
    heightCm &&
    Number(heightCm) > 0 &&
    form.weight.trim() &&
    form.gender &&
    form.invitedBy.trim();

  const handlePayAndDownload = () => {
    const results = computeResults({
      weight: form.weight,
      height: heightCm,
      age: form.age,
      gender: form.gender,
      activityLevel: form.activityLevel,
    });
    if (!results) return;

    // Save results for "Download Again"
    lastResultsRef.current = { results, heightCm };

    const razorpayWindow = window as unknown as Record<string, unknown>;
    if (!razorpayWindow.Razorpay) {
      // Script not loaded yet — fallback: generate directly
      setIsGenerating(true);
      setTimeout(() => {
        generatePDF(
          form.fullName,
          form.age,
          form.city,
          form.whatsapp,
          form.occupation,
          heightCm,
          form.weight,
          form.goals,
          results,
          form.gender,
          form.invitedBy,
        );
        notifyCoach(results);
        saveReport(form, results, heightCm);
        setSavedReport({
          form,
          results,
          heightCm,
          savedAt: new Date().toISOString(),
        });
        setIsGenerating(false);
        setPaymentSuccess(true);
        setShowReferral(true);
        setTimeout(() => {
          referralRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 400);
      }, 200);
      return;
    }

    setIsPaymentLoading(true);

    const options = {
      key: "rzp_live_SNoVPUAavv60C9",
      amount: 100, // Rs. 1 in paise
      currency: "INR",
      name: "HN Coach",
      description: "Wellness Assessment Report",
      handler: (_response: Record<string, string>) => {
        generatePDF(
          form.fullName,
          form.age,
          form.city,
          form.whatsapp,
          form.occupation,
          heightCm,
          form.weight,
          form.goals,
          results,
          form.gender,
          form.invitedBy,
        );
        notifyCoach(results);
        saveReport(form, results, heightCm);
        setSavedReport({
          form,
          results,
          heightCm,
          savedAt: new Date().toISOString(),
        });
        setPaymentSuccess(true);
        setIsPaymentLoading(false);
        setShowReferral(true);
        setTimeout(() => {
          referralRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 400);
      },
      modal: {
        ondismiss: () => setIsPaymentLoading(false),
      },
      prefill: {
        name: form.fullName,
        contact: form.whatsapp,
      },
      theme: { color: "#0d9488" },
    };

    const RazorpayConstructor = razorpayWindow.Razorpay as new (
      opts: typeof options,
    ) => { open: () => void };
    const rzp = new RazorpayConstructor(options);
    rzp.open();
  };

  const notifyCoach = (results: AssessmentResults) => {
    // Notify coach on WhatsApp with full report details
    const goalsLabel =
      form.goals.map((g) => GOAL_LABELS[g] || g).join(", ") || "Not specified";
    const weightDiff = Number.parseFloat(form.weight) - results.idealWeight;
    const absWeightDiff = Math.abs(weightDiff).toFixed(1);
    const weightGoalText =
      Math.abs(weightDiff) <= 1
        ? "✅ At Ideal Weight"
        : weightDiff > 0
          ? `⚠️ Need to LOSE ${absWeightDiff} kg`
          : `↑ Need to GAIN ${absWeightDiff} kg`;

    const referredByLine = form.invitedBy
      ? `\n• Referred By: ${form.invitedBy}`
      : "";
    const coachMsg = encodeURIComponent(
      `🔔 *NEW WELLNESS REPORT DOWNLOADED*\n\n👤 *Client Details*\n• Name: ${form.fullName}\n• Age: ${form.age} yrs | City: ${form.city}\n• WhatsApp: ${form.whatsapp}\n• Occupation: ${form.occupation}\n• Height: ${heightCm} cm | Weight: ${form.weight} kg\n• Goal(s): ${goalsLabel}${referredByLine}\n\n📊 *Assessment Results*\n• Ideal Weight: ${results.idealWeight.toFixed(1)} kg\n• BMI: ${results.bmi.toFixed(1)} (${results.bmiCategory})\n• BMR: ${results.bmr.toLocaleString()} kcal/day\n• TDEE: ${results.tdee.toLocaleString()} kcal/day\n• Daily Water: ${results.waterIntake.toFixed(1)} L/day\n• Daily Steps: ${results.footsteps}\n• Exercise: ${results.exerciseMinutes}\n• Weight Goal: ${weightGoalText}\n\n📅 Downloaded on: ${new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })}`,
    );
    window.open(`https://wa.me/919155348866?text=${coachMsg}`, "_blank");
  };

  const referralLink = `${window.location.origin}${window.location.pathname}?ref=${encodeURIComponent(form.whatsapp || "friend")}`;

  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const shareOnWhatsApp = () => {
    const referrerTag = form.whatsapp
      ? `\n\n📌 Referred By: ${form.whatsapp}`
      : "";
    const msg = encodeURIComponent(
      `Hi! I just downloaded my Wellness Assessment Report from HN Coach — only Rs. 1! Get yours here: ${referralLink}${referrerTag}`,
    );
    window.open(`https://wa.me/?text=${msg}`, "_blank");
  };

  const hindiFont =
    lang === "hi" ? "'Noto Sans Devanagari', sans-serif" : undefined;

  return (
    <section
      className="w-full"
      aria-label="Wellness Assessment"
      lang={lang === "hi" ? "hi" : undefined}
      style={hindiFont ? { fontFamily: hindiFont } : undefined}
    >
      {/* Section heading */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-6"
      >
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary font-semibold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full mb-3">
          <FileText className="w-3.5 h-3.5" />
          {t.freeWellnessReport}
        </div>
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-foreground leading-tight">
          {t.sectionTitle}
        </h2>
        <p className="text-muted-foreground text-sm mt-2 max-w-md mx-auto">
          {t.sectionDesc}
        </p>
      </motion.div>

      {/* ── Welcome Back Banner ───────────────────────────────────── */}
      {savedReport !== null && !paymentSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -16, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          data-ocid="welcome.panel"
          className="mb-6 rounded-2xl overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, #064e3b 0%, #065f46 50%, #047857 100%)",
            boxShadow:
              "0 8px 32px rgba(6,78,59,0.35), 0 0 0 2px rgba(110,231,183,0.25)",
          }}
        >
          {/* Top accent bar */}
          <div
            className="h-1 w-full"
            style={{
              background:
                "linear-gradient(90deg, #f59e0b, #fde68a 50%, #f59e0b)",
            }}
          />
          <div className="px-5 py-5">
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div
                className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                style={{
                  background: "rgba(255,255,255,0.12)",
                  border: "1.5px solid rgba(255,255,255,0.25)",
                }}
              >
                👋
              </div>
              <div className="flex-1 min-w-0">
                <h3
                  className="text-white font-black text-lg leading-tight mb-1"
                  style={{ textShadow: "0 1px 6px rgba(0,0,0,0.3)" }}
                >
                  {t.welcomeBack}, {savedReport.form.fullName}! 👋
                </h3>
                <p className="text-emerald-100 text-sm font-semibold mb-1">
                  {t.lastReportReady}
                </p>
                <p className="text-emerald-200/60 text-xs">
                  {t.reportSavedOn}:{" "}
                  {new Date(savedReport.savedAt).toLocaleDateString(
                    lang === "hi" ? "hi-IN" : "en-IN",
                    {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    },
                  )}
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
              {/* Download Again — free */}
              <div className="flex flex-col gap-1.5">
                <button
                  type="button"
                  data-ocid="welcome.download_again.button"
                  onClick={() => {
                    generatePDF(
                      savedReport.form.fullName,
                      savedReport.form.age,
                      savedReport.form.city,
                      savedReport.form.whatsapp,
                      savedReport.form.occupation,
                      savedReport.heightCm,
                      savedReport.form.weight,
                      savedReport.form.goals,
                      savedReport.results,
                      savedReport.form.gender,
                      savedReport.form.invitedBy,
                    );
                  }}
                  className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-all hover:brightness-110 active:scale-[0.98]"
                  style={{
                    background:
                      "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                    color: "#fff",
                    boxShadow: "0 4px 16px rgba(16,185,129,0.4)",
                  }}
                >
                  <Download className="w-4 h-4 flex-shrink-0" />
                  {t.downloadAgainFree}
                </button>
                <p className="text-emerald-200/60 text-xs text-center italic">
                  🔒 {t.noPaymentNeeded}
                </p>
              </div>

              {/* Generate New Report — requires Rs. 1 payment */}
              <div className="flex flex-col gap-1.5">
                <button
                  type="button"
                  data-ocid="welcome.generate_new.button"
                  onClick={() => {
                    clearSavedReport();
                    setSavedReport(null);
                    setForm({ ...EMPTY_FORM, invitedBy: form.invitedBy });
                  }}
                  className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-all hover:brightness-125 active:scale-[0.98]"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    color: "#d1fae5",
                    border: "1.5px solid rgba(255,255,255,0.25)",
                  }}
                >
                  <FileText className="w-4 h-4 flex-shrink-0" />
                  {t.generateNewReport}
                  <span
                    className="ml-1 inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-bold"
                    style={{
                      background: "rgba(245,158,11,0.25)",
                      color: "#fbbf24",
                      border: "1px solid rgba(245,158,11,0.4)",
                    }}
                  >
                    Rs. 1
                  </span>
                </button>
                <p className="text-amber-300/70 text-xs text-center italic">
                  💳 {t.paymentRequiredForNew}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ── Trust Badges ──────────────────────────────────────────── */}
      <div
        className="flex gap-2.5 overflow-x-auto pb-1 mb-6 justify-center flex-wrap"
        aria-label="Trust signals"
      >
        {[
          { icon: "🔒", label: t.trustPrivate },
          { icon: "✅", label: t.trustClients },
          { icon: "🏷️", label: t.trustFree },
          { icon: "⚡", label: t.trustInstant },
        ].map((badge, i) => (
          <motion.span
            key={badge.label}
            initial={{ opacity: 0, y: 10, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.38,
              delay: 0.08 + i * 0.07,
              ease: "easeOut",
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap flex-shrink-0 select-none"
            style={{
              background: "linear-gradient(135deg, #ffffff 0%, #f0fdf9 100%)",
              border: "1.5px solid #6ee7b7",
              color: "#065f46",
              boxShadow:
                "0 3px 12px rgba(13,148,136,0.15), inset 0 1px 0 rgba(255,255,255,1)",
              letterSpacing: "0.01em",
            }}
          >
            <span className="text-sm leading-none">{badge.icon}</span>
            {badge.label}
          </motion.span>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.15 }}
      >
        <Card
          data-ocid="assessment.form"
          className="shadow-2xl border-0 overflow-hidden"
          style={{
            background: "#ffffff",
            boxShadow:
              "0 0 0 1.5px #6ee7b7, 0 12px 48px oklch(0.5 0.145 196 / 0.14), inset 0 1px 0 rgba(255,255,255,0.9)",
          }}
        >
          {/* Certificate header strip */}
          <div className="cert-header-strip w-full px-6 py-4 flex items-center gap-3">
            {/* Shield/cert icon */}
            <div
              className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
              style={{
                background: "rgba(255,255,255,0.18)",
                border: "1.5px solid rgba(255,255,255,0.35)",
              }}
            >
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div
                className="text-white font-black text-base sm:text-lg leading-tight tracking-tight"
                style={{ textShadow: "0 1px 6px rgba(0,0,0,0.2)" }}
              >
                {t.cardTitle}
              </div>
              <div className="text-emerald-100/80 text-xs font-semibold mt-0.5 tracking-wide">
                {t.cardSub}
              </div>
            </div>
            <div className="flex-shrink-0 text-right hidden sm:block">
              <div className="text-white/60 text-[10px] font-bold uppercase tracking-widest">
                {t.cardPowered}
              </div>
              <div className="text-white/90 text-xs font-extrabold tracking-wide">
                HN COACH
              </div>
            </div>
          </div>
          <CardContent
            className="pt-6 pb-7 space-y-8"
            style={{ background: "#ffffff" }}
          >
            {/* ── Section 1: Personal Details ──────────────────────── */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span
                  className="flex items-center justify-center w-9 h-9 rounded-full text-white text-sm font-black flex-shrink-0"
                  style={{
                    background: "linear-gradient(135deg, #0d9488, #047857)",
                    boxShadow:
                      "0 0 0 3px rgba(13,148,136,0.22), 0 3px 12px rgba(13,148,136,0.4)",
                    border: "2px solid rgba(255,255,255,0.5)",
                  }}
                >
                  1
                </span>
                <div className="flex items-center gap-2 flex-1">
                  <User className="w-4 h-4 text-primary flex-shrink-0" />
                  <h3 className="font-display font-bold text-base text-foreground tracking-tight">
                    {t.step1Label}
                  </h3>
                </div>
              </div>

              {/* Full Name */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="f-name"
                  className="text-sm font-medium text-foreground/80"
                >
                  {t.fieldName} <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="f-name"
                  data-ocid="assessment.name.input"
                  type="text"
                  placeholder={t.fieldNamePlaceholder}
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
                    {t.fieldAge} <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="f-age"
                    data-ocid="assessment.age.input"
                    type="number"
                    placeholder={t.fieldAgePlaceholder}
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
                    {t.fieldCity} <span className="text-destructive">*</span>
                  </Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60 pointer-events-none" />
                    <Input
                      id="f-city"
                      data-ocid="assessment.city.input"
                      type="text"
                      placeholder={t.fieldCityPlaceholder}
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
                  {t.fieldWhatsapp} <span className="text-destructive">*</span>
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60 pointer-events-none" />
                  <Input
                    id="f-whatsapp"
                    data-ocid="assessment.whatsapp.input"
                    type="tel"
                    placeholder={t.fieldWhatsappPlaceholder}
                    value={form.whatsapp}
                    onChange={setInput("whatsapp")}
                    className="h-11 pl-9"
                  />
                </div>
              </div>

              {/* Occupation */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="f-occupation"
                  className="text-sm font-medium text-foreground/80"
                >
                  {t.fieldOccupation}{" "}
                  <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="f-occupation"
                  data-ocid="assessment.occupation.input"
                  type="text"
                  placeholder={t.fieldOccupationPlaceholder}
                  value={form.occupation}
                  onChange={setInput("occupation")}
                  className="h-11"
                />
              </div>
            </div>

            {/* Step divider 1→2 */}
            <div className="flex items-center gap-3 py-0.5">
              <div
                className="flex-1 h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent 0%, #6ee7b7 30%, #0d9488 50%, #6ee7b7 70%, transparent 100%)",
                }}
              />
              <span className="step-divider-pill flex-shrink-0">
                {t.step1to2}
              </span>
              <div
                className="flex-1 h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent 0%, #6ee7b7 30%, #0d9488 50%, #6ee7b7 70%, transparent 100%)",
                }}
              />
            </div>

            {/* ── Section 2: Body Metrics ───────────────────────────── */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span
                  className="flex items-center justify-center w-9 h-9 rounded-full text-white text-sm font-black flex-shrink-0"
                  style={{
                    background: "linear-gradient(135deg, #0d9488, #047857)",
                    boxShadow:
                      "0 0 0 3px rgba(13,148,136,0.22), 0 3px 12px rgba(13,148,136,0.4)",
                    border: "2px solid rgba(255,255,255,0.5)",
                  }}
                >
                  2
                </span>
                <div className="flex items-center gap-2 flex-1">
                  <Activity className="w-4 h-4 text-primary flex-shrink-0" />
                  <h3 className="font-display font-bold text-base text-foreground tracking-tight">
                    {t.step2Label}
                  </h3>
                </div>
              </div>

              {/* Height */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium text-foreground/80 flex items-center gap-1.5">
                    <Ruler className="w-3.5 h-3.5 text-primary" />
                    {t.fieldHeight} <span className="text-destructive">*</span>
                  </Label>
                  {/* Toggle cm / ft+in */}
                  <div className="flex rounded-lg overflow-hidden border border-border text-xs font-semibold">
                    <button
                      type="button"
                      data-ocid="assessment.height.cm.toggle"
                      onClick={() =>
                        setForm((p) => ({ ...p, heightMode: "cm" }))
                      }
                      className={`px-3 py-1.5 transition-colors ${
                        form.heightMode === "cm"
                          ? "bg-primary text-primary-foreground"
                          : "bg-background text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      {t.heightCm}
                    </button>
                    <button
                      type="button"
                      data-ocid="assessment.height.ft.toggle"
                      onClick={() =>
                        setForm((p) => ({ ...p, heightMode: "ft" }))
                      }
                      className={`px-3 py-1.5 transition-colors ${
                        form.heightMode === "ft"
                          ? "bg-primary text-primary-foreground"
                          : "bg-background text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      {t.heightFtIn}
                    </button>
                  </div>
                </div>
                {form.heightMode === "cm" ? (
                  <Input
                    id="f-height"
                    data-ocid="assessment.height.input"
                    type="number"
                    placeholder={t.heightCmPlaceholder}
                    value={form.height}
                    onChange={setInput("height")}
                    className="h-11"
                  />
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label
                        htmlFor="f-height-ft"
                        className="text-xs text-muted-foreground"
                      >
                        {t.fieldFeet}
                      </Label>
                      <Input
                        id="f-height-ft"
                        data-ocid="assessment.height.ft.input"
                        type="number"
                        placeholder={t.heightFtPlaceholder}
                        min={1}
                        max={8}
                        value={form.heightFt}
                        onChange={setInput("heightFt")}
                        className="h-11"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label
                        htmlFor="f-height-in"
                        className="text-xs text-muted-foreground"
                      >
                        {t.fieldInches}
                      </Label>
                      <Input
                        id="f-height-in"
                        data-ocid="assessment.height.in.input"
                        type="number"
                        placeholder={t.heightInPlaceholder}
                        min={0}
                        max={11}
                        value={form.heightIn}
                        onChange={setInput("heightIn")}
                        className="h-11"
                      />
                    </div>
                  </div>
                )}
                {form.heightMode === "ft" &&
                  heightCm &&
                  Number(heightCm) > 0 && (
                    <p className="text-xs text-primary font-medium">
                      = {heightCm} cm
                    </p>
                  )}
              </div>

              {/* Weight */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="f-weight"
                  className="text-sm font-medium text-foreground/80"
                >
                  {t.fieldWeight} <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="f-weight"
                  data-ocid="assessment.weight.input"
                  type="number"
                  placeholder={t.fieldWeightPlaceholder}
                  value={form.weight}
                  onChange={setInput("weight")}
                  className="h-11"
                />
              </div>

              {/* Gender */}
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-foreground/80">
                  {t.fieldGender} <span className="text-destructive">*</span>
                </Label>
                <Select value={form.gender} onValueChange={set("gender")}>
                  <SelectTrigger
                    data-ocid="assessment.gender.select"
                    className="h-11"
                  >
                    <SelectValue placeholder={t.genderSelect} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">{t.genderMale}</SelectItem>
                    <SelectItem value="female">{t.genderFemale}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Step divider 2→3 */}
            <div className="flex items-center gap-3 py-0.5">
              <div
                className="flex-1 h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent 0%, #6ee7b7 30%, #0d9488 50%, #6ee7b7 70%, transparent 100%)",
                }}
              />
              <span className="step-divider-pill flex-shrink-0">
                {t.step2to3}
              </span>
              <div
                className="flex-1 h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent 0%, #6ee7b7 30%, #0d9488 50%, #6ee7b7 70%, transparent 100%)",
                }}
              />
            </div>

            {/* ── Section 3: Who Invited You ────────────────────────── */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span
                  className="flex items-center justify-center w-9 h-9 rounded-full text-white text-sm font-black flex-shrink-0"
                  style={{
                    background: "linear-gradient(135deg, #0d9488, #047857)",
                    boxShadow:
                      "0 0 0 3px rgba(13,148,136,0.22), 0 3px 12px rgba(13,148,136,0.4)",
                    border: "2px solid rgba(255,255,255,0.5)",
                  }}
                >
                  3
                </span>
                <div className="flex items-center gap-2 flex-1">
                  <Share2 className="w-4 h-4 text-primary flex-shrink-0" />
                  <h3 className="font-display font-bold text-base text-foreground tracking-tight">
                    {t.step3Label}{" "}
                    <span className="text-destructive font-normal text-sm">
                      {t.step3Required}
                    </span>
                  </h3>
                </div>
              </div>
              <div className="space-y-1.5">
                <Label
                  htmlFor={referralLocked ? undefined : "f-invited-by"}
                  className="text-sm font-medium text-foreground/80"
                >
                  {t.fieldInvitedBy} <span className="text-destructive">*</span>
                </Label>
                {referralLocked ? (
                  <div
                    className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-semibold"
                    style={{
                      background:
                        "linear-gradient(135deg, #dcfce7 0%, #d1fae5 100%)",
                      border: "1.5px solid #6ee7b7",
                      color: "#065f46",
                    }}
                  >
                    <span className="text-green-600 text-base">✓</span>
                    <span>
                      {t.referredByText} <strong>{form.invitedBy}</strong>
                    </span>
                  </div>
                ) : (
                  <Input
                    id="f-invited-by"
                    data-ocid="assessment.invitedby.input"
                    type="text"
                    placeholder={t.fieldInvitedByPlaceholder}
                    value={form.invitedBy}
                    onChange={setInput("invitedBy")}
                    className="h-11"
                    required
                  />
                )}
                {referralLocked ? null : (
                  <div
                    className="flex items-start gap-2 px-3 py-2 rounded-lg text-xs font-medium mt-1"
                    style={{
                      background: "linear-gradient(135deg, #f0fdf4, #dcfce7)",
                      border: "1px solid #6ee7b7",
                      color: "#065f46",
                    }}
                  >
                    <span className="text-base leading-none mt-0.5">💡</span>
                    <span>
                      <strong>{t.tipLabel}</strong> {t.tipText}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* ── Mandatory notice ───────────────────────────────────── */}
            <p className="text-xs text-center text-muted-foreground font-medium">
              {t.mandatoryNotice}
            </p>

            {/* ── Price Offer Strip ───────────────────────────────────── */}
            <div
              className="flex items-center justify-center gap-3 py-3 px-4 rounded-xl"
              style={{
                background: "linear-gradient(135deg, #dcfce7, #f0fdf4)",
                border: "2px solid #16a34a",
              }}
            >
              <span className="text-xl font-black text-red-500 line-through">
                Rs. 499
              </span>
              <span
                className="text-2xl font-black"
                style={{ color: "#16a34a" }}
              >
                Just Rs. 1
              </span>
              <span className="bg-red-500 text-white text-xs font-black px-2 py-0.5 rounded-full">
                99% OFF
              </span>
            </div>

            {/* ── CTA ────────────────────────────────────────────────── */}
            <div className="space-y-3 pt-1">
              {!allFilled && (
                <p className="text-center text-xs text-muted-foreground">
                  {t.fillAllFields}
                </p>
              )}
              <Button
                data-ocid="assessment.submit_button"
                className={`w-full h-16 text-lg font-black tracking-wide border-0 text-white transition-all duration-200 rounded-xl ${allFilled && !isPaymentLoading && !isGenerating ? "cta-shimmer hover:scale-[1.01] active:scale-[0.99]" : ""}`}
                style={
                  !allFilled || isPaymentLoading || isGenerating
                    ? {
                        background: "oklch(0.72 0.04 192)",
                        color: "white",
                        boxShadow: "none",
                      }
                    : {
                        boxShadow:
                          "0 6px 24px rgba(13,148,136,0.45), 0 2px 8px rgba(0,0,0,0.12)",
                      }
                }
                onClick={handlePayAndDownload}
                disabled={!allFilled || isPaymentLoading || isGenerating}
              >
                {isPaymentLoading || isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    {t.generatingReport}
                  </>
                ) : (
                  <>
                    {allFilled ? (
                      <Download className="w-5 h-5 mr-2" />
                    ) : (
                      <FileText className="w-5 h-5 mr-2" />
                    )}
                    {t.ctaButton}
                  </>
                )}
              </Button>

              {/* Download Again button — shown after successful payment */}
              {paymentSuccess && lastResultsRef.current && (
                <button
                  type="button"
                  data-ocid="assessment.download.secondary_button"
                  onClick={() => {
                    if (!lastResultsRef.current) return;
                    generatePDF(
                      form.fullName,
                      form.age,
                      form.city,
                      form.whatsapp,
                      form.occupation,
                      lastResultsRef.current.heightCm,
                      form.weight,
                      form.goals,
                      lastResultsRef.current.results,
                      form.gender,
                      form.invitedBy,
                    );
                  }}
                  className="w-full h-12 rounded-xl border-2 border-teal-500 text-teal-700 font-bold text-base flex items-center justify-center gap-2 hover:bg-teal-50 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  {t.downloadAgain}
                </button>
              )}

              <div className="flex items-center justify-center gap-1.5">
                <span className="text-xs" aria-hidden="true">
                  🔒
                </span>
                <p
                  className="text-center text-xs font-medium"
                  style={{ color: "oklch(0.46 0.022 196)" }}
                >
                  {t.ctaDisclaimer}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Referral Section — shown after report is generated */}
      {showReferral && (
        <motion.div
          ref={referralRef}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          data-ocid="referral.section"
          className="mt-8 rounded-2xl overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, #064e3b 0%, #065f46 50%, #0f766e 100%)",
            boxShadow: "0 8px 32px rgba(6,78,59,0.45)",
          }}
        >
          <div className="px-5 py-7 text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/25 rounded-full px-4 py-1.5 text-xs font-black text-white uppercase tracking-widest mb-4">
              <Share2 className="w-3.5 h-3.5" />
              {t.refer2Friends}
            </div>

            <h3 className="text-2xl font-black text-white mb-1">
              {t.sharingIsCaring}
            </h3>
            <p className="text-emerald-100 font-semibold text-sm mb-1">
              {t.referralShareDesc}
            </p>

            {/* Help 2 Friends progress visualization */}
            <div className="flex items-center justify-center gap-5 my-5">
              <div className="flex flex-col items-center gap-2">
                <motion.div
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    delay: 0.15,
                    duration: 0.4,
                    type: "spring",
                    stiffness: 220,
                  }}
                  className="w-14 h-14 rounded-full flex items-center justify-center text-2xl"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.06) 100%)",
                    border: "2px dashed rgba(134,239,172,0.55)",
                    boxShadow:
                      "0 0 0 4px rgba(134,239,172,0.1), inset 0 1px 0 rgba(255,255,255,0.15)",
                  }}
                >
                  🧑
                </motion.div>
                <span className="text-emerald-100 text-xs font-bold tracking-wide">
                  {t.friend1}
                </span>
              </div>
              <div className="flex flex-col items-center gap-1 self-start mt-4">
                <div
                  className="w-8 h-0.5 rounded-full"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(134,239,172,0.6), rgba(134,239,172,0.2))",
                  }}
                />
                <div
                  className="w-5 h-0.5 rounded-full"
                  style={{ background: "rgba(134,239,172,0.3)" }}
                />
              </div>
              <div className="flex flex-col items-center gap-2">
                <motion.div
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    delay: 0.3,
                    duration: 0.4,
                    type: "spring",
                    stiffness: 220,
                  }}
                  className="w-14 h-14 rounded-full flex items-center justify-center text-2xl"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.06) 100%)",
                    border: "2px dashed rgba(134,239,172,0.55)",
                    boxShadow:
                      "0 0 0 4px rgba(134,239,172,0.1), inset 0 1px 0 rgba(255,255,255,0.15)",
                  }}
                >
                  🧑
                </motion.div>
                <span className="text-emerald-100 text-xs font-bold tracking-wide">
                  {t.friend2}
                </span>
              </div>
            </div>
            <p className="text-emerald-100/75 text-xs mb-5 font-medium">
              {t.tag2Friends}
            </p>

            {/* Referral link display — click to copy */}
            <button
              type="button"
              onClick={copyReferralLink}
              className="mx-auto max-w-md w-full mb-4 px-4 py-3 rounded-xl text-xs font-mono break-all text-left transition-all duration-200 hover:brightness-125 active:scale-[0.99] cursor-pointer group"
              style={{
                background: "rgba(0,0,0,0.35)",
                border: "1.5px solid rgba(134,239,172,0.3)",
                color: "#d1fae5",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
              aria-label="Click to copy referral link"
            >
              <Copy className="w-3.5 h-3.5 flex-shrink-0 opacity-60 group-hover:opacity-100 transition-opacity" />
              <span className="flex-1 truncate">{referralLink}</span>
              <span className="text-emerald-300 text-[10px] font-bold flex-shrink-0 opacity-60 group-hover:opacity-100 transition-opacity">
                {copied ? "Copied!" : "tap to copy"}
              </span>
            </button>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                data-ocid="referral.whatsapp.primary_button"
                onClick={shareOnWhatsApp}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm text-white transition-all hover:brightness-110 active:scale-95 shadow-lg"
                style={{
                  background: "#25D366",
                  boxShadow: "0 4px 16px rgba(37,211,102,0.5)",
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="white"
                  style={{ width: 18, height: 18, flexShrink: 0 }}
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                {t.shareWhatsapp}
              </button>

              <button
                type="button"
                data-ocid="referral.copy.secondary_button"
                onClick={copyReferralLink}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm text-white transition-all hover:brightness-110 active:scale-95"
                style={{
                  background: copied
                    ? "rgba(255,255,255,0.22)"
                    : "rgba(255,255,255,0.10)",
                  border: "1.5px solid rgba(255,255,255,0.35)",
                  boxShadow: copied
                    ? "0 0 0 2px rgba(134,239,172,0.4)"
                    : "none",
                }}
              >
                <Copy className="w-4 h-4" />
                {copied ? t.linkCopied : t.copyLink}
              </button>
            </div>

            <p className="text-emerald-200/50 text-xs mt-5 italic">
              {t.hashtags}
            </p>
          </div>
        </motion.div>
      )}
    </section>
  );
}

// ── App ────────────────────────────────────────────────────────────────────────
export default function App() {
  const [lang, setLang] = useState<Lang>("en");
  const t = translations[lang];

  // Read referrer from URL param (e.g. ?ref=Rahul)
  const urlReferrer = (() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("ref") || "";
  })();
  const _referrerSuffix = urlReferrer
    ? `\n\n📌 *Referred By:* ${urlReferrer}`
    : "";

  return (
    <div className="min-h-screen flex flex-col bg-background page-mesh">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/85 backdrop-blur-md border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-3">
          {/* Logo */}
          <img
            src="/assets/uploads/IMG-20260226-WA0000-1-1.jpg"
            alt="HN Coach"
            className="w-11 h-11 rounded-xl object-cover shadow-md ring-2 ring-primary/30 flex-shrink-0"
          />
          {/* Brand text */}
          <div className="flex-1 min-w-0">
            <h1 className="font-display font-bold text-xl text-foreground leading-none tracking-tight">
              HN Coach
            </h1>
            <p
              className="text-xs font-bold mt-0.5 tracking-wide uppercase"
              style={{
                background: "linear-gradient(90deg, #0d9488, #059669)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontFamily:
                  lang === "hi"
                    ? "'Noto Sans Devanagari', sans-serif"
                    : undefined,
              }}
            >
              {t.freeWellnessAssessment}
            </p>
          </div>
          {/* Organisation logos */}
          <div className="flex flex-col items-end gap-1 flex-shrink-0">
            <div className="flex items-center gap-2">
              <div className="flex flex-col items-center">
                <img
                  src="/assets/generated/who-logo-transparent.dim_200x200.png"
                  alt="WHO"
                  className="w-8 h-8 object-contain"
                />
                <span className="text-[9px] font-bold text-muted-foreground leading-none mt-0.5">
                  WHO
                </span>
              </div>
              <div className="flex flex-col items-center">
                <img
                  src="/assets/generated/icmr-logo-transparent.dim_200x200.png"
                  alt="ICMR"
                  className="w-8 h-8 object-contain"
                />
                <span className="text-[9px] font-bold text-muted-foreground leading-none mt-0.5">
                  ICMR
                </span>
              </div>
              <div className="flex flex-col items-center">
                <img
                  src="/assets/generated/ida-logo-transparent.dim_200x200.png"
                  alt="IDA"
                  className="w-8 h-8 object-contain"
                />
                <span className="text-[9px] font-bold text-muted-foreground leading-none mt-0.5">
                  IDA
                </span>
              </div>
            </div>
            <p
              className="text-[8px] text-muted-foreground italic text-right leading-tight max-w-[120px]"
              style={
                lang === "hi"
                  ? { fontFamily: "'Noto Sans Devanagari', sans-serif" }
                  : undefined
              }
            >
              {t.calcBasedOn}
            </p>
          </div>
        </div>
      </header>

      {/* Language Toggle Bar */}
      <div
        className="w-full flex justify-center items-center py-2.5 px-4"
        style={{
          background: "linear-gradient(135deg, #f0fdf9 0%, #ecfdf5 100%)",
          borderBottom: "1px solid #a7f3d0",
        }}
      >
        <div
          className="inline-flex items-center rounded-full overflow-hidden shadow-sm"
          style={{
            border: "2px solid #059669",
            background: "#fff",
          }}
          aria-label="Language switcher"
        >
          <button
            type="button"
            data-ocid="lang.en.toggle"
            onClick={() => setLang("en")}
            className="px-5 py-2 text-sm font-bold transition-all duration-200 flex items-center gap-1.5"
            style={{
              background:
                lang === "en"
                  ? "linear-gradient(135deg, #0d9488, #059669)"
                  : "transparent",
              color: lang === "en" ? "#fff" : "#374151",
              borderRight: "1.5px solid #a7f3d0",
            }}
            aria-pressed={lang === "en"}
          >
            🇬🇧 English
          </button>
          <button
            type="button"
            data-ocid="lang.hi.toggle"
            onClick={() => setLang("hi")}
            className="px-5 py-2 text-sm font-bold transition-all duration-200 flex items-center gap-1.5"
            style={{
              background:
                lang === "hi"
                  ? "linear-gradient(135deg, #0d9488, #059669)"
                  : "transparent",
              color: lang === "hi" ? "#fff" : "#374151",
              fontFamily: "'Noto Sans Devanagari', sans-serif",
            }}
            aria-pressed={lang === "hi"}
          >
            🇮🇳 हिंदी
          </button>
        </div>
      </div>

      {/* Top Offer Banner */}
      <div className="w-full bg-gradient-to-r from-green-900 to-emerald-700 py-2.5 px-4 text-center flex flex-wrap items-center justify-center gap-2">
        <span className="text-white/70 text-sm line-through">Rs. 499</span>
        <span className="text-yellow-300 font-black text-lg">
          Just Rs. 1 Today!
        </span>
        <span className="bg-yellow-400 text-gray-900 text-xs font-black px-2 py-0.5 rounded-full">
          LIMITED OFFER
        </span>
        <span className="text-white/80 text-xs">
          Get your personalised Wellness Assessment Report
        </span>
      </div>

      {/* Hero Tagline */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="w-full relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #064e3b 0%, #065f46 40%, #047857 70%, #059669 100%)",
          boxShadow: "0 4px 20px rgba(6,78,59,0.45)",
        }}
      >
        {/* subtle shine overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%)",
          }}
        />
        <div className="max-w-4xl mx-auto px-4 py-6 text-center relative">
          <p
            className="text-2xl sm:text-3xl md:text-4xl font-display font-black italic text-white tracking-tight"
            style={{
              textShadow:
                "0 2px 16px rgba(0,0,0,0.45), 0 0 32px rgba(167,243,208,0.25)",
              lineHeight: 1.25,
              fontFamily:
                lang === "hi"
                  ? "'Noto Sans Devanagari', sans-serif"
                  : undefined,
            }}
          >
            {t.tagline}
          </p>
        </div>
      </motion.div>

      {/* Banner */}
      <div className="w-full max-w-4xl mx-auto px-4 pt-5">
        <img
          src="/assets/uploads/IMG-20260306-WA0009-1.jpg"
          alt="HN Coach Wellness Transformation"
          className="w-full rounded-2xl shadow-md object-cover"
        />
      </div>

      {/* Main */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8">
        <WellnessAssessment lang={lang} t={t} />
      </main>

      {/* 30 Days Money Back Guarantee Surprise */}
      <div className="w-full max-w-4xl mx-auto px-4 pt-6 pb-2">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 24 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative overflow-hidden rounded-2xl text-center"
          style={{
            background:
              "linear-gradient(135deg, #fffbeb 0%, #fef3c7 50%, #fde68a 100%)",
            border: "3px solid #f59e0b",
            boxShadow:
              "0 8px 32px rgba(245,158,11,0.35), 0 0 0 6px rgba(245,158,11,0.1)",
          }}
        >
          {/* sparkle dots */}
          <div className="absolute top-3 left-5 text-2xl opacity-40">🎁</div>
          <div className="absolute top-3 right-5 text-2xl opacity-40">🎁</div>
          <div className="px-6 py-8">
            <motion.div
              initial={{ rotate: -6, scale: 0.8 }}
              whileInView={{ rotate: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: 0.2,
                type: "spring",
                stiffness: 200,
              }}
              className="inline-block px-5 py-2 rounded-full font-extrabold text-sm tracking-widest uppercase mb-4"
              style={{
                background: "linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)",
                color: "#fff",
                boxShadow: "0 4px 16px rgba(245,158,11,0.5)",
                letterSpacing: "0.1em",
              }}
            >
              {t.surpriseOffer}
            </motion.div>
            <h2
              className="text-3xl sm:text-4xl font-black text-amber-900 mb-3 leading-tight"
              style={{ textShadow: "0 2px 8px rgba(120,53,15,0.15)" }}
            >
              {t.guarantee}
            </h2>
            <p
              className="text-amber-800 text-base sm:text-lg font-semibold max-w-xl mx-auto leading-relaxed mb-5"
              style={
                lang === "hi"
                  ? { fontFamily: "'Noto Sans Devanagari', sans-serif" }
                  : undefined
              }
            >
              {t.guaranteeDesc}
            </p>
            <p
              className="text-amber-700 text-sm font-medium mb-6"
              style={
                lang === "hi"
                  ? { fontFamily: "'Noto Sans Devanagari', sans-serif" }
                  : undefined
              }
            >
              {t.guaranteeCommit}
            </p>
          </div>
        </motion.div>
      </div>

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
              {t.exclusiveOpp}
            </div>
            <h2
              className="text-2xl sm:text-3xl font-extrabold text-white mb-3 leading-tight"
              style={{ textShadow: "0 2px 12px rgba(0,0,0,0.5)" }}
            >
              <span
                style={
                  lang === "hi"
                    ? { fontFamily: "'Noto Sans Devanagari', sans-serif" }
                    : undefined
                }
              >
                {t.joinTeamTitle}
              </span>
            </h2>
            <p
              className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed mb-3"
              style={
                lang === "hi"
                  ? { fontFamily: "'Noto Sans Devanagari', sans-serif" }
                  : undefined
              }
            >
              {t.joinTeamDesc}
            </p>
            <p
              className="text-yellow-300 font-semibold text-sm sm:text-base mb-5"
              style={
                lang === "hi"
                  ? { fontFamily: "'Noto Sans Devanagari', sans-serif" }
                  : undefined
              }
            >
              {t.joinTeamEarn}
            </p>
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
    </div>
  );
}
