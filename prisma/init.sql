-- =============================================================================
-- Madar Logistics - Local PostgreSQL Database Initialization
-- Auto-executed by PostgreSQL container on initial startup (/docker-entrypoint-initdb.d)
-- =============================================================================

-- 1. Create Message Table
CREATE TABLE IF NOT EXISTS "Message" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "serviceType" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'NEW',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS "Message_status_idx" ON "Message"("status");
CREATE INDEX IF NOT EXISTS "Message_createdAt_idx" ON "Message"("createdAt");

-- 2. Create Setting Table
CREATE TABLE IF NOT EXISTS "Setting" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "key" TEXT NOT NULL UNIQUE,
    "value" TEXT NOT NULL,
    "description" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 3. Create AdminUser Table
CREATE TABLE IF NOT EXISTS "AdminUser" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL UNIQUE,
    "passwordHash" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'ADMIN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 4. Insert Default Admin User (Password: MadarAdmin2025!)
INSERT INTO "AdminUser" ("id", "email", "passwordHash", "name", "role", "createdAt", "updatedAt")
VALUES (
    'admin_super',
    'admin@madartrans.com',
    '$2a$10$4BD3Gzx28YMVaQ7irGVFqentQRCke0BlrDTxD1p2ls2QddSAgfnle',
    'مدير مدار للنقل',
    'ADMIN',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
)
ON CONFLICT ("email") DO NOTHING;

-- 5. Insert Initial Messages
INSERT INTO "Message" ("id", "name", "phone", "serviceType", "message", "status", "notes", "createdAt", "updatedAt")
VALUES 
(
    'msg_seed_1',
    'أحمد مصطفى (شركة النيل للصناعات الغذائية)',
    '01012345678',
    'حاويات مبردة',
    'نحتاج لنقل 4 حاويات مبردة 40 قدم محملة بالفراولة المجمدة من مزارع النوبارية إلى ميناء الدخيلة مع الحفاظ على درجة حرارة -18 مئوية ومولدات كهربائية متواصلة.',
    'NEW',
    'طلب عاجل لتنسيق باخرة الشحن يوم الخميس.',
    CURRENT_TIMESTAMP - INTERVAL '35 minutes',
    CURRENT_TIMESTAMP - INTERVAL '35 minutes'
),
(
    'msg_seed_2',
    'م. إبراهيم كمال (المتحدة للاستيراد والتصدير)',
    '01289876543',
    'حاويات جافة',
    'استفسار عن حجز شاحنات لنقل 6 حاويات جافة 40 قدم High Cube من ميناء الإسكندرية إلى المنطقة الصناعية بالسادس من أكتوبر بعد إنهاء الإفراج الجمركي.',
    'IN_PROGRESS',
    'تم الاتصال بالعميل وتجهيز عرض السعر وجاري إرسال المستندات.',
    CURRENT_TIMESTAMP - INTERVAL '3 hours',
    CURRENT_TIMESTAMP - INTERVAL '1 hour'
),
(
    'msg_seed_3',
    'سارة عبد الرحمن (فارما كير للأدوية)',
    '01155443322',
    'حاويات مبردة',
    'طلب توريد شاحنات تبريد معتمدة لنقل شحنة محاليل ومستلزمات طبية مستوردة من ميناء دمياط إلى مستودعات العبور مع تقديم سجل درجات الحرارة لحظياً.',
    'COMPLETED',
    'تم تنفيذ النقل بنجاح وتسليم إيصالات الاستلام والمستندات.',
    CURRENT_TIMESTAMP - INTERVAL '1 day',
    CURRENT_TIMESTAMP - INTERVAL '12 hours'
)
ON CONFLICT ("id") DO NOTHING;
