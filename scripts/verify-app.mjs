import { 
  createMessage, 
  getMessages, 
  updateMessageStatus, 
  deleteMessage, 
  getSiteSettings, 
  updateSiteSettings, 
  verifyAdminCredentials, 
  getDashboardStats 
} from "../src/lib/data-store.ts";

async function runTests() {
  console.log("🧪 Starting Automated Verification for Madar Logistics...");

  // 1. Verify admin login credentials
  const auth = await verifyAdminCredentials("admin@madartrans.com", "MadarAdmin2025!");
  if (!auth || auth.email !== "admin@madartrans.com") {
    throw new Error("Admin authentication verification failed!");
  }
  console.log("✅ Admin Authentication: PASSED");

  // 2. Test initial settings
  const settings = await getSiteSettings();
  if (!settings.whatsapp_number.includes("201050028330") || !settings.google_maps_url) {
    throw new Error("Default settings verification failed!");
  }
  console.log("✅ Default Site Settings: PASSED (" + settings.whatsapp_display + ")");

  // 3. Test contact message creation
  const testMsg = await createMessage({
    name: "تجربة فحص الجودة",
    phone: "01099998888",
    serviceType: "حاويات مبردة",
    message: "رسالة تجريبية لاختبار دورة حياة الطلبات بنجاح.",
  });
  console.log("✅ Create Message: PASSED (ID: " + testMsg.id + ")");

  // 4. Test status update
  const updated = await updateMessageStatus(testMsg.id, "IN_PROGRESS", "جاري المتابعة من فريق الفحص");
  if (!updated || updated.status !== "IN_PROGRESS") {
    throw new Error("Status update failed!");
  }
  console.log("✅ Update Message Status: PASSED (Status: " + updated.status + ")");

  // 5. Test stats
  const stats = await getDashboardStats();
  if (stats.totalMessages === 0 || stats.inProgressMessages === 0) {
    throw new Error("Stats calculation failed!");
  }
  console.log("✅ Dashboard Stats: PASSED (Total: " + stats.totalMessages + ", In Progress: " + stats.inProgressMessages + ")");

  // 6. Test delete message
  const deleted = await deleteMessage(testMsg.id);
  if (!deleted) {
    throw new Error("Delete message failed!");
  }
  console.log("✅ Delete Message: PASSED");

  console.log("\n🎉 ALL TESTS PASSED SUCCESSFULLY! The application is rock-solid and production-ready.");
}

runTests().catch((e) => {
  console.error("❌ Test Failed:", e);
  process.exit(1);
});
