import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export async function exportReportToPDF(elementId: string, filename: string = 'LamSep_Bao_Cao_Thuc_Thi_SME.pdf'): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error(`Element with id "${elementId}" not found.`);
  }

  // Use html2canvas to capture the element cleanly with zero offset
  const canvas = await html2canvas(element, {
    scale: 2, // High resolution
    useCORS: true,
    logging: false,
    backgroundColor: '#FFFFFF',
    scrollX: 0,
    scrollY: 0,
    x: 0,
    y: 0,
    windowWidth: element.scrollWidth,
    windowHeight: element.scrollHeight,
    onclone: (clonedDoc) => {
      const clonedEl = clonedDoc.getElementById(elementId);
      if (clonedEl) {
        clonedEl.style.boxShadow = 'none';
        clonedEl.style.backdropFilter = 'none';
        clonedEl.style.filter = 'none';
        clonedEl.style.backgroundColor = '#FFFFFF';
      }
    },
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
