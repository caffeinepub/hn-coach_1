import { Badge } from "@/components/ui/badge";
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
import { Activity, Droplets, Flame, Footprints, Scale } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

// ── Ideal Weight Calculator ──────────────────────────────────────────────────
function IdealWeightCard() {
  const [height, setHeight] = useState("");
  const [gender, setGender] = useState<string>("");
  const [result, setResult] = useState<string | null>(null);

  const calculate = () => {
    const h = Number.parseFloat(height);
    if (!h || !gender) return;
    const heightIn = h / 2.54;
    let weight: number;
    if (gender === "male") {
      weight = 50 + 2.3 * (heightIn - 60);
    } else {
      weight = 45.5 + 2.3 * (heightIn - 60);
    }
    setResult(`${weight.toFixed(1)} kg`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      <Card
        data-ocid="ideal_weight.card"
        className="shadow-sm hover:shadow-md transition-shadow duration-200"
      >
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2.5 font-display text-lg text-foreground">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
              <Scale className="w-4 h-4 text-primary" />
            </span>
            Ideal Weight
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label
              htmlFor="iw-height"
              className="text-sm font-medium text-foreground/80"
            >
              Height (cm)
            </Label>
            <Input
              id="iw-height"
              type="number"
              placeholder="e.g. 170"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="h-10"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-sm font-medium text-foreground/80">
              Gender
            </Label>
            <Select value={gender} onValueChange={setGender}>
              <SelectTrigger className="h-10">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            data-ocid="ideal_weight.primary_button"
            className="w-full h-10 font-semibold"
            onClick={calculate}
          >
            Calculate
          </Button>
          {result && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-xl bg-result-bg border border-result-border p-4 text-center relative overflow-hidden"
            >
              <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl bg-primary" />
              <p className="text-xs font-semibold text-muted-foreground mb-1 uppercase tracking-wide">
                Ideal Weight (Devine Formula)
              </p>
              <p className="text-3xl font-display font-bold text-primary">
                {result}
              </p>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

// ── BMI Calculator ───────────────────────────────────────────────────────────
function BMICard() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [result, setResult] = useState<{
    value: number;
    category: string;
    color: string;
  } | null>(null);

  const calculate = () => {
    const h = Number.parseFloat(height) / 100;
    const w = Number.parseFloat(weight);
    if (!h || !w) return;
    const bmi = w / (h * h);
    let category: string;
    let color: string;
    if (bmi < 18.5) {
      category = "Underweight";
      color = "bg-blue-50 text-blue-700 border-blue-200";
    } else if (bmi < 25) {
      category = "Normal";
      color = "bg-green-50 text-green-700 border-green-200";
    } else if (bmi < 30) {
      category = "Overweight";
      color = "bg-amber-50 text-amber-700 border-amber-200";
    } else {
      category = "Obese";
      color = "bg-red-50 text-red-700 border-red-200";
    }
    setResult({ value: bmi, category, color });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <Card
        data-ocid="bmi.card"
        className="shadow-sm hover:shadow-md transition-shadow duration-200"
      >
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2.5 font-display text-lg text-foreground">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
              <Activity className="w-4 h-4 text-primary" />
            </span>
            BMI
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label
              htmlFor="bmi-height"
              className="text-sm font-medium text-foreground/80"
            >
              Height (cm)
            </Label>
            <Input
              id="bmi-height"
              type="number"
              placeholder="e.g. 170"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="h-10"
            />
          </div>
          <div className="space-y-1.5">
            <Label
              htmlFor="bmi-weight"
              className="text-sm font-medium text-foreground/80"
            >
              Weight (kg)
            </Label>
            <Input
              id="bmi-weight"
              type="number"
              placeholder="e.g. 70"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="h-10"
            />
          </div>
          <Button
            data-ocid="bmi.primary_button"
            className="w-full h-10 font-semibold"
            onClick={calculate}
          >
            Calculate
          </Button>
          {result && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-xl bg-result-bg border border-result-border p-4 text-center space-y-1.5 relative overflow-hidden"
            >
              <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl bg-primary" />
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Body Mass Index
              </p>
              <p className="text-3xl font-display font-bold text-primary">
                {result.value.toFixed(1)}
              </p>
              <span
                className={`inline-block text-xs font-semibold px-3 py-1 rounded-full border ${result.color}`}
              >
                {result.category}
              </span>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

// ── BMR Calculator ───────────────────────────────────────────────────────────
function BMRCard() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState<string>("");
  const [result, setResult] = useState<string | null>(null);

  const calculate = () => {
    const w = Number.parseFloat(weight);
    const h = Number.parseFloat(height);
    const a = Number.parseFloat(age);
    if (!w || !h || !a || !gender) return;
    let bmr: number;
    if (gender === "male") {
      bmr = 10 * w + 6.25 * h - 5 * a + 5;
    } else {
      bmr = 10 * w + 6.25 * h - 5 * a - 161;
    }
    setResult(`${Math.round(bmr).toLocaleString()} kcal/day`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
    >
      <Card
        data-ocid="bmr.card"
        className="shadow-sm hover:shadow-md transition-shadow duration-200"
      >
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2.5 font-display text-lg text-foreground">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
              <Flame className="w-4 h-4 text-primary" />
            </span>
            BMR
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label
                htmlFor="bmr-weight"
                className="text-sm font-medium text-foreground/80"
              >
                Weight (kg)
              </Label>
              <Input
                id="bmr-weight"
                type="number"
                placeholder="70"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="h-10"
              />
            </div>
            <div className="space-y-1.5">
              <Label
                htmlFor="bmr-height"
                className="text-sm font-medium text-foreground/80"
              >
                Height (cm)
              </Label>
              <Input
                id="bmr-height"
                type="number"
                placeholder="170"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="h-10"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label
                htmlFor="bmr-age"
                className="text-sm font-medium text-foreground/80"
              >
                Age (years)
              </Label>
              <Input
                id="bmr-age"
                type="number"
                placeholder="30"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="h-10"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-foreground/80">
                Gender
              </Label>
              <Select value={gender} onValueChange={setGender}>
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button
            data-ocid="bmr.primary_button"
            className="w-full h-10 font-semibold"
            onClick={calculate}
          >
            Calculate
          </Button>
          {result && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-xl bg-result-bg border border-result-border p-4 text-center relative overflow-hidden"
            >
              <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl bg-primary" />
              <p className="text-xs font-semibold text-muted-foreground mb-1 uppercase tracking-wide">
                Basal Metabolic Rate
              </p>
              <p className="text-3xl font-display font-bold text-primary">
                {result}
              </p>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

// ── Daily Water Intake Calculator ────────────────────────────────────────────
function WaterCard() {
  const [weight, setWeight] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const calculate = () => {
    const w = Number.parseFloat(weight);
    if (!w) return;
    const ml = w * 35;
    const liters = ml / 1000;
    setResult(`${liters.toFixed(1)} L / day`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.4 }}
    >
      <Card
        data-ocid="water.card"
        className="shadow-sm hover:shadow-md transition-shadow duration-200"
      >
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2.5 font-display text-lg text-foreground">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
              <Droplets className="w-4 h-4 text-primary" />
            </span>
            Daily Water Intake
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label
              htmlFor="water-weight"
              className="text-sm font-medium text-foreground/80"
            >
              Weight (kg)
            </Label>
            <Input
              id="water-weight"
              type="number"
              placeholder="e.g. 70"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="h-10"
            />
          </div>
          <Button
            data-ocid="water.primary_button"
            className="w-full h-10 font-semibold"
            onClick={calculate}
          >
            Calculate
          </Button>
          {result && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-xl bg-result-bg border border-result-border p-4 text-center relative overflow-hidden"
            >
              <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl bg-primary" />
              <p className="text-xs font-semibold text-muted-foreground mb-1 uppercase tracking-wide">
                Recommended Daily Water
              </p>
              <p className="text-3xl font-display font-bold text-primary">
                {result}
              </p>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

// ── Daily Footsteps Calculator ───────────────────────────────────────────────
function FootstepsCard() {
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [result, setResult] = useState<{ steps: string; note: string } | null>(
    null,
  );

  const calculate = () => {
    const a = Number.parseFloat(age);
    const w = Number.parseFloat(weight);
    if (!a || !w) return;
    if (a > 60 || w > 100) {
      setResult({
        steps: "7,000 – 8,000 steps/day",
        note: "Adjusted for age/weight",
      });
    } else {
      setResult({ steps: "10,000 steps/day", note: "Standard recommendation" });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.5 }}
    >
      <Card
        data-ocid="footsteps.card"
        className="shadow-sm hover:shadow-md transition-shadow duration-200"
      >
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2.5 font-display text-lg text-foreground">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
              <Footprints className="w-4 h-4 text-primary" />
            </span>
            Daily Footsteps
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label
                htmlFor="steps-age"
                className="text-sm font-medium text-foreground/80"
              >
                Age (years)
              </Label>
              <Input
                id="steps-age"
                type="number"
                placeholder="30"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="h-10"
              />
            </div>
            <div className="space-y-1.5">
              <Label
                htmlFor="steps-weight"
                className="text-sm font-medium text-foreground/80"
              >
                Weight (kg)
              </Label>
              <Input
                id="steps-weight"
                type="number"
                placeholder="70"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="h-10"
              />
            </div>
          </div>
          <Button
            data-ocid="footsteps.primary_button"
            className="w-full h-10 font-semibold"
            onClick={calculate}
          >
            Calculate
          </Button>
          {result && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-xl bg-result-bg border border-result-border p-4 text-center space-y-1.5 relative overflow-hidden"
            >
              <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl bg-primary" />
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Recommended Daily Steps
              </p>
              <p className="text-2xl font-display font-bold text-primary">
                {result.steps}
              </p>
              <Badge variant="secondary" className="text-xs font-semibold">
                {result.note}
              </Badge>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

// ── YouTube Subscribe Button ─────────────────────────────────────────────────
function YouTubeButton() {
  return (
    <a
      data-ocid="youtube.button"
      href="https://youtube.com/@hn_coach?si=RhYfRtvtfq8TD79D"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-[25.5rem] z-50 flex items-center gap-2.5 px-5 py-3.5 rounded-full shadow-xl hover:shadow-2xl hover:brightness-110 transition-all duration-200 hover:scale-105 active:scale-100"
      style={{ background: "#FF0000" }}
      aria-label="Subscribe on YouTube"
    >
      <svg
        viewBox="0 0 24 24"
        fill="white"
        className="w-5 h-5 flex-shrink-0"
        aria-hidden="true"
      >
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
      <div className="flex flex-col leading-none">
        <span className="text-white font-bold text-sm whitespace-nowrap">
          Subscribe
        </span>
        <span className="text-white/80 text-xs font-medium whitespace-nowrap">
          YouTube
        </span>
      </div>
    </a>
  );
}

// ── Instagram Follow Button ──────────────────────────────────────────────────
function InstagramButton() {
  return (
    <a
      data-ocid="instagram.button"
      href="https://www.instagram.com/hn_coach?igsh=cXRobXd0MDVhenlp"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-[13rem] z-50 flex items-center gap-2.5 px-5 py-3.5 rounded-full shadow-xl hover:shadow-2xl hover:brightness-110 transition-all duration-200 hover:scale-105 active:scale-100"
      style={{
        background:
          "linear-gradient(135deg, #f58529 0%, #dd2a7b 50%, #8134af 100%)",
      }}
      aria-label="Follow on Instagram"
    >
      <svg
        viewBox="0 0 24 24"
        fill="white"
        className="w-5 h-5 flex-shrink-0"
        aria-hidden="true"
      >
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
      <div className="flex flex-col leading-none">
        <span className="text-white font-bold text-sm whitespace-nowrap">
          Follow Us
        </span>
        <span className="text-white/80 text-xs font-medium whitespace-nowrap">
          Instagram
        </span>
      </div>
    </a>
  );
}

// ── WhatsApp Floating Button ─────────────────────────────────────────────────
function WhatsAppButton() {
  return (
    <a
      data-ocid="whatsapp.button"
      href="https://wa.me/919155348866"
      target="_blank"
      rel="noopener noreferrer"
      className="wa-pulse fixed bottom-6 right-5 z-50 flex items-center gap-2.5 px-5 py-3.5 rounded-full bg-whatsapp shadow-xl hover:shadow-2xl hover:brightness-110 transition-all duration-200 hover:scale-105 active:scale-100"
      aria-label="WhatsApp Personal Coaching"
    >
      <svg
        viewBox="0 0 24 24"
        fill="white"
        className="w-5 h-5 flex-shrink-0"
        aria-hidden="true"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
      <div className="flex flex-col leading-none">
        <span className="text-white font-bold text-sm whitespace-nowrap">
          Personal Coaching
        </span>
        <span className="text-white/80 text-xs font-medium whitespace-nowrap">
          Chat on WhatsApp
        </span>
      </div>
    </a>
  );
}

// ── App ──────────────────────────────────────────────────────────────────────
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
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <IdealWeightCard />
          <BMICard />
          <BMRCard />
          <WaterCard />
          <FootstepsCard />
        </div>
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

      {/* YouTube Subscribe Button */}
      <YouTubeButton />

      {/* Instagram Follow Button */}
      <InstagramButton />

      {/* WhatsApp Floating Button */}
      <WhatsAppButton />
    </div>
  );
}
