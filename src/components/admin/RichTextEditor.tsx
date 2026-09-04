"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
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
  X
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

  const saveCurrentSelection = () => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      savedSelection.current = sel.getRangeAt(0).cloneRange();
    }
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
                  रंग काढा (Clear Highlight)
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
            onKeyUp={saveCurrentSelection}
            onMouseUp={saveCurrentSelection}
            className="outline-none min-h-[140px] focus:ring-0 [&_h1]:text-lg [&_h1]:font-extrabold [&_h1]:text-slate-900 [&_h1]:mb-2 [&_h2]:text-base [&_h2]:font-bold [&_h2]:text-slate-900 [&_h2]:mb-1.5 [&_h3]:text-sm [&_h3]:font-bold [&_h3]:text-slate-800 [&_h3]:mb-1 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:my-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:my-2 [&_li]:my-0.5 [&_blockquote]:border-l-3 [&_blockquote]:border-[#9B3A32] [&_blockquote]:pl-3 [&_blockquote]:italic [&_blockquote]:text-slate-600 [&_blockquote]:my-2 [&_p]:my-1 leading-relaxed"
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
        </div>
        <span className="font-mono text-[10px] text-zinc-400">
          Rich HTML Engine
        </span>
      </div>

    </div>
  );
}
