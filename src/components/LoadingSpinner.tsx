export default function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-cream">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-brand-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-brand-black text-lg font-medium">Loading album...</p>
      </div>
    </div>
  );
}
