import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";
import { ContactMessage, MessageStatus, SiteSettings, DashboardStats } from "./types";
import { DEFAULT_SETTINGS } from "./default-settings";

// Local storage directory fallback
const DATA_DIR = path.join(process.cwd(), ".data");
const MESSAGES_FILE = path.join(DATA_DIR, "messages.json");
const SETTINGS_FILE = path.join(DATA_DIR, "settings.json");

// Default seed messages for realistic initial dashboard view
const INITIAL_MESSAGES: ContactMessage[] = [
  {
    id: "msg_seed_1",
    name: "أحمد مصطفى (شركة النيل للصناعات الغذائية)",
    phone: "01012345678",
    serviceType: "حاويات مبردة",
    message: "نحتاج لنقل 4 حاويات مبردة 40 قدم محملة بالفراولة المجمدة من مزارع النوبارية إلى ميناء الدخيلة مع الحفاظ على درجة حرارة -18 مئوية ومولدات كهربائية متواصلة.",
    status: "NEW",
    notes: "طلب عاجل لتنسيق باخرة الشحن يوم الخميس.",
    createdAt: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
  },
  {
    id: "msg_seed_2",
    name: "م. إبراهيم كمال (المتحدة للاستيراد والتصدير)",
    phone: "01289876543",
    serviceType: "حاويات جافة",
    message: "استفسار عن حجز شاحنات لنقل 6 حاويات جافة 40 قدم High Cube من ميناء الإسكندرية إلى المنطقة الصناعية بالسادس من أكتوبر بعد إنهاء الإفراج الجمركي.",
    status: "IN_PROGRESS",
    notes: "تم الاتصال بالعميل وتجهيز عرض السعر وجاري إرسال المستندات.",
    createdAt: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
  },
  {
    id: "msg_seed_3",
    name: "سارة عبد الرحمن (فارما كير للأدوية)",
    phone: "01155443322",
    serviceType: "حاويات مبردة",
    message: "طلب توريد شاحنات تبريد معتمدة لنقل شحنة محاليل ومستلزمات طبية مستوردة من ميناء دمياط إلى مستودعات العبور مع تقديم سجل درجات الحرارة لحظياً.",
    status: "COMPLETED",
    notes: "تم تنفيذ النقل بنجاح وتسليم إيصالات الاستلام والمستندات.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
  },
];

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function readJsonFile<T>(filePath: string, fallback: T): T {
  try {
    ensureDataDir();
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify(fallback, null, 2), "utf-8");
      return fallback;
    }
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data) as T;
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error);
    return fallback;
  }
}

function writeJsonFile<T>(filePath: string, data: T): void {
  try {
    ensureDataDir();
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error(`Error writing to ${filePath}:`, error);
  }
}

// ---------------------------------------------------------------------------
// Messages Management
// ---------------------------------------------------------------------------
export async function getMessages(filters?: { status?: string; search?: string }): Promise<ContactMessage[]> {
  const messages = readJsonFile<ContactMessage[]>(MESSAGES_FILE, INITIAL_MESSAGES);
  let result = [...messages];

  if (filters?.status && filters.status !== "ALL") {
    result = result.filter((m) => m.status === filters.status);
  }

  if (filters?.search && filters.search.trim()) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.phone.toLowerCase().includes(q) ||
        m.serviceType.toLowerCase().includes(q) ||
        m.message.toLowerCase().includes(q)
    );
  }

  return result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function getMessageById(id: string): Promise<ContactMessage | null> {
  const messages = readJsonFile<ContactMessage[]>(MESSAGES_FILE, INITIAL_MESSAGES);
  return messages.find((m) => m.id === id) || null;
}

export async function createMessage(input: {
  name: string;
  phone: string;
  serviceType: string;
  message: string;
}): Promise<ContactMessage> {
  const messages = readJsonFile<ContactMessage[]>(MESSAGES_FILE, INITIAL_MESSAGES);
  const newMessage: ContactMessage = {
    id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    name: input.name.trim(),
    phone: input.phone.trim(),
    serviceType: input.serviceType.trim(),
    message: input.message.trim(),
    status: "NEW",
    notes: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  messages.unshift(newMessage);
  writeJsonFile(MESSAGES_FILE, messages);
  return newMessage;
}

export async function updateMessageStatus(
  id: string,
  status: MessageStatus,
  notes?: string
): Promise<ContactMessage | null> {
  const messages = readJsonFile<ContactMessage[]>(MESSAGES_FILE, INITIAL_MESSAGES);
  const index = messages.findIndex((m) => m.id === id);
  if (index === -1) return null;

  messages[index] = {
    ...messages[index],
    status,
    notes: notes !== undefined ? notes : messages[index].notes,
    updatedAt: new Date().toISOString(),
  };

  writeJsonFile(MESSAGES_FILE, messages);
  return messages[index];
}

export async function deleteMessage(id: string): Promise<boolean> {
  const messages = readJsonFile<ContactMessage[]>(MESSAGES_FILE, INITIAL_MESSAGES);
  const filtered = messages.filter((m) => m.id !== id);
  if (filtered.length === messages.length) return false;

  writeJsonFile(MESSAGES_FILE, filtered);
  return true;
}

// ---------------------------------------------------------------------------
// Global Settings Management
// ---------------------------------------------------------------------------
export async function getSiteSettings(): Promise<SiteSettings> {
  const saved = readJsonFile<Partial<SiteSettings>>(SETTINGS_FILE, DEFAULT_SETTINGS);
  return {
    ...DEFAULT_SETTINGS,
    ...saved,
    ports_list: Array.isArray(saved.ports_list) && saved.ports_list.length > 0 
      ? saved.ports_list 
      : DEFAULT_SETTINGS.ports_list,
  };
}

export async function updateSiteSettings(updates: Partial<SiteSettings>): Promise<SiteSettings> {
  const current = await getSiteSettings();
  const merged: SiteSettings = {
    ...current,
    ...updates,
  };
  writeJsonFile(SETTINGS_FILE, merged);
  return merged;
}

// ---------------------------------------------------------------------------
// Admin Authentication & Verification
// ---------------------------------------------------------------------------
const DEFAULT_ADMIN = {
  id: "admin_super",
  email: "admin@madartrans.com",
  // Hash for 'MadarAdmin2025!'
  passwordHash: bcrypt.hashSync("MadarAdmin2025!", 10),
  name: "مدير مدار للنقل",
  role: "ADMIN",
};

export async function verifyAdminCredentials(email: string, pass: string) {
  if (email.trim().toLowerCase() === DEFAULT_ADMIN.email.toLowerCase()) {
    const valid = bcrypt.compareSync(pass, DEFAULT_ADMIN.passwordHash);
    if (valid) {
      return {
        id: DEFAULT_ADMIN.id,
        email: DEFAULT_ADMIN.email,
        name: DEFAULT_ADMIN.name,
        role: DEFAULT_ADMIN.role,
      };
    }
  }
  return null;
}

// ---------------------------------------------------------------------------
// Stats
// ---------------------------------------------------------------------------
export async function getDashboardStats(): Promise<DashboardStats> {
  const messages = await getMessages();
  return {
    totalMessages: messages.length,
    newMessages: messages.filter((m) => m.status === "NEW").length,
    inProgressMessages: messages.filter((m) => m.status === "IN_PROGRESS").length,
    completedMessages: messages.filter((m) => m.status === "COMPLETED").length,
  };
}
