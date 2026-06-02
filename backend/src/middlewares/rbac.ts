// import { create } from "node:domain";
type PermissionAction = 'vather' | 'admin' | 'premium_seeker' | 'free_seeker';
type PermissionConfig = Record<string, ReadonlyArray<PermissionAction>>;

// Creates union types like "posts:read" | "posts:manage" | ...
type InferPermissions<T extends PermissionConfig> = {
  [K in keyof T]: T[K][number] extends PermissionAction
    ? `${K & string}:${T[K][number]}`
    : never;
}[keyof T];

export const makePermissions = <T extends PermissionConfig>(
  config: T
): Array<InferPermissions<T>> => {
  return Object.entries(config).flatMap(([domain, actions]) =>
    actions.map((action) => `${domain}:${action}` as InferPermissions<T>)
  );
};
    

// Permission map (action -> allowed roles)
const permissionConfig = {
  // user management
  create_user: ['vather', 'admin'],
  delete_user: ['vather', 'admin'],
  assign_role: ['vather'],

  // Job posting
  create_job: ['vather', 'admin'],
  edit_own_job: ['vather', 'admin'],
  edit_any_job: ['vather', 'admin'],
  delete_own_job: ['vather', 'admin'],
  delete_any_job: ['vather', 'admin'],

  // Job applying
  apply_job: ['vather', 'admin', 'premium_seeker', 'free_seeker'],
  auto_apply: ['vather', 'premium_seeker'], // premium only

  // Resume
  create_resume: ['vather', 'admin', 'premium_seeker', 'free_seeker'],
  ai_enhance_resume: ['vather', 'admin', 'premium_seeker'],
  download_resume_pdf: ['vather', 'admin', 'premium_seeker', 'free_seeker'],

  // Scraping
  trigger_scrape: ['vather', 'admin'],
  configure_scraper: ['vather', 'admin'],
  view_scraped_jobs: ['vather', 'admin', 'premium_seeker', 'free_seeker'],

  // Billing
  manage_subscription: ['vather', 'admin', 'premium_seeker'],
  view_invoices: ['vather', 'admin', 'premium_seeker'],

  // Affiliate
  view_affiliate_dashboard: ['vather', 'admin'],
  withdraw_commission: ['vather', 'admin'],
} as const; // ← Note the const assertion!


// generate flat array of allowed combinations (e.g., ["create_user:vather", "create_user:admin", ...])
export const PermissionArray = makePermissions(permissionConfig)

// Extract all valid action names (e.g., 'create_job' | 'auto_apply')
export type AppAction = keyof typeof permissionConfig;

export type {PermissionAction, PermissionConfig}
