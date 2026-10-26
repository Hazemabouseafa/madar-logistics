# دليل النشر المباشر على خادم VPS باستخدام Coolify
## منصة مدار للنقل البري واللوجستيات (Madar Logistics)

هذا المشروع مهيأ بالكامل للنشر بنقرة واحدة (1-Click Deployment) على أي خادم VPS عبر لوحة التحكم الشهيرة **Coolify** باستخدام تقنية الـ Multi-Stage Docker Containerized Standalone.

---

## 🌟 مميزات بيئة النشر في المشروع:
1. **Containerized Standalone Mode**: أصغر حجم للحاوية مع زمن إقلاع فائق السرعة عبر Next.js Standalone.
2. **Persistent Storage (مساحة تخزين دائمة)**: حتى في حال عدم استخدام قاعدة بيانات خارجية، تم ربط مجلد `.data` كـ Docker Volume (`madar_data`) لضمان عدم ضياع أي تعديلات في المحتوى أو الرسائل الواردة عند إعادة تشغيل الحاوية.
3. **Dual-Database Support**: جاهز للربط الفوري مع Neon PostgreSQL أو PostgreSQL المنشأ داخل Coolify، أو العمل تلقائياً بالتخزين الدائم.
4. **أمان معزز**: يعمل التطبيق داخل الحاوية تحت مستخدم غير جذري آمن (`nextjs:nodejs UID 1001`).

---

## 🚀 خطوات النشر على Coolify (خطوة بخطوة):

### 1. إضافة المشروع في Coolify:
- في لوحة تحكم Coolify، اختر مشروعك ثم اضغط **+ New Resource**.
- اختر **Public Repository** أو **Private Repository** (GitHub / GitLab).
- الصق رابط مستودع الكود الخاص بشركة مدار.

### 2. نوع البناء (Build Pack):
- في خانة **Build Pack**، اختر **Dockerfile** (سيكتشف Coolify ملف `Dockerfile` تلقائياً من المجلد الرئيسي).
- المنفذ الداخلي للتطبيق هو: `3000` (Coolify Port: `3000`).

### 3. المتغيرات البيئية (Environment Variables):
في تبويب **Environment Variables** في Coolify، يمكنك إضافة:
```env
NODE_ENV=production
PORT=3000
HOSTNAME=0.0.0.0
JWT_SECRET=ضع_هنا_كلمة_سر_مشفرة_عشوائية_للجلسات
NEXT_PUBLIC_APP_URL=https://your-domain.com

# اختياري: إذا كان لديك قاعدة بيانات PostgreSQL على Coolify أو Neon:
DATABASE_URL=postgresql://user:password@host:5432/madar_db
```

### 4. حفظ البيانات (Persistent Storage / Volumes):
في تبويب **Storages** في Coolify:
- اضغط **Add Storage**.
- أدخل المسار داخل الحاوية (Destination Path): `/app/.data`
- هذا يضمن استمرار حفظ الرسائل والـ CMS والإعدادات بشكل دائم ومستقر.

### 5. النشر (Deploy):
- اضغط على زر **Deploy**.
- سيقوم Coolify ببناء الحاوية وتفعيل شهادة الـ SSL المجانية (HTTPS) تلقائياً عبر Traefik.
- مبروك! موقعك ولوحة التحكم يعملان بكفاءة وسرعة فائقة.
