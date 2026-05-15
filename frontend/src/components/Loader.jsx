const Loader = ({ text = "Loading..." }) => (
  <div className="flex items-center justify-center gap-3 py-10 text-sm text-stone-600">
    <span className="h-4 w-4 animate-spin rounded-full border-2 border-amber border-t-transparent" />
    {text}
  </div>
);

export default Loader;
