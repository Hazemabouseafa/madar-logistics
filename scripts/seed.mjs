import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed for Madar Logistics...");

  // Seed Admin User
  const adminEmail = "admin@madartrans.com";
  const passwordHash = await bcrypt.hash("adminpassword2026!", 10);

  const admin = await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: { passwordHash },
    create: {
      email: adminEmail,
      name: "مدير مدار للنقل",
      passwordHash,
      role: "ADMIN",
    },
  });
  console.log(`✅ Admin user seeded: ${admin.email}`);

  // Seed Default Settings
  const settings = [
    { key: "whatsapp_number", value: "201050028330", description: "رقم واتساب للتواصل السريع" },
    { key: "whatsapp_display", value: "+20 10 50028330", description: "نص عرض رقم واتساب" },
    { key: "google_maps_url", value: "https://maps.google.com/?q=31.4422793,31.7658919&entry=gps&shh=CAE&lucs=,94297699,94231188,94280568,100821555,47071704,94218641,94282134,100835694,100840646,94286869,100820247,100822504,100838877,121816461&g_st=iw", description: "رابط موقع الشركة على خرائط جوجل" },
    { key: "phone_number", value: "+20 10 50028330", description: "رقم الهاتف المباشر" },
    { key: "company_email", value: "info@madartrans.com", description: "البريد الإلكتروني الرسمي" },
    { key: "address_ar", value: "جمهورية مصر العربية - مكاتب الشحن وخدمات الموانئ البحرية (دمياط، بورسعيد، الإسكندرية، الدخيلة، السخنة)", description: "العنوان باللغة العربية" },
    { key: "address_en", value: "Egypt - Seaport Transport Hubs (Damietta, Port Said, Alexandria, El-Dekheila, Sokhna)", description: "العنوان باللغة الإنجليزية" },
    { key: "working_hours", value: "السبت - الخميس: 8:00 ص - 6:00 م (خدمة الطوارئ وغرفة العمليات 24/7)", description: "ساعات العمل الرسمية" },
  ];

  for (const s of settings) {
    await prisma.setting.upsert({
      where: { key: s.key },
      update: { value: s.value, description: s.description },
      create: s,
    });
  }
  console.log(`✅ Seeded ${settings.length} global settings`);

  console.log("🚀 Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
