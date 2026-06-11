import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function generateServerPdfReport(transactions: any[], userName: string = "User"): Buffer {
  // Use 'pt' and specify format to ensure server-side compatibility without window
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4"
  });

  // Add Branding Header
  doc.setFillColor(34, 197, 94); // Tailwind green-500
  doc.rect(0, 0, 210, 30, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  doc.text("BillBee", 14, 20);
  
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Monthly Expense Report", 160, 20);

  // Add Report Info
  doc.setTextColor(30, 41, 59); // Tailwind slate-800
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text(`Transaction Summary for ${userName}`, 14, 45);
  
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100, 116, 139); // Tailwind slate-500
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 52);

  // Format Data for AutoTable
  const tableColumn = ["Date", "Description", "Group", "Status", "Amount"];
  const tableRows: any[][] = [];

  transactions.forEach(tx => {
    const transactionData = [
      tx.date ? new Date(tx.date).toLocaleDateString() : 'N/A',
      tx.description || tx.title || 'Unknown',
      tx.group || "Personal",
      tx.status || 'PAID',
      `$${Number(tx.amount).toFixed(2)}`
    ];
    tableRows.push(transactionData);
  });

  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 60,
    theme: 'grid',
    headStyles: { fillColor: [34, 197, 94], textColor: 255, fontStyle: 'bold' },
    alternateRowStyles: { fillColor: [248, 250, 252] }, // slate-50
    styles: { font: 'helvetica', fontSize: 10, cellPadding: 4 },
  });

  // Get raw output as arraybuffer, convert to node Buffer
  const arrayBuffer = doc.output("arraybuffer");
  return Buffer.from(arrayBuffer);
}
