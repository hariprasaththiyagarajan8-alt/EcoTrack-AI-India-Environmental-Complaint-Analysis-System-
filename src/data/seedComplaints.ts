import { EnvironmentalComplaint, EnvironmentalCategory } from '../types/environmental';
import { TrainingSample } from '../nlp/nlpEngine';

export const INITIAL_COMPLAINT_DATASET: EnvironmentalComplaint[] = [
  // 1. Air Pollution
  {
    id: 'ECO-IN-2026-1001',
    description: 'Extreme vehicular black smoke and toxic smog choking commuters on Outer Ring Road near Anand Vihar ISBT. Heavy commercial diesel trucks without PUC certificates are idling constantly.',
    predicted_category: 'Air Pollution',
    human_reviewed_category: 'Air Pollution',
    prediction_confidence: 0.94,
    state: 'Delhi',
    district: 'East Delhi',
    city_town_village: 'Delhi',
    locality: 'Anand Vihar ISBT',
    incident_date: '2026-10-10',
    submission_date: '2026-10-10T09:15:00Z',
    status: 'In Progress',
    extracted_keywords: ['vehicular', 'smoke', 'smog', 'diesel', 'puc', 'trucks'],
    extracted_locations: {
      state: 'Delhi',
      district: 'East Delhi',
      locality_or_landmark: 'Anand Vihar',
      raw_mentions: ['Delhi', 'East Delhi', 'Anand Vihar']
    },
    notes: [
      {
        id: 'n-1',
        author: 'Er. R. Sharma',
        role: 'Nodal Environmental Officer',
        text: 'Forwarded to Delhi Traffic Police & DPCC for mobile emission check squad deployment.',
        created_at: '2026-10-10T11:30:00Z'
      }
    ],
    history: [
      { id: 'h-1', action: 'Complaint Submitted', actor: 'Citizen Portal', details: 'Initial filing recorded with reference ECO-IN-2026-1001', timestamp: '2026-10-10T09:15:00Z' },
      { id: 'h-2', action: 'NLP Categorization', actor: 'EcoTrack ML Engine', details: 'Assigned Air Pollution (confidence: 94%)', timestamp: '2026-10-10T09:15:05Z' },
      { id: 'h-3', action: 'Status Updated', actor: 'Er. R. Sharma', details: 'Status changed from Submitted to In Progress', timestamp: '2026-10-10T11:30:00Z' }
    ],
    is_synthetic_demonstration: true
  },
  {
    id: 'ECO-IN-2026-1002',
    description: 'Thick pungent chemical smoke drifting into residential colonies from unregulated small foundry furnaces in Sanand Industrial Area late at night.',
    predicted_category: 'Air Pollution',
    human_reviewed_category: null,
    prediction_confidence: 0.91,
    state: 'Gujarat',
    district: 'Ahmedabad',
    city_town_village: 'Sanand',
    locality: 'Sanand GIDC Phase 2',
    incident_date: '2026-10-11',
    submission_date: '2026-10-11T23:45:00Z',
    status: 'Under Review',
    extracted_keywords: ['chemical', 'smoke', 'furnaces', 'foundry', 'pungent'],
    extracted_locations: {
      state: 'Gujarat',
      district: 'Ahmedabad',
      locality_or_landmark: 'Sanand GIDC',
      raw_mentions: ['Gujarat', 'Ahmedabad', 'Sanand GIDC']
    },
    notes: [],
    history: [
      { id: 'h-4', action: 'Complaint Submitted', actor: 'Citizen Portal', details: 'Initial filing recorded', timestamp: '2026-10-11T23:45:00Z' }
    ],
    is_synthetic_demonstration: true
  },

  // 2. Water Pollution
  {
    id: 'ECO-IN-2026-1003',
    description: 'Dark foamy chemical effluent discharging directly into the Cooum River near Maduravoyal bridge. Water has turned pitch black with dead fish floating along the riverbanks.',
    predicted_category: 'Water Pollution',
    human_reviewed_category: 'Water Pollution',
    prediction_confidence: 0.96,
    state: 'Tamil Nadu',
    district: 'Chennai',
    city_town_village: 'Chennai',
    locality: 'Maduravoyal Cooum River Bank',
    incident_date: '2026-10-12',
    submission_date: '2026-10-12T08:20:00Z',
    status: 'In Progress',
    extracted_keywords: ['effluent', 'cooum', 'foamy', 'dead', 'fish', 'discharge'],
    extracted_locations: {
      state: 'Tamil Nadu',
      district: 'Chennai',
      locality_or_landmark: 'Cooum River',
      raw_mentions: ['Tamil Nadu', 'Chennai', 'Cooum River']
    },
    notes: [
      {
        id: 'n-2',
        author: 'S. Jayaraman',
        role: 'Environmental Engineer TNPCB',
        text: 'Water sample collection kit dispatched for BOD, COD, and heavy metal testing.',
        created_at: '2026-10-12T10:00:00Z'
      }
    ],
    history: [
      { id: 'h-5', action: 'Complaint Submitted', actor: 'Citizen Portal', details: 'Filing confirmed', timestamp: '2026-10-12T08:20:00Z' },
      { id: 'h-6', action: 'Status Updated', actor: 'S. Jayaraman', details: 'Moved to In Progress after field inspector assignment', timestamp: '2026-10-12T10:00:00Z' }
    ],
    is_synthetic_demonstration: true
  },

  // 3. Noise Pollution
  {
    id: 'ECO-IN-2026-1004',
    description: 'Deafening commercial sound systems and outdoor horn-type loudspeakers operating after 11:30 PM near residential apartment blocks in Koramangala 4th Block, exceeding 85 decibels.',
    predicted_category: 'Noise Pollution',
    human_reviewed_category: 'Noise Pollution',
    prediction_confidence: 0.97,
    state: 'Karnataka',
    district: 'Bengaluru Urban',
    city_town_village: 'Bengaluru',
    locality: 'Koramangala 4th Block',
    incident_date: '2026-10-13',
    submission_date: '2026-10-13T23:55:00Z',
    status: 'Resolved',
    extracted_keywords: ['loudspeakers', 'decibels', 'sound', 'noise', 'night'],
    extracted_locations: {
      state: 'Karnataka',
      district: 'Bengaluru Urban',
      locality_or_landmark: 'Koramangala',
      raw_mentions: ['Karnataka', 'Bengaluru Urban', 'Koramangala']
    },
    notes: [
      {
        id: 'n-3',
        author: 'K. Patel',
        role: 'Assistant Environmental Officer',
        text: 'Night squad inspected location. Sound system confiscated and notice issued under Noise Pollution (Regulation and Control) Rules 2000.',
        created_at: '2026-10-14T02:15:00Z'
      }
    ],
    history: [
      { id: 'h-7', action: 'Complaint Submitted', actor: 'Citizen Portal', details: 'Filing recorded', timestamp: '2026-10-13T23:55:00Z' },
      { id: 'h-8', action: 'Status Updated', actor: 'K. Patel', details: 'Marked as Resolved following enforcement action', timestamp: '2026-10-14T02:15:00Z' }
    ],
    is_synthetic_demonstration: true
  },

  // 4. Illegal Waste Dumping
  {
    id: 'ECO-IN-2026-1005',
    description: 'Repeated illegal dumping of municipal solid waste and building debris by unregistered tipper trucks along the dry lake bed margin near Singasandra lake road.',
    predicted_category: 'Illegal Waste Dumping',
    human_reviewed_category: 'Illegal Waste Dumping',
    prediction_confidence: 0.95,
    state: 'Karnataka',
    district: 'Bengaluru Urban',
    city_town_village: 'Bengaluru',
    locality: 'Singasandra Lake Marg',
    incident_date: '2026-10-14',
    submission_date: '2026-10-14T07:10:00Z',
    status: 'In Progress',
    extracted_keywords: ['dumping', 'debris', 'tipper', 'trucks', 'illegal', 'waste'],
    extracted_locations: {
      state: 'Karnataka',
      district: 'Bengaluru Urban',
      locality_or_landmark: 'Singasandra',
      raw_mentions: ['Karnataka', 'Bengaluru Urban', 'Singasandra']
    },
    notes: [],
    history: [
      { id: 'h-9', action: 'Complaint Submitted', actor: 'Citizen Portal', details: 'Filing recorded', timestamp: '2026-10-14T07:10:00Z' }
    ],
    is_synthetic_demonstration: true
  },

  // 5. Plastic Pollution
  {
    id: 'ECO-IN-2026-1006',
    description: 'Enormous piles of single-use plastic covers, polythene carry bags, and non-woven polypropylene sacks clogging storm water drains in Dadar market area.',
    predicted_category: 'Plastic Pollution',
    human_reviewed_category: 'Plastic Pollution',
    prediction_confidence: 0.93,
    state: 'Maharashtra',
    district: 'Mumbai City',
    city_town_village: 'Mumbai',
    locality: 'Dadar Flower Market',
    incident_date: '2026-10-13',
    submission_date: '2026-10-13T14:30:00Z',
    status: 'Under Review',
    extracted_keywords: ['plastic', 'polythene', 'single-use', 'sacks', 'clogging'],
    extracted_locations: {
      state: 'Maharashtra',
      district: 'Mumbai City',
      locality_or_landmark: 'Dadar',
      raw_mentions: ['Maharashtra', 'Mumbai City', 'Dadar']
    },
    notes: [],
    history: [
      { id: 'h-10', action: 'Complaint Submitted', actor: 'Citizen Portal', details: 'Filing registered', timestamp: '2026-10-13T14:30:00Z' }
    ],
    is_synthetic_demonstration: true
  },

  // 6. Sewage and Drainage Pollution
  {
    id: 'ECO-IN-2026-1007',
    description: 'Untreated domestic blackwater sewage overflowing from ruptured underground trunk pipeline into open storm gutters in Laxmi Nagar, creating unbearable stench and breeding flies.',
    predicted_category: 'Sewage and Drainage Pollution',
    human_reviewed_category: 'Sewage and Drainage Pollution',
    prediction_confidence: 0.96,
    state: 'Delhi',
    district: 'East Delhi',
    city_town_village: 'Delhi',
    locality: 'Laxmi Nagar Block C',
    incident_date: '2026-10-14',
    submission_date: '2026-10-14T11:00:00Z',
    status: 'In Progress',
    extracted_keywords: ['sewage', 'blackwater', 'stench', 'gutters', 'overflowing', 'pipeline'],
    extracted_locations: {
      state: 'Delhi',
      district: 'East Delhi',
      locality_or_landmark: 'Laxmi Nagar',
      raw_mentions: ['Delhi', 'East Delhi', 'Laxmi Nagar']
    },
    notes: [
      {
        id: 'n-4',
        author: 'V. Sundaram',
        role: 'Administrator',
        text: 'Notified Delhi Jal Board emergency repair cell.',
        created_at: '2026-10-14T12:00:00Z'
      }
    ],
    history: [
      { id: 'h-11', action: 'Complaint Submitted', actor: 'Citizen Portal', details: 'Filing registered', timestamp: '2026-10-14T11:00:00Z' }
    ],
    is_synthetic_demonstration: true
  },

  // 7. Industrial Pollution
  {
    id: 'ECO-IN-2026-1008',
    description: 'Chemical dye and textile processing factories in Pali Industrial Area discharging acidic red-colored effluents without treating through Common Effluent Treatment Plant (CETP).',
    predicted_category: 'Industrial Pollution',
    human_reviewed_category: 'Industrial Pollution',
    prediction_confidence: 0.95,
    state: 'Rajasthan',
    district: 'Pali',
    city_town_village: 'Pali',
    locality: 'Pali Industrial Area Phase 1',
    incident_date: '2026-10-12',
    submission_date: '2026-10-12T16:40:00Z',
    status: 'Under Review',
    extracted_keywords: ['effluents', 'textile', 'cetp', 'acidic', 'factories', 'dye'],
    extracted_locations: {
      state: 'Rajasthan',
      district: 'Pali',
      locality_or_landmark: 'Pali Industrial Area',
      raw_mentions: ['Rajasthan', 'Pali']
    },
    notes: [],
    history: [
      { id: 'h-12', action: 'Complaint Submitted', actor: 'Citizen Portal', details: 'Filing confirmed', timestamp: '2026-10-12T16:40:00Z' }
    ],
    is_synthetic_demonstration: true
  },

  // 8. River and Lake Pollution
  {
    id: 'ECO-IN-2026-1009',
    description: 'Massive white toxic foam billowing from Bellandur Lake outlet into the storm water weir near Yemlur, drifting across the roadway onto vehicles and pedestrians.',
    predicted_category: 'River and Lake Pollution',
    human_reviewed_category: 'River and Lake Pollution',
    prediction_confidence: 0.98,
    state: 'Karnataka',
    district: 'Bengaluru Urban',
    city_town_village: 'Bengaluru',
    locality: 'Bellandur Lake Yemlur Weir',
    incident_date: '2026-10-15',
    submission_date: '2026-10-15T08:10:00Z',
    status: 'In Progress',
    extracted_keywords: ['foam', 'bellandur', 'lake', 'toxic', 'weir', 'billowing'],
    extracted_locations: {
      state: 'Karnataka',
      district: 'Bengaluru Urban',
      locality_or_landmark: 'Bellandur Lake',
      raw_mentions: ['Karnataka', 'Bengaluru Urban', 'Bellandur Lake']
    },
    notes: [
      {
        id: 'n-5',
        author: 'Dr. A. Rao',
        role: 'Nodal Environmental Officer',
        text: 'Inspected weir aerators. High surfactant concentration detected from upstream untreated sewage inflow.',
        created_at: '2026-10-15T09:30:00Z'
      }
    ],
    history: [
      { id: 'h-13', action: 'Complaint Submitted', actor: 'Citizen Portal', details: 'High-priority complaint logged', timestamp: '2026-10-15T08:10:00Z' }
    ],
    is_synthetic_demonstration: true
  },

  // 9. Groundwater Contamination
  {
    id: 'ECO-IN-2026-1010',
    description: 'Borewell water in communities adjacent to the Ghazipur landfill has turned yellowish-brown with high total dissolved solids (TDS over 2400 ppm) due to untreated leachate percolation.',
    predicted_category: 'Groundwater Contamination',
    human_reviewed_category: 'Groundwater Contamination',
    prediction_confidence: 0.96,
    state: 'Delhi',
    district: 'East Delhi',
    city_town_village: 'Delhi',
    locality: 'Ghazipur Dairy Farm Colony',
    incident_date: '2026-10-11',
    submission_date: '2026-10-11T12:00:00Z',
    status: 'Under Review',
    extracted_keywords: ['borewell', 'groundwater', 'leachate', 'tds', 'landfill', 'percolation'],
    extracted_locations: {
      state: 'Delhi',
      district: 'East Delhi',
      locality_or_landmark: 'Ghazipur Landfill',
      raw_mentions: ['Delhi', 'East Delhi', 'Ghazipur Landfill']
    },
    notes: [],
    history: [
      { id: 'h-14', action: 'Complaint Submitted', actor: 'Citizen Portal', details: 'Filing confirmed', timestamp: '2026-10-11T12:00:00Z' }
    ],
    is_synthetic_demonstration: true
  },

  // 10. Deforestation and Tree Cutting
  {
    id: 'ECO-IN-2026-1011',
    description: 'Illegal cutting of over 40 mature Neem and Banyan trees along rural canal bank without forest department permission or transit permits by unauthorized private contractors.',
    predicted_category: 'Deforestation and Tree Cutting',
    human_reviewed_category: 'Deforestation and Tree Cutting',
    prediction_confidence: 0.97,
    state: 'Uttar Pradesh',
    district: 'Varanasi',
    city_town_village: 'Varanasi Rural',
    locality: 'Rohaniya Canal Marg',
    incident_date: '2026-10-13',
    submission_date: '2026-10-13T10:45:00Z',
    status: 'In Progress',
    extracted_keywords: ['cutting', 'trees', 'felling', 'forest', 'banyan', 'neem'],
    extracted_locations: {
      state: 'Uttar Pradesh',
      district: 'Varanasi',
      locality_or_landmark: 'Rohaniya',
      raw_mentions: ['Uttar Pradesh', 'Varanasi']
    },
    notes: [
      {
        id: 'n-6',
        author: 'M. Tripathi',
        role: 'Divisional Forest Officer Liaison',
        text: 'Forest range officer dispatched to impound timber logs and chainsaw equipment.',
        created_at: '2026-10-13T13:20:00Z'
      }
    ],
    history: [
      { id: 'h-15', action: 'Complaint Submitted', actor: 'Citizen Portal', details: 'Filing registered', timestamp: '2026-10-13T10:45:00Z' }
    ],
    is_synthetic_demonstration: true
  },

  // 11. Soil Pollution
  {
    id: 'ECO-IN-2026-1012',
    description: 'Dumping of spent acidic pickling liquor and electroplating sludge directly onto agricultural soil surrounding manufacturing units, leading to complete soil salinization and crop failure.',
    predicted_category: 'Soil Pollution',
    human_reviewed_category: 'Soil Pollution',
    prediction_confidence: 0.94,
    state: 'Punjab',
    district: 'Ludhiana',
    city_town_village: 'Ludhiana',
    locality: 'Focal Point Extension',
    incident_date: '2026-10-09',
    submission_date: '2026-10-09T15:20:00Z',
    status: 'In Progress',
    extracted_keywords: ['sludge', 'soil', 'salinization', 'acidic', 'agricultural', 'electroplating'],
    extracted_locations: {
      state: 'Punjab',
      district: 'Ludhiana',
      locality_or_landmark: 'Focal Point',
      raw_mentions: ['Punjab', 'Ludhiana']
    },
    notes: [],
    history: [
      { id: 'h-16', action: 'Complaint Submitted', actor: 'Citizen Portal', details: 'Filing registered', timestamp: '2026-10-09T15:20:00Z' }
    ],
    is_synthetic_demonstration: true
  },

  // 12. Agricultural Burning and Crop Residue Burning
  {
    id: 'ECO-IN-2026-1013',
    description: 'Widespread open field burning of paddy crop residue (parali) across agricultural farms near Sunam, spreading dense acrid smoke over residential villages and state highway.',
    predicted_category: 'Agricultural Burning and Crop Residue Burning',
    human_reviewed_category: 'Agricultural Burning and Crop Residue Burning',
    prediction_confidence: 0.98,
    state: 'Punjab',
    district: 'Sangrur',
    city_town_village: 'Sunam',
    locality: 'Sunam Rural Farm Sector 4',
    incident_date: '2026-10-14',
    submission_date: '2026-10-14T17:30:00Z',
    status: 'Submitted',
    extracted_keywords: ['parali', 'stubble', 'burning', 'crop', 'residue', 'paddy', 'farms'],
    extracted_locations: {
      state: 'Punjab',
      district: 'Sangrur',
      locality_or_landmark: 'Sunam',
      raw_mentions: ['Punjab', 'Sangrur']
    },
    notes: [],
    history: [
      { id: 'h-17', action: 'Complaint Submitted', actor: 'Citizen Portal', details: 'Filing confirmed', timestamp: '2026-10-14T17:30:00Z' }
    ],
    is_synthetic_demonstration: true
  },

  // 13. Construction Dust Pollution
  {
    id: 'ECO-IN-2026-1014',
    description: 'Uncovered high-rise commercial construction site operating without green dust barrier netting or water sprinkling systems. Massive clouds of fine silica cement dust enveloping neighborhood.',
    predicted_category: 'Construction Dust Pollution',
    human_reviewed_category: 'Construction Dust Pollution',
    prediction_confidence: 0.95,
    state: 'Haryana',
    district: 'Gurugram',
    city_town_village: 'Gurugram',
    locality: 'Golf Course Extension Road Sector 62',
    incident_date: '2026-10-15',
    submission_date: '2026-10-15T09:00:00Z',
    status: 'In Progress',
    extracted_keywords: ['construction', 'dust', 'silica', 'sprinkling', 'netting', 'cement'],
    extracted_locations: {
      state: 'Haryana',
      district: 'Gurugram',
      locality_or_landmark: 'Golf Course Extension Road',
      raw_mentions: ['Haryana', 'Gurugram']
    },
    notes: [
      {
        id: 'n-7',
        author: 'Er. R. Sharma',
        role: 'Administrator',
        text: 'Challan issued under C&D Waste Management Rules for failure to deploy anti-smog water cannons.',
        created_at: '2026-10-15T10:15:00Z'
      }
    ],
    history: [
      { id: 'h-18', action: 'Complaint Submitted', actor: 'Citizen Portal', details: 'Filing registered', timestamp: '2026-10-15T09:00:00Z' }
    ],
    is_synthetic_demonstration: true
  },

  // 14. Solid Waste Management Issues
  {
    id: 'ECO-IN-2026-1015',
    description: 'Uncollected community garbage bins overflowing for over 10 days in T. Nagar market lane, with stray cattle scattering waste and decaying biological matter rotting in rainwater.',
    predicted_category: 'Solid Waste Management Issues',
    human_reviewed_category: 'Solid Waste Management Issues',
    prediction_confidence: 0.94,
    state: 'Tamil Nadu',
    district: 'Chennai',
    city_town_village: 'Chennai',
    locality: 'T. Nagar Ranganathan Street',
    incident_date: '2026-10-13',
    submission_date: '2026-10-13T12:15:00Z',
    status: 'Resolved',
    extracted_keywords: ['garbage', 'uncollected', 'bins', 'waste', 'decaying', 'rotting'],
    extracted_locations: {
      state: 'Tamil Nadu',
      district: 'Chennai',
      locality_or_landmark: 'T. Nagar',
      raw_mentions: ['Tamil Nadu', 'Chennai', 'T. Nagar']
    },
    notes: [
      {
        id: 'n-8',
        author: 'S. Jayaraman',
        role: 'Administrator',
        text: 'Greater Chennai Corporation solid waste conservancy team cleared bin site and sanitized area.',
        created_at: '2026-10-14T08:00:00Z'
      }
    ],
    history: [
      { id: 'h-19', action: 'Complaint Submitted', actor: 'Citizen Portal', details: 'Filing registered', timestamp: '2026-10-13T12:15:00Z' },
      { id: 'h-20', action: 'Status Updated', actor: 'S. Jayaraman', details: 'Marked Resolved after waste clearance', timestamp: '2026-10-14T08:00:00Z' }
    ],
    is_synthetic_demonstration: true
  },

  // 15. Hazardous Waste Disposal
  {
    id: 'ECO-IN-2026-1016',
    description: 'Discarded chemical drums containing flammable solvent residues and toxic paint sludge dumped haphazardly beside rural road culvert near Vapi industrial boundary.',
    predicted_category: 'Hazardous Waste Disposal',
    human_reviewed_category: 'Hazardous Waste Disposal',
    prediction_confidence: 0.97,
    state: 'Gujarat',
    district: 'Valsad',
    city_town_village: 'Vapi',
    locality: 'Vapi GIDC Industrial Marg',
    incident_date: '2026-10-12',
    submission_date: '2026-10-12T14:50:00Z',
    status: 'In Progress',
    extracted_keywords: ['hazardous', 'drums', 'solvent', 'toxic', 'sludge', 'chemical'],
    extracted_locations: {
      state: 'Gujarat',
      district: 'Valsad',
      locality_or_landmark: 'Vapi GIDC',
      raw_mentions: ['Gujarat', 'Valsad', 'Vapi GIDC']
    },
    notes: [
      {
        id: 'n-9',
        author: 'H. Desai',
        role: 'GPCB Liaison',
        text: 'Hazardous waste containment vehicle dispatched to transport sealed drums to TSDF site.',
        created_at: '2026-10-12T16:00:00Z'
      }
    ],
    history: [
      { id: 'h-21', action: 'Complaint Submitted', actor: 'Citizen Portal', details: 'Critical hazardous alert logged', timestamp: '2026-10-12T14:50:00Z' }
    ],
    is_synthetic_demonstration: true
  },

  // 16. Coastal and Marine Pollution
  {
    id: 'ECO-IN-2026-1017',
    description: 'Tar balls, engine bilge oil discharge, and discarded nylon monofilament fishing gear washing ashore in large quantities along Rushikonda Beach, posing danger to marine organisms.',
    predicted_category: 'Coastal and Marine Pollution',
    human_reviewed_category: 'Coastal and Marine Pollution',
    prediction_confidence: 0.96,
    state: 'Andhra Pradesh',
    district: 'Visakhapatnam',
    city_town_village: 'Visakhapatnam',
    locality: 'Rushikonda Beachfront',
    incident_date: '2026-10-10',
    submission_date: '2026-10-10T17:15:00Z',
    status: 'In Progress',
    extracted_keywords: ['coastal', 'marine', 'tar', 'oil', 'bilge', 'beach', 'shore'],
    extracted_locations: {
      state: 'Andhra Pradesh',
      district: 'Visakhapatnam',
      locality_or_landmark: 'Rushikonda Beach',
      raw_mentions: ['Andhra Pradesh', 'Visakhapatnam']
    },
    notes: [],
    history: [
      { id: 'h-22', action: 'Complaint Submitted', actor: 'Citizen Portal', details: 'Filing confirmed', timestamp: '2026-10-10T17:15:00Z' }
    ],
    is_synthetic_demonstration: true
  },

  // 17. Environmental Damage to Wildlife and Biodiversity
  {
    id: 'ECO-IN-2026-1018',
    description: 'Encroachment and dumping of construction rubble into the eco-sensitive wetland buffer corridor of Deepor Beel sanctuary, disrupting nesting birds and endemic migratory wildfowl.',
    predicted_category: 'Environmental Damage to Wildlife and Biodiversity',
    human_reviewed_category: 'Environmental Damage to Wildlife and Biodiversity',
    prediction_confidence: 0.95,
    state: 'Assam',
    district: 'Kamrup Metropolitan',
    city_town_village: 'Guwahati',
    locality: 'Deepor Beel Eco-Sensitive Zone',
    incident_date: '2026-10-11',
    submission_date: '2026-10-11T13:40:00Z',
    status: 'Under Review',
    extracted_keywords: ['wildlife', 'biodiversity', 'sanctuary', 'wetland', 'birds', 'corridor'],
    extracted_locations: {
      state: 'Assam',
      district: 'Kamrup Metropolitan',
      locality_or_landmark: 'Deepor Beel',
      raw_mentions: ['Assam', 'Kamrup Metropolitan', 'Deepor Beel']
    },
    notes: [],
    history: [
      { id: 'h-23', action: 'Complaint Submitted', actor: 'Citizen Portal', details: 'Filing confirmed', timestamp: '2026-10-11T13:40:00Z' }
    ],
    is_synthetic_demonstration: true
  },

  // 18. Other Environmental Issues
  {
    id: 'ECO-IN-2026-1019',
    description: 'Unchecked quarry blasting operations causing structural vibrations in hillside settlement and triggering small land slips on slope above Rishikesh-Badrinath highway.',
    predicted_category: 'Other Environmental Issues',
    human_reviewed_category: 'Other Environmental Issues',
    prediction_confidence: 0.88,
    state: 'Uttarakhand',
    district: 'Rishikesh',
    city_town_village: 'Rishikesh',
    locality: 'Byasi Quarry Zone',
    incident_date: '2026-10-08',
    submission_date: '2026-10-08T11:25:00Z',
    status: 'Resolved',
    extracted_keywords: ['quarry', 'blasting', 'vibrations', 'hillside', 'slips'],
    extracted_locations: {
      state: 'Uttarakhand',
      district: 'Rishikesh',
      locality_or_landmark: 'Rishikesh',
      raw_mentions: ['Uttarakhand', 'Rishikesh']
    },
    notes: [
      {
        id: 'n-10',
        author: 'Er. R. Sharma',
        role: 'Administrator',
        text: 'Mining department suspended blasting license pending geotechnical stability audit.',
        created_at: '2026-10-09T14:00:00Z'
      }
    ],
    history: [
      { id: 'h-24', action: 'Complaint Submitted', actor: 'Citizen Portal', details: 'Filing confirmed', timestamp: '2026-10-08T11:25:00Z' },
      { id: 'h-25', action: 'Status Updated', actor: 'Er. R. Sharma', details: 'Marked Resolved following mining license suspension', timestamp: '2026-10-09T14:00:00Z' }
    ],
    is_synthetic_demonstration: true
  },

  // Additional realistic complaints across India for rich distribution
  {
    id: 'ECO-IN-2026-1020',
    description: 'Untreated chrome and tannery wastewater bypassing solar evaporation pans in Jajmau industrial belt and entering holy Ganga river directly.',
    predicted_category: 'River and Lake Pollution',
    human_reviewed_category: 'River and Lake Pollution',
    prediction_confidence: 0.97,
    state: 'Uttar Pradesh',
    district: 'Kanpur Nagar',
    city_town_village: 'Kanpur',
    locality: 'Jajmau Tannery Belt',
    incident_date: '2026-10-15',
    submission_date: '2026-10-15T07:45:00Z',
    status: 'Under Review',
    extracted_keywords: ['tannery', 'ganga', 'wastewater', 'chrome', 'river', 'effluent'],
    extracted_locations: {
      state: 'Uttar Pradesh',
      district: 'Kanpur Nagar',
      locality_or_landmark: 'Ganga River',
      raw_mentions: ['Uttar Pradesh', 'Kanpur Nagar', 'Ganga River']
    },
    notes: [],
    history: [
      { id: 'h-26', action: 'Complaint Submitted', actor: 'Citizen Portal', details: 'Filing confirmed', timestamp: '2026-10-15T07:45:00Z' }
    ],
    is_synthetic_demonstration: true
  },
  {
    id: 'ECO-IN-2026-1021',
    description: 'Fly ash slurry overflowing from breached ash dyke of thermal power plant into Rihand reservoir and adjacent agricultural lands in Singrauli.',
    predicted_category: 'Industrial Pollution',
    human_reviewed_category: 'Industrial Pollution',
    prediction_confidence: 0.96,
    state: 'Madhya Pradesh',
    district: 'Singrauli',
    city_town_village: 'Singrauli',
    locality: 'Singrauli Thermal Plant Ash Dyke',
    incident_date: '2026-10-14',
    submission_date: '2026-10-14T15:30:00Z',
    status: 'In Progress',
    extracted_keywords: ['fly ash', 'slurry', 'dyke', 'thermal', 'power plant', 'reservoir'],
    extracted_locations: {
      state: 'Madhya Pradesh',
      district: 'Singrauli',
      locality_or_landmark: 'Singrauli Industrial Area',
      raw_mentions: ['Madhya Pradesh', 'Singrauli']
    },
    notes: [],
    history: [
      { id: 'h-27', action: 'Complaint Submitted', actor: 'Citizen Portal', details: 'Filing confirmed', timestamp: '2026-10-14T15:30:00Z' }
    ],
    is_synthetic_demonstration: true
  },
  {
    id: 'ECO-IN-2026-1022',
    description: 'Extensive burning of garbage and plastic scrap piles at Deonar dumping ground sending choking smog and carcinogens into Chembur and Govandi residents homes.',
    predicted_category: 'Solid Waste Management Issues',
    human_reviewed_category: 'Illegal Waste Dumping',
    prediction_confidence: 0.89,
    state: 'Maharashtra',
    district: 'Mumbai Suburban',
    city_town_village: 'Mumbai',
    locality: 'Deonar Dumping Ground',
    incident_date: '2026-10-14',
    submission_date: '2026-10-14T19:20:00Z',
    status: 'In Progress',
    extracted_keywords: ['garbage', 'burning', 'plastic', 'scrap', 'dumping ground', 'smog'],
    extracted_locations: {
      state: 'Maharashtra',
      district: 'Mumbai Suburban',
      locality_or_landmark: 'Deonar Dumping Ground',
      raw_mentions: ['Maharashtra', 'Mumbai Suburban', 'Deonar Dumping Ground']
    },
    notes: [
      {
        id: 'n-11',
        author: 'V. Sundaram',
        role: 'Administrator',
        text: 'Category corrected from Solid Waste Management Issues to Illegal Waste Dumping due to intentional fire setting.',
        created_at: '2026-10-14T20:30:00Z'
      }
    ],
    history: [
      { id: 'h-28', action: 'Complaint Submitted', actor: 'Citizen Portal', details: 'Filing registered', timestamp: '2026-10-14T19:20:00Z' },
      { id: 'h-29', action: 'Human Category Correction', actor: 'V. Sundaram', details: 'Changed category from Solid Waste Management Issues to Illegal Waste Dumping (preserved model prediction)', timestamp: '2026-10-14T20:30:00Z' }
    ],
    is_synthetic_demonstration: true
  },
  {
    id: 'ECO-IN-2026-1023',
    description: 'Night-time discharge of untreated acidic wastewater into Najafgarh Drain near Keshopur, producing suffocating hydrogen sulfide smells across residential colonies in Janakpuri.',
    predicted_category: 'Sewage and Drainage Pollution',
    human_reviewed_category: 'Sewage and Drainage Pollution',
    prediction_confidence: 0.95,
    state: 'Delhi',
    district: 'West Delhi',
    city_town_village: 'Delhi',
    locality: 'Najafgarh Drain Janakpuri Border',
    incident_date: '2026-10-15',
    submission_date: '2026-10-15T06:15:00Z',
    status: 'Submitted',
    extracted_keywords: ['drain', 'wastewater', 'hydrogen sulfide', 'acidic', 'stench', 'sewage'],
    extracted_locations: {
      state: 'Delhi',
      district: 'West Delhi',
      locality_or_landmark: 'Najafgarh Drain',
      raw_mentions: ['Delhi', 'West Delhi', 'Najafgarh Drain']
    },
    notes: [],
    history: [
      { id: 'h-30', action: 'Complaint Submitted', actor: 'Citizen Portal', details: 'Filing registered', timestamp: '2026-10-15T06:15:00Z' }
    ],
    is_synthetic_demonstration: true
  },
  {
    id: 'ECO-IN-2026-1024',
    description: 'Heavy construction transit trucks carrying uncovered sand and gravel along Noida Expressway spreading thick dust clouds and reducing visibility for school vans.',
    predicted_category: 'Construction Dust Pollution',
    human_reviewed_category: 'Construction Dust Pollution',
    prediction_confidence: 0.96,
    state: 'Uttar Pradesh',
    district: 'Noida (Gautam Buddha Nagar)',
    city_town_village: 'Noida',
    locality: 'Sector 137 Expressway Junction',
    incident_date: '2026-10-15',
    submission_date: '2026-10-15T08:50:00Z',
    status: 'Under Review',
    extracted_keywords: ['trucks', 'construction', 'dust', 'sand', 'gravel', 'expressway'],
    extracted_locations: {
      state: 'Uttar Pradesh',
      district: 'Noida (Gautam Buddha Nagar)',
      locality_or_landmark: 'Noida',
      raw_mentions: ['Uttar Pradesh', 'Noida (Gautam Buddha Nagar)']
    },
    notes: [],
    history: [
      { id: 'h-31', action: 'Complaint Submitted', actor: 'Citizen Portal', details: 'Filing registered', timestamp: '2026-10-15T08:50:00Z' }
    ],
    is_synthetic_demonstration: true
  }
];

// Curated 100+ training corpus samples for the machine learning NLP model
export const NLP_TRAINING_CORPUS: TrainingSample[] = [
  // Air Pollution
  { text: 'Heavy black smoke emissions from overloaded diesel trucks on Delhi Jaipur highway NH48 causing choking smog and breathing difficulties.', category: 'Air Pollution', state: 'Haryana', district: 'Gurugram' },
  { text: 'Uncontrolled vehicular exhaust emissions and traffic congestion at ITO crossing leading to PM2.5 levels exceeding 450 micrograms per cubic meter.', category: 'Air Pollution', state: 'Delhi', district: 'Central Delhi' },
  { text: 'Illegal small scale lead smelting and tyre burning emitting dense noxious fumes in residential slum cluster.', category: 'Air Pollution', state: 'Uttar Pradesh', district: 'Ghaziabad' },
  { text: 'Factory chimney releasing unscrubbed sulphur dioxide and particulate matter into residential air during morning hours.', category: 'Air Pollution', state: 'Maharashtra', district: 'Thane' },
  { text: 'Severe urban smog and zero visibility caused by automotive diesel soot and idling buses at transport hub.', category: 'Air Pollution', state: 'West Bengal', district: 'Kolkata' },
  { text: 'Commercial bakery operating high smoke wood fired ovens in densely populated residential alley.', category: 'Air Pollution', state: 'Telangana', district: 'Hyderabad' },

  // Water Pollution
  { text: 'Untreated toxic chemical effluent entering drinking water reservoir with oily sheen and pungent odor.', category: 'Water Pollution', state: 'Andhra Pradesh', district: 'Visakhapatnam' },
  { text: 'Washing of chemical containers and fuel tankers on river bank releasing toxic oil and grease into the waterway.', category: 'Water Pollution', state: 'Bihar', district: 'Patna' },
  { text: 'Discharge of untreated chemical wash water and soaps into open pond killing local fish and aquatic plants.', category: 'Water Pollution', state: 'Kerala', district: 'Ernakulam' },
  { text: 'Chemical solvent spill into irrigation canal making water unfit for paddy crops and livestock consumption.', category: 'Water Pollution', state: 'Tamil Nadu', district: 'Erode' },
  { text: 'Dark oily discharge from automobile servicing garage flowing into stormwater channel and contaminating water sources.', category: 'Water Pollution', state: 'Karnataka', district: 'Mysuru' },

  // Noise Pollution
  { text: 'Loud outdoor horn loudspeakers and blaring music during wedding procession past midnight in residential area.', category: 'Noise Pollution', state: 'Uttar Pradesh', district: 'Lucknow' },
  { text: 'Heavy un-silenced diesel generator sets running throughout the night at commercial building generating deafening vibration.', category: 'Noise Pollution', state: 'Maharashtra', district: 'Pune' },
  { text: 'Industrial metal press and sheet beating workshop operating inside quiet residential colony with severe noise above 90dB.', category: 'Noise Pollution', state: 'Delhi', district: 'West Delhi' },
  { text: 'Use of high decibel banned firecrackers and sound amplifiers near silent hospital zone late at night.', category: 'Noise Pollution', state: 'Tamil Nadu', district: 'Coimbatore' },
  { text: 'Excessive horn honking by commercial trucks and bus operators near school silence zone during morning hours.', category: 'Noise Pollution', state: 'Rajasthan', district: 'Jaipur' },

  // Illegal Waste Dumping
  { text: 'Dumping of building rubble, broken bricks and mixed domestic trash on vacant public land beside ring road.', category: 'Illegal Waste Dumping', state: 'Delhi', district: 'South Delhi' },
  { text: 'Unidentified tipper trucks dumping commercial debris and mixed plastic waste into open storm water nallah.', category: 'Illegal Waste Dumping', state: 'Karnataka', district: 'Bengaluru Urban' },
  { text: 'Illegal night time dumping of poultry slaughterhouse waste and carcass parts along rural road causing horrific stench.', category: 'Illegal Waste Dumping', state: 'Punjab', district: 'Ludhiana' },
  { text: 'Unregulated dumping of renovation waste and plaster of paris debris along forest fringe roadway.', category: 'Illegal Waste Dumping', state: 'Maharashtra', district: 'Nagpur' },
  { text: 'Piles of construction gravel and mixed garbage dumped on roadside pavement blocking pedestrian access.', category: 'Illegal Waste Dumping', state: 'Gujarat', district: 'Surat' },

  // Plastic Pollution
  { text: 'Single use plastic carry bags, polythene sheets and thermocol packaging littering town market and choking drains.', category: 'Plastic Pollution', state: 'Tamil Nadu', district: 'Madurai' },
  { text: 'Huge accumulation of discarded plastic water bottles and multi-layered packaging sachets along river promenade.', category: 'Plastic Pollution', state: 'Uttarakhand', district: 'Haridwar' },
  { text: 'Non woven plastic shopping bags and thin polythene choking city stormwater gutters causing urban flooding.', category: 'Plastic Pollution', state: 'West Bengal', district: 'Howrah' },
  { text: 'Plastic food wrappers and disposable cutlery scattered across public park and wildlife sanctuary entry gate.', category: 'Plastic Pollution', state: 'Madhya Pradesh', district: 'Bhopal' },
  { text: 'Banned thin polythene bags distributed openly by wholesale merchants violating state plastic ban.', category: 'Plastic Pollution', state: 'Rajasthan', district: 'Jodhpur' },

  // Sewage and Drainage Pollution
  { text: 'Open sewage drain overflowing onto public road and entering residential homes due to blocked municipal trunk sewer.', category: 'Sewage and Drainage Pollution', state: 'Delhi', district: 'North East Delhi' },
  { text: 'Untreated human sewage and greywater from large apartment complex discharging into storm water drain.', category: 'Sewage and Drainage Pollution', state: 'Karnataka', district: 'Bengaluru Urban' },
  { text: 'Broken sewer pipe spilling foul smelling black wastewater into neighborhood park and pathway.', category: 'Sewage and Drainage Pollution', state: 'Uttar Pradesh', district: 'Kanpur Nagar' },
  { text: 'Raw sewage overflow from clogged manhole creating cesspool of filthy water and breeding mosquito larvae.', category: 'Sewage and Drainage Pollution', state: 'Maharashtra', district: 'Mumbai City' },
  { text: 'Discharge of unpiped household sullage and latrine waste directly into local drainage ditch.', category: 'Sewage and Drainage Pollution', state: 'Bihar', district: 'Gaya' },

  // Industrial Pollution
  { text: 'Chemical manufacturing unit releasing acidic fumes and discharging untamed toxic red effluent without CETP connection.', category: 'Industrial Pollution', state: 'Gujarat', district: 'Valsad' },
  { text: 'Steel rerolling mill emitting thick black particulate smoke and chemical odors affecting nearby residential school.', category: 'Industrial Pollution', state: 'Chhattisgarh', district: 'Raipur' },
  { text: 'Electroplating plant dumping hazardous heavy metal chromium sludge and toxic rinse bath water into ground.', category: 'Industrial Pollution', state: 'Punjab', district: 'Jalandhar' },
  { text: 'Textile dyeing facility dumping chemical solvent wastewater into village canal causing crops to wither.', category: 'Industrial Pollution', state: 'Rajasthan', district: 'Pali' },
  { text: 'Thermal power plant fly ash leakage contaminating surrounding agricultural fields and village wells.', category: 'Industrial Pollution', state: 'Odisha', district: 'Jharsuguda' },

  // River and Lake Pollution
  { text: 'Toxic froth and chemical foam billowing from lake weir and blowing onto adjacent highway during winds.', category: 'River and Lake Pollution', state: 'Karnataka', district: 'Bengaluru Urban' },
  { text: 'Direct discharge of untreated municipal sewage and idol immersion debris into holy Ganga river ghats.', category: 'River and Lake Pollution', state: 'Uttar Pradesh', district: 'Varanasi' },
  { text: 'Industrial untreated effluent turning Yamuna river water into black foul smelling sludge with thick toxic bubbles.', category: 'River and Lake Pollution', state: 'Delhi', district: 'Central Delhi' },
  { text: 'Encroachment and discharge of untreated commercial kitchen waste into Hussain Sagar lake causing algal blooms.', category: 'River and Lake Pollution', state: 'Telangana', district: 'Hyderabad' },
  { text: 'Eutrophication, weed choking and dead fish floating in Dal Lake due to hotel raw sewage discharge.', category: 'River and Lake Pollution', state: 'Jammu and Kashmir', district: 'Srinagar' },

  // Groundwater Contamination
  { text: 'Underground borewell water turning reddish brown with foul metallic smell due to chemical industrial seepage.', category: 'Groundwater Contamination', state: 'Gujarat', district: 'Vapi' },
  { text: 'High concentration of fluoride and heavy metals in deep tube well drinking water in rural village.', category: 'Groundwater Contamination', state: 'Rajasthan', district: 'Nagaur' },
  { text: 'Leachate from unlined municipal waste landfill seeping into deep aquifers and contaminating local drinking wells.', category: 'Groundwater Contamination', state: 'Delhi', district: 'East Delhi' },
  { text: 'Underground fuel storage tank leakage contaminating neighborhood drinking water borewells with petroleum hydrocarbons.', category: 'Groundwater Contamination', state: 'Maharashtra', district: 'Pune' },
  { text: 'High total dissolved solids TDS and pesticide runoff detected in shallow farm borewells causing skin illnesses.', category: 'Groundwater Contamination', state: 'Punjab', district: 'Bathinda' },

  // Deforestation and Tree Cutting
  { text: 'Illegal felling of mature green trees and ancient banyans along state highway for commercial hoarding visibility.', category: 'Deforestation and Tree Cutting', state: 'Karnataka', district: 'Bengaluru Urban' },
  { text: 'Unauthorized logging of Sal and Teak trees in reserved forest fringe without transit pass from forest range.', category: 'Deforestation and Tree Cutting', state: 'Madhya Pradesh', district: 'Jabalpur' },
  { text: 'Indiscriminate cutting of roadside avenue trees by private builder without compensatory afforestation permission.', category: 'Deforestation and Tree Cutting', state: 'Delhi', district: 'South West Delhi' },
  { text: 'Clearing and burning of natural scrub forest and hillsides in Aravalli range for illegal real estate plotting.', category: 'Deforestation and Tree Cutting', state: 'Haryana', district: 'Gurugram' },
  { text: 'Illegal chopping of mangrove trees along creek for land reclamation and illegal construction.', category: 'Deforestation and Tree Cutting', state: 'Maharashtra', district: 'Thane' },

  // Soil Pollution
  { text: 'Discharge of acidic spent pickle liquor from galvanizing unit directly onto open farm ground destroying soil fertility.', category: 'Soil Pollution', state: 'Punjab', district: 'Ludhiana' },
  { text: 'Contamination of topsoil with spent battery lead paste and acid residue from illegal battery recycling backyard.', category: 'Soil Pollution', state: 'Uttar Pradesh', district: 'Meerut' },
  { text: 'Dumping of toxic industrial sludge and salt waste onto farmland turning soil saline and barren for agriculture.', category: 'Soil Pollution', state: 'Gujarat', district: 'Bharuch' },
  { text: 'Excessive chemical pesticide dumping on soil causing severe biological degradation and loss of earthworms.', category: 'Soil Pollution', state: 'Andhra Pradesh', district: 'Guntur' },

  // Agricultural Burning and Crop Residue Burning
  { text: 'Paddy straw and crop stubble residue burning in agricultural fields producing thick smoke blanket over district.', category: 'Agricultural Burning and Crop Residue Burning', state: 'Punjab', district: 'Sangrur' },
  { text: 'Widespread parali burning by farmers after wheat harvest creating severe air hazard and burning eyes for travelers.', category: 'Agricultural Burning and Crop Residue Burning', state: 'Haryana', district: 'Karnal' },
  { text: 'Open field burning of sugarcane crop trash and dry leaves spreading ash particles into nearby town houses.', category: 'Agricultural Burning and Crop Residue Burning', state: 'Uttar Pradesh', district: 'Muzaffarnagar' },
  { text: 'Crop residue burning along agricultural belt creating severe smog and respiratory problems for rural population.', category: 'Agricultural Burning and Crop Residue Burning', state: 'Punjab', district: 'Patiala' },

  // Construction Dust Pollution
  { text: 'Major construction site operating without green dust curtains or water misting canons spreading cement dust across colony.', category: 'Construction Dust Pollution', state: 'Haryana', district: 'Gurugram' },
  { text: 'Uncovered transit trucks transporting dry sand and construction debris causing dust storms along main avenue.', category: 'Construction Dust Pollution', state: 'Delhi', district: 'South East Delhi' },
  { text: 'Demolition of old commercial complex without dust barrier screens coating neighborhood homes with fine particulate powder.', category: 'Construction Dust Pollution', state: 'Maharashtra', district: 'Mumbai Suburban' },
  { text: 'Stone crushing and aggregate screening unit operating near residential village without water sprinkling dust suppression.', category: 'Construction Dust Pollution', state: 'Rajasthan', district: 'Alwar' },

  // Solid Waste Management Issues
  { text: 'Overflowing municipal garbage vat unattended for over two weeks attracting stray pigs and emitting putrid odor.', category: 'Solid Waste Management Issues', state: 'West Bengal', district: 'Kolkata' },
  { text: 'Non collection of segregated municipal solid waste causing huge secondary waste piles on main market street.', category: 'Solid Waste Management Issues', state: 'Tamil Nadu', district: 'Chennai' },
  { text: 'Irregular doorstep garbage collection causing residents to throw unsegregated domestic trash into vacant lots.', category: 'Solid Waste Management Issues', state: 'Karnataka', district: 'Tumakuru' },
  { text: 'Open burning of dry leaves and municipal solid waste by sanitary workers inside public residential colony.', category: 'Solid Waste Management Issues', state: 'Delhi', district: 'North Delhi' },

  // Hazardous Waste Disposal
  { text: 'Illegal dumping of toxic chemical drums and expired pharmaceutical waste on roadside embankment.', category: 'Hazardous Waste Disposal', state: 'Gujarat', district: 'Valsad' },
  { text: 'Bio-medical hazardous waste including used syringes, needles and contaminated surgical swabs dumped in municipal bin.', category: 'Hazardous Waste Disposal', state: 'Uttar Pradesh', district: 'Agra' },
  { text: 'Unsafe dismantling of lead acid batteries and disposal of toxic lead dross directly onto public ground.', category: 'Hazardous Waste Disposal', state: 'Maharashtra', district: 'Navi Mumbai' },
  { text: 'Asbestos waste sheets and toxic insulation dumped in open without hazardous waste labeling or containment.', category: 'Hazardous Waste Disposal', state: 'Tamil Nadu', district: 'Cuddalore' },

  // Coastal and Marine Pollution
  { text: 'Tar balls, engine bilge oil discharge, and discarded nylon fishing nets washing ashore on popular beach.', category: 'Coastal and Marine Pollution', state: 'Andhra Pradesh', district: 'Visakhapatnam' },
  { text: 'Commercial trawler oil leakage and discarded plastic crates polluting marine coastal waters and turtle nesting site.', category: 'Coastal and Marine Pollution', state: 'Odisha', district: 'Puri' },
  { text: 'Sewage and untreated hospitality wastewater discharged directly into coastal surf zone killing marine life.', category: 'Coastal and Marine Pollution', state: 'Goa', district: 'North Goa' },
  { text: 'Plastic debris, foam floats, and ghost nets choking mangrove creek and marine intertidal mudflats.', category: 'Coastal and Marine Pollution', state: 'Maharashtra', district: 'Mumbai City' },

  // Environmental Damage to Wildlife and Biodiversity
  { text: 'Encroachment and dumping of construction debris inside bird sanctuary wetland disrupting migratory waterfowl.', category: 'Environmental Damage to Wildlife and Biodiversity', state: 'Assam', district: 'Kamrup Metropolitan' },
  { text: 'Poisoning of waterholes and setting of wire snares in forest buffer zone threatening wild herbivores and leopards.', category: 'Environmental Damage to Wildlife and Biodiversity', state: 'Rajasthan', district: 'Alwar' },
  { text: 'High tension un-insulated power lines passing through elephant migratory corridor causing electrocution hazard.', category: 'Environmental Damage to Wildlife and Biodiversity', state: 'Odisha', district: 'Mayurbhanj' },
  { text: 'Destruction of rare medicinal plant habitats and limestone mining inside eco-sensitive wildlife buffer zone.', category: 'Environmental Damage to Wildlife and Biodiversity', state: 'Uttarakhand', district: 'Dehradun' },

  // Other Environmental Issues
  { text: 'Unchecked stone quarry blasting triggering severe vibrations and rock falls on mountain road settlement.', category: 'Other Environmental Issues', state: 'Uttarakhand', district: 'Rishikesh' },
  { text: 'Massive soil erosion and slope instability caused by unscientific hill cutting for resort construction.', category: 'Other Environmental Issues', state: 'Himachal Pradesh', district: 'Shimla' },
  { text: 'Illegal sand mining from dry riverbed using mechanized excavators threatening bridge pillars and river geomorphology.', category: 'Other Environmental Issues', state: 'Madhya Pradesh', district: 'Gwalior' }
];
