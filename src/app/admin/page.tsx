"use client";

import { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as Switch from "@radix-ui/react-switch";
import {
  GripVertical,
  Edit2,
  Trash2,
  Plus,
  X,
  Lock,
  Save,
  RotateCcw,
  ExternalLink,
  LogOut,
  ImageIcon,
  MessageSquare,
  ShoppingCart,
  AlertTriangle,
  Scale,
  FileText,
  HelpCircle,
  Tag,
  Check,
  AlertCircle,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Link2,
  Unlink,
  Undo,
  Redo,
  RefreshCw,
  Eye,
  EyeOff,
  Sliders,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Layers
} from "lucide-react";
import defaultSiteData from "@/data/siteContent.json";
import { RichTextEditor } from "@/components/admin/RichTextEditor";

type SiteContent = Omit<typeof defaultSiteData, "sampleProof" | "syllabus"> & {
  sampleProof: Record<string, any>;
  syllabus?: any[];
  sections?: any[];
};

function getInitialHtmlForQuestion(item: any): string {
  if (item?.explanationHtml) return item.explanationHtml;
  if (item?.structuredExplanation) {
    let html = "";
    if (item.structuredExplanation.bullets?.length) {
      html += "<ul>";
      for (const b of item.structuredExplanation.bullets) {
        const color = b.highlightClass?.includes("text-[#9B3A32]")
          ? ' style="color: #9B3A32;"'
          : b.highlightClass?.includes("text-blue-700")
          ? ' style="color: #1d4ed8;"'
          : b.highlightClass?.includes("text-emerald-700")
          ? ' style="color: #047857;"'
          : "";
        html += `<li><strong${color}>${b.label || ""}</strong> ${b.text || ""}</li>`;
      }
      html += "</ul>";
    }
    if (item.structuredExplanation.subsections?.length) {
      for (const s of item.structuredExplanation.subsections) {
        html += `<h3>${s.heading || ""}</h3>`;
        if (s.items?.length) {
          html += "<ul>";
          for (const it of s.items) {
            html += `<li>${it}</li>`;
          }
          html += "</ul>";
        }
      }
    }
    if (html) return html;
  }
  if (item?.explanation) {
    return `<p>${item.explanation.replace(/\n\n/g, "</p><p>").replace(/\n/g, "<br>")}</p>`;
  }
  return "";
}

export default function AdminPage() {
  const [content, setContent] = useState<SiteContent>(defaultSiteData);
  const [activeSection, setActiveSection] = useState<string>("sections");
  
  // Auth state
  const [passcode, setPasscode] = useState("admin123");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error" | "info"; text: string } | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Modal Dialog states
  const [modalType, setModalType] = useState<string | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  // Active form states for modals
  const [faqForm, setFaqForm] = useState({ q: "", a: "", order: 1 });
  const [testimonialForm, setTestimonialForm] = useState({
    name: "",
    initial: "",
    location: "",
    outcomeTag: "",
    quote: "",
    order: 1,
  });
  const [purchaseStepForm, setPurchaseStepForm] = useState({
    step: "",
    title: "",
    desc: "",
    skeletonText: "",
    imageUrl: "",
    order: 1,
  });
  const [painPointForm, setPainPointForm] = useState({
    problem: "",
    solution: "",
    order: 1,
  });
  const [syllabusForm, setSyllabusForm] = useState({
    num: "1",
    title: "",
    subtitle: "",
    content: "",
    topics: [] as string[],
  });
  const [newTopicInput, setNewTopicInput] = useState("");

  // Published toggle state map (simulated toggle per item)
  const [publishedMap, setPublishedMap] = useState<Record<string, boolean>>({});

  // Active subject for sample proof
  const [activeSubject, setActiveSubject] = useState<string>("currentAffairs");
  const [isAddingSubject, setIsAddingSubject] = useState(false);
  const [newSubjectKey, setNewSubjectKey] = useState("");
  const [newSubjectName, setNewSubjectName] = useState("");
  const [explanationMode, setExplanationMode] = useState<"rich" | "structured" | "text">("rich");
  const [draggedSubjectKey, setDraggedSubjectKey] = useState<string | null>(null);
  const [dragOverSubjectKey, setDragOverSubjectKey] = useState<string | null>(null);

  // Generic list drag and drop reordering states
  const [dragSource, setDragSource] = useState<{ type: string; index: number } | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [dragOverType, setDragOverType] = useState<string | null>(null);
  const [dragOptionSource, setDragOptionSource] = useState<number | null>(null);
  const [dragOverOptionIndex, setDragOverOptionIndex] = useState<number | null>(null);

  // Load content from API on mount
  useEffect(() => {
    async function loadContent() {
      try {
        const res = await fetch("/api/admin/content");
        const data = await res.json();
        if (data.success && data.content) {
          setContent(data.content);
        }
      } catch (err) {
        console.error("Failed to load content:", err);
      }
    }
    loadContent();
  }, []);

  // Save to backend API
  const handleSaveAll = async (overrideContent?: SiteContent) => {
    const toSave = overrideContent || content;
    setIsSaving(true);
    setStatusMessage(null);
    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: toSave, passcode }),
      });
      const data = await res.json();
      if (data.success) {
        setStatusMessage({ type: "success", text: "Changes saved successfully and live on website!" });
      } else {
        setStatusMessage({ type: "error", text: data.error || "Error saving changes." });
      }
    } catch (err: any) {
      setStatusMessage({ type: "error", text: err.message || "Could not connect to server." });
    } finally {
      setIsSaving(false);
    }
  };

  // Reset to original defaults
  const handleReset = async () => {
    if (!confirm("Are you sure you want to reset all data to default?")) return;
    setIsSaving(true);
    setStatusMessage(null);
    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode, action: "reset" }),
      });
      const data = await res.json();
      if (data.success && data.content) {
        setContent(data.content);
        setStatusMessage({ type: "info", text: "Data reset to original defaults." });
      }
    } catch (err: any) {
      setStatusMessage({ type: "error", text: err.message || "An error occurred." });
    } finally {
      setIsSaving(false);
    }
  };

  // Toggle published helper
  const togglePublished = (key: string) => {
    setPublishedMap((prev) => ({
      ...prev,
      [key]: prev[key] === undefined ? false : !prev[key],
    }));
  };

  const isPublished = (key: string) => {
    return publishedMap[key] === undefined ? true : publishedMap[key];
  };

  // Reorder list items (FAQs, Testimonials, How to Buy, Pain Points, Syllabus)
  const handleReorderList = (type: string, fromIndex: number, toIndex: number) => {
    if (fromIndex === toIndex || fromIndex < 0 || toIndex < 0) return;

    let newContent = { ...content };

    if (type === "faq") {
      const list = [...content.faqs];
      const [moved] = list.splice(fromIndex, 1);
      list.splice(toIndex, 0, moved);
      newContent.faqs = list;
    } else if (type === "testimonial") {
      const list = [...content.testimonials];
      const [moved] = list.splice(fromIndex, 1);
      list.splice(toIndex, 0, moved);
      newContent.testimonials = list;
    } else if (type === "purchase") {
      const list = [...content.howToPurchase];
      const [moved] = list.splice(fromIndex, 1);
      list.splice(toIndex, 0, moved);
      newContent.howToPurchase = list;
    } else if (type === "painPoint") {
      const list = [...content.painPoints];
      const [moved] = list.splice(fromIndex, 1);
      list.splice(toIndex, 0, moved);
      newContent.painPoints = list;
    } else if (type === "syllabus") {
      const list = [...((content.syllabus as any[]) || [])];
      const [moved] = list.splice(fromIndex, 1);
      list.splice(toIndex, 0, moved);
      newContent.syllabus = list;
    } else if (type === "section") {
      const list = [...((content.sections as any[]) || defaultSiteData.sections)];
      const [moved] = list.splice(fromIndex, 1);
      list.splice(toIndex, 0, moved);
      newContent.sections = list;
    }

    setContent(newContent);
    handleSaveAll(newContent);
  };

  // Toggle section enabled/disabled status
  const handleToggleSectionEnabled = (sectionId: string) => {
    const list = [...((content.sections as any[]) || defaultSiteData.sections)];
    const targetIdx = list.findIndex((s: any) => s.id === sectionId);
    if (targetIdx >= 0) {
      list[targetIdx] = { ...list[targetIdx], enabled: list[targetIdx].enabled === false ? true : false };
      const newContent = { ...content, sections: list };
      setContent(newContent);
      handleSaveAll(newContent);
    }
  };

  // Move section one position up or down
  const handleMoveSection = (index: number, direction: "up" | "down") => {
    const list = [...((content.sections as any[]) || defaultSiteData.sections)];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= list.length) return;
    const [moved] = list.splice(index, 1);
    list.splice(targetIndex, 0, moved);
    const newContent = { ...content, sections: list };
    setContent(newContent);
    handleSaveAll(newContent);
  };

  // Reset section ordering to default
  const handleResetSectionsOrder = () => {
    if (!confirm("तुम्हाला सर्व विभागांचा क्रम मूळ स्थितीवर आणायचा आहे का? (Reset all sections to default order?)")) return;
    const newContent = { ...content, sections: defaultSiteData.sections };
    setContent(newContent);
    handleSaveAll(newContent);
  };

  // Reorder question options
  const handleReorderOption = (fromIdx: number, toIdx: number) => {
    if (fromIdx === toIdx) return;
    const proofData = (content.sampleProof || {}) as Record<string, any>;
    const keys = Object.keys(proofData);
    const effActive = keys.includes(activeSubject) ? activeSubject : keys[0] || "";
    if (!effActive || !proofData[effActive]) return;

    const updated = { ...proofData };
    const cur = { ...updated[effActive] };
    if (!cur.options) return;
    const opts = [...cur.options];
    const [moved] = opts.splice(fromIdx, 1);
    opts.splice(toIdx, 0, moved);
    cur.options = opts;

    if (cur.correct === fromIdx) {
      cur.correct = toIdx;
    } else if (fromIdx < cur.correct && toIdx >= cur.correct) {
      cur.correct -= 1;
    } else if (fromIdx > cur.correct && toIdx <= cur.correct) {
      cur.correct += 1;
    }
    cur.correctAnswer = opts[cur.correct];
    updated[effActive] = cur;

    setContent({ ...content, sampleProof: updated });
    handleSaveAll({ ...content, sampleProof: updated });
  };

  // Open Add Modal
  const handleOpenAdd = (type: string) => {
    setModalType(type);
    setEditingIndex(null);
    if (type === "faq") {
      setFaqForm({ q: "", a: "", order: content.faqs.length + 1 });
    } else if (type === "testimonial") {
      setTestimonialForm({
        name: "",
        initial: "",
        location: "",
        outcomeTag: "कटऑफ पार",
        quote: "",
        order: content.testimonials.length + 1,
      });
    } else if (type === "purchase") {
      setPurchaseStepForm({
        step: `स्टेप ${content.howToPurchase.length + 1}`,
        title: "",
        desc: "",
        skeletonText: `9:16 स्क्रीनशॉट ${content.howToPurchase.length + 1}`,
        imageUrl: "",
        order: content.howToPurchase.length + 1,
      });
    } else if (type === "painPoint") {
      setPainPointForm({
        problem: "",
        solution: "",
        order: content.painPoints.length + 1,
      });
    } else if (type === "syllabus") {
      setSyllabusForm({
        num: String(((content.syllabus as any[]) || []).length + 1),
        title: "",
        subtitle: "",
        content: "",
        topics: [],
      });
      setNewTopicInput("");
    }
  };

  // Open Edit Modal
  const handleOpenEdit = (type: string, index: number) => {
    setModalType(type);
    setEditingIndex(index);
    if (type === "faq") {
      const item = content.faqs[index];
      setFaqForm({ q: item.q, a: item.a, order: index + 1 });
    } else if (type === "testimonial") {
      const item = content.testimonials[index];
      setTestimonialForm({
        name: item.name,
        initial: item.initial,
        location: item.location,
        outcomeTag: item.outcomeTag,
        quote: item.quote,
        order: index + 1,
      });
    } else if (type === "purchase") {
      const item = content.howToPurchase[index];
      setPurchaseStepForm({
        step: item.step,
        title: item.title,
        desc: item.desc,
        skeletonText: item.skeletonText,
        imageUrl: item.imageUrl || "",
        order: index + 1,
      });
    } else if (type === "painPoint") {
      const item = content.painPoints[index];
      setPainPointForm({
        problem: item.problem,
        solution: item.solution,
        order: index + 1,
      });
    } else if (type === "syllabus") {
      const item = ((content.syllabus as any[]) || [])[index];
      if (item) {
        setSyllabusForm({
          num: item.num,
          title: item.title,
          subtitle: item.subtitle || "",
          content: item.content,
          topics: item.topics ? [...item.topics] : [],
        });
        setNewTopicInput("");
      }
    }
  };

  // Save Modal Form Submission
  const handleModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (modalType === "faq") {
      let updated = [...content.faqs];
      if (editingIndex !== null) {
        updated[editingIndex] = { q: faqForm.q, a: faqForm.a };
      } else {
        updated.push({ q: faqForm.q, a: faqForm.a });
      }
      const newContent = { ...content, faqs: updated };
      setContent(newContent);
      handleSaveAll(newContent);
    } else if (modalType === "testimonial") {
      let updated = [...content.testimonials];
      if (editingIndex !== null) {
        updated[editingIndex] = {
          ...updated[editingIndex],
          name: testimonialForm.name,
          initial: testimonialForm.initial || testimonialForm.name.slice(0, 2),
          location: testimonialForm.location,
          outcomeTag: testimonialForm.outcomeTag,
          quote: testimonialForm.quote,
        };
      } else {
        updated.push({
          name: testimonialForm.name,
          initial: testimonialForm.initial || testimonialForm.name.slice(0, 2),
          initialBg: "bg-black text-white",
          location: testimonialForm.location,
          outcomeTag: testimonialForm.outcomeTag,
          outcomeColor: "bg-zinc-100 text-black border-zinc-300",
          quote: testimonialForm.quote,
        });
      }
      const newContent = { ...content, testimonials: updated };
      setContent(newContent);
      handleSaveAll(newContent);
    } else if (modalType === "purchase") {
      let updated = [...content.howToPurchase];
      if (editingIndex !== null) {
        updated[editingIndex] = {
          ...updated[editingIndex],
          step: purchaseStepForm.step,
          title: purchaseStepForm.title,
          desc: purchaseStepForm.desc,
          skeletonText: purchaseStepForm.skeletonText,
          imageUrl: purchaseStepForm.imageUrl,
        };
      } else {
        updated.push({
          step: purchaseStepForm.step,
          title: purchaseStepForm.title,
          desc: purchaseStepForm.desc,
          iconName: "ShoppingCart",
          color: "bg-zinc-100 text-black border-zinc-200",
          skeletonText: purchaseStepForm.skeletonText,
          imageUrl: purchaseStepForm.imageUrl,
        });
      }
      const newContent = { ...content, howToPurchase: updated };
      setContent(newContent);
      handleSaveAll(newContent);
    } else if (modalType === "painPoint") {
      let updated = [...content.painPoints];
      if (editingIndex !== null) {
        updated[editingIndex] = {
          problem: painPointForm.problem,
          solution: painPointForm.solution,
        };
      } else {
        updated.push({
          problem: painPointForm.problem,
          solution: painPointForm.solution,
        });
      }
      const newContent = { ...content, painPoints: updated };
      setContent(newContent);
      handleSaveAll(newContent);
    } else if (modalType === "syllabus") {
      let updated = [...((content.syllabus as any[]) || [])];
      if (editingIndex !== null) {
        updated[editingIndex] = {
          ...updated[editingIndex],
          num: syllabusForm.num,
          title: syllabusForm.title,
          subtitle: syllabusForm.subtitle,
          content: syllabusForm.content,
          topics: syllabusForm.topics,
        };
      } else {
        updated.push({
          num: syllabusForm.num || String(updated.length + 1),
          title: syllabusForm.title,
          subtitle: syllabusForm.subtitle,
          content: syllabusForm.content,
          topics: syllabusForm.topics,
        });
      }
      const newContent = { ...content, syllabus: updated };
      setContent(newContent);
      handleSaveAll(newContent);
    }
    setModalType(null);
  };

  // Delete Handlers
  const handleDelete = (type: string, index: number) => {
    if (!confirm("Are you sure you want to delete this entry?")) return;
    if (type === "faq") {
      const updated = content.faqs.filter((_, i) => i !== index);
      const newContent = { ...content, faqs: updated };
      setContent(newContent);
      handleSaveAll(newContent);
    } else if (type === "testimonial") {
      const updated = content.testimonials.filter((_, i) => i !== index);
      const newContent = { ...content, testimonials: updated };
      setContent(newContent);
      handleSaveAll(newContent);
    } else if (type === "purchase") {
      const updated = content.howToPurchase.filter((_, i) => i !== index);
      const newContent = { ...content, howToPurchase: updated };
      setContent(newContent);
      handleSaveAll(newContent);
    } else if (type === "painPoint") {
      const updated = content.painPoints.filter((_, i) => i !== index);
      const newContent = { ...content, painPoints: updated };
      setContent(newContent);
      handleSaveAll(newContent);
    } else if (type === "syllabus") {
      const updated = ((content.syllabus as any[]) || []).filter((_: any, i: number) => i !== index);
      const newContent = { ...content, syllabus: updated };
      setContent(newContent);
      handleSaveAll(newContent);
    }
  };

  // Monochrome Passcode Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4 selection:bg-white selection:text-black">
        <div className="bg-white rounded-[6px] p-8 max-w-sm w-full border border-zinc-800 shadow-2xl space-y-6 text-center">
          <div className="w-12 h-12 rounded-[4px] bg-black text-white flex items-center justify-center mx-auto shadow-sm">
            <Lock className="w-6 h-6 stroke-[2]" />
          </div>
          <div className="space-y-1">
            <h1 className="text-xl font-bold tracking-tight text-black">friday.mpscexam.in</h1>
            <p className="text-xs text-zinc-500 font-medium">Enter passcode for Content Admin Panel.</p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (passcode === "admin123") {
                setIsAuthenticated(true);
              } else {
                alert("Invalid passcode! (Default passcode: admin123)");
              }
            }}
            className="space-y-4"
          >
            <input
              type="password"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2 bg-zinc-50 border border-zinc-300 rounded-[4px] text-center text-base font-semibold tracking-widest text-black focus:bg-white focus:border-black focus:ring-1 focus:ring-black outline-none transition-all"
              required
            />
            <button
              type="submit"
              className="w-full py-2.5 bg-black hover:bg-zinc-800 text-white font-bold text-sm rounded-[4px] shadow-sm transition-all cursor-pointer"
            >
              Login
            </button>
          </form>
          <div className="pt-2 border-t border-zinc-100">
            <p className="text-[13px] text-zinc-400 font-mono">
              Default passcode: <span className="text-black font-semibold">admin123</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] flex text-black font-sans antialiased">
      
      {/* 1. LEFT SIDEBAR (Matching uploaded screenshots) */}
      <aside className="w-60 bg-white border-r border-zinc-200 flex flex-col justify-between shrink-0 min-h-screen sticky top-0">
        <div className="p-5 space-y-6">
          
          {/* Brand header */}
          <div>
            <h1 className="text-base font-bold text-black tracking-tight">mpscexam</h1>
            <p className="text-xs text-zinc-400 font-normal">Admin Dashboard</p>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            <SidebarNavItem
              active={activeSection === "sections"}
              onClick={() => setActiveSection("sections")}
              icon={Layers}
              label="Sections Order"
            />
            <SidebarNavItem
              active={activeSection === "hero"}
              onClick={() => setActiveSection("hero")}
              icon={ImageIcon}
              label="Hero"
            />
            <SidebarNavItem
              active={activeSection === "testimonials"}
              onClick={() => setActiveSection("testimonials")}
              icon={MessageSquare}
              label="Testimonials"
            />
            <SidebarNavItem
              active={activeSection === "syllabus"}
              onClick={() => setActiveSection("syllabus")}
              icon={BookOpen}
              label="Syllabus"
            />
            <SidebarNavItem
              active={activeSection === "purchase"}
              onClick={() => setActiveSection("purchase")}
              icon={ShoppingCart}
              label="How to Buy"
            />
            <SidebarNavItem
              active={activeSection === "painPoints"}
              onClick={() => setActiveSection("painPoints")}
              icon={AlertTriangle}
              label="Pain Points"
            />
            <SidebarNavItem
              active={activeSection === "cutoff"}
              onClick={() => setActiveSection("cutoff")}
              icon={Scale}
              label="Cutoff Gap"
            />
            <SidebarNavItem
              active={activeSection === "sampleProof"}
              onClick={() => setActiveSection("sampleProof")}
              icon={FileText}
              label="Questions"
            />
            <SidebarNavItem
              active={activeSection === "faqs"}
              onClick={() => setActiveSection("faqs")}
              icon={HelpCircle}
              label="FAQs"
            />
            <SidebarNavItem
              active={activeSection === "finalCta"}
              onClick={() => setActiveSection("finalCta")}
              icon={Tag}
              label="Pricing"
            />
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-zinc-200 space-y-1 text-xs">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 text-zinc-600 hover:text-black hover:bg-zinc-100 rounded-[4px] transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            <span>View Website</span>
          </a>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="w-full flex items-center gap-2 px-3 py-2 text-zinc-600 hover:text-red-600 hover:bg-zinc-100 rounded-[4px] transition-colors cursor-pointer text-left"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#fafafa]">
        
        {/* Top Control Bar */}
        <div className="bg-white border-b border-zinc-200 px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <span className="font-semibold text-black">friday.mpscexam.in</span>
            <span>/</span>
            <span className="capitalize text-zinc-700 font-medium">{activeSection}</span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleReset}
              disabled={isSaving}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-zinc-600 bg-white hover:bg-zinc-100 rounded-[4px] border border-zinc-300 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
            <button
              onClick={() => handleSaveAll()}
              disabled={isSaving}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold text-white bg-black hover:bg-zinc-800 rounded-[4px] shadow-xs transition-all cursor-pointer"
            >
              {isSaving ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
              <span>{isSaving ? "Saving..." : "Save All"}</span>
            </button>
          </div>
        </div>

        {/* Status Toast Banner */}
        {statusMessage && (
          <div className="px-8 pt-4">
            <div
              className={`p-3 rounded-[4px] flex items-center justify-between border text-xs font-semibold ${
                statusMessage.type === "success"
                  ? "bg-zinc-900 text-white border-black"
                  : statusMessage.type === "error"
                  ? "bg-zinc-100 text-black border-zinc-300"
                  : "bg-zinc-50 text-zinc-800 border-zinc-200"
              }`}
            >
              <div className="flex items-center gap-2">
                {statusMessage.type === "success" ? (
                  <Check className="w-4 h-4 text-white shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-black shrink-0" />
                )}
                <span>{statusMessage.text}</span>
              </div>
              <button
                onClick={() => setStatusMessage(null)}
                className="text-[13px] underline opacity-80 hover:opacity-100 cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        {/* Section View Container */}
        <div className="p-8 space-y-6 max-w-6xl w-full">

          {/* SECTION: SECTIONS DRAG & VISIBILITY MANAGER */}
          {activeSection === "sections" && (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-black tracking-tight flex items-center gap-2">
                    <Layers className="w-5 h-5 text-black" />
                    <span>विभाग क्रम व दृश्यमानता (Section Drag & Visibility)</span>
                  </h2>
                  <p className="text-xs text-zinc-500 mt-1">
                    वेबसाइटवरील विभागांचा क्रम बदलण्यासाठी ड्रॅग (Drag up/down) करा किंवा बाण वापरा. आवश्यकतेनुसार चालू किंवा बंद करा.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleResetSectionsOrder}
                    className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-zinc-200 hover:bg-zinc-50 text-zinc-700 text-xs font-semibold rounded-[4px] shadow-xs transition-colors cursor-pointer"
                    title="मूळ क्रम पूर्ववत करा"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>मूळ क्रम (Reset)</span>
                  </button>
                  <button
                    onClick={() => handleSaveAll()}
                    disabled={isSaving}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-black hover:bg-zinc-800 disabled:opacity-50 text-white text-xs font-bold rounded-[4px] shadow-xs cursor-pointer transition-colors"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>{isSaving ? "सेव्ह होत आहे..." : "बदल सेव्ह करा"}</span>
                  </button>
                </div>
              </div>

              {/* Status Stats and Tip Bar */}
              {(() => {
                const currentSections = (content.sections && content.sections.length > 0)
                  ? content.sections
                  : defaultSiteData.sections;
                const totalCount = currentSections.length;
                const activeCount = currentSections.filter((s: any) => s.enabled !== false).length;
                const hiddenCount = totalCount - activeCount;

                return (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="bg-white border border-zinc-200 rounded-[4px] p-3 flex items-center justify-between shadow-xs">
                      <div>
                        <p className="text-[11px] text-zinc-400 font-medium">एकूण विभाग (Total Sections)</p>
                        <p className="text-base font-bold text-zinc-900 mt-0.5">{totalCount}</p>
                      </div>
                      <span className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-600 font-bold text-xs">
                        {totalCount}
                      </span>
                    </div>

                    <div className="bg-white border border-emerald-200 rounded-[4px] p-3 flex items-center justify-between shadow-xs">
                      <div>
                        <p className="text-[11px] text-emerald-600 font-medium">सक्रिय विभाग (Live on Website)</p>
                        <p className="text-base font-bold text-emerald-700 mt-0.5">{activeCount}</p>
                      </div>
                      <span className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-xs border border-emerald-200">
                        <Eye className="w-4 h-4" />
                      </span>
                    </div>

                    <div className="bg-white border border-zinc-200 rounded-[4px] p-3 flex items-center justify-between shadow-xs">
                      <div>
                        <p className="text-[11px] text-zinc-500 font-medium">लपवलेले विभाग (Disabled / Hidden)</p>
                        <p className="text-base font-bold text-zinc-600 mt-0.5">{hiddenCount}</p>
                      </div>
                      <span className="w-8 h-8 rounded-full bg-zinc-100 text-zinc-500 flex items-center justify-center font-bold text-xs">
                        <EyeOff className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                );
              })()}

              {/* Instructions banner */}
              <div className="bg-amber-50/80 border border-amber-200/90 rounded-[4px] p-3 text-xs text-amber-900 flex items-start gap-2.5">
                <GripVertical className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <p className="font-semibold">कसे वापरावे (How to use):</p>
                  <p className="text-amber-800 text-[11px]">
                    1. <strong>वर-खाली हलवा:</strong> डावीकडील ग्रिप (⋮⋮) धरून ओढा किंवा ▲ / ▼ बाण क्लिक करा.
                    <br />
                    2. <strong>चालू/बंद (Enable/Disable):</strong> उजवीकडील टॉगल स्विचने विभाग लगेच सुरू किंवा बंद करा.
                    <br />
                    3. <strong>मजकूर संपादन:</strong> संबंधित विभागाचा मजकूर बदलण्यासाठी "संपादित करा" बटनावर क्लिक करा.
                  </p>
                </div>
              </div>

              {/* Sections Table */}
              <div className="border border-zinc-200 rounded-[4px] bg-white overflow-hidden shadow-xs">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-zinc-50 text-zinc-700 font-semibold border-b border-zinc-200">
                    <tr>
                      <th className="p-3 w-12 text-center" title="Drag to reorder">ड्रॅग</th>
                      <th className="p-3 w-14 text-center">क्रम</th>
                      <th className="p-3 w-20 text-center">हलवा</th>
                      <th className="p-3">विभागाचे नाव (Section Name & Info)</th>
                      <th className="p-3 w-28 text-center">स्थिती (Status)</th>
                      <th className="p-3 w-20 text-center">दृश्यमानता</th>
                      <th className="p-3 w-28 text-center">मजकूर संपादन</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200">
                    {(((content.sections && content.sections.length > 0)
                      ? content.sections
                      : defaultSiteData.sections) as any[]).map((sec, idx, arr) => {
                      const isFirst = idx === 0;
                      const isLast = idx === arr.length - 1;
                      const isLive = sec.enabled !== false;

                      // Map section ID to corresponding admin tab
                      const tabTarget: Record<string, string> = {
                        hero: "hero",
                        testimonials: "testimonials",
                        syllabus: "syllabus",
                        howToPurchase: "purchase",
                        painPoints: "painPoints",
                        cutoff: "cutoff",
                        sampleProof: "sampleProof",
                        faqs: "faqs",
                        pricing: "finalCta",
                      };
                      const hasDirectTab = tabTarget[sec.id] !== undefined;

                      return (
                        <tr
                          key={sec.id}
                          draggable
                          onDragStart={(e) => {
                            setDragSource({ type: "section", index: idx });
                            e.dataTransfer.effectAllowed = "move";
                            e.dataTransfer.setData("text/plain", `${idx}`);
                          }}
                          onDragOver={(e) => {
                            e.preventDefault();
                            e.dataTransfer.dropEffect = "move";
                            if (dragOverIndex !== idx || dragOverType !== "section") {
                              setDragOverIndex(idx);
                              setDragOverType("section");
                            }
                          }}
                          onDragLeave={() => {
                            if (dragOverIndex === idx && dragOverType === "section") {
                              setDragOverIndex(null);
                              setDragOverType(null);
                            }
                          }}
                          onDrop={(e) => {
                            e.preventDefault();
                            if (dragSource && dragSource.type === "section") {
                              handleReorderList("section", dragSource.index, idx);
                            }
                            setDragSource(null);
                            setDragOverIndex(null);
                            setDragOverType(null);
                          }}
                          onDragEnd={() => {
                            setDragSource(null);
                            setDragOverIndex(null);
                            setDragOverType(null);
                          }}
                          className={`transition-colors ${
                            dragSource?.type === "section" && dragSource.index === idx
                              ? "opacity-30 bg-zinc-100"
                              : dragOverType === "section" && dragOverIndex === idx
                              ? "bg-zinc-100 border-t-2 border-black"
                              : !isLive
                              ? "bg-zinc-50/50 hover:bg-zinc-100/60"
                              : "hover:bg-zinc-50/70"
                          }`}
                        >
                          {/* Drag Handle */}
                          <td
                            className="p-3 text-center text-zinc-400 hover:text-black cursor-grab active:cursor-grabbing select-none"
                            title="Drag to reorder"
                          >
                            <GripVertical className="w-4 h-4 mx-auto" />
                          </td>

                          {/* Order Index */}
                          <td className="p-3 text-center">
                            <span className="inline-flex items-center justify-center w-6 h-6 rounded-[4px] bg-zinc-100 text-zinc-700 font-bold text-[11px]">
                              #{idx + 1}
                            </span>
                          </td>

                          {/* Move Up/Down arrows */}
                          <td className="p-3 text-center">
                            <div className="flex items-center justify-center gap-1">
                              <button
                                onClick={() => handleMoveSection(idx, "up")}
                                disabled={isFirst}
                                className="p-1 rounded-[3px] text-zinc-500 hover:text-black hover:bg-zinc-200/80 disabled:opacity-20 disabled:hover:bg-transparent disabled:hover:text-zinc-500 cursor-pointer disabled:cursor-not-allowed transition-colors"
                                title="Move Up"
                              >
                                <ChevronUp className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleMoveSection(idx, "down")}
                                disabled={isLast}
                                className="p-1 rounded-[3px] text-zinc-500 hover:text-black hover:bg-zinc-200/80 disabled:opacity-20 disabled:hover:bg-transparent disabled:hover:text-zinc-500 cursor-pointer disabled:cursor-not-allowed transition-colors"
                                title="Move Down"
                              >
                                <ChevronDown className="w-4 h-4" />
                              </button>
                            </div>
                          </td>

                          {/* Section details */}
                          <td className="p-3">
                            <div className="space-y-0.5">
                              <div className="flex items-center gap-2">
                                <span className={`font-bold text-xs ${isLive ? "text-zinc-900" : "text-zinc-400 line-through"}`}>
                                  {sec.nameMr || sec.name}
                                </span>
                                <span className="text-[10px] px-1.5 py-0.5 bg-zinc-100 text-zinc-600 rounded font-mono">
                                  {sec.id}
                                </span>
                              </div>
                              <p className="text-[11px] text-zinc-500">
                                {sec.description || sec.name}
                              </p>
                            </div>
                          </td>

                          {/* Status Badge */}
                          <td className="p-3 text-center">
                            {isLive ? (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                <span>सक्रिय (Live)</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold bg-zinc-100 text-zinc-500 border border-zinc-200 rounded-full">
                                <span className="w-1.5 h-1.5 rounded-full bg-zinc-400"></span>
                                <span>लपवलेला (Off)</span>
                              </span>
                            )}
                          </td>

                          {/* Visibility Switch */}
                          <td className="p-3 text-center">
                            <div className="flex items-center justify-center">
                              <Switch.Root
                                checked={isLive}
                                onCheckedChange={() => handleToggleSectionEnabled(sec.id)}
                                className="w-9 h-5 bg-zinc-300 data-[state=checked]:bg-black rounded-full relative outline-none cursor-pointer transition-colors"
                                title={isLive ? "विभागाला बंद करा" : "विभागाला चालू करा"}
                              >
                                <Switch.Thumb className="block w-4 h-4 bg-white rounded-full transition-transform transform translate-x-0.5 data-[state=checked]:translate-x-4.5 will-change-transform shadow-xs" />
                              </Switch.Root>
                            </div>
                          </td>

                          {/* Quick Content Edit button */}
                          <td className="p-3 text-center">
                            {hasDirectTab ? (
                              <button
                                onClick={() => setActiveSection(tabTarget[sec.id])}
                                className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-zinc-700 hover:text-black bg-zinc-100 hover:bg-zinc-200 rounded-[4px] transition-colors cursor-pointer"
                                title="या विभागाचा मजकूर संपादित करा"
                              >
                                <Edit2 className="w-3 h-3" />
                                <span>संपादित करा</span>
                              </button>
                            ) : (
                              <span className="text-[11px] text-zinc-400 font-normal">स्वयंचलित</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* SECTION: FAQ's (Matches Image 1 & 5) */}
          {activeSection === "faqs" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-black tracking-tight">FAQs</h2>
                  <p className="text-xs text-zinc-400 mt-0.5">{content.faqs.length} entries</p>
                </div>
                <button
                  onClick={() => handleOpenAdd("faq")}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-black hover:bg-zinc-800 text-white text-xs font-bold rounded-[4px] shadow-xs cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Add FAQ</span>
                </button>
              </div>

              {/* Table */}
              <div className="border border-zinc-200 rounded-[4px] bg-white overflow-hidden shadow-xs">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-zinc-50 text-zinc-700 font-semibold border-b border-zinc-200">
                    <tr>
                      <th className="p-3 w-12 text-center">Drag</th>
                      <th className="p-3 w-2/5">Question</th>
                      <th className="p-3">Answer</th>
                      <th className="p-3 w-24 text-center">Published</th>
                      <th className="p-3 w-20 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200">
                    {content.faqs.map((faq, idx) => (
                      <tr
                        key={idx}
                        draggable
                        onDragStart={(e) => {
                          setDragSource({ type: "faq", index: idx });
                          e.dataTransfer.effectAllowed = "move";
                          e.dataTransfer.setData("text/plain", `${idx}`);
                        }}
                        onDragOver={(e) => {
                          e.preventDefault();
                          e.dataTransfer.dropEffect = "move";
                          if (dragOverIndex !== idx || dragOverType !== "faq") {
                            setDragOverIndex(idx);
                            setDragOverType("faq");
                          }
                        }}
                        onDragLeave={() => {
                          if (dragOverIndex === idx && dragOverType === "faq") {
                            setDragOverIndex(null);
                            setDragOverType(null);
                          }
                        }}
                        onDrop={(e) => {
                          e.preventDefault();
                          if (dragSource && dragSource.type === "faq") {
                            handleReorderList("faq", dragSource.index, idx);
                          }
                          setDragSource(null);
                          setDragOverIndex(null);
                          setDragOverType(null);
                        }}
                        onDragEnd={() => {
                          setDragSource(null);
                          setDragOverIndex(null);
                          setDragOverType(null);
                        }}
                        className={`transition-colors ${
                          dragSource?.type === "faq" && dragSource.index === idx
                            ? "opacity-30 bg-zinc-100"
                            : dragOverType === "faq" && dragOverIndex === idx
                            ? "bg-zinc-100 border-t-2 border-black"
                            : "hover:bg-zinc-50/60"
                        }`}
                      >
                        <td
                          className="p-3 text-center text-zinc-400 hover:text-black cursor-grab active:cursor-grabbing"
                          title="Drag to reorder"
                        >
                          <GripVertical className="w-4 h-4 mx-auto" />
                        </td>
                        <td className="p-3 font-semibold text-zinc-900">{faq.q}</td>
                        <td className="p-3 text-zinc-600 line-clamp-2">{faq.a}</td>
                        <td className="p-3 text-center">
                          <Switch.Root
                            checked={isPublished(`faq-${idx}`)}
                            onCheckedChange={() => togglePublished(`faq-${idx}`)}
                            className="w-9 h-5 bg-zinc-300 data-[state=checked]:bg-black rounded-full relative outline-none cursor-pointer transition-colors"
                          >
                            <Switch.Thumb className="block w-4 h-4 bg-white rounded-full transition-transform transform translate-x-0.5 data-[state=checked]:translate-x-4.5 will-change-transform shadow-xs" />
                          </Switch.Root>
                        </td>
                        <td className="p-3 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleOpenEdit("faq", idx)}
                              className="text-zinc-500 hover:text-black p-1 cursor-pointer"
                              title="Edit"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDelete("faq", idx)}
                              className="text-red-400 hover:text-red-600 p-1 cursor-pointer"
                              title="Delete"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* SECTION: Testimonials (Matches Image 2 & 3) */}
          {activeSection === "testimonials" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-black tracking-tight">Testimonials</h2>
                  <p className="text-xs text-zinc-400 mt-0.5">{content.testimonials.length} entries</p>
                </div>
                <button
                  onClick={() => handleOpenAdd("testimonial")}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-black hover:bg-zinc-800 text-white text-xs font-bold rounded-[4px] shadow-xs cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Add Review</span>
                </button>
              </div>

              {/* Table */}
              <div className="border border-zinc-200 rounded-[4px] bg-white overflow-hidden shadow-xs">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-zinc-50 text-zinc-700 font-semibold border-b border-zinc-200">
                    <tr>
                      <th className="p-3 w-12 text-center">Drag</th>
                      <th className="p-3 w-36">Name</th>
                      <th className="p-3 w-36">Exam & Year / Location</th>
                      <th className="p-3">Quote</th>
                      <th className="p-3 w-24 text-center">Published</th>
                      <th className="p-3 w-20 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200">
                    {content.testimonials.map((t, idx) => (
                      <tr
                        key={idx}
                        draggable
                        onDragStart={(e) => {
                          setDragSource({ type: "testimonial", index: idx });
                          e.dataTransfer.effectAllowed = "move";
                          e.dataTransfer.setData("text/plain", `${idx}`);
                        }}
                        onDragOver={(e) => {
                          e.preventDefault();
                          e.dataTransfer.dropEffect = "move";
                          if (dragOverIndex !== idx || dragOverType !== "testimonial") {
                            setDragOverIndex(idx);
                            setDragOverType("testimonial");
                          }
                        }}
                        onDragLeave={() => {
                          if (dragOverIndex === idx && dragOverType === "testimonial") {
                            setDragOverIndex(null);
                            setDragOverType(null);
                          }
                        }}
                        onDrop={(e) => {
                          e.preventDefault();
                          if (dragSource && dragSource.type === "testimonial") {
                            handleReorderList("testimonial", dragSource.index, idx);
                          }
                          setDragSource(null);
                          setDragOverIndex(null);
                          setDragOverType(null);
                        }}
                        onDragEnd={() => {
                          setDragSource(null);
                          setDragOverIndex(null);
                          setDragOverType(null);
                        }}
                        className={`transition-colors ${
                          dragSource?.type === "testimonial" && dragSource.index === idx
                            ? "opacity-30 bg-zinc-100"
                            : dragOverType === "testimonial" && dragOverIndex === idx
                            ? "bg-zinc-100 border-t-2 border-black"
                            : "hover:bg-zinc-50/60"
                        }`}
                      >
                        <td
                          className="p-3 text-center text-zinc-400 hover:text-black cursor-grab active:cursor-grabbing"
                          title="Drag to reorder"
                        >
                          <GripVertical className="w-4 h-4 mx-auto" />
                        </td>
                        <td className="p-3 font-semibold text-zinc-900">{t.name}</td>
                        <td className="p-3 text-zinc-600">{t.outcomeTag} ({t.location})</td>
                        <td className="p-3 text-zinc-600 line-clamp-2">“{t.quote}”</td>
                        <td className="p-3 text-center">
                          <Switch.Root
                            checked={isPublished(`testimonial-${idx}`)}
                            onCheckedChange={() => togglePublished(`testimonial-${idx}`)}
                            className="w-9 h-5 bg-zinc-300 data-[state=checked]:bg-black rounded-full relative outline-none cursor-pointer transition-colors"
                          >
                            <Switch.Thumb className="block w-4 h-4 bg-white rounded-full transition-transform transform translate-x-0.5 data-[state=checked]:translate-x-4.5 shadow-xs" />
                          </Switch.Root>
                        </td>
                        <td className="p-3 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleOpenEdit("testimonial", idx)}
                              className="text-zinc-500 hover:text-black p-1 cursor-pointer"
                              title="Edit"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDelete("testimonial", idx)}
                              className="text-red-400 hover:text-red-600 p-1 cursor-pointer"
                              title="Delete"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* SECTION: How to Purchase */}
          {activeSection === "purchase" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-black tracking-tight">How to Buy</h2>
                  <p className="text-xs text-zinc-400 mt-0.5">{content.howToPurchase.length} entries</p>
                </div>
                <button
                  onClick={() => handleOpenAdd("purchase")}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-black hover:bg-zinc-800 text-white text-xs font-bold rounded-[4px] shadow-xs cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Add Step</span>
                </button>
              </div>

              <div className="border border-zinc-200 rounded-[4px] bg-white overflow-hidden shadow-xs">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-zinc-50 text-zinc-700 font-semibold border-b border-zinc-200">
                    <tr>
                      <th className="p-3 w-12 text-center">Drag</th>
                      <th className="p-3 w-16 text-center">Image</th>
                      <th className="p-3 w-24">Step</th>
                      <th className="p-3 w-48">Title</th>
                      <th className="p-3">Description</th>
                      <th className="p-3 w-24 text-center">Published</th>
                      <th className="p-3 w-20 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200">
                    {content.howToPurchase.map((step, idx) => (
                      <tr
                        key={idx}
                        draggable
                        onDragStart={(e) => {
                          setDragSource({ type: "purchase", index: idx });
                          e.dataTransfer.effectAllowed = "move";
                          e.dataTransfer.setData("text/plain", `${idx}`);
                        }}
                        onDragOver={(e) => {
                          e.preventDefault();
                          e.dataTransfer.dropEffect = "move";
                          if (dragOverIndex !== idx || dragOverType !== "purchase") {
                            setDragOverIndex(idx);
                            setDragOverType("purchase");
                          }
                        }}
                        onDragLeave={() => {
                          if (dragOverIndex === idx && dragOverType === "purchase") {
                            setDragOverIndex(null);
                            setDragOverType(null);
                          }
                        }}
                        onDrop={(e) => {
                          e.preventDefault();
                          if (dragSource && dragSource.type === "purchase") {
                            handleReorderList("purchase", dragSource.index, idx);
                          }
                          setDragSource(null);
                          setDragOverIndex(null);
                          setDragOverType(null);
                        }}
                        onDragEnd={() => {
                          setDragSource(null);
                          setDragOverIndex(null);
                          setDragOverType(null);
                        }}
                        className={`transition-colors ${
                          dragSource?.type === "purchase" && dragSource.index === idx
                            ? "opacity-30 bg-zinc-100"
                            : dragOverType === "purchase" && dragOverIndex === idx
                            ? "bg-zinc-100 border-t-2 border-black"
                            : "hover:bg-zinc-50/60"
                        }`}
                      >
                        <td
                          className="p-3 text-center text-zinc-400 hover:text-black cursor-grab active:cursor-grabbing"
                          title="Drag to reorder"
                        >
                          <GripVertical className="w-4 h-4 mx-auto" />
                        </td>
                        <td className="p-3 text-center">
                          {step.imageUrl ? (
                            <img
                              src={step.imageUrl}
                              alt={step.title}
                              className="w-8 h-14 object-cover rounded border border-zinc-200 mx-auto shadow-2xs"
                            />
                          ) : (
                            <span className="text-[10px] text-zinc-400 italic">No img</span>
                          )}
                        </td>
                        <td className="p-3 font-bold text-zinc-900">{step.step}</td>
                        <td className="p-3 font-semibold text-zinc-800">{step.title}</td>
                        <td className="p-3 text-zinc-600 line-clamp-2">{step.desc}</td>
                        <td className="p-3 text-center">
                          <Switch.Root
                            checked={isPublished(`purchase-${idx}`)}
                            onCheckedChange={() => togglePublished(`purchase-${idx}`)}
                            className="w-9 h-5 bg-zinc-300 data-[state=checked]:bg-black rounded-full relative outline-none cursor-pointer transition-colors"
                          >
                            <Switch.Thumb className="block w-4 h-4 bg-white rounded-full transition-transform transform translate-x-0.5 data-[state=checked]:translate-x-4.5 shadow-xs" />
                          </Switch.Root>
                        </td>
                        <td className="p-3 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleOpenEdit("purchase", idx)}
                              className="text-zinc-500 hover:text-black p-1 cursor-pointer"
                              title="Edit"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDelete("purchase", idx)}
                              className="text-red-400 hover:text-red-600 p-1 cursor-pointer"
                              title="Delete"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* SECTION: अभ्यास अडचणी (Pain Points) */}
          {activeSection === "painPoints" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-black tracking-tight">Pain Points & Solutions</h2>
                  <p className="text-xs text-zinc-400 mt-0.5">{content.painPoints.length} entries</p>
                </div>
                <button
                  onClick={() => handleOpenAdd("painPoint")}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-black hover:bg-zinc-800 text-white text-xs font-bold rounded-[4px] shadow-xs cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Add Pain Point</span>
                </button>
              </div>

              <div className="border border-zinc-200 rounded-[4px] bg-white overflow-hidden shadow-xs">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-zinc-50 text-zinc-700 font-semibold border-b border-zinc-200">
                    <tr>
                      <th className="p-3 w-12 text-center">Drag</th>
                      <th className="p-3 w-2/5">Problem</th>
                      <th className="p-3">Solution</th>
                      <th className="p-3 w-24 text-center">Published</th>
                      <th className="p-3 w-20 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200">
                    {content.painPoints.map((pt, idx) => (
                      <tr
                        key={idx}
                        draggable
                        onDragStart={(e) => {
                          setDragSource({ type: "painPoint", index: idx });
                          e.dataTransfer.effectAllowed = "move";
                          e.dataTransfer.setData("text/plain", `${idx}`);
                        }}
                        onDragOver={(e) => {
                          e.preventDefault();
                          e.dataTransfer.dropEffect = "move";
                          if (dragOverIndex !== idx || dragOverType !== "painPoint") {
                            setDragOverIndex(idx);
                            setDragOverType("painPoint");
                          }
                        }}
                        onDragLeave={() => {
                          if (dragOverIndex === idx && dragOverType === "painPoint") {
                            setDragOverIndex(null);
                            setDragOverType(null);
                          }
                        }}
                        onDrop={(e) => {
                          e.preventDefault();
                          if (dragSource && dragSource.type === "painPoint") {
                            handleReorderList("painPoint", dragSource.index, idx);
                          }
                          setDragSource(null);
                          setDragOverIndex(null);
                          setDragOverType(null);
                        }}
                        onDragEnd={() => {
                          setDragSource(null);
                          setDragOverIndex(null);
                          setDragOverType(null);
                        }}
                        className={`transition-colors ${
                          dragSource?.type === "painPoint" && dragSource.index === idx
                            ? "opacity-30 bg-zinc-100"
                            : dragOverType === "painPoint" && dragOverIndex === idx
                            ? "bg-zinc-100 border-t-2 border-black"
                            : "hover:bg-zinc-50/60"
                        }`}
                      >
                        <td
                          className="p-3 text-center text-zinc-400 hover:text-black cursor-grab active:cursor-grabbing"
                          title="Drag to reorder"
                        >
                          <GripVertical className="w-4 h-4 mx-auto" />
                        </td>
                        <td className="p-3 font-semibold text-zinc-900">{pt.problem}</td>
                        <td className="p-3 text-zinc-600 line-clamp-2">{pt.solution}</td>
                        <td className="p-3 text-center">
                          <Switch.Root
                            checked={isPublished(`painPoint-${idx}`)}
                            onCheckedChange={() => togglePublished(`painPoint-${idx}`)}
                            className="w-9 h-5 bg-zinc-300 data-[state=checked]:bg-black rounded-full relative outline-none cursor-pointer transition-colors"
                          >
                            <Switch.Thumb className="block w-4 h-4 bg-white rounded-full transition-transform transform translate-x-0.5 data-[state=checked]:translate-x-4.5 shadow-xs" />
                          </Switch.Root>
                        </td>
                        <td className="p-3 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleOpenEdit("painPoint", idx)}
                              className="text-zinc-500 hover:text-black p-1 cursor-pointer"
                              title="Edit"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDelete("painPoint", idx)}
                              className="text-red-400 hover:text-red-600 p-1 cursor-pointer"
                              title="Delete"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* SECTION: Hero Image (Matches Image 4 structure) */}
          {activeSection === "hero" && (
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-bold text-black tracking-tight">Hero Image Settings</h2>
                <p className="text-xs text-zinc-400 mt-0.5">डेस्कटॉप (5:6) आणि मोबाईल (16:9) साठी स्वतंत्र इमेजेस आणि क्लिक URL.</p>
              </div>

              <div className="border border-zinc-200 rounded-[4px] bg-white p-6 shadow-xs space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Form inputs */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 mb-1">
                        Desktop Hero Image URL (5:6 aspect ratio)
                      </label>
                      <input
                        type="url"
                        value={content.hero.desktopHeroImage || (content.hero as any).heroImage || ""}
                        onChange={(e) =>
                          setContent({
                            ...content,
                            hero: { ...content.hero, desktopHeroImage: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 border border-zinc-300 rounded-[4px] text-xs bg-white focus:border-black focus:ring-1 focus:ring-black outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 mb-1">
                        Mobile Hero Image URL (16:9 aspect ratio)
                      </label>
                      <input
                        type="url"
                        value={content.hero.mobileHeroImage || content.hero.desktopHeroImage || (content.hero as any).heroImage || ""}
                        onChange={(e) =>
                          setContent({
                            ...content,
                            hero: { ...content.hero, mobileHeroImage: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 border border-zinc-300 rounded-[4px] text-xs bg-white focus:border-black focus:ring-1 focus:ring-black outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 mb-1">
                        Backlink URL (Click Destination)
                      </label>
                      <input
                        type="text"
                        placeholder="#pricing-section"
                        value={content.hero.targetUrl || "#pricing-section"}
                        onChange={(e) =>
                          setContent({
                            ...content,
                            hero: { ...content.hero, targetUrl: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 border border-zinc-300 rounded-[4px] text-xs bg-white focus:border-black focus:ring-1 focus:ring-black outline-none font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 mb-1">
                        Alt Text (SEO & Accessibility)
                      </label>
                      <input
                        type="text"
                        value={content.hero.heroImageAlt}
                        onChange={(e) =>
                          setContent({
                            ...content,
                            hero: { ...content.hero, heroImageAlt: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 border border-zinc-300 rounded-[4px] text-xs bg-white focus:border-black focus:ring-1 focus:ring-black outline-none"
                      />
                    </div>

                    <button
                      onClick={() => handleSaveAll()}
                      disabled={isSaving}
                      className="w-full py-2.5 bg-black hover:bg-zinc-800 text-white text-xs font-bold rounded-[4px] shadow-xs cursor-pointer transition-all"
                    >
                      {isSaving ? "Saving..." : "Save Hero"}
                    </button>
                  </div>

                  {/* Previews */}
                  <div className="space-y-4 border-l border-zinc-100 pl-6">
                    <div>
                      <span className="text-xs font-bold text-zinc-500 uppercase block mb-1">Desktop Preview (5:6)</span>
                      <a
                        href={content.hero.targetUrl || "#pricing-section"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block aspect-[5/6] max-h-48 border border-zinc-300 rounded-[4px] overflow-hidden bg-zinc-100"
                        title="Click to test link"
                      >
                        <img
                          src={content.hero.desktopHeroImage || (content.hero as any).heroImage}
                          alt="Desktop Hero"
                          className="w-full h-full object-cover"
                        />
                      </a>
                    </div>

                    <div>
                      <span className="text-xs font-bold text-zinc-500 uppercase block mb-1">Mobile Preview (16:9)</span>
                      <a
                        href={content.hero.targetUrl || "#pricing-section"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block aspect-[16/9] max-h-28 border border-zinc-300 rounded-[4px] overflow-hidden bg-zinc-100"
                        title="Click to test link"
                      >
                        <img
                          src={content.hero.mobileHeroImage || content.hero.desktopHeroImage || (content.hero as any).heroImage}
                          alt="Mobile Hero"
                          className="w-full h-full object-cover"
                        />
                      </a>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          )}

          {/* SECTION: Cutoff Gap */}
          {activeSection === "cutoff" && (
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-bold text-black tracking-tight">Cutoff Gap Contrast</h2>
                <p className="text-xs text-zinc-400 mt-0.5">Book Readers vs 25 Test Series Solvers</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-zinc-200 rounded-[4px] bg-white p-5 space-y-3 shadow-xs">
                  <div className="flex items-center justify-between border-b border-zinc-100 pb-2">
                    <span className="font-bold text-xs text-zinc-800">Book Readers</span>
                    <button
                      onClick={() => {
                        const updated = [...content.cutoffContrast.bookReaders, "New negative point"];
                        const newContent = {
                          ...content,
                          cutoffContrast: { ...content.cutoffContrast, bookReaders: updated },
                        };
                        setContent(newContent);
                        handleSaveAll(newContent);
                      }}
                      className="text-xs font-bold text-black hover:underline cursor-pointer"
                    >
                      + Add Item
                    </button>
                  </div>
                  <div className="space-y-2">
                    {content.cutoffContrast.bookReaders.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={item}
                          onChange={(e) => {
                            const updated = [...content.cutoffContrast.bookReaders];
                            updated[idx] = e.target.value;
                            setContent({
                              ...content,
                              cutoffContrast: { ...content.cutoffContrast, bookReaders: updated },
                            });
                          }}
                          className="w-full px-2.5 py-1.5 border border-zinc-300 rounded-[4px] text-xs bg-white"
                        />
                        <button
                          onClick={() => {
                            const updated = content.cutoffContrast.bookReaders.filter((_, i) => i !== idx);
                            const newContent = {
                              ...content,
                              cutoffContrast: { ...content.cutoffContrast, bookReaders: updated },
                            };
                            setContent(newContent);
                            handleSaveAll(newContent);
                          }}
                          className="text-zinc-400 hover:text-red-500 p-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border border-zinc-200 rounded-[4px] bg-white p-5 space-y-3 shadow-xs">
                  <div className="flex items-center justify-between border-b border-zinc-100 pb-2">
                    <span className="font-bold text-xs text-zinc-800">25 Test Solvers</span>
                    <button
                      onClick={() => {
                        const updated = [...content.cutoffContrast.testSeries, "New positive point"];
                        const newContent = {
                          ...content,
                          cutoffContrast: { ...content.cutoffContrast, testSeries: updated },
                        };
                        setContent(newContent);
                        handleSaveAll(newContent);
                      }}
                      className="text-xs font-bold text-black hover:underline cursor-pointer"
                    >
                      + Add Item
                    </button>
                  </div>
                  <div className="space-y-2">
                    {content.cutoffContrast.testSeries.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={item}
                          onChange={(e) => {
                            const updated = [...content.cutoffContrast.testSeries];
                            updated[idx] = e.target.value;
                            setContent({
                              ...content,
                              cutoffContrast: { ...content.cutoffContrast, testSeries: updated },
                            });
                          }}
                          className="w-full px-2.5 py-1.5 border border-zinc-300 rounded-[4px] text-xs bg-white font-medium"
                        />
                        <button
                          onClick={() => {
                            const updated = content.cutoffContrast.testSeries.filter((_, i) => i !== idx);
                            const newContent = {
                              ...content,
                              cutoffContrast: { ...content.cutoffContrast, testSeries: updated },
                            };
                            setContent(newContent);
                            handleSaveAll(newContent);
                          }}
                          className="text-zinc-400 hover:text-red-500 p-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SECTION: Syllabus */}
          {activeSection === "syllabus" && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold text-black tracking-tight">MPSC Syllabus</h2>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Manage subjects, sub-topics, and syllabus details for the website accordion
                  </p>
                </div>
                <button
                  onClick={() => handleOpenAdd("syllabus")}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-black hover:bg-zinc-800 text-white text-xs font-bold rounded-[4px] shadow-xs cursor-pointer self-start sm:self-auto"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Add Subject</span>
                </button>
              </div>

              {/* Syllabus Items List */}
              <div className="space-y-3">
                {(((content.syllabus as any[]) || []).length === 0) ? (
                  <div className="p-8 text-center bg-white border border-zinc-200 rounded-[4px] text-zinc-400 text-xs">
                    No syllabus subjects available. Click the button above to add.
                  </div>
                ) : (
                  ((content.syllabus as any[]) || []).map((item: any, idx: number) => (
                    <div
                      key={idx}
                      draggable
                      onDragStart={(e) => {
                        setDragSource({ type: "syllabus", index: idx });
                        e.dataTransfer.effectAllowed = "move";
                        e.dataTransfer.setData("text/plain", `${idx}`);
                      }}
                      onDragOver={(e) => {
                        e.preventDefault();
                        e.dataTransfer.dropEffect = "move";
                        if (dragOverIndex !== idx || dragOverType !== "syllabus") {
                          setDragOverIndex(idx);
                          setDragOverType("syllabus");
                        }
                      }}
                      onDragLeave={() => {
                        if (dragOverIndex === idx && dragOverType === "syllabus") {
                          setDragOverIndex(null);
                          setDragOverType(null);
                        }
                      }}
                      onDrop={(e) => {
                        e.preventDefault();
                        if (dragSource && dragSource.type === "syllabus") {
                          handleReorderList("syllabus", dragSource.index, idx);
                        }
                        setDragSource(null);
                        setDragOverIndex(null);
                        setDragOverType(null);
                      }}
                      onDragEnd={() => {
                        setDragSource(null);
                        setDragOverIndex(null);
                        setDragOverType(null);
                      }}
                      className={`border rounded-[4px] bg-white p-4 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all ${
                        dragSource?.type === "syllabus" && dragSource.index === idx
                          ? "opacity-30 bg-zinc-100 border-dashed border-zinc-400"
                          : dragOverType === "syllabus" && dragOverIndex === idx
                          ? "border-t-2 border-t-black bg-zinc-50 border-zinc-300"
                          : "border-zinc-200"
                      }`}
                    >
                      <div className="flex items-start gap-3.5 flex-1 min-w-0">
                        <div
                          className="p-1 text-zinc-400 hover:text-black cursor-grab active:cursor-grabbing shrink-0 self-center"
                          title="Drag to reorder"
                        >
                          <GripVertical className="w-4 h-4" />
                        </div>
                        <div className="w-8 h-8 rounded bg-zinc-100 border border-zinc-300 font-black text-xs flex items-center justify-center text-black shrink-0">
                          {item.num || idx + 1}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-sm font-bold text-black leading-snug">{item.title}</h3>
                            {item.subtitle && (
                              <span className="text-xs text-zinc-500 font-medium">• {item.subtitle}</span>
                            )}
                          </div>
                          <p className="text-xs text-zinc-600 mt-1 line-clamp-2 leading-relaxed font-medium">
                            {item.content}
                          </p>
                          {item.topics && item.topics.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mt-2">
                              {item.topics.map((t: string, tIdx: number) => (
                                <span
                                  key={tIdx}
                                  className="text-[10px] font-medium bg-zinc-100 text-zinc-700 px-2 py-0.5 rounded border border-zinc-200"
                                >
                                  ✓ {t}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                        <button
                          onClick={() => handleOpenEdit("syllabus", idx)}
                          className="p-1.5 text-zinc-600 hover:text-black hover:bg-zinc-100 rounded border border-zinc-200 text-xs flex items-center gap-1 font-semibold cursor-pointer"
                          title="Edit"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDelete("syllabus", idx)}
                          className="p-1.5 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded border border-zinc-200 cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* SECTION: Questions (Sample Question Box Manager) */}
          {activeSection === "sampleProof" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold text-black tracking-tight">Sample Questions & Explanations</h2>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Manage questions, options, infographic images, and explanations dynamically
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsAddingSubject(true)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-black hover:bg-zinc-800 text-white text-xs font-bold rounded-[4px] shadow-xs cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ Add Subject</span>
                  </button>
                </div>
              </div>

              {/* Dynamic Modal / Inline Form to Add New Subject */}
              {isAddingSubject && (
                <div className="p-4 bg-zinc-100 border border-zinc-300 rounded-[4px] space-y-3 animate-in fade-in duration-150">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-black">Create Subject Tab</span>
                    <button
                      onClick={() => {
                        setIsAddingSubject(false);
                        setNewSubjectKey("");
                        setNewSubjectName("");
                      }}
                      className="text-zinc-500 hover:text-black font-bold text-sm cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block text-zinc-600 font-semibold mb-1">Subject ID / Key</label>
                      <input
                        type="text"
                        value={newSubjectKey}
                        onChange={(e) => setNewSubjectKey(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ""))}
                        placeholder="e.g. history or science"
                        className="w-full px-3 py-1.5 border border-zinc-300 rounded-[4px] bg-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-zinc-600 font-semibold mb-1">Subject Name (Display)</label>
                      <input
                        type="text"
                        value={newSubjectName}
                        onChange={(e) => setNewSubjectName(e.target.value)}
                        placeholder="e.g. History"
                        className="w-full px-3 py-1.5 border border-zinc-300 rounded-[4px] bg-white font-medium"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setIsAddingSubject(false)}
                      className="px-3 py-1.5 bg-white border border-zinc-300 text-zinc-700 text-xs font-semibold rounded-[4px] cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        const key = newSubjectKey.trim();
                        const name = newSubjectName.trim();
                        if (!key || !name) {
                          alert("Please enter both ID and Subject Name.");
                          return;
                        }
                        const updated = { ...((content.sampleProof || {}) as Record<string, any>) };
                        updated[key] = {
                          questionNo: 1,
                          subjectName: name,
                          tag: "MPSC संभाव्य सराव प्रश्न",
                          question: "येथे नवीन प्रश्न टाईप करा...",
                          options: ["पर्याय 1", "पर्याय 2", "पर्याय 3", "पर्याय 4"],
                          correct: 0,
                          correctAnswer: "पर्याय 1",
                          image: "",
                          explanation: "येथे सविस्तर स्पष्टीकरण लिहा...",
                          structuredExplanation: {
                            answer: "पर्याय 1",
                            bullets: [
                              { label: "महत्त्वाचा मुद्दा :", text: "येथे विश्लेषण लिहा", highlightClass: "text-[#9B3A32] font-bold" }
                            ],
                            subsections: [
                              { heading: "📌 संदर्भ व टीप :", items: ["परीक्षेसाठी महत्त्वाचा घटक"] }
                            ]
                          }
                        };
                        const newContent = { ...content, sampleProof: updated };
                        setContent(newContent);
                        setActiveSubject(key);
                        setIsAddingSubject(false);
                        setNewSubjectKey("");
                        setNewSubjectName("");
                        handleSaveAll(newContent);
                      }}
                      className="px-4 py-1.5 bg-black text-white text-xs font-bold rounded-[4px] cursor-pointer hover:bg-zinc-800"
                    >
                      Create Subject
                    </button>
                  </div>
                </div>
              )}

              {/* Dynamic Subject Tabs */}
              {(() => {
                const sampleProofData = (content.sampleProof || {}) as Record<string, any>;
                const subjectKeys = Object.keys(sampleProofData);
                const effectiveActive = subjectKeys.includes(activeSubject) ? activeSubject : subjectKeys[0] || "";
                const current = sampleProofData[effectiveActive];

                if (!current) {
                  return (
                    <div className="p-8 text-center bg-white border border-zinc-200 rounded-[4px] text-zinc-400 text-xs">
                      No question tabs available. Add a new subject tab.
                    </div>
                  );
                }

                const handleReorderSubject = (fromKey: string, toKey: string) => {
                  if (!fromKey || !toKey || fromKey === toKey) return;
                  const keys = Object.keys(sampleProofData);
                  const fromIndex = keys.indexOf(fromKey);
                  const toIndex = keys.indexOf(toKey);
                  if (fromIndex === -1 || toIndex === -1) return;

                  const newKeys = [...keys];
                  const [moved] = newKeys.splice(fromIndex, 1);
                  newKeys.splice(toIndex, 0, moved);

                  const updated: Record<string, any> = {};
                  for (const k of newKeys) {
                    updated[k] = sampleProofData[k];
                  }
                  const newContent = { ...content, sampleProof: updated };
                  setContent(newContent);
                  handleSaveAll(newContent);
                };

                const handleMoveSubject = (key: string, direction: "left" | "right") => {
                  const keys = Object.keys(sampleProofData);
                  const index = keys.indexOf(key);
                  if (index === -1) return;
                  const targetIndex = direction === "left" ? index - 1 : index + 1;
                  if (targetIndex < 0 || targetIndex >= keys.length) return;
                  handleReorderSubject(key, keys[targetIndex]);
                };

                return (
                  <div className="space-y-6">
                    {/* Tabs Bar with Drag Left / Right Reorder */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-200 pb-3">
                      <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
                        {subjectKeys.map((key, idx) => {
                          const item = sampleProofData[key];
                          const isDragging = draggedSubjectKey === key;
                          const isDragOver = dragOverSubjectKey === key;
                          const isActive = effectiveActive === key;

                          return (
                            <div
                              key={key}
                              draggable
                              onDragStart={(e) => {
                                setDraggedSubjectKey(key);
                                e.dataTransfer.effectAllowed = "move";
                                e.dataTransfer.setData("text/plain", key);
                              }}
                              onDragOver={(e) => {
                                e.preventDefault();
                                e.dataTransfer.dropEffect = "move";
                                if (dragOverSubjectKey !== key) {
                                  setDragOverSubjectKey(key);
                                }
                              }}
                              onDragLeave={() => {
                                if (dragOverSubjectKey === key) {
                                  setDragOverSubjectKey(null);
                                }
                              }}
                              onDrop={(e) => {
                                e.preventDefault();
                                const sourceKey = e.dataTransfer.getData("text/plain") || draggedSubjectKey;
                                if (sourceKey && sourceKey !== key) {
                                  handleReorderSubject(sourceKey, key);
                                }
                                setDraggedSubjectKey(null);
                                setDragOverSubjectKey(null);
                              }}
                              onDragEnd={() => {
                                setDraggedSubjectKey(null);
                                setDragOverSubjectKey(null);
                              }}
                              className={`group relative flex items-center rounded-[4px] select-none cursor-grab active:cursor-grabbing transition-all ${
                                isDragging
                                  ? "opacity-30 scale-95 border border-dashed border-zinc-500"
                                  : isDragOver
                                  ? "ring-2 ring-black scale-105 z-10"
                                  : ""
                              }`}
                              title="Drag left or right to reorder"
                            >
                              <div
                                onClick={() => setActiveSubject(key)}
                                className={`px-3 py-1.5 text-xs font-bold rounded-[4px] transition-all flex items-center gap-1.5 cursor-pointer ${
                                  isActive
                                    ? "bg-black text-white shadow-2xs"
                                    : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
                                }`}
                              >
                                <GripVertical className={`w-3 h-3 opacity-40 group-hover:opacity-100 transition-opacity ${isActive ? "text-zinc-300" : "text-zinc-600"}`} />
                                <span>{item?.subjectName || key}</span>
                              </div>

                              {/* Quick Move Left / Right Buttons on hover */}
                              <div className="hidden group-hover:flex items-center gap-0.5 absolute -top-3.5 left-1/2 -translate-x-1/2 bg-white border border-zinc-300 rounded shadow-xs px-1 py-0.5 z-30">
                                {idx > 0 && (
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleMoveSubject(key, "left");
                                    }}
                                    className="w-3.5 h-3.5 flex items-center justify-center text-[10px] text-zinc-600 hover:bg-zinc-100 rounded cursor-pointer font-bold"
                                    title="Move Left"
                                  >
                                    ←
                                  </button>
                                )}
                                {idx < subjectKeys.length - 1 && (
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleMoveSubject(key, "right");
                                    }}
                                    className="w-3.5 h-3.5 flex items-center justify-center text-[10px] text-zinc-600 hover:bg-zinc-100 rounded cursor-pointer font-bold"
                                    title="Move Right"
                                  >
                                    →
                                  </button>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Right Side: Reorder hint + Delete Subject Button */}
                      <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
                        <span className="text-[11px] text-zinc-400 hidden md:inline-block">
                          ⠿ Drag to reorder
                        </span>
                        {subjectKeys.length > 1 && (
                          <button
                            onClick={() => {
                              if (confirm(`Are you sure you want to delete '${current.subjectName || effectiveActive}' tab?`)) {
                                const updated = { ...sampleProofData };
                                delete updated[effectiveActive];
                                const newKeys = Object.keys(updated);
                                const newContent = { ...content, sampleProof: updated };
                                setContent(newContent);
                                setActiveSubject(newKeys[0] || "");
                                handleSaveAll(newContent);
                              }
                            }}
                            className="text-xs text-red-600 hover:text-red-700 hover:bg-red-50 px-2.5 py-1 rounded border border-red-200 shrink-0 font-medium cursor-pointer"
                          >
                            Delete Subject
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Editor Form for Current Active Subject */}
                    <div className="border border-zinc-200 rounded-[4px] bg-white p-5 sm:p-6 shadow-xs space-y-5">
                      
                      {/* Top Row: Question No, Subject Name & Badge Tag */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-zinc-700 mb-1">
                            Question No.
                          </label>
                          <input
                            type="number"
                            value={current.questionNo || 1}
                            onChange={(e) => {
                              const updated = { ...sampleProofData };
                              updated[effectiveActive].questionNo = Number(e.target.value);
                              setContent({ ...content, sampleProof: updated });
                            }}
                            className="w-full px-3 py-1.5 border border-zinc-300 rounded-[4px] text-xs font-bold bg-white"
                            placeholder="6"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-zinc-700 mb-1">
                            Subject Name
                          </label>
                          <input
                            type="text"
                            value={current.subjectName || ""}
                            onChange={(e) => {
                              const updated = { ...sampleProofData };
                              updated[effectiveActive].subjectName = e.target.value;
                              setContent({ ...content, sampleProof: updated });
                            }}
                            className="w-full px-3 py-1.5 border border-zinc-300 rounded-[4px] text-xs font-bold bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-zinc-700 mb-1">
                            Badge Tag
                          </label>
                          <input
                            type="text"
                            value={current.tag || ""}
                            onChange={(e) => {
                              const updated = { ...sampleProofData };
                              updated[effectiveActive].tag = e.target.value;
                              setContent({ ...content, sampleProof: updated });
                            }}
                            className="w-full px-3 py-1.5 border border-zinc-300 rounded-[4px] text-xs bg-white"
                            placeholder="e.g. MPSC Target Question"
                          />
                        </div>
                      </div>

                      {/* Question Textarea */}
                      <div>
                        <label className="block text-xs font-semibold text-zinc-700 mb-1">
                          Question Text
                        </label>
                        <textarea
                          rows={3}
                          value={current.question || ""}
                          onChange={(e) => {
                            const updated = { ...sampleProofData };
                            updated[effectiveActive].question = e.target.value;
                            setContent({ ...content, sampleProof: updated });
                          }}
                          placeholder="Type question here..."
                          className="w-full px-3 py-2 border border-zinc-300 rounded-[4px] text-xs font-bold bg-white leading-relaxed"
                        />
                      </div>

                      {/* Dynamic Options List with Radio Answer Picker */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="block text-xs font-semibold text-zinc-700">
                            Options (select correct answer)
                          </label>
                          <button
                            type="button"
                            onClick={() => {
                              const updated = { ...sampleProofData };
                              const opts = [...(current.options || [])];
                              opts.push(`Option ${opts.length + 1}`);
                              updated[effectiveActive].options = opts;
                              setContent({ ...content, sampleProof: updated });
                            }}
                            className="text-xs font-bold text-black hover:underline cursor-pointer flex items-center gap-1"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>+ Add Option</span>
                          </button>
                        </div>

                        <div className="space-y-2">
                          {(current.options || []).map((opt: string, optIdx: number) => {
                            const isSelected = current.correct === optIdx;
                            return (
                              <div
                                key={optIdx}
                                draggable
                                onDragStart={(e) => {
                                  setDragOptionSource(optIdx);
                                  e.dataTransfer.effectAllowed = "move";
                                }}
                                onDragOver={(e) => {
                                  e.preventDefault();
                                  e.dataTransfer.dropEffect = "move";
                                  if (dragOverOptionIndex !== optIdx) {
                                    setDragOverOptionIndex(optIdx);
                                  }
                                }}
                                onDragLeave={() => {
                                  if (dragOverOptionIndex === optIdx) {
                                    setDragOverOptionIndex(null);
                                  }
                                }}
                                onDrop={(e) => {
                                  e.preventDefault();
                                  if (dragOptionSource !== null && dragOptionSource !== optIdx) {
                                    handleReorderOption(dragOptionSource, optIdx);
                                  }
                                  setDragOptionSource(null);
                                  setDragOverOptionIndex(null);
                                }}
                                onDragEnd={() => {
                                  setDragOptionSource(null);
                                  setDragOverOptionIndex(null);
                                }}
                                className={`p-2.5 border rounded-[4px] flex items-center gap-2.5 transition-all ${
                                  dragOptionSource === optIdx
                                    ? "opacity-30 bg-zinc-100"
                                    : dragOverOptionIndex === optIdx
                                    ? "border-t-2 border-t-black bg-zinc-50"
                                    : isSelected
                                    ? "border-emerald-600 bg-emerald-50/60 font-bold"
                                    : "border-zinc-200 bg-white"
                                }`}
                              >
                                <div
                                  className="text-zinc-400 hover:text-black cursor-grab active:cursor-grabbing p-0.5 shrink-0"
                                  title="Drag to reorder option"
                                >
                                  <GripVertical className="w-3.5 h-3.5" />
                                </div>
                                <input
                                  type="radio"
                                  name={`correctAnswer_${effectiveActive}`}
                                  checked={isSelected}
                                  onChange={() => {
                                    const updated = { ...sampleProofData };
                                    updated[effectiveActive].correct = optIdx;
                                    updated[effectiveActive].correctAnswer = opt;
                                    setContent({ ...content, sampleProof: updated });
                                  }}
                                  className="accent-emerald-600 cursor-pointer w-4 h-4"
                                />
                                <span className="text-xs text-zinc-400 font-bold w-6 text-center">
                                  #{optIdx + 1}
                                </span>
                                <input
                                  type="text"
                                  value={opt}
                                  onChange={(e) => {
                                    const updated = { ...sampleProofData };
                                    const opts = [...(updated[effectiveActive].options || [])];
                                    opts[optIdx] = e.target.value;
                                    updated[effectiveActive].options = opts;
                                    if (updated[effectiveActive].correct === optIdx) {
                                      updated[effectiveActive].correctAnswer = e.target.value;
                                    }
                                    setContent({ ...content, sampleProof: updated });
                                  }}
                                  className="flex-1 bg-transparent text-xs outline-none font-medium text-black"
                                />
                                {(current.options || []).length > 2 && (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const updated = { ...sampleProofData };
                                      const opts = current.options.filter((_: any, i: number) => i !== optIdx);
                                      updated[effectiveActive].options = opts;
                                      if (updated[effectiveActive].correct >= opts.length) {
                                        updated[effectiveActive].correct = 0;
                                      }
                                      setContent({ ...content, sampleProof: updated });
                                    }}
                                    className="text-zinc-400 hover:text-red-500 p-1 cursor-pointer"
                                    title="Delete Option"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Correct Answer Display Headline Text */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-zinc-700 mb-1">
                            Correct Answer Headline
                          </label>
                          <input
                            type="text"
                            value={current.correctAnswer || current.options?.[current.correct] || ""}
                            onChange={(e) => {
                              const updated = { ...sampleProofData };
                              updated[effectiveActive].correctAnswer = e.target.value;
                              setContent({ ...content, sampleProof: updated });
                            }}
                            placeholder="e.g. Correct Answer Title"
                            className="w-full px-3 py-1.5 border border-zinc-300 rounded-[4px] text-xs font-bold text-emerald-800 bg-white"
                          />
                        </div>

                        {/* Image URL / Path with thumbnail preview */}
                        <div>
                          <label className="block text-xs font-semibold text-zinc-700 mb-1">
                            Infographic Image (URL / Path)
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={current.image || ""}
                              onChange={(e) => {
                                const updated = { ...sampleProofData };
                                updated[effectiveActive].image = e.target.value;
                                setContent({ ...content, sampleProof: updated });
                              }}
                              placeholder="/sample-image.png or https://..."
                              className="flex-1 px-3 py-1.5 border border-zinc-300 rounded-[4px] text-xs bg-white font-mono"
                            />
                            {current.image && (
                              <button
                                type="button"
                                onClick={() => {
                                  const updated = { ...sampleProofData };
                                  updated[effectiveActive].image = "";
                                  setContent({ ...content, sampleProof: updated });
                                }}
                                className="px-2 py-1 text-xs text-red-600 hover:bg-red-50 rounded border border-red-200 cursor-pointer"
                              >
                                Remove
                              </button>
                            )}
                          </div>
                          {current.image && (
                            <div className="mt-2 flex items-center gap-3 p-2 bg-zinc-50 border border-zinc-200 rounded-[4px]">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={current.image}
                                alt="Thumbnail Preview"
                                className="w-16 h-10 object-cover rounded border border-zinc-300"
                              />
                              <span className="text-[11px] text-zinc-500 font-mono truncate">{current.image}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Explanation Mode Switcher */}
                      <div className="pt-2 border-t border-zinc-200">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-3">
                          <div>
                            <label className="text-xs font-bold text-black flex items-center gap-1.5">
                              <span>Explanation (Dynamic Description Box)</span>
                              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">WYSIWYG</span>
                            </label>
                            <span className="text-[11px] text-zinc-500">B, I, U, Lists, Format, Colors, Alignment, Clear, Link, Math (fx)</span>
                          </div>
                          <div className="flex border border-zinc-300 rounded-[4px] overflow-hidden text-xs">
                            <button
                              type="button"
                              onClick={() => setExplanationMode("rich")}
                              className={`px-3 py-1 font-semibold cursor-pointer ${
                                explanationMode === "rich"
                                  ? "bg-black text-white"
                                  : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                              }`}
                            >
                              Rich Text
                            </button>
                            <button
                              type="button"
                              onClick={() => setExplanationMode("structured")}
                              className={`px-3 py-1 font-semibold cursor-pointer ${
                                explanationMode === "structured"
                                  ? "bg-black text-white"
                                  : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                              }`}
                            >
                              Bullets
                            </button>
                            <button
                              type="button"
                              onClick={() => setExplanationMode("text")}
                              className={`px-3 py-1 font-semibold cursor-pointer ${
                                explanationMode === "text"
                                  ? "bg-black text-white"
                                  : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                              }`}
                            >
                              Plain Text
                            </button>
                          </div>
                        </div>

                        {/* MODE 1: DYNAMIC RICH TEXT WYSIWYG EDITOR (Primary) */}
                        {explanationMode === "rich" ? (
                          <div className="space-y-2">
                            <RichTextEditor
                              value={current.explanationHtml || getInitialHtmlForQuestion(current)}
                              onChange={(newHtml) => {
                                const updated = { ...sampleProofData };
                                updated[effectiveActive].explanationHtml = newHtml;
                                if (typeof document !== "undefined") {
                                  const tmp = document.createElement("DIV");
                                  tmp.innerHTML = newHtml;
                                  updated[effectiveActive].explanation = tmp.textContent || tmp.innerText || "";
                                }
                                setContent({ ...content, sampleProof: updated });
                              }}
                              placeholder="Insert text here ..."
                            />
                          </div>
                        ) : explanationMode === "structured" ? (
                          <div className="space-y-4 bg-zinc-50/70 p-4 border border-zinc-200 rounded-[4px]">
                            
                            {/* A. Key-Value Bullets */}
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-bold text-zinc-800">
                                  1. Key Bullets
                                </span>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const updated = { ...sampleProofData };
                                    const struct = updated[effectiveActive].structuredExplanation || {
                                      answer: current.correctAnswer || "",
                                      bullets: [],
                                      subsections: []
                                    };
                                    const bullets = [...(struct.bullets || [])];
                                    bullets.push({ label: "Point :", text: "", highlightClass: "" });
                                    struct.bullets = bullets;
                                    updated[effectiveActive].structuredExplanation = struct;
                                    setContent({ ...content, sampleProof: updated });
                                  }}
                                  className="text-xs font-bold text-black hover:underline flex items-center gap-1 cursor-pointer"
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                  <span>+ Add Bullet</span>
                                </button>
                              </div>

                              <div className="space-y-2">
                                {(current.structuredExplanation?.bullets || []).length === 0 ? (
                                  <p className="text-xs text-zinc-400 italic">No bullet points added.</p>
                                ) : (
                                  (current.structuredExplanation?.bullets || []).map((bullet: any, bIdx: number) => (
                                    <div key={bIdx} className="flex flex-col sm:flex-row items-start sm:items-center gap-2 p-2 bg-white border border-zinc-200 rounded-[4px]">
                                      <input
                                        type="text"
                                        value={bullet.label || ""}
                                        onChange={(e) => {
                                          const updated = { ...sampleProofData };
                                          const struct = { ...updated[effectiveActive].structuredExplanation };
                                          struct.bullets[bIdx].label = e.target.value;
                                          updated[effectiveActive].structuredExplanation = struct;
                                          setContent({ ...content, sampleProof: updated });
                                        }}
                                        placeholder="Label (e.g. Key Point :)"
                                        className="w-full sm:w-48 px-2.5 py-1.5 border border-zinc-300 rounded-[4px] text-xs font-bold bg-white"
                                      />
                                      <input
                                        type="text"
                                        value={bullet.text || ""}
                                        onChange={(e) => {
                                          const updated = { ...sampleProofData };
                                          const struct = { ...updated[effectiveActive].structuredExplanation };
                                          struct.bullets[bIdx].text = e.target.value;
                                          updated[effectiveActive].structuredExplanation = struct;
                                          setContent({ ...content, sampleProof: updated });
                                        }}
                                        placeholder="Detail text..."
                                        className="flex-1 w-full px-2.5 py-1.5 border border-zinc-300 rounded-[4px] text-xs bg-white font-medium"
                                      />
                                      <select
                                        value={bullet.highlightClass || ""}
                                        onChange={(e) => {
                                          const updated = { ...sampleProofData };
                                          const struct = { ...updated[effectiveActive].structuredExplanation };
                                          struct.bullets[bIdx].highlightClass = e.target.value;
                                          updated[effectiveActive].structuredExplanation = struct;
                                          setContent({ ...content, sampleProof: updated });
                                        }}
                                        className="px-2 py-1.5 border border-zinc-300 rounded-[4px] text-xs bg-white"
                                      >
                                        <option value="">Default</option>
                                        <option value="text-[#9B3A32] font-bold">Red/Brown (#9B3A32)</option>
                                        <option value="text-blue-700 font-bold">Blue</option>
                                        <option value="text-emerald-700 font-bold">Green</option>
                                      </select>
                                      <button
                                        type="button"
                                        onClick={() => {
                                          const updated = { ...sampleProofData };
                                          const struct = { ...updated[effectiveActive].structuredExplanation };
                                          struct.bullets = struct.bullets.filter((_: any, i: number) => i !== bIdx);
                                          updated[effectiveActive].structuredExplanation = struct;
                                          setContent({ ...content, sampleProof: updated });
                                        }}
                                        className="text-zinc-400 hover:text-red-500 p-1 cursor-pointer self-end sm:self-auto"
                                        title="Delete"
                                      >
                                        <Trash2 className="w-3.5 h-3.5" />
                                      </button>
                                    </div>
                                  ))
                                )}
                              </div>
                            </div>

                            {/* B. Subsections with Emojis */}
                            <div className="pt-3 border-t border-zinc-200">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-bold text-zinc-800">
                                  2. Subsections
                                </span>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const updated = { ...sampleProofData };
                                    const struct = updated[effectiveActive].structuredExplanation || {
                                      answer: current.correctAnswer || "",
                                      bullets: [],
                                      subsections: []
                                    };
                                    const subsections = [...(struct.subsections || [])];
                                    subsections.push({ heading: "🏛 Subsection Title :", items: ["Point 1"] });
                                    struct.subsections = subsections;
                                    updated[effectiveActive].structuredExplanation = struct;
                                    setContent({ ...content, sampleProof: updated });
                                  }}
                                  className="text-xs font-bold text-black hover:underline flex items-center gap-1 cursor-pointer"
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                  <span>+ Add Subsection</span>
                                </button>
                              </div>

                              <div className="space-y-3">
                                {(current.structuredExplanation?.subsections || []).length === 0 ? (
                                  <p className="text-xs text-zinc-400 italic">No subsections added.</p>
                                ) : (
                                  (current.structuredExplanation?.subsections || []).map((sec: any, sIdx: number) => (
                                    <div key={sIdx} className="p-3 bg-white border border-zinc-200 rounded-[4px] space-y-2.5">
                                      <div className="flex items-center justify-between gap-2">
                                        <input
                                          type="text"
                                          value={sec.heading || ""}
                                          onChange={(e) => {
                                            const updated = { ...sampleProofData };
                                            const struct = { ...updated[effectiveActive].structuredExplanation };
                                            struct.subsections[sIdx].heading = e.target.value;
                                            updated[effectiveActive].structuredExplanation = struct;
                                            setContent({ ...content, sampleProof: updated });
                                          }}
                                          placeholder="e.g. 🏛 Subsection Title :"
                                          className="flex-1 px-2.5 py-1.5 border border-zinc-300 rounded-[4px] text-xs font-bold text-black"
                                        />
                                        <button
                                          type="button"
                                          onClick={() => {
                                            const updated = { ...sampleProofData };
                                            const struct = { ...updated[effectiveActive].structuredExplanation };
                                            struct.subsections = struct.subsections.filter((_: any, i: number) => i !== sIdx);
                                            updated[effectiveActive].structuredExplanation = struct;
                                            setContent({ ...content, sampleProof: updated });
                                          }}
                                          className="text-xs text-red-600 hover:underline p-1 cursor-pointer font-medium"
                                        >
                                          Delete Subsection
                                        </button>
                                      </div>

                                      {/* Points inside subsection */}
                                      <div className="space-y-1.5 pl-3 border-l-2 border-zinc-200">
                                        {(sec.items || []).map((itemPoint: string, pIdx: number) => (
                                          <div key={pIdx} className="flex items-center gap-2">
                                            <span className="text-xs font-bold text-zinc-400">•</span>
                                            <input
                                              type="text"
                                              value={itemPoint}
                                              onChange={(e) => {
                                                const updated = { ...sampleProofData };
                                                const struct = { ...updated[effectiveActive].structuredExplanation };
                                                struct.subsections[sIdx].items[pIdx] = e.target.value;
                                                updated[effectiveActive].structuredExplanation = struct;
                                                setContent({ ...content, sampleProof: updated });
                                              }}
                                              placeholder="Point detail..."
                                              className="flex-1 px-2.5 py-1 border border-zinc-300 rounded-[4px] text-xs bg-white"
                                            />
                                            {(sec.items || []).length > 1 && (
                                              <button
                                                type="button"
                                                onClick={() => {
                                                  const updated = { ...sampleProofData };
                                                  const struct = { ...updated[effectiveActive].structuredExplanation };
                                                  struct.subsections[sIdx].items = struct.subsections[sIdx].items.filter((_: any, i: number) => i !== pIdx);
                                                  updated[effectiveActive].structuredExplanation = struct;
                                                  setContent({ ...content, sampleProof: updated });
                                                }}
                                                className="text-zinc-400 hover:text-red-500 p-1 cursor-pointer"
                                              >
                                                <Trash2 className="w-3.5 h-3.5" />
                                              </button>
                                            )}
                                          </div>
                                        ))}
                                        <button
                                          type="button"
                                          onClick={() => {
                                            const updated = { ...sampleProofData };
                                            const struct = { ...updated[effectiveActive].structuredExplanation };
                                            struct.subsections[sIdx].items.push("New Point");
                                            updated[effectiveActive].structuredExplanation = struct;
                                            setContent({ ...content, sampleProof: updated });
                                          }}
                                          className="text-[11px] font-semibold text-black hover:underline cursor-pointer pt-1 block"
                                        >
                                          + Add Point
                                        </button>
                                      </div>
                                    </div>
                                  ))
                                )}
                              </div>
                            </div>

                          </div>
                        ) : (
                          <div>
                            <textarea
                              rows={4}
                              value={current.explanation || ""}
                              onChange={(e) => {
                                const updated = { ...sampleProofData };
                                updated[effectiveActive].explanation = e.target.value;
                                setContent({ ...content, sampleProof: updated });
                              }}
                              className="w-full px-3 py-2 border border-zinc-300 rounded-[4px] text-xs bg-white font-normal leading-relaxed"
                              placeholder="Enter plain text explanation..."
                            />
                          </div>
                        )}
                      </div>

                      {/* Save Button */}
                      <div className="pt-3 border-t border-zinc-200 flex items-center justify-between">
                        <span className="text-xs text-zinc-500">
                          Click save after making changes.
                        </span>
                        <button
                          onClick={() => handleSaveAll()}
                          disabled={isSaving}
                          className="px-6 py-2.5 bg-black hover:bg-zinc-800 text-white text-xs font-bold rounded-[4px] shadow-sm cursor-pointer transition-all flex items-center gap-1.5"
                        >
                          <Save className="w-3.5 h-3.5" />
                          <span>{isSaving ? "Saving..." : "Save Question"}</span>
                        </button>
                      </div>

                    </div>

                    {/* LIVE QUESTION BOX PREVIEW */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Eye className="w-4 h-4 text-black" />
                        <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-700">
                          Live Question Box Preview
                        </h3>
                      </div>

                      <div className="bg-[#f4f5f8] rounded-2xl border border-slate-200/90 shadow-sm p-6 space-y-4 max-w-3xl">
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-base font-bold text-slate-900">
                            Question No. {current.questionNo || 6}
                          </span>
                          <span className="text-xs bg-slate-200/80 text-slate-700 px-3 py-1 rounded-md font-semibold border border-slate-300/60">
                            {current.tag || current.subjectName}
                          </span>
                        </div>

                        <div className="bg-[#dce3f0] rounded-xl p-4 text-slate-900 font-bold text-sm leading-relaxed">
                          {current.question || "Question text will appear here..."}
                        </div>

                        <div className="space-y-2">
                          {(current.options || []).map((opt: string, idx: number) => {
                            const isCorrect = idx === current.correct;
                            return (
                              <div
                                key={idx}
                                className={`flex items-center gap-3 px-3.5 py-2 rounded-xl text-sm ${
                                  isCorrect
                                    ? "bg-[#bbf7d0] text-emerald-950 font-bold"
                                    : "text-slate-700 font-medium"
                                }`}
                              >
                                {isCorrect ? (
                                  <div className="w-4 h-4 rounded-full border-2 border-emerald-700 bg-white flex items-center justify-center shrink-0">
                                    <div className="w-2 h-2 rounded-full bg-emerald-700" />
                                  </div>
                                ) : (
                                  <div className="w-4 h-4 rounded-full border border-slate-400 shrink-0 bg-white" />
                                )}
                                <span>{opt}</span>
                              </div>
                            );
                          })}
                        </div>

                        <div className="pt-2 space-y-2 text-xs sm:text-sm">
                          <p className="font-semibold text-slate-700">Explanation:</p>

                          {current.image && (
                            <div className="rounded-xl overflow-hidden border border-slate-200 shadow-xs max-w-lg my-2">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={current.image} alt="Preview" className="w-full h-auto object-cover" />
                            </div>
                          )}

                          <p className="font-extrabold text-[#15803d]">
                            उत्तर : {current.correctAnswer || current.options?.[current.correct]}
                          </p>

                          {current.explanationHtml ? (
                            <div
                              className="rich-preview text-slate-800 leading-relaxed font-normal space-y-2 [&_h1]:text-base sm:[&_h1]:text-lg [&_h1]:font-extrabold [&_h1]:text-slate-900 [&_h1]:my-1.5 [&_h2]:text-sm sm:[&_h2]:text-base [&_h2]:font-bold [&_h2]:text-slate-900 [&_h2]:my-1.5 [&_h3]:text-xs sm:[&_h3]:text-sm [&_h3]:font-bold [&_h3]:text-slate-800 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-1 [&_li]:my-0.5 [&_blockquote]:border-l-3 [&_blockquote]:border-[#9B3A32] [&_blockquote]:pl-3 [&_blockquote]:italic [&_blockquote]:text-slate-600 [&_code]:bg-slate-100 [&_code]:text-[#9B3A32] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:font-mono [&_code]:text-xs [&_a]:text-[#2563eb] [&_a]:underline [&_a]:font-semibold"
                              dangerouslySetInnerHTML={{ __html: current.explanationHtml }}
                            />
                          ) : current.structuredExplanation ? (
                            <div className="space-y-2 text-slate-800">
                              {(current.structuredExplanation.bullets || []).map((bullet: any, idx: number) => (
                                <p key={idx} className="flex items-start gap-2">
                                  <span className="font-bold">•</span>
                                  <span>
                                    <strong className={`font-bold ${bullet.highlightClass || "text-slate-900"}`}>
                                      {bullet.label}
                                    </strong>{" "}
                                    <span className="text-slate-700">{bullet.text}</span>
                                  </span>
                                </p>
                              ))}

                              {(current.structuredExplanation.subsections || []).map((sec: any, sIdx: number) => (
                                <div key={sIdx} className="pt-1.5 space-y-1">
                                  <p className="font-bold text-slate-900">{sec.heading}</p>
                                  {(sec.items || []).map((item: string, iIdx: number) => (
                                    <p key={iIdx} className="flex items-start gap-2 pl-2 text-slate-700">
                                      <span className="font-bold">•</span>
                                      <span>{item}</span>
                                    </p>
                                  ))}
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-slate-700 whitespace-pre-line font-normal">{current.explanation}</p>
                          )}
                        </div>
                      </div>
                    </div>

                  </div>
                );
              })()}
            </div>
          )}

          {/* SECTION: Pricing & Final CTA */}
          {activeSection === "finalCta" && (
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-bold text-black tracking-tight">Pricing & Final CTA</h2>
                <p className="text-xs text-zinc-400 mt-0.5">Pricing, discounts, seat counters, and inclusions</p>
              </div>

              <div className="border border-zinc-200 rounded-[4px] bg-white p-6 shadow-xs space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 mb-1">Offer Price (₹)</label>
                    <input
                      type="number"
                      value={content.finalCta.offerPrice}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          finalCta: { ...content.finalCta, offerPrice: Number(e.target.value) },
                        })
                      }
                      className="w-full px-3 py-2 border border-zinc-300 rounded-[4px] text-base font-black text-black bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 mb-1">Original Price (₹)</label>
                    <input
                      type="number"
                      value={content.finalCta.originalPrice}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          finalCta: { ...content.finalCta, originalPrice: Number(e.target.value) },
                        })
                      }
                      className="w-full px-3 py-2 border border-zinc-300 rounded-[4px] text-base font-bold text-zinc-400 line-through bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 mb-1">Booked Seats</label>
                    <input
                      type="number"
                      value={content.finalCta.bookedSeats}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          finalCta: { ...content.finalCta, bookedSeats: Number(e.target.value) },
                        })
                      }
                      className="w-full px-3 py-1.5 border border-zinc-300 rounded-[4px] text-xs font-bold bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 mb-1">Remaining Seats</label>
                    <input
                      type="number"
                      value={content.finalCta.remainingSeats}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          finalCta: { ...content.finalCta, remainingSeats: Number(e.target.value) },
                        })
                      }
                      className="w-full px-3 py-1.5 border border-zinc-300 rounded-[4px] text-xs font-bold bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">CTA Button Text</label>
                  <input
                    type="text"
                    value={content.finalCta.buttonText}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        finalCta: { ...content.finalCta, buttonText: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 border border-zinc-300 rounded-[4px] text-xs font-bold bg-white"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-zinc-700">Checklist Inclusions</label>
                  {content.finalCta.checklist.map((chk, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="text-zinc-400 text-xs font-bold">{idx + 1}.</span>
                      <input
                        type="text"
                        value={chk}
                        onChange={(e) => {
                          const updated = [...content.finalCta.checklist];
                          updated[idx] = e.target.value;
                          setContent({
                            ...content,
                            finalCta: { ...content.finalCta, checklist: updated },
                          });
                        }}
                        className="w-full px-3 py-1.5 border border-zinc-300 rounded-[4px] text-xs bg-white"
                      />
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => handleSaveAll()}
                  disabled={isSaving}
                  className="w-full py-2.5 bg-black hover:bg-zinc-800 text-white text-xs font-bold rounded-[4px] shadow-xs cursor-pointer"
                >
                  Save Pricing
                </button>
              </div>
            </div>
          )}

        </div>

      </main>

      {/* 3. MODAL DIALOG ("FILLING FORMS" - Matching Image 1 & 3 exact form modal) */}
      <Dialog.Root open={modalType !== null} onOpenChange={(open) => !open && setModalType(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 animate-in fade-in duration-150" />
          <Dialog.Content className="admin-panel fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-[6px] shadow-2xl border border-zinc-200 w-full max-w-lg z-50 p-6 max-h-[90vh] overflow-y-auto outline-none animate-in zoom-in-95 duration-150">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
              <Dialog.Title className="text-sm font-bold text-black">
                {editingIndex !== null ? "Edit" : "New"}{" "}
                {modalType === "faq"
                  ? "FAQ"
                  : modalType === "testimonial"
                  ? "Testimonial"
                  : modalType === "purchase"
                  ? "Purchase Step"
                  : modalType === "syllabus"
                  ? "Syllabus Subject"
                  : "Pain Point & Solution"}
              </Dialog.Title>
              <Dialog.Close asChild>
                <button
                  className="p-1 rounded-sm text-zinc-400 hover:text-black hover:bg-zinc-100 cursor-pointer"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </Dialog.Close>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleModalSubmit} className="space-y-4 pt-4">
              
              {/* FAQ FORM (Matches Image 1) */}
              {modalType === "faq" && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-800 mb-1">Question</label>
                    <input
                      type="text"
                      value={faqForm.q}
                      onChange={(e) => setFaqForm({ ...faqForm, q: e.target.value })}
                      placeholder="e.g. Who is this test series for?"
                      className="w-full px-3.5 py-2 border border-zinc-300 rounded-[4px] text-xs bg-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all"
                      required
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-semibold text-zinc-800">Answer</label>
                      <span className="text-[12px] text-zinc-400 font-mono">{faqForm.a.length}</span>
                    </div>

                    {/* Rich text formatting toolbar (Identical to Image 1) */}
                    <div className="border border-zinc-300 rounded-[4px] overflow-hidden bg-white">
                      <div className="bg-zinc-100 border-b border-zinc-200 p-1.5 flex flex-wrap items-center gap-1 text-zinc-600 text-xs">
                        <button type="button" className="p-1 hover:bg-zinc-200 rounded" title="Bold">
                          <Bold className="w-3.5 h-3.5" />
                        </button>
                        <button type="button" className="p-1 hover:bg-zinc-200 rounded" title="Italic">
                          <Italic className="w-3.5 h-3.5" />
                        </button>
                        <button type="button" className="p-1 hover:bg-zinc-200 rounded" title="Underline">
                          <Underline className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-px h-4 bg-zinc-300 mx-0.5" />
                        <span className="text-[13px] px-1 text-zinc-500">Normal ▾</span>
                        <span className="w-px h-4 bg-zinc-300 mx-0.5" />
                        <span className="text-[13px] px-1 text-zinc-500">Default (Black) ▾</span>
                        <span className="text-[13px] px-1 text-zinc-500">None (Transparent) ▾</span>
                        <span className="w-px h-4 bg-zinc-300 mx-0.5" />
                        <button type="button" className="p-1 hover:bg-zinc-200 rounded" title="Align Left">
                          <AlignLeft className="w-3.5 h-3.5" />
                        </button>
                        <button type="button" className="p-1 hover:bg-zinc-200 rounded" title="Align Center">
                          <AlignCenter className="w-3.5 h-3.5" />
                        </button>
                        <button type="button" className="p-1 hover:bg-zinc-200 rounded" title="Align Right">
                          <AlignRight className="w-3.5 h-3.5" />
                        </button>
                        <button type="button" className="p-1 hover:bg-zinc-200 rounded" title="List">
                          <List className="w-3.5 h-3.5" />
                        </button>
                        <button type="button" className="p-1 hover:bg-zinc-200 rounded" title="Ordered List">
                          <ListOrdered className="w-3.5 h-3.5" />
                        </button>
                        <button type="button" className="p-1 hover:bg-zinc-200 rounded" title="Link">
                          <Link2 className="w-3.5 h-3.5" />
                        </button>
                        <button type="button" className="p-1 hover:bg-zinc-200 rounded" title="Undo">
                          <Undo className="w-3.5 h-3.5" />
                        </button>
                        <button type="button" className="p-1 hover:bg-zinc-200 rounded" title="Redo">
                          <Redo className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <textarea
                        rows={5}
                        value={faqForm.a}
                        onChange={(e) => setFaqForm({ ...faqForm, a: e.target.value })}
                        placeholder="Type detailed answer here..."
                        className="w-full p-3 text-xs bg-white focus:outline-none resize-y"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-800 mb-1">Display Order</label>
                    <input
                      type="number"
                      value={faqForm.order}
                      onChange={(e) => setFaqForm({ ...faqForm, order: Number(e.target.value) })}
                      className="w-full px-3 py-1.5 border border-zinc-300 rounded-[4px] text-xs bg-white"
                    />
                  </div>
                </>
              )}

              {/* TESTIMONIAL FORM (Matches Image 3) */}
              {modalType === "testimonial" && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-800 mb-1">Name</label>
                    <input
                      type="text"
                      value={testimonialForm.name}
                      onChange={(e) => setTestimonialForm({ ...testimonialForm, name: e.target.value })}
                      placeholder="e.g. Amol Shinde"
                      className="w-full px-3.5 py-2 border border-zinc-300 rounded-[4px] text-xs bg-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-800 mb-1">Initials</label>
                      <input
                        type="text"
                        value={testimonialForm.initial}
                        onChange={(e) => setTestimonialForm({ ...testimonialForm, initial: e.target.value })}
                        placeholder="AS"
                        className="w-full px-3 py-1.5 border border-zinc-300 rounded-[4px] text-xs bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-800 mb-1">Location</label>
                      <input
                        type="text"
                        value={testimonialForm.location}
                        onChange={(e) => setTestimonialForm({ ...testimonialForm, location: e.target.value })}
                        placeholder="Pune"
                        className="w-full px-3 py-1.5 border border-zinc-300 rounded-[4px] text-xs bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-800 mb-1">Exam & Year (Outcome Tag)</label>
                    <input
                      type="text"
                      value={testimonialForm.outcomeTag}
                      onChange={(e) => setTestimonialForm({ ...testimonialForm, outcomeTag: e.target.value })}
                      placeholder="e.g. Cutoff Cleared — 64.5 Marks"
                      className="w-full px-3.5 py-2 border border-zinc-300 rounded-[4px] text-xs bg-white"
                      required
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-semibold text-zinc-800">Quote</label>
                      <span className="text-[12px] text-zinc-400 font-mono">{testimonialForm.quote.length}</span>
                    </div>
                    <textarea
                      rows={3}
                      value={testimonialForm.quote}
                      onChange={(e) => setTestimonialForm({ ...testimonialForm, quote: e.target.value })}
                      placeholder="Type testimonial feedback here..."
                      className="w-full p-3 border border-zinc-300 rounded-[4px] text-xs bg-white focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-800 mb-1">Display Order</label>
                    <input
                      type="number"
                      value={testimonialForm.order}
                      onChange={(e) => setTestimonialForm({ ...testimonialForm, order: Number(e.target.value) })}
                      className="w-full px-3 py-1.5 border border-zinc-300 rounded-[4px] text-xs bg-white"
                    />
                  </div>
                </>
              )}

              {/* PURCHASE STEP FORM */}
              {modalType === "purchase" && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-800 mb-1">Step Label</label>
                      <input
                        type="text"
                        value={purchaseStepForm.step}
                        onChange={(e) => setPurchaseStepForm({ ...purchaseStepForm, step: e.target.value })}
                        placeholder="Step 1"
                        className="w-full px-3 py-1.5 border border-zinc-300 rounded-[4px] text-xs bg-white font-bold"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-800 mb-1">Display Order</label>
                      <input
                        type="number"
                        value={purchaseStepForm.order}
                        onChange={(e) => setPurchaseStepForm({ ...purchaseStepForm, order: Number(e.target.value) })}
                        className="w-full px-3 py-1.5 border border-zinc-300 rounded-[4px] text-xs bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-800 mb-1">Title</label>
                    <input
                      type="text"
                      value={purchaseStepForm.title}
                      onChange={(e) => setPurchaseStepForm({ ...purchaseStepForm, title: e.target.value })}
                      placeholder="e.g. Select Test Series"
                      className="w-full px-3 py-2 border border-zinc-300 rounded-[4px] text-xs bg-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-800 mb-1">Description</label>
                    <textarea
                      rows={3}
                      value={purchaseStepForm.desc}
                      onChange={(e) => setPurchaseStepForm({ ...purchaseStepForm, desc: e.target.value })}
                      placeholder="Type description..."
                      className="w-full p-3 border border-zinc-300 rounded-[4px] text-xs bg-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-800 mb-1">
                      Screenshot Image URL (9:16 Portrait)
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={purchaseStepForm.imageUrl}
                        onChange={(e) => setPurchaseStepForm({ ...purchaseStepForm, imageUrl: e.target.value })}
                        placeholder="https://example.com/screenshot.jpg or /images/..."
                        className="flex-1 px-3 py-1.5 border border-zinc-300 rounded-[4px] text-xs bg-white font-mono"
                      />
                      {purchaseStepForm.imageUrl && (
                        <button
                          type="button"
                          onClick={() => setPurchaseStepForm({ ...purchaseStepForm, imageUrl: "" })}
                          className="px-2.5 py-1 text-xs text-red-600 hover:bg-red-50 border border-red-200 rounded-[4px] cursor-pointer font-medium"
                        >
                          Clear
                        </button>
                      )}
                    </div>
                    <p className="text-[11px] text-zinc-400 mt-1">
                      Add a direct image URL or path for the mobile screenshot.
                    </p>

                    {/* Live Thumbnail Preview */}
                    {purchaseStepForm.imageUrl && (
                      <div className="mt-2.5 p-2.5 border border-zinc-200 rounded-[4px] bg-zinc-50 flex items-center gap-3">
                        <div className="w-12 h-20 rounded border border-zinc-300 bg-white overflow-hidden shrink-0 shadow-2xs">
                          <img
                            src={purchaseStepForm.imageUrl}
                            alt="Preview"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = "none";
                            }}
                          />
                        </div>
                        <div className="text-[11px] text-zinc-600 min-w-0">
                          <p className="font-semibold text-zinc-800">Screenshot Preview (9:16)</p>
                          <p className="text-[10px] text-zinc-400 truncate font-mono mt-0.5">
                            {purchaseStepForm.imageUrl}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-800 mb-1">Fallback Placeholder Text</label>
                    <input
                      type="text"
                      value={purchaseStepForm.skeletonText}
                      onChange={(e) => setPurchaseStepForm({ ...purchaseStepForm, skeletonText: e.target.value })}
                      placeholder="9:16 Screenshot 1"
                      className="w-full px-3 py-1.5 border border-zinc-300 rounded-[4px] text-xs bg-white"
                    />
                    <p className="text-[11px] text-zinc-400 mt-1">Shown if no screenshot image is added.</p>
                  </div>
                </>
              )}

              {/* PAIN POINT FORM */}
              {modalType === "painPoint" && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-800 mb-1">Problem Statement</label>
                    <textarea
                      rows={3}
                      value={painPointForm.problem}
                      onChange={(e) => setPainPointForm({ ...painPointForm, problem: e.target.value })}
                      placeholder="Enter problem statement..."
                      className="w-full p-3 border border-zinc-300 rounded-[4px] text-xs bg-white font-semibold"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-800 mb-1">Solution Statement</label>
                    <textarea
                      rows={3}
                      value={painPointForm.solution}
                      onChange={(e) => setPainPointForm({ ...painPointForm, solution: e.target.value })}
                      placeholder="Enter solution statement..."
                      className="w-full p-3 border border-zinc-300 rounded-[4px] text-xs bg-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-800 mb-1">Display Order</label>
                    <input
                      type="number"
                      value={painPointForm.order}
                      onChange={(e) => setPainPointForm({ ...painPointForm, order: Number(e.target.value) })}
                      className="w-full px-3 py-1.5 border border-zinc-300 rounded-[4px] text-xs bg-white"
                    />
                  </div>
                </>
              )}

              {/* SYLLABUS FORM */}
              {modalType === "syllabus" && (
                <>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-800 mb-1">Num</label>
                      <input
                        type="text"
                        value={syllabusForm.num}
                        onChange={(e) => setSyllabusForm({ ...syllabusForm, num: e.target.value })}
                        placeholder="1"
                        className="w-full px-3 py-1.5 border border-zinc-300 rounded-[4px] text-xs bg-white font-bold"
                        required
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-xs font-semibold text-zinc-800 mb-1">Subject Title</label>
                      <input
                        type="text"
                        value={syllabusForm.title}
                        onChange={(e) => setSyllabusForm({ ...syllabusForm, title: e.target.value })}
                        placeholder="e.g. History"
                        className="w-full px-3 py-1.5 border border-zinc-300 rounded-[4px] text-xs bg-white font-bold"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-800 mb-1">Subtitle</label>
                    <input
                      type="text"
                      value={syllabusForm.subtitle}
                      onChange={(e) => setSyllabusForm({ ...syllabusForm, subtitle: e.target.value })}
                      placeholder="e.g. Modern India & Maharashtra"
                      className="w-full px-3 py-1.5 border border-zinc-300 rounded-[4px] text-xs bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-800 mb-1">Official Syllabus Details (Content)</label>
                    <textarea
                      rows={3}
                      value={syllabusForm.content}
                      onChange={(e) => setSyllabusForm({ ...syllabusForm, content: e.target.value })}
                      placeholder="Enter official syllabus details..."
                      className="w-full p-3 border border-zinc-300 rounded-[4px] text-xs bg-white font-medium"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-800 mb-1">
                      Key Topics (Chips)
                    </label>
                    <div className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={newTopicInput}
                        onChange={(e) => setNewTopicInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            if (newTopicInput.trim()) {
                              setSyllabusForm({
                                ...syllabusForm,
                                topics: [...syllabusForm.topics, newTopicInput.trim()],
                              });
                              setNewTopicInput("");
                            }
                          }
                        }}
                        placeholder="Type topic and press Enter or click + Add"
                        className="flex-1 px-3 py-1.5 border border-zinc-300 rounded-[4px] text-xs bg-white"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (newTopicInput.trim()) {
                            setSyllabusForm({
                              ...syllabusForm,
                              topics: [...syllabusForm.topics, newTopicInput.trim()],
                            });
                            setNewTopicInput("");
                          }
                        }}
                        className="px-3 py-1.5 bg-black text-white text-xs font-bold rounded-[4px] hover:bg-zinc-800 cursor-pointer"
                      >
                        + Add
                      </button>
                    </div>

                    {/* Chips Display */}
                    <div className="flex flex-wrap gap-1.5 p-2 bg-zinc-50 border border-zinc-200 rounded-[4px] min-h-[44px]">
                      {syllabusForm.topics.length === 0 ? (
                        <span className="text-zinc-400 text-xs italic">No topics added yet</span>
                      ) : (
                        syllabusForm.topics.map((top, tIdx) => (
                          <span
                            key={tIdx}
                            className="inline-flex items-center gap-1 px-2 py-0.5 bg-white border border-zinc-300 rounded text-xs font-semibold text-zinc-800 shadow-2xs"
                          >
                            <span>✓ {top}</span>
                            <button
                              type="button"
                              onClick={() => {
                                setSyllabusForm({
                                  ...syllabusForm,
                                  topics: syllabusForm.topics.filter((_, idx) => idx !== tIdx),
                                });
                              }}
                              className="text-zinc-400 hover:text-red-600 font-bold ml-1 cursor-pointer"
                            >
                              ×
                            </button>
                          </span>
                        ))
                      )}
                    </div>
                  </div>
                </>
              )}

              {/* Bottom Create Button (Matches Image 1 & 3) */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 bg-black hover:bg-zinc-800 text-white font-bold text-xs rounded-[4px] shadow-sm cursor-pointer transition-all"
                >
                  {editingIndex !== null ? "Update" : "Create"}
                </button>
              </div>

            </form>

          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

    </div>
  );
}

function SidebarNavItem({
  active,
  onClick,
  icon: Icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: any;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-[4px] text-xs font-semibold transition-all cursor-pointer text-left ${
        active
          ? "bg-black text-white shadow-xs"
          : "text-zinc-600 hover:text-black hover:bg-zinc-100/80"
      }`}
    >
      <Icon className="w-4 h-4 shrink-0" />
      <span>{label}</span>
    </button>
  );
}
