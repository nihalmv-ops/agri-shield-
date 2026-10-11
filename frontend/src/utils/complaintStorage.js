// AgriShield - Private User Complaints Storage & API Bridge
// Enforces strict privacy: users can ONLY see their own submitted complaints and officer responses

const USER_COMPLAINTS_KEY = 'agrishield_my_complaints';

// Read user's private complaints from local storage
export const getMyComplaints = () => {
  try {
    const data = localStorage.getItem(USER_COMPLAINTS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading user complaints:', error);
    return [];
  }
};

// Save a newly submitted complaint to the user's private list
export const saveMyComplaint = (complaint) => {
  try {
    const current = getMyComplaints();
    const updated = [complaint, ...current];
    localStorage.setItem(USER_COMPLAINTS_KEY, JSON.stringify(updated));
    return updated;
  } catch (error) {
    console.error('Error saving user complaint:', error);
    return [];
  }
};

// Update an existing complaint with officer response or status changes
export const updateMyComplaint = (id, updates) => {
  try {
    const current = getMyComplaints();
    const updated = current.map((c) =>
      String(c.id) === String(id) || String(c._id) === String(id)
        ? { ...c, ...updates }
        : c
    );
    localStorage.setItem(USER_COMPLAINTS_KEY, JSON.stringify(updated));
    return updated;
  } catch (error) {
    console.error('Error updating user complaint:', error);
    return [];
  }
};

