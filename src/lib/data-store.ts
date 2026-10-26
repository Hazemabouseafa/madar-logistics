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
const ADMIN_FILE = path.join(DATA_DIR, "admin.json");

// Initial empty messages list for clean production readiness
const INITIAL_MESSAGES: ContactMessage[] = [];

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
interface AdminStoredUser {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  role: string;
}

const DEFAULT_ADMIN: AdminStoredUser = {
  id: "admin_super",
  email: "admin@madartrans.com",
  // Hash for 'MadarAdmin2025!'
  passwordHash: bcrypt.hashSync("MadarAdmin2025!", 10),
  name: "مدير مدار للنقل",
  role: "ADMIN",
};

export async function getAdminUser(email: string): Promise<AdminStoredUser | null> {
  const normalizedEmail = email.trim().toLowerCase();

  // 1. Try PostgreSQL AdminUser
  if (process.env.DATABASE_URL) {
    try {
      const dbAdmin = await prisma.adminUser.findUnique({
        where: { email: normalizedEmail },
      });
      if (dbAdmin) {
        return {
          id: dbAdmin.id,
          email: dbAdmin.email,
          passwordHash: dbAdmin.passwordHash,
          name: dbAdmin.name,
          role: dbAdmin.role,
        };
      }
    } catch {
      // Fallback
    }
  }

  // 2. Try Local File admin.json fallback
  const fileAdmin = readJsonFile<AdminStoredUser | null>(ADMIN_FILE, null);
  if (fileAdmin && fileAdmin.email && fileAdmin.email.toLowerCase() === normalizedEmail) {
    return fileAdmin;
  }

  // 3. Fallback to DEFAULT_ADMIN if email matches
  if (normalizedEmail === DEFAULT_ADMIN.email.toLowerCase()) {
    return DEFAULT_ADMIN;
  }

  return null;
}

export async function verifyAdminCredentials(email: string, pass: string) {
  const admin = await getAdminUser(email);
  if (!admin) return null;

  const valid = bcrypt.compareSync(pass, admin.passwordHash);
  if (valid) {
    return {
      id: admin.id,
      email: admin.email,
      name: admin.name,
      role: admin.role,
    };
  }
  return null;
}

export async function updateAdminPassword(email: string, currentPass: string, newPass: string) {
  const admin = await getAdminUser(email);
  if (!admin) {
    throw new Error("المستخدم غير موجود");
  }

  const isCurrentValid = bcrypt.compareSync(currentPass, admin.passwordHash);
  if (!isCurrentValid) {
    throw new Error("كلمة المرور الحالية غير صحيحة");
  }

  if (newPass.length < 8) {
    throw new Error("يجب ألا تقل كلمة المرور الجديدة عن 8 أحرف");
  }

  const newHash = bcrypt.hashSync(newPass, 10);
  const updatedUser: AdminStoredUser = {
    ...admin,
    passwordHash: newHash,
  };

  // 1. Persist to PostgreSQL if available
  if (process.env.DATABASE_URL) {
    try {
      await prisma.adminUser.upsert({
        where: { email: admin.email.toLowerCase() },
        update: {
          passwordHash: newHash,
          updatedAt: new Date(),
        },
        create: {
          id: admin.id || "admin_super",
          email: admin.email.toLowerCase(),
          passwordHash: newHash,
          name: admin.name || "مدير مدار للنقل",
          role: admin.role || "ADMIN",
        },
      });
    } catch (err) {
      console.error("Error updating admin password in PostgreSQL database:", err);
    }
  }

  // 2. Persist to Local File (always works, even without DB or in fallback mode)
  writeJsonFile<AdminStoredUser>(ADMIN_FILE, updatedUser);

  return {
    success: true,
    message: "تم تحديث كلمة المرور بنجاح",
  };
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
