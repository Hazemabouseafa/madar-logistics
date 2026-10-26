export type MessageStatus = "NEW" | "IN_PROGRESS" | "COMPLETED";

export interface ContactMessage {
  id: string;
  name: string;
  phone: string;
  serviceType: string;
  message: string;
  status: MessageStatus;
  notes?: string | null;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface PortItem {
  name: string;
  role: string;
}

export interface SiteSettings {
  whatsapp_number: string;
  whatsapp_display: string;
  google_maps_url: string;
  phone_number: string;
  company_email: string;
  sales_email?: string;
  address_ar: string;
  address_en: string;
  working_hours: string;
  about_summary: string;

  // Social Media Links
  facebook_url?: string;
  linkedin_url?: string;
  instagram_url?: string;
  twitter_url?: string;

  // Landing Page Content
  hero_badge?: string;
  hero_title?: string;
  hero_subtitle?: string;
  hero_cta_primary?: string;
  hero_cta_whatsapp?: string;

  commitments_badge?: string;
  commitments_title?: string;
  commitments_subtitle?: string;
  commitment_1_title?: string;
  commitment_1_desc?: string;
  commitment_2_title?: string;
  commitment_2_desc?: string;
  commitment_3_title?: string;
  commitment_3_desc?: string;

  about_badge?: string;
  about_title?: string;
  about_desc_1?: string;
  about_desc_2?: string;

  // Ports Coverage Card (قائمة الموانئ التي نخدمها بانتظام)
  ports_card_title?: string;
  ports_card_subtitle?: string;
  ports_card_badge?: string;
  ports_card_callout_title?: string;
  ports_card_callout_subtitle?: string;
  ports_card_cta?: string;
  ports_list?: PortItem[];

  services_badge?: string;
  services_title?: string;
  services_subtitle?: string;
  reefer_title?: string;
  reefer_desc?: string;
  dry_title?: string;
  dry_desc?: string;

  contact_badge?: string;
  contact_title?: string;
  contact_subtitle?: string;
}

export interface AdminUserSession {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface DashboardStats {
  totalMessages: number;
  newMessages: number;
  inProgressMessages: number;
  completedMessages: number;
}
