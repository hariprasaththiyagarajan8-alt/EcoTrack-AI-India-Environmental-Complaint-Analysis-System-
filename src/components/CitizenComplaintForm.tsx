import React, { useState, useEffect } from 'react';
import {
  ENVIRONMENTAL_CATEGORIES,
  EnvironmentalCategory,
  ExtractedLocationInfo,
} from '../types/environmental';
import { INDIAN_STATES_AND_UTS, WELL_KNOWN_INDIAN_HOTSPOTS } from '../data/indiaGeo';
import { Send, CheckCircle2, AlertCircle, Sparkles, MapPin, Calendar, Copy, ArrowRight, RefreshCw, Info } from 'lucide-react';

interface CitizenComplaintFormProps {
  onSubmissionSuccess: (refId: string) => void;
  onTrackRedirect: (refId: string) => void;
}

export const CitizenComplaintForm: React.FC<CitizenComplaintFormProps> = ({
  onSubmissionSuccess,
  onTrackRedirect,
}) => {
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('auto');
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [customDistrict, setCustomDistrict] = useState(false);
  const [cityTownVillage, setCityTownVillage] = useState('');
  const [locality, setLocality] = useState('');
  const [incidentDate, setIncidentDate] = useState('');

  // Real-time NLP preview state
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [nlpPreview, setNlpPreview] = useState<{
    predicted_category: string;
    confidence: number;
    keywords: string[];
    locations: ExtractedLocationInfo;
  } | null>(null);

  // Form submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [copiedRef, setCopiedRef] = useState(false);

  // Available districts for the selected state
  const availableDistricts = React.useMemo(() => {
    if (!selectedState) return [];
    const found = INDIAN_STATES_AND_UTS.find(s => s.name === selectedState);
    return found ? found.districts : [];
  }, [selectedState]);

  // Handle live NLP analysis as the user types (debounced)
  useEffect(() => {
    if (description.trim().length < 15) {
      setNlpPreview(null);
      return;
    }

    const timer = setTimeout(async () => {
      setIsAnalyzing(true);
      try {
        const res = await fetch('/api/nlp/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: description }),
        });
        if (res.ok) {
          const data = await res.json();
          setNlpPreview(data);

          // Auto-fill state or district if detected by NLP and not already set by citizen
          if (!selectedState && data.locations.state) {
            setSelectedState(data.locations.state);
          }
          if (!selectedDistrict && data.locations.district) {
            setSelectedDistrict(data.locations.district);
          }
          if (!locality && data.locations.locality_or_landmark) {
            setLocality(data.locations.locality_or_landmark);
          }
        }
      } catch (err) {
        // Silently continue
      } finally {
        setIsAnalyzing(false);
      }
    }, 450);

    return () => clearTimeout(timer);
  }, [description]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (description.trim().length < 15) {
      setErrorMsg('Please provide a descriptive complaint text (minimum 15 characters).');
      return;
    }
    if (!selectedState) {
      setErrorMsg('Please select the Indian State or Union Territory.');
      return;
    }
    if (!selectedDistrict) {
      setErrorMsg('Please select or specify the District.');
      return;
    }
    if (!cityTownVillage.trim()) {
      setErrorMsg('Please specify the City, Town, or Village.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/complaints/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          description,
          category: selectedCategory,
          state: selectedState,
          district: selectedDistrict,
          city_town_village: cityTownVillage,
          locality: locality.trim() || undefined,
          incident_date: incidentDate || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit complaint.');
      }

      setSubmittedRef(data.reference_id);
      onSubmissionSuccess(data.reference_id);
    } catch (err: any) {
      setErrorMsg(err.message || 'An unexpected error occurred during submission.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = () => {
    if (submittedRef) {
      navigator.clipboard.writeText(submittedRef);
      setCopiedRef(true);
      setTimeout(() => setCopiedRef(false), 2000);
    }
  };

  const resetForm = () => {
    setDescription('');
    setSelectedCategory('auto');
    setSelectedState('');
    setSelectedDistrict('');
    setCityTownVillage('');
    setLocality('');
    setIncidentDate('');
    setNlpPreview(null);
    setSubmittedRef(null);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      {/* Title & Introduction */}
      <div className="mb-8 border-b border-slate-200 pb-5">
        <div className="flex items-center gap-2 text-xs font-medium text-emerald-800 mb-2">
          <span>Official Public Grievance Portal</span>
          <span aria-hidden="true">·</span>
          <span>India Environmental Monitoring</span>
          <span aria-hidden="true">·</span>
          <span>National NLP Classification Engine</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
          Lodge an Environmental Complaint
        </h1>
        <p className="mt-2 text-sm text-slate-600 max-w-3xl leading-relaxed">
          Report environmental non-compliance, water contamination, industrial smoke, open waste burning, 
          groundwater pollution, or biodiversity harm anywhere in India. Our NLP pipeline analyzes complaints 
          written in natural language and routes them to environmental authorities for review.
        </p>
      </div>

      {submittedRef ? (
        /* Submission Success Receipt */
        <div className="bg-white border border-emerald-300 rounded-xl p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-3 text-emerald-700 mb-4">
            <CheckCircle2 className="w-8 h-8" />
            <div>
              <h2 className="text-xl font-bold text-slate-900">Environmental Grievance Registered</h2>
              <p className="text-xs text-slate-500">Your complaint has been logged and assigned for official review.</p>
            </div>
          </div>

          <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-lg my-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-emerald-900">
                Unique Complaint Reference ID
              </span>
              <div className="text-2xl font-mono font-bold text-emerald-800 tracking-tight mt-0.5">
                {submittedRef}
              </div>
              <span className="text-xs text-slate-600">
                Retain this reference ID for tracking resolution milestones.
              </span>
            </div>
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold bg-white border border-emerald-300 text-emerald-800 rounded-lg hover:bg-emerald-50 transition-colors shrink-0"
            >
              <Copy className="w-4 h-4" />
              <span>{copiedRef ? 'Copied Reference!' : 'Copy Reference ID'}</span>
            </button>
          </div>

          {nlpPreview && (
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg mb-6">
              <span className="text-xs font-semibold text-slate-700 block mb-2">
                Automated NLP Classification Summary
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-600">
                <div>
                  <span className="text-slate-400 block">Classified Category:</span>
                  <span className="font-semibold text-slate-900">{nlpPreview.predicted_category}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Model Confidence:</span>
                  <span className="font-mono font-semibold text-emerald-700">
                    {(nlpPreview.confidence * 100).toFixed(0)}%
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block">Identified Geographic Zone:</span>
                  <span className="font-medium text-slate-800">
                    {selectedDistrict}, {selectedState}
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => onTrackRedirect(submittedRef)}
              className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-sm transition-colors"
            >
              <span>Track Complaint Status Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={resetForm}
              className="flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Submit Another Complaint</span>
            </button>
          </div>
        </div>
      ) : (
        /* Submission Form */
        <form onSubmit={handleSubmit} className="space-y-6">
          {errorMsg && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3 text-red-700 text-sm">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold block">Submission Error</span>
                <span>{errorMsg}</span>
              </div>
            </div>
          )}

          {/* Section 1: Complaint Text */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="complaint-desc" className="text-sm font-semibold text-slate-900">
                1. Complaint Description in Natural Language <span className="text-red-500">*</span>
              </label>
              <span className="text-xs text-slate-400 tabular-nums">
                {description.length} characters
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-3">
              Describe the environmental issue in detail. You may include the nature of pollution, smoke odors, 
              water color, factory names, nearby lakes, drains, roads, or noticeable environmental damage.
            </p>
            <textarea
              id="complaint-desc"
              rows={5}
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="e.g., Heavy toxic white foam billowing from Bellandur Lake outlet near Yemlur weir into the road, causing severe chemical stench and skin irritation. Domestic sewage and industrial wash water entering untreated..."
              className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white text-slate-900 placeholder:text-slate-400"
              required
            />

            {/* Real-time NLP Feedback Pill / Card */}
            {isAnalyzing && (
              <div className="mt-3 flex items-center gap-2 text-xs text-emerald-700 animate-pulse">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Analyzing text via NLP Vectorizer & Indian Geographic NER...</span>
              </div>
            )}

            {nlpPreview && !isAnalyzing && (
              <div className="mt-4 p-3.5 bg-emerald-50/50 border border-emerald-200 rounded-lg">
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Real-Time NLP Analysis Preview</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-500">Predicted Category: </span>
                    <span className="font-semibold text-slate-900">{nlpPreview.predicted_category}</span>
                    <span className="text-slate-400 ml-1.5 font-mono">
                      ({(nlpPreview.confidence * 100).toFixed(0)}% confidence)
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500">Extracted Keywords: </span>
                    <span className="font-mono text-slate-700">
                      {nlpPreview.keywords.length > 0 ? nlpPreview.keywords.join(', ') : 'Extracting...'}
                    </span>
                  </div>
                </div>

                {nlpPreview.locations.raw_mentions.length > 0 && (
                  <div className="mt-2 text-xs text-slate-600 border-t border-emerald-100 pt-2">
                    <span className="text-slate-500">NLP-Detected Geographic Mentions: </span>
                    <span className="font-medium text-emerald-900">
                      {nlpPreview.locations.raw_mentions.join(' · ')}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Section 2: Environmental Issue Category */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="category-select" className="text-sm font-semibold text-slate-900">
                2. Environmental Category (Optional)
              </label>
              <span className="text-xs text-emerald-700 font-medium">
                NLP Auto-Classification Enabled
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-3">
              Leave on "Auto-Detect using NLP" to allow our trained machine learning model to classify 
              the problem, or specify a category manually if you prefer.
            </p>
            <select
              id="category-select"
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 text-slate-900"
            >
              <option value="auto">⚡ Auto-Detect via Machine Learning (Recommended)</option>
              {ENVIRONMENTAL_CATEGORIES.map(cat => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Section 3: Indian Geographic Location */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-xs">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4 text-emerald-700" />
              <h2 className="text-sm font-semibold text-slate-900">
                3. Incident Location within India <span className="text-red-500">*</span>
              </h2>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Select your State or Union Territory and District. You can enter specific local towns or landmarks.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              {/* State / UT */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Indian State or Union Territory <span className="text-red-500">*</span>
                </label>
                <select
                  value={selectedState}
                  onChange={e => {
                    setSelectedState(e.target.value);
                    setSelectedDistrict('');
                  }}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-600 text-slate-900"
                  required
                >
                  <option value="">-- Select State or UT --</option>
                  {INDIAN_STATES_AND_UTS.map(st => (
                    <option key={st.name} value={st.name}>
                      {st.name} ({st.type})
                    </option>
                  ))}
                </select>
              </div>

              {/* District */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-slate-700">
                    District <span className="text-red-500">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setCustomDistrict(!customDistrict)}
                    className="text-[11px] text-emerald-700 hover:underline"
                  >
                    {customDistrict ? 'Choose from list' : 'Enter manually'}
                  </button>
                </div>

                {customDistrict || availableDistricts.length === 0 ? (
                  <input
                    type="text"
                    value={selectedDistrict}
                    onChange={e => setSelectedDistrict(e.target.value)}
                    placeholder="Enter district name"
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-600 text-slate-900"
                    required
                  />
                ) : (
                  <select
                    value={selectedDistrict}
                    onChange={e => setSelectedDistrict(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-600 text-slate-900"
                    required
                    disabled={!selectedState}
                  >
                    <option value="">-- Select District --</option>
                    {availableDistricts.map(d => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* City / Town / Village */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  City, Town, or Village <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={cityTownVillage}
                  onChange={e => setCityTownVillage(e.target.value)}
                  placeholder="e.g., Bengaluru, Kanpur, Sunam"
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-600 text-slate-900"
                  required
                />
              </div>

              {/* Locality or Landmark */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Locality, Ward, or Environmental Landmark (Optional)
                </label>
                <input
                  type="text"
                  value={locality}
                  onChange={e => setLocality(e.target.value)}
                  placeholder="e.g., Near Bellandur Lake, Outer Ring Road, GIDC Phase 2"
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-600 text-slate-900"
                />
              </div>
            </div>

            {/* Quick Hotspot suggestions */}
            <div className="mt-3 text-xs text-slate-500">
              <span className="font-medium text-slate-600">Common Hotspot Landmarks: </span>
              <div className="inline-flex flex-wrap gap-1.5 mt-1">
                {['Bellandur Lake', 'Yamuna River Ghat', 'Najafgarh Drain', 'Ghazipur Landfill', 'Ennore Creek', 'Anand Vihar'].map(spot => (
                  <button
                    key={spot}
                    type="button"
                    onClick={() => setLocality(spot)}
                    className="text-[11px] text-emerald-800 hover:text-emerald-950 underline mr-1.5 cursor-pointer"
                  >
                    {spot}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Section 4: Incident Date & Architecture Information */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-xs">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-emerald-700" />
              <label htmlFor="incident-date" className="text-sm font-semibold text-slate-900">
                4. Incident Date (Optional)
              </label>
            </div>
            <p className="text-xs text-slate-500 mb-3">
              If the pollution incident occurred on a specific date, record it here. If omitted, today's submission date is used.
            </p>
            <input
              id="incident-date"
              type="date"
              value={incidentDate}
              onChange={e => setIncidentDate(e.target.value)}
              className="px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-600 text-slate-900 max-w-xs"
            />

            <div className="mt-4 p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-start gap-2.5 text-xs text-slate-600">
              <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <span>
                <strong>Language Architecture Notice:</strong> Complaints currently accept English text. 
                The NLP feature pipeline is architected for modular integration of regional Indian language 
                tokenizers (Tamil, Hindi, Telugu, Kannada, Malayalam, and Bengali) in subsequent releases.
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-slate-400">
              Fields marked with <span className="text-red-500">*</span> are mandatory
            </span>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 disabled:bg-emerald-400 rounded-lg shadow-sm transition-colors whitespace-nowrap cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Processing NLP Classification...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Submit Environmental Complaint</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
