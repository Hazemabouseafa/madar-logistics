# دليل تشغيل قاعدة البيانات والنشر على خادم VPS محلياً باستخدام Coolify
## منصة مدار للنقل البري (Madar Logistics and Transportation)

قاعدة البيانات مصممة ومجهزة لتعمل **محلياً بنسبة 100% على نفس سيرفر الـ VPS الخاص بك (Self-Hosted Local Database)**، دون الحاجة لأي خدمات سحابية خارجية (مثل Neon أو Supabase أو AWS).

---

## 🏗 خيارات تشغيل قاعدة البيانات محلياً على الـ VPS:

### 🌟 الخيار الأول (الأسهل والأسرع): النشر عبر Docker Compose المدمج
يحتوي المشروع على ملف `docker-compose.yml` يطلق حاويتين متكاملتين معاً على الـ VPS:
1. **`madar-postgres`**: حاوية PostgreSQL 16 Alpine محلية تماماً على السيرفر، مع مجلد تخزين دائم (`postgres_data`) على قرص الـ VPS، وملف تهيئة تلقائي (`prisma/init.sql`) ينشئ الجداول والمستخدم الرئيسي فوراً.
2. **`madar-web`**: تطبيق Next.js الذي يتصل محلياً بحاوية البوستجرس عبر الشبكة الداخلية (`madar_network`).

#### خطوات التشغيل بالخيار الأول في Coolify:
1. في لوحة تحكم Coolify، اختر مشروعك ثم اضغط **+ New Resource**.
2. اختر **Docker Compose**.
3. حدد مستودع المشروع `https://github.com/Hazemabouseafa/madar-logistics` فرع `main`.
4. سيتعرف Coolify فورياً على `docker-compose.yml` ويقوم بتشغيل قاعدة البيانات والتطبيق محلياً على الـ VPS.
5. اضغط **Deploy** وسيعمل كل شيء محلياً بدون أي إعدادات إضافية!

---

### 🌟 الخيار الثاني: تشغيل قاعدة بيانات PostgreSQL منفصلة داخل Coolify
إذا كنت تفضل إدارة قواعد البيانات بشكل مستقل داخل Coolify:

1. **إنشاء قاعدة البيانات المحلية**:
   - داخل Coolify، اضغط **+ New Resource** ثم اختر **Databases** -> **PostgreSQL**.
   - سمّها مثلاً: `madar-local-db`.
   - سيقوم Coolify بتشغيل PostgreSQL على سيرفر الـ VPS الخاص بك وتوليد رابط اتصال داخلي محلي (Internal Connection String) مثل:
     ```
     postgresql://postgres:password@madar-local-db:5432/postgres
     ```

2. **ربط التطبيق بقاعدة البيانات المحلية**:
   - في تطبيق الويب `madar-web`، ادخل إلى تبويب **Environment Variables**.
   - أضف المتغير:
     ```env
     DATABASE_URL=postgresql://postgres:password@madar-local-db:5432/postgres
     ```
   - اضغط **Deploy**.

---

## 🔒 أمان واستقرار البيانات المحلية (Data Persistence):
- **مجلد التخزين الدائم (Persistent Volume)**: يتم تخزين كافة البيانات والجداول والرسائل على قرص الـ VPS عبر Volume دائم باسم `madar_postgres_data`.
- حتى لو تم إيقاف الحاوية أو إعادة تشغيل سيرفر الـ VPS أو تحديث الكود، تظل جميع بيانات العملاء وحجوزاتهم ورسائلهم وإعدادات لوحة التحكم محفوظة تماماً دون أي مساس بها.
- **نسخ احتياطي فوري متزامن (Dual-Sync)**: يحفظ التطبيق نسخة متزامنة فورية من الرسائل والإعدادات في ملفات JSON محلية، مما يضمن عمل الموقع حتى في أصعب ظروف الصيانة لقاعدة البيانات.

---

## 🔑 بيانات تسجيل الدخول الافتراضية للوحة التحكم:
- الرابط: `https://your-domain/admin/login` (أو `http://localhost:3000/admin/login`)
- البريد: `admin@madartrans.com`
- كلمة المرور: `MadarAdmin2025!`
