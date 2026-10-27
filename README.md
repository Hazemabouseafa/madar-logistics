# شركة مدار للنقل البري - Madar Logistics and Transportation

موقع إلكتروني متكامل ولوحة تحكم إدارية حديثة لشركة **مدار للنقل البري** المتخصصة في النقل البري للبضائع والحاويات المبردة والجافة من وإلى الموانئ البحرية في جمهورية مصر العربية.

---

## 🌟 مميزات المشروع والموقع

### 1. الموقع التعريفي العام (Public Website)
- **تصميم فائق السرعة والعصرية**: مبني بأحدث إصدارات **Next.js (App Router)**، و**Tailwind CSS** مع حركات وتفاعلات سلسة باستخدام **Framer Motion**.
- **دعم كامل للغة العربية (RTL First)**: متوافق مع الاتجاه من اليمين إلى اليسار واستخدام خط **Cairo** الاحترافي من Google Fonts.
- **عرض احترافي للخدمات والتخصصات**:
  - **حاويات مبردة (Reefer Containers)**: مواصفات الحفاظ على سلسلة التبريد (-30°C إلى +30°C) ومولدات الطاقة الكهربائية (Gensets).
  - **حاويات جافة (Dry Containers)**: حاويات 20 و40 و40 High Cube، والتثبيت الملاحي المحكم.
- **التزامات الشركة الثلاثة (Value Propositions)**:
  1. التزام تام بالمواعيد (Strict Adherence to Schedules).
  2. محافظة قصوى على الشحنات (Maximum Cargo Safety).
  3. التزام دقيق بالمستندات (Flawless Documentation Compliance).
- **نموذج طلب واستفسار تفاعلي**: يتيح للعملاء إرسال تفاصيل الشحنة ونوعها مباشرة، مع حفظ فوري بالبيانات وإشعار تأكيدي.
- **ويدجت واتساب عائم تفاعلي**: زر دردشة عائم يتيح التواصل المباشر مع غرفة العمليات على الرقم: `+20 10 50028330`.
- **ربط تفاعلي بخرائط جوجل**: دمج موقع الشركة وعرض زر الانتقال المباشر للعنوان على Google Maps.

---

### 2. لوحة تحكم الإدارة الشاملة (`/admin`)
- **نظام مصادقة آمن**: محمي بجلسات JWT وملفات تعريف الارتباط المشفرة (HttpOnly Cookies).
- **بيانات الدخول الافتراضية**:
  - البريد الإلكتروني: `admin@madartrans.com`
  - كلمة المرور: `adminpassword2026!`
- **صندوق الرسائل والطلبات الواردة (Inbox Manager)**:
  - استعراض كافة الطلبات مع إمكانية البحث والفلترة حسب الحالة (`جديد`، `قيد المتابعة`، `تم الرد`).
  - تحديث حالة الطلب بضغطة زر واحدة.
  - **زر الرد الفوري عبر واتساب**: توليد رسالة ترحيبية احترافية تلقائياً باسم العميل ونوع الخدمة وفتح تطبيق واتساب فوراً.
  - حذف وإدارة الرسائل القديمة أو غير المرغوبة.
- **مدير الإعدادات العامة (Global Settings)**:
  - تعديل رقم واتساب، رابط خرائط جوجل، البريد الإلكتروني، العنوان، وساعات العمل.
  - التعديل ينعكس لحظياً على كافة صفحات الموقع العام دون الحاجة لتعديل الكود أو إعادة البناء.

---

## 🛠 التقنيات المستخدمة (Tech Stack)

- **Frontend & SSR**: Next.js 14+ (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS, CSS Grid Patterns, Glassmorphism Filters
- **Typography**: Google Fonts (Cairo)
- **Icons & Motion**: Lucide React, Framer Motion
- **Database & ORM**: Prisma ORM, Neon PostgreSQL (مع دعم حفظ محلي فوري للمعاينة والتطوير)
- **Authentication**: `jose` (JWT), `bcryptjs`
- **Deployment**: Multi-stage `Dockerfile` (Standalone Node Alpine), `docker-compose.yml`

---

## 🚀 التشغيل المحلي (Local Development)

```bash
# 1. الدخول إلى مجلد المشروع
cd madar-logistics

# 2. تثبيت الحزم (في حال لم تكن مثبتة)
npm install

# 3. توليد عميل بريزما
npm run prisma:generate

# 4. تشغيل خادم التطوير
npm run dev
```

افتح المتصفح على: [http://localhost:3000](http://localhost:3000)  
للدخول إلى لوحة الإدارة: [http://localhost:3000/admin](http://localhost:3000/admin)

---

## 🚢 النشر على Coolify وVPS (Production Deployment)

المشروع مجهز بالكامل للعمل داخل حاوية Docker محسنة بحجم صغير وأمان مرتفع عبر النمط المستقل `output: "standalone"`.

### خطوات النشر عبر Coolify:
1. داخل لوحة تحكم **Coolify**، اضغط على **+ Add New Resource** ثم اختر **Public / Private Git Repository**.
2. حدد رابط مستودع المشروع (Git Repository).
3. اختر نوع البناء: **Dockerfile** (سيتعرف Coolify تلقائياً على الـ `Dockerfile` المدمج).
4. في تبويب **Environment Variables**، أضف المتغيرات التالية:
   - `DATABASE_URL`: رابط اتصال قاعدة بيانات Neon PostgreSQL (مثال: `postgresql://user:pass@ep-xyz.neon.tech/neondb?sslmode=require`)
   - `JWT_SECRET`: مفتاح سري عشوائي لتشفير جلسات الإدارة.
   - `NEXT_PUBLIC_APP_URL`: دومين موقعك الرسمي (مثال: `https://madartrans.com`).
5. اضغط **Deploy**.
6. بعد انتهاء النشر، سيقوم Coolify بتهيئة شهادة SSL تلقائياً وسيكون الموقع ولوحة الإدارة جاهزين للعمل بأعلى كفاءة!

---

## 🔒 أمان البيانات
- جميع الـ API Endpoints الحساسة (`/api/admin/*`) محمية ومحققة برمجياً من صلاحيات الـ Session.
- كلمات المرور مشفرة بواسطة `bcrypt`.
- الحاوية تعمل بمستخدم مقيد الصلاحيات (`nextjs:nodejs`) لحماية الخادم السحابي.
