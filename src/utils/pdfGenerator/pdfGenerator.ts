import { jsPDF } from "jspdf";
import { SelectedItem } from "../../contexts/SelectionContext";

interface SelectionsByCategory {
    [category: string]: SelectedItem[];
}

// Tile dimensions and grid configuration
const TILE_WIDTH = 55;
const TILE_HEIGHT = 65;
const TILE_PADDING = 3;
const TILES_PER_ROW = 3;
const PAGE_MARGIN = 12;

const HEADER_COLOUR = "#000000";
const TITLE_COLOUR = "#000000";
const DIVIDER_COLOUR = "#000000";

const TILE_TITLE_COLOUR = "#000000";
const TILE_TEXT_COLOUR = "#000000";
const TILE_BORDER_COLOUR = "#000000";
const TILE_BACKGROUND_COLOUR = "#ffffff";

/*
Doc gen algo

1. Gen Header
2. Gen Cat title
3. Gen grid
3.1. Gen row
3.2. Gen tiles
3.2.1. Gen tile and get max hight
3.2.2. After gen 3 tiles. Increment by max height of the 3 tiles

*/

export const generateSelectionPDF = (
    selectionsByCategory: SelectionsByCategory
) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    let yPosition = PAGE_MARGIN;

    // Add title
    generateHeader(doc, yPosition);

    yPosition += 2;

    // Add divider line
    doc.setDrawColor(DIVIDER_COLOUR);
    doc.line(PAGE_MARGIN, yPosition, pageWidth - PAGE_MARGIN, yPosition);
    
    yPosition += 6;

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

    // Add each category with tiles
    sortedCategories.forEach((category) => {
        const items = selectionsByCategory[category];

        // Check if we need a new page for category title
        if (yPosition > pageHeight - 25) {
            doc.addPage();
            yPosition = PAGE_MARGIN;
        }

        // Category title
        doc.setFontSize(13);
        doc.setTextColor(TITLE_COLOUR); // Brighter gold
        doc.setFont("helvetica", "bold");
        doc.text(`${category} (${items.length})`, PAGE_MARGIN, yPosition);
        yPosition += 2;

        // Category separator
        doc.setDrawColor(140, 107, 31);
        doc.line(PAGE_MARGIN, yPosition, pageWidth - PAGE_MARGIN, yPosition);
        yPosition += 4;

        // Render tiles in grid
        let tileColumn = 0;
        let tileRow = 0;
        const tilesPerPage = Math.floor((pageHeight - yPosition - PAGE_MARGIN) / (TILE_HEIGHT + 2));

        items.forEach((item) => {
            // Calculate position
            const xPosition = PAGE_MARGIN + tileColumn * (TILE_WIDTH + 2);
            let tileYPosition = yPosition + tileRow * (TILE_HEIGHT + 2);

            // Check if we need a new page
            if (tileColumn === 0 && tileRow > 0 && tileRow % tilesPerPage === 0) {
                doc.addPage();
                yPosition = PAGE_MARGIN;
                tileYPosition = yPosition;
                tileRow = 0;
            }

            // Draw tile
            generateTile(doc, xPosition, tileYPosition, item, category);

            // Update position for next tile
            tileColumn++;
            if (tileColumn >= TILES_PER_ROW) {
                tileColumn = 0;
                tileRow++;
            }
        });

        // Update yPosition after tiles
        if (items.length > 0) {
            const rowsUsed = Math.ceil(items.length / TILES_PER_ROW);
            yPosition = yPosition + rowsUsed * (TILE_HEIGHT + 2) + 8;
        }
    });

    // Save the PDF
    const filename = `selection.pdf`;
    doc.save(filename);
};

function generateHeader(
    doc: jsPDF,
    yPos: number,) {
    doc.setFontSize(18);
    doc.setTextColor(HEADER_COLOUR);
    doc.text("Character Selection Sheet", PAGE_MARGIN, yPos);
}

// Helper function to draw a single tile
function generateTile(
    doc: jsPDF,
    xPos: number,
    yPos: number,
    item: SelectedItem,
    category: string
) {
    // Draw tile border
    doc.setDrawColor(TILE_BORDER_COLOUR);
    doc.setLineWidth(0.3);
    doc.rect(xPos, yPos, TILE_WIDTH, TILE_HEIGHT);

    // Draw tile background (slightly lighter)
    doc.setFillColor(TILE_BACKGROUND_COLOUR);
    doc.rect(xPos, yPos, TILE_WIDTH, TILE_HEIGHT, "F");

    let paddedYPos = yPos + TILE_PADDING;

    // Item name
    generateTileTitle(doc, xPos, paddedYPos, item.name)

    // Item details
    doc.setFont("helvetica", "normal");
    doc.setFontSize(5.5);
    doc.setTextColor(TILE_TEXT_COLOUR);

    const tileDetails = getTileDetailsForPDF(item.data, category);
    paddedYPos += 2.5;

    tileDetails.forEach((detail) => {
        if (paddedYPos >= yPos + TILE_HEIGHT - TILE_PADDING) return; // Don't overflow

        const detailText = `${detail.label}: ${detail.value}`;
        const detailSplit = doc.splitTextToSize(
            detailText,
            TILE_WIDTH - TILE_PADDING * 2
        );

        detailSplit.slice(0, 2).forEach((line: string) => {
            if (paddedYPos >= yPos + TILE_HEIGHT - TILE_PADDING) return;
            doc.text(line, xPos + TILE_PADDING, paddedYPos);
            paddedYPos += 2.5;
        });
    });
};

function generateTileTitle(doc: jsPDF,
    xPos: number,
    yPos: number,
    titleText: string) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7);
    doc.setTextColor(TILE_TITLE_COLOUR);

    const nameSplit = doc.splitTextToSize(titleText, TILE_WIDTH - TILE_PADDING * 2);
    nameSplit.slice(0, 2).forEach((line: string) => {
        doc.text(line, xPos + TILE_PADDING, yPos);
        yPos += 3;
    });
}

// Helper function to extract key details for tile display (same as SelectionPanel)
const getTileDetailsForPDF = (
    data: Record<string, string | number | null | React.ReactNode>,
    category: string
): Array<{ label: string; value: string }> => {
    const tileDetailsMap: Record<string, string[]> = {
        Talents: ["Requirement", "Description"],
        Weapons: ["Cost", "Availability", "Damage", "Magazine", "Range", "Encumbrance", "Traits", "Specialisation"],
        Protection: ["Cost", "Availability", "Armour", "Locations", "Encumbrance", "Traits"],
        Equipment: ["Cost", "Availability", "Encumbrance", "Effect"],
        Augmetics: ["Cost", "Availability", "Effect"],
        Psy: ["Warp Rating", "Difficulty", "Target", "Range", "Duration", "Effect", "Discipline"],
        Services: ["Cost", "Duration"],
        Combat: ["Effect"],
    };

    const fieldsToShow = tileDetailsMap[category] || [];
    const details: Array<{ label: string; value: string }> = [];

    fieldsToShow.forEach((field) => {
        const value = data[field];
        if (value && value !== "-") {
            const stringValue =
                typeof value === "string" || typeof value === "number"
                    ? String(value)
                    : "";
            if (stringValue) {
                details.push({ label: field, value: stringValue });
            }
        }
    });

    return details;
};
