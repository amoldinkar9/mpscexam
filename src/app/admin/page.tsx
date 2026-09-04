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
  Sliders
} from "lucide-react";
import defaultSiteData from "@/data/siteContent.json";

type SiteContent = typeof defaultSiteData;

export default function AdminPage() {
  const [content, setContent] = useState<SiteContent>(defaultSiteData);
  const [activeSection, setActiveSection] = useState<string>("faqs");
  
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
    order: 1,
  });
  const [painPointForm, setPainPointForm] = useState({
    problem: "",
    solution: "",
    order: 1,
  });

  // Published toggle state map (simulated toggle per item)
  const [publishedMap, setPublishedMap] = useState<Record<string, boolean>>({});

  // Active subject for sample proof
  const [activeSubject, setActiveSubject] = useState<"gk" | "math" | "marathi" | "reasoning">("gk");

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
        setStatusMessage({ type: "success", text: "बदल यशस्वीरीत्या सेव्ह झाले! वेबसाईटवर थेट अपडेट झाले आहेत." });
      } else {
        setStatusMessage({ type: "error", text: data.error || "बदल सेव्ह करताना त्रुटी आली." });
      }
    } catch (err: any) {
      setStatusMessage({ type: "error", text: err.message || "सर्व्हरशी संपर्क होऊ शकला नाही." });
    } finally {
      setIsSaving(false);
    }
  };

  // Reset to original defaults
  const handleReset = async () => {
    if (!confirm("तुम्हाला खात्री आहे का की सर्व डेटा मूळ स्थितीत रिसेट करायचा आहे?")) return;
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
        setStatusMessage({ type: "info", text: "डेटा मूळ डीफॉल्ट स्थितीत पूर्ववत करण्यात आला." });
      }
    } catch (err: any) {
      setStatusMessage({ type: "error", text: err.message || "त्रुटी आली." });
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
        order: content.howToPurchase.length + 1,
      });
    } else if (type === "painPoint") {
      setPainPointForm({
        problem: "",
        solution: "",
        order: content.painPoints.length + 1,
      });
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
        order: index + 1,
      });
    } else if (type === "painPoint") {
      const item = content.painPoints[index];
      setPainPointForm({
        problem: item.problem,
        solution: item.solution,
        order: index + 1,
      });
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
        };
      } else {
        updated.push({
          step: purchaseStepForm.step,
          title: purchaseStepForm.title,
          desc: purchaseStepForm.desc,
          iconName: "ShoppingCart",
          color: "bg-zinc-100 text-black border-zinc-200",
          skeletonText: purchaseStepForm.skeletonText,
          imageUrl: "",
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
    }
    setModalType(null);
  };

  // Delete Handlers
  const handleDelete = (type: string, index: number) => {
    if (!confirm("ही नोंद नक्की काढून टाकायची आहे का?")) return;
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
            <p className="text-xs text-zinc-500 font-medium">कंटेंट ॲडमिन पॅनेलसाठी पासकोड प्रविष्ट करा.</p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (passcode === "admin123") {
                setIsAuthenticated(true);
              } else {
                alert("अवैध पासकोड! (डीफॉल्ट पासकोड: admin123)");
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
              लॉगिन करा
            </button>
          </form>
          <div className="pt-2 border-t border-zinc-100">
            <p className="text-[11px] text-zinc-400 font-mono">
              डीफॉल्ट पासकोड: <span className="text-black font-semibold">admin123</span>
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
              active={activeSection === "hero"}
              onClick={() => setActiveSection("hero")}
              icon={ImageIcon}
              label="Hero Image"
            />
            <SidebarNavItem
              active={activeSection === "testimonials"}
              onClick={() => setActiveSection("testimonials")}
              icon={MessageSquare}
              label="Testimonials"
            />
            <SidebarNavItem
              active={activeSection === "purchase"}
              onClick={() => setActiveSection("purchase")}
              icon={ShoppingCart}
              label="How to Purchase"
            />
            <SidebarNavItem
              active={activeSection === "painPoints"}
              onClick={() => setActiveSection("painPoints")}
              icon={AlertTriangle}
              label="अभ्यास अडचणी"
            />
            <SidebarNavItem
              active={activeSection === "cutoff"}
              onClick={() => setActiveSection("cutoff")}
              icon={Scale}
              label="कटऑफचा फरक"
            />
            <SidebarNavItem
              active={activeSection === "sampleProof"}
              onClick={() => setActiveSection("sampleProof")}
              icon={FileText}
              label="प्रश्नांची गुणवत्ता"
            />
            <SidebarNavItem
              active={activeSection === "faqs"}
              onClick={() => setActiveSection("faqs")}
              icon={HelpCircle}
              label="FAQ's"
            />
            <SidebarNavItem
              active={activeSection === "finalCta"}
              onClick={() => setActiveSection("finalCta")}
              icon={Tag}
              label="Final CTA & Pricing"
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
              <span>रिसेट</span>
            </button>
            <button
              onClick={() => handleSaveAll()}
              disabled={isSaving}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold text-white bg-black hover:bg-zinc-800 rounded-[4px] shadow-xs transition-all cursor-pointer"
            >
              {isSaving ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
              <span>{isSaving ? "सेव्ह करत आहे..." : "सर्व बदल सेव्ह करा"}</span>
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
                className="text-[11px] underline opacity-80 hover:opacity-100 cursor-pointer"
              >
                बंद करा
              </button>
            </div>
          </div>
        )}

        {/* Section View Container */}
        <div className="p-8 space-y-6 max-w-6xl w-full">

          {/* SECTION: FAQ's (Matches Image 1 & 5) */}
          {activeSection === "faqs" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-black tracking-tight">FAQ&apos;s</h2>
                  <p className="text-xs text-zinc-400 mt-0.5">{content.faqs.length} entries</p>
                </div>
                <button
                  onClick={() => handleOpenAdd("faq")}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-black hover:bg-zinc-800 text-white text-xs font-bold rounded-[4px] shadow-xs cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Add New</span>
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
                      <tr key={idx} className="hover:bg-zinc-50/60 transition-colors">
                        <td className="p-3 text-center text-zinc-400 cursor-grab">
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
                  <span>+ Add New</span>
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
                      <tr key={idx} className="hover:bg-zinc-50/60 transition-colors">
                        <td className="p-3 text-center text-zinc-400 cursor-grab">
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
                  <h2 className="text-xl font-bold text-black tracking-tight">How to Purchase</h2>
                  <p className="text-xs text-zinc-400 mt-0.5">{content.howToPurchase.length} entries</p>
                </div>
                <button
                  onClick={() => handleOpenAdd("purchase")}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-black hover:bg-zinc-800 text-white text-xs font-bold rounded-[4px] shadow-xs cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Add New</span>
                </button>
              </div>

              <div className="border border-zinc-200 rounded-[4px] bg-white overflow-hidden shadow-xs">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-zinc-50 text-zinc-700 font-semibold border-b border-zinc-200">
                    <tr>
                      <th className="p-3 w-12 text-center">Drag</th>
                      <th className="p-3 w-24">Step</th>
                      <th className="p-3 w-48">Title</th>
                      <th className="p-3">Description</th>
                      <th className="p-3 w-24 text-center">Published</th>
                      <th className="p-3 w-20 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200">
                    {content.howToPurchase.map((step, idx) => (
                      <tr key={idx} className="hover:bg-zinc-50/60 transition-colors">
                        <td className="p-3 text-center text-zinc-400 cursor-grab">
                          <GripVertical className="w-4 h-4 mx-auto" />
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
                  <h2 className="text-xl font-bold text-black tracking-tight">अभ्यास करताना या अडचणी येतात का?</h2>
                  <p className="text-xs text-zinc-400 mt-0.5">{content.painPoints.length} entries</p>
                </div>
                <button
                  onClick={() => handleOpenAdd("painPoint")}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-black hover:bg-zinc-800 text-white text-xs font-bold rounded-[4px] shadow-xs cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Add New</span>
                </button>
              </div>

              <div className="border border-zinc-200 rounded-[4px] bg-white overflow-hidden shadow-xs">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-zinc-50 text-zinc-700 font-semibold border-b border-zinc-200">
                    <tr>
                      <th className="p-3 w-12 text-center">Drag</th>
                      <th className="p-3 w-2/5">अडचण (Problem)</th>
                      <th className="p-3">आमचे सोल्यूशन (Solution)</th>
                      <th className="p-3 w-24 text-center">Published</th>
                      <th className="p-3 w-20 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200">
                    {content.painPoints.map((pt, idx) => (
                      <tr key={idx} className="hover:bg-zinc-50/60 transition-colors">
                        <td className="p-3 text-center text-zinc-400 cursor-grab">
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
                      {isSaving ? "Saving..." : "Save Hero Settings"}
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

          {/* SECTION: कटऑफचा खरा फरक */}
          {activeSection === "cutoff" && (
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-bold text-black tracking-tight">कटऑफचा खरा फरक</h2>
                <p className="text-xs text-zinc-400 mt-0.5">केवळ पुस्तके वाचणारे vs 25 टेस्ट्स सोडवणारे विद्यार्थी</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-zinc-200 rounded-[4px] bg-white p-5 space-y-3 shadow-xs">
                  <div className="flex items-center justify-between border-b border-zinc-100 pb-2">
                    <span className="font-bold text-xs text-zinc-800">केवळ पुस्तके वाचणारे विद्यार्थी</span>
                    <button
                      onClick={() => {
                        const updated = [...content.cutoffContrast.bookReaders, "नवीन नकारात्मक मुद्दा"];
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
                    <span className="font-bold text-xs text-zinc-800">ही 25 टेस्ट्स सोडवणारे विद्यार्थी</span>
                    <button
                      onClick={() => {
                        const updated = [...content.cutoffContrast.testSeries, "नवीन सकारात्मक मुद्दा"];
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

          {/* SECTION: प्रश्नांची नमुना गुणवत्ता */}
          {activeSection === "sampleProof" && (
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-bold text-black tracking-tight">प्रश्नांची व स्पष्टीकरणांची नमुना गुणवत्ता</h2>
                <p className="text-xs text-zinc-400 mt-0.5">विषयानुसार प्रश्न, 4 पर्याय व सविस्तर मराठी स्पष्टीकरण</p>
              </div>

              {/* Subject Tabs */}
              <div className="flex gap-2 border-b border-zinc-200 pb-2">
                {(
                  [
                    { id: "gk", label: "सामान्य ज्ञान (GS)" },
                    { id: "math", label: "अंकगणित (Maths)" },
                    { id: "marathi", label: "मराठी व्याकरण" },
                    { id: "reasoning", label: "बुद्धिमत्ता चाचणी" },
                  ] as const
                ).map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() => setActiveSubject(sub.id)}
                    className={`px-3.5 py-1.5 text-xs font-bold rounded-[4px] transition-all cursor-pointer ${
                      activeSubject === sub.id
                        ? "bg-black text-white"
                        : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                    }`}
                  >
                    {sub.label}
                  </button>
                ))}
              </div>

              {/* Form for Active Subject */}
              {(() => {
                const current = content.sampleProof[activeSubject];
                return (
                  <div className="border border-zinc-200 rounded-[4px] bg-white p-6 shadow-xs space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-zinc-700 mb-1">Subject Name</label>
                        <input
                          type="text"
                          value={current.subjectName}
                          onChange={(e) => {
                            const updated = { ...content.sampleProof };
                            updated[activeSubject].subjectName = e.target.value;
                            setContent({ ...content, sampleProof: updated });
                          }}
                          className="w-full px-3 py-1.5 border border-zinc-300 rounded-[4px] text-xs font-bold bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-zinc-700 mb-1">Badge Tag</label>
                        <input
                          type="text"
                          value={current.tag}
                          onChange={(e) => {
                            const updated = { ...content.sampleProof };
                            updated[activeSubject].tag = e.target.value;
                            setContent({ ...content, sampleProof: updated });
                          }}
                          className="w-full px-3 py-1.5 border border-zinc-300 rounded-[4px] text-xs bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 mb-1">Question Text</label>
                      <textarea
                        rows={2}
                        value={current.question}
                        onChange={(e) => {
                          const updated = { ...content.sampleProof };
                          updated[activeSubject].question = e.target.value;
                          setContent({ ...content, sampleProof: updated });
                        }}
                        className="w-full px-3 py-2 border border-zinc-300 rounded-[4px] text-xs font-medium bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
                        4 Options (Select correct radio answer)
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {current.options.map((opt, optIdx) => (
                          <div
                            key={optIdx}
                            className={`p-2.5 border rounded-[4px] flex items-center gap-2 ${
                              current.correct === optIdx
                                ? "border-black bg-zinc-50 font-bold"
                                : "border-zinc-200 bg-white"
                            }`}
                          >
                            <input
                              type="radio"
                              name="proofCorrect"
                              checked={current.correct === optIdx}
                              onChange={() => {
                                const updated = { ...content.sampleProof };
                                updated[activeSubject].correct = optIdx;
                                setContent({ ...content, sampleProof: updated });
                              }}
                              className="accent-black cursor-pointer"
                            />
                            <span className="text-[11px] text-zinc-500 font-bold">#{optIdx + 1}</span>
                            <input
                              type="text"
                              value={opt}
                              onChange={(e) => {
                                const updated = { ...content.sampleProof };
                                updated[activeSubject].options[optIdx] = e.target.value;
                                setContent({ ...content, sampleProof: updated });
                              }}
                              className="flex-1 bg-transparent text-xs outline-none"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 mb-1">Detailed Explanation</label>
                      <textarea
                        rows={3}
                        value={current.explanation}
                        onChange={(e) => {
                          const updated = { ...content.sampleProof };
                          updated[activeSubject].explanation = e.target.value;
                          setContent({ ...content, sampleProof: updated });
                        }}
                        className="w-full px-3 py-2 border border-zinc-300 rounded-[4px] text-xs bg-white"
                      />
                    </div>

                    <button
                      onClick={() => handleSaveAll()}
                      disabled={isSaving}
                      className="px-5 py-2 bg-black hover:bg-zinc-800 text-white text-xs font-bold rounded-[4px] shadow-xs cursor-pointer"
                    >
                      Save Question
                    </button>
                  </div>
                );
              })()}
            </div>
          )}

          {/* SECTION: Final CTA & Pricing */}
          {activeSection === "finalCta" && (
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-bold text-black tracking-tight">Final CTA & Pricing</h2>
                <p className="text-xs text-zinc-400 mt-0.5">किंमत, सवलत, सीट्स स्लॉट्स आणि समाविष्ट घटक</p>
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
                  Save Pricing & CTA
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
          <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-[6px] shadow-2xl border border-zinc-200 w-full max-w-lg z-50 p-6 max-h-[90vh] overflow-y-auto outline-none animate-in zoom-in-95 duration-150">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
              <Dialog.Title className="text-sm font-bold text-black">
                {editingIndex !== null ? "Edit" : "New"}{" "}
                {modalType === "faq"
                  ? "FAQ's"
                  : modalType === "testimonial"
                  ? "Testimonials"
                  : modalType === "purchase"
                  ? "Purchase Step"
                  : "अडचण व सोल्यूशन"}
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
                      placeholder="उदा. ही टेस्ट सिरीज कोणासाठी उपयुक्त आहे?"
                      className="w-full px-3.5 py-2 border border-zinc-300 rounded-[4px] text-xs bg-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all"
                      required
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-semibold text-zinc-800">Answer</label>
                      <span className="text-[10px] text-zinc-400 font-mono">{faqForm.a.length}</span>
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
                        <span className="text-[11px] px-1 text-zinc-500">Normal ▾</span>
                        <span className="w-px h-4 bg-zinc-300 mx-0.5" />
                        <span className="text-[11px] px-1 text-zinc-500">Default (Black) ▾</span>
                        <span className="text-[11px] px-1 text-zinc-500">None (Transparent) ▾</span>
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
                        placeholder="सविस्तर उत्तर येथे टाईप करा..."
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
                      placeholder="उदा. अमोल शिंदे"
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
                        placeholder="अं"
                        className="w-full px-3 py-1.5 border border-zinc-300 rounded-[4px] text-xs bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-800 mb-1">Location</label>
                      <input
                        type="text"
                        value={testimonialForm.location}
                        onChange={(e) => setTestimonialForm({ ...testimonialForm, location: e.target.value })}
                        placeholder="पुणे"
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
                      placeholder="उदा. कटऑफ पार — 64.5 गुण"
                      className="w-full px-3.5 py-2 border border-zinc-300 rounded-[4px] text-xs bg-white"
                      required
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-semibold text-zinc-800">Quote</label>
                      <span className="text-[10px] text-zinc-400 font-mono">{testimonialForm.quote.length}</span>
                    </div>
                    <textarea
                      rows={3}
                      value={testimonialForm.quote}
                      onChange={(e) => setTestimonialForm({ ...testimonialForm, quote: e.target.value })}
                      placeholder="विद्यार्थ्याचा अभिप्राय येथे लिहा..."
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
                        placeholder="स्टेप 1"
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
                      placeholder="उदा. टेस्ट सिरीज निवडा (Select Plan)"
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
                      placeholder="सविस्तर वर्णन लिहा..."
                      className="w-full p-3 border border-zinc-300 rounded-[4px] text-xs bg-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-800 mb-1">9:16 Skeleton / Image Text</label>
                    <input
                      type="text"
                      value={purchaseStepForm.skeletonText}
                      onChange={(e) => setPurchaseStepForm({ ...purchaseStepForm, skeletonText: e.target.value })}
                      placeholder="9:16 स्क्रीनशॉट 1"
                      className="w-full px-3 py-1.5 border border-zinc-300 rounded-[4px] text-xs bg-white"
                    />
                  </div>
                </>
              )}

              {/* PAIN POINT FORM */}
              {modalType === "painPoint" && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-800 mb-1">अडचण (Problem Statement)</label>
                    <textarea
                      rows={3}
                      value={painPointForm.problem}
                      onChange={(e) => setPainPointForm({ ...painPointForm, problem: e.target.value })}
                      placeholder="परीक्षेत वेळेचे नियोजन न झाल्यामुळे शेवटचे प्रश्न सुटतात का?"
                      className="w-full p-3 border border-zinc-300 rounded-[4px] text-xs bg-white font-semibold"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-800 mb-1">आमचे सोल्यूशन (Solution Statement)</label>
                    <textarea
                      rows={3}
                      value={painPointForm.solution}
                      onChange={(e) => setPainPointForm({ ...painPointForm, solution: e.target.value })}
                      placeholder="आमच्या अचूक टाइमर सिम्युलेटरद्वारे 15 वेळा वेगाचा सराव करा..."
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
