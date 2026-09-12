export const isRestaurantOpen = () => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const currentTime = hours * 60 + minutes;
  
  const openTime = 9 * 60; // 09:00
  const closeTime = 25 * 60; // 01:00 next day (treated as 25:00)
  
  if (closeTime > openTime) {
    return currentTime >= openTime && currentTime < closeTime;
  } else {
    return currentTime >= openTime || currentTime < closeTime;
  }
};

export const getRestaurantStatus = () => {
  return isRestaurantOpen() ? "Open Now" : "Closed";
};

export const formatTime = (hours, minutes) => {
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
};

export const generateTimeSlots = () => {
  const slots = [];
  for (let h = 9; h < 25; h++) {
    for (let m = 0; m < 60; m += 30) {
      const displayHour = h >= 24 ? h - 24 : h;
      const period = h >= 12 ? 'PM' : 'AM';
      const displayH = displayHour > 12 ? displayHour - 12 : displayHour === 0 ? 12 : displayHour;
      slots.push({
        value: `${h}:${String(m).padStart(2, '0')}`,
        label: `${displayH}:${String(m).padStart(2, '0')} ${period}`
      });
    }
  }
  return slots;
};

export const formatPhoneNumber = (phone) => {
  if (!phone) return '';
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `+90${cleaned}`;
  }
  if (cleaned.length === 12 && cleaned.startsWith('90')) {
    return `+${cleaned}`;
  }
  return phone;
};

export const generateWhatsAppMessage = (order) => {
  const items = order.items
    .map(item => `• ${item.name} (x${item.quantity})`)
    .join('\n');
  
  const message = `
*Holly Money Kitchen Order*
${items}

*Order Type:* ${order.orderType}
*Customer:* ${order.customerName}
*Phone:* ${order.phone}
${order.address ? `*Address:* ${order.address}` : ''}
${order.notes ? `*Notes:* ${order.notes}` : ''}
  `.trim();
  
  return encodeURIComponent(message);
};

export const saveToLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const getFromLocalStorage = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return defaultValue;
  }
};
