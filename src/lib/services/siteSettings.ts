import { db } from "@/lib/firebase/config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { SiteSettings, defaultSiteSettings } from "@/types/siteSettings";

const SETTINGS_REF = doc(db, "siteSettings", "main");

export async function getSiteSettings(): Promise<SiteSettings> {
  const snap = await getDoc(SETTINGS_REF);
  if (!snap.exists()) return defaultSiteSettings;
  return snap.data() as SiteSettings;
}

export async function saveSiteSettings(settings: SiteSettings): Promise<void> {
  await setDoc(SETTINGS_REF, settings);
}
