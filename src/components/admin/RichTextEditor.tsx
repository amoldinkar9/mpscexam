"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import katex from "katex";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  ChevronDown,
  Palette,
  Highlighter,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  RemoveFormatting,
  Link as LinkIcon,
  Unlink,
  Calculator,
  Eye,
  FileCode,
  Check,
  X,
  Sigma,
  Sparkles,
  Trash2,
  HelpCircle,
  Table as TableIcon,
  Columns3,
  Rows3,
  Plus,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Grid
} from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  className?: string;
}

// 7 columns x 5 rows standard rich text color palette matching user's image
export const COLOR_PALETTE_ROWS = [
  // Row 1: Saturated primary/accent colors
  ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff"],
  // Row 2: Light pastel tints
  ["#ffffff", "#facccc", "#fce5cd", "#fff2cc", "#d9ead3", "#cfe2f3", "#d9d2e9"],
  // Row 3: Soft medium tones
  ["#b7b7b7", "#ea9999", "#f9cb9c", "#ffe599", "#93c47d", "#6fa8dc", "#b4a7d6"],
  // Row 4: Deep saturated tones
  ["#666666", "#a61c1c", "#b45f06", "#bf9000", "#38761d", "#1155cc", "#674ea7"],
  // Row 5: Darkest shades
  ["#333333", "#5b0f00", "#783f04", "#7f6000", "#134f5c", "#073763", "#351c75"]
];

const MATH_SYMBOLS = [
  "±", "×", "÷", "≠", "≈", "≤", "≥", "√", "π", "°", "∆", "∑", "∞", "½", "¼", "¾",
  "₹", "%", "✓", "★", "🏛", "✈️", "👉", "📌", "१.", "२.", "३.", "४."
];

export const LATEX_PRESETS = [
  {
    category: "Fractions & Powers",
    items: [
      { label: "a/b", latex: "\\frac{a}{b}", name: "Fraction" },
      { label: "x²", latex: "x^2", name: "Square" },
      { label: "xⁿ", latex: "x^{n}", name: "Exponent" },
      { label: "xᵢ", latex: "x_{i}", name: "Subscript" },
      { label: "x₁²", latex: "x_{1}^{2}", name: "Subscript & Power" },
      { label: "√x", latex: "\\sqrt{x}", name: "Square Root" },
      { label: "∛x", latex: "\\sqrt[3]{x}", name: "Cube Root" },
      { label: "d/dx", latex: "\\frac{d}{dx}", name: "Derivative" },
    ]
  },
  {
    category: "Symbols & Operators",
    items: [
      { label: "±", latex: "\\pm", name: "Plus-Minus" },
      { label: "×", latex: "\\times", name: "Multiplication" },
      { label: "÷", latex: "\\div", name: "Division" },
      { label: "≠", latex: "\\neq", name: "Not Equal" },
      { label: "≈", latex: "\\approx", name: "Approximately" },
      { label: "≤", latex: "\\le", name: "Less Than or Equal" },
      { label: "≥", latex: "\\ge", name: "Greater Than or Equal" },
      { label: "∞", latex: "\\infty", name: "Infinity" },
      { label: "%", latex: "\\%", name: "Percentage" },
      { label: "∑", latex: "\\sum_{i=1}^{n} x_i", name: "Summation" },
      { label: "∫", latex: "\\int_{a}^{b} f(x) dx", name: "Integral" },
    ]
  },
  {
    category: "Greek Letters",
    items: [
      { label: "α", latex: "\\alpha", name: "Alpha" },
      { label: "β", latex: "\\beta", name: "Beta" },
      { label: "θ", latex: "\\theta", name: "Theta" },
      { label: "π", latex: "\\pi", name: "Pi" },
      { label: "Δ", latex: "\\Delta", name: "Delta" },
      { label: "λ", latex: "\\lambda", name: "Lambda" },
      { label: "σ", latex: "\\sigma", name: "Sigma" },
      { label: "μ", latex: "\\mu", name: "Mu" },
      { label: "ω", latex: "\\omega", name: "Omega" },
      { label: "γ", latex: "\\gamma", name: "Gamma" },
    ]
  },
  {
    category: "Exam Formulas",
    items: [
      { label: "Quadratic", latex: "x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}", name: "Quadratic Formula" },
      { label: "Pythagoras", latex: "a^2 + b^2 = c^2", name: "Pythagorean Theorem" },
      { label: "Circle Area", latex: "A = \\pi r^2", name: "Circle Area" },
      { label: "Triangle Area", latex: "A = \\frac{1}{2} b h", name: "Triangle Area" },
      { label: "Compound Interest (CI)", latex: "A = P \\left(1 + \\frac{r}{100}\\right)^n", name: "Compound Interest" },
      { label: "Speed & Distance", latex: "\\text{Speed} = \\frac{\\text{Distance}}{\\text{Time}}", name: "Speed Formula" },
      { label: "Profit Percentage", latex: "\\text{Profit} \\% = \\frac{\\text{Profit}}{\\text{Cost Price}} \\times 100", name: "Profit Percentage" },
      { label: "Average", latex: "\\bar{x} = \\frac{x_1 + x_2 + \\dots + x_n}{n}", name: "Average Formula" },
      { label: "Water Molecule", latex: "\\text{H}_2\\text{O}", name: "Water Formula" },
      { label: "Sulfuric Acid", latex: "\\text{H}_2\\text{SO}_4", name: "Sulfuric Acid" },
    ]
  }
];

export function RichTextEditor({
  value,
  onChange,
  placeholder = "Insert text here ...",
  className = ""
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const isInternalUpdate = useRef(false);
  const savedSelection = useRef<Range | null>(null);

  const [activeFormat, setActiveFormat] = useState<string>("Normal");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showHighlightPicker, setShowHighlightPicker] = useState(false);
  const [showAlignPicker, setShowAlignPicker] = useState(false);
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [showMathPicker, setShowMathPicker] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [linkText, setLinkText] = useState("");
  const [selectedTextColor, setSelectedTextColor] = useState<string>("#000000");
  const [selectedHighlightColor, setSelectedHighlightColor] = useState<string>("#b4a7d6");
  const [isHtmlView, setIsHtmlView] = useState(false);
  const [rawHtml, setRawHtml] = useState(value || "");

  // LaTeX Math Equation Dialog states
  const [showLatexDialog, setShowLatexDialog] = useState(false);
  const [latexCode, setLatexCode] = useState("\\frac{a}{b}");
  const [latexIsBlock, setLatexIsBlock] = useState(false);
  const [editingLatexNode, setEditingLatexNode] = useState<HTMLElement | null>(null);
  const [activePresetCategory, setActivePresetCategory] = useState<number>(0);

  // Table Feature states
  const [showTablePicker, setShowTablePicker] = useState(false);
  const [hoveredGrid, setHoveredGrid] = useState<{ rows: number; cols: number }>({ rows: 3, cols: 3 });
  const [customTableRows, setCustomTableRows] = useState<number>(3);
  const [customTableCols, setCustomTableCols] = useState<number>(3);
  const [tableIncludeHeader, setTableIncludeHeader] = useState<boolean>(true);
  const [tableStyle, setTableStyle] = useState<"bordered" | "striped">("bordered");
  const [activeTableElement, setActiveTableElement] = useState<HTMLTableElement | null>(null);
  const [activeCellElement, setActiveCellElement] = useState<HTMLTableCellElement | null>(null);

  // Sync value to editor content if external change
  useEffect(() => {
    if (editorRef.current && !isInternalUpdate.current) {
      if (editorRef.current.innerHTML !== (value || "")) {
        editorRef.current.innerHTML = value || "";
      }
    }
    setRawHtml(value || "");
    isInternalUpdate.current = false;
  }, [value]);

  const updateActiveTableState = (targetNode?: Node | null) => {
    let target = targetNode;
    if (!target) {
      const sel = window.getSelection();
      if (sel && sel.rangeCount > 0) {
        target = sel.anchorNode;
      }
    }
    if (target && target.nodeType === 3) {
      target = target.parentElement;
    }
    if (target instanceof HTMLElement && editorRef.current?.contains(target)) {
      const cell = target.closest("td, th") as HTMLTableCellElement | null;
      const table = target.closest("table") as HTMLTableElement | null;
      setActiveCellElement(cell);
      setActiveTableElement(table);
      return;
    }
    setActiveCellElement(null);
    setActiveTableElement(null);
  };

  const saveCurrentSelection = () => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      savedSelection.current = sel.getRangeAt(0).cloneRange();
    }
    updateActiveTableState();
  };

  const restoreSelection = () => {
    if (savedSelection.current) {
      const sel = window.getSelection();
      if (sel) {
        sel.removeAllRanges();
        sel.addRange(savedSelection.current);
      }
    }
  };

  const handleInput = useCallback(() => {
    if (!editorRef.current) return;
    isInternalUpdate.current = true;
    const html = editorRef.current.innerHTML;
    // If only empty br or whitespace
    const cleanHtml = html === "<p><br></p>" || html === "<br>" ? "" : html;
    setRawHtml(cleanHtml);
    onChange(cleanHtml);
  }, [onChange]);

  const exec = (command: string, value: string = "") => {
    editorRef.current?.focus();
    restoreSelection();
    document.execCommand(command, false, value);
    handleInput();
  };

  const applyHeading = (tag: string) => {
    editorRef.current?.focus();
    restoreSelection();
    if (tag === "p") {
      document.execCommand("formatBlock", false, "<p>");
      setActiveFormat("Normal");
    } else if (tag === "h1") {
      document.execCommand("formatBlock", false, "<h1>");
      setActiveFormat("Heading 1");
    } else if (tag === "h2") {
      document.execCommand("formatBlock", false, "<h2>");
      setActiveFormat("Heading 2");
    } else if (tag === "h3") {
      document.execCommand("formatBlock", false, "<h3>");
      setActiveFormat("Heading 3");
    } else if (tag === "blockquote") {
      document.execCommand("formatBlock", false, "<blockquote>");
      setActiveFormat("Quote");
    }
    handleInput();
  };

  const handleApplyLink = () => {
    if (!linkUrl) {
      setShowLinkDialog(false);
      return;
    }
    editorRef.current?.focus();
    restoreSelection();
    const formattedUrl = linkUrl.startsWith("http://") || linkUrl.startsWith("https://")
      ? linkUrl
      : `https://${linkUrl}`;
    
    const sel = window.getSelection();
    if (sel && !sel.isCollapsed && sel.toString().trim().length > 0) {
      document.execCommand("createLink", false, formattedUrl);
    } else {
      const text = linkText || linkUrl;
      const html = `<a href="${formattedUrl}" target="_blank" rel="noopener noreferrer" style="color: #2563eb; text-decoration: underline; font-weight: 600;">${text}</a>`;
      document.execCommand("insertHTML", false, html);
    }
    setLinkUrl("");
    setLinkText("");
    setShowLinkDialog(false);
    handleInput();
  };

  const handleRemoveLink = () => {
    editorRef.current?.focus();
    restoreSelection();
    document.execCommand("unlink", false);
    setShowLinkDialog(false);
    handleInput();
  };

  const handleInsertSymbol = (symbol: string) => {
    editorRef.current?.focus();
    restoreSelection();
    document.execCommand("insertText", false, symbol);
    handleInput();
  };

  const handleInsertCode = () => {
    editorRef.current?.focus();
    restoreSelection();
    const sel = window.getSelection();
    const selectedText = sel ? sel.toString() : "";
    if (selectedText) {
      const codeHtml = `<code style="background-color: #f1f5f9; color: #9B3A32; padding: 2px 6px; border-radius: 4px; font-family: monospace; font-size: 0.9em; font-weight: 600;">${selectedText}</code>`;
      document.execCommand("insertHTML", false, codeHtml);
    } else {
      document.execCommand("insertHTML", false, `<code style="background-color: #f1f5f9; color: #9B3A32; padding: 2px 6px; border-radius: 4px; font-family: monospace; font-size: 0.9em; font-weight: 600;">code</code>`);
    }
    handleInput();
  };

  const handleClearFormat = () => {
    editorRef.current?.focus();
    restoreSelection();
    document.execCommand("removeFormat", false);
    document.execCommand("formatBlock", false, "<p>");
    setActiveFormat("Normal");
    handleInput();
  };

  const handleOpenLatexDialog = () => {
    saveCurrentSelection();
    setEditingLatexNode(null);

    const sel = window.getSelection();
    const selectedText = sel ? sel.toString().trim() : "";
    if (selectedText) {
      setLatexCode(selectedText);
    } else if (!latexCode) {
      setLatexCode("\\frac{a}{b}");
    }
    setShowLatexDialog(true);
  };

  const handleApplyLatex = () => {
    if (!latexCode.trim()) {
      setShowLatexDialog(false);
      return;
    }

    editorRef.current?.focus();
    restoreSelection();

    const cleanLatex = latexCode.trim();
    let renderedHtml = "";
    try {
      renderedHtml = katex.renderToString(cleanLatex, {
        throwOnError: false,
        displayMode: latexIsBlock,
      });
    } catch {
      renderedHtml = cleanLatex;
    }

    const encodedLatex = encodeURIComponent(cleanLatex);

    if (editingLatexNode && editingLatexNode.parentElement) {
      // Edit existing formula node in-place
      editingLatexNode.setAttribute("data-latex", encodedLatex);
      editingLatexNode.setAttribute("data-is-block", latexIsBlock ? "true" : "false");
      editingLatexNode.setAttribute("title", `LaTeX: ${cleanLatex} (Click to edit)`);
      editingLatexNode.innerHTML = renderedHtml;
      setEditingLatexNode(null);
    } else {
      // Insert new LaTeX node
      const wrapperHtml = latexIsBlock
        ? `<div class="katex-eq-block my-3 text-center select-none" data-latex="${encodedLatex}" data-is-block="true" contenteditable="false" style="padding: 10px 16px; background-color: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 8px; cursor: pointer; display: block;" title="LaTeX: ${cleanLatex.replace(/"/g, '&quot;')} (Click to edit)">${renderedHtml}</div><p><br></p>`
        : `<span class="katex-eq-inline inline-block mx-1 select-none" data-latex="${encodedLatex}" data-is-block="false" contenteditable="false" style="padding: 2px 6px; background-color: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 4px; vertical-align: middle; cursor: pointer;" title="LaTeX: ${cleanLatex.replace(/"/g, '&quot;')} (Click to edit)">${renderedHtml}</span>&nbsp;`;

      document.execCommand("insertHTML", false, wrapperHtml);
    }

    setShowLatexDialog(false);
    handleInput();
  };

  const handleDeleteLatex = () => {
    if (editingLatexNode && editingLatexNode.parentElement) {
      editingLatexNode.parentElement.removeChild(editingLatexNode);
      setEditingLatexNode(null);
      setShowLatexDialog(false);
      handleInput();
    }
  };

  const insertSnippetIntoLatex = (snippet: string) => {
    setLatexCode((prev) => {
      if (!prev || prev.trim() === "\\frac{a}{b}") return snippet;
      return `${prev} ${snippet}`;
    });
  };

  // Table manipulation and creation handlers
  const handleInsertTable = (
    rows: number,
    cols: number,
    hasHeader: boolean = true,
    style: "bordered" | "striped" = "bordered"
  ) => {
    if (rows < 1 || cols < 1) return;
    editorRef.current?.focus();
    restoreSelection();

    const table = document.createElement("table");
    table.className = "rte-table";
    table.style.cssText = "width: 100%; border-collapse: collapse; margin: 12px 0; border: 1px solid #cbd5e1;";

    if (hasHeader) {
      const thead = document.createElement("thead");
      const headRow = document.createElement("tr");
      headRow.style.cssText = "background-color: #f1f5f9;";
      for (let c = 0; c < cols; c++) {
        const th = document.createElement("th");
        th.style.cssText = "border: 1px solid #cbd5e1; background-color: #f1f5f9; padding: 8px 12px; font-weight: 700; color: #0f172a; text-align: left;";
        th.textContent = `Header ${c + 1}`;
        headRow.appendChild(th);
      }
      thead.appendChild(headRow);
      table.appendChild(thead);
    }

    const tbody = document.createElement("tbody");
    const bodyRows = hasHeader ? Math.max(1, rows - 1) : rows;
    for (let r = 0; r < bodyRows; r++) {
      const tr = document.createElement("tr");
      if (style === "striped" && r % 2 === 1) {
        tr.style.cssText = "background-color: #f8fafc;";
      }
      for (let c = 0; c < cols; c++) {
        const td = document.createElement("td");
        td.style.cssText = "border: 1px solid #cbd5e1; padding: 8px 12px; color: #334155;";
        td.innerHTML = `Cell ${r + 1}.${c + 1}`;
        tr.appendChild(td);
      }
      tbody.appendChild(tr);
    }
    table.appendChild(tbody);

    const wrapper = document.createElement("div");
    wrapper.className = "rte-table-wrapper";
    wrapper.style.cssText = "overflow-x: auto; margin: 12px 0;";
    wrapper.appendChild(table);

    const paragraph = document.createElement("p");
    paragraph.innerHTML = "<br>";

    // Insert wrapper into current selection or editor
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0 && editorRef.current?.contains(sel.anchorNode)) {
      const range = sel.getRangeAt(0);
      range.deleteContents();
      range.insertNode(paragraph);
      range.insertNode(wrapper);
      const firstCell = table.querySelector("th, td") as HTMLElement | null;
      if (firstCell) {
        const newRange = document.createRange();
        newRange.selectNodeContents(firstCell);
        newRange.collapse(false);
        sel.removeAllRanges();
        sel.addRange(newRange);
        setActiveCellElement(firstCell as HTMLTableCellElement);
        setActiveTableElement(table);
      }
    } else if (editorRef.current) {
      editorRef.current.appendChild(wrapper);
      editorRef.current.appendChild(paragraph);
      setActiveTableElement(table);
    }

    setShowTablePicker(false);
    handleInput();
  };

  const handleInsertRowAbove = () => {
    if (!activeCellElement || !activeTableElement) return;
    const currentRow = activeCellElement.closest("tr");
    if (!currentRow) return;
    const colCount = currentRow.cells.length;
    const isHeader = currentRow.parentElement?.tagName.toLowerCase() === "thead";
    const newRow = document.createElement("tr");
    if (isHeader) {
      newRow.style.cssText = "background-color: #f1f5f9;";
    }
    for (let i = 0; i < colCount; i++) {
      const cell = document.createElement(isHeader ? "th" : "td");
      cell.style.cssText = isHeader
        ? "border: 1px solid #cbd5e1; background-color: #f1f5f9; padding: 8px 12px; font-weight: 700; color: #0f172a;"
        : "border: 1px solid #cbd5e1; padding: 8px 12px; color: #334155;";
      cell.innerHTML = "<br>";
      newRow.appendChild(cell);
    }
    currentRow.parentElement?.insertBefore(newRow, currentRow);
    handleInput();
    const cellToFocus = newRow.cells[activeCellElement.cellIndex || 0];
    if (cellToFocus) {
      cellToFocus.focus();
      setActiveCellElement(cellToFocus);
    }
  };

  const handleInsertRowBelow = () => {
    if (!activeCellElement || !activeTableElement) return;
    const currentRow = activeCellElement.closest("tr");
    if (!currentRow) return;
    const colCount = currentRow.cells.length;
    const newRow = document.createElement("tr");
    for (let i = 0; i < colCount; i++) {
      const cell = document.createElement("td");
      cell.style.cssText = "border: 1px solid #cbd5e1; padding: 8px 12px; color: #334155;";
      cell.innerHTML = "<br>";
      newRow.appendChild(cell);
    }
    if (currentRow.parentElement?.tagName.toLowerCase() === "thead") {
      const tbody = activeTableElement.querySelector("tbody") || activeTableElement;
      tbody.insertBefore(newRow, tbody.firstChild);
    } else {
      currentRow.parentElement?.insertBefore(newRow, currentRow.nextSibling);
    }
    handleInput();
    const cellToFocus = newRow.cells[activeCellElement.cellIndex || 0];
    if (cellToFocus) {
      cellToFocus.focus();
      setActiveCellElement(cellToFocus);
    }
  };

  const handleDeleteRow = () => {
    if (!activeCellElement || !activeTableElement) return;
    const currentRow = activeCellElement.closest("tr");
    if (!currentRow) return;
    const totalRows = activeTableElement.querySelectorAll("tr").length;
    if (totalRows <= 1) {
      handleDeleteTable();
      return;
    }
    currentRow.parentElement?.removeChild(currentRow);
    setActiveCellElement(null);
    handleInput();
    updateActiveTableState();
  };

  const handleInsertColLeft = () => {
    if (!activeCellElement || !activeTableElement) return;
    const colIndex = activeCellElement.cellIndex;
    const rows = activeTableElement.querySelectorAll("tr");
    rows.forEach((row) => {
      const isHeadRow = row.parentElement?.tagName.toLowerCase() === "thead";
      const newCell = document.createElement(isHeadRow ? "th" : "td");
      newCell.style.cssText = isHeadRow
        ? "border: 1px solid #cbd5e1; background-color: #f1f5f9; padding: 8px 12px; font-weight: 700; color: #0f172a;"
        : "border: 1px solid #cbd5e1; padding: 8px 12px; color: #334155;";
      newCell.innerHTML = "<br>";
      const targetCell = row.cells[colIndex];
      if (targetCell) {
        row.insertBefore(newCell, targetCell);
      } else {
        row.appendChild(newCell);
      }
    });
    handleInput();
  };

  const handleInsertColRight = () => {
    if (!activeCellElement || !activeTableElement) return;
    const colIndex = activeCellElement.cellIndex;
    const rows = activeTableElement.querySelectorAll("tr");
    rows.forEach((row) => {
      const isHeadRow = row.parentElement?.tagName.toLowerCase() === "thead";
      const newCell = document.createElement(isHeadRow ? "th" : "td");
      newCell.style.cssText = isHeadRow
        ? "border: 1px solid #cbd5e1; background-color: #f1f5f9; padding: 8px 12px; font-weight: 700; color: #0f172a;"
        : "border: 1px solid #cbd5e1; padding: 8px 12px; color: #334155;";
      newCell.innerHTML = "<br>";
      const targetCell = row.cells[colIndex];
      if (targetCell && targetCell.nextSibling) {
        row.insertBefore(newCell, targetCell.nextSibling);
      } else {
        row.appendChild(newCell);
      }
    });
    handleInput();
  };

  const handleDeleteCol = () => {
    if (!activeCellElement || !activeTableElement) return;
    const colIndex = activeCellElement.cellIndex;
    const rows = activeTableElement.querySelectorAll("tr");
    if (rows[0]?.cells.length <= 1) {
      handleDeleteTable();
      return;
    }
    rows.forEach((row) => {
      if (row.cells[colIndex]) {
        row.removeChild(row.cells[colIndex]);
      }
    });
    setActiveCellElement(null);
    handleInput();
    updateActiveTableState();
  };

  const handleDeleteTable = () => {
    if (!activeTableElement) return;
    const wrapper = activeTableElement.closest(".rte-table-wrapper");
    if (wrapper && wrapper.parentElement) {
      wrapper.parentElement.removeChild(wrapper);
    } else if (activeTableElement.parentElement) {
      activeTableElement.parentElement.removeChild(activeTableElement);
    }
    setActiveTableElement(null);
    setActiveCellElement(null);
    setShowTablePicker(false);
    handleInput();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Tab") {
      const sel = window.getSelection();
      if (!sel || sel.rangeCount === 0) return;
      let node: Node | null = sel.anchorNode;
      if (node && node.nodeType === 3) {
        node = node.parentElement;
      }
      const cell = (node as HTMLElement | null)?.closest("td, th") as HTMLTableCellElement | null;
      if (cell) {
        e.preventDefault();
        const table = cell.closest("table");
        if (!table) return;

        const allCells = Array.from(table.querySelectorAll("th, td")) as HTMLElement[];
        const currentIndex = allCells.indexOf(cell);

        if (e.shiftKey) {
          if (currentIndex > 0) {
            const prevCell = allCells[currentIndex - 1];
            prevCell.focus();
            const range = document.createRange();
            range.selectNodeContents(prevCell);
            range.collapse(false);
            sel.removeAllRanges();
            sel.addRange(range);
            updateActiveTableState(prevCell);
          }
        } else {
          if (currentIndex < allCells.length - 1) {
            const nextCell = allCells[currentIndex + 1];
            nextCell.focus();
            const range = document.createRange();
            range.selectNodeContents(nextCell);
            range.collapse(false);
            sel.removeAllRanges();
            sel.addRange(range);
            updateActiveTableState(nextCell);
          } else {
            // At the very last cell: append new row!
            const tbody = table.querySelector("tbody") || table;
            const lastRow = table.rows[table.rows.length - 1];
            const colCount = lastRow.cells.length;
            const newRow = document.createElement("tr");
            for (let i = 0; i < colCount; i++) {
              const newCell = document.createElement("td");
              newCell.style.cssText = "border: 1px solid #cbd5e1; padding: 8px 12px; color: #334155;";
              newCell.innerHTML = "<br>";
              newRow.appendChild(newCell);
            }
            tbody.appendChild(newRow);
            handleInput();
            const firstNewCell = newRow.cells[0];
            firstNewCell.focus();
            const range = document.createRange();
            range.selectNodeContents(firstNewCell);
            range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range);
            updateActiveTableState(firstNewCell);
          }
        }
      }
    }
  };

  const handleEditorClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    updateActiveTableState(target);
    const latexWrapper = target.closest(".katex-eq-inline, .katex-eq-block") as HTMLElement | null;
    if (latexWrapper) {
      const rawEncoded = latexWrapper.getAttribute("data-latex");
      const isBlockAttr = latexWrapper.getAttribute("data-is-block") === "true";
      if (rawEncoded) {
        try {
          const decoded = decodeURIComponent(rawEncoded);
          setLatexCode(decoded);
          setLatexIsBlock(isBlockAttr);
          setEditingLatexNode(latexWrapper);
          setShowLatexDialog(true);
        } catch {
          // fallback
        }
      }
    }
  };

  // Close menus on click outside
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".rte-popover") && !target.closest(".rte-trigger")) {
        setShowColorPicker(false);
        setShowHighlightPicker(false);
        setShowAlignPicker(false);
        setShowLinkDialog(false);
        setShowMathPicker(false);
        setShowTablePicker(false);
      }
    };
    document.addEventListener("mousedown", handleGlobalClick);
    return () => document.removeEventListener("mousedown", handleGlobalClick);
  }, []);

  return (
    <div className={`border border-zinc-300 rounded-[6px] bg-white overflow-hidden shadow-xs ${className}`}>
      
      {/* WYSIWYG Toolbar matching the user's provided UI design */}
      <div className="flex flex-wrap items-center gap-0.5 px-2.5 py-2 bg-[#fcfcfd] border-b border-zinc-200 select-none text-zinc-700">
        
        {/* 1. Bold (B) */}
        <button
          type="button"
          onMouseDown={(e) => { e.preventDefault(); saveCurrentSelection(); exec("bold"); }}
          className="w-7 h-7 flex items-center justify-center rounded hover:bg-zinc-200/80 active:bg-zinc-300 text-zinc-800 transition-colors font-black text-sm"
          title="Bold (Ctrl+B)"
        >
          <span className="font-extrabold font-serif">B</span>
        </button>

        {/* 2. Italic (I) */}
        <button
          type="button"
          onMouseDown={(e) => { e.preventDefault(); saveCurrentSelection(); exec("italic"); }}
          className="w-7 h-7 flex items-center justify-center rounded hover:bg-zinc-200/80 active:bg-zinc-300 text-zinc-800 transition-colors italic font-serif text-sm"
          title="Italic (Ctrl+I)"
        >
          <span>I</span>
        </button>

        {/* 3. Underline (U) */}
        <button
          type="button"
          onMouseDown={(e) => { e.preventDefault(); saveCurrentSelection(); exec("underline"); }}
          className="w-7 h-7 flex items-center justify-center rounded hover:bg-zinc-200/80 active:bg-zinc-300 text-zinc-800 transition-colors underline font-semibold text-sm"
          title="Underline (Ctrl+U)"
        >
          <span>U</span>
        </button>

        {/* 4. Strikethrough (S) */}
        <button
          type="button"
          onMouseDown={(e) => { e.preventDefault(); saveCurrentSelection(); exec("strikeThrough"); }}
          className="w-7 h-7 flex items-center justify-center rounded hover:bg-zinc-200/80 active:bg-zinc-300 text-zinc-800 transition-colors line-through font-semibold text-sm"
          title="Strikethrough"
        >
          <span>S</span>
        </button>

        <div className="w-px h-5 bg-zinc-200 mx-1 self-center" />

        {/* 5. Code (</>) */}
        <button
          type="button"
          onMouseDown={(e) => { e.preventDefault(); saveCurrentSelection(); handleInsertCode(); }}
          className="w-7 h-7 flex items-center justify-center rounded hover:bg-zinc-200/80 active:bg-zinc-300 text-zinc-700 transition-colors text-xs font-mono font-bold"
          title="Inline Code"
        >
          <span>&lt;/&gt;</span>
        </button>

        {/* 6. H1 */}
        <button
          type="button"
          onMouseDown={(e) => { e.preventDefault(); saveCurrentSelection(); applyHeading("h1"); }}
          className="w-7 h-7 flex items-center justify-center rounded hover:bg-zinc-200/80 active:bg-zinc-300 text-zinc-800 transition-colors text-xs font-bold"
          title="Heading 1"
        >
          <span>H<sub className="font-normal text-[9px]">1</sub></span>
        </button>

        {/* 7. H2 */}
        <button
          type="button"
          onMouseDown={(e) => { e.preventDefault(); saveCurrentSelection(); applyHeading("h2"); }}
          className="w-7 h-7 flex items-center justify-center rounded hover:bg-zinc-200/80 active:bg-zinc-300 text-zinc-800 transition-colors text-xs font-bold"
          title="Heading 2"
        >
          <span>H<sub className="font-normal text-[9px]">2</sub></span>
        </button>

        <div className="w-px h-5 bg-zinc-200 mx-1 self-center" />

        {/* 8. Numbered List (1. =) */}
        <button
          type="button"
          onMouseDown={(e) => { e.preventDefault(); saveCurrentSelection(); exec("insertOrderedList"); }}
          className="w-7 h-7 flex items-center justify-center rounded hover:bg-zinc-200/80 active:bg-zinc-300 text-zinc-700 transition-colors"
          title="Numbered List"
        >
          <ListOrdered className="w-4 h-4" />
        </button>

        {/* 9. Bullet List (• =) */}
        <button
          type="button"
          onMouseDown={(e) => { e.preventDefault(); saveCurrentSelection(); exec("insertUnorderedList"); }}
          className="w-7 h-7 flex items-center justify-center rounded hover:bg-zinc-200/80 active:bg-zinc-300 text-zinc-700 transition-colors"
          title="Bullet List"
        >
          <List className="w-4 h-4" />
        </button>

        <div className="w-px h-5 bg-zinc-200 mx-1 self-center" />

        {/* 10. Format Dropdown (Normal ⬍) */}
        <div className="relative">
          <select
            value={activeFormat}
            onChange={(e) => applyHeading(e.target.value)}
            className="text-xs font-medium text-zinc-800 bg-transparent px-2 py-1 pr-6 rounded border border-transparent hover:border-zinc-300 focus:outline-none cursor-pointer appearance-none"
            title="Paragraph Style"
          >
            <option value="p">Normal</option>
            <option value="h1">Heading 1</option>
            <option value="h2">Heading 2</option>
            <option value="h3">Heading 3</option>
            <option value="blockquote">Quote</option>
          </select>
          <div className="absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500 text-[10px]">
            ⇅
          </div>
        </div>

        <div className="w-px h-5 bg-zinc-200 mx-1 self-center" />

        {/* 11. Text Color (A underlined) */}
        <div className="relative">
          <button
            type="button"
            onClick={() => { saveCurrentSelection(); setShowColorPicker(!showColorPicker); }}
            className={`rte-trigger w-7 h-7 flex flex-col items-center justify-center rounded transition-colors ${
              showColorPicker ? "bg-blue-50 ring-1.5 ring-blue-500 text-blue-900" : "hover:bg-zinc-200/80 active:bg-zinc-300 text-zinc-800"
            }`}
            title="Text Color"
          >
            <span className="font-bold text-xs leading-none">A</span>
            <div
              className="w-3.5 h-0.5 mt-0.5"
              style={{ backgroundColor: selectedTextColor || "#000000" }}
            />
          </button>

          {showColorPicker && (
            <div className="rte-popover absolute left-0 top-full mt-1 p-2 bg-white border border-zinc-300 rounded-[3px] shadow-xl z-50 w-[196px] select-none">
              <div className="grid grid-cols-7 gap-1">
                {COLOR_PALETTE_ROWS.flat().map((color, idx) => {
                  const isSelected = selectedTextColor.toLowerCase() === color.toLowerCase();
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setSelectedTextColor(color);
                        exec("foreColor", color);
                        setShowColorPicker(false);
                      }}
                      className={`w-6 h-6 rounded-[2px] transition-all cursor-pointer relative ${
                        color.toLowerCase() === "#ffffff" ? "border border-zinc-300" : "border border-black/10"
                      } ${
                        isSelected
                          ? "ring-2 ring-black scale-105 z-10 shadow-xs"
                          : "hover:scale-105 hover:ring-1 hover:ring-black/60"
                      }`}
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* 12. Highlight Color (A patterned) */}
        <div className="relative">
          <button
            type="button"
            onClick={() => { saveCurrentSelection(); setShowHighlightPicker(!showHighlightPicker); }}
            className={`rte-trigger w-7 h-7 flex items-center justify-center rounded transition-colors ${
              showHighlightPicker ? "bg-blue-50 ring-1.5 ring-blue-500 text-blue-900" : "hover:bg-zinc-200/80 active:bg-zinc-300 text-zinc-800"
            }`}
            title="Highlight / Background Color"
          >
            <span
              className="font-bold text-xs px-1 py-0.2 rounded-xs border border-zinc-300/80"
              style={{ backgroundColor: selectedHighlightColor || "#fef08a" }}
            >
              A
            </span>
          </button>

          {showHighlightPicker && (
            <div className="rte-popover absolute left-0 top-full mt-1 p-2 bg-white border border-zinc-300 rounded-[3px] shadow-xl z-50 w-[196px] select-none">
              <div className="grid grid-cols-7 gap-1">
                {COLOR_PALETTE_ROWS.flat().map((color, idx) => {
                  const isSelected = selectedHighlightColor.toLowerCase() === color.toLowerCase();
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setSelectedHighlightColor(color);
                        if (color.toLowerCase() === "#ffffff") {
                          exec("hiliteColor", "transparent");
                        } else {
                          exec("hiliteColor", color);
                        }
                        setShowHighlightPicker(false);
                      }}
                      className={`w-6 h-6 rounded-[2px] transition-all cursor-pointer relative ${
                        color.toLowerCase() === "#ffffff" ? "border border-zinc-300" : "border border-black/10"
                      } ${
                        isSelected
                          ? "ring-2 ring-black scale-105 z-10 shadow-xs"
                          : "hover:scale-105 hover:ring-1 hover:ring-black/60"
                      }`}
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  );
                })}
              </div>
              <div className="pt-1.5 mt-1.5 border-t border-zinc-200 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    exec("hiliteColor", "transparent");
                    setSelectedHighlightColor("");
                    setShowHighlightPicker(false);
                  }}
                  className="text-[10px] text-zinc-500 hover:text-black font-semibold cursor-pointer"
                >
                  Clear Highlight
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="w-px h-5 bg-zinc-200 mx-1 self-center" />

        {/* 13. Text Alignment (≡) */}
        <div className="relative">
          <button
            type="button"
            onClick={() => { saveCurrentSelection(); setShowAlignPicker(!showAlignPicker); }}
            className="rte-trigger w-7 h-7 flex items-center justify-center rounded hover:bg-zinc-200/80 active:bg-zinc-300 text-zinc-700 transition-colors"
            title="Align Text"
          >
            <AlignLeft className="w-4 h-4" />
          </button>

          {showAlignPicker && (
            <div className="rte-popover absolute left-0 top-full mt-1 p-1 bg-white border border-zinc-300 rounded-[6px] shadow-lg z-30 flex gap-1">
              <button
                type="button"
                onClick={() => { exec("justifyLeft"); setShowAlignPicker(false); }}
                className="w-7 h-7 flex items-center justify-center rounded hover:bg-zinc-100 text-zinc-700"
                title="Align Left"
              >
                <AlignLeft className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => { exec("justifyCenter"); setShowAlignPicker(false); }}
                className="w-7 h-7 flex items-center justify-center rounded hover:bg-zinc-100 text-zinc-700"
                title="Align Center"
              >
                <AlignCenter className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => { exec("justifyRight"); setShowAlignPicker(false); }}
                className="w-7 h-7 flex items-center justify-center rounded hover:bg-zinc-100 text-zinc-700"
                title="Align Right"
              >
                <AlignRight className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => { exec("justifyFull"); setShowAlignPicker(false); }}
                className="w-7 h-7 flex items-center justify-center rounded hover:bg-zinc-100 text-zinc-700"
                title="Justify"
              >
                <AlignJustify className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* 14. Clear Formatting (Tx) */}
        <button
          type="button"
          onMouseDown={(e) => { e.preventDefault(); saveCurrentSelection(); handleClearFormat(); }}
          className="w-7 h-7 flex items-center justify-center rounded hover:bg-zinc-200/80 active:bg-zinc-300 text-zinc-700 transition-colors text-xs font-semibold"
          title="Clear Formatting (Tx)"
        >
          <span>T<sub className="text-[9px]">x</sub></span>
        </button>

        <div className="w-px h-5 bg-zinc-200 mx-1 self-center" />

        {/* 15. Link (🔗) */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              saveCurrentSelection();
              const sel = window.getSelection();
              setLinkText(sel ? sel.toString() : "");
              setShowLinkDialog(!showLinkDialog);
            }}
            className="rte-trigger w-7 h-7 flex items-center justify-center rounded hover:bg-zinc-200/80 active:bg-zinc-300 text-zinc-700 transition-colors"
            title="Insert / Edit Link"
          >
            <LinkIcon className="w-3.5 h-3.5" />
          </button>

          {showLinkDialog && (
            <div className="rte-popover absolute left-0 sm:right-0 sm:left-auto top-full mt-1 p-3 bg-white border border-zinc-300 rounded-[6px] shadow-xl z-30 w-72 space-y-2.5">
              <span className="text-xs font-bold text-zinc-800 block">Insert Hyperlink</span>
              <div>
                <label className="text-[11px] text-zinc-500 block mb-0.5">Link URL:</label>
                <input
                  type="url"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full px-2.5 py-1.5 border border-zinc-300 rounded-[4px] text-xs font-mono"
                  autoFocus
                />
              </div>
              <div>
                <label className="text-[11px] text-zinc-500 block mb-0.5">Display Text:</label>
                <input
                  type="text"
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  placeholder="Click here..."
                  className="w-full px-2.5 py-1.5 border border-zinc-300 rounded-[4px] text-xs"
                />
              </div>
              <div className="flex items-center justify-between pt-1">
                <button
                  type="button"
                  onClick={handleRemoveLink}
                  className="text-xs text-red-600 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Unlink className="w-3 h-3" />
                  <span>Remove</span>
                </button>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowLinkDialog(false)}
                    className="px-2.5 py-1 text-xs text-zinc-600 hover:bg-zinc-100 rounded cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleApplyLink}
                    className="px-3 py-1 bg-black text-white text-xs font-bold rounded cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 16. Formula & Symbols (fx) */}
        <div className="relative">
          <button
            type="button"
            onClick={() => { saveCurrentSelection(); setShowMathPicker(!showMathPicker); }}
            className="rte-trigger w-7 h-7 flex items-center justify-center rounded hover:bg-zinc-200/80 active:bg-zinc-300 text-zinc-800 transition-colors italic font-serif text-sm font-semibold"
            title="Formula & Special Symbols (fx)"
          >
            <span>f<sub className="not-italic text-[9px] font-sans font-bold">x</sub></span>
          </button>

          {showMathPicker && (
            <div className="rte-popover absolute right-0 top-full mt-1 p-3 bg-white border border-zinc-300 rounded-[6px] shadow-xl z-30 w-64 space-y-2.5">
              <span className="text-xs font-bold text-zinc-800 block">Math & Symbols</span>
              
              {/* Subscript / Superscript Buttons */}
              <div className="flex items-center gap-2 pb-2 border-b border-zinc-100">
                <span className="text-[11px] text-zinc-500">Script:</span>
                <button
                  type="button"
                  onClick={() => { exec("superscript"); setShowMathPicker(false); }}
                  className="px-2 py-0.5 border border-zinc-200 rounded text-xs hover:bg-zinc-100 cursor-pointer font-bold"
                  title="Superscript (e.g. x²)"
                >
                  x²
                </button>
                <button
                  type="button"
                  onClick={() => { exec("subscript"); setShowMathPicker(false); }}
                  className="px-2 py-0.5 border border-zinc-200 rounded text-xs hover:bg-zinc-100 cursor-pointer font-bold"
                  title="Subscript (e.g. H₂O)"
                >
                  x₂
                </button>
              </div>

              {/* Symbols Grid */}
              <div className="grid grid-cols-7 gap-1">
                {MATH_SYMBOLS.map((sym, sIdx) => (
                  <button
                    key={sIdx}
                    type="button"
                    onClick={() => {
                      handleInsertSymbol(sym);
                      setShowMathPicker(false);
                    }}
                    className="w-7 h-7 flex items-center justify-center rounded border border-zinc-200 hover:bg-zinc-100 hover:border-zinc-400 text-xs font-medium cursor-pointer"
                  >
                    {sym}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 17. LaTeX Equation Tool (√x TeX) */}
        <button
          type="button"
          onClick={handleOpenLatexDialog}
          className={`rte-trigger px-2 h-7 flex items-center gap-1.5 rounded transition-colors cursor-pointer border ${
            showLatexDialog
              ? "bg-black text-white border-black"
              : "bg-amber-50 hover:bg-amber-100 active:bg-amber-200 border-amber-300 text-amber-950 shadow-2xs"
          }`}
          title="LaTeX Math Equation"
        >
          <span className="font-serif font-bold text-xs italic tracking-tight">T<sub className="font-sans font-extrabold text-[8px] not-italic">E</sub>X</span>
          <span className="text-[11px] font-bold">LaTeX</span>
        </button>

        {/* 18. Table Tool */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              saveCurrentSelection();
              setShowTablePicker(!showTablePicker);
            }}
            className={`rte-trigger px-2 h-7 flex items-center gap-1.5 rounded transition-colors cursor-pointer border ${
              showTablePicker || activeTableElement
                ? "bg-blue-600 text-white border-blue-600 shadow-2xs"
                : "bg-blue-50/70 hover:bg-blue-100 active:bg-blue-200 border-blue-200 text-blue-950 shadow-2xs"
            }`}
            title="Insert or Manage Table"
          >
            <TableIcon className="w-3.5 h-3.5" />
            <span className="text-[11px] font-bold">Table</span>
            {activeTableElement && (
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            )}
          </button>

          {showTablePicker && (
            <div className="rte-popover absolute left-0 sm:left-auto sm:right-0 top-full mt-1 p-3.5 bg-white border border-zinc-300 rounded-lg shadow-2xl z-40 w-80 space-y-3.5 select-none animate-in fade-in zoom-in-95 duration-150">
              
              {/* Header */}
              <div className="flex items-center justify-between border-b border-zinc-100 pb-2">
                <span className="text-xs font-bold text-zinc-900 flex items-center gap-1.5">
                  <TableIcon className="w-4 h-4 text-blue-600" />
                  <span>Insert / Manage Table</span>
                </span>
                <button
                  type="button"
                  onClick={() => setShowTablePicker(false)}
                  className="text-zinc-400 hover:text-black p-0.5 rounded cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* If active table is present: Show active table operations */}
              {activeTableElement ? (
                <div className="space-y-3">
                  <div className="p-2.5 bg-blue-50/80 border border-blue-200 rounded-md">
                    <p className="text-[11px] font-bold text-blue-900 mb-1.5 flex items-center gap-1">
                      <span>✓ Active Table Selected</span>
                    </p>
                    
                    {/* Rows */}
                    <div className="space-y-1 mb-2">
                      <span className="text-[10px] font-semibold text-blue-800 uppercase tracking-wide">Row Actions:</span>
                      <div className="grid grid-cols-2 gap-1.5">
                        <button
                          type="button"
                          onClick={handleInsertRowAbove}
                          className="px-2 py-1 bg-white hover:bg-zinc-50 border border-blue-200 rounded text-xs font-medium text-zinc-800 flex items-center gap-1 cursor-pointer"
                        >
                          <ArrowUp className="w-3 h-3 text-blue-600" />
                          <span>+ Row Above</span>
                        </button>
                        <button
                          type="button"
                          onClick={handleInsertRowBelow}
                          className="px-2 py-1 bg-white hover:bg-zinc-50 border border-blue-200 rounded text-xs font-medium text-zinc-800 flex items-center gap-1 cursor-pointer"
                        >
                          <ArrowDown className="w-3 h-3 text-blue-600" />
                          <span>+ Row Below</span>
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={handleDeleteRow}
                        className="w-full mt-1 px-2 py-1 bg-white hover:bg-red-50 border border-red-200 rounded text-xs font-medium text-red-700 flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3 text-red-500" />
                        <span>Delete Selected Row</span>
                      </button>
                    </div>

                    {/* Columns */}
                    <div className="space-y-1">
                      <span className="text-[10px] font-semibold text-blue-800 uppercase tracking-wide">Column Actions:</span>
                      <div className="grid grid-cols-2 gap-1.5">
                        <button
                          type="button"
                          onClick={handleInsertColLeft}
                          className="px-2 py-1 bg-white hover:bg-zinc-50 border border-blue-200 rounded text-xs font-medium text-zinc-800 flex items-center gap-1 cursor-pointer"
                        >
                          <ArrowLeft className="w-3 h-3 text-blue-600" />
                          <span>+ Column Left</span>
                        </button>
                        <button
                          type="button"
                          onClick={handleInsertColRight}
                          className="px-2 py-1 bg-white hover:bg-zinc-50 border border-blue-200 rounded text-xs font-medium text-zinc-800 flex items-center gap-1 cursor-pointer"
                        >
                          <ArrowRight className="w-3 h-3 text-blue-600" />
                          <span>+ Column Right</span>
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={handleDeleteCol}
                        className="w-full mt-1 px-2 py-1 bg-white hover:bg-red-50 border border-red-200 rounded text-xs font-medium text-red-700 flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3 text-red-500" />
                        <span>Delete Selected Column</span>
                      </button>
                    </div>

                    {/* Delete entire table */}
                    <button
                      type="button"
                      onClick={handleDeleteTable}
                      className="w-full mt-2.5 px-2.5 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-xs transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete Entire Table</span>
                    </button>
                  </div>

                  <div className="border-t border-zinc-200 pt-2">
                    <span className="text-[11px] font-bold text-zinc-600 block mb-1.5">Or Insert New Table:</span>
                  </div>
                </div>
              ) : null}

              {/* Grid Selector */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-zinc-700">Quick Grid Selector:</span>
                  <span className="text-[10px] font-mono font-bold bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded border border-blue-200">
                    {hoveredGrid.cols} × {hoveredGrid.rows}
                  </span>
                </div>

                {/* 8 Columns x 6 Rows Interactive Grid */}
                <div
                  className="grid grid-cols-8 gap-1 p-2 bg-zinc-50 border border-zinc-200 rounded-lg justify-center w-full"
                  onMouseLeave={() => setHoveredGrid({ rows: 3, cols: 3 })}
                >
                  {Array.from({ length: 6 }).map((_, rIdx) =>
                    Array.from({ length: 8 }).map((_, cIdx) => {
                      const isHighlighted =
                        rIdx < hoveredGrid.rows && cIdx < hoveredGrid.cols;
                      return (
                        <div
                          key={`${rIdx}-${cIdx}`}
                          onMouseEnter={() => setHoveredGrid({ rows: rIdx + 1, cols: cIdx + 1 })}
                          onClick={() => {
                            handleInsertTable(rIdx + 1, cIdx + 1, tableIncludeHeader, tableStyle);
                          }}
                          className={`w-6 h-6 rounded-[3px] border cursor-pointer transition-all duration-75 ${
                            isHighlighted
                              ? "bg-blue-600 border-blue-700 shadow-2xs scale-105"
                              : "bg-white border-zinc-200 hover:border-zinc-400"
                          }`}
                          title={`${cIdx + 1} Columns × ${rIdx + 1} Rows`}
                        />
                      );
                    })
                  )}
                </div>
              </div>

              {/* Custom Size Form */}
              <div className="pt-2 border-t border-zinc-100 space-y-2.5">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-zinc-500 font-semibold block mb-0.5">Rows:</label>
                    <input
                      type="number"
                      min={1}
                      max={30}
                      value={customTableRows}
                      onChange={(e) => setCustomTableRows(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full px-2 py-1 text-xs border border-zinc-300 rounded font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-zinc-500 font-semibold block mb-0.5">Columns:</label>
                    <input
                      type="number"
                      min={1}
                      max={15}
                      value={customTableCols}
                      onChange={(e) => setCustomTableCols(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full px-2 py-1 text-xs border border-zinc-300 rounded font-mono"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <label className="flex items-center gap-1.5 cursor-pointer text-zinc-700">
                    <input
                      type="checkbox"
                      checked={tableIncludeHeader}
                      onChange={(e) => setTableIncludeHeader(e.target.checked)}
                      className="rounded text-blue-600 focus:ring-0"
                    />
                    <span className="text-[11px] font-medium">Header Row</span>
                  </label>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setTableStyle("bordered")}
                      className={`px-1.5 py-0.5 text-[10px] font-semibold rounded cursor-pointer ${
                        tableStyle === "bordered"
                          ? "bg-zinc-800 text-white"
                          : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                      }`}
                    >
                      Standard
                    </button>
                    <button
                      type="button"
                      onClick={() => setTableStyle("striped")}
                      className={`px-1.5 py-0.5 text-[10px] font-semibold rounded cursor-pointer ${
                        tableStyle === "striped"
                          ? "bg-zinc-800 text-white"
                          : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                      }`}
                    >
                      Striped
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    handleInsertTable(customTableRows, customTableCols, tableIncludeHeader, tableStyle);
                  }}
                  className="w-full py-1.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-bold rounded shadow-xs cursor-pointer flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Create {customTableRows}×{customTableCols} Table</span>
                </button>
              </div>

            </div>
          )}
        </div>

        {/* View Mode Toggle: Visual vs Raw HTML */}
        <div className="ml-auto flex items-center gap-1 pl-2">
          <button
            type="button"
            onClick={() => setIsHtmlView(!isHtmlView)}
            className={`px-2 py-1 text-[11px] font-bold rounded flex items-center gap-1 transition-colors cursor-pointer ${
              isHtmlView
                ? "bg-black text-white"
                : "text-zinc-600 hover:bg-zinc-200"
            }`}
            title="HTML Source Toggle"
          >
            <FileCode className="w-3 h-3" />
            <span>{isHtmlView ? "Editor" : "HTML"}</span>
          </button>
        </div>

      </div>

      {/* Contextual In-Table Quick Action Ribbon */}
      {activeTableElement && (
        <div className="flex flex-wrap items-center justify-between gap-1.5 px-3 py-1.5 bg-blue-50/90 border-b border-blue-200 text-xs text-blue-950 animate-in fade-in duration-100 select-none">
          <div className="flex items-center flex-wrap gap-2">
            <span className="font-bold flex items-center gap-1 text-blue-900">
              <TableIcon className="w-3.5 h-3.5 text-blue-700" />
              <span>Table Tools:</span>
            </span>
            <div className="h-4 w-px bg-blue-200 hidden sm:block" />
            
            {/* Row actions */}
            <div className="flex items-center gap-1">
              <span className="text-[10px] uppercase font-bold text-blue-700">Row:</span>
              <button
                type="button"
                onMouseDown={(e) => { e.preventDefault(); handleInsertRowAbove(); }}
                className="px-1.5 py-0.5 rounded bg-white hover:bg-blue-100 border border-blue-200 text-[11px] font-medium text-blue-900 cursor-pointer flex items-center gap-0.5 shadow-2xs"
                title="Insert Row Above"
              >
                <ArrowUp className="w-3 h-3 text-blue-600" />
                <span>+Above</span>
              </button>
              <button
                type="button"
                onMouseDown={(e) => { e.preventDefault(); handleInsertRowBelow(); }}
                className="px-1.5 py-0.5 rounded bg-white hover:bg-blue-100 border border-blue-200 text-[11px] font-medium text-blue-900 cursor-pointer flex items-center gap-0.5 shadow-2xs"
                title="Insert Row Below"
              >
                <ArrowDown className="w-3 h-3 text-blue-600" />
                <span>+Below</span>
              </button>
              <button
                type="button"
                onMouseDown={(e) => { e.preventDefault(); handleDeleteRow(); }}
                className="px-1.5 py-0.5 rounded bg-white hover:bg-red-50 border border-red-200 text-[11px] font-medium text-red-700 cursor-pointer flex items-center gap-0.5 shadow-2xs"
                title="Delete Row"
              >
                <Trash2 className="w-3 h-3 text-red-500" />
                <span>Delete Row</span>
              </button>
            </div>

            <div className="h-4 w-px bg-blue-200 hidden sm:block" />

            {/* Column actions */}
            <div className="flex items-center gap-1">
              <span className="text-[10px] uppercase font-bold text-blue-700">Col:</span>
              <button
                type="button"
                onMouseDown={(e) => { e.preventDefault(); handleInsertColLeft(); }}
                className="px-1.5 py-0.5 rounded bg-white hover:bg-blue-100 border border-blue-200 text-[11px] font-medium text-blue-900 cursor-pointer flex items-center gap-0.5 shadow-2xs"
                title="Insert Column Left"
              >
                <ArrowLeft className="w-3 h-3 text-blue-600" />
                <span>+Left</span>
              </button>
              <button
                type="button"
                onMouseDown={(e) => { e.preventDefault(); handleInsertColRight(); }}
                className="px-1.5 py-0.5 rounded bg-white hover:bg-blue-100 border border-blue-200 text-[11px] font-medium text-blue-900 cursor-pointer flex items-center gap-0.5 shadow-2xs"
                title="Insert Column Right"
              >
                <ArrowRight className="w-3 h-3 text-blue-600" />
                <span>+Right</span>
              </button>
              <button
                type="button"
                onMouseDown={(e) => { e.preventDefault(); handleDeleteCol(); }}
                className="px-1.5 py-0.5 rounded bg-white hover:bg-red-50 border border-red-200 text-[11px] font-medium text-red-700 cursor-pointer flex items-center gap-0.5 shadow-2xs"
                title="Delete Column"
              >
                <Trash2 className="w-3 h-3 text-red-500" />
                <span>Delete Col</span>
              </button>
            </div>
          </div>

          {/* Delete entire table */}
          <button
            type="button"
            onMouseDown={(e) => { e.preventDefault(); handleDeleteTable(); }}
            className="px-2 py-0.5 rounded bg-red-100 hover:bg-red-200 border border-red-300 text-[11px] font-bold text-red-800 cursor-pointer flex items-center gap-1 transition-colors ml-auto sm:ml-0"
            title="Delete Entire Table"
          >
            <Trash2 className="w-3 h-3 text-red-600" />
            <span>Delete Table</span>
          </button>
        </div>
      )}

      {/* Editor Body */}
      {isHtmlView ? (
        <div className="p-3 bg-zinc-950 font-mono text-xs text-emerald-400">
          <textarea
            rows={8}
            value={rawHtml}
            onChange={(e) => {
              setRawHtml(e.target.value);
              onChange(e.target.value);
              if (editorRef.current) {
                editorRef.current.innerHTML = e.target.value;
              }
            }}
            className="w-full bg-transparent text-emerald-400 font-mono text-xs outline-none resize-y"
            placeholder="<html>..."
          />
        </div>
      ) : (
        <div className="relative min-h-[160px] p-4 text-xs sm:text-sm text-slate-800 leading-relaxed">
          {/* Editable Content Area */}
          <div
            ref={editorRef}
            contentEditable
            onInput={handleInput}
            onBlur={handleInput}
            onKeyDown={handleKeyDown}
            onKeyUp={saveCurrentSelection}
            onMouseUp={saveCurrentSelection}
            onClick={(e) => {
              saveCurrentSelection();
              handleEditorClick(e);
            }}
            className="outline-none min-h-[140px] focus:ring-0 [&_h1]:text-lg [&_h1]:font-extrabold [&_h1]:text-slate-900 [&_h1]:mb-2 [&_h2]:text-base [&_h2]:font-bold [&_h2]:text-slate-900 [&_h2]:mb-1.5 [&_h3]:text-sm [&_h3]:font-bold [&_h3]:text-slate-800 [&_h3]:mb-1 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:my-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:my-2 [&_li]:my-0.5 [&_blockquote]:border-l-3 [&_blockquote]:border-[#9B3A32] [&_blockquote]:pl-3 [&_blockquote]:italic [&_blockquote]:text-slate-600 [&_blockquote]:my-2 [&_p]:my-1 leading-relaxed [&_.rte-table]:w-full [&_.rte-table]:border-collapse [&_.rte-table]:my-3 [&_.rte-table_th]:border [&_.rte-table_th]:border-slate-300 [&_.rte-table_th]:bg-slate-100 [&_.rte-table_th]:px-3 [&_.rte-table_th]:py-2 [&_.rte-table_th]:font-bold [&_.rte-table_th]:text-slate-900 [&_.rte-table_th]:text-left [&_.rte-table_td]:border [&_.rte-table_td]:border-slate-300 [&_.rte-table_td]:px-3 [&_.rte-table_td]:py-2 [&_.rte-table_td]:text-slate-800"
            style={{ minHeight: "140px" }}
          />

          {/* Placeholder when content is empty */}
          {(!rawHtml || rawHtml === "<p><br></p>" || rawHtml === "<br>" || rawHtml.trim() === "") && (
            <div
              onClick={() => editorRef.current?.focus()}
              className="absolute left-4 top-4 text-zinc-400 italic pointer-events-none select-none text-xs sm:text-sm"
            >
              {placeholder}
            </div>
          )}
        </div>
      )}

      {/* Editor Footer / Helper shortcuts */}
      <div className="px-3 py-1.5 bg-[#fafbfc] border-t border-zinc-200/80 flex items-center justify-between text-[11px] text-zinc-500">
        <div className="flex items-center gap-2">
          <span>Quick Insert:</span>
          <button
            type="button"
            onClick={() => {
              handleInsertSymbol("👉 ");
            }}
            className="px-1.5 py-0.5 rounded bg-white border border-zinc-200 hover:border-zinc-400 text-zinc-700 cursor-pointer font-medium"
          >
            👉 Point
          </button>
          <button
            type="button"
            onClick={() => {
              handleInsertSymbol("📌 Note: ");
            }}
            className="px-1.5 py-0.5 rounded bg-white border border-zinc-200 hover:border-zinc-400 text-zinc-700 cursor-pointer font-medium"
          >
            📌 Note
          </button>
          <button
            type="button"
            onClick={() => {
              handleInsertSymbol("🏛 ");
            }}
            className="px-1.5 py-0.5 rounded bg-white border border-zinc-200 hover:border-zinc-400 text-zinc-700 cursor-pointer font-medium"
          >
            🏛 Ref
          </button>
          <button
            type="button"
            onClick={handleOpenLatexDialog}
            className="px-2 py-0.5 rounded bg-amber-50 border border-amber-300 hover:bg-amber-100 text-amber-900 cursor-pointer font-bold flex items-center gap-1 transition-colors"
            title="LaTeX Math Formula"
          >
            <span className="font-serif italic font-bold text-xs">T<sub className="font-sans text-[8px] not-italic">E</sub>X</span>
            <span>+ LaTeX Formula</span>
          </button>
          <button
            type="button"
            onClick={() => {
              saveCurrentSelection();
              setShowTablePicker(true);
            }}
            className="px-2 py-0.5 rounded bg-blue-50 border border-blue-300 hover:bg-blue-100 text-blue-900 cursor-pointer font-bold flex items-center gap-1 transition-colors"
            title="Insert Table"
          >
            <TableIcon className="w-3.5 h-3.5 text-blue-700" />
            <span>+ Table</span>
          </button>
        </div>
        <span className="font-mono text-[10px] text-zinc-400">
          Rich HTML Engine
        </span>
      </div>

      {/* LaTeX Math Formula Dialog Modal */}
      {showLatexDialog && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full border border-zinc-200 overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="px-5 py-3.5 bg-gradient-to-r from-amber-50 via-white to-zinc-50 border-b border-zinc-200 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center font-serif font-bold italic shadow-xs">
                  <span>T<sub className="font-sans text-[9px] not-italic">E</sub>X</span>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-zinc-900 tracking-tight flex items-center gap-2">
                    <span>{editingLatexNode ? "Edit LaTeX Formula" : "LaTeX Math Formula Editor"}</span>
                  </h3>
                  <p className="text-[11px] text-zinc-500">
                    Write fractions, square roots, exponents, equations, and mathematical symbols.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowLatexDialog(false)}
                className="w-7 h-7 rounded-lg text-zinc-400 hover:text-black hover:bg-zinc-100 flex items-center justify-center cursor-pointer transition-colors"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-5 space-y-4 overflow-y-auto max-h-[calc(90vh-140px)]">
              
              {/* Display Mode Selector (Inline vs Block) */}
              <div className="flex items-center gap-3 p-2.5 bg-zinc-50 border border-zinc-200 rounded-lg">
                <span className="text-xs font-semibold text-zinc-700">Formula Type:</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setLatexIsBlock(false)}
                    className={`px-3 py-1 text-xs font-bold rounded-md transition-all cursor-pointer ${
                      !latexIsBlock
                        ? "bg-black text-white shadow-xs"
                        : "bg-white text-zinc-600 border border-zinc-300 hover:bg-zinc-100"
                    }`}
                  >
                    Inline ($...$)
                  </button>
                  <button
                    type="button"
                    onClick={() => setLatexIsBlock(true)}
                    className={`px-3 py-1 text-xs font-bold rounded-md transition-all cursor-pointer ${
                      latexIsBlock
                        ? "bg-black text-white shadow-xs"
                        : "bg-white text-zinc-600 border border-zinc-300 hover:bg-zinc-100"
                    }`}
                  >
                    Display Block ($$...$$)
                  </button>
                </div>
                <span className="text-[11px] text-zinc-400 ml-auto hidden sm:inline">
                  {!latexIsBlock ? "Appears inline within text" : "Appears centered on its own line"}
                </span>
              </div>

              {/* LaTeX Code Input Textarea */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-zinc-800 flex items-center gap-1.5">
                    <span>LaTeX Code:</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setLatexCode("")}
                    className="text-[11px] text-zinc-400 hover:text-red-600 cursor-pointer"
                  >
                    Clear
                  </button>
                </div>
                <textarea
                  rows={3}
                  value={latexCode}
                  onChange={(e) => setLatexCode(e.target.value)}
                  placeholder="e.g. \frac{-b \pm \sqrt{b^2 - 4ac}}{2a} or x^2 + y^2 = r^2"
                  className="w-full px-3 py-2 bg-zinc-900 text-emerald-400 font-mono text-xs sm:text-sm rounded-lg border border-zinc-700 focus:border-amber-400 focus:outline-none resize-y leading-relaxed"
                  autoFocus
                />
              </div>

              {/* Real-time KaTeX Live Preview Box */}
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-zinc-800 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Live KaTeX Preview:</span>
                </span>
                <div className="min-h-[70px] p-4 bg-white border border-zinc-300 rounded-lg flex items-center justify-center shadow-inner overflow-x-auto">
                  {(() => {
                    if (!latexCode || !latexCode.trim()) {
                      return <span className="text-zinc-400 italic text-xs">Equation preview will appear here...</span>;
                    }
                    try {
                      const html = katex.renderToString(latexCode.trim(), {
                        throwOnError: false,
                        displayMode: latexIsBlock,
                      });
                      return (
                        <div
                          className="text-base sm:text-lg text-zinc-900"
                          dangerouslySetInnerHTML={{ __html: html }}
                        />
                      );
                    } catch (e: any) {
                      return (
                        <span className="text-red-600 font-mono text-xs">
                          Error: {e.message || "Invalid LaTeX syntax"}
                        </span>
                      );
                    }
                  })()}
                </div>
              </div>

              {/* Quick Formula Presets & Templates */}
              <div className="space-y-2 pt-1 border-t border-zinc-200">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-zinc-800">Quick Formula Presets:</span>
                  <span className="text-[10px] text-zinc-400">Click to insert</span>
                </div>

                {/* Category Navigation Pills */}
                <div className="flex flex-wrap items-center gap-1">
                  {LATEX_PRESETS.map((cat, cIdx) => (
                    <button
                      key={cIdx}
                      type="button"
                      onClick={() => setActivePresetCategory(cIdx)}
                      className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-colors cursor-pointer ${
                        activePresetCategory === cIdx
                          ? "bg-amber-100 text-amber-900 border border-amber-300"
                          : "bg-zinc-100 hover:bg-zinc-200 text-zinc-600"
                      }`}
                    >
                      {cat.category}
                    </button>
                  ))}
                </div>

                {/* Preset Snippet Buttons */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-2 bg-zinc-50 border border-zinc-200 rounded-lg max-h-40 overflow-y-auto">
                  {LATEX_PRESETS[activePresetCategory]?.items.map((item, pIdx) => (
                    <button
                      key={pIdx}
                      type="button"
                      onClick={() => insertSnippetIntoLatex(item.latex)}
                      className="px-2 py-1.5 bg-white hover:bg-amber-50 border border-zinc-200 hover:border-amber-400 rounded-md text-left flex flex-col gap-0.5 transition-all cursor-pointer shadow-2xs group"
                      title={`LaTeX: ${item.latex}`}
                    >
                      <span className="text-xs font-bold text-zinc-900 group-hover:text-amber-900 font-mono">
                        {item.label}
                      </span>
                      <span className="text-[9px] text-zinc-400 group-hover:text-amber-700 truncate">
                        {item.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Modal Bottom Action Footer */}
            <div className="px-5 py-3 bg-[#fafbfc] border-t border-zinc-200 flex items-center justify-between">
              {editingLatexNode ? (
                <button
                  type="button"
                  onClick={handleDeleteLatex}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md border border-red-200 cursor-pointer transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
              ) : (
                <div className="text-[11px] text-zinc-400 flex items-center gap-1">
                  <span>💡 Click any formula in editor to edit directly</span>
                </div>
              )}

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowLatexDialog(false)}
                  className="px-3.5 py-1.5 text-xs text-zinc-600 hover:bg-zinc-200 rounded-md font-medium cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleApplyLatex}
                  disabled={!latexCode.trim()}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-black hover:bg-zinc-800 disabled:opacity-40 text-white text-xs font-bold rounded-md shadow-xs cursor-pointer transition-colors"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>{editingLatexNode ? "Save Changes (Update)" : "Insert Formula"}</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
