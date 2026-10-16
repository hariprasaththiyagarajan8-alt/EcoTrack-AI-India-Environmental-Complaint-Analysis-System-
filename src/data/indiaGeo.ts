export interface DistrictData {
  name: string;
  majorCitiesOrTowns?: string[];
}

export interface StateData {
  name: string;
  type: 'State' | 'Union Territory';
  districts: string[];
}

export const INDIAN_STATES_AND_UTS: StateData[] = [
  {
    name: 'Andhra Pradesh',
    type: 'State',
    districts: ['Anantapur', 'Chittoor', 'East Godavari', 'Guntur', 'Krishna', 'Kurnool', 'Nellore', 'Prakasam', 'Srikakulam', 'Visakhapatnam', 'Vizianagaram', 'West Godavari', 'YSR Kadapa']
  },
  {
    name: 'Arunachal Pradesh',
    type: 'State',
    districts: ['Changlang', 'East Kameng', 'East Siang', 'Itanagar', 'Lohit', 'Papum Pare', 'Tawang', 'West Kameng', 'West Siang']
  },
  {
    name: 'Assam',
    type: 'State',
    districts: ['Cachar', 'Dibrugarh', 'Guwahati', 'Jorhat', 'Kamrup', 'Kamrup Metropolitan', 'Nagaon', 'Sivasagar', 'Sonitpur', 'Tinsukia']
  },
  {
    name: 'Bihar',
    type: 'State',
    districts: ['Bhagalpur', 'Darbhanga', 'Gaya', 'Muzaffarpur', 'Nalanda', 'Patna', 'Purnia', 'Rohtas', 'Samastipur', 'Vaishali']
  },
  {
    name: 'Chhattisgarh',
    type: 'State',
    districts: ['Bastar', 'Bilaspur', 'Durg', 'Korba', 'Raigarh', 'Raipur', 'Rajnandgaon', 'Surguja']
  },
  {
    name: 'Goa',
    type: 'State',
    districts: ['North Goa', 'South Goa']
  },
  {
    name: 'Gujarat',
    type: 'State',
    districts: ['Ahmedabad', 'Amreli', 'Anand', 'Bharuch', 'Bhavnagar', 'Gandhinagar', 'Jamnagar', 'Junagadh', 'Kutch', 'Mehsana', 'Morbi', 'Rajkot', 'Surat', 'Vadodara', 'Valsad', 'Vapi']
  },
  {
    name: 'Haryana',
    type: 'State',
    districts: ['Ambala', 'Faridabad', 'Gurugram', 'Hisar', 'Jhajjar', 'Karnal', 'Panipat', 'Rohtak', 'Sirsa', 'Sonipat', 'Yamunanagar']
  },
  {
    name: 'Himachal Pradesh',
    type: 'State',
    districts: ['Chamba', 'Hamirpur', 'Kangra', 'Kullu', 'Mandi', 'Shimla', 'Sirmaur', 'Solan', 'Una']
  },
  {
    name: 'Jharkhand',
    type: 'State',
    districts: ['Bokaro', 'Deoghar', 'Dhanbad', 'Dumka', 'East Singhbhum', 'Hazaribagh', 'Ranchi', 'West Singhbhum']
  },
  {
    name: 'Karnataka',
    type: 'State',
    districts: ['Bagalkot', 'Ballari', 'Belagavi', 'Bengaluru Rural', 'Bengaluru Urban', 'Bidar', 'Dakshina Kannada', 'Dharwad', 'Hassan', 'Kalaburagi', 'Mysuru', 'Shivamogga', 'Tumakuru', 'Udupi']
  },
  {
    name: 'Kerala',
    type: 'State',
    districts: ['Alappuzha', 'Ernakulam', 'Idukki', 'Kannur', 'Kasaragod', 'Kollam', 'Kottayam', 'Kozhikode', 'Malappuram', 'Palakkad', 'Pathanamthitta', 'Thiruvananthapuram', 'Thrissur', 'Wayanad']
  },
  {
    name: 'Madhya Pradesh',
    type: 'State',
    districts: ['Bhopal', 'Gwalior', 'Indore', 'Jabalpur', 'Khandwa', 'Rewa', 'Sagar', 'Singrauli', 'Ujjain']
  },
  {
    name: 'Maharashtra',
    type: 'State',
    districts: ['Ahmednagar', 'Akola', 'Amravati', 'Aurangabad (Chhatrapati Sambhajinagar)', 'Chandrapur', 'Kolhapur', 'Mumbai City', 'Mumbai Suburban', 'Nagpur', 'Nashik', 'Navi Mumbai', 'Pune', 'Solapur', 'Thane']
  },
  {
    name: 'Manipur',
    type: 'State',
    districts: ['Bishnupur', 'Churachandpur', 'Imphal East', 'Imphal West', 'Thoubal']
  },
  {
    name: 'Meghalaya',
    type: 'State',
    districts: ['East Garo Hills', 'East Khasi Hills', 'Ri-Bhoi', 'Shillong', 'West Garo Hills', 'West Khasi Hills']
  },
  {
    name: 'Mizoram',
    type: 'State',
    districts: ['Aizawl', 'Champhai', 'Kolasib', 'Lunglei', 'Serchhip']
  },
  {
    name: 'Nagaland',
    type: 'State',
    districts: ['Dimapur', 'Kohima', 'Mokokchung', 'Mon', 'Tuensang', 'Wokha']
  },
  {
    name: 'Odisha',
    type: 'State',
    districts: ['Balasore', 'Bhadrak', 'Cuttack', 'Ganjam', 'Jharsuguda', 'Khordha (Bhubaneswar)', 'Mayurbhanj', 'Puri', 'Rourkela', 'Sambalpur']
  },
  {
    name: 'Punjab',
    type: 'State',
    districts: ['Amritsar', 'Bathinda', 'Faridkot', 'Fatehgarh Sahib', 'Firozpur', 'Hoshiarpur', 'Jalandhar', 'Ludhiana', 'Mansa', 'Moga', 'Patiala', 'Rupnagar', 'Sangrur', 'SAS Nagar (Mohali)']
  },
  {
    name: 'Rajasthan',
    type: 'State',
    districts: ['Ajmer', 'Alwar', 'Bikaner', 'Bhilwara', 'Jaipur', 'Jodhpur', 'Kota', 'Nagaur', 'Pali', 'Sikar', 'Udaipur']
  },
  {
    name: 'Sikkim',
    type: 'State',
    districts: ['East Sikkim (Gangtok)', 'North Sikkim', 'South Sikkim', 'West Sikkim']
  },
  {
    name: 'Tamil Nadu',
    type: 'State',
    districts: ['Chennai', 'Coimbatore', 'Cuddalore', 'Dindigul', 'Erode', 'Kanchipuram', 'Madurai', 'Nagapattinam', 'Namakkal', 'Salem', 'Thanjavur', 'Thoothukudi', 'Tiruchirappalli', 'Tirunelveli', 'Tiruppur', 'Vellore']
  },
  {
    name: 'Telangana',
    type: 'State',
    districts: ['Hyderabad', 'Karimnagar', 'Khammam', 'Medchal-Malkajgiri', 'Nalgonda', 'Nizamabad', 'Rangareddy', 'Sangareddy', 'Warangal']
  },
  {
    name: 'Tripura',
    type: 'State',
    districts: ['Agartala', 'Dhalai', 'North Tripura', 'South Tripura', 'West Tripura']
  },
  {
    name: 'Uttar Pradesh',
    type: 'State',
    districts: ['Agra', 'Aligarh', 'Ayodhya', 'Bareilly', 'Firozabad', 'Ghaziabad', 'Gorakhpur', 'Jhansi', 'Kanpur Dehat', 'Kanpur Nagar', 'Lucknow', 'Mathura', 'Meerut', 'Moradabad', 'Noida (Gautam Buddha Nagar)', 'Prayagraj', 'Saharanpur', 'Varanasi']
  },
  {
    name: 'Uttarakhand',
    type: 'State',
    districts: ['Dehradun', 'Haridwar', 'Nainital', 'Pauri Garhwal', 'Rishikesh', 'Tehri Garhwal', 'Udham Singh Nagar']
  },
  {
    name: 'West Bengal',
    type: 'State',
    districts: ['Bankura', 'Birbhum', 'Darjeeling', 'Hooghly', 'Howrah', 'Jalpaiguri', 'Kolkata', 'Malda', 'Murshidabad', 'Nadia', 'North 24 Parganas', 'Paschim Bardhaman (Asansol)', 'Purba Medinipur', 'South 24 Parganas']
  },
  {
    name: 'Andaman and Nicobar Islands',
    type: 'Union Territory',
    districts: ['Nicobar', 'North and Middle Andaman', 'South Andaman (Port Blair)']
  },
  {
    name: 'Chandigarh',
    type: 'Union Territory',
    districts: ['Chandigarh']
  },
  {
    name: 'Dadra and Nagar Haveli and Daman and Diu',
    type: 'Union Territory',
    districts: ['Dadra and Nagar Haveli', 'Daman', 'Diu']
  },
  {
    name: 'Delhi',
    type: 'Union Territory',
    districts: ['Central Delhi', 'East Delhi', 'New Delhi', 'North Delhi', 'North East Delhi', 'North West Delhi', 'Shahdara', 'South Delhi', 'South East Delhi', 'South West Delhi', 'West Delhi']
  },
  {
    name: 'Jammu and Kashmir',
    type: 'Union Territory',
    districts: ['Anantnag', 'Baramulla', 'Budgam', 'Doda', 'Jammu', 'Kathua', 'Pulwama', 'Srinagar', 'Udhampur']
  },
  {
    name: 'Ladakh',
    type: 'Union Territory',
    districts: ['Kargil', 'Leh']
  },
  {
    name: 'Lakshadweep',
    type: 'Union Territory',
    districts: ['Kavaratti', 'Agatti', 'Amini', 'Andrott']
  },
  {
    name: 'Puducherry',
    type: 'Union Territory',
    districts: ['Karaikal', 'Mahe', 'Puducherry', 'Yanam']
  }
];

export const WELL_KNOWN_INDIAN_HOTSPOTS = [
  'Bellandur Lake',
  'Varthur Lake',
  'Yamuna River',
  'Ganga River',
  'Mula-Mutha River',
  'Najafgarh Drain',
  'Ghazipur Landfill',
  'Bhalswa Landfill',
  'Okhla Landfill',
  'Deonar Dumping Ground',
  'Ennore Creek',
  'Cooum River',
  'Adyar River',
  'Singrauli Industrial Area',
  'Vapi GIDC',
  'Ankleshwar GIDC',
  'Manali Industrial Area',
  'Anand Vihar',
  'ITO Crossing',
  'Bandra-Kurla Complex',
  'Perungudi Dumpyard',
  'Hussain Sagar Lake',
  'Dal Lake',
  'Deepor Beel',
  'Vembanad Lake',
  'Aravalli Biodiversity Park',
  'Sariska Buffer Zone',
  'Sundarbans',
  'Koramangala Valley Drain'
];
