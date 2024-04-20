export default async function fetchPublications() {
  try {
    const response = await fetch('/api/getMediumFeed', { next: { revalidate: 86400 } });
    const data = await response.json();

    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
}