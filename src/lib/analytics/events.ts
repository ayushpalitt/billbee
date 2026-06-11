export const ANALYTICS_EVENTS = {
  // Funnel
  LANDING_PAGE_VISIT: "landing_page_visit",
  SIGN_UP: "sign_up",
  CREATE_GROUP: "create_group",
  INVITE_MEMBER: "invite_member",
  ADD_GROUP_MEMBER: "add_group_member",
  ADD_EXPENSE: "add_expense",
  ADD_PERSONAL_EXPENSE: "add_personal_expense",
  TRANSFER_EXPENSE: "transfer_expense",
  SETTLEMENT_COMPLETED: "settlement_completed",
  PDF_EXPORT: "pdf_export",
  
  // App Interactions
  VIEW_DASHBOARD: "view_dashboard",
  VIEW_GROUP: "view_group",
  SCAN_RECEIPT: "scan_receipt",
  VIEW_INSIGHTS: "view_insights",
  
  // User Properties
  UPDATE_USER_PROPERTIES: "update_user_properties",
} as const;

export type AnalyticsEventName = typeof ANALYTICS_EVENTS[keyof typeof ANALYTICS_EVENTS];
