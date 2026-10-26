import { getSiteSettings } from "@/lib/data-store";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Commitments from "@/components/Commitments";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import WhyUs from "@/components/WhyUs";
import ContactSection from "@/components/ContactSection";
import LocationSection from "@/components/LocationSection";
import Footer from "@/components/Footer";
import WhatsAppWidget from "@/components/WhatsAppWidget";

export const revalidate = 0; // Always serve fresh data

export default async function HomePage() {
  const settings = await getSiteSettings();

  return (
    <main className="min-h-screen bg-madar-dark">
      {/* Navbar with dynamic contact numbers */}
      <Navbar
        whatsappNumber={settings.whatsapp_number}
        whatsappDisplay={settings.whatsapp_display}
        phoneNumber={settings.phone_number}
      />

      {/* Hero section */}
      <Hero
        whatsappNumber={settings.whatsapp_number}
        phoneNumber={settings.phone_number}
        badge={settings.hero_badge}
        title={settings.hero_title}
        subtitle={settings.hero_subtitle}
        ctaPrimary={settings.hero_cta_primary}
        ctaWhatsapp={settings.hero_cta_whatsapp}
      />

      {/* 3 Core Commitments */}
      <Commitments
        badge={settings.commitments_badge}
        title={settings.commitments_title}
        subtitle={settings.commitments_subtitle}
        commitment1Title={settings.commitment_1_title}
        commitment1Desc={settings.commitment_1_desc}
        commitment2Title={settings.commitment_2_title}
        commitment2Desc={settings.commitment_2_desc}
        commitment3Title={settings.commitment_3_title}
        commitment3Desc={settings.commitment_3_desc}
      />

      {/* About Company & Port Coverage */}
      <AboutSection
        badge={settings.about_badge}
        title={settings.about_title}
        desc1={settings.about_desc_1}
        desc2={settings.about_desc_2}
        portsCardTitle={settings.ports_card_title}
        portsCardSubtitle={settings.ports_card_subtitle}
        portsCardBadge={settings.ports_card_badge}
        portsCardCalloutTitle={settings.ports_card_callout_title}
        portsCardCalloutSubtitle={settings.ports_card_callout_subtitle}
        portsCardCta={settings.ports_card_cta}
        portsList={settings.ports_list}
      />

      {/* Detailed Services (Reefer & Dry containers) */}
      <ServicesSection
        badge={settings.services_badge}
        title={settings.services_title}
        subtitle={settings.services_subtitle}
        reeferTitle={settings.reefer_title}
        reeferDesc={settings.reefer_desc}
        dryTitle={settings.dry_title}
        dryDesc={settings.dry_desc}
      />

      {/* Why Choose Us */}
      <WhyUs />

      {/* Interactive Contact & Order Form */}
      <ContactSection
        whatsappNumber={settings.whatsapp_number}
        whatsappDisplay={settings.whatsapp_display}
        phoneNumber={settings.phone_number}
        addressAr={settings.address_ar}
        workingHours={settings.working_hours}
        companyEmail={settings.company_email}
        salesEmail={settings.sales_email}
        badge={settings.contact_badge}
        title={settings.contact_title}
        subtitle={settings.contact_subtitle}
      />

      {/* Google Maps Location */}
      <LocationSection
        mapsUrl={settings.google_maps_url}
        addressAr={settings.address_ar}
      />

      {/* Footer */}
      <Footer
        whatsappNumber={settings.whatsapp_number}
        whatsappDisplay={settings.whatsapp_display}
        phoneNumber={settings.phone_number}
        mapsUrl={settings.google_maps_url}
        companyEmail={settings.company_email}
        salesEmail={settings.sales_email}
        addressAr={settings.address_ar}
        workingHours={settings.working_hours}
        facebookUrl={settings.facebook_url}
        linkedinUrl={settings.linkedin_url}
        instagramUrl={settings.instagram_url}
        twitterUrl={settings.twitter_url}
      />

      {/* Floating Interactive WhatsApp Widget */}
      <WhatsAppWidget
        whatsappNumber={settings.whatsapp_number}
        phoneDisplay={settings.whatsapp_display}
      />
    </main>
  );
}
