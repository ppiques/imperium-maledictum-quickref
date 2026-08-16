import { jsPDF } from "jspdf";
import { SelectedItem } from "../contexts/SelectionContext";

interface SelectionsByCategory {
  [category: string]: SelectedItem[];
}

export const generateSelectionPDF = (
  selectionsByCategory: SelectionsByCategory
) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  const contentWidth = pageWidth - 2 * margin;
  let yPosition = margin;

  // Add title
  doc.setFontSize(18);
  doc.setTextColor(140, 107, 31); // Gold color
  doc.text("Character Selection Sheet", margin, yPosition);
  yPosition += 10;

  // Add date
  doc.setFontSize(10);
  doc.setTextColor(224, 224, 224); // Light gray
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  doc.text(`Generated: ${currentDate}`, margin, yPosition);
  yPosition += 8;

  // Add divider line
  doc.setDrawColor(140, 107, 31);
  doc.line(margin, yPosition, pageWidth - margin, yPosition);
  yPosition += 5;

  // Get category order
  const categoryOrder = [
    "Talents",
    "Weapons",
    "Protection",
    "Equipment",
    "Augmetics",
    "Psy",
    "Services",
    "Combat",
  ];

  const sortedCategories = Object.keys(selectionsByCategory).sort((a, b) => {
    const indexA = categoryOrder.indexOf(a);
    const indexB = categoryOrder.indexOf(b);
    const orderA = indexA === -1 ? 999 : indexA;
    const orderB = indexB === -1 ? 999 : indexB;
    return orderA - orderB;
  });

  // Add each category
  sortedCategories.forEach((category) => {
    const items = selectionsByCategory[category];

    // Check if we need a new page
    if (yPosition > pageHeight - 30) {
      doc.addPage();
      yPosition = margin;
    }

    // Category title
    doc.setFontSize(13);
    doc.setTextColor(212, 175, 55); // Brighter gold
    doc.setFont("helvetica", "bold");
    doc.text(`${category} (${items.length})`, margin, yPosition);
    yPosition += 6;

    // Category separator
    doc.setDrawColor(140, 107, 31);
    doc.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 4;

    // Add items
    doc.setFontSize(10);
    doc.setTextColor(224, 224, 224);
    doc.setFont("helvetica", "normal");

    items.forEach((item) => {
      // Check if we need a new page
      if (yPosition > pageHeight - 20) {
        doc.addPage();
        yPosition = margin;
      }

      // Item name
      doc.setFont("helvetica", "bold");
      doc.text(`• ${item.name}`, margin + 5, yPosition);
      yPosition += 5;

      // Item details
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);

      const itemDetails = getItemDetails(item.data, item.category);
      if (itemDetails.length > 0) {
        itemDetails.forEach((detail) => {
          if (yPosition > pageHeight - 20) {
            doc.addPage();
            yPosition = margin;
          }
          
          // Split text to handle wrapping properly
          const splitText = doc.splitTextToSize(detail, contentWidth - 10);
          const lineHeight = 4;
          
          splitText.forEach((line: string) => {
            if (yPosition > pageHeight - 15) {
              doc.addPage();
              yPosition = margin;
            }
            doc.text(line, margin + 10, yPosition);
            yPosition += lineHeight;
          });
        });
      }

      yPosition += 2; // Space between items
    });

    yPosition += 5; // Space between categories
  });

  // Save the PDF
  const filename = `selection-${currentDate.replace(/\s+/g, "-")}.pdf`;
  doc.save(filename);
};

// Helper function to extract relevant details from item data based on category
const getItemDetails = (
  data: Record<string, string | number | null | React.ReactNode>,
  category: string
): string[] => {
  const details: string[] = [];
  const keyPriority = getKeyPriorityForCategory(category);

  keyPriority.forEach((key) => {
    const value = data[key];
    if (value && value !== "-") {
      // Convert React nodes to string representation
      const stringValue = typeof value === "string" || typeof value === "number" 
        ? String(value)
        : "[Complex Content]";
      details.push(`${key}: ${stringValue}`);
    }
  });

  return details;
};

// Define which fields to include for each category
const getKeyPriorityForCategory = (category: string): string[] => {
  const categoryKeyMap: Record<string, string[]> = {
    Talents: [
      "Requirement",
      "Description",
      "Source",
    ],
    Weapons: [
      "Spec",
      "Damage",
      "Cost",
      "Availability",
      "Encumbrance",
      "Traits",
      "Source",
    ],
    Protection: [
      "Type",
      "Armour",
      "Cost",
      "Availability",
      "Encumbrance",
      "Traits",
      "Source",
    ],
    Equipment: [
      "Type",
      "Cost",
      "Availability",
      "Encumbrance",
      "Traits",
      "Description",
      "Source",
    ],
    Augmetics: [
      "Grade",
      "Cost",
      "Availability",
      "Encumbrance",
      "Effect",
      "Source",
    ],
    Psy: [
      "Tier",
      "Requirement",
      "Warp Rating",
      "Duration",
      "Range",
      "Sustained",
      "Effect",
      "Source",
    ],
    Services: [
      "Duration",
      "Cost",
      "Availability",
      "Source",
    ],
    Combat: [
      "Effect",
      "Source",
    ],
  };

  return categoryKeyMap[category] || Object.keys(categoryKeyMap["Talents"]);
};
