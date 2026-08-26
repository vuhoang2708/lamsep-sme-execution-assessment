import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export async function exportReportToPDF(elementId: string, filename: string = 'LAMSEP_Bao_Cao_Thuc_Thi_SME.pdf'): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error(`Element with id "${elementId}" not found.`);
  }

  // Use html2canvas to capture the element
  const canvas = await html2canvas(element, {
    scale: 2, // High resolution
    useCORS: true,
    logging: false,
    backgroundColor: '#FFFFFF',
    windowWidth: element.scrollWidth,
    windowHeight: element.scrollHeight,
  });

  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const imgWidth = 210; // A4 width in mm
  const pageHeight = 297; // A4 height in mm
  const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
  let heightLeft = imgHeight;
  let position = 0;

  pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
  heightLeft -= pageHeight;

  while (heightLeft > 0) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
  }

  pdf.save(filename);
}
