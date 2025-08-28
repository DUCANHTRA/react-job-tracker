export default function formatDate(isoOrYYYYMMDD) {
    if (!isoOrYYYYMMDD) return '';
    const d = new Date(isoOrYYYYMMDD);
    if (Number.isNaN(d.getTime())) return isoOrYYYYMMDD;
    return d.toLocaleDateString();
  }
  