import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed for Madar Logistics...");

  // Seed Admin User
  const adminEmail = "admin@madartrans.com";
  const passwordHash = await bcrypt.hash("MadarAdmin2025!", 10);

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
    { key: "google_maps_url", value: "https://maps.app.goo.gl/WtFERuC1uf81Yzns8?g_st=iw", description: "رابط موقع الشركة على خرائط جوجل" },
    { key: "phone_number", value: "+20 10 50028330", description: "رقم الهاتف المباشر" },
    { key: "company_email", value: "info@madartrans.com", description: "البريد الإلكتروني الرسمي" },
    { key: "address_ar", value: "جمهورية مصر العربية - مكاتب الشحن وخدمات الموانئ البحرية (الإسكندرية، الدخيلة، دمياط، بورسعيد، السخنة)", description: "العنوان باللغة العربية" },
    { key: "address_en", value: "Egypt - Seaport Transport Hubs (Alexandria, El-Dekheila, Damietta, Port Said, Sokhna)", description: "العنوان باللغة الإنجليزية" },
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

  // Seed Initial Messages
  const messagesCount = await prisma.message.count();
  if (messagesCount === 0) {
    await prisma.message.createMany({
      data: [
        {
          name: "أحمد مصطفى (شركة النيل للصناعات الغذائية)",
          phone: "01012345678",
          serviceType: "حاويات مبردة",
          message: "نحتاج لنقل 4 حاويات مبردة 40 قدم محملة بالفراولة المجمدة من مزارع النوبارية إلى ميناء الدخيلة مع الحفاظ على درجة حرارة -18 مئوية ومولدات كهربائية متواصلة.",
          status: "NEW",
          notes: "طلب عاجل لتنسيق باخرة الشحن يوم الخميس.",
        },
        {
          name: "م. إبراهيم كمال (المتحدة للاستيراد والتصدير)",
          phone: "01289876543",
          serviceType: "حاويات جافة",
          message: "استفسار عن حجز شاحنات لنقل 6 حاويات جافة 40 قدم High Cube من ميناء الإسكندرية إلى المنطقة الصناعية بالسادس من أكتوبر بعد إنهاء الإفراج الجمركي.",
          status: "IN_PROGRESS",
          notes: "تم الاتصال بالعميل وتجهيز عرض السعر وجاري إرسال المستندات.",
        },
        {
          name: "سارة عبد الرحمن (فارما كير للأدوية)",
          phone: "01155443322",
          serviceType: "حاويات مبردة",
          message: "طلب توريد شاحنات تبريد معتمدة لنقل شحنة محاليل ومستلزمات طبية مستوردة من ميناء دمياط إلى مستودعات العبور مع تقديم سجل درجات الحرارة لحظياً.",
          status: "COMPLETED",
          notes: "تم تنفيذ النقل بنجاح وتسليم إيصالات الاستلام والمستندات.",
        },
      ],
    });
    console.log("✅ Seeded initial demo inquiries");
  }

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
