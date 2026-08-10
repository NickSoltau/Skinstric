const RACE_LABELS = {
  "east asian": "East Asian",
  white: "White",
  black: "Black",
  "south asian": "South Asian",
  "latino hispanic": "Latino Hispanic",
  "southeast asian": "South East Asian",
  "middle eastern": "Middle Eastern",
};

const AGE_BUCKETS = [
  { key: "0-9", sourceKeys: ["0-2", "3-9"] },
  { key: "10-19", sourceKeys: ["10-19"] },
  { key: "20-29", sourceKeys: ["20-29"] },
  { key: "30-39", sourceKeys: ["30-39"] },
  { key: "40-49", sourceKeys: ["40-49"] },
  { key: "50-59", sourceKeys: ["50-59"] },
  { key: "60-69", sourceKeys: ["60-69"] },
  { key: "70+", sourceKeys: ["70+"] },
];

function toPercent(fraction) {
  return Number((fraction * 100).toFixed(2));
}

export function transformRace(raceData) {
  if (!raceData) return [];
  return Object.entries(raceData)
    .map(([key, fraction]) => ({
      key: key.replace(/\s+/g, "-"),
      label: RACE_LABELS[key] ?? key,
      percent: toPercent(fraction),
    }))
    .sort((a, b) => b.percent - a.percent);
}

export function transformAge(ageData) {
  if (!ageData) return [];
  return AGE_BUCKETS.map(({ key, sourceKeys }) => {
    const sum = sourceKeys.reduce((total, k) => total + (ageData[k] ?? 0), 0);
    return { key, label: key, percent: toPercent(sum) };
  }).sort((a, b) => b.percent - a.percent);
}

export function transformSex(genderData) {
  if (!genderData) return [];
  return [
    { key: "female", label: "FEMALE", percent: toPercent(genderData.female ?? 0) },
    { key: "male", label: "MALE", percent: toPercent(genderData.male ?? 0) },
  ].sort((a, b) => b.percent - a.percent);
}

export function topKey(options) {
  if (!options.length) return null;
  return options.reduce((best, o) => (o.percent > best.percent ? o : best)).key;
}