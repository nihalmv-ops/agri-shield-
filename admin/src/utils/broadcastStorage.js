// AgriShield Shared Broadcast Alert Storage
const BROADCAST_KEY = 'agrishield_broadcast_alerts';

export const getBroadcastAlerts = () => {
  try {
    const raw = localStorage.getItem(BROADCAST_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const saveBroadcastAlert = (alert) => {
  try {
    const current = getBroadcastAlerts();
    const updated = [alert, ...current];
    localStorage.setItem(BROADCAST_KEY, JSON.stringify(updated));
    return updated;
  } catch (error) {
    console.error('Error saving broadcast alert:', error);
    return [];
  }
};

