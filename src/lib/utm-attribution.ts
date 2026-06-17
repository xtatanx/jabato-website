const UTM_STORAGE_KEY = "jabato_utm_attribution";

const UTM_PARAM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
] as const;

export type UtmParamKey = (typeof UTM_PARAM_KEYS)[number];

export type UtmAttribution = Partial<Record<UtmParamKey, string>>;

export function captureUtmFromUrl(search = window.location.search): void {
  const params = new URLSearchParams(search);
  const attribution: UtmAttribution = {};

  for (const key of UTM_PARAM_KEYS) {
    const value = params.get(key);
    if (value) {
      attribution[key] = value;
    }
  }

  if (Object.keys(attribution).length === 0) {
    return;
  }

  sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(attribution));
}

export function getUtmAttribution(): UtmAttribution {
  try {
    const stored = sessionStorage.getItem(UTM_STORAGE_KEY);
    if (!stored) {
      return {};
    }

    return JSON.parse(stored) as UtmAttribution;
  } catch {
    return {};
  }
}
