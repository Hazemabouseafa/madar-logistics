import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";
import { ContactMessage, MessageStatus, SiteSettings, DashboardStats } from "./types";
import { DEFAULT_SETTINGS } from "./default-settings";
import prisma from "./db";

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
  // 1. Try PostgreSQL Database
  if (process.env.DATABASE_URL) {
    try {
      const where: any = {};
      if (filters?.status && filters.status !== "ALL") {
        where.status = filters.status;
      }
      if (filters?.search && filters.search.trim()) {
        const q = filters.search.trim();
        where.OR = [
          { name: { contains: q, mode: "insensitive" } },
          { phone: { contains: q } },
          { serviceType: { contains: q, mode: "insensitive" } },
          { message: { contains: q, mode: "insensitive" } },
        ];
      }
      const dbMessages = await prisma.message.findMany({
        where,
        orderBy: { createdAt: "desc" },
      });
      if (dbMessages && dbMessages.length > 0) {
        return dbMessages.map((m) => ({
          id: m.id,
          name: m.name,
          phone: m.phone,
          serviceType: m.serviceType,
          message: m.message,
          status: m.status as MessageStatus,
          notes: m.notes,
          createdAt: m.createdAt.toISOString(),
          updatedAt: m.updatedAt.toISOString(),
        }));
      }
    } catch {
      // Fallback silently to local store
    }
  }

  // 2. Fallback to Local Persistent File Store
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
  if (process.env.DATABASE_URL) {
    try {
      const dbMsg = await prisma.message.findUnique({ where: { id } });
      if (dbMsg) {
        return {
          id: dbMsg.id,
          name: dbMsg.name,
          phone: dbMsg.phone,
          serviceType: dbMsg.serviceType,
          message: dbMsg.message,
          status: dbMsg.status as MessageStatus,
          notes: dbMsg.notes,
          createdAt: dbMsg.createdAt.toISOString(),
          updatedAt: dbMsg.updatedAt.toISOString(),
        };
      }
    } catch {
      // Fallback
    }
  }

  const messages = readJsonFile<ContactMessage[]>(MESSAGES_FILE, INITIAL_MESSAGES);
  return messages.find((m) => m.id === id) || null;
}

export async function createMessage(input: {
  name: string;
  phone: string;
  serviceType: string;
  message: string;
}): Promise<ContactMessage> {
  const localId = `msg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  let savedMessage: ContactMessage = {
    id: localId,
    name: input.name.trim(),
    phone: input.phone.trim(),
    serviceType: input.serviceType.trim(),
    message: input.message.trim(),
    status: "NEW",
    notes: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  // Try PostgreSQL
  if (process.env.DATABASE_URL) {
    try {
      const dbMsg = await prisma.message.create({
        data: {
          name: input.name.trim(),
          phone: input.phone.trim(),
          serviceType: input.serviceType.trim(),
          message: input.message.trim(),
          status: "NEW",
        },
      });
      savedMessage = {
        id: dbMsg.id,
        name: dbMsg.name,
        phone: dbMsg.phone,
        serviceType: dbMsg.serviceType,
        message: dbMsg.message,
        status: dbMsg.status as MessageStatus,
        notes: dbMsg.notes,
        createdAt: dbMsg.createdAt.toISOString(),
        updatedAt: dbMsg.updatedAt.toISOString(),
      };
    } catch {
      // Fallback to local
    }
  }

  // Always mirror to local backup
  const messages = readJsonFile<ContactMessage[]>(MESSAGES_FILE, INITIAL_MESSAGES);
  messages.unshift(savedMessage);
  writeJsonFile(MESSAGES_FILE, messages);

  return savedMessage;
}

export async function updateMessageStatus(
  id: string,
  status: MessageStatus,
  notes?: string
): Promise<ContactMessage | null> {
  let updatedMsg: ContactMessage | null = null;

  if (process.env.DATABASE_URL) {
    try {
      const dbMsg = await prisma.message.update({
        where: { id },
        data: {
          status,
          notes: notes !== undefined ? notes : undefined,
        },
      });
      updatedMsg = {
        id: dbMsg.id,
        name: dbMsg.name,
        phone: dbMsg.phone,
        serviceType: dbMsg.serviceType,
        message: dbMsg.message,
        status: dbMsg.status as MessageStatus,
        notes: dbMsg.notes,
        createdAt: dbMsg.createdAt.toISOString(),
        updatedAt: dbMsg.updatedAt.toISOString(),
      };
    } catch {
      // Fallback
    }
  }

  // Update in local file
  const messages = readJsonFile<ContactMessage[]>(MESSAGES_FILE, INITIAL_MESSAGES);
  const index = messages.findIndex((m) => m.id === id);
  if (index !== -1) {
    messages[index] = {
      ...messages[index],
      status,
      notes: notes !== undefined ? notes : messages[index].notes,
      updatedAt: new Date().toISOString(),
    };
    writeJsonFile(MESSAGES_FILE, messages);
    if (!updatedMsg) updatedMsg = messages[index];
  }

  return updatedMsg;
}

export async function deleteMessage(id: string): Promise<boolean> {
  let deleted = false;

  if (process.env.DATABASE_URL) {
    try {
      await prisma.message.delete({ where: { id } });
      deleted = true;
    } catch {
      // Fallback
    }
  }

  const messages = readJsonFile<ContactMessage[]>(MESSAGES_FILE, INITIAL_MESSAGES);
  const filtered = messages.filter((m) => m.id !== id);
  if (filtered.length !== messages.length) {
    writeJsonFile(MESSAGES_FILE, filtered);
    deleted = true;
  }

  return deleted;
}

// ---------------------------------------------------------------------------
// Global Settings Management
// ---------------------------------------------------------------------------
export async function getSiteSettings(): Promise<SiteSettings> {
  if (process.env.DATABASE_URL) {
    try {
      const row = await prisma.setting.findUnique({
        where: { key: "site_settings" },
      });
      if (row && row.value) {
        const parsed = JSON.parse(row.value);
        return {
          ...DEFAULT_SETTINGS,
          ...parsed,
          ports_list: Array.isArray(parsed.ports_list) && parsed.ports_list.length > 0 
            ? parsed.ports_list 
            : DEFAULT_SETTINGS.ports_list,
        };
      }
    } catch {
      // Fallback
    }
  }

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

  // Always save to persistent JSON
  writeJsonFile(SETTINGS_FILE, merged);

  // Sync to PostgreSQL if connected
  if (process.env.DATABASE_URL) {
    try {
      await prisma.setting.upsert({
        where: { key: "site_settings" },
        update: {
          value: JSON.stringify(merged),
          description: "Global site configuration and CMS copy",
        },
        create: {
          key: "site_settings",
          value: JSON.stringify(merged),
          description: "Global site configuration and CMS copy",
        },
      });
    } catch {
      // Fallback
    }
  }

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
  const normalizedEmail = email.trim().toLowerCase();

  // 1. Try PostgreSQL AdminUser
  if (process.env.DATABASE_URL) {
    try {
      const dbAdmin = await prisma.adminUser.findUnique({
        where: { email: normalizedEmail },
      });
      if (dbAdmin) {
        const valid = bcrypt.compareSync(pass, dbAdmin.passwordHash);
        if (valid) {
          return {
            id: dbAdmin.id,
            email: dbAdmin.email,
            name: dbAdmin.name,
            role: dbAdmin.role,
          };
        }
      }
    } catch {
      // Fallback
    }
  }

  // 2. Default superadmin fallback
  if (normalizedEmail === DEFAULT_ADMIN.email.toLowerCase()) {
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
