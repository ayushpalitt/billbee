import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy_key");

export class EmailService {
  /**
   * Sends an email to a user reminding them of their outstanding debts.
   */
  static async sendDebtReminderEmail(userEmail: string, userName: string, debts: { payeeName: string, amount: number }[]) {
    if (!process.env.RESEND_API_KEY) {
      console.warn("RESEND_API_KEY is not set. Skipping debt reminder email.");
      return;
    }

    const debtHtmlList = debts.map(d => `<li>You owe <strong>${d.payeeName}</strong>: $${d.amount.toFixed(2)}</li>`).join("");

    const htmlContent = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1e293b;">
        <h2 style="color: #0f172a;">Hi ${userName},</h2>
        <p>This is a friendly reminder from BillBee about your outstanding balances in your active hives.</p>
        <ul style="background-color: #f8fafc; padding: 20px; border-radius: 8px;">
          ${debtHtmlList}
        </ul>
        <p>Log in to <a href="https://billbee.app/dashboard" style="color: #22c55e;">BillBee</a> to settle up!</p>
        <p style="color: #64748b; font-size: 12px; margin-top: 40px;">BillBee Inc. &copy; ${new Date().getFullYear()}</p>
      </div>
    `;

    try {
      await resend.emails.send({
        from: 'BillBee Reminders <reminders@billbee.app>',
        to: userEmail,
        subject: 'BillBee: Outstanding Balance Reminder',
        html: htmlContent,
      });
    } catch (error) {
      console.error("Failed to send debt reminder email:", error);
    }
  }

  /**
   * Sends a monthly summary email with a PDF report attached.
   */
  static async sendMonthlyReportEmail(userEmail: string, userName: string, pdfBuffer: Buffer, month: string) {
    if (!process.env.RESEND_API_KEY) {
      console.warn("RESEND_API_KEY is not set. Skipping monthly report email.");
      return;
    }

    const htmlContent = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1e293b;">
        <h2 style="color: #0f172a;">Your BillBee Monthly Summary</h2>
        <p>Hi ${userName},</p>
        <p>Your expense report for <strong>${month}</strong> is ready. We've attached it to this email for your records.</p>
        <p>Thanks for using BillBee to organize your group expenses!</p>
        <p style="color: #64748b; font-size: 12px; margin-top: 40px;">BillBee Inc. &copy; ${new Date().getFullYear()}</p>
      </div>
    `;

    try {
      await resend.emails.send({
        from: 'BillBee Reports <reports@billbee.app>',
        to: userEmail,
        subject: `Your BillBee Expense Report - ${month}`,
        html: htmlContent,
        attachments: [
          {
            filename: `BillBee_Report_${month.replace(' ', '_')}.pdf`,
            content: pdfBuffer,
          }
        ]
      });
    } catch (error) {
      console.error("Failed to send monthly report email:", error);
    }
  }
}
