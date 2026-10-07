/* KOJI — site configuration.
   The publishable key is meant to be public: every table is protected by row-level security,
   and customers can only call the four storefront functions (get_storefront, place_order,
   request_trial, track_order). Orders are readable only by signed-in team members in public.admins. */
window.KOJI = window.KOJI || {};
KOJI.CONFIG = {
  supabaseUrl: "https://heaogqiogjrcrwuypnlw.supabase.co",
  supabaseKey: "sb_publishable_zqyOb1wzX0Ns6lmoMTqbMg_TrHPvKlw",
  email: "orders@kojigarlic.shop",
  instagram: "https://instagram.com/koji.garlic",
  // WhatsApp, accepting orders, pre-order mode, delivery fees, InstaPay / Vodafone Cash numbers:
  // all edited live from the dashboard (admin.html → الإعدادات), not here.
};
